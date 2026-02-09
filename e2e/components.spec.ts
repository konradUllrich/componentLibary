import { test, expect } from "@playwright/test";

test.describe("Component Navigation", () => {
  test("should display components overview", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Check heading
    await expect(
      page.getByRole("heading", { name: "Components", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/Browse all available components/i),
    ).toBeVisible();
  });

  test("should display component grid", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Check that component grid is visible
    await expect(page.locator(".component-grid")).toBeVisible();
  });

  test("should navigate to Button component via card", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Click on Button card
    const buttonCard = page
      .locator(".component-grid")
      .getByRole("heading", { name: "Button", exact: true });
    await buttonCard.click();

    // Verify Button component page is displayed
    await expect(page.locator("main")).toContainText("Button");
  });

  test("should navigate to Badge component via card", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Click on Badge card
    const badgeCard = page
      .locator(".component-grid")
      .getByRole("heading", { name: "Badge", exact: true });
    await badgeCard.click();

    // Verify Badge component page is displayed
    await expect(page.locator("main")).toContainText("Badge");
  });

  test("should navigate to Text component via card", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Click on Text card
    const textCard = page
      .locator(".component-grid")
      .getByRole("heading", { name: "Text", exact: true });
    await textCard.click();

    // Verify Text component page is displayed
    await expect(page.locator("main")).toContainText("Text");
  });

  test("should navigate to Table component via card", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Click on Table card
    const tableCard = page
      .locator(".component-grid")
      .getByRole("heading", { name: "Table", exact: true });
    await tableCard.click();

    // Verify Table component page is displayed
    await expect(page.locator("main")).toContainText("Table");
  });
});
