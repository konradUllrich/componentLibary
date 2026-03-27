import { useCallback, useMemo, useRef, useState } from "react";
import {
  usePersistedState,
  type StorageType,
} from "../usePersistedState/usePersistedState";

export type UsePaginationOptions = {
  /** Unique storage/URL key prefix. Defaults to "pagination". */
  storageKey?: string;
  /** Initial page (1-based). Defaults to 1. */
  defaultPage?: number;
  /** Initial page size. Defaults to 10. */
  defaultPageSize?: number;
  /** Total number of items — can also be updated via setTotalItems. */
  totalItems?: number;
  /** Web Storage backend. Defaults to "sessionStorage". Set to false to disable storage entirely. */
  storage?: StorageType;
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

type PersistedPagination = {
  page: number;
  pageSize: number;
};

export function usePagination({
  storageKey = "pagination",
  defaultPage = 1,
  defaultPageSize = 10,
  totalItems: totalItemsProp = 0,
  storage = "sessionStorage" as const,
  syncUrl = true,
}: UsePaginationOptions = {}): PaginationState {
  const defaultValue = useMemo<PersistedPagination>(
    () => ({
      page: defaultPage,
      pageSize: defaultPageSize,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [persisted, setPersisted] = usePersistedState<PersistedPagination>({
    key: storageKey,
    defaultValue,
    storage,
    syncUrl,
    removeIfDefault: true,
    flatUrlParams: true,
  });

  const [totalItems, setTotalItemsState] = useState(totalItemsProp);
  const totalItemsRef = useRef(totalItems);
  totalItemsRef.current = totalItems;

  // Derive read-only computed values from persisted state
  const { page, pageSize } = persisted;
  const totalPages = Math.ceil(totalItems / pageSize) || 0;
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;

  const clampPage = useCallback(
    (p: number, tp: number) => Math.max(1, Math.min(p, tp || 1)),
    [],
  );

  const setPage = useCallback(
    (newPage: number) => {
      setPersisted((prev) => ({
        ...prev,
        page: clampPage(
          newPage,
          Math.ceil(totalItemsRef.current / prev.pageSize) || 0,
        ),
      }));
    },
    [setPersisted, clampPage],
  );

  const nextPage = useCallback(() => {
    setPersisted((prev) => {
      const tp = Math.ceil(totalItemsRef.current / prev.pageSize) || 0;
      return { ...prev, page: Math.min(prev.page + 1, tp || prev.page) };
    });
  }, [setPersisted]);

  const prevPage = useCallback(() => {
    setPersisted((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
  }, [setPersisted]);

  const setPageSize = useCallback(
    (size: number) => {
      setPersisted((prev) => ({
        ...prev,
        pageSize: size,
        page: 1,
      }));
    },
    [setPersisted],
  );

  const setTotalItems = useCallback(
    (count: number) => {
      totalItemsRef.current = count; // update immediately for same-flush reads (e.g. setPage called right after)
      setTotalItemsState(count);
      setPersisted((prev) => {
        const tp = Math.ceil(count / prev.pageSize) || 0;
        return { ...prev, page: clampPage(prev.page, tp) };
      });
    },
    [setPersisted, clampPage],
  );

  const reset = useCallback(() => {
    setPersisted({ page: defaultPage, pageSize: defaultPageSize });
    setTotalItemsState(totalItemsProp);
  }, [setPersisted, defaultPage, defaultPageSize, totalItemsProp]);

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNext,
    hasPrevious,
    setPage,
    nextPage,
    prevPage,
    setPageSize,
    setTotalItems,
    reset,
  };
}
