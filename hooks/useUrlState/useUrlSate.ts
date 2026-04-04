import { useCallback, useMemo, useRef } from "react";
import { useLocation, useSearch } from "wouter";
import { useRouterConfig } from "../../Router/RouterConfigContext";
import {
  getCurrentPath,
  getCurrentSearch,
} from "../../Router/routeStateStorage";

export type StorageType = "localStorage" | "sessionStorage" | false;

type Options<T> = {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  removeIfDefault?: boolean;
  /**
   * Which Web Storage backend to use for route-scoped param recovery on navigation.
   * - `"sessionStorage"` (default) → survives page refresh, cleared when tab closes
   * - `"localStorage"` → survives tab close
   * - `false` → no storage writes; URL params are lost on navigation
   */
  storage?: StorageType;
  /** When true and T is a plain object, each property is written as its own URL
   * search param instead of one JSON blob. */
  flatUrlParams?: boolean;
};

/**
 * useUrlState – URL search params as single source of truth.
 *
 * State is derived directly from `useSearchParams`; there is no separate
 * `useState`. Reading returns a value decoded from the current URL, and
 * writing calls `setSearchParams` to update the URL (and therefore the state).
 *
 * @example
 * const [page, setPage] = useUrlState({ key: "page", defaultValue: 1 });
 */
export function useUrlState<T>({
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  removeIfDefault = true,
  storage = "sessionStorage",
  flatUrlParams = false,
}: Options<T>) {
  const [location, navigate] = useLocation();
  const locationRef = useRef(location);
  locationRef.current = location;
  const searchStr = useSearch();
  const params = useMemo(() => new URLSearchParams(searchStr), [searchStr]);
  const { routeStatePrefix } = useRouterConfig();

  // Derive state directly from URL params — no separate useState needed.
  const state = useMemo((): T => {
    if (
      flatUrlParams &&
      defaultValue !== null &&
      typeof defaultValue === "object"
    ) {
      const defaults = defaultValue as Record<string, unknown>;
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
      return (anyFound ? { ...defaults, ...urlObj } : { ...defaults }) as T;
    }

    const raw = params.get(key);
    if (raw != null) {
      try {
        return deserialize(raw);
      } catch (e) {
        console.warn(`Failed to deserialize URL param "${key}":`, e);
      }
    }
    return defaultValue;
  }, [params, key, defaultValue, deserialize, flatUrlParams]);

  // Refs so the setter never closes over stale option values.
  const stateRef = useRef(state);
  stateRef.current = state;
  const keyRef = useRef(key);
  keyRef.current = key;
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;
  const serializeRef = useRef(serialize);
  serializeRef.current = serialize;
  const removeIfDefaultRef = useRef(removeIfDefault);
  removeIfDefaultRef.current = removeIfDefault;
  const flatUrlParamsRef = useRef(flatUrlParams);
  flatUrlParamsRef.current = flatUrlParams;
  const storageRef = useRef(storage);
  storageRef.current = storage;
  const routeStatePrefixRef = useRef(routeStatePrefix);
  routeStatePrefixRef.current = routeStatePrefix;

  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      // Compute nextValue here so we can reuse it for both the URL update
      // and the route-scoped storage write without duplicating logic.
      const nextValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(stateRef.current)
          : value;

      const _key = keyRef.current;
      const _defaultValue = defaultValueRef.current;
      const _serialize = serializeRef.current;
      const _removeIfDefault = removeIfDefaultRef.current;
      const _flatUrlParams = flatUrlParamsRef.current;
      const _storage = storageRef.current;

      // --- Update URL ---
      // Read the live URL at write time so that multiple synchronous setState
      // calls from different hooks chain off each other's replaceState writes
      // rather than all starting from the same stale render-time snapshot.
      const freshParams = new URLSearchParams(getCurrentSearch());

      if (
        _flatUrlParams &&
        nextValue !== null &&
        typeof nextValue === "object"
      ) {
        const currentObj = nextValue as Record<string, unknown>;
        const defaultObj = _defaultValue as Record<string, unknown>;
        for (const k of Object.keys(currentObj)) {
          const v = currentObj[k];
          const isDefault =
            _removeIfDefault &&
            JSON.stringify(v) === JSON.stringify(defaultObj[k]);
          if (v === undefined || v === null || isDefault) {
            freshParams.delete(k);
          } else {
            freshParams.set(
              k,
              Array.isArray(v) || (typeof v === "object" && v !== null)
                ? JSON.stringify(v)
                : String(v),
            );
          }
        }
      } else {
        let serializedState: string;
        let serializedDefault: string;
        try {
          serializedState = _serialize(nextValue);
          serializedDefault = _serialize(_defaultValue);
        } catch (error) {
          console.warn(`Failed to serialize value for key "${_key}":`, error);
          return;
        }

        if (_removeIfDefault && serializedState === serializedDefault) {
          freshParams.delete(_key);
        } else {
          freshParams.set(_key, serializedState);
        }
      }

      const search = freshParams.toString();
      navigate(locationRef.current + (search ? "?" + search : ""), {
        replace: true,
      });

      // --- Write to route-scoped storage for param recovery on navigation ---
      if (typeof window !== "undefined" && _storage !== false) {
        const path = getCurrentPath();
        const routeKey = `${routeStatePrefixRef.current}:${path}`;
        const store =
          _storage === "localStorage" ? localStorage : sessionStorage;

        const existing = new URLSearchParams(store.getItem(routeKey) ?? "");

        if (
          _flatUrlParams &&
          nextValue !== null &&
          typeof nextValue === "object"
        ) {
          const currentObj = nextValue as Record<string, unknown>;
          const defaultObj = _defaultValue as Record<string, unknown>;
          for (const k of Object.keys(currentObj)) {
            const v = currentObj[k];
            const isDefault =
              _removeIfDefault &&
              JSON.stringify(v) === JSON.stringify(defaultObj[k]);
            if (v === undefined || v === null || isDefault) {
              existing.delete(k);
            } else {
              existing.set(
                k,
                Array.isArray(v) || (typeof v === "object" && v !== null)
                  ? JSON.stringify(v)
                  : String(v),
              );
            }
          }
        } else {
          let serializedState: string;
          let serializedDefault: string;
          try {
            serializedState = _serialize(nextValue);
            serializedDefault = _serialize(_defaultValue);
          } catch {
            return;
          }
          if (_removeIfDefault && serializedState === serializedDefault) {
            existing.delete(_key);
          } else {
            existing.set(_key, serializedState);
          }
        }

        const str = existing.toString();
        if (str) store.setItem(routeKey, str);
        else store.removeItem(routeKey);
      }
    },
    [navigate],
  );

  return [state, setState] as const;
}
