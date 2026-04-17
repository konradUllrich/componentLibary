import type { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";

/**
 * Configuration for a single column in createColumns helper.
 *
 * There are three ways to define a column:
 *
 * 1. **Key column** – reads a top-level property of the row object via `key`.
 * 2. **Accessor-function column** – reads any value (including nested properties)
 *    via `accessorFn`. Requires `id`.
 * 3. **Action/display column** – has no data accessor; used for row-level
 *    action buttons (edit, delete, …). Requires `id` and `cell`.
 */
export interface ColumnConfig<T> {
  /**
   * Accessor key for a **top-level** property of the row object.
   * Omit when using `accessorFn` or when defining an action column.
   */
  key?: keyof T & string;

  /**
   * Unique column identifier.
   * Required when `key` is omitted (accessor-function columns and action columns).
   */
  id?: string;

  /**
   * Function accessor for **nested** or **computed** values.
   * Use this instead of `key` to read properties that live deeper in the
   * object hierarchy, e.g. `(row) => row.address.city`.
   *
   * @example
   * ```tsx
   * { id: 'city', header: 'City', accessorFn: (row) => row.address.city }
   * ```
   */
  accessorFn?: (row: T) => unknown;

  /** Header label to display */
  header: string;

  /**
   * Custom cell renderer.
   * Receives the accessed value and the full row object.
   * For action columns `value` is `undefined` – use `row` to build buttons.
   *
   * @example
   * ```tsx
   * // Action column
   * {
   *   id: 'actions',
   *   header: 'Actions',
   *   cell: (_value, row) => (
   *     <button onClick={() => onDelete(row)}>Delete</button>
   *   ),
   * }
   * ```
   */
  cell?: (value: unknown, row: T) => ReactNode;

  /** Enable sorting for this column */
  enableSorting?: boolean;

  /**
   * Column width.
   * - Pass a **number** for a pixel-based width handled by TanStack Table (e.g. `200`).
   * - Pass a **string** for a CSS value applied directly to the `<th>`/`<td>` style
   *   (e.g. `"20%"`, `"10rem"`). Percentage values are especially useful here.
   */
  size?: number | string;

  /**
   * Minimum column width in pixels.
   * Prevents the column from shrinking below this value during resizing.
   */
  minSize?: number;
}

/**
 * Creates strongly typed TanStack Table column definitions from a simple
 * config array.
 *
 * ### Top-level property
 * ```tsx
 * const columns = createColumns<User>([
 *   { key: 'name', header: 'Name' },
 *   { key: 'email', header: 'Email', enableSorting: true },
 * ]);
 * ```
 *
 * ### Nested / deep object access
 * Use `accessorFn` together with a unique `id` to read values that are not
 * direct properties of the row type:
 * ```tsx
 * interface Employee {
 *   id: number;
 *   name: string;
 *   address: { city: string; country: string };
 * }
 *
 * const columns = createColumns<Employee>([
 *   { key: 'name', header: 'Name' },
 *   { id: 'city',    header: 'City',    accessorFn: (row) => row.address.city },
 *   { id: 'country', header: 'Country', accessorFn: (row) => row.address.country },
 * ]);
 * ```
 *
 * ### Action columns
 * Omit both `key` and `accessorFn`, provide an `id`, and supply a `cell`
 * renderer to add interactive controls per row:
 * ```tsx
 * const columns = createColumns<User>([
 *   { key: 'name', header: 'Name' },
 *   {
 *     id: 'actions',
 *     header: 'Actions',
 *     cell: (_value, row) => (
 *       <div style={{ display: 'flex', gap: '0.5rem' }}>
 *         <button onClick={() => onEdit(row)}>Edit</button>
 *         <button onClick={() => onDelete(row)}>Delete</button>
 *       </div>
 *     ),
 *   },
 * ]);
 * ```
 *
 * @example
 * ```tsx
 * <Datalist data={users} columns={columns} variant="table" />
 * ```
 */
export function createColumns<T>(
  configs: ColumnConfig<T>[],
): ColumnDef<T, unknown>[] {
  return configs.map(
    ({ key, id, accessorFn, header, cell, enableSorting, size, minSize }) => ({
      header,
      ...(id !== undefined && { id }),
      ...(key !== undefined && { accessorKey: key }),
      ...(accessorFn !== undefined && { accessorFn }),
      ...(cell !== undefined && {
        cell: (info: { getValue: () => unknown; row: { original: T } }) =>
          cell(info.getValue(), info.row.original),
      }),
      ...(enableSorting !== undefined && { enableSorting }),
      ...(typeof size === "number" && { size }),
      meta: {
        ...(typeof size === "string" && { width: size }),
        ...(minSize !== undefined && { minWidth: minSize }),
      },
    }),
  );
}
