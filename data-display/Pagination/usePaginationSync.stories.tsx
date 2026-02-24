import React from "react";
import { Pagination } from "./Pagination";
import { createPaginationStore } from "./paginationStore";
import { usePaginationSync } from "./usePaginationSync";

// ---------------------------------------------------------------------------
// Single synced pagination
// ---------------------------------------------------------------------------

export interface PaginationSyncTestWrapperProps {
  totalItems: number;
  pageSize?: number;
  currentPage?: number;
  showSizeSelector?: boolean;
  /** Passed as the `key` option to usePaginationSync to namespace URL params. */
  syncKey?: string;
  pageParam?: string;
  pageSizeParam?: string;
}

/**
 * Test wrapper for usePaginationSync.
 * Creates its own store internally so Playwright CT can mount it directly.
 * Uses `syncKey` instead of `key` to avoid collision with React's reserved prop.
 */
export const PaginationSyncTestWrapper: React.FC<
  PaginationSyncTestWrapperProps
> = ({
  totalItems,
  pageSize = 10,
  currentPage = 1,
  showSizeSelector,
  syncKey,
  pageParam,
  pageSizeParam,
}) => {
  const [store] = React.useState(() => {
    const s = createPaginationStore(pageSize);
    s.getState().setTotalItems(totalItems);
    if (currentPage > 1) s.getState().setPage(currentPage);
    return s;
  });

  usePaginationSync(store, { key: syncKey, pageParam, pageSizeParam });

  return <Pagination store={store} showSizeSelector={showSizeSelector} />;
};

PaginationSyncTestWrapper.displayName = "PaginationSyncTestWrapper";

// ---------------------------------------------------------------------------
// Two independent synced paginations (for key-collision tests)
// ---------------------------------------------------------------------------

export interface TwoSyncedPaginationsProps {
  /** Config for the first pagination (keyA applied automatically). */
  totalItemsA?: number;
  pageSizeA?: number;
  /** Config for the second pagination (keyB applied automatically). */
  totalItemsB?: number;
  pageSizeB?: number;
  keyA?: string;
  keyB?: string;
}

/**
 * Mounts two Pagination components each synced with a separate key, so tests
 * can verify that their URL params don't overwrite each other.
 */
export const TwoSyncedPaginationsWrapper: React.FC<
  TwoSyncedPaginationsProps
> = ({
  totalItemsA = 100,
  pageSizeA = 10,
  totalItemsB = 60,
  pageSizeB = 5,
  keyA = "tableA",
  keyB = "tableB",
}) => {
  const [storeA] = React.useState(() => {
    const s = createPaginationStore(pageSizeA);
    s.getState().setTotalItems(totalItemsA);
    return s;
  });

  const [storeB] = React.useState(() => {
    const s = createPaginationStore(pageSizeB);
    s.getState().setTotalItems(totalItemsB);
    return s;
  });

  usePaginationSync(storeA, { key: keyA });
  usePaginationSync(storeB, { key: keyB });

  return (
    <>
      <Pagination store={storeA} />
      <Pagination store={storeB} />
    </>
  );
};

TwoSyncedPaginationsWrapper.displayName = "TwoSyncedPaginationsWrapper";
