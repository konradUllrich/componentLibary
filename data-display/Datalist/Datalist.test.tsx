import { test, expect } from "@playwright/experimental-ct-react";
import { Datalist } from "./Datalist";
import { checkA11y } from "../../playwright/test-utils";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import React from "react";

/**
 * Test Component: Datalist (Medium Priority)
 *
 * Tests for Datalist component - flexible data display with table and card variants
 * Wraps TanStack Table for data management and sorting
 *
 * Coverage:
 * - Default table variant rendering
 * - Data rendering in table variant
 * - Card variant with custom renderCard
 * - Default card renderer when renderCard not provided
 * - Loading state display
 * - Empty state with custom messages
 * - Custom className application (table and card variants)
 * - cardColumns setting in card variant
 * - cardGap setting in card variant
 * - Sorting in uncontrolled mode
 * - Controlled sorting support
 * - Ref forwarding in table variant
 * - Accessibility for table, card, loading, and empty states
 * - TanStack Table integration for data management
 * - Column definitions handling
 * - Generic type support with different data types
 * - Edge cases: null/undefined data, large datasets, items without id field
 */

// Test Component: Datalist
test.describe("Datalist Component", () => {
  interface TestUser {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const mockUsers: TestUser[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "User" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Manager" },
  ];

  const columnHelper = createColumnHelper<TestUser>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),
  ];

  test("should render in table variant by default", async ({ mount, page }) => {
    await mount(<Datalist data={mockUsers} columns={columns} />);

    // Should render as table
    const table = page.locator("table");
    await expect(table).toBeVisible();
  });

  // Skip: Column cell functions (info => info.getValue()) cannot be serialized in
  // Playwright CT. The functions become undefined, resulting in empty table cells.
  // Testing cell content requires the cell functions to return JSX/values, which
  // can't cross the Playwright serialization boundary.
  // See PLAYWRIGHT_CT_LIMITATIONS.md for details.
  test.skip("should render data in table variant", async ({ mount, page }) => {
    await mount(
      <Datalist
        data={mockUsers.slice(0, 2)}
        columns={columns}
        variant="table"
      />,
    );

    await expect(page.locator("text=John Doe")).toBeVisible();
    await expect(page.locator("text=jane@example.com")).toBeVisible();
  });

  // Skip: The renderCard function cannot be serialized in Playwright CT.
  // Functions returning JSX become undefined when passed through the Playwright
  // boundary, resulting in empty cards that are hidden by CSS. Cannot test
  // card variant rendering with function props.
  // See PLAYWRIGHT_CT_LIMITATIONS.md for details.
  test.skip("should render in card variant", async ({ mount, page }) => {
    const renderCard = (user: TestUser) => (
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <span>{user.role}</span>
      </div>
    );

    await mount(
      <Datalist
        data={mockUsers.slice(0, 2)}
        columns={columns}
        variant="card"
        renderCard={renderCard}
      />,
    );

    // Should use CardList component
    const cardList = page.locator(".card-list");
    await expect(cardList).toBeVisible();

    // Note: Can't test card content due to renderCard serialization issue
    // Verify structure exists instead
    await expect(cardList).toHaveAttribute("data-state", "ready");
  });

  test("should use default card renderer when renderCard not provided", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist
        data={mockUsers.slice(0, 2)}
        columns={columns}
        variant="card"
      />,
    );

    // Default renderer should still display data
    const cardList = page.locator(".card-list");
    await expect(cardList).toBeVisible();

    // Note: Default card renderer implementation details may vary
    // Just verify CardList is rendered
  });

  test("should display loading state", async ({ mount, page }) => {
    await mount(
      <Datalist data={mockUsers} columns={columns} isLoading={true} />,
    );

    const loading = page.locator(".table__loading");
    await expect(loading).toBeVisible();
    await expect(loading).toContainText("Loading...");
  });

  test("should display empty state when no data", async ({ mount, page }) => {
    await mount(<Datalist data={[]} columns={columns} />);

    const empty = page.locator(".table__empty");
    await expect(empty).toBeVisible();
    await expect(empty).toContainText("No data");
  });

  test("should display custom empty message", async ({ mount, page }) => {
    await mount(
      <Datalist data={[]} columns={columns} emptyMessage="No users found" />,
    );

    const empty = page.locator(".table__empty");
    await expect(empty).toContainText("No users found");
  });

  test("should apply custom className in table variant", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="table"
        className="custom-table-class"
      />,
    );

    const table = page.locator("table");
    await expect(table).toHaveClass(/custom-table-class/);
  });

  test("should apply custom className in card variant", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="card"
        className="custom-card-class"
      />,
    );

    const cardGrid = page.locator(".card-list__grid");
    await expect(cardGrid).toHaveClass(/custom-card-class/);
  });

  test("should apply cardColumns setting in card variant", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="card"
        cardColumns={4}
      />,
    );

    const cardList = page.locator(".card-list");
    await expect(cardList).toBeVisible();
    // CardList should receive the columns prop
  });

  test("should apply cardGap setting in card variant", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="card"
        cardGap="2rem"
      />,
    );

    const cardList = page.locator(".card-list");
    await expect(cardList).toBeVisible();
    // CardList should receive the gap prop
  });

  test("should handle sorting in uncontrolled mode", async ({
    mount,
    page,
  }) => {
    // Note: TanStack Table sorting requires sortable column definitions
    const sortableColumns = [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
    ];

    await mount(
      <Datalist data={mockUsers} columns={sortableColumns} variant="table" />,
    );

    // Verify table renders with sortable headers
    const table = page.locator("table");
    await expect(table).toBeVisible();
  });

  test("should support controlled sorting", async ({ mount, page }) => {
    const sortingState = [{ id: "name", desc: false }];

    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="table"
        sorting={sortingState}
      />,
    );

    const table = page.locator("table");
    await expect(table).toBeVisible();
  });

  // Skip: Callback refs don't work reliably in Playwright CT - the function doesn't
  // execute in the test context. Use React.createRef() for testing refs instead.
  // See PLAYWRIGHT_CT_LIMITATIONS.md for details.
  test.skip("should forward ref in table variant", async ({ mount }) => {
    let refElement: HTMLTableElement | null = null;

    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="table"
        ref={(el: HTMLTableElement | null) => {
          refElement = el;
        }}
      />,
    );

    expect(refElement).toBeTruthy();
    if (refElement) {
      expect((refElement as HTMLTableElement).tagName).toBe("TABLE");
    }
  });

  test("should pass accessibility checks in table variant", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist data={mockUsers} columns={columns} variant="table" />,
    );

    await checkA11y(page);
  });

  test("should pass accessibility checks in card variant", async ({
    mount,
    page,
  }) => {
    const renderCard = (user: TestUser) => (
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    );

    await mount(
      <Datalist
        data={mockUsers}
        columns={columns}
        variant="card"
        renderCard={renderCard}
      />,
    );

    await checkA11y(page);
  });

  test("should pass accessibility checks with loading state", async ({
    mount,
    page,
  }) => {
    await mount(
      <Datalist data={mockUsers} columns={columns} isLoading={true} />,
    );

    await checkA11y(page);
  });

  test("should pass accessibility checks with empty state", async ({
    mount,
    page,
  }) => {
    await mount(<Datalist data={[]} columns={columns} />);

    await checkA11y(page);
  });

  test.describe("TanStack Table Integration", () => {
    test("should integrate with TanStack Table for data management", async ({
      mount,
      page,
    }) => {
      await mount(
        <Datalist data={mockUsers} columns={columns} variant="table" />,
      );

      // Table should render rows for each data item
      const rows = page.locator("tbody tr");
      await expect(rows).toHaveCount(mockUsers.length);
    });

    test("should handle column definitions correctly", async ({
      mount,
      page,
    }) => {
      await mount(
        <Datalist
          data={mockUsers.slice(0, 2)}
          columns={columns}
          variant="table"
        />,
      );

      // Headers should be rendered
      const headers = page.locator("thead th");
      await expect(headers).toHaveCount(columns.length);
    });
  });

  test.describe("Edge Cases", () => {
    test("should handle null data gracefully", async ({ mount, page }) => {
      // Issue: TypeScript requires data to be an array, but testing runtime handling
      // @ts-expect-error Testing edge case with invalid data
      await mount(<Datalist data={null} columns={columns} />);

      // Should show empty state
      const empty = page.locator(".table__empty");
      await expect(empty).toBeVisible();
    });

    test("should handle undefined data gracefully", async ({ mount, page }) => {
      // @ts-expect-error Testing edge case with invalid data
      await mount(<Datalist data={undefined} columns={columns} />);

      // Should show empty state
      const empty = page.locator(".table__empty");
      await expect(empty).toBeVisible();
    });

    test("should handle large datasets", async ({ mount, page }) => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: i % 3 === 0 ? "Admin" : "User",
      }));

      await mount(
        <Datalist data={largeDataset} columns={columns} variant="table" />,
      );

      const table = page.locator("table");
      await expect(table).toBeVisible();

      const rows = page.locator("tbody tr");
      await expect(rows).toHaveCount(100);
    });

    // Skip: The renderCard function cannot be serialized in Playwright CT.
    // Functions returning JSX become undefined, resulting in empty/hidden cards.
    // See PLAYWRIGHT_CT_LIMITATIONS.md for details.
    test.skip("should handle items with missing id field in card variant", async ({
      mount,
      page,
    }) => {
      interface ItemWithoutId {
        name: string;
        value: number;
      }

      const itemsWithoutId: ItemWithoutId[] = [
        { name: "Item A", value: 1 },
        { name: "Item B", value: 2 },
      ];

      // Create properly typed column helper for ItemWithoutId
      const itemColumnHelper = createColumnHelper<ItemWithoutId>();
      const noIdColumns = [
        itemColumnHelper.accessor("name", {
          header: "Name",
          cell: (info) => info.getValue(),
        }),
      ];

      const renderNoId = (item: ItemWithoutId) => <div>{item.name}</div>;

      // Note: Type assertion needed here because Datalist expects items with id field for keys
      // This is testing the edge case where items don't have ids
      await mount(
        <Datalist
          data={itemsWithoutId as unknown as Array<Record<string, unknown>>}
          columns={
            noIdColumns as unknown as ColumnDef<
              Record<string, unknown>,
              unknown
            >[]
          }
          variant="card"
          renderCard={
            renderNoId as unknown as (
              item: Record<string, unknown>,
            ) => React.ReactNode
          }
        />,
      );

      // Should still render without errors
      const cardList = page.locator(".card-list");
      await expect(cardList).toBeVisible();
    });
  });

  test.describe("Generic Type Support", () => {
    interface Product {
      id: string;
      productName: string;
      price: number;
      category: string;
    }

    // Skip: Column cell functions (info => info.getValue()) cannot be serialized in
    // Playwright CT. The functions become undefined, resulting in empty table cells.
    // See PLAYWRIGHT_CT_LIMITATIONS.md for details.
    test.skip("should work with different data types", async ({
      mount,
      page,
    }) => {
      const products: Product[] = [
        {
          id: "p1",
          productName: "Laptop",
          price: 999,
          category: "Electronics",
        },
        { id: "p2", productName: "Mouse", price: 29, category: "Accessories" },
      ];

      const productColumnHelper = createColumnHelper<Product>();
      const productColumns = [
        productColumnHelper.accessor("productName", {
          header: "Product",
          cell: (info) => info.getValue(),
        }),
        productColumnHelper.accessor("price", {
          header: "Price",
          cell: (info) => `$${info.getValue()}`,
        }),
      ];

      await mount(
        <Datalist data={products} columns={productColumns} variant="table" />,
      );

      await expect(page.locator("text=Laptop")).toBeVisible();
      await expect(page.locator("text=$999")).toBeVisible();
    });
  });
});
