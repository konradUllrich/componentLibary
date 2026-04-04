/**
 * Helper components used exclusively by useFilter tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  createFilter,
  type CreateFilterOptions,
  type FilterRecord,
} from "./useFilter";
import { Router, Route, Link } from "../../Router";

type TestFilters = { status: string; category: string; page: number };

// ===== Basic Filter Display =====
export const FilterDisplay = (props: CreateFilterOptions<TestFilters>) => {
  const useFilter = React.useRef(createFilter<TestFilters>(props)).current;
  const { filters, setFilter, setFilters, removeFilter, clearFilters, reset } =
    useFilter();

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
  props: CreateFilterOptions<TFilter> & {
    extraFilters?: Partial<TFilter>;
  },
) => {
  const { extraFilters, ...factoryOpts } = props;
  const useFilter = React.useRef(createFilter<TFilter>(factoryOpts)).current;

  const Inner = () => {
    const { filters, setFilters, clearFilters, reset } = useFilter();

    return (
      <div>
        <span data-testid="filters">{JSON.stringify(filters)}</span>
        {extraFilters && (
          <button
            type="button"
            onClick={() => setFilters(extraFilters!)}
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

// ===== Array filter display (for array roundtrip tests) =====
type ArrayTestFilters = { tags: string[]; status: string };

export const ArrayFilterDisplay = (
  props: CreateFilterOptions<ArrayTestFilters>,
) => {
  const useFilter = React.useRef(createFilter<ArrayTestFilters>(props)).current;
  const { filters, setFilter } = useFilter();

  return (
    <div>
      <span data-testid="filters">{JSON.stringify(filters)}</span>
      <span data-testid="tags-type">
        {Array.isArray(filters.tags) ? "array" : typeof filters.tags}
      </span>
      <button
        type="button"
        onClick={() => setFilter("tags", ["react", "typescript"])}
        data-testid="set-tags"
      >
        set tags
      </button>
    </div>
  );
};
ArrayFilterDisplay.displayName = "ArrayFilterDisplay";

export const RouterArrayFilterDisplay = (
  props: CreateFilterOptions<ArrayTestFilters>,
) => {
  const useFilter = React.useRef(createFilter<ArrayTestFilters>(props)).current;
  const Inner = () => {
    const { filters, setFilter } = useFilter();

    return (
      <div>
        <span data-testid="filters">{JSON.stringify(filters)}</span>
        <span data-testid="tags-type">
          {Array.isArray(filters.tags) ? "array" : typeof filters.tags}
        </span>
        <button
          type="button"
          onClick={() => setFilter("tags", ["react", "typescript"])}
          data-testid="set-tags"
        >
          set tags
        </button>
      </div>
    );
  };
  Inner.displayName = "RouterArrayFilterDisplayInner";

  return (
    <Router>
      <Inner />
    </Router>
  );
};
RouterArrayFilterDisplay.displayName = "RouterArrayFilterDisplay";

// ===== Cross-instance sync (shared store via factory) =====
type SyncTestFilters = { status: string };

export const CrossInstanceFilterSyncComponent = () => {
  const useFilter = React.useRef(
    createFilter<SyncTestFilters>({ defaultFilters: {} }),
  ).current;

  const InstanceA = () => {
    const { filters, setFilter, clearFilters } = useFilter();
    return (
      <div>
        <span data-testid="instance-a-filters">{JSON.stringify(filters)}</span>
        <button
          type="button"
          onClick={() => setFilter("status", "inactive")}
          data-testid="instance-a-set"
        >
          set inactive
        </button>
        <button
          type="button"
          onClick={clearFilters}
          data-testid="instance-a-clear"
        >
          clear
        </button>
      </div>
    );
  };
  InstanceA.displayName = "InstanceA";

  const InstanceB = () => {
    const { filters } = useFilter();
    return (
      <span data-testid="instance-b-filters">{JSON.stringify(filters)}</span>
    );
  };
  InstanceB.displayName = "InstanceB";

  return (
    <Router>
      <InstanceA />
      <InstanceB />
    </Router>
  );
};
CrossInstanceFilterSyncComponent.displayName =
  "CrossInstanceFilterSyncComponent";

// ===== Navigation restore (two-route scenario) =====
type NavRestoreFilters = { status: string };

export const FilterNavigationRestoreComponent = () => {
  const useFilter = React.useRef(
    createFilter<NavRestoreFilters>({ defaultFilters: { status: "active" } }),
  ).current;

  const Inner = () => {
    const { filters, setFilter } = useFilter();
    return (
      <div>
        <span data-testid="filters">{JSON.stringify(filters)}</span>
        <button
          type="button"
          onClick={() => setFilter("status", "archived")}
          data-testid="set-archived"
        >
          set archived
        </button>
        <Link href="/other" data-testid="go-other">
          Other
        </Link>
      </div>
    );
  };
  Inner.displayName = "FilterNavRestoreInner";

  return (
    <Router>
      <Route path="/">
        <Inner />
      </Route>
      <Route path="/other">
        <div>
          <span data-testid="other-page">Other</span>
          <Link href="/" data-testid="go-back">
            Back
          </Link>
        </div>
      </Route>
    </Router>
  );
};
FilterNavigationRestoreComponent.displayName =
  "FilterNavigationRestoreComponent";
