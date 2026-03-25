import React from "react";
import { createSortingStore } from "./sortingStore";

/**
 * Test story wrapper component for sortingStore.
 * Used in sortingStore.test.tsx Playwright CT tests.
 */
export const SortingStoreTestWrapper: React.FC = () => {
  const [store] = React.useState(() =>
    createSortingStore({ initialSort: [{ key: "name", direction: "asc" }] }),
  );

  const sortColumns = store((s) => s.sortColumns);
  const { setSortColumn, toggleSort, removeSortColumn, clearSort, reset } =
    store.getState();

  return (
    <div>
      <span data-testid="sort">{JSON.stringify(sortColumns)}</span>
      <button onClick={() => setSortColumn("age", "desc")}>set age desc</button>
      <button onClick={() => setSortColumn("name", "desc")}>
        set name desc
      </button>
      <button onClick={() => toggleSort("name")}>toggle name</button>
      <button onClick={() => removeSortColumn("name")}>remove name</button>
      <button onClick={() => clearSort()}>clear</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};
SortingStoreTestWrapper.displayName = "SortingStoreTestWrapper";
