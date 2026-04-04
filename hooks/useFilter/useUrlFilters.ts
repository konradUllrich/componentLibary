import { useCallback, useMemo } from "react";
import { useUrlState } from "../useUrlState/useUrlSate";
import type { StorageType } from "../useUrlState/useUrlSate";
import type { FilterRecord, FilterState } from "./useFilter";

export type UseUrlFiltersOptions<TFilter extends FilterRecord> = {
  /** Initial filter values applied on creation and restored when reset() is called. */
  defaultFilters?: Partial<TFilter>;
  /**
   * Which Web Storage backend to use for route-scoped param recovery.
   * - `"sessionStorage"` (default) → survives page refresh, cleared when tab closes
   * - `"localStorage"` → survives tab close
   * - `false` → no storage writes; URL params are lost on navigation
   */
  storage?: StorageType;
};

/**
 * useUrlFilters – manages filter state synced to URL search params.
 *
 * Uses `useUrlState` with `flatUrlParams` under the hood — every filter key
 * becomes its own URL search param, and all writes go through
 * `getCurrentSearch()` at write time. This means a filter change and a
 * pagination reset called in the same tick chain correctly: the second write
 * sees the first write's already-committed URL rather than a stale snapshot.
 *
 * @example
 * function UserList() {
 *   const { filters, setFilter, clearFilters } = useUrlFilters<{
 *     status: string;
 *     search: string;
 *   }>({ defaultFilters: { status: "active" } });
 *
 *   return (
 *     <>
 *       <input
 *         value={filters.search ?? ""}
 *         onChange={(e) => setFilter("search", e.target.value)}
 *       />
 *       <button onClick={clearFilters}>Clear</button>
 *     </>
 *   );
 * }
 */
export function useUrlFilters<TFilter extends FilterRecord>({
  defaultFilters = {} as Partial<TFilter>,
  storage = "sessionStorage",
}: UseUrlFiltersOptions<TFilter> = {}): FilterState<TFilter> {
  // Use a stable defaultValue reference so useUrlState's useMemo deps don't
  // change on every render. Consumers should pass a stable defaultFilters object
  // (defined outside the component or via useMemo).
  const defaultValue = useMemo(
    () => ({ ...defaultFilters }) as Record<string, unknown>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [urlFilters, setUrlFilters] = useUrlState({
    key: "_filters",
    defaultValue,
    storage,
    flatUrlParams: true,
  });

  const filters = urlFilters as Partial<TFilter>;

  const setFilter = useCallback(
    <K extends keyof TFilter>(key: K, value: TFilter[K]) => {
      setUrlFilters((prev) => ({ ...prev, [key as string]: value }));
    },
    [setUrlFilters],
  );

  const setFilters = useCallback(
    (updates: Partial<TFilter>) => {
      setUrlFilters((prev) => ({
        ...prev,
        ...(updates as Record<string, unknown>),
      }));
    },
    [setUrlFilters],
  );

  const removeFilter = useCallback(
    <K extends keyof TFilter>(key: K) => {
      setUrlFilters((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    },
    [setUrlFilters],
  );

  const clearFilters = useCallback(() => {
    setUrlFilters({});
  }, [setUrlFilters]);

  const reset = useCallback(() => {
    setUrlFilters({ ...defaultValue });
  }, [setUrlFilters, defaultValue]);

  return {
    filters,
    setFilter,
    setFilters,
    removeFilter,
    clearFilters,
    reset,
  };
}
