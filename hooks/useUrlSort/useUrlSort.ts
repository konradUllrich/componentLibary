import { useCallback, useMemo } from "react";
import { useUrlState } from "../useUrlState/useUrlSate";
import type { StorageType } from "../useUrlState/useUrlSate";
import type { SortDirection, SortEntry } from "../../stores/sortingStore";

export type { SortDirection, SortEntry };

export type SortState = {
  /** The active sort column, or `null` when no sort is applied. */
  sort: SortEntry | null;
  /** Set the sort column and direction. Replaces any existing sort. */
  setSort: (key: string, direction: SortDirection) => void;
  /**
   * Toggle a column's direction: not active → asc → desc → null.
   * Switching to a different column always starts at asc.
   */
  toggleSort: (key: string) => void;
  /** Remove the active sort. */
  clearSort: () => void;
  /** Restore sort to the initial value provided at hook creation. */
  reset: () => void;
};

export type UseUrlSortOptions = {
  /** Initial sort applied on creation and restored when reset() is called. Defaults to null. */
  initialSort?: SortEntry | null;
  /** URL search param name for the sort state. Defaults to "sort". */
  sortParam?: string;
  /**
   * Which Web Storage backend to use for route-scoped param recovery.
   * - `"sessionStorage"` (default) → survives page refresh, cleared when tab closes
   * - `"localStorage"` → survives tab close
   * - `false` → no storage writes; URL params are lost on navigation
   */
  storage?: StorageType;
};

/**
 * useUrlSort – manages single-column sort state synced to URL search params.
 *
 * Serialized as a single JSON param (e.g. `?sort={"key":"name","direction":"asc"}`).
 * The param is removed from the URL when no sort is active.
 * Writes go through `getCurrentSearch()` at write time, so pairing with
 * `useUrlPagination` or `useUrlFilters` in the same tick chains correctly.
 *
 * @example
 * function UserTable() {
 *   const { sort, toggleSort } = useUrlSort();
 *
 *   return (
 *     <th onClick={() => toggleSort("name")}>
 *       Name {sort?.key === "name" ? sort.direction : ""}
 *     </th>
 *   );
 * }
 */
export function useUrlSort({
  initialSort = null,
  sortParam = "sort",
  storage = "sessionStorage",
}: UseUrlSortOptions = {}): SortState {
  const defaultValue = useMemo(() => initialSort, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [sort, setSortRaw] = useUrlState<SortEntry | null>({
    key: sortParam,
    defaultValue,
    storage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    removeIfDefault: true,
  });

  const setSort = useCallback(
    (key: string, direction: SortDirection) => {
      setSortRaw({ key, direction });
    },
    [setSortRaw],
  );

  const toggleSort = useCallback(
    (key: string) => {
      setSortRaw((prev) => {
        if (!prev || prev.key !== key) return { key, direction: "asc" };
        if (prev.direction === "asc") return { key, direction: "desc" };
        // desc → remove
        return null;
      });
    },
    [setSortRaw],
  );

  const clearSort = useCallback(() => {
    setSortRaw(null);
  }, [setSortRaw]);

  const reset = useCallback(() => {
    setSortRaw(defaultValue);
  }, [setSortRaw, defaultValue]);

  return { sort, setSort, toggleSort, clearSort, reset };
}
