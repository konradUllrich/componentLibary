import React from "react";
import { test, expect } from "../../playwright/coverage-fixtures";
import { checkA11y } from "../../playwright/test-utils";
import { TestTableHeader } from "./TableHeader.test-components";

test.describe("TableHeader Component", () => {
  test("should render a header cell per column", async ({ mount, page }) => {
    await mount(<TestTableHeader />);

    const headers = page.locator("thead th");
    await expect(headers).toHaveCount(2);
    await expect(headers.nth(0)).toContainText("Name");
    await expect(headers.nth(1)).toContainText("Email");
  });

  test("should render semantic thead/tr structure", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableHeader />);

    const thead = page.locator("thead");
    await expect(thead).toBeVisible();
    await expect(thead).toHaveClass(/mp-table__head/);

    const headerRow = thead.locator("tr");
    await expect(headerRow).toHaveClass(/mp-table__row/);
    await expect(headerRow).toHaveClass(/mp-table__row--header/);
  });

  test("should apply the header cell class to each th", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableHeader />);

    const headers = page.locator("thead th");
    await expect(headers.nth(0)).toHaveClass(/mp-table__cell/);
    await expect(headers.nth(0)).toHaveClass(/mp-table__cell--header/);
  });

  test("should apply custom className", async ({ mount, page }) => {
    await mount(<TestTableHeader className="custom-header-class" />);

    await expect(page.locator("thead")).toHaveClass(/custom-header-class/);
  });

  test("should spread additional props onto the thead", async ({
    mount,
    page,
  }) => {
    await mount(
      <TestTableHeader data-testid="header-testid" aria-label="Columns" />,
    );

    const thead = page.locator("thead");
    await expect(thead).toHaveAttribute("data-testid", "header-testid");
    await expect(thead).toHaveAttribute("aria-label", "Columns");
  });

  test("should render an empty header row when there are no columns worth of data", async ({
    mount,
    page,
  }) => {
    // headerGroup still reflects the configured columns regardless of data,
    // so this asserts headers render independently of row data.
    await mount(<TestTableHeader data={[]} />);

    await expect(page.locator("thead th")).toHaveCount(2);
  });

  // Skip: refs don't survive the Playwright CT prop-serialization boundary
  // (ref.current stays null even with React.createRef()). See the similar
  // skipped ref test in Table.test.tsx / PLAYWRIGHT_CT_LIMITATIONS.md.
  test.skip("should forward ref to the thead element", async ({ mount }) => {
    const ref = { current: null } as React.RefObject<HTMLTableSectionElement | null>;
    await mount(<TestTableHeader ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe("THEAD");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<TestTableHeader />);

    await checkA11y(page);
  });
});
