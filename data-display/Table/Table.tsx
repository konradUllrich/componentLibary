import React from "react";
import {
  flexRender,
  ColumnDef,
  Table as TanstackTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import "./Table.css";

export interface TableProps<
  T,
> extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * TanStack Table instance
   */
  table: TanstackTable<T>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Accessible name for the table, rendered as a visible caption
   */
  caption?: string;
}

/**
 * Table Component
 *
 * TanStack Table integration with semantic HTML and design token styling.
 * Provides headless table functionality with flexible rendering.
 *
 * @example
 * ```tsx
 * const columns: ColumnDef<Person>[] = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' }
 * ];
 * const table = useReactTable({
 *   data,
 *   columns,
 *   getCoreRowModel: getCoreRowModel(),
 * });
 *
 * <Table table={table} />
 * ```
 *
 * See {@link ./Table.example.tsx} for the live, greppable version of this
 * snippet.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps<unknown>>(
  ({ className, table, caption, ...props }, ref) => (
    <div className="mp-table-container">
      <table ref={ref} className={clsx("mp-table", className)} {...props}>
        {caption && <caption className="mp-table__caption">{caption}</caption>}
        <thead className="mp-table__head">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="mp-table__row mp-table__row--header">
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                const canSort = header.column.getCanSort();
                const ariaSort =
                  sorted === "asc"
                    ? "ascending"
                    : sorted === "desc"
                      ? "descending"
                      : canSort
                        ? "none"
                        : undefined;
                const headerContent = (
                  <>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {sorted && (
                      <span
                        className="mp-table__sort-indicator"
                        aria-hidden="true"
                      >
                        {sorted === "asc" ? " ↑" : " ↓"}
                      </span>
                    )}
                  </>
                );
                return (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={ariaSort}
                    className={clsx("mp-table__cell mp-table__cell--header", {
                      "mp-table__cell--sortable": canSort,
                      "mp-table__cell--first": header.index === 0,
                      "mp-table__cell--last":
                        header.index === headerGroup.headers.length - 1,
                    })}
                    style={{
                      width:
                        header.column.columnDef.meta?.width ?? header.getSize(),
                      minWidth: header.column.columnDef.meta?.minWidth,
                    }}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        className="mp-table__header-content mp-table__sort-button"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {headerContent}
                      </button>
                    ) : (
                      <div className="mp-table__header-content">
                        {headerContent}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="mp-table__body">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="mp-table__row">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="mp-table__cell"
                  style={{
                    width:
                      cell.column.columnDef.meta?.width ??
                      cell.column.getSize(),
                    minWidth: cell.column.columnDef.meta?.minWidth,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
);

Table.displayName = "Table";

export type { ColumnDef };
export type { TanstackTable };
