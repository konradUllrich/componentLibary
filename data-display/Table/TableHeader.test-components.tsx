/**
 * Helper components used exclusively by TableHeader tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  type HeaderGroup,
} from "@tanstack/react-table";
import { TableHeader } from "./TableHeader";

interface Person {
  id: number;
  name: string;
  email: string;
}

const people: Person[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("email", { header: "Email" }),
];

export interface TestTableHeaderProps {
  data?: Person[];
  className?: string;
  "data-testid"?: string;
  "aria-label"?: string;
}

export const TestTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TestTableHeaderProps
>(({ data = people, className, ...rest }, ref) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <TableHeader
        ref={ref}
        headerGroup={table.getHeaderGroups()[0] as HeaderGroup<unknown>}
        className={className}
        {...rest}
      />
    </table>
  );
});
TestTableHeader.displayName = "TestTableHeader";
