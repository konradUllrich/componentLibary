/**
 * Helper components used exclusively by usePagination tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  createPagination,
  type UsePaginationOptions,
} from "./createPagination";
import { Router, Route, Link } from "../../Router";

// ===== Basic Pagination Display =====
export const PaginationDisplay = (
  props: UsePaginationOptions & { totalItems?: number },
) => {
  const { totalItems, ...factoryOpts } = props;
  const usePagination = React.useRef(createPagination(factoryOpts)).current;
  const pagination = usePagination({ totalItems });

  React.useEffect(() => {
    if (totalItems !== undefined) {
      pagination.setTotalItems(totalItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems]);

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
  const usePagination = React.useRef(createPagination(props)).current;

  const Inner = () => {
    const pagination = usePagination();

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

// ===== Cross-instance sync (shared storageKey) =====
export const CrossInstancePaginationSyncComponent = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const usePagination = React.useRef(createPagination({ storageKey })).current;

  const InstanceA = () => {
    const { page, setPage, setTotalItems } = usePagination();
    return (
      <div>
        <span data-testid="instance-a-page">{page}</span>
        <button
          type="button"
          onClick={() => setTotalItems(100)}
          data-testid="instance-a-set-total"
        >
          set total 100
        </button>
        <button
          type="button"
          onClick={() => setPage(5)}
          data-testid="instance-a-goto-5"
        >
          go to page 5
        </button>
      </div>
    );
  };
  InstanceA.displayName = "InstanceA";

  const InstanceB = () => {
    const { page } = usePagination();
    return <span data-testid="instance-b-page">{page}</span>;
  };
  InstanceB.displayName = "InstanceB";

  return (
    <Router>
      <InstanceA />
      <InstanceB />
    </Router>
  );
};
CrossInstancePaginationSyncComponent.displayName =
  "CrossInstancePaginationSyncComponent";

// ===== Navigation restore (two-route scenario) =====
export const PaginationNavigationRestoreComponent = ({
  storageKey,
  defaultPageSize = 10,
}: {
  storageKey: string;
  defaultPageSize?: number;
}) => {
  const usePaginationHook = React.useRef(
    createPagination({ storageKey, defaultPageSize }),
  ).current;

  const ListPage = () => {
    const pagination = usePaginationHook();
    return (
      <div>
        <span data-testid="page">{pagination.page}</span>
        <button
          type="button"
          onClick={() => pagination.setTotalItems(100)}
          data-testid="set-total"
        >
          Set total
        </button>
        <button
          type="button"
          onClick={() => pagination.setPage(5)}
          data-testid="goto-5"
        >
          Go 5
        </button>
        <Link href="/other" data-testid="go-other">
          Other
        </Link>
      </div>
    );
  };
  ListPage.displayName = "ListPage";

  return (
    <Router>
      <Route path="/">
        <ListPage />
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
PaginationNavigationRestoreComponent.displayName =
  "PaginationNavigationRestoreComponent";
