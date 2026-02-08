import React from "react";
import { flexRender, Cell } from "@tanstack/react-table";
import clsx from "clsx";
import "./Table.css";

export interface TableCellProps<
  T,
> extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * TanStack Table cell instance
   */
  cell: Cell<T, unknown>;

  /**
   * Horizontal alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TableCell Component
 *
 * Renders a table cell with TanStack Table integration.
 * Supports flexible content rendering and alignment.
 *
 * @example
 * ```tsx
 * {row.getVisibleCells().map((cell) => (
 *   <TableCell
 *     key={cell.id}
 *     cell={cell}
 *     align="center"
 *   />
 * ))}
 * ```
 */
export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps<unknown>
>(({ cell, align = "left", className, ...props }, ref) => (
  <td
    ref={ref}
    className={clsx("table__cell", `table__cell--align-${align}`, className)}
    {...props}
  >
    {flexRender(cell.column.columnDef.cell, cell.getContext())}
  </td>
));

TableCell.displayName = "TableCell";
