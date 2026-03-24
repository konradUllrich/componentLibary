import React from "react";
import clsx from "clsx";
import { createPaginationStore } from "./paginationStore";
import "./pagination.css";

export interface PaginationProps {
  store: ReturnType<typeof createPaginationStore>;
  showSizeSelector?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

/**
 * Pagination Component
 *
 * Displays pagination controls with page navigation and optional page size selector.
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      store,
      showSizeSelector = true,
      pageSizeOptions = [5, 10, 20, 50, 100],
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
    } = store();

    const effectiveTotalPages = totalPages ?? 0;

    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalItems);

    const getPageNumbers = (): (number | string)[] => {
      // For small page counts, show all pages (count = effectiveTotalPages, always fixed)
      if (effectiveTotalPages <= 7) {
        return Array.from({ length: effectiveTotalPages }, (_, i) => i + 1);
      }

      // For larger page counts, always return exactly 7 items to prevent
      // layout shifts and flickering while navigating between pages.
      if (page <= 4) {
        // Near start: [1, 2, 3, 4, 5, ..., N]
        return [1, 2, 3, 4, 5, "...", effectiveTotalPages];
      }

      if (page >= effectiveTotalPages - 3) {
        // Near end: [1, ..., N-4, N-3, N-2, N-1, N]
        return [
          1,
          "...",
          effectiveTotalPages - 4,
          effectiveTotalPages - 3,
          effectiveTotalPages - 2,
          effectiveTotalPages - 1,
          effectiveTotalPages,
        ];
      }

      // Middle: [1, ..., p-1, p, p+1, ..., N]
      return [1, "...", page - 1, page, page + 1, "...", effectiveTotalPages];
    };

    if (effectiveTotalPages <= 1 && !showSizeSelector) return null;

    return (
      <div ref={ref} className={clsx("pagination", className)}>
        <div className="pagination__info">
          <span>
            Showing {startItem} to {endItem} of {totalItems} entries
          </span>
          {showSizeSelector && (
            <div className="pagination__size-selector">
              <label htmlFor="pageSize">Show:</label>
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
              <span>entries</span>
            </div>
          )}
        </div>

        {effectiveTotalPages > 1 && (
          <div className="pagination__controls">
            <button
              onClick={() => setPage(1)}
              disabled={!hasPrevious}
              className="pagination-button pagination-button--first"
              title="First page"
            >
              «
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={!hasPrevious}
              className="pagination-button pagination-button--prev"
              title="Previous page"
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
              title="Next page"
            >
              ›
            </button>
            <button
              onClick={() => setPage(effectiveTotalPages)}
              disabled={!hasNext}
              className="pagination-button pagination-button--last"
              title="Last page"
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
