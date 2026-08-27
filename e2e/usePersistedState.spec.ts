import { test, expect, type Page } from "@playwright/test";

// usePersistedState writes into one route-scoped blob (a serialized
// URLSearchParams string) rather than its own top-level storage key —
// see usePersistedState's storage model in CLAUDE.md.
const ROUTE_STORAGE_KEY = "mp-route:/hooks/use-persisted-state";

const readRouteParam = (page: Page, storageKey: string) =>
  page.evaluate(
    ({ routeKey, storageKey }) => {
      const blob = localStorage.getItem(routeKey);
      return blob ? new URLSearchParams(blob).get(storageKey) : null;
    },
    { routeKey: ROUTE_STORAGE_KEY, storageKey },
  );

test.describe("usePersistedState Demo Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => localStorage.clear());

    await page.getByRole("link", { name: "usePersistedState" }).first().click();
    await expect(
      page.getByRole("heading", { name: "usePersistedState" }),
    ).toBeVisible();
  });

  test("should allow typing multiple characters in Search Query", async ({
    page,
  }) => {
    const input = page.getByLabel("Search Query");

    await input.fill("persisted state works");

    await expect(input).toHaveValue("persisted state works");

    await input.fill("persisted state works now");
    await expect(input).toHaveValue("persisted state works now");
  });

  test("should persist Search Query after reload", async ({ page }) => {
    const input = page.getByLabel("Search Query");

    await input.fill("hello persisted");
    await expect(input).toHaveValue("hello persisted");

    await expect
      .poll(async () => readRouteParam(page, "docs-query"))
      .toBe('"hello persisted"');

    await page.reload();
    await page.waitForLoadState("networkidle");

    const inputAfterReload = page.getByLabel("Search Query");
    await expect(inputAfterReload).toHaveValue("hello persisted");

    const storedValue = await readRouteParam(page, "docs-query");
    expect(storedValue).toBe('"hello persisted"');
  });

  test("should reset Search Query and clear persistence", async ({ page }) => {
    const input = page.getByLabel("Search Query");
    const queryCard = page
      .locator(".use-persisted-state-page__example")
      .filter({ hasText: "1. Query Text (string)" });

    await input.fill("to-be-cleared");
    await expect(input).toHaveValue("to-be-cleared");

    await expect
      .poll(async () => readRouteParam(page, "docs-query"))
      .toBe('"to-be-cleared"');

    await queryCard.getByRole("button", { name: "Reset" }).click();

    await expect(input).toHaveValue("");

    await expect
      .poll(async () => readRouteParam(page, "docs-query"))
      .toBeNull();
  });
});
