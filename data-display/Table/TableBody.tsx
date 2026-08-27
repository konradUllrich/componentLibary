import React from "react";
import { flexRender, Row } from "@tanstack/react-table";
import clsx from "clsx";
import "./Table.css";

export interface TableBodyProps<T>
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Rows to render
   */
  rows: Array<Row<T>>;

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
export const TableBody = React.forwardRef(function TableBody<T>(
  { rows, className, ...props }: TableBodyProps<T>,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  return (
    <tbody ref={ref} className={clsx("mp-table__body", className)} {...props}>
      {rows.map((row) => (
        <tr key={row.id} className="mp-table__row">
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="mp-table__cell"
              style={{ width: cell.column.getSize() }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}) as <T>(
  props: TableBodyProps<T> & { ref?: React.Ref<HTMLTableSectionElement> },
) => React.ReactElement;

(TableBody as unknown as { displayName: string }).displayName = "TableBody";
