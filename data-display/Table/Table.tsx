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
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps<unknown>>(
  ({ className, table, caption, ...props }, ref) => (
    <div className="table-container">
      <table ref={ref} className={clsx("table", className)} {...props}>
        {caption && <caption className="table__caption">{caption}</caption>}
        <thead className="table__head">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="table__row table__row--header">
              {headerGroup.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                const ariaSort =
                  sorted === "asc"
                    ? "ascending"
                    : sorted === "desc"
                      ? "descending"
                      : header.column.getCanSort()
                        ? "none"
                        : undefined;
                return (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={ariaSort}
                    className={clsx("table__cell table__cell--header", {
                      "table__cell--sortable": header.column.getCanSort(),
                    })}
                    style={{
                      width:
                        header.column.columnDef.meta?.width ?? header.getSize(),
                      minWidth: header.column.columnDef.meta?.minWidth,
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="table__header-content">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {sorted && (
                        <span
                          className="table__sort-indicator"
                          aria-hidden="true"
                        >
                          {sorted === "asc" ? " ↑" : " ↓"}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="table__body">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="table__row">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="table__cell"
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
