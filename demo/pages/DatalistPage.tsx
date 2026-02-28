import React, { useState } from "react";
import { Datalist, createColumns } from "../../data-display/Datalist";
import { Button } from "../../common";
import { Page, Section } from "../../layout";
import { Text } from "../../common";

// ── Data models ──────────────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  address: {
    city: string;
    country: string;
  };
}

const employees: Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    department: "Engineering",
    address: { city: "Berlin", country: "Germany" },
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    department: "Marketing",
    address: { city: "Paris", country: "France" },
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    department: "Engineering",
    address: { city: "London", country: "UK" },
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    department: "Sales",
    address: { city: "Madrid", country: "Spain" },
  },
];

// ── Demo page ─────────────────────────────────────────────────────────────────

export const DatalistPage: React.FC = () => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  // 1. Basic columns (top-level keys)
  const basicColumns = createColumns<Employee>([
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "department", header: "Department", enableSorting: true },
  ]);

  // 2. Nested access via accessorFn
  const nestedColumns = createColumns<Employee>([
    { key: "name", header: "Name" },
    { key: "department", header: "Department" },
    { id: "city", header: "City", accessorFn: (row) => row.address.city },
    {
      id: "country",
      header: "Country",
      accessorFn: (row) => row.address.country,
    },
  ]);

  // 3. Action columns
  const actionColumns = createColumns<Employee>([
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "department", header: "Department" },
    {
      id: "actions",
      header: "Actions",
      size: 160,
      cell: (_value, row) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLastAction(`Edited: ${row.name}`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setLastAction(`Deleted: ${row.name}`)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Datalist & createColumns
        </Text>
        <Text color="secondary">
          Flexible data display with table and card variants. The{" "}
          <code>createColumns</code> helper simplifies column definitions and
          now supports nested object access and action columns.
        </Text>
      </Section>

      {/* ── Basic usage ───────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Usage
        </Text>
        <Text color="secondary" size="sm">
          Use <code>key</code> to map a column to a top-level property.
        </Text>
        <div className="component-page__demo">
          <Datalist data={employees} columns={basicColumns} />
        </div>
        <pre className="code-block">
          <code>{`import { Datalist, createColumns } from '@konradullrich/mp-components';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

const columns = createColumns<Employee>([
  { key: 'name',       header: 'Name' },
  { key: 'email',      header: 'Email' },
  { key: 'department', header: 'Department', enableSorting: true },
]);

<Datalist data={employees} columns={columns} />`}</code>
        </pre>
      </Section>

      {/* ── Nested / deep access ──────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Nested Object Access
        </Text>
        <Text color="secondary" size="sm">
          Use <code>accessorFn</code> together with a unique <code>id</code> to
          read values from nested objects. There is no restriction on nesting
          depth.
        </Text>
        <div className="component-page__demo">
          <Datalist data={employees} columns={nestedColumns} />
        </div>
        <pre className="code-block">
          <code>{`interface Employee {
  id: number;
  name: string;
  address: { city: string; country: string };
}

const columns = createColumns<Employee>([
  { key: 'name',       header: 'Name' },
  { key: 'department', header: 'Department' },
  // accessorFn reads a nested field; id is required when key is omitted
  { id: 'city',    header: 'City',    accessorFn: (row) => row.address.city },
  { id: 'country', header: 'Country', accessorFn: (row) => row.address.country },
]);`}</code>
        </pre>
      </Section>

      {/* ── Action columns ────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Action Columns
        </Text>
        <Text color="secondary" size="sm">
          Omit <code>key</code> and <code>accessorFn</code>, provide an{" "}
          <code>id</code>, and supply a <code>cell</code> renderer to add
          interactive controls per row.
        </Text>
        <div className="component-page__demo">
          {lastAction && (
            <div
              style={{
                marginBottom: "0.75rem",
                padding: "0.5rem 0.75rem",
                background: "var(--color-surface-alt, #f5f5f5)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.875rem",
              }}
            >
              {lastAction}
            </div>
          )}
          <Datalist data={employees} columns={actionColumns} />
        </div>
        <pre className="code-block">
          <code>{`const columns = createColumns<Employee>([
  { key: 'name',  header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    id: 'actions',
    header: 'Actions',
    size: 160,
    cell: (_value, row) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button size="sm" variant="ghost"       onClick={() => onEdit(row)}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row)}>Delete</Button>
      </div>
    ),
  },
]);`}</code>
        </pre>
      </Section>

      {/* ── API reference ─────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          ColumnConfig API
        </Text>
        <pre className="code-block">
          <code>{`interface ColumnConfig<T> {
  /**
   * Top-level property key of the row type.
   * Omit when using accessorFn or for action columns.
   */
  key?: keyof T & string;

  /**
   * Column identifier.
   * Required when key is omitted (accessorFn columns and action columns).
   */
  id?: string;

  /**
   * Function accessor for nested or computed values.
   * Use instead of key for deep object access.
   *
   * @example
   * accessorFn: (row) => row.address.city
   */
  accessorFn?: (row: T) => unknown;

  /** Header label */
  header: string;

  /**
   * Custom cell renderer.
   * For action columns value is undefined – use the row parameter.
   *
   * @example
   * cell: (_value, row) => <button onClick={() => onEdit(row)}>Edit</button>
   */
  cell?: (value: unknown, row: T) => ReactNode;

  /** Enable column sorting */
  enableSorting?: boolean;

  /** Column width in pixels */
  size?: number;
}`}</code>
        </pre>
      </Section>
    </Page>
  );
};
