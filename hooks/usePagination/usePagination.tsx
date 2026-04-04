import { useState, useCallback, useRef } from "react";
import { usePersistedState } from "../usePersistedState/usePersistedState";

export type UsePaginationOptions = {
  /** Initial page (1-based). Defaults to 1. */
  defaultPage?: number;
  /** Initial page size. Defaults to 10. */
  defaultPageSize?: number;
  /** URL search param name for the page number. Defaults to "page". */
  pageParam?: string;
  /** URL search param name for the page size. Defaults to "pageSize". */
  pageSizeParam?: string;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
};

export type PaginationState = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (count: number) => void;
  reset: () => void;
};

/**
 * usePagination – manages pagination state with optional URL sync via the Router.
 *
 * Uses `usePersistedState` under the hood — `page` and `pageSize` are synced
 * to URL search params (storage disabled). Pass `syncUrl: false` to keep state
 * local only.
 *
 * @example
 * function UserList({ totalCount }: { totalCount: number }) {
 *   const pagination = usePagination({ defaultPageSize: 20 });
 *   pagination.setTotalItems(totalCount);
 *   return <Pagination pagination={pagination} />;
 * }
 *
 * // Multiple paginations on the same page — use distinct param names:
 * const users = usePagination({ pageParam: "users_page", pageSizeParam: "users_size" });
 * const orders = usePagination({ pageParam: "orders_page", pageSizeParam: "orders_size" });
 */
export function usePagination({
  defaultPage = 1,
  defaultPageSize = 10,
  pageParam = "page",
  pageSizeParam = "pageSize",
  syncUrl = true,
}: UsePaginationOptions = {}): PaginationState {
  const [page, setPageRaw] = usePersistedState({
    key: pageParam,
    defaultValue: defaultPage,
    storage: false,
    syncUrl,
    serialize: String,
    deserialize: (s) => parseInt(s, 1) || defaultPage,
  });

  const [pageSize, setPageSizeRaw] = usePersistedState({
    key: pageSizeParam,
    defaultValue: defaultPageSize,
    storage: false,
    syncUrl,
    serialize: String,
    deserialize: (s) => parseInt(s, 10) || defaultPageSize,
  });

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
      setPageRaw(Math.max(1, Math.min(newPage, tp)));
    },
    [setPageRaw],
  );

  const nextPage = useCallback(() => {
    const tp = Math.ceil(totalItemsRef.current / pageSizeRef.current);
    setPage(tp > 0 ? Math.min(pageRef.current + 1, tp) : pageRef.current);
  }, [setPage]);

  const prevPage = useCallback(() => {
    setPage(Math.max(pageRef.current - 1, 1));
  }, [setPage]);

  const setPageSize = useCallback(
    (size: number) => {
      setPageSizeRaw(size);
      setPageRaw(defaultPage);
    },
    [setPageSizeRaw, setPageRaw, defaultPage],
  );

  const setTotalItems = useCallback(
    (count: number) => {
      setTotalItemsState(count);
      const tp = Math.ceil(count / pageSizeRef.current) || 0;
      if (tp > 0 && pageRef.current > tp) {
        setPage(tp);
      }
    },
    [setPage],
  );

  const reset = useCallback(() => {
    setTotalItemsState(0);
    setPageRaw(defaultPage);
    setPageSizeRaw(defaultPageSize);
  }, [setPageRaw, setPageSizeRaw, defaultPage, defaultPageSize]);

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
