import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  Table as TanstackTable,
  SortingState,
} from "@tanstack/react-table";
import { Table } from "../Table/Table";
import { CardList } from "../CardList/CardList";
import { createDefaultCardRenderer } from "./defaultCardRenderer";
import "./Datalist.css";
import "../Table/Table.css";

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
   * Display variant
   * @default "table"
   */
  variant?: "table" | "card";

  /**
   * Render function for card variant
   */
  renderCard?: (item: T, index: number) => React.ReactNode;

  /**
   * Number of card columns (card variant only)
   * @default 3
   */
  cardColumns?: number;

  /**
   * Gap between cards (card variant only)
   * @default "1rem"
   */
  cardGap?: string;

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
 * Flexible data display component that supports both table and card variants.
 * Wraps TanStack Table for data management and sorting functionality.
 *
 * @example
 * ```tsx
 * // Table variant
 * <Datalist data={users} columns={columns} variant="table" />
 *
 * // Card variant
 * <Datalist
 *   data={users}
 *   columns={columns}
 *   variant="card"
 *   cardColumns={3}
 *   renderCard={(user) => <UserCard user={user} />}
 * />
 * ```
 */
const DatalistComponent = <T extends Record<string, unknown>>(
  {
    data,
    columns,
    variant = "table",
    renderCard,
    cardColumns = 3,
    cardGap = "1rem",
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

  // Card variant
  if (variant === "card") {
    const defaultRenderCard = createDefaultCardRenderer(table);

    return (
      <CardList
        items={table.getRowModel().rows.map((row) => row.original)}
        columns={cardColumns}
        gap={cardGap}
        className={className}
        renderCard={
          (renderCard || defaultRenderCard) as (
            item: unknown,
            index: number,
          ) => React.ReactNode
        }
        getKey={(item: unknown) => {
          // Try to find an id field for key generation
          if (typeof item === "object" && item !== null && "id" in item) {
            return (item as { id: React.Key }).id;
          }
          return item as React.Key;
        }}
      />
    );
  }

  // Table variant (default)
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
