/**
 * Helper components used exclusively by useUrlSort tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import { useUrlSort, type UseUrlSortOptions } from "./useUrlSort";
import { Router, Route, Link } from "../../Router";

// ===== Basic Sort Display (no Router) =====
export const SortDisplay = (props: UseUrlSortOptions) => {
  const { sort, setSort, toggleSort, clearSort, reset } = useUrlSort(props);

  return (
    <div>
      <span data-testid="sort">{JSON.stringify(sort)}</span>
      <button
        type="button"
        onClick={() => setSort("name", "asc")}
        data-testid="set-name-asc"
      >
        set name asc
      </button>
      <button
        type="button"
        onClick={() => setSort("age", "desc")}
        data-testid="set-age-desc"
      >
        set age desc
      </button>
      <button
        type="button"
        onClick={() => toggleSort("name")}
        data-testid="toggle-name"
      >
        toggle name
      </button>
      <button
        type="button"
        onClick={() => toggleSort("age")}
        data-testid="toggle-age"
      >
        toggle age
      </button>
      <button type="button" onClick={clearSort} data-testid="clear">
        clear
      </button>
      <button type="button" onClick={reset} data-testid="reset">
        reset
      </button>
    </div>
  );
};
SortDisplay.displayName = "SortDisplay";

// ===== In Router context (for URL param testing) =====
export const RouterSortDisplay = (props: UseUrlSortOptions) => {
  const Inner = () => {
    const { sort, toggleSort } = useUrlSort(props);
    return (
      <div>
        <span data-testid="sort">{JSON.stringify(sort)}</span>
        <button
          type="button"
          onClick={() => toggleSort("name")}
          data-testid="toggle-name"
        >
          toggle name
        </button>
      </div>
    );
  };
  Inner.displayName = "RouterSortDisplayInner";

  return (
    <Router>
      <Inner />
    </Router>
  );
};
RouterSortDisplay.displayName = "RouterSortDisplay";

// ===== Cross-instance sync =====
export const CrossInstanceSortSyncComponent = (props: UseUrlSortOptions) => {
  const InstanceA = () => {
    const { sort, toggleSort, clearSort } = useUrlSort(props);
    return (
      <div>
        <span data-testid="instance-a-sort">{JSON.stringify(sort)}</span>
        <button
          type="button"
          onClick={() => toggleSort("name")}
          data-testid="instance-a-toggle-name"
        >
          toggle name
        </button>
        <button
          type="button"
          onClick={clearSort}
          data-testid="instance-a-clear"
        >
          clear
        </button>
      </div>
    );
  };
  InstanceA.displayName = "InstanceA";

  const InstanceB = () => {
    const { sort } = useUrlSort(props);
    return <span data-testid="instance-b-sort">{JSON.stringify(sort)}</span>;
  };
  InstanceB.displayName = "InstanceB";

  return (
    <Router>
      <InstanceA />
      <InstanceB />
    </Router>
  );
};
CrossInstanceSortSyncComponent.displayName = "CrossInstanceSortSyncComponent";

// ===== Navigation restore (two-route scenario) =====
export const SortNavigationRestoreComponent = (props: UseUrlSortOptions) => {
  const Inner = () => {
    const { sort, toggleSort } = useUrlSort(props);
    return (
      <div>
        <span data-testid="sort">{JSON.stringify(sort)}</span>
        <button
          type="button"
          onClick={() => toggleSort("name")}
          data-testid="toggle-name"
        >
          toggle name
        </button>
        <Link href="/other" data-testid="go-other">
          Other
        </Link>
      </div>
    );
  };
  Inner.displayName = "SortNavRestoreInner";

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
SortNavigationRestoreComponent.displayName = "SortNavigationRestoreComponent";
