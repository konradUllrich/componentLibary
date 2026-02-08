import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  Table as TanstackTable,
  SortingState,
} from "@tanstack/react-table";
import { Table } from "./Table";
import "./Table.css";

export interface DatalistProps<T> {
  /**
   * Table data rows
   */
  data: T[];

  /**
   * Column definitions
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Show loading state
   */
  isLoading?: boolean;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Sorting state and handler
   */
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
}

/**
 * Helper function to create strongly typed columns
 *
 * @example
 * ```tsx
 * const columns = createTableColumns<User>([
 *   { key: 'name', label: 'Name' },
 *   { key: 'email', label: 'Email' },
 * ]);
 * ```
 */

/**
 * Datalist Component
 *
 * Simplified table builder that wraps TanStack Table for easy integration.
 * Automatically creates columns and handles rendering logic.
 *
 * @example
 * ```tsx
 * interface User {
 *   id: string;
 *   name: string;
 *   email: string;
 * }
 *
 * const columns = createTableColumns<User>([
 *   { key: 'name', label: 'Name' },
 *   { key: 'email', label: 'Email' },
 * ]);
 *
 * <Datalist data={users} columns={columns} />
 * ```
 */
const DatalistComponent = <T extends Record<string, unknown>>(
  {
    data,
    columns,
    className,
    isLoading = false,
    emptyMessage = "No data",
    sorting,
    onSortingChange,
  }: DatalistProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) => {
  // Create TanStack column definitions from simple column config
  const [sortingState, setSorting] = React.useState<SortingState>(
    sorting || [],
  );

  const table = useReactTable<T>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting !== undefined ? sorting : sortingState,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sortingState) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
  });

  if (isLoading) {
    return (
      <div className="table__loading">
        <span>Loading...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table__empty">
        <span>{emptyMessage}</span>
      </div>
    );
  }

  return (
    <Table
      ref={ref}
      table={table as TanstackTable<unknown>}
      className={className}
    />
  );
};

const DatalistWithRef = React.forwardRef(DatalistComponent) as <
  T extends Record<string, unknown>,
>(
  props: DatalistProps<T> & {
    ref?: React.ForwardedRef<HTMLTableElement>;
  },
) => React.ReactElement;

type DatalistType = typeof DatalistWithRef;

export const Datalist: DatalistType = DatalistWithRef;
(Datalist as unknown as { displayName: string }).displayName = "Datalist";
