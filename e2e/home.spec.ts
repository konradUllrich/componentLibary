import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display home page with components grid", async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("h1", { timeout: 15000 });

    // Check that the page title is correct
    await expect(page).toHaveTitle(/mpComponents/);

    // Check main heading
    await expect(page.locator("main h1")).toContainText(/Component Library/i);
    await expect(page.getByText(/Explore our collection/i)).toBeVisible();
  });

  test("should display component cards", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Check that component cards are visible
    await expect(
      page.getByRole("heading", { name: "Button", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Badge", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Text", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Table", exact: true }),
    ).toBeVisible();
  });

  test("should navigate to component page by clicking card", async ({
    page,
  }) => {
    await page.goto("/componentLibary/");

    // Click on Button card
    await page.getByRole("heading", { name: "Button", exact: true }).click();

    // Should navigate to Button component page
    await expect(page.locator("main")).toContainText("Button");
  });

  test("should navigate using sidebar", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Click on Home in sidebar
    await page
      .getByRole("navigation")
      .getByRole("link", { name: /^Home$/i })
      .click();

    // Should show home page
    await expect(page.locator("main h1")).toContainText(/Component Library/i);
  });
});
