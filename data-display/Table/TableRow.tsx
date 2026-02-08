import React from "react";
import { Row } from "@tanstack/react-table";
import clsx from "clsx";
import "./Table.css";

export interface TableRowProps<
  T,
> extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * TanStack Table row instance
   */
  row: Row<T>;

  /**
   * Whether row is selected
   */
  isSelected?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TableRow Component
 *
 * Renders a table row with TanStack Table integration.
 * Supports row selection and hover states.
 *
 * @example
 * ```tsx
 * {table.getRowModel().rows.map((row) => (
 *   <TableRow
 *     key={row.id}
 *     row={row}
 *     isSelected={row.getIsSelected()}
 *   />
 * ))}
 * ```
 */
export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  TableRowProps<any>
>(({ row, isSelected = false, className, ...props }, ref) => (
  <tr
    ref={ref}
    className={clsx(
      "table__row",
      isSelected && "table__row--selected",
      className,
    )}
    {...props}
  >
    {row.getVisibleCells().map((cell) => (
      <td key={cell.id} className="table__cell">
        {cell.getValue() as React.ReactNode}
      </td>
    ))}
  </tr>
));

TableRow.displayName = "TableRow";
