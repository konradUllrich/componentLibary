import React from "react";
import {
  Table,
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type TanstackTable,
} from "./index";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  Table,
  useReactTable,
  getCoreRowModel,
  ColumnDef
} from '@mp-ku/mp-components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

const table = useReactTable({
  data: users,
  columns,
  getCoreRowModel: getCoreRowModel(),
});

<Table table={table} />`;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

/** Live render of {@link usageSource}, used on the Table demo page. */
export const UsageExample = () => {
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <Table table={table as unknown as TanstackTable<unknown>} />;
};
