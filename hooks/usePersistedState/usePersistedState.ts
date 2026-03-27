import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "wouter";

export type StorageType = "localStorage" | "sessionStorage" | false;

type Options<T> = {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  removeIfDefault?: boolean;
  storage?: StorageType;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
  /** When true and T is a plain object, each property is written as its own URL
   * search param instead of one JSON blob. Storage (localStorage/sessionStorage)
   * always uses the full serialised object regardless of this flag. */
  flatUrlParams?: boolean;
};

// SSR-safe helper — returns the requested Web Storage or null when unavailable.
function getStorage(type: StorageType): Storage | null {
  if (type === false || typeof window === "undefined") return null;
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
  flatUrlParams = false,
}: Options<T>) {
  const [params, setSearchParams] = useSearchParams();

  // --- initialize state from URL → storage → default (runs once) ---
  const [state, setState] = useState<T>(() => {
    // 1. URL param (highest priority, only when syncUrl is enabled)
    if (syncUrl) {
      if (
        flatUrlParams &&
        defaultValue !== null &&
        typeof defaultValue === "object"
      ) {
        const defaults = defaultValue as Record<string, unknown>;
        const keys = Object.keys(defaults);
        const urlValues: Record<string, unknown> = {};
        let anyFound = false;
        for (const k of keys) {
          const raw = params.get(k);
          if (raw != null) {
            anyFound = true;
            try {
              urlValues[k] = JSON.parse(raw);
            } catch {
              urlValues[k] = raw;
            }
          }
        }
        if (anyFound) {
          return { ...defaults, ...urlValues } as T;
        }
      } else {
        const paramValue = params.get(key);
        if (paramValue != null) {
          try {
            return deserialize(paramValue);
          } catch (e) {
            console.warn(`Failed to deserialize URL param "${key}":`, e);
          }
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
  const flatUrlParamsRef = useRef(flatUrlParams);
  const prevFlatUrlKeysRef = useRef(new Set<string>());
  serializeRef.current = serialize;
  deserializeRef.current = deserialize;
  defaultValueRef.current = defaultValue;
  removeIfDefaultRef.current = removeIfDefault;
  storageRef.current = storage;
  syncUrlRef.current = syncUrl;
  flatUrlParamsRef.current = flatUrlParams;

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
      if (
        flatUrlParamsRef.current &&
        state !== null &&
        typeof state === "object"
      ) {
        try {
          const currentObj = state as Record<string, unknown>;
          const defaultObj = _defaultValue as Record<string, unknown>;
          const keysToProcess = new Set([
            ...prevFlatUrlKeysRef.current,
            ...Object.keys(currentObj),
          ]);

          setSearchParams(
            (prev) => {
              for (const k of keysToProcess) {
                const v = currentObj[k];
                const isDefault =
                  _removeIfDefault &&
                  JSON.stringify(v) === JSON.stringify(defaultObj[k]);
                if (v === undefined || v === null || isDefault) {
                  prev.delete(k);
                } else {
                  // Arrays and plain objects must be JSON-stringified so they
                  // survive the URL roundtrip intact. Primitives (string,
                  // number, boolean) are written as-is so the URL stays human-
                  // readable (?status=active, ?page=3, ?inStock=true).
                  const serialized =
                    Array.isArray(v) || (typeof v === "object" && v !== null)
                      ? JSON.stringify(v)
                      : String(v);
                  prev.set(k, serialized);
                }
              }
              return prev;
            },
            { replace: true },
          );

          prevFlatUrlKeysRef.current = new Set(Object.keys(currentObj));
        } catch (error) {
          console.warn(
            `Failed to persist flat URL params for key "${key}":`,
            error,
          );
        }
      } else {
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
    }
  }, [key, state, setSearchParams]);

  // --- sync URL → local state (reactive: runs whenever `params` changes) ---
  useEffect(() => {
    if (!syncUrlRef.current) return;

    const _defaultValue = defaultValueRef.current;
    const _deserialize = deserializeRef.current;

    let urlValue: T | undefined;

    if (
      flatUrlParamsRef.current &&
      _defaultValue !== null &&
      typeof _defaultValue === "object"
    ) {
      const defaults = _defaultValue as Record<string, unknown>;
      const urlObj: Record<string, unknown> = {};
      let anyFound = false;
      for (const k of Object.keys(defaults)) {
        const raw = params.get(k);
        if (raw != null) {
          anyFound = true;
          try {
            urlObj[k] = JSON.parse(raw);
          } catch {
            urlObj[k] = raw;
          }
        }
      }
      // all keys absent → URL cleared → revert to defaults
      urlValue = anyFound
        ? ({ ...defaults, ...urlObj } as T)
        : ({ ...defaults } as T);
    } else {
      const raw = params.get(key);
      if (raw != null) {
        try {
          urlValue = _deserialize(raw);
        } catch {
          /* ignore — keep current state */
        }
      } else {
        urlValue = _defaultValue;
      }
    }

    if (urlValue !== undefined) {
      setState((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(urlValue)) return prev;
        return urlValue!;
      });
    }
    // `params` is wouter's reactive URLSearchParams — changes whenever the URL changes.
    // All other options read via refs to avoid stale-closure / infinite-loop issues.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, key]);

  return [state, setPersistedState] as const;
}
