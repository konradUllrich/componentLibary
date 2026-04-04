import { useEffect, useRef, useState } from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import { useStoreUrlSync } from "../useStoreUrlSync";

/** A record of filter key → value pairs. */
export type FilterRecord = Record<string, unknown>;

export type CreateFilterOptions<TFilter extends FilterRecord> = {
  /** Initial filter values applied on creation and restored when reset() is called. */
  defaultFilters?: Partial<TFilter>;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
  /**
   * Debounce URL writes by this many milliseconds.
   * Recommended for filters with text inputs (e.g. 200–300 ms) to avoid
   * triggering a router re-render on every keystroke.
   * Defaults to 0 (no debounce).
   */
  urlDebounce?: number;
};

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

// Internal store shape
type FilterStoreState<TFilter extends FilterRecord> = {
  filters: Partial<TFilter>;
  _defaultFilters: Partial<TFilter>;
  setFilter: <K extends keyof TFilter>(key: K, value: TFilter[K]) => void;
  setFilters: (updates: Partial<TFilter>) => void;
  removeFilter: <K extends keyof TFilter>(key: K) => void;
  clearFilters: () => void;
  reset: () => void;
};

function buildStore<TFilter extends FilterRecord>(
  defaultFilters: Partial<TFilter>,
): StoreApi<FilterStoreState<TFilter>> {
  return createStore<FilterStoreState<TFilter>>()((set) => ({
    filters: { ...defaultFilters },
    _defaultFilters: { ...defaultFilters },

    setFilter: (key, value) =>
      set((s) => ({ filters: { ...s.filters, [key]: value } })),

    setFilters: (updates) =>
      set((s) => ({ filters: { ...s.filters, ...updates } })),

    removeFilter: (key) =>
      set((s) => {
        const next = { ...s.filters };
        delete next[key];
        return { filters: next };
      }),

    clearFilters: () => set(() => ({ filters: {} as Partial<TFilter> })),

    reset: () => set((s) => ({ filters: { ...s._defaultFilters } })),
  }));
}

/**
 * createFilter – factory that creates an isolated filter store and returns a
 * React hook for use in components.
 *
 * All instances that share the same hook (returned value) share the same
 * underlying Zustand store and stay in sync automatically — no URL-roundtrip
 * latency. This makes it safe to call from multiple components (e.g. filters
 * panel + table header) and ensures React Query always sees a single stable
 * filter reference.
 *
 * @example
 * ```tsx
 * // Create once at module level (or in a context/provider)
 * const useFilter = createFilter<MyFilters>({
 *   defaultFilters: { status: 'active' },
 * });
 *
 * function UserList() {
 *   const { filters, setFilter, clearFilters } = useFilter();
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
export function createFilter<TFilter extends FilterRecord>({
  defaultFilters = {} as Partial<TFilter>,
  syncUrl = true,
  urlDebounce = 0,
}: CreateFilterOptions<TFilter> = {}) {
  const store = buildStore<TFilter>(defaultFilters);

  // Only one mounted instance drives URL sync at a time.
  // This prevents N × setSearchParams calls when N components call useFilter().
  let syncOccupied = false;

  return function useFilter(): FilterState<TFilter> {
    const filters = useStore(store, (s) => s.filters);

    // Actions are stable Zustand references — no re-render on extraction.
    const { setFilter, setFilters, removeFilter, clearFilters, reset } =
      store.getState();

    // Claim sync ownership on mount; release on unmount.
    // useState triggers a re-render after the effect so useStoreUrlSync
    // receives the real store on the second render pass.
    const isSyncOwnerRef = useRef(false);
    const [, setSyncTick] = useState(0);

    useEffect(() => {
      if (syncUrl && !syncOccupied) {
        syncOccupied = true;
        isSyncOwnerRef.current = true;
        setSyncTick((n) => n + 1); // re-render so useStoreUrlSync gets the store
      }
      return () => {
        if (isSyncOwnerRef.current) {
          isSyncOwnerRef.current = false;
          syncOccupied = false;
        }
      };
    }, []); // intentional: runs once on mount/unmount only

    // URL sync — only the owning instance drives this (see above).
    // Flat params: one URL key per filter key.
    // Primitives as strings, arrays/objects as JSON. Empty string = remove param.
    useStoreUrlSync(isSyncOwnerRef.current ? store : null, {
      debounce: urlDebounce,
      serialize: (s) => {
        const out: Record<string, string> = {};
        const defaults = s._defaultFilters as Record<string, unknown>;
        for (const [k, v] of Object.entries(s.filters)) {
          if (v === undefined || v === null) continue;
          if (JSON.stringify(v) === JSON.stringify(defaults[k])) continue;
          out[k] =
            Array.isArray(v) || (typeof v === "object" && v !== null)
              ? JSON.stringify(v)
              : String(v);
        }
        // Explicitly clear any default-valued keys from the URL
        for (const k of Object.keys(defaults)) {
          if (!(k in out)) out[k] = "";
        }
        return out;
      },
      deserialize: (params) => {
        const defaults = store.getState()._defaultFilters as Record<
          string,
          unknown
        >;
        const keys = Object.keys(defaults);
        if (keys.every((k) => params.get(k) === null)) return null;
        const parsed: Record<string, unknown> = {};
        for (const k of keys) {
          const raw = params.get(k);
          if (raw === null) {
            parsed[k] = defaults[k];
          } else {
            try {
              parsed[k] = JSON.parse(raw);
            } catch {
              parsed[k] = raw;
            }
          }
        }
        return { filters: parsed as Partial<TFilter> };
      },
    });

    return {
      filters,
      setFilter,
      setFilters,
      removeFilter,
      clearFilters,
      reset,
    };
  };
}
