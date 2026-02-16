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
  ({ className, table, ...props }, ref) => (
    <div className="table-container">
      <table ref={ref} className={clsx("table", className)} {...props}>
        <thead className="table__head">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="table__row table__row--header">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx("table__cell table__cell--header", {
                    "table__cell--sortable": header.column.getCanSort(),
                  })}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="table__header-content">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <span className="table__sort-indicator">
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  </div>
                </th>
              ))}
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
                  style={{ width: cell.column.getSize() }}
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
