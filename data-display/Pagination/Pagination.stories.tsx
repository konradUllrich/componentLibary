import React from "react";
import { Pagination } from "./Pagination";
import { createPaginationStore } from "./paginationStore";

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
