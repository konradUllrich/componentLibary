import React from "react";
import { Datalist } from "./Datalist";
import { createColumns } from "./createColumns";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Datalist, createColumns } from '@mp-ku/mp-components';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

const employees: Employee[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing' },
];

const columns = createColumns<Employee>([
  { key: 'name',       header: 'Name' },
  { key: 'email',      header: 'Email' },
  { key: 'department', header: 'Department', enableSorting: true },
]);

<Datalist data={employees} columns={columns} />`;

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

const employees: Employee[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", department: "Engineering" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", department: "Marketing" },
  { id: 3, name: "Carol White", email: "carol@example.com", department: "Engineering" },
];

const columns = createColumns<Employee>([
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "department", header: "Department", enableSorting: true },
]);

/** Live render of {@link usageSource}, used on the Datalist demo page. */
export const UsageExample = () => <Datalist data={employees} columns={columns} />;
