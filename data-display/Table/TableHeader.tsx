import React from "react";
import { HeaderGroup, flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import "./Table.css";

export interface TableHeaderProps<
  T,
> extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * TanStack Table header group instance
   */
  headerGroup: HeaderGroup<T>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TableHeader Component
 *
 * Renders a table header row with TanStack Table integration.
 * Handles header cell rendering and styling.
 *
 * @example
 * ```tsx
 * {table.getHeaderGroups().map((headerGroup) => (
 *   <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
 * ))}
 * ```
 */
export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps<unknown>
>(({ headerGroup, className, ...props }, ref) => (
  <thead ref={ref} className={clsx("mp-table__head", className)} {...props}>
    <tr className="mp-table__row mp-table__row--header">
      {headerGroup.headers.map((header) => (
        <th
          key={header.id}
          className="mp-table__cell mp-table__cell--header"
          style={{ width: header.getSize() }}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  </thead>
));

TableHeader.displayName = "TableHeader";
