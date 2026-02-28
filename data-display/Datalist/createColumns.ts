import type { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";

/**
 * Configuration for a single column in createColumns helper
 */
export interface ColumnConfig<T> {
  /** Accessor key - must be a key of the data type */
  key: keyof T & string;
  /** Header label to display */
  header: string;
  /** Custom cell renderer */
  cell?: (value: T[keyof T], row: T) => ReactNode;
  /** Enable sorting for this column */
  enableSorting?: boolean;
  /** Column width in pixels */
  size?: number;
}

/**
 * Creates strongly typed TanStack Table column definitions from a simple config array.
 *
 * @example
 * ```tsx
 * const columns = createColumns<User>([
 *   { key: 'name', header: 'Name' },
 *   { key: 'email', header: 'Email' },
 *   { key: 'role', header: 'Role', enableSorting: true },
 * ]);
 *
 * <Datalist data={users} columns={columns} variant="table" />
 * <Datalist data={users} columns={columns} variant="card" />
 * ```
 */
export function createColumns<T>(
  configs: ColumnConfig<T>[],
): ColumnDef<T, unknown>[] {
  return configs.map(({ key, header, cell, enableSorting, size }) => ({
    accessorKey: key,
    header,
    ...(cell !== undefined && {
      cell: (info: { getValue: () => unknown; row: { original: T } }) =>
        cell(info.getValue() as T[keyof T], info.row.original),
    }),
    ...(enableSorting !== undefined && { enableSorting }),
    ...(size !== undefined && { size }),
  }));
}
