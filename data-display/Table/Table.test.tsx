import { test, expect } from '@playwright/experimental-ct-react';
import { Table } from './Table';
import { checkA11y } from '../../playwright/test-utils';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

/**
 * Table Component Tests
 * 
 * Tests the TanStack Table integration component.
 * Validates table rendering, sorting, column management, and accessibility.
 */

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
}

const testData: TestData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

test.describe('Table Component', () => {
  test('should render with basic data', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<BasicTable />);
    
    const tableElement = component.locator('table');
    await expect(tableElement).toBeVisible();
    await expect(tableElement).toHaveClass(/table/);
  });

  test('should render table headers', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<BasicTable />);
    
    const headers = component.locator('th');
    await expect(headers).toHaveCount(3);
    await expect(headers.nth(0)).toContainText('Name');
    await expect(headers.nth(1)).toContainText('Email');
    await expect(headers.nth(2)).toContainText('Age');
  });

  test('should render table rows', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<BasicTable />);
    
    const rows = component.locator('tbody tr');
    await expect(rows).toHaveCount(3);
  });

  test('should render table cells with correct data', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<BasicTable />);
    
    const firstRow = component.locator('tbody tr').nth(0);
    const cells = firstRow.locator('td');
    
    await expect(cells.nth(0)).toContainText('John Doe');
    await expect(cells.nth(1)).toContainText('john@example.com');
    await expect(cells.nth(2)).toContainText('30');
  });

  test('should handle sorting', async ({ mount }) => {
    const SortableTable = () => {
      const [sorting, setSorting] = useState<any[]>([]);

      const table = useReactTable({
        data: testData,
        columns,
        state: {
          sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<SortableTable />);
    
    const nameHeader = component.locator('th').nth(0);
    
    // Click to sort ascending
    await nameHeader.click();
    await expect(nameHeader.locator('.table__sort-indicator')).toContainText('↑');
    
    // Click to sort descending
    await nameHeader.click();
    await expect(nameHeader.locator('.table__sort-indicator')).toContainText('↓');
  });

  test('should apply sortable class to sortable headers', async ({ mount }) => {
    const SortableTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<SortableTable />);
    
    const headers = component.locator('th');
    await expect(headers.nth(0)).toHaveClass(/table__cell--sortable/);
    await expect(headers.nth(1)).toHaveClass(/table__cell--sortable/);
    await expect(headers.nth(2)).toHaveClass(/table__cell--sortable/);
  });

  test('should handle empty data', async ({ mount }) => {
    const EmptyTable = () => {
      const table = useReactTable({
        data: [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<EmptyTable />);
    
    const tableElement = component.locator('table');
    await expect(tableElement).toBeVisible();
    
    const rows = component.locator('tbody tr');
    await expect(rows).toHaveCount(0);
  });

  test('should support custom className', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} className="custom-table" />;
    };

    const component = await mount(<BasicTable />);
    
    const tableElement = component.locator('table');
    await expect(tableElement).toHaveClass(/table/);
    await expect(tableElement).toHaveClass(/custom-table/);
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<BasicTable />);
    
    // Check for thead
    const thead = component.locator('thead');
    await expect(thead).toBeAttached();
    
    // Check for tbody
    const tbody = component.locator('tbody');
    await expect(tbody).toBeAttached();
    
    // Headers should be th elements
    const headers = component.locator('th');
    await expect(headers.first()).toBeAttached();
    
    // Data cells should be td elements
    const cells = component.locator('td');
    await expect(cells.first()).toBeAttached();
  });

  test('should render with custom cell renderers', async ({ mount }) => {
    const customColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => <strong>{info.getValue() as string}</strong>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
    ];

    const CustomTable = () => {
      const table = useReactTable({
        data: testData,
        columns: customColumns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<CustomTable />);
    
    const firstCell = component.locator('tbody tr').nth(0).locator('td').nth(0);
    const strong = firstCell.locator('strong');
    await expect(strong).toBeVisible();
    await expect(strong).toContainText('John Doe');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    await mount(<BasicTable />);
    
    await checkA11y(page);
  });

  test('should maintain sort state across renders', async ({ mount }) => {
    const SortableTable = () => {
      const [sorting, setSorting] = useState<any[]>([{ id: 'name', desc: false }]);

      const table = useReactTable({
        data: testData,
        columns,
        state: {
          sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<SortableTable />);
    
    const nameHeader = component.locator('th').nth(0);
    const sortIndicator = nameHeader.locator('.table__sort-indicator');
    
    // Should start with ascending sort
    await expect(sortIndicator).toContainText('↑');
  });

  test('should apply correct CSS classes to elements', async ({ mount }) => {
    const BasicTable = () => {
      const table = useReactTable({
        data: testData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

      return <Table table={table} />;
    };

    const component = await mount(<BasicTable />);
    
    const thead = component.locator('thead');
    await expect(thead).toHaveClass(/table__head/);
    
    const tbody = component.locator('tbody');
    await expect(tbody).toHaveClass(/table__body/);
    
    const headerRow = component.locator('thead tr').first();
    await expect(headerRow).toHaveClass(/table__row--header/);
    
    const bodyRow = component.locator('tbody tr').first();
    await expect(bodyRow).toHaveClass(/table__row/);
  });

  // Note: TanStack Table provides extensive functionality including filtering,
  // pagination, and column resizing. These features are controlled by the table
  // instance passed to the component. The Table component itself is a presentational
  // wrapper that renders the TanStack Table data structure.
  // More complex table features should be tested at the integration level with
  // complete table configurations.
});
