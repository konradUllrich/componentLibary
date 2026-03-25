import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistorConfig } from "./persistors";

export type SortDirection = "asc" | "desc";

export type SortEntry = {
  /** The field/column key to sort by. */
  key: string;
  /** Sort direction for this column. */
  direction: SortDirection;
};

export type SortingStore = {
  /**
   * Ordered list of active sort columns.
   * The first entry is the primary sort, subsequent entries are secondary sorts.
   */
  sortColumns: SortEntry[];
  /**
   * Set a column's sort direction.
   * If the column is not yet in `sortColumns` it is appended.
   * If it is already present only the direction is updated.
   */
  setSortColumn: (key: string, direction: SortDirection) => void;
  /**
   * Toggle a column's direction (asc → desc → removed).
   * If the column is not yet active it is added with direction `"asc"`.
   */
  toggleSort: (key: string) => void;
  /** Remove a single column from the active sort list. */
  removeSortColumn: (key: string) => void;
  /** Remove all active sort columns. */
  clearSort: () => void;
  /** Restore sort state to the initial values provided at store creation. */
  reset: () => void;
};

export interface SortingStoreOptions {
  /** Initial sort columns applied on creation and restored by `reset()`. */
  initialSort?: SortEntry[];
  /**
   * Attach a persistor to automatically hydrate and persist the sorting state.
   *
   * @example
   * ```ts
   * const store = createSortingStore({
   *   persistor: createSessionStoragePersistor('my-app:sorting'),
   * });
   * ```
   */
  persistor?: PersistorConfig<SortingStore>;
}

/**
 * Creates a Zustand store that manages multi-column sort state.
 *
 * @param options - Optional configuration (initial sort columns, persistor).
 *
 * @example
 * ```ts
 * const store = createSortingStore({ initialSort: [{ key: 'name', direction: 'asc' }] });
 *
 * store.getState().toggleSort('name');  // direction becomes 'desc'
 * store.getState().toggleSort('name');  // column is removed
 * ```
 */
export function createSortingStore(options: SortingStoreOptions = {}) {
  const { initialSort = [], persistor } = options;

  const stateCreator = (
    set: (fn: (state: SortingStore) => Partial<SortingStore>) => void,
  ): SortingStore => ({
    sortColumns: [...initialSort],

    setSortColumn: (key, direction) =>
      set((state) => {
        const existing = state.sortColumns.findIndex((c) => c.key === key);
        if (existing === -1) {
          return { sortColumns: [...state.sortColumns, { key, direction }] };
        }
        const next = [...state.sortColumns];
        next[existing] = { key, direction };
        return { sortColumns: next };
      }),

    toggleSort: (key) =>
      set((state) => {
        const existing = state.sortColumns.find((c) => c.key === key);
        if (!existing) {
          return { sortColumns: [...state.sortColumns, { key, direction: "asc" }] };
        }
        if (existing.direction === "asc") {
          return {
            sortColumns: state.sortColumns.map((c) =>
              c.key === key ? { key, direction: "desc" as SortDirection } : c,
            ),
          };
        }
        // desc → remove the column
        return {
          sortColumns: state.sortColumns.filter((c) => c.key !== key),
        };
      }),

    removeSortColumn: (key) =>
      set((state) => ({
        sortColumns: state.sortColumns.filter((c) => c.key !== key),
      })),

    clearSort: () => set(() => ({ sortColumns: [] })),

    reset: () => set(() => ({ sortColumns: [...initialSort] })),
  });

  if (persistor) {
    return create<SortingStore>()(persist(stateCreator, persistor));
  }

  return create<SortingStore>()(stateCreator);
}
