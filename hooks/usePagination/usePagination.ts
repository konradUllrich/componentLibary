import { useEffect } from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import type { StorageType } from "../usePersistedState/usePersistedState";
import { useStoreUrlSync } from "../useStoreUrlSync";

export type UsePaginationOptions = {
  /** Unique storage/URL key prefix. Defaults to "pagination". */
  storageKey?: string;
  /** Initial page (1-based). Defaults to 1. */
  defaultPage?: number;
  /** Initial page size. Defaults to 10. */
  defaultPageSize?: number;
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

// Internal store shape
type PaginationStoreState = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  _defaultPage: number;
  _defaultPageSize: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (count: number) => void;
  reset: () => void;
};

// SSR-safe storage accessor
function getWebStorage(type: StorageType): Storage | null {
  if (type === false || typeof window === "undefined") return null;
  return type === "localStorage" ? window.localStorage : window.sessionStorage;
}

function recalcDerived(
  page: number,
  pageSize: number,
  totalItems: number,
): Pick<PaginationStoreState, "totalPages" | "hasNext" | "hasPrevious"> {
  const totalPages = Math.ceil(totalItems / pageSize) || 0;
  return { totalPages, hasNext: page < totalPages, hasPrevious: page > 1 };
}

function buildStore(
  storageKey: string,
  defaultPage: number,
  defaultPageSize: number,
  storage: StorageType,
): StoreApi<PaginationStoreState> {
  // Hydrate from Web Storage on first creation (plain JSON — same format as
  // the former usePersistedState backend: { page, pageSize }).
  let initialPage = defaultPage;
  let initialPageSize = defaultPageSize;
  const webStorage = getWebStorage(storage);
  if (webStorage) {
    try {
      const raw = webStorage.getItem(storageKey);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as { page?: number; pageSize?: number };
        if (typeof parsed.page === "number") initialPage = parsed.page;
        if (typeof parsed.pageSize === "number")
          initialPageSize = parsed.pageSize;
      }
    } catch {
      /* ignore — fall back to defaults */
    }
  }

  const store = createStore<PaginationStoreState>()((set, get) => ({
    page: initialPage,
    pageSize: initialPageSize,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
    _defaultPage: defaultPage,
    _defaultPageSize: defaultPageSize,

    setPage: (newPage) =>
      set((s) => {
        const clamped = Math.max(1, Math.min(newPage, s.totalPages || 1));
        return {
          page: clamped,
          ...recalcDerived(clamped, s.pageSize, s.totalItems),
        };
      }),

    nextPage: () =>
      set((s) => {
        const next = Math.min(s.page + 1, s.totalPages || s.page);
        return { page: next, ...recalcDerived(next, s.pageSize, s.totalItems) };
      }),

    prevPage: () =>
      set((s) => {
        const prev = Math.max(s.page - 1, 1);
        return { page: prev, ...recalcDerived(prev, s.pageSize, s.totalItems) };
      }),

    setPageSize: (size) =>
      set((s) => ({
        page: 1,
        pageSize: size,
        ...recalcDerived(1, size, s.totalItems),
      })),

    setTotalItems: (count) =>
      set((s) => {
        const totalPages = Math.ceil(count / s.pageSize) || 0;
        const page = totalPages > 0 ? Math.min(s.page, totalPages) : s.page;
        return {
          totalItems: count,
          page,
          ...recalcDerived(page, s.pageSize, count),
        };
      }),

    reset: () => {
      const s = get();
      const page = s._defaultPage;
      const pageSize = s._defaultPageSize;
      set(() => ({
        page,
        pageSize,
        totalItems: 0,
        ...recalcDerived(page, pageSize, 0),
      }));
    },
  }));

  // Persist { page, pageSize } to Web Storage on every state change.
  // Plain JSON format; key is removed when both values equal the defaults.
  if (webStorage !== null) {
    store.subscribe((state) => {
      if (
        state.page === state._defaultPage &&
        state.pageSize === state._defaultPageSize
      ) {
        webStorage.removeItem(storageKey);
      } else {
        webStorage.setItem(
          storageKey,
          JSON.stringify({ page: state.page, pageSize: state.pageSize }),
        );
      }
    });
  }

  return store;
}

/**
 * createPagination – factory that creates an isolated pagination store and
 * returns a React hook for use in components.
 *
 * All instances that share the same hook (returned value) share the same
 * underlying Zustand store and stay in sync automatically.
 *
 * @example
 * ```tsx
 * // Create once at module level (or in a context/provider)
 * const usePagination = createPagination({
 *   storageKey: 'users-pagination',
 *   defaultPageSize: 20,
 * });
 *
 * function UserList() {
 *   const { page, pageSize, setPage, setTotalItems } = usePagination({ totalItems: count });
 *   // ...
 * }
 * ```
 */
export function createPagination({
  storageKey = "pagination",
  defaultPage = 1,
  defaultPageSize = 10,
  storage = "sessionStorage" as const,
  syncUrl = true,
}: UsePaginationOptions = {}) {
  const store = buildStore(storageKey, defaultPage, defaultPageSize, storage);

  return function usePagination({
    totalItems: totalItemsProp = 0,
  }: { totalItems?: number } = {}): PaginationState {
    const page = useStore(store, (s) => s.page);
    const pageSize = useStore(store, (s) => s.pageSize);
    const totalItems = useStore(store, (s) => s.totalItems);
    const totalPages = useStore(store, (s) => s.totalPages);
    const hasNext = useStore(store, (s) => s.hasNext);
    const hasPrevious = useStore(store, (s) => s.hasPrevious);

    // Sync the totalItems prop into the store whenever it changes
    useEffect(() => {
      store.getState().setTotalItems(totalItemsProp);
    }, [totalItemsProp]);

    // Stable action references — extracted from the store (never change)
    const { setPage, nextPage, prevPage, setPageSize, setTotalItems, reset } =
      store.getState();

    // URL sync — page and pageSize as plain numbers.
    // Key is omitted from URL when value matches the default.
    useStoreUrlSync(syncUrl ? store : null, {
      serialize: (s) => ({
        page: s.page !== s._defaultPage ? String(s.page) : "",
        pageSize: s.pageSize !== s._defaultPageSize ? String(s.pageSize) : "",
      }),
      deserialize: (params) => {
        const rawPage = params.get("page");
        const rawPageSize = params.get("pageSize");
        if (rawPage === null && rawPageSize === null) return null;
        const s = store.getState();
        const pg =
          rawPage !== null
            ? parseInt(rawPage, 10) || s._defaultPage
            : s._defaultPage;
        const ps =
          rawPageSize !== null
            ? parseInt(rawPageSize, 10) || s._defaultPageSize
            : s._defaultPageSize;
        const totalPages = Math.ceil(s.totalItems / ps) || 0;
        // When totalItems hasn't been set yet, don't clamp — preserve the
        // URL-supplied page so it survives until setTotalItems() is called.
        const clampedPage =
          totalPages > 0 ? Math.max(1, Math.min(pg, totalPages)) : pg;
        return {
          page: clampedPage,
          pageSize: ps,
          ...recalcDerived(clampedPage, ps, s.totalItems),
        };
      },
    });

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
  };
}
