/**
 * useStoreUrlSync – private internal helper.
 *
 * Bi-directionally syncs a Zustand store with URL search params.
 * - URL → Store: once on mount via `deserialize`.
 * - Store → URL: on every state change via `serialize`.
 *
 * Ping-pong is prevented by an `isSyncingFromUrl` ref guard.
 *
 * NOT exported from index.ts – internal use by useFilter and usePagination only.
 */
import { useEffect, useRef } from "react";
import type { StoreApi } from "zustand";
import { useSearchParams } from "../Router/hooks";

export interface StoreUrlSyncOptions<T extends object> {
  serialize: (state: T) => Record<string, string>;
  deserialize: (params: URLSearchParams) => Partial<T> | null | undefined;
  replace?: boolean;
}

export function useStoreUrlSync<T extends object>(
  store: StoreApi<T> | null,
  { serialize, deserialize, replace = true }: StoreUrlSyncOptions<T>,
): void {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;

  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const serializeRef = useRef(serialize);
  serializeRef.current = serialize;

  const deserializeRef = useRef(deserialize);
  deserializeRef.current = deserialize;

  const isSyncingFromUrl = useRef(false);

  // URL → Store: once on mount
  useEffect(() => {
    if (!store) return;
    const params = new URLSearchParams(searchParamsRef.current);
    const patch = deserializeRef.current(params);
    if (!patch) return;

    isSyncingFromUrl.current = true;
    store.setState(patch);
    isSyncingFromUrl.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // Store → URL: on every state change
  useEffect(() => {
    if (!store) return;
    const unsubscribe = store.subscribe((state) => {
      if (isSyncingFromUrl.current) return;

      const entries = serializeRef.current(state);

      setSearchParamsRef.current(
        (current) => {
          const next = new URLSearchParams(current);
          for (const [k, v] of Object.entries(entries)) {
            if (v === "") {
              next.delete(k);
            } else {
              next.set(k, v);
            }
          }
          return next;
        },
        { replace },
      );
    });

    return unsubscribe;
  }, [store, replace]);
}
