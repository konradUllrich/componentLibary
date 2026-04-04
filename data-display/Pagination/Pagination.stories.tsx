import React from "react";
import { Pagination } from "./Pagination";
import { createPagination } from "../../hooks/usePagination/createPagination";

/**
 * Test wrapper component for Pagination.
 * Uses `createPagination` hook factory — the same API consumers use in production.
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

  const usePagination = React.useRef(
    createPagination({
      storageKey: "test-pagination",
      defaultPage: currentPage,
      defaultPageSize: pageSize,
      syncUrl: false,
    }),
  ).current;

  const pagination = usePagination();

  // Sync totalItems whenever the prop changes
  React.useEffect(() => {
    pagination.setTotalItems(totalItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

  // Sync page when currentPage prop changes after mount
  React.useEffect(() => {
    pagination.setPage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Pagination
      pagination={pagination}
      showSizeSelector={showSizeSelector}
      pageSizeOptions={pageSizeOptions}
      className={className}
    />
  );
};
