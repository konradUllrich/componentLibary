/**
 * Helper components used exclusively by useFilter tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useFilter,
  type UseFilterOptions,
  type FilterRecord,
} from "./useFilter";
import { Router } from "../../Router";

type TestFilters = { status: string; category: string; page: number };

// ===== Basic Filter Display =====
export const FilterDisplay = (props: UseFilterOptions<TestFilters>) => {
  const { filters, setFilter, setFilters, removeFilter, clearFilters, reset } =
    useFilter<TestFilters>(props);

  return (
    <div>
      <span data-testid="filters">{JSON.stringify(filters)}</span>
      <button
        type="button"
        onClick={() => setFilter("status", "inactive")}
        data-testid="set-status-inactive"
      >
        set status=inactive
      </button>
      <button
        type="button"
        onClick={() => setFilters({ category: "books", page: 2 })}
        data-testid="set-multiple"
      >
        set multiple
      </button>
      <button
        type="button"
        onClick={() => removeFilter("status")}
        data-testid="remove-status"
      >
        remove status
      </button>
      <button type="button" onClick={clearFilters} data-testid="clear">
        clear
      </button>
      <button type="button" onClick={reset} data-testid="reset">
        reset
      </button>
    </div>
  );
};
FilterDisplay.displayName = "FilterDisplay";

// ===== In Router context (for URL param testing) =====
export const RouterFilterDisplay = <TFilter extends FilterRecord>(
  props: UseFilterOptions<TFilter> & {
    extraFilters?: Partial<TFilter>;
  },
) => {
  const Inner = () => {
    const { filters, setFilters, clearFilters, reset } =
      useFilter<TFilter>(props);

    return (
      <div>
        <span data-testid="filters">{JSON.stringify(filters)}</span>
        {props.extraFilters && (
          <button
            type="button"
            onClick={() => setFilters(props.extraFilters!)}
            data-testid="set-extra"
          >
            set extra
          </button>
        )}
        <button type="button" onClick={clearFilters} data-testid="clear">
          clear
        </button>
        <button type="button" onClick={reset} data-testid="reset">
          reset
        </button>
      </div>
    );
  };
  Inner.displayName = "RouterFilterDisplayInner";

  return (
    <Router>
      <Inner />
    </Router>
  );
};
RouterFilterDisplay.displayName = "RouterFilterDisplay";
