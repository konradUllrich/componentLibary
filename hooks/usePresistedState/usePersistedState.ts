import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "wouter";

export type StorageType = "localStorage" | "sessionStorage";

type Options<T> = {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  removeIfDefault?: boolean;
  storage?: StorageType;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
};

// SSR-safe helper — returns the requested Web Storage or null when unavailable.
function getStorage(type: StorageType): Storage | null {
  if (typeof window === "undefined") return null;
  return type === "sessionStorage"
    ? window.sessionStorage
    : window.localStorage;
}

export function usePersistedState<T>({
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  removeIfDefault = true,
  storage = "localStorage",
  syncUrl = true,
}: Options<T>) {
  const [params, setSearchParams] = useSearchParams();

  // --- initialize state from URL → storage → default (runs once) ---
  const [state, setState] = useState<T>(() => {
    // 1. URL param (highest priority, only when syncUrl is enabled)
    if (syncUrl) {
      const paramValue = params.get(key);
      if (paramValue != null) {
        try {
          return deserialize(paramValue);
        } catch (e) {
          console.warn(`Failed to deserialize URL param "${key}":`, e);
        }
      }
    }

    // 2. Web Storage (localStorage or sessionStorage)
    const store = getStorage(storage);
    if (store != null) {
      const stored = store.getItem(key);
      if (stored != null) {
        try {
          return deserialize(stored);
        } catch (e) {
          console.warn(`Failed to deserialize ${storage} item "${key}":`, e);
        }
      }
    }

    // 3. default value
    return defaultValue;
  });

  // --- pure state setter: only updates local state ---
  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    setState(value);
  }, []);

  // Keep latest option values in refs so the persist effect only re-runs when
  // `key` or `state` change — not when consumers pass new function/object
  // references on every render (e.g. inline defaultValue objects).
  const serializeRef = useRef(serialize);
  const deserializeRef = useRef(deserialize);
  const defaultValueRef = useRef(defaultValue);
  const removeIfDefaultRef = useRef(removeIfDefault);
  const storageRef = useRef(storage);
  const syncUrlRef = useRef(syncUrl);
  serializeRef.current = serialize;
  deserializeRef.current = deserialize;
  defaultValueRef.current = defaultValue;
  removeIfDefaultRef.current = removeIfDefault;
  storageRef.current = storage;
  syncUrlRef.current = syncUrl;

  // --- persist local state to URL and Web Storage ---
  useEffect(() => {
    const _serialize = serializeRef.current;
    const _defaultValue = defaultValueRef.current;
    const _removeIfDefault = removeIfDefaultRef.current;
    const store = getStorage(storageRef.current);

    let serializedState: string;
    let serializedDefault: string;

    try {
      serializedState = _serialize(state);
      serializedDefault = _serialize(_defaultValue);
    } catch (error) {
      console.warn(`Failed to serialize value for key "${key}":`, error);
      return;
    }

    // Persist to Web Storage first so URL sync issues never block persistence.
    if (store != null) {
      try {
        if (_removeIfDefault && serializedState === serializedDefault) {
          store.removeItem(key);
        } else {
          store.setItem(key, serializedState);
        }
      } catch (error) {
        console.warn(
          `Failed to persist to ${storageRef.current} for key "${key}":`,
          error,
        );
      }
    }

    if (syncUrlRef.current) {
      try {
        setSearchParams(
          (prev) => {
            const current = prev.get(key);

            if (_removeIfDefault && serializedState === serializedDefault) {
              if (current == null) {
                return prev;
              }
              prev.delete(key);
              return prev;
            }

            if (current === serializedState) {
              return prev;
            }

            prev.set(key, serializedState);
            return prev;
          },
          { replace: true },
        );
      } catch (error) {
        console.warn(`Failed to persist URL param for key "${key}":`, error);
      }
    }
  }, [key, state, setSearchParams]);

  return [state, setPersistedState] as const;
}
