import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, Text } from '../../data-display';

export const TablePage: React.FC = () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User' },
  ];

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
          Simple table with header and body
        </Text>
        <div className="component-page__demo">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell as="th">ID</TableCell>
                <TableCell as="th">Name</TableCell>
                <TableCell as="th">Email</TableCell>
                <TableCell as="th">Role</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@konradullrich/mp-components';

<Table>
  <TableHeader>
    <TableRow>
      <TableCell as="th">Name</TableCell>
      <TableCell as="th">Email</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</code>
        </pre>
      </section>
    </div>
  );
};
