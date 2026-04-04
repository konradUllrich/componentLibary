import { useState, useCallback, useRef, useMemo } from "react";
import { useUrlState } from "../useUrlState/useUrlSate";
import type { StorageType } from "../useUrlState/useUrlSate";
import type { PaginationState } from "./usePagination";

export type UseUrlPaginationOptions = {
  /** Initial page (1-based). Defaults to 1. */
  defaultPage?: number;
  /** Initial page size. Defaults to 10. */
  defaultPageSize?: number;
  /** URL search param name for the page number. Defaults to "page". */
  pageParam?: string;
  /** URL search param name for the page size. Defaults to "pageSize". */
  pageSizeParam?: string;
  /**
   * Which Web Storage backend to use for route-scoped param recovery.
   * - `"sessionStorage"` (default) → survives page refresh, cleared when tab closes
   * - `"localStorage"` → survives tab close
   * - `false` → no storage writes; URL params are lost on navigation
   */
  storage?: StorageType;
};

/**
 * useUrlPagination – manages pagination state synced to URL search params.
 *
 * Uses `useUrlState` with `flatUrlParams` under the hood so that `page` and
 * `pageSize` are always written in a single `setSearchParams` call. This
 * prevents the race condition that occurs when two separate `useSearchParams`
 * instances each navigate from the same stale URL, causing the second update
 * to overwrite the first.
 *
 * @example
 * function UserList({ totalCount }: { totalCount: number }) {
 *   const pagination = useUrlPagination({ defaultPageSize: 20 });
 *   pagination.setTotalItems(totalCount);
 *   return <Pagination pagination={pagination} />;
 * }
 *
 * // Multiple paginations on the same page — use distinct param names:
 * const users = useUrlPagination({ pageParam: "users_page", pageSizeParam: "users_size" });
 * const orders = useUrlPagination({ pageParam: "orders_page", pageSizeParam: "orders_size" });
 */
export function useUrlPagination({
  defaultPage = 1,
  defaultPageSize = 10,
  pageParam = "page",
  pageSizeParam = "pageSize",
  storage = "sessionStorage",
}: UseUrlPaginationOptions = {}): PaginationState {
  // Use a single useUrlState with flatUrlParams so both page and pageSize are
  // written in one setSearchParams call, avoiding the stale-URL race condition.
  const defaultUrlParams = useMemo<Record<string, number>>(
    () => ({ [pageParam]: defaultPage, [pageSizeParam]: defaultPageSize }),
    [pageParam, pageSizeParam, defaultPage, defaultPageSize],
  );

  const [urlParams, setUrlParams] = useUrlState({
    key: "_pagination",
    defaultValue: defaultUrlParams,
    storage,
    flatUrlParams: true,
  });

  const page = urlParams[pageParam] ?? defaultPage;
  const pageSize = urlParams[pageSizeParam] ?? defaultPageSize;

  const [totalItems, setTotalItemsState] = useState(0);

  const pageRef = useRef(page);
  pageRef.current = page;
  const pageSizeRef = useRef(pageSize);
  pageSizeRef.current = pageSize;
  const totalItemsRef = useRef(totalItems);
  totalItemsRef.current = totalItems;

  const totalPages = Math.ceil(totalItems / pageSize) || 0;

  const setPage = useCallback(
    (newPage: number) => {
      const tp = Math.ceil(totalItemsRef.current / pageSizeRef.current) || 1;
      setUrlParams((prev) => ({
        ...prev,
        [pageParam]: Math.max(1, Math.min(newPage, tp)),
      }));
    },
    [setUrlParams, pageParam],
  );

  const nextPage = useCallback(() => {
    const tp = Math.ceil(totalItemsRef.current / pageSizeRef.current);
    const next = tp > 0 ? Math.min(pageRef.current + 1, tp) : pageRef.current;
    setUrlParams((prev) => ({ ...prev, [pageParam]: next }));
  }, [setUrlParams, pageParam]);

  const prevPage = useCallback(() => {
    setUrlParams((prev) => ({
      ...prev,
      [pageParam]: Math.max(pageRef.current - 1, 1),
    }));
  }, [setUrlParams, pageParam]);

  const setPageSize = useCallback(
    (size: number) => {
      // Single setSearchParams call updates both params atomically.
      setUrlParams((prev) => ({
        ...prev,
        [pageSizeParam]: size,
        [pageParam]: defaultPage,
      }));
    },
    [setUrlParams, pageParam, pageSizeParam, defaultPage],
  );

  const setTotalItems = useCallback(
    (count: number) => {
      setTotalItemsState(count);
      const tp = Math.ceil(count / pageSizeRef.current) || 0;
      if (tp > 0 && pageRef.current > tp) {
        setUrlParams((prev) => ({ ...prev, [pageParam]: tp }));
      }
    },
    [setUrlParams, pageParam],
  );

  const reset = useCallback(() => {
    setTotalItemsState(0);
    setUrlParams(defaultUrlParams);
  }, [setUrlParams, defaultUrlParams]);

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
    setPage,
    nextPage,
    prevPage,
    setPageSize,
    setTotalItems,
    reset,
  };
}
