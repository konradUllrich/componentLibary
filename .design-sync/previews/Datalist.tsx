import React from 'react';
import { Datalist, createColumns, Badge, EmptyState } from '@mp-ku/mp-components';

interface Task {
  id: number;
  title: string;
  assignee: string;
  status: 'Open' | 'In progress' | 'Done' | 'Blocked';
  due: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Draft homepage copy', assignee: 'Anna Keller', status: 'In progress', due: '2026-10-18' },
  { id: 2, title: 'Set up staging server', assignee: 'Jonas Weber', status: 'Done', due: '2026-10-09' },
  { id: 3, title: 'Review data model', assignee: 'Lea Fischer', status: 'Blocked', due: '2026-10-21' },
  { id: 4, title: 'Accessibility audit', assignee: 'Tom Becker', status: 'Open', due: '2026-11-02' },
];

const statusVariant = {
  Open: 'default',
  'In progress': 'info',
  Done: 'success',
  Blocked: 'destructive',
} as const;

const columns = createColumns<Task>([
  { key: 'title', header: 'Task', enableSorting: true },
  { key: 'assignee', header: 'Assignee', enableSorting: true },
  {
    key: 'status',
    header: 'Status',
    enableSorting: false,
    cell: (value) => (
      <Badge variant={statusVariant[value as Task['status']]} appearance="subtle" size="sm">
        {String(value)}
      </Badge>
    ),
  },
  { key: 'due', header: 'Due', enableSorting: true },
]);

export const TableVariant = () => <Datalist data={tasks} columns={columns} caption="Sprint tasks" />;

export const SortedByDueDate = () => (
  <Datalist data={tasks} columns={columns} sorting={[{ id: 'due', desc: false }]} />
);

export const CardVariant = () => (
  <Datalist data={tasks.slice(0, 3)} columns={columns} variant="card" cardColumns={3} />
);

export const Empty = () => (
  <Datalist
    data={[] as Task[]}
    columns={columns}
    emptyState={<EmptyState title="No tasks yet" description="Tasks assigned to this sprint will appear here." />}
  />
);
