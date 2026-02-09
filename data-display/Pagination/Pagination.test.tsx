import { test, expect } from "@playwright/experimental-ct-react";
import { Pagination } from "./Pagination";
import { createPaginationStore } from "./paginationStore";
import { checkA11y, expectAccessibleRole } from "../../playwright/test-utils";

test.describe("Pagination Component", () => {
  test("should render with basic pagination controls", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);
    await expect(component).toBeVisible();

    // Check pagination info
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 10 of 100 entries");

    // Check navigation buttons
    const firstButton = component.locator(".pagination-button--first");
    const prevButton = component.locator(".pagination-button--prev");
    const nextButton = component.locator(".pagination-button--next");
    const lastButton = component.locator(".pagination-button--last");

    await expect(firstButton).toBeVisible();
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
    await expect(lastButton).toBeVisible();
  });

  test("should disable previous buttons on first page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    const firstButton = component.locator(".pagination-button--first");
    const prevButton = component.locator(".pagination-button--prev");

    await expect(firstButton).toBeDisabled();
    await expect(prevButton).toBeDisabled();
  });

  test("should disable next buttons on last page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);
    store.getState().setPage(10); // Go to last page

    const component = await mount(<Pagination store={store} />);

    const nextButton = component.locator(".pagination-button--next");
    const lastButton = component.locator(".pagination-button--last");

    await expect(nextButton).toBeDisabled();
    await expect(lastButton).toBeDisabled();
  });

  test("should navigate to next page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    const nextButton = component.locator(".pagination-button--next");
    await nextButton.click();

    // Check if page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 11 to 20 of 100 entries");
  });

  test("should navigate to previous page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);
    store.getState().setPage(5);

    const component = await mount(<Pagination store={store} />);

    const prevButton = component.locator(".pagination-button--prev");
    await prevButton.click();

    // Check if page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 31 to 40 of 100 entries");
  });

  test("should navigate to first page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);
    store.getState().setPage(5);

    const component = await mount(<Pagination store={store} />);

    const firstButton = component.locator(".pagination-button--first");
    await firstButton.click();

    // Check if on first page
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 10 of 100 entries");
  });

  test("should navigate to last page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    const lastButton = component.locator(".pagination-button--last");
    await lastButton.click();

    // Check if on last page
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 91 to 100 of 100 entries");
  });

  test("should navigate to specific page by clicking page number", async ({
    mount,
  }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    // Click on page 3
    const page3Button = component.locator('button:has-text("3")');
    await page3Button.click();

    // Check if page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 21 to 30 of 100 entries");
  });

  test("should highlight active page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);
    store.getState().setPage(3);

    const component = await mount(<Pagination store={store} />);

    const page3Button = component.locator('button:has-text("3")').first();
    await expect(page3Button).toHaveClass(/pagination-button--active/);
  });

  test("should show ellipsis for large page ranges", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(200); // 20 pages
    store.getState().setPage(10);

    const component = await mount(<Pagination store={store} />);

    // Should show ellipsis
    const ellipsis = component.locator('button:has-text("...")');
    await expect(ellipsis.first()).toBeVisible();
  });

  test("should always show first and last page", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(200); // 20 pages
    store.getState().setPage(10);

    const component = await mount(<Pagination store={store} />);

    // Check for page 1
    const page1Button = component
      .locator('button:has-text("1")')
      .and(component.locator(".pagination-button"))
      .first();
    await expect(page1Button).toBeVisible();

    // Check for page 20
    const page20Button = component
      .locator('button:has-text("20")')
      .and(component.locator(".pagination-button"))
      .last();
    await expect(page20Button).toBeVisible();
  });

  test("should render page size selector by default", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    const sizeSelector = component.locator(".pagination__size-selector");
    await expect(sizeSelector).toBeVisible();

    const select = component.locator("#pageSize");
    await expect(select).toBeVisible();
  });

  test("should hide page size selector when showSizeSelector is false", async ({
    mount,
  }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(
      <Pagination store={store} showSizeSelector={false} />,
    );

    const sizeSelector = component.locator(".pagination__size-selector");
    await expect(sizeSelector).not.toBeVisible();
  });

  test("should change page size", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    const select = component.locator("#pageSize");
    await select.selectOption("20");

    // Check if items per page changed
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 20 of 100 entries");
  });

  test("should reset to page 1 when changing page size", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);
    store.getState().setPage(5);

    const component = await mount(<Pagination store={store} />);

    // Change page size
    const select = component.locator("#pageSize");
    await select.selectOption("20");

    // Should be back on page 1
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 20 of 100 entries");
  });

  test("should use custom page size options", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(
      <Pagination store={store} pageSizeOptions={[5, 15, 25]} />,
    );

    const select = component.locator("#pageSize");
    const options = select.locator("option");

    await expect(options).toHaveCount(3);
    await expect(options.nth(0)).toHaveText("5");
    await expect(options.nth(1)).toHaveText("15");
    await expect(options.nth(2)).toHaveText("25");
  });

  test("should not render when totalPages <= 1 and showSizeSelector is false", async ({
    mount,
  }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(5); // Only 1 page

    const component = await mount(
      <Pagination store={store} showSizeSelector={false} />,
    );

    await expect(component.locator(".pagination")).not.toBeVisible();
  });

  test("should render when totalPages <= 1 but showSizeSelector is true", async ({
    mount,
  }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(5); // Only 1 page

    const component = await mount(
      <Pagination store={store} showSizeSelector={true} />,
    );

    await expect(component.locator(".pagination")).toBeVisible();
    const sizeSelector = component.locator(".pagination__size-selector");
    await expect(sizeSelector).toBeVisible();
  });

  test("should handle edge case with 0 items", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(0);

    const component = await mount(<Pagination store={store} />);

    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 1 to 0 of 0 entries");
  });

  test("should apply custom className", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(
      <Pagination store={store} className="custom-pagination" />,
    );

    await expect(component).toHaveClass(/custom-pagination/);
  });

  test("should be keyboard navigable", async ({ mount, page }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    await mount(<Pagination store={store} />);

    // Tab to first button
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    // Should be able to activate with Enter
    const firstButton = page.locator(".pagination-button--first");
    await expect(firstButton).toBeFocused();
  });

  test("should have correct ARIA attributes", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

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
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    await mount(<Pagination store={store} />);
    await checkA11y(page);
  });

  test("should handle rapid navigation clicks", async ({ mount }) => {
    const store = createPaginationStore(10);
    store.getState().setTotalItems(100);

    const component = await mount(<Pagination store={store} />);

    const nextButton = component.locator(".pagination-button--next");

    // Click next multiple times rapidly
    await nextButton.click();
    await nextButton.click();
    await nextButton.click();

    // Should be on page 4
    const info = component.locator(".pagination__info");
    await expect(info).toContainText("Showing 31 to 40 of 100 entries");
  });
});
