/**
 * Helper components used exclusively by Table tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { Table } from "./Table";

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
  columnHelper.accessor("name", {
    header: "Name",
    enableSorting: true,
  }),
  columnHelper.accessor("email", {
    header: "Email",
    enableSorting: false,
  }),
];

export interface TestTableProps {
  data?: Person[];
  className?: string;
  caption?: string;
}

export const TestTable = React.forwardRef<HTMLTableElement, TestTableProps>(
  ({ data = people, className, caption }, ref) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    return (
      <div>
        <Table
          ref={ref}
          table={table as TanstackTable<unknown>}
          className={className}
          caption={caption}
        />
      </div>
    );
  },
);
TestTable.displayName = "TestTable";
