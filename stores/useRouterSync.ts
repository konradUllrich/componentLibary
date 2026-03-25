import { useEffect, useRef } from "react";
import type { StoreApi } from "zustand";
import { useSearchParams } from "../Router/hooks";

export interface RouterSyncOptions<T extends object> {
  /**
   * Convert the store state (or a subset) to a flat URL params record.
   *
   * Only the keys that are returned will ever be written to the URL.
   * Return an empty record to remove all managed params from the URL.
   *
   * @example
   * serialize: (state) => ({ status: state.filters.status ?? '' })
   */
  serialize: (state: T) => Record<string, string>;

  /**
   * Read the current URL search params and return a partial store state to
   * apply via `store.setState`.
   *
   * Called **once on mount** when the URL contains at least one of the managed
   * params. The returned object is shallow-merged into the store's state.
   *
   * Return `null` / `undefined` to skip applying any changes (e.g. when no
   * relevant params are present).
   *
   * @example
   * deserialize: (params) => ({ filters: { status: params.get('status') ?? '' } })
   */
  deserialize: (params: URLSearchParams) => Partial<T> | null | undefined;

  /**
   * When `true` (default) store→URL updates use `history.replaceState` so they
   * don't pollute the browser's back-stack.
   * Set to `false` to use `history.pushState` instead.
   */
  replace?: boolean;
}

/**
 * useRouterSync – generic hook that bi-directionally syncs a Zustand store's
 * state with URL search params.
 *
 * - **URL → Store** (once on mount): reads current search params and applies
 *   the result of `deserialize` to the store via `setState`.
 * - **Store → URL** (on every change): calls `serialize` with the latest state
 *   and updates the search params, using `replace` by default.
 *
 * Ping-pong is prevented by a ref-based `isSyncingFromUrl` guard identical to
 * the one used in `usePaginationSync`.
 *
 * @example
 * ```tsx
 * type MyFilters = { status: string; category: string };
 * const store = createFilterStore<MyFilters>();
 *
 * function FilterPanel() {
 *   useRouterSync(store, {
 *     serialize:   (s) => ({ status: s.filters.status ?? '', category: s.filters.category ?? '' }),
 *     deserialize: (p) => ({ filters: { status: p.get('status') ?? '', category: p.get('category') ?? '' } }),
 *   });
 *   // ...
 * }
 * ```
 *
 * Works with any store – filterStore, sortingStore, valueStore, or your own:
 * ```tsx
 * const sortStore = createSortingStore();
 *
 * function TablePage() {
 *   useRouterSync(sortStore, {
 *     serialize: (s) => ({
 *       sort: s.sortColumns.map((c) => `${c.key}:${c.direction}`).join(','),
 *     }),
 *     deserialize: (p) => {
 *       const raw = p.get('sort') ?? '';
 *       const sortColumns = raw
 *         ? raw.split(',').map((part) => {
 *             const [key, direction] = part.split(':');
 *             return { key, direction: direction as import('./sortingStore').SortDirection };
 *           })
 *         : [];
 *       return { sortColumns };
 *     },
 *   });
 * }
 * ```
 */
export function useRouterSync<T extends object>(
  store: StoreApi<T>,
  { serialize, deserialize, replace = true }: RouterSyncOptions<T>,
): void {
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep a ref to the latest setter so the subscriber closure never goes stale.
  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;

  // Keep a ref to the latest searchParams for the initialisation effect.
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  // Keep stable refs for serialize/deserialize so effects don't re-run on
  // every inline function recreation.
  const serializeRef = useRef(serialize);
  serializeRef.current = serialize;
  const deserializeRef = useRef(deserialize);
  deserializeRef.current = deserialize;

  // Guards against ping-pong: URL change → store → URL → …
  const isSyncingFromUrl = useRef(false);

  // Initialise store from URL on mount only.
  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current);
    const patch = deserializeRef.current(params);
    if (!patch) return;

    isSyncingFromUrl.current = true;
    store.setState(patch);
    isSyncingFromUrl.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // Sync store changes → URL.
  useEffect(() => {
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
