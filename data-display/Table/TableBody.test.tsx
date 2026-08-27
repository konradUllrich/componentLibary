import React from "react";
import { test, expect } from "../../playwright/coverage-fixtures";
import { checkA11y } from "../../playwright/test-utils";
import { TestTableBody } from "./TableBody.test-components";

test.describe("TableBody Component", () => {
  test("should render a row per data item", async ({ mount, page }) => {
    await mount(<TestTableBody />);

    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText("Alice");
    await expect(rows.nth(0)).toContainText("alice@example.com");
    await expect(rows.nth(1)).toContainText("Bob");
  });

  test("should render semantic tbody structure", async ({ mount, page }) => {
    await mount(<TestTableBody />);

    const tbody = page.locator("tbody");
    await expect(tbody).toBeVisible();
    await expect(tbody).toHaveClass(/mp-table__body/);

    const row = tbody.locator("tr").first();
    await expect(row).toHaveClass(/mp-table__row/);

    const cell = row.locator("td").first();
    await expect(cell).toHaveClass(/mp-table__cell/);
  });

  test("should render an empty tbody when there is no data", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableBody data={[]} />);

    await expect(page.locator("tbody")).toBeAttached();
    await expect(page.locator("tbody tr")).toHaveCount(0);
  });

  test("should apply custom className", async ({ mount, page }) => {
    await mount(<TestTableBody className="custom-body-class" />);

    await expect(page.locator("tbody")).toHaveClass(/custom-body-class/);
  });

  test("should spread additional props onto the tbody", async ({
    mount,
    page,
  }) => {
    await mount(
      <TestTableBody data-testid="body-testid" aria-label="Rows" />,
    );

    const tbody = page.locator("tbody");
    await expect(tbody).toHaveAttribute("data-testid", "body-testid");
    await expect(tbody).toHaveAttribute("aria-label", "Rows");
  });

  // Skip: refs don't survive the Playwright CT prop-serialization boundary
  // (ref.current stays null even with React.createRef()). See the similar
  // skipped ref test in Table.test.tsx / PLAYWRIGHT_CT_LIMITATIONS.md.
  test.skip("should forward ref to the tbody element", async ({ mount }) => {
    const ref = { current: null } as React.RefObject<HTMLTableSectionElement | null>;
    await mount(<TestTableBody ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe("TBODY");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<TestTableBody />);

    await checkA11y(page);
  });

  test("should pass accessibility checks when empty", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableBody data={[]} />);

    await checkA11y(page);
  });
});
