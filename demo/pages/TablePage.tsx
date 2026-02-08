import React from 'react';
import { Table, useReactTable, getCoreRowModel, type ColumnDef } from '../../data-display/Table';
import { Text } from '../../common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const TablePage: React.FC = () => {
  const sampleData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User' },
  ];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
  ];

  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Table Component</Text>
        <Text color="secondary">
          Flexible table component for displaying structured data
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Table</Text>
        <Text color="secondary" size="sm">
          Simple table with header and body using TanStack Table
        </Text>
        <div className="component-page__demo">
          <Table table={table} />
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  Table, 
  useReactTable, 
  getCoreRowModel, 
  ColumnDef 
} from '@konradullrich/mp-components';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

const table = useReactTable({
  data: sampleData,
  columns,
  getCoreRowModel: getCoreRowModel(),
});

<Table table={table} />`}</code>
        </pre>
      </section>
    </div>
  );
};
