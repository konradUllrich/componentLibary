import React from "react";
import { test, expect } from "../../playwright/coverage-fixtures";
import { checkA11y } from "../../playwright/test-utils";
import { TestTableCell } from "./TableCell.test-components";

test.describe("TableCell Component", () => {
  test("should render the cell's flex-rendered content", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableCell />);

    await expect(page.locator("td")).toContainText("Alice");
  });

  test("should render custom cell renderers via flexRender", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableCell cellIndex={1} />);

    const link = page.locator("td a");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "mailto:alice@example.com");
  });

  test("should apply the base cell class", async ({ mount, page }) => {
    await mount(<TestTableCell />);

    await expect(page.locator("td")).toHaveClass(/mp-table__cell/);
  });

  test("should default to left alignment", async ({ mount, page }) => {
    await mount(<TestTableCell />);

    await expect(page.locator("td")).toHaveClass(
      /mp-table__cell--align-left/,
    );
  });

  test.describe("Alignment variants", () => {
    test("should apply center alignment", async ({ mount, page }) => {
      await mount(<TestTableCell align="center" />);

      await expect(page.locator("td")).toHaveClass(
        /mp-table__cell--align-center/,
      );
    });

    test("should apply right alignment", async ({ mount, page }) => {
      await mount(<TestTableCell align="right" />);

      await expect(page.locator("td")).toHaveClass(
        /mp-table__cell--align-right/,
      );
    });
  });

  test("should apply custom className alongside base classes", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableCell className="custom-cell-class" />);

    const cell = page.locator("td");
    await expect(cell).toHaveClass(/custom-cell-class/);
    await expect(cell).toHaveClass(/mp-table__cell/);
  });

  test("should spread additional props onto the td", async ({
    mount,
    page,
  }) => {
    await mount(
      <TestTableCell data-testid="cell-testid" aria-label="Name cell" />,
    );

    const cell = page.locator("td");
    await expect(cell).toHaveAttribute("data-testid", "cell-testid");
    await expect(cell).toHaveAttribute("aria-label", "Name cell");
  });

  test("should render the requested row and column", async ({
    mount,
    page,
  }) => {
    await mount(<TestTableCell rowIndex={1} cellIndex={0} />);

    await expect(page.locator("td")).toContainText("Bob");
  });

  // Skip: refs don't survive the Playwright CT prop-serialization boundary
  // (ref.current stays null even with React.createRef()). See the similar
  // skipped ref test in Table.test.tsx / PLAYWRIGHT_CT_LIMITATIONS.md.
  test.skip("should forward ref to the td element", async ({ mount }) => {
    const ref = { current: null } as React.RefObject<HTMLTableCellElement | null>;
    await mount(<TestTableCell ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName).toBe("TD");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<TestTableCell />);

    await checkA11y(page);
  });
});
