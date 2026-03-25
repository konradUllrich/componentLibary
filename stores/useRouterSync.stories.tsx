import React from "react";
import { createFilterStore } from "./filterStore";
import { createSortingStore } from "./sortingStore";
import { createValueStore } from "./valueStore";
import { useRouterSync } from "./useRouterSync";
import type { SortDirection } from "./sortingStore";

// ---------------------------------------------------------------------------
// Filter store synced wrapper
// ---------------------------------------------------------------------------

type TestFilters = { status: string; category: string };

/**
 * Test story for useRouterSync with a filterStore.
 * Syncs `status` and `category` filters to URL params.
 */
export const RouterSyncFilterWrapper: React.FC = () => {
  const [store] = React.useState(() =>
    createFilterStore<TestFilters>({ status: "active" }),
  );

  const filters = store((s) => s.filters);

  useRouterSync(store, {
    serialize: (s) => ({
      status: (s.filters.status as string) ?? "",
      category: (s.filters.category as string) ?? "",
    }),
    deserialize: (params) => ({
      filters: {
        ...(params.get("status") !== null
          ? { status: params.get("status") as string }
          : {}),
        ...(params.get("category") !== null
          ? { category: params.get("category") as string }
          : {}),
      },
    }),
  });

  return (
    <div>
      <span data-testid="filters">{JSON.stringify(filters)}</span>
      <button
        onClick={() => store.getState().setFilter("status", "inactive")}
      >
        set status=inactive
      </button>
      <button
        onClick={() => store.getState().setFilter("category", "books")}
      >
        set category=books
      </button>
      <button onClick={() => store.getState().clearFilters()}>clear</button>
    </div>
  );
};
RouterSyncFilterWrapper.displayName = "RouterSyncFilterWrapper";

// ---------------------------------------------------------------------------
// Sorting store synced wrapper
// ---------------------------------------------------------------------------

/**
 * Test story for useRouterSync with a sortingStore.
 * Encodes sortColumns as `key:direction,key:direction` in a single `sort` param.
 */
export const RouterSyncSortingWrapper: React.FC = () => {
  const [store] = React.useState(() => createSortingStore());

  const sortColumns = store((s) => s.sortColumns);

  useRouterSync(store, {
    serialize: (s) => ({
      sort: s.sortColumns.map((c) => `${c.key}:${c.direction}`).join(","),
    }),
    deserialize: (params) => {
      const raw = params.get("sort") ?? "";
      if (!raw) return null;
      const sortColumns = raw.split(",").map((part) => {
        const [key, direction] = part.split(":");
        return { key, direction: direction as SortDirection };
      });
      return { sortColumns };
    },
  });

  return (
    <div>
      <span data-testid="sort">{JSON.stringify(sortColumns)}</span>
      <button
        onClick={() => store.getState().setSortColumn("name", "asc")}
      >
        set name asc
      </button>
      <button
        onClick={() => store.getState().setSortColumn("age", "desc")}
      >
        set age desc
      </button>
      <button onClick={() => store.getState().clearSort()}>clear</button>
    </div>
  );
};
RouterSyncSortingWrapper.displayName = "RouterSyncSortingWrapper";

// ---------------------------------------------------------------------------
// Value store synced wrapper
// ---------------------------------------------------------------------------

/**
 * Test story for useRouterSync with a valueStore.
 * Syncs a string `theme` value to the `theme` URL param.
 */
export const RouterSyncValueWrapper: React.FC = () => {
  const [store] = React.useState(() =>
    createValueStore<string>("light"),
  );

  const value = store((s) => s.value);

  useRouterSync(store, {
    serialize: (s) => ({ theme: s.value }),
    deserialize: (params) => {
      const raw = params.get("theme");
      return raw !== null ? { value: raw } : null;
    },
  });

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => store.getState().setValue("dark")}>
        set dark
      </button>
      <button onClick={() => store.getState().reset()}>reset</button>
    </div>
  );
};
RouterSyncValueWrapper.displayName = "RouterSyncValueWrapper";
