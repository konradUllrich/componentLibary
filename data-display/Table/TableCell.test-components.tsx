/**
 * Helper components used exclusively by TableCell tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  type Cell,
} from "@tanstack/react-table";
import { TableCell } from "./TableCell";

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
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>,
  }),
];

export interface TestTableCellProps {
  data?: Person[];
  rowIndex?: number;
  cellIndex?: number;
  align?: "left" | "center" | "right";
  className?: string;
  "data-testid"?: string;
  "aria-label"?: string;
}

export const TestTableCell = React.forwardRef<
  HTMLTableCellElement,
  TestTableCellProps
>(
  (
    { data = people, rowIndex = 0, cellIndex = 0, align, className, ...rest },
    ref,
  ) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    const cell = table.getRowModel().rows[rowIndex].getVisibleCells()[
      cellIndex
    ];

    return (
      <table>
        <tbody>
          <tr>
            <TableCell
              ref={ref}
              cell={cell as Cell<unknown, unknown>}
              align={align}
              className={className}
              {...rest}
            />
          </tr>
        </tbody>
      </table>
    );
  },
);
TestTableCell.displayName = "TestTableCell";
