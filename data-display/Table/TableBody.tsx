import React from "react";
import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import "./Table.css";

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Rows to render
   */
  rows: Array<{
    id: string;
    getVisibleCells: () => Array<{
      id: string;
      column: {
        getSize: () => number;
        columnDef: { cell: unknown };
      };
      getContext: () => unknown;
    }>;
  }>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TableBody Component
 *
 * Renders table body rows with TanStack Table integration.
 * Handles cell rendering and responsive behavior.
 *
 * @example
 * ```tsx
 * <TableBody rows={table.getRowModel().rows} />
 * ```
 */
export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ rows, className, ...props }, ref) => (
  <tbody ref={ref} className={clsx("table__body", className)} {...props}>
    {rows.map((row) => (
      <tr key={row.id} className="table__row">
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="table__cell"
            style={{ width: cell.column.getSize() }}
          >
            {flexRender(
              cell.column.columnDef.cell as React.ReactNode,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              cell.getContext() as any,
            )}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
));

TableBody.displayName = "TableBody";
