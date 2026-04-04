import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "wouter";
import { useRouterConfig } from "../../Router/RouterConfigContext";
import { getCurrentPath } from "../../Router/routeStateStorage";

export type StorageType = "localStorage" | "sessionStorage" | false;

type Options<T> = {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  removeIfDefault?: boolean;
  /**
   * Which Web Storage backend to use for the route-scoped param recovery key.
   * - `"sessionStorage"` or `false` → route-scoped key written to sessionStorage (default)
   * - `"localStorage"` → route-scoped key written to localStorage (survives tab close)
   */
  storage?: StorageType;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
  /** When true and T is a plain object, each property is written as its own URL
   * search param instead of one JSON blob. */
  flatUrlParams?: boolean;
};

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
  const { routeStatePrefix } = useRouterConfig();

  // --- initialize state from URL → route-scoped storage → storage → default (runs once) ---
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

    // 3. default value
    return defaultValue;
  });

  // Keep latest values in refs so the setter never closes over stale options.
  const stateRef = useRef(state);
  const keyRef = useRef(key);
  const setSearchParamsRef = useRef(setSearchParams);
  const serializeRef = useRef(serialize);
  const deserializeRef = useRef(deserialize);
  const defaultValueRef = useRef(defaultValue);
  const removeIfDefaultRef = useRef(removeIfDefault);
  const storageRef = useRef(storage);
  const syncUrlRef = useRef(syncUrl);
  const flatUrlParamsRef = useRef(flatUrlParams);
  const prevFlatUrlKeysRef = useRef(new Set<string>());
  const routeStatePrefixRef = useRef(routeStatePrefix);
  stateRef.current = state;
  keyRef.current = key;
  setSearchParamsRef.current = setSearchParams;
  routeStatePrefixRef.current = routeStatePrefix;
  serializeRef.current = serialize;
  deserializeRef.current = deserialize;
  defaultValueRef.current = defaultValue;
  removeIfDefaultRef.current = removeIfDefault;
  storageRef.current = storage;
  syncUrlRef.current = syncUrl;
  flatUrlParamsRef.current = flatUrlParams;

  // --- state setter: updates local state and immediately persists to URL / Web Storage ---
  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    const nextValue =
      typeof value === "function"
        ? (value as (prev: T) => T)(stateRef.current)
        : value;
    setState(nextValue);

    const _key = keyRef.current;
    const _serialize = serializeRef.current;
    const _defaultValue = defaultValueRef.current;
    const _removeIfDefault = removeIfDefaultRef.current;

    let serializedState: string;
    let serializedDefault: string;

    try {
      serializedState = _serialize(nextValue);
      serializedDefault = _serialize(_defaultValue);
    } catch (error) {
      console.warn(`Failed to serialize value for key "${_key}":`, error);
      return;
    }

    if (syncUrlRef.current) {
      if (
        flatUrlParamsRef.current &&
        nextValue !== null &&
        typeof nextValue === "object"
      ) {
        try {
          const currentObj = nextValue as Record<string, unknown>;
          const defaultObj = _defaultValue as Record<string, unknown>;
          const keysToProcess = new Set([
            ...prevFlatUrlKeysRef.current,
            ...Object.keys(currentObj),
          ]);

          setSearchParamsRef.current(
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

          // Write to route-scoped storage for param recovery on navigation.
          // Respects the configured storage type; falls back to sessionStorage
          // when storage is false (URL-only mode).
          if (typeof window !== "undefined") {
            const path = getCurrentPath();
            const routeKey = `${routeStatePrefixRef.current}:${path}`;
            const routeStore =
              storageRef.current === "localStorage"
                ? localStorage
                : sessionStorage;
            const existing = new URLSearchParams(
              routeStore.getItem(routeKey) ?? "",
            );
            for (const k of keysToProcess) {
              const v = currentObj[k];
              const isDefault =
                _removeIfDefault &&
                JSON.stringify(v) === JSON.stringify(defaultObj[k]);
              if (v === undefined || v === null || isDefault) {
                existing.delete(k);
              } else {
                const serialized =
                  Array.isArray(v) || (typeof v === "object" && v !== null)
                    ? JSON.stringify(v)
                    : String(v);
                existing.set(k, serialized);
              }
            }
            const str = existing.toString();
            if (str) {
              routeStore.setItem(routeKey, str);
            } else {
              routeStore.removeItem(routeKey);
            }
          }
        } catch (error) {
          console.warn(
            `Failed to persist flat URL params for key "${_key}":`,
            error,
          );
        }
      } else {
        try {
          setSearchParamsRef.current(
            (prev) => {
              const current = prev.get(_key);

              if (_removeIfDefault && serializedState === serializedDefault) {
                if (current == null) {
                  return prev;
                }
                prev.delete(_key);
                return prev;
              }

              if (current === serializedState) {
                return prev;
              }

              prev.set(_key, serializedState);
              return prev;
            },
            { replace: true },
          );

          // Write to route-scoped storage for param recovery on navigation.
          // Respects the configured storage type; falls back to sessionStorage
          // when storage is false (URL-only mode).
          if (typeof window !== "undefined") {
            const path = getCurrentPath();
            const routeKey = `${routeStatePrefixRef.current}:${path}`;
            const routeStore =
              storageRef.current === "localStorage"
                ? localStorage
                : sessionStorage;
            const existing = new URLSearchParams(
              routeStore.getItem(routeKey) ?? "",
            );
            if (_removeIfDefault && serializedState === serializedDefault) {
              existing.delete(_key);
            } else {
              existing.set(_key, serializedState);
            }
            const str = existing.toString();
            if (str) {
              routeStore.setItem(routeKey, str);
            } else {
              routeStore.removeItem(routeKey);
            }
          }
        } catch (error) {
          console.warn(`Failed to persist URL param for key "${_key}":`, error);
        }
      }
    }
  }, []); // all deps accessed via refs — stable for the lifetime of the component

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
