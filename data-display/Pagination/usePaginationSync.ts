import { useEffect, useRef } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import type { PaginationStore } from "./paginationStore";
import { useSearchParams } from "../../Router/hooks";

export interface PaginationSyncOptions {
  /**
   * Namespace key that prefixes both URL params, allowing multiple synced
   * paginations on the same page without collisions.
   *
   * @example
   * usePaginationSync(storeA, { key: "users" });   // users_page, users_pageSize
   * usePaginationSync(storeB, { key: "orders" });  // orders_page, orders_pageSize
   */
  key?: string;
  /** Override the URL search param name for the page number. When `key` is set
   *  this defaults to `{key}_page`, otherwise `"page"`. */
  pageParam?: string;
  /** Override the URL search param name for the page size. When `key` is set
   *  this defaults to `{key}_pageSize`, otherwise `"pageSize"`. */
  pageSizeParam?: string;
}

/**
 * usePaginationSync – syncs a pagination store's `page` and `pageSize` with
 * URL search params via the Router.
 *
 * On mount the hook reads the params from the URL and initialises the store.
 * Whenever the store changes, the URL is updated with `replace: true` so the
 * browser history is kept clean (no extra back-stack entries per page click).
 *
 * The hook is purely opt-in: components that do not call it continue to work
 * with the store in isolation, unchanged.
 *
 * @example
 * ```tsx
 * const store = createPaginationStore(10);
 * store.getState().setTotalItems(100);
 *
 * function ItemListPage() {
 *   usePaginationSync(store);
 *   return <Pagination store={store} />;
 * }
 * ```
 *
 * Multiple paginations on the same page – use `key` to avoid param collisions:
 * ```tsx
 * usePaginationSync(usersStore,  { key: "users" });   // users_page, users_pageSize
 * usePaginationSync(ordersStore, { key: "orders" });  // orders_page, orders_pageSize
 * ```
 *
 * Override individual param names:
 * ```tsx
 * usePaginationSync(store, { pageParam: "p", pageSizeParam: "size" });
 * ```
 */
export function usePaginationSync(
  store: UseBoundStore<StoreApi<PaginationStore>>,
  { key, pageParam, pageSizeParam }: PaginationSyncOptions = {},
): void {
  const resolvedPageParam = pageParam ?? (key ? `${key}_page` : "page");
  const resolvedPageSizeParam =
    pageSizeParam ?? (key ? `${key}_pageSize` : "pageSize");
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep a ref to the latest setter so the store subscriber never goes stale.
  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;

  // Keep a ref to the latest searchParams for the initialisation effect.
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  // Guards against ping-pong: URL change → store → URL → …
  const isSyncingFromUrl = useRef(false);

  // Initialise store from URL on mount only.
  useEffect(() => {
    const params = searchParamsRef.current;
    const rawPage = params.get(resolvedPageParam);
    const rawPageSize = params.get(resolvedPageSizeParam);

    if (rawPage === null && rawPageSize === null) return;

    isSyncingFromUrl.current = true;

    const pageSize = rawPageSize !== null ? parseInt(rawPageSize, 10) : null;
    const page = rawPage !== null ? parseInt(rawPage, 10) : null;

    // Apply pageSize first so setPage clamps correctly against the right totalPages.
    if (pageSize !== null && !isNaN(pageSize) && pageSize > 0) {
      store.getState().setPageSize(pageSize);
    }
    if (page !== null && !isNaN(page) && page > 0) {
      store.getState().setPage(page);
    }

    isSyncingFromUrl.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // Sync store changes → URL (replace, not push).
  useEffect(() => {
    const unsubscribe = store.subscribe((state, prev) => {
      if (isSyncingFromUrl.current) return;
      if (state.page === prev.page && state.pageSize === prev.pageSize) return;

      setSearchParamsRef.current(
        (current) => {
          const next = new URLSearchParams(current);
          next.set(resolvedPageParam, String(state.page));
          next.set(resolvedPageSizeParam, String(state.pageSize));
          return next;
        },
        { replace: true },
      );
    });

    return unsubscribe;
  }, [store, resolvedPageParam, resolvedPageSizeParam]);
}
