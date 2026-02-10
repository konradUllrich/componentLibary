import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import { PaginationTestWrapper } from "./Pagination.stories";
import { checkA11y } from "../../playwright/test-utils";

test.describe("Pagination Component", () => {
  test("should render with basic pagination controls", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );
    // The component root IS the .pagination element
    await expect(component).toBeVisible();

    // Check pagination info
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 10 of 100 entries");

    // Check navigation buttons exist
    await expect(component.locator(".pagination-button--first")).toBeVisible();
    await expect(component.locator(".pagination-button--prev")).toBeVisible();
    await expect(component.locator(".pagination-button--next")).toBeVisible();
    await expect(component.locator(".pagination-button--last")).toBeVisible();
  });

  test("should disable previous buttons on first page", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    const firstButton = component.locator(".pagination-button--first");
    const prevButton = component.locator(".pagination-button--prev");

    await expect(firstButton).toBeDisabled();
    await expect(prevButton).toBeDisabled();
  });

  test("should disable next buttons on last page", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} currentPage={10} />,
    );

    const nextButton = component.locator(".pagination-button--next");
    const lastButton = component.locator(".pagination-button--last");

    await expect(nextButton).toBeDisabled();
    await expect(lastButton).toBeDisabled();
  });

  test("should navigate to next page", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    const nextButton = component.locator(".pagination-button--next");
    await nextButton.click();

    // Check if page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 11 to 20 of 100 entries");
  });

  test("should navigate to specific page", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    // Click on page 2 (which is visible on first page)
    const page2Button = component
      .locator(".pagination-button")
      .filter({ hasText: /^2$/ });
    await page2Button.click();

    // Check if page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 11 to 20 of 100 entries");
  });

  test("should highlight active page", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} currentPage={3} />,
    );

    const page3Button = component
      .locator(".pagination-button")
      .filter({ hasText: /^3$/ });
    await expect(page3Button).toHaveClass(/pagination-button--active/);
  });

  test("should show ellipsis for large page ranges", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={200} pageSize={10} currentPage={10} />,
    );

    // Should show ellipsis
    const ellipsisButtons = component
      .locator(".pagination-button")
      .filter({ hasText: "..." });
    await expect(ellipsisButtons.first()).toBeVisible();
  });

  test("should always show first and last page", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={200} pageSize={10} currentPage={10} />,
    );

    // Check for page 1
    const page1Button = component
      .locator(".pagination-button")
      .filter({ hasText: /^1$/ })
      .first();
    await expect(page1Button).toBeVisible();

    // Check for page 20
    const page20Button = component
      .locator(".pagination-button")
      .filter({ hasText: /^20$/ })
      .first();
    await expect(page20Button).toBeVisible();
  });

  test("should render page size selector by default", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    const sizeSelector = component.locator(".pagination__size-selector");
    await expect(sizeSelector).toBeVisible();

    const select = component.locator("#pageSize");
    await expect(select).toBeVisible();
  });

  test("should hide page size selector when showSizeSelector is false", async ({
    mount,
  }) => {
    const component = await mount(
      <PaginationTestWrapper
        totalItems={100}
        pageSize={10}
        showSizeSelector={false}
      />,
    );

    const sizeSelector = component.locator(".pagination__size-selector");
    await expect(sizeSelector).not.toBeVisible();
  });

  test("should change page size", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    const select = component.locator("#pageSize");
    await select.selectOption("20");

    // Check if items per page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 20 of 100 entries");
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper
        totalItems={100}
        pageSize={10}
        className="custom-pagination"
      />,
    );

    // The component root IS the .pagination element
    await expect(component).toHaveClass(/custom-pagination/);
  });

  test("should have correct ARIA attributes", async ({ mount }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    const firstButton = component.locator(".pagination-button--first");
    await expect(firstButton).toHaveAttribute("title", "First page");

    const prevButton = component.locator(".pagination-button--prev");
    await expect(prevButton).toHaveAttribute("title", "Previous page");

    const nextButton = component.locator(".pagination-button--next");
    await expect(nextButton).toHaveAttribute("title", "Next page");

    const lastButton = component.locator(".pagination-button--last");
    await expect(lastButton).toHaveAttribute("title", "Last page");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<PaginationTestWrapper totalItems={100} pageSize={10} />);
    await checkA11y(page);
  });
});
