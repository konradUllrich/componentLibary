import { useCallback, useMemo } from "react";
import {
  usePersistedState,
  type StorageType,
} from "../usePresistedState/usePersistedState";

/** A record of filter key → value pairs. */
export type FilterRecord = Record<string, unknown>;

export type UseListFilterOptions<TFilter extends FilterRecord> = {
  /** Unique storage/URL key prefix. Defaults to "filters". */
  storageKey?: string;
  /** Initial filter values applied on creation and restored when reset() is called. */
  defaultFilters?: Partial<TFilter>;
  /** Web Storage backend. Defaults to "localStorage". */
  storage?: StorageType;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
};

export type ListFilterState<TFilter extends FilterRecord> = {
  /** Current filter values. Only keys that have been explicitly set are present. */
  filters: Partial<TFilter>;
  /** Set (or update) a single filter value. */
  setFilter: <K extends keyof TFilter>(key: K, value: TFilter[K]) => void;
  /** Merge multiple filter values at once. */
  setFilters: (updates: Partial<TFilter>) => void;
  /** Remove a single filter key from the active filters. */
  removeFilter: <K extends keyof TFilter>(key: K) => void;
  /** Remove all active filters. */
  clearFilters: () => void;
  /** Restore filters to the defaultFilters provided at hook creation. */
  reset: () => void;
};

/**
 * useListFilter – a React hook for managing persisted filter state.
 *
 * Built on top of `usePersistedState`, it automatically saves the active
 * filters to Web Storage (localStorage by default) and optionally syncs them
 * to the URL search params — exactly like `usePagination` does for page state.
 *
 * @example
 * ```tsx
 * type MyFilters = { status: string; category: string };
 *
 * function UserList() {
 *   const { filters, setFilter, clearFilters } = useListFilter<MyFilters>({
 *     storageKey: 'user-filters',
 *     defaultFilters: { status: 'active' },
 *   });
 *
 *   return (
 *     <>
 *       <select
 *         value={filters.status ?? ''}
 *         onChange={(e) => setFilter('status', e.target.value)}
 *       />
 *       <button onClick={clearFilters}>Clear</button>
 *     </>
 *   );
 * }
 * ```
 */
export function useListFilter<TFilter extends FilterRecord>({
  storageKey = "filters",
  defaultFilters = {} as Partial<TFilter>,
  storage = "localStorage",
  syncUrl = true,
}: UseListFilterOptions<TFilter> = {}): ListFilterState<TFilter> {
  const defaultValue = useMemo<Partial<TFilter>>(
    () => ({ ...defaultFilters }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [filters, setFiltersState] = usePersistedState<Partial<TFilter>>({
    key: storageKey,
    defaultValue,
    storage,
    syncUrl,
    removeIfDefault: true,
  });

  const setFilter = useCallback(
    <K extends keyof TFilter>(key: K, value: TFilter[K]) => {
      setFiltersState((prev) => ({ ...prev, [key]: value }));
    },
    [setFiltersState],
  );

  const setFilters = useCallback(
    (updates: Partial<TFilter>) => {
      setFiltersState((prev) => ({ ...prev, ...updates }));
    },
    [setFiltersState],
  );

  const removeFilter = useCallback(
    <K extends keyof TFilter>(key: K) => {
      setFiltersState((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [setFiltersState],
  );

  const clearFilters = useCallback(() => {
    setFiltersState({} as Partial<TFilter>);
  }, [setFiltersState]);

  const reset = useCallback(() => {
    setFiltersState({ ...defaultFilters });
  }, [setFiltersState, defaultFilters]);

  return {
    filters,
    setFilter,
    setFilters,
    removeFilter,
    clearFilters,
    reset,
  };
}
