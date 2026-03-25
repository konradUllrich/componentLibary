import React from "react";
import { createFilterStore } from "./filterStore";

type TestFilters = { status: string; category: string; page: number };

/**
 * Test story wrapper component for filterStore.
 * Used in filterStore.test.tsx Playwright CT tests.
 */
export const FilterStoreTestWrapper: React.FC = () => {
  const [store] = React.useState(() =>
    createFilterStore<TestFilters>({ status: "active" }),
  );

  const filters = store((s) => s.filters);
  const { setFilter, setFilters, removeFilter, clearFilters, reset } =
    store.getState();

  return (
    <div>
      <span data-testid="filters">{JSON.stringify(filters)}</span>
      <button onClick={() => setFilter("status", "inactive")}>
        set status=inactive
      </button>
      <button onClick={() => setFilters({ category: "books", page: 2 })}>
        set multiple
      </button>
      <button onClick={() => removeFilter("status")}>remove status</button>
      <button onClick={() => clearFilters()}>clear</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};
FilterStoreTestWrapper.displayName = "FilterStoreTestWrapper";
