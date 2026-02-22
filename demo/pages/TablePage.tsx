import React from "react";
import {
  Table,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  type ColumnDef,
  type SortingState,
  type GroupingState,
} from "../../data-display/Table";
import { Text } from "../../common";
import { Page, Section } from "../../layout";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    department: "Engineering",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    department: "Sales",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Editor",
    department: "Marketing",
    status: "Active",
  },
  {
    id: 7,
    name: "Eve Davis",
    email: "eve@example.com",
    role: "User",
    department: "Sales",
    status: "Inactive",
  },
];

export const TablePage: React.FC = () => {
  // Basic table columns
  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
    ],
    [],
  );

  // Sortable table state and columns
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const sortableColumns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "role",
        header: "Role",
        enableSorting: true,
      },
    ],
    [],
  );

  // Grouping table state and columns
  const [grouping, setGrouping] = React.useState<GroupingState>(["department"]);

  const groupableColumns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row, getValue }) => (
          <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
            {row.getIsGrouped() ? (
              <button
                onClick={row.getToggleExpandedHandler()}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {row.getIsExpanded() ? "▼" : "▶"} {getValue<string>()} (
                {row.subRows.length})
              </button>
            ) : (
              getValue<string>()
            )}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    [],
  );

  // Basic table
  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Sortable table
  const sortableTable = useReactTable({
    data: sampleData,
    columns: sortableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Grouping table
  const groupingTable = useReactTable({
    data: sampleData,
    columns: groupableColumns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Table Component
        </Text>
        <Text color="secondary">
          Flexible table component for displaying structured data with sorting
          and grouping
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Table
        </Text>
        <Text color="secondary" size="sm">
          Simple table with header and body using TanStack Table. Scrollable on
          mobile devices.
        </Text>
        <div className="component-page__demo">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Table table={table as any} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Sortable Table
        </Text>
        <Text color="secondary" size="sm">
          Click on column headers to sort the data. Click again to reverse the
          sort order.
        </Text>
        <div className="component-page__demo">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Table table={sortableTable as any} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Grouped Table
        </Text>
        <Text color="secondary" size="sm">
          Table grouped by department. Click the expand/collapse buttons to show
          or hide department members.
        </Text>
        <div className="component-page__demo">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Table table={groupingTable as any} />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Usage
        </Text>
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
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Sorting Example
        </Text>
        <pre className="code-block">
          <code>{`import { 
  Table, 
  useReactTable, 
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef 
} from '@konradullrich/mp-components';

const [sorting, setSorting] = useState<SortingState>([]);

const columns: ColumnDef<User>[] = [
  { accessorKey: 'id', header: 'ID', enableSorting: true },
  { accessorKey: 'name', header: 'Name', enableSorting: true },
  { accessorKey: 'email', header: 'Email', enableSorting: true },
  { accessorKey: 'role', header: 'Role', enableSorting: true },
];

const table = useReactTable({
  data: sampleData,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});

<Table table={table} />`}</code>
        </pre>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Grouping Example
        </Text>
        <pre className="code-block">
          <code>{`import { 
  Table, 
  useReactTable, 
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  GroupingState,
  ColumnDef 
} from '@konradullrich/mp-components';

const [grouping, setGrouping] = useState<GroupingState>(['department']);

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row, getValue }) => (
      <div style={{ paddingLeft: \`\${row.depth * 2}rem\` }}>
        {row.getIsGrouped() ? (
          <button onClick={row.getToggleExpandedHandler()}>
            {row.getIsExpanded() ? '▼' : '▶'} {getValue()} ({row.subRows.length})
          </button>
        ) : getValue()}
      </div>
    ),
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
];

const table = useReactTable({
  data: sampleData,
  columns,
  state: { grouping },
  onGroupingChange: setGrouping,
  getCoreRowModel: getCoreRowModel(),
  getGroupedRowModel: getGroupedRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
});

<Table table={table} />`}</code>
        </pre>
      </Section>
    </Page>
  );
};
