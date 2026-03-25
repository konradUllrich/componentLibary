import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistorConfig } from "./persistors";

/** A record of filter key → value pairs. */
export type FilterRecord = Record<string, unknown>;

export type FilterStore<TFilter extends FilterRecord> = {
  /** Current filter values. Only keys that have been explicitly set are present. */
  filters: Partial<TFilter>;
  /** Set (or update) a single filter value. */
  setFilter: <K extends keyof TFilter>(key: K, value: TFilter[K]) => void;
  /** Merge multiple filter values at once. */
  setFilters: (filters: Partial<TFilter>) => void;
  /** Remove a single filter key from the active filters. */
  removeFilter: <K extends keyof TFilter>(key: K) => void;
  /** Remove all active filters. */
  clearFilters: () => void;
  /** Restore filters to the initial values provided at store creation. */
  reset: () => void;
};

export interface FilterStoreOptions<TFilter extends FilterRecord> {
  /**
   * Attach a persistor to automatically hydrate and persist the filters.
   *
   * @example
   * ```ts
   * const store = createFilterStore(
   *   { status: 'active' },
   *   { persistor: createLocalStoragePersistor('my-app:filters') },
   * );
   * ```
   */
  persistor?: PersistorConfig<FilterStore<TFilter>>;
}

/**
 * Creates a Zustand store that manages generic key/value filter state.
 *
 * @param initialFilters - Optional initial filter values applied on creation
 *                         and restored when `reset()` is called.
 * @param options        - Optional configuration (persistor, etc.).
 *
 * @example
 * ```ts
 * type MyFilters = { status: string; category: string };
 *
 * const store = createFilterStore<MyFilters>({ status: 'active' });
 *
 * store.getState().setFilter('category', 'books');
 * store.getState().filters; // { status: 'active', category: 'books' }
 * ```
 */
export function createFilterStore<TFilter extends FilterRecord>(
  initialFilters: Partial<TFilter> = {},
  options: FilterStoreOptions<TFilter> = {},
) {
  const stateCreator = (
    set: (fn: (state: FilterStore<TFilter>) => Partial<FilterStore<TFilter>>) => void,
  ): FilterStore<TFilter> => ({
    filters: { ...initialFilters },

    setFilter: (key, value) =>
      set((state) => ({
        filters: { ...state.filters, [key]: value },
      })),

    setFilters: (updates) =>
      set((state) => ({
        filters: { ...state.filters, ...updates },
      })),

    removeFilter: (key) =>
      set((state) => {
        const next = { ...state.filters };
        delete next[key];
        return { filters: next };
      }),

    clearFilters: () => set(() => ({ filters: {} })),

    reset: () => set(() => ({ filters: { ...initialFilters } })),
  });

  if (options.persistor) {
    return create<FilterStore<TFilter>>()(
      persist(stateCreator, options.persistor),
    );
  }

  return create<FilterStore<TFilter>>()(stateCreator);
}
