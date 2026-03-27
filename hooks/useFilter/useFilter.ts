import { useRef } from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import type { StorageType } from "../usePersistedState/usePersistedState";
import { useStoreUrlSync } from "../useStoreUrlSync";

/** A record of filter key → value pairs. */
export type FilterRecord = Record<string, unknown>;

export type UseFilterOptions<TFilter extends FilterRecord> = {
  /** Unique storage/URL key prefix. Defaults to "filters". */
  storageKey?: string;
  /** Initial filter values applied on creation and restored when reset() is called. */
  defaultFilters?: Partial<TFilter>;
  /** Web Storage backend. Defaults to "localStorage". */
  storage?: StorageType;
  /** Set to false to disable URL search-param synchronisation. Defaults to true. */
  syncUrl?: boolean;
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

// Module-level registry: one Zustand store per storageKey
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry = new Map<string, StoreApi<FilterStoreState<any>>>();

// SSR-safe storage accessor
function getWebStorage(type: StorageType): Storage | null {
  if (type === false || typeof window === "undefined") return null;
  return type === "sessionStorage"
    ? window.sessionStorage
    : window.localStorage;
}

function getOrCreateStore<TFilter extends FilterRecord>(
  storageKey: string,
  defaultFilters: Partial<TFilter>,
  storage: StorageType,
): StoreApi<FilterStoreState<TFilter>> {
  if (registry.has(storageKey)) {
    return registry.get(storageKey) as StoreApi<FilterStoreState<TFilter>>;
  }

  // Hydrate from Web Storage on first creation (plain JSON — same format as
  // the former usePersistedState backend, preserving existing stored data).
  let initial: Partial<TFilter> = { ...defaultFilters };
  const webStorage = getWebStorage(storage);
  if (webStorage) {
    try {
      const raw = webStorage.getItem(storageKey);
      if (raw !== null) initial = JSON.parse(raw) as Partial<TFilter>;
    } catch {
      /* ignore — fall back to defaults */
    }
  }

  const store = createStore<FilterStoreState<TFilter>>()((set) => ({
    filters: initial,
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

  // Persist to Web Storage on every state change — plain JSON, with
  // removeIfDefault semantics (key is removed when filters equal the defaults).
  if (webStorage !== null) {
    store.subscribe((state) => {
      const serialized = JSON.stringify(state.filters);
      const defaultSerialized = JSON.stringify(state._defaultFilters);
      if (serialized === defaultSerialized) {
        webStorage.removeItem(storageKey);
      } else {
        webStorage.setItem(storageKey, serialized);
      }
    });
  }

  registry.set(storageKey, store);
  return store;
}

/**
 * useFilter – a React hook for managing persisted filter state.
 *
 * Uses a module-level Zustand store registry so all instances sharing the same
 * `storageKey` stay in sync synchronously — no URL-roundtrip latency. This
 * makes it safe to call from multiple components (e.g. filters panel + table
 * header) and ensures React Query always sees a single stable filter reference.
 *
 * @example
 * ```tsx
 * type MyFilters = { status: string; category: string };
 *
 * function UserList() {
 *   const { filters, setFilter, clearFilters } = useFilter<MyFilters>({
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
export function useFilter<TFilter extends FilterRecord>({
  storageKey = "filters",
  defaultFilters = {} as Partial<TFilter>,
  storage = "localStorage",
  syncUrl = true,
}: UseFilterOptions<TFilter> = {}): FilterState<TFilter> {
  // Stable ref: factory args only used on first store creation.
  const defaultFiltersRef = useRef(defaultFilters);

  const store = getOrCreateStore<TFilter>(
    storageKey,
    defaultFiltersRef.current,
    storage,
  );

  const filters = useStore(store, (s) => s.filters);

  // Actions are stable Zustand references — no re-render on extraction.
  const { setFilter, setFilters, removeFilter, clearFilters, reset } =
    store.getState();

  // URL sync — flat params (one URL key per filter key).
  // Primitives as strings, arrays/objects as JSON. Empty string = remove param.
  useStoreUrlSync(syncUrl ? store : null, {
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

  return { filters, setFilter, setFilters, removeFilter, clearFilters, reset };
}
