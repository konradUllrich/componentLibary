import React from "react";
import { Pagination } from "./Pagination";
import { createPagination } from "../../hooks/usePagination/createPagination";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Pagination } from '@mp-ku/mp-components';
import { createPagination } from '@mp-ku/mp-components';

const usePagination = createPagination({ storageKey: 'users-pagination' });

function UserList() {
  const pagination = usePagination();

  React.useEffect(() => {
    pagination.setTotalItems(100);
  }, []);

  return <Pagination pagination={pagination} />;
}`;

const usePaginationExample = createPagination({
  storageKey: "pagination-usage-example",
});

const UsageExampleList: React.FC = () => {
  const pagination = usePaginationExample();

  React.useEffect(() => {
    pagination.setTotalItems(100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Pagination pagination={pagination} />;
};

/** Live render of {@link usageSource}, used on the Pagination demo page. */
export const UsageExample = () => <UsageExampleList />;
