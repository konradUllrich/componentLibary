import React from "react";
import { Pagination } from "./Pagination";
import { createPaginationStore } from "./paginationStore";

/**
 * Story wrapper that simulates the async fetch pattern:
 * setPage is called first (e.g. from URL sync), then setTotalItems is called
 * later when data arrives. Verifies the page is not reset to 1.
 */
export const AsyncTotalItemsWrapper: React.FC<{
  initialPage?: number;
  totalItems?: number;
}> = ({ initialPage = 5, totalItems = 100 }) => {
  const [store] = React.useState(() => {
    const s = createPaginationStore(10);
    // Set the desired page BEFORE totalItems is known (URL sync scenario)
    s.getState().setPage(initialPage);
    return s;
  });

  React.useEffect(() => {
    // Simulate async data fetch completing after mount
    const timeout = setTimeout(() => {
      store.getState().setTotalItems(totalItems);
    }, 0);
    return () => clearTimeout(timeout);
  }, [store, totalItems]);

  return <Pagination store={store} />;
};
AsyncTotalItemsWrapper.displayName = "AsyncTotalItemsWrapper";

/**
 * Test story wrapper component to handle Zustand store initialization properly.
 * This is used in Pagination.test.tsx to test the component with proper store setup.
 */
export const PaginationTestWrapper: React.FC<{
  totalItems: number;
  pageSize?: number;
  currentPage?: number;
  showSizeSelector?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}> = (props) => {
  const {
    totalItems,
    pageSize = 10,
    currentPage = 1,
    showSizeSelector,
    pageSizeOptions,
    className,
  } = props;

  // Create store with lazy initialization to capture initial prop values
  const [useStore] = React.useState(() => {
    const store = createPaginationStore(pageSize);
    // Initialize store data synchronously before first render
    store.getState().setTotalItems(totalItems);
    if (currentPage > 1) {
      store.getState().setPage(currentPage);
    }
    return store;
  });

  // Update store when props change (after initial mount)
  React.useEffect(() => {
    useStore.getState().setTotalItems(totalItems);
    if (pageSize !== useStore.getState().pageSize) {
      useStore.getState().setPageSize(pageSize);
    }
    if (currentPage !== useStore.getState().page) {
      useStore.getState().setPage(currentPage);
    }
  }, [totalItems, currentPage, pageSize, useStore]);

  return (
    <Pagination
      store={useStore}
      showSizeSelector={showSizeSelector}
      pageSizeOptions={pageSizeOptions}
      className={className}
    />
  );
};
