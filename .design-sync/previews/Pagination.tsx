import React from 'react';
import { Pagination, type PaginationState } from '@mp-ku/mp-components';

/** Static pagination state — in an app this comes from `createPagination(...)()`. */
function pageState(page: number, pageSize: number, totalItems: number): PaginationState {
  const totalPages = Math.ceil(totalItems / pageSize);
  const noop = () => undefined;
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
    setPage: noop,
    nextPage: noop,
    prevPage: noop,
    setPageSize: noop,
    setTotalItems: noop,
    reset: noop,
  };
}

const englishLabels = {
  info: 'Showing {start} to {end} of {total} {resource}',
  sizeSelector: 'Show:',
  firstPage: 'First page',
  previousPage: 'Previous page',
  nextPage: 'Next page',
  lastPage: 'Last page',
};

export const FirstPage = () => (
  <Pagination pagination={pageState(1, 10, 124)} resourceName="projects" labels={englishLabels} />
);

export const MiddlePage = () => (
  <Pagination pagination={pageState(6, 20, 487)} resourceName="tasks" labels={englishLabels} />
);

export const FewPages = () => (
  <Pagination
    pagination={pageState(2, 10, 38)}
    resourceName="customers"
    labels={englishLabels}
    showSizeSelector={false}
  />
);

export const GermanDefaults = () => <Pagination pagination={pageState(3, 10, 86)} resourceName="Einträge" />;
