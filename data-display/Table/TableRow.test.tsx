import React from "react";
import { test, expect } from "../../playwright/coverage-fixtures";
import { checkA11y } from "../../playwright/test-utils";
import { TestTableRow } from "./TableRow.test-components";

test.describe("TableRow Component", () => {
  test("should render a cell per visible column", async ({ mount, page }) => {
    await mount(<TestTableRow />);

    const cells = page.locator("tbody tr td");
    await expect(cells).toHaveCount(2);
    await expect(cells.nth(0)).toContainText("Alice");
    await expect(cells.nth(1)).toContainText("alice@example.com");
  });

  test("should render the row for the requested data index", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableRow rowIndex={1} />);

    const cells = page.locator("tbody tr td");
    await expect(cells.nth(0)).toContainText("Bob");
  });

  test("should apply the base row class", async ({ mount, page }) => {
    await mount(<TestTableRow />);

    await expect(page.locator("tbody tr")).toHaveClass(/mp-table__row/);
  });

  test("should not apply the selected modifier by default", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableRow />);

    await expect(page.locator("tbody tr")).not.toHaveClass(
      /mp-table__row--selected/,
    );
  });

  test("should apply the selected modifier when isSelected is true", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableRow isSelected />);

    await expect(page.locator("tbody tr")).toHaveClass(
      /mp-table__row--selected/,
    );
  });

  test("should apply custom className alongside base classes", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableRow className="custom-row-class" />);

    const row = page.locator("tbody tr");
    await expect(row).toHaveClass(/custom-row-class/);
    await expect(row).toHaveClass(/mp-table__row/);
  });

  test("should spread additional props onto the tr", async ({
    mount,
    page,
  }) => {
    await mount(
      <TestTableRow data-testid="row-testid" aria-label="Person row" />,
    );

    const row = page.locator("tbody tr");
    await expect(row).toHaveAttribute("data-testid", "row-testid");
    await expect(row).toHaveAttribute("aria-label", "Person row");
  });

  test("should render no cells when the row has no visible columns", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableRow noCells />);

    await expect(page.locator("tbody tr")).toBeAttached();
    await expect(page.locator("tbody tr td")).toHaveCount(0);
  });

  // Skip: refs don't survive the Playwright CT prop-serialization boundary
  // (ref.current stays null even with React.createRef()). See the similar
  // skipped ref test in Table.test.tsx / PLAYWRIGHT_CT_LIMITATIONS.md.
  test.skip("should forward ref to the tr element", async ({ mount }) => {
    const ref = { current: null } as React.RefObject<HTMLTableRowElement | null>;
    await mount(<TestTableRow ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe("TR");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<TestTableRow />);

    await checkA11y(page);
  });
});
