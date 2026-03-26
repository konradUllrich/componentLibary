/**
 * Helper components used exclusively by usePagination tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import { usePagination, type UsePaginationOptions } from "./usePagination";
import { Router } from "../../Router";

// ===== Basic Pagination Display =====
export const PaginationDisplay = (
  props: UsePaginationOptions & { totalItems?: number },
) => {
  const pagination = usePagination(props);

  React.useEffect(() => {
    if (props.totalItems !== undefined) {
      pagination.setTotalItems(props.totalItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.totalItems]);

  return (
    <div>
      <span data-testid="page">{pagination.page}</span>
      <span data-testid="page-size">{pagination.pageSize}</span>
      <span data-testid="total-items">{pagination.totalItems}</span>
      <span data-testid="total-pages">{pagination.totalPages}</span>
      <span data-testid="has-next">{String(pagination.hasNext)}</span>
      <span data-testid="has-previous">{String(pagination.hasPrevious)}</span>
      <button type="button" onClick={pagination.nextPage} data-testid="next">
        Next
      </button>
      <button type="button" onClick={pagination.prevPage} data-testid="prev">
        Prev
      </button>
      <button
        type="button"
        onClick={() => pagination.setPage(3)}
        data-testid="goto-3"
      >
        Go 3
      </button>
      <button
        type="button"
        onClick={() => pagination.setPageSize(20)}
        data-testid="set-size-20"
      >
        Size 20
      </button>
      <button
        type="button"
        onClick={() => pagination.setTotalItems(100)}
        data-testid="set-total-100"
      >
        Total 100
      </button>
      <button type="button" onClick={pagination.reset} data-testid="reset">
        Reset
      </button>
    </div>
  );
};
PaginationDisplay.displayName = "PaginationDisplay";

// ===== In Router context (for URL param testing) =====
export const RouterPaginationDisplay = (props: UsePaginationOptions) => {
  const Inner = () => {
    const pagination = usePagination(props);

    return (
      <div>
        <span data-testid="page">{pagination.page}</span>
        <span data-testid="page-size">{pagination.pageSize}</span>
        <button type="button" onClick={pagination.nextPage} data-testid="next">
          Next
        </button>
        <button
          type="button"
          onClick={() => pagination.setTotalItems(100)}
          data-testid="set-total-100"
        >
          Total 100
        </button>
        <button
          type="button"
          onClick={() => pagination.setPage(5)}
          data-testid="goto-5"
        >
          Go 5
        </button>
        <button type="button" onClick={pagination.reset} data-testid="reset">
          Reset
        </button>
      </div>
    );
  };
  Inner.displayName = "RouterPaginationDisplayInner";

  return (
    <Router>
      <Inner />
    </Router>
  );
};
RouterPaginationDisplay.displayName = "RouterPaginationDisplay";
