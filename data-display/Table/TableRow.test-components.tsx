/**
 * Helper components used exclusively by TableRow tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  type Row,
} from "@tanstack/react-table";
import { TableRow } from "./TableRow";

export interface Person {
  id: number;
  name: string;
  email: string;
}

export const people: Person[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
];

// Columns definition producing rows with no visible cells, to exercise the
// empty-cells edge case.
const noColumns: typeof columns = [];

export interface TestTableRowProps {
  data?: Person[];
  rowIndex?: number;
  isSelected?: boolean;
  className?: string;
  noCells?: boolean;
  "data-testid"?: string;
  "aria-label"?: string;
}

export const TestTableRow = React.forwardRef<
  HTMLTableRowElement,
  TestTableRowProps
>(
  (
    { data = people, rowIndex = 0, isSelected = false, className, noCells = false, ...rest },
    ref,
  ) => {
    const table = useReactTable({
      data,
      columns: noCells ? noColumns : columns,
      getCoreRowModel: getCoreRowModel(),
    });

    const row = table.getRowModel().rows[rowIndex];

    return (
      <table>
        <tbody>
          <TableRow
            ref={ref}
            row={row as Row<unknown>}
            isSelected={isSelected}
            className={className}
            {...rest}
          />
        </tbody>
      </table>
    );
  },
);
TestTableRow.displayName = "TestTableRow";
