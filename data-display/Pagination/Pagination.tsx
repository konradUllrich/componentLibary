import React from "react";
import clsx from "clsx";
import type { PaginationState } from "../../hooks/usePagination/createPagination";
import "./pagination.css";

export interface PaginationProps {
  pagination: PaginationState;
  showSizeSelector?: boolean;
  pageSizeOptions?: number[];
  /**
   * Hide the component when there are no items
   * @default true
   */
  hideOnEmpty?: boolean;
  /**
   * Name of the resource being paginated, used in the info text and size selector.
   * @example "Produkte", "Benutzer", "Einträge"
   * @default "Einträge"
   */
  resourceName?: string;
  className?: string;
}

/**
 * Pagination Component
 *
 * Displays pagination controls with page navigation and optional page size selector.
 * Accepts the return value of the `usePagination` hook directly.
 *
 * @example
 * const pagination = usePagination({ storageKey: "my-table" });
 * pagination.setTotalItems(totalCount);
 * <Pagination pagination={pagination} />
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      pagination,
      showSizeSelector = true,
      pageSizeOptions = [5, 10, 20, 50, 100],
      hideOnEmpty = true,
      resourceName = "Einträge",
      className,
    },
    ref,
  ) => {
    const {
      page,
      totalPages,
      totalItems,
      pageSize,
      hasNext,
      hasPrevious,
      setPage,
      setPageSize,
    } = pagination;

    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalItems);

    const getPageNumbers = (): (number | string)[] => {
      // For small page counts, show all pages (count = totalPages, always fixed)
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // For larger page counts, always return exactly 7 items to prevent
      // layout shifts and flickering while navigating between pages.
      if (page <= 4) {
        // Near start: [1, 2, 3, 4, 5, ..., N]
        return [1, 2, 3, 4, 5, "...", totalPages];
      }

      if (page >= totalPages - 3) {
        // Near end: [1, ..., N-4, N-3, N-2, N-1, N]
        return [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      // Middle: [1, ..., p-1, p, p+1, ..., N]
      return [1, "...", page - 1, page, page + 1, "...", totalPages];
    };

    if (hideOnEmpty && totalItems === 0) return null;
    if (totalPages <= 1 && !showSizeSelector) return null;

    return (
      <div ref={ref} className={clsx("pagination", className)}>
        <div className="pagination__info">
          <span>
            {startItem} bis {endItem} von {totalItems} {resourceName}
          </span>
          {showSizeSelector && (
            <div className="pagination__size-selector">
              <label htmlFor="pageSize">Zeige:</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="pagination__select"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>{resourceName}</span>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination__controls">
            <button
              onClick={() => setPage(1)}
              disabled={!hasPrevious}
              className="pagination-button pagination-button--first"
              title="Erste Seite"
            >
              «
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={!hasPrevious}
              className="pagination-button pagination-button--prev"
              title="Vorherige Seite"
            >
              ‹
            </button>

            {getPageNumbers().map((pageItem, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof pageItem === "number" ? setPage(pageItem) : undefined
                }
                disabled={typeof pageItem !== "number"}
                className={clsx(
                  "pagination-button",
                  pageItem === page && "pagination-button--active",
                  typeof pageItem !== "number" && "pagination-button--ellipsis",
                )}
              >
                {pageItem}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={!hasNext}
              className="pagination-button pagination-button--next"
              title="Nächste Seite"
            >
              ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={!hasNext}
              className="pagination-button pagination-button--last"
              title="Letzte Seite"
            >
              »
            </button>
          </div>
        )}
      </div>
    );
  },
);

Pagination.displayName = "Pagination";
