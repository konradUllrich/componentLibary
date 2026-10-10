import React from 'react';
import { Table, Badge, Text } from '@mp-ku/mp-components';

/*
 * Table renders a TanStack Table instance. `useReactTable` / `getCoreRowModel`
 * are NOT re-exported from the package root (only from data-display/Table), so
 * this preview builds a minimal read-only instance with the same shape Table
 * reads (getHeaderGroups + getRowModel). In an app, pass `useReactTable(...)`.
 */
type Col<T> = {
  id: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  width?: string;
  sorted?: false | 'asc' | 'desc';
  sortable?: boolean;
};

function buildTable<T>(cols: Col<T>[], data: T[]) {
  const columns = cols.map((c) => ({
    id: c.id,
    getIsSorted: () => c.sorted ?? false,
    getCanSort: () => !!c.sortable,
    getToggleSortingHandler: () => () => undefined,
    getSize: () => 'auto',
    columnDef: { header: c.header, meta: { width: c.width } },
  }));
  return {
    getHeaderGroups: () => [
      {
        id: 'header',
        headers: columns.map((column, index) => ({
          id: column.id,
          index,
          isPlaceholder: false,
          column,
          getSize: () => 'auto',
          getContext: () => ({}),
        })),
      },
    ],
    getRowModel: () => ({
      rows: data.map((row, r) => ({
        id: String(r),
        getVisibleCells: () =>
          cols.map((c, i) => ({
            id: `${r}_${c.id}`,
            column: { ...columns[i], columnDef: { cell: c.cell(row), meta: { width: c.width } } },
            getContext: () => ({}),
          })),
      })),
    }),
  } as unknown as React.ComponentProps<typeof Table>['table'];
}

interface Project {
  name: string;
  owner: string;
  status: 'Active' | 'At risk' | 'Done' | 'Planned';
  due: string;
}

const projects: Project[] = [
  { name: 'Website relaunch', owner: 'Anna Keller', status: 'Active', due: 'Nov 14, 2026' },
  { name: 'CRM migration', owner: 'Jonas Weber', status: 'At risk', due: 'Oct 30, 2026' },
  { name: 'Mobile app v2', owner: 'Lea Fischer', status: 'Planned', due: 'Jan 22, 2027' },
  { name: 'Annual report', owner: 'Tom Becker', status: 'Done', due: 'Sep 05, 2026' },
];

const statusVariant = {
  Active: 'info',
  'At risk': 'warning',
  Done: 'success',
  Planned: 'default',
} as const;

const projectCols = (sorted?: Partial<Record<string, 'asc' | 'desc'>>): Col<Project>[] => [
  { id: 'name', header: 'Project', cell: (p) => <Text weight="medium">{p.name}</Text>, sortable: !!sorted, sorted: sorted?.name ?? false },
  { id: 'owner', header: 'Owner', cell: (p) => p.owner, sortable: !!sorted, sorted: sorted?.owner ?? false },
  {
    id: 'status',
    header: 'Status',
    cell: (p) => (
      <Badge variant={statusVariant[p.status]} appearance="subtle" size="sm">
        {p.status}
      </Badge>
    ),
  },
  { id: 'due', header: 'Due date', cell: (p) => p.due, sortable: !!sorted, sorted: sorted?.due ?? false },
];

export const Basic = () => <Table table={buildTable(projectCols(), projects)} />;

export const SortedColumn = () => (
  <Table
    table={buildTable(
      projectCols({ due: 'asc' }),
      [...projects].sort((a, b) => Date.parse(a.due) - Date.parse(b.due)),
    )}
  />
);

interface Member {
  name: string;
  email: string;
  role: string;
}

export const WithCaption = () => (
  <Table
    caption="Team members"
    table={buildTable<Member>(
      [
        { id: 'name', header: 'Name', cell: (m) => m.name },
        { id: 'email', header: 'Email', cell: (m) => m.email },
        { id: 'role', header: 'Role', cell: (m) => m.role },
      ],
      [
        { name: 'Anna Keller', email: 'anna.keller@example.com', role: 'Admin' },
        { name: 'Jonas Weber', email: 'jonas.weber@example.com', role: 'Editor' },
        { name: 'Lea Fischer', email: 'lea.fischer@example.com', role: 'Viewer' },
      ],
    )}
  />
);
