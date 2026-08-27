import React from "react";
import { test, expect } from "../../playwright/coverage-fixtures";
import { checkA11y } from "../../playwright/test-utils";
import { TestTable } from "./Table.test-components";

test.describe("Table Component", () => {
  test("should render headers and rows for provided data", async ({
    mount,
    page,
  }) => {
    await mount(<TestTable />);

    const headers = page.locator("thead th");
    await expect(headers).toHaveCount(2);
    await expect(headers.nth(0)).toContainText("Name");
    await expect(headers.nth(1)).toContainText("Email");

    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0)).toContainText("Alice");
    await expect(rows.nth(0)).toContainText("alice@example.com");
    await expect(rows.nth(1)).toContainText("Bob");
  });

  test("should render semantic table structure", async ({ mount, page }) => {
    await mount(<TestTable />);

    await expect(page.locator("table")).toBeVisible();
    await expect(page.locator("thead")).toBeVisible();
    await expect(page.locator("tbody")).toBeVisible();
  });

  test("should render an empty tbody when there is no data", async ({
    mount,
    page,
  }) => {
    await mount(<TestTable data={[]} />);

    await expect(page.locator("thead th")).toHaveCount(2);
    await expect(page.locator("tbody tr")).toHaveCount(0);
  });

  test("should render the caption when provided", async ({ mount, page }) => {
    await mount(<TestTable caption="People" />);

    const caption = page.locator("caption");
    await expect(caption).toBeVisible();
    await expect(caption).toContainText("People");
  });

  test("should apply custom className", async ({ mount, page }) => {
    await mount(<TestTable className="custom-table-class" />);

    await expect(page.locator("table")).toHaveClass(/custom-table-class/);
  });

  test("should mark sortable headers as buttons with aria-sort", async ({
    mount,
    page,
  }) => {
    await mount(<TestTable />);

    const nameHeader = page.locator("thead th").nth(0);
    await expect(nameHeader).toHaveAttribute("aria-sort", "none");
    await expect(nameHeader.locator("button")).toBeVisible();

    const emailHeader = page.locator("thead th").nth(1);
    await expect(emailHeader).not.toHaveAttribute("aria-sort");
    await expect(emailHeader.locator("button")).toHaveCount(0);
  });

  test("should sort on header click and toggle aria-sort/indicator", async ({
    mount,
    page,
  }) => {
    await mount(<TestTable />);

    const nameHeader = page.locator("thead th").nth(0);
    const sortButton = nameHeader.locator("button");

    await sortButton.click();
    await expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    await expect(nameHeader.locator(".mp-table__sort-indicator")).toBeVisible();

    await sortButton.click();
    await expect(nameHeader).toHaveAttribute("aria-sort", "descending");

    const rows = page.locator("tbody tr");
    await expect(rows.nth(0)).toContainText("Bob");
  });

  test("should sort via keyboard activation of the header button", async ({
    mount,
    page,
  }) => {
    await mount(<TestTable />);

    const nameHeader = page.locator("thead th").nth(0);
    const sortButton = nameHeader.locator("button");

    await sortButton.focus();
    await page.keyboard.press("Enter");

    await expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
  });

  // Skip: refs don't survive the Playwright CT prop-serialization boundary
  // (ref.current stays null even with React.createRef()). See the similar
  // skipped ref test in Datalist.test.tsx / PLAYWRIGHT_CT_LIMITATIONS.md.
  test.skip("should forward ref to the table element", async ({ mount }) => {
    const ref = React.createRef<HTMLTableElement>();
    await mount(<TestTable ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe("TABLE");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<TestTable caption="People" />);

    await checkA11y(page);
  });

  test("should pass accessibility checks when empty", async ({
    mount,
    page,
  }) => {
    await mount(<TestTable data={[]} caption="People" />);

    await checkA11y(page);
  });
});
