/**
 * Helper components used exclusively by TableBody tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  type Row,
} from "@tanstack/react-table";
import { TableBody } from "./TableBody";

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

export interface TestTableBodyProps {
  data?: Person[];
  className?: string;
  "data-testid"?: string;
  "aria-label"?: string;
}

export const TestTableBody = React.forwardRef<
  HTMLTableSectionElement,
  TestTableBodyProps
>(({ data = people, className, ...rest }, ref) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <TableBody
        ref={ref}
        rows={table.getRowModel().rows as Row<unknown>[]}
        className={className}
        {...rest}
      />
    </table>
  );
});
TestTableBody.displayName = "TestTableBody";
