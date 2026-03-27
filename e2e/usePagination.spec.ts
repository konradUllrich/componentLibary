import { test, expect } from "@playwright/test";

test.describe("usePagination Demo Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");

    // Clear all persisted state so examples start clean
    await page.evaluate(() => {
      sessionStorage.clear();
      localStorage.clear();
    });

    // Navigate to the usePagination page
    await page.getByRole("link", { name: "usePagination" }).first().click();

    await expect(
      page.getByRole("heading", { name: "usePagination", level: 1 }),
    ).toBeVisible();
  });

  // ─── Page structure ────────────────────────────────────────────────────────

  test("should render the page heading and intro text", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "usePagination", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText(/Persists page, page size/i)).toBeVisible();
  });

  test("should render the Quick Start section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Quick Start" }),
    ).toBeVisible();
    await expect(
      page
        .locator("pre")
        .filter({ hasText: /storageKey.*my-table/s })
        .first(),
    ).toBeVisible();
  });

  test("should render all 7 example headings", async ({ page }) => {
    await expect(page.getByText("1. Drop-in usage")).toBeVisible();
    await expect(page.getByText("2. Custom page size options")).toBeVisible();
    await expect(page.getByText("3. Hide size selector")).toBeVisible();
    await expect(page.getByText("4. Dynamic total items")).toBeVisible();
    await expect(page.getByText("5. Two tables, one page")).toBeVisible();
    await expect(page.getByText("6. sessionStorage, no URL")).toBeVisible();
    await expect(
      page.getByText("7. Inside a data-fetching hook"),
    ).toBeVisible();
  });

  // ─── Example 1: Drop-in usage ──────────────────────────────────────────────

  test.describe("Example 1: Drop-in usage", () => {
    test("should render pagination with correct total count", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await expect(panel).toBeVisible();
      await expect(panel.locator(".pagination")).toBeVisible();
      await expect(panel.getByText(/of 97 entries/)).toBeVisible();
    });

    test("should show page navigation controls", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await expect(panel.locator(".pagination__controls")).toBeVisible();
      await expect(panel.locator(".pagination-button--first")).toBeVisible();
      await expect(panel.locator(".pagination-button--prev")).toBeVisible();
      await expect(panel.locator(".pagination-button--next")).toBeVisible();
      await expect(panel.locator(".pagination-button--last")).toBeVisible();
    });

    test("should navigate to the next page", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await expect(panel.getByText(/Showing 1 to 10 of 97/)).toBeVisible();

      await panel.locator(".pagination-button--next").click();

      await expect(panel.getByText(/Showing 11 to 20 of 97/)).toBeVisible();
    });

    test("should disable the prev button on page 1", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await expect(panel.locator(".pagination-button--prev")).toBeDisabled();
      await expect(panel.locator(".pagination-button--first")).toBeDisabled();
    });

    test("should show page size selector", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await expect(panel.locator(".pagination__size-selector")).toBeVisible();
      await expect(panel.locator(".pagination__select")).toBeVisible();
    });

    test("should persist current page after reload", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await panel.locator(".pagination-button--next").click();
      await expect(panel.getByText(/Showing 11 to 20 of 97/)).toBeVisible();

      await page.reload();
      await page.waitForLoadState("networkidle");

      const panelAfter = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "1. Drop-in usage" });

      await expect(
        panelAfter.getByText(/Showing 11 to 20 of 97/),
      ).toBeVisible();
    });
  });

  // ─── Example 2: Custom page size options ──────────────────────────────────

  test.describe("Example 2: Custom page size options", () => {
    test("should render pagination with 100 total items", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "2. Custom page size options" });

      await expect(panel.locator(".pagination")).toBeVisible();
      await expect(panel.getByText(/of 100 entries/)).toBeVisible();
    });

    test("should show custom page size options [5, 10, 25, 50]", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "2. Custom page size options" });

      const select = panel.locator(".pagination__select");
      await expect(select).toBeVisible();

      const options = await select.locator("option").allTextContents();
      expect(options).toEqual(["5", "10", "25", "50"]);
    });

    test("should reset to page 1 when page size changes", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "2. Custom page size options" });

      // Navigate to page 2
      await panel.locator(".pagination-button--next").click();
      await expect(panel.getByText(/Showing 6 to 10 of 100/)).toBeVisible();

      // Change page size
      await panel.locator(".pagination__select").selectOption("25");

      // Should reset to page 1 with new page size
      await expect(panel.getByText(/Showing 1 to 25 of 100/)).toBeVisible();
    });
  });

  // ─── Example 3: Hide size selector ────────────────────────────────────────

  test.describe("Example 3: Hide size selector", () => {
    test("should render pagination without size selector", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "3. Hide size selector" });

      await expect(panel.locator(".pagination")).toBeVisible();
      await expect(panel.getByText(/of 80 entries/)).toBeVisible();
      await expect(
        panel.locator(".pagination__size-selector"),
      ).not.toBeVisible();
    });

    test("should still show navigation controls", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "3. Hide size selector" });

      await expect(panel.locator(".pagination__controls")).toBeVisible();
      await expect(panel.locator(".pagination-button--next")).toBeVisible();
    });
  });

  // ─── Example 4: Dynamic total items ───────────────────────────────────────

  test.describe("Example 4: Dynamic total items", () => {
    test("should start with no pagination (no initial total)", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "4. Dynamic total items" });

      await expect(panel).toBeVisible();
      // No total set initially — pagination should not show controls
      await expect(panel.locator(".pagination__controls")).not.toBeVisible();
    });

    test("should update pagination when clicking 20 items button", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "4. Dynamic total items" });

      await panel.getByRole("button", { name: "20 items" }).click();

      await expect(panel.getByText(/of 20 entries/)).toBeVisible();
      // 20 items / 10 per page = 2 pages — controls should appear
      await expect(panel.locator(".pagination__controls")).toBeVisible();
    });

    test("should update pagination when clicking 50 items button", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "4. Dynamic total items" });

      await panel.getByRole("button", { name: "50 items" }).click();
      await expect(panel.getByText(/of 50 entries/)).toBeVisible();
    });

    test("should update pagination when clicking 100 items button", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "4. Dynamic total items" });

      await panel.getByRole("button", { name: "100 items" }).click();
      await expect(panel.getByText(/of 100 entries/)).toBeVisible();
    });

    test("should update pagination when clicking 200 items button", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "4. Dynamic total items" });

      await panel.getByRole("button", { name: "200 items" }).click();
      await expect(panel.getByText(/of 200 entries/)).toBeVisible();
    });

    test("should clamp current page when total shrinks", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "4. Dynamic total items" });

      // Set 200 items (20 pages), navigate to page 5 via next button presses
      await panel.getByRole("button", { name: "200 items" }).click();
      await expect(panel.getByText(/of 200 entries/)).toBeVisible();

      // Use the page 5 button (rendered as a numbered button in the controls)
      await panel.getByRole("button", { name: "5", exact: true }).click();
      await expect(panel.getByText(/Showing 41 to 50/)).toBeVisible();

      // Shrink to 20 items (only 2 pages) — page should clamp to 2
      await panel.getByRole("button", { name: "20 items" }).click();
      await expect(panel.getByText(/of 20 entries/)).toBeVisible();
      await expect(panel.getByText(/Showing 11 to 20/)).toBeVisible();
    });
  });

  // ─── Example 5: Two tables, one page ──────────────────────────────────────

  test.describe("Example 5: Two tables, one page", () => {
    test("should render two independent pagination instances", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "5. Two tables, one page" });

      await expect(panel.getByText(/of 85 entries/)).toBeVisible();
      await expect(panel.getByText(/of 43 entries/)).toBeVisible();
    });

    test("should navigate users and orders independently", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "5. Two tables, one page" });

      // Identify the two pagination blocks within the panel
      const paginations = panel.locator(".pagination");
      const usersPagination = paginations.nth(0);
      const ordersPagination = paginations.nth(1);

      // Navigate users to page 2
      await usersPagination.locator(".pagination-button--next").click();
      await expect(
        usersPagination.getByText(/Showing 11 to 20 of 85/),
      ).toBeVisible();

      // Orders should still be on page 1
      await expect(
        ordersPagination.getByText(/Showing 1 to 5 of 43/),
      ).toBeVisible();
    });
  });

  // ─── Example 6: sessionStorage, no URL ────────────────────────────────────

  test.describe("Example 6: sessionStorage, no URL", () => {
    test("should render pagination with 60 total items", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "6. sessionStorage, no URL" });

      await expect(panel.locator(".pagination")).toBeVisible();
      await expect(panel.getByText(/of 60 entries/)).toBeVisible();
    });

    test("should not sync page to URL", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "6. sessionStorage, no URL" });

      await panel.locator(".pagination-button--next").click();
      await expect(panel.getByText(/Showing 11 to 20 of 60/)).toBeVisible();

      // URL should NOT contain a `page` param set by this instance
      // (the sessionStorage example has syncUrl: false)
      const url = page.url();
      // URL might contain `page` from other examples — but session example
      // won't have written its own. We just check the session example itself
      // still shows page 2 without a URL param driving it.
      expect(url).not.toContain("page=2");
    });

    test("should persist page in sessionStorage (survives reload in same tab)", async ({
      page,
    }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "6. sessionStorage, no URL" });

      await panel.locator(".pagination-button--next").click();
      await expect(panel.getByText(/Showing 11 to 20 of 60/)).toBeVisible();

      await page.reload();
      await page.waitForLoadState("networkidle");

      const panelAfter = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "6. sessionStorage, no URL" });

      await expect(
        panelAfter.getByText(/Showing 11 to 20 of 60/),
      ).toBeVisible();
    });
  });

  // ─── Example 7: React Query pattern (code-only) ───────────────────────────

  test.describe("Example 7: Inside a data-fetching hook", () => {
    test("should render the code snippet panel", async ({ page }) => {
      const panel = page
        .locator(".use-persisted-state-page__example")
        .filter({ hasText: "7. Inside a data-fetching hook" });

      await expect(panel).toBeVisible();
      await expect(
        panel.getByText(/queryKey.*users.*pagination/s),
      ).toBeVisible();
    });
  });

  // ─── API section ──────────────────────────────────────────────────────────

  test("should render the API section with all options documented", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { name: "API" })).toBeVisible();
    // The API reference is inside a <pre> block immediately following the API heading
    const apiBlock = page
      .locator("pre")
      .filter({ hasText: /storageKey.*string/s })
      .last();
    await expect(apiBlock).toBeVisible();
    await expect(apiBlock.getByText(/storageKey/)).toBeVisible();
    await expect(apiBlock.getByText(/defaultPage/)).toBeVisible();
    await expect(apiBlock.getByText(/defaultPageSize/)).toBeVisible();
    await expect(apiBlock.getByText(/setTotalItems/)).toBeVisible();
    await expect(apiBlock.getByText(/totalPages/)).toBeVisible();
    await expect(apiBlock.getByText(/hasNext/)).toBeVisible();
    await expect(apiBlock.getByText(/hasPrevious/)).toBeVisible();
  });
});
