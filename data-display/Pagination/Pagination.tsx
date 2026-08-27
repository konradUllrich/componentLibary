import React from "react";
import clsx from "clsx";
import type { PaginationState } from "../../hooks/usePagination/createPagination";
import "./pagination.css";

export interface PaginationLabels {
  /**
   * Info text template shown next to the size selector. Supports the
   * placeholders `{start}`, `{end}`, `{total}`, and `{resource}`.
   * @default "{start} bis {end} von {total} {resource}"
   */
  info?: string;
  /** Label in front of the page size `<select>`. @default "Anzeigen:" */
  sizeSelector?: string;
  /** `title` attribute on the "jump to first page" button. @default "Erste Seite" */
  firstPage?: string;
  /** `title` attribute on the "previous page" button. @default "Vorherige Seite" */
  previousPage?: string;
  /** `title` attribute on the "next page" button. @default "Nächste Seite" */
  nextPage?: string;
  /** `title` attribute on the "jump to last page" button. @default "Letzte Seite" */
  lastPage?: string;
}

const defaultLabels: Required<PaginationLabels> = {
  info: "{start} bis {end} von {total} {resource}",
  sizeSelector: "Anzeigen:",
  firstPage: "Erste Seite",
  previousPage: "Vorherige Seite",
  nextPage: "Nächste Seite",
  lastPage: "Letzte Seite",
};

function formatInfo(
  template: string,
  startItem: number,
  endItem: number,
  totalItems: number,
  resourceName: string,
): string {
  return template
    .replace("{start}", String(startItem))
    .replace("{end}", String(endItem))
    .replace("{total}", String(totalItems))
    .replace("{resource}", resourceName);
}

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
  /**
   * Overrides for the component's built-in text, which defaults to German.
   * Only the keys you pass are overridden — everything else keeps the
   * German default.
   * @example
   * ```tsx
   * <Pagination
   *   pagination={pagination}
   *   resourceName="entries"
   *   labels={{
   *     info: "Showing {start} to {end} of {total} {resource}",
   *     sizeSelector: "Show:",
   *     firstPage: "First page",
   *     previousPage: "Previous page",
   *     nextPage: "Next page",
   *     lastPage: "Last page",
   *   }}
   * />
   * ```
   */
  labels?: PaginationLabels;
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
 *
 * See {@link ./Pagination.example.tsx} for the live, greppable version of
 * this snippet.
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      pagination,
      showSizeSelector = true,
      pageSizeOptions = [5, 10, 20, 50, 100],
      hideOnEmpty = true,
      resourceName = "Einträge",
      labels,
      className,
    },
    ref,
  ) => {
    const mergedLabels = { ...defaultLabels, ...labels };
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
      <div ref={ref} className={clsx("mp-pagination", className)}>
        <div className="mp-pagination__info">
          <span>
            {formatInfo(
              mergedLabels.info,
              startItem,
              endItem,
              totalItems,
              resourceName,
            )}
          </span>
          {showSizeSelector && (
            <div className="mp-pagination__size-selector">
              <label htmlFor="pageSize">{mergedLabels.sizeSelector}</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="mp-pagination__select"
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
          <div className="mp-pagination__controls">
            <button
              onClick={() => setPage(1)}
              disabled={!hasPrevious}
              className="mp-pagination-button mp-pagination-button--first"
              title={mergedLabels.firstPage}
            >
              «
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={!hasPrevious}
              className="mp-pagination-button mp-pagination-button--prev"
              title={mergedLabels.previousPage}
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
                  "mp-pagination-button",
                  pageItem === page && "mp-pagination-button--active",
                  typeof pageItem !== "number" && "mp-pagination-button--ellipsis",
                )}
              >
                {pageItem}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={!hasNext}
              className="mp-pagination-button mp-pagination-button--next"
              title={mergedLabels.nextPage}
            >
              ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={!hasNext}
              className="mp-pagination-button mp-pagination-button--last"
              title={mergedLabels.lastPage}
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
