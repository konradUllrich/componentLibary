/** A record of filter key → value pairs. */
export type FilterRecord = Record<string, unknown>;

export type FilterState<TFilter extends FilterRecord> = {
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
