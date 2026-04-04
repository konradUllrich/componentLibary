/**
 * useStoreUrlSync – private internal helper.
 *
 * Syncs a Zustand store with URL search params AND route-scoped sessionStorage.
 * - URL → Store: once on mount via `deserialize`.
 * - Store → URL + sessionStorage: on every state change via `serialize`.
 *
 * The sessionStorage key is `${routeStatePrefix}:${currentPath}`, consumed by
 * the wrapped `useLocation` / `Link` to restore params when navigating back.
 *
 * NOT exported from index.ts – internal use by useFilter and usePagination only.
 */
import { useEffect, useRef } from "react";
import type { StoreApi } from "zustand";
import { useSearchParams } from "../Router/hooks";
import { useRouterConfig } from "../Router/RouterConfigContext";
import { getCurrentPath } from "../Router/routeStateStorage";

export interface StoreUrlSyncOptions<T extends object> {
  serialize: (state: T) => Record<string, string>;
  deserialize: (params: URLSearchParams) => Partial<T> | null | undefined;
  replace?: boolean;
  /** Debounce URL writes by this many milliseconds. Useful for text inputs. */
  debounce?: number;
}

export function useStoreUrlSync<T extends object>(
  store: StoreApi<T> | null,
  {
    serialize,
    deserialize,
    replace = true,
    debounce: debounceMs = 0,
  }: StoreUrlSyncOptions<T>,
): void {
  const [searchParams, setSearchParams] = useSearchParams();
  const { routeStatePrefix } = useRouterConfig();

  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const serializeRef = useRef(serialize);
  serializeRef.current = serialize;

  const deserializeRef = useRef(deserialize);
  deserializeRef.current = deserialize;

  const routeStatePrefixRef = useRef(routeStatePrefix);
  routeStatePrefixRef.current = routeStatePrefix;

  // URL → Store: once on mount
  useEffect(() => {
    if (!store) return;
    const params = new URLSearchParams(searchParamsRef.current);
    const patch = deserializeRef.current(params);
    if (!patch) return;

    store.setState(patch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // Store → URL + sessionStorage: on every state change
  useEffect(() => {
    if (!store) return;

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let pendingEntries: Record<string, string> | null = null;

    const flush = (entries: Record<string, string>) => {
      // Write to URL — skip entirely if nothing actually changed
      setSearchParamsRef.current(
        (current) => {
          const next = new URLSearchParams(current);
          let changed = false;
          for (const [k, v] of Object.entries(entries)) {
            if (v === "") {
              if (next.has(k)) {
                next.delete(k);
                changed = true;
              }
            } else if (next.get(k) !== v) {
              next.set(k, v);
              changed = true;
            }
          }
          return changed ? next : current;
        },
        { replace },
      );

      // Write to route-scoped sessionStorage so navigation surfaces can
      // restore this state when the user returns to this route.
      const key = `${routeStatePrefixRef.current}:${getCurrentPath()}`;
      const stored = new URLSearchParams(sessionStorage.getItem(key) ?? "");
      for (const [k, v] of Object.entries(entries)) {
        if (v === "") {
          stored.delete(k);
        } else {
          stored.set(k, v);
        }
      }
      const str = stored.toString();
      if (str) {
        sessionStorage.setItem(key, str);
      } else {
        sessionStorage.removeItem(key);
      }
    };

    const unsubscribe = store.subscribe((state) => {
      const entries = serializeRef.current(state);

      if (!debounceMs) {
        flush(entries);
        return;
      }

      pendingEntries = entries;
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        if (pendingEntries) flush(pendingEntries);
        pendingEntries = null;
      }, debounceMs);
    });

    return () => {
      unsubscribe();
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        // Flush immediately on unmount so state is not lost
        if (pendingEntries) flush(pendingEntries);
      }
    };
  }, [store, replace, debounceMs]);
}
