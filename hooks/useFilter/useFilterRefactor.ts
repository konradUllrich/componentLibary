import { useCallback } from "react";
import { usePersistedState } from "../usePersistedState/usePersistedState";

/** A record of filter key → value pairs. */
export type FilterRecord = Record<string, unknown>;

export type UseFilterRefactorOptions<TFilter extends FilterRecord> = {
  /** Unique key used as the usePersistedState storage key. Defaults to "filters". */
  storageKey?: string;
  /** Initial filter values applied on creation and restored when reset() is called. */
  defaultFilters?: Partial<TFilter>;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
};

export type FilterRefactorState<TFilter extends FilterRecord> = {
  /** Current filter values. */
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
 * useFilterRefactor – filter state built on top of usePersistedState.
 *
 * Each filter key becomes its own URL search param (flatUrlParams).
 * No Zustand store — state lives in React useState, synced to the URL via
 * usePersistedState's effect-based sync.
 *
 * Trade-off vs the original useFilter: two components calling this hook with
 * the same storageKey will NOT share state in-memory. They stay in sync via
 * the URL on the next render cycle, not synchronously. If you need synchronous
 * cross-component sharing, use the original useFilter with its Zustand registry.
 *
 * @example
 * ```tsx
 * type MyFilters = { status: string; category: string };
 *
 * function UserList() {
 *   const { filters, setFilter, clearFilters } = useFilterRefactor<MyFilters>({
 *     storageKey: 'user-filters',
 *     defaultFilters: { status: 'active', category: 'all' },
 *   });
 * }
 * ```
 */
export function useFilterRefactor<TFilter extends FilterRecord>({
  storageKey = "filters",
  defaultFilters = {} as Partial<TFilter>,
  syncUrl = true,
}: UseFilterRefactorOptions<TFilter> = {}): FilterRefactorState<TFilter> {
  const [filters, setFiltersRaw] = usePersistedState<Partial<TFilter>>({
    key: storageKey,
    defaultValue: defaultFilters,
    storage: false,
    syncUrl,
    flatUrlParams: true,
  });

  const setFilter = useCallback(
    <K extends keyof TFilter>(key: K, value: TFilter[K]) => {
      setFiltersRaw((prev) => ({ ...prev, [key]: value }));
    },
    [setFiltersRaw],
  );

  const setFilters = useCallback(
    (updates: Partial<TFilter>) => {
      setFiltersRaw((prev) => ({ ...prev, ...updates }));
    },
    [setFiltersRaw],
  );

  const removeFilter = useCallback(
    <K extends keyof TFilter>(key: K) => {
      setFiltersRaw((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [setFiltersRaw],
  );

  const clearFilters = useCallback(() => {
    setFiltersRaw({} as Partial<TFilter>);
  }, [setFiltersRaw]);

  const reset = useCallback(() => {
    setFiltersRaw({ ...defaultFilters });
  }, [setFiltersRaw, defaultFilters]);

  return { filters, setFilter, setFilters, removeFilter, clearFilters, reset };
}
