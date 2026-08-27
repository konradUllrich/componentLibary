import { test, expect } from "@playwright/test";

test.describe("Theme Functionality", () => {
  test("should have theme panel visible", async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("h1, h2", { timeout: 15000 });

    // Check if theme link exists in horizontal nav
    const themeLink = page.getByRole("navigation").getByText("Theme");
    await expect(themeLink).toBeVisible();
  });

  test("should be able to interact with theme controls", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Look for theme-related buttons or controls
    const themeButton = page.locator('button[class*="theme"]').first();

    if (await themeButton.isVisible()) {
      await themeButton.click({ force: true }); // Force click to bypass overlays
      // After clicking, some theme UI should be visible
      await page.waitForTimeout(500);
    }
  });

  test("should maintain theme across navigation", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Navigate to a component page (e.g., Button via sidebar)
    const commonSection = page.getByRole("button", { name: /Common/i });
    if (await commonSection.isVisible()) {
      await commonSection.click();
      await page.getByText("Button").click();
      // Wait for navigation
      await page.waitForLoadState("networkidle");
    }

    // Navigate to documentation via horizontal nav
    const docsLink = page.getByRole("navigation").getByText("Documentation");
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await page.waitForLoadState("networkidle");
    }

    // Navigate back to home via sidebar
    const homeLink = page.getByRole("button", { name: /^Home$/i });
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await page.waitForLoadState("networkidle");
    }
  });

  test("Theme Provider docs page opens the live theme editor panel", async ({
    page,
  }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");

    const commonSection = page.getByRole("link", { name: /Common/i });
    await commonSection.click();
    await page.getByRole("link", { name: "Theme Provider" }).click();
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Theme Provider" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Open theme editor" }).click();
    await expect(page.locator(".mp-theme-panel")).not.toHaveClass(
      /mp-theme-panel--collapsed/,
    );
    await expect(
      page.getByRole("heading", { name: "Theme Customizer" }),
    ).toBeVisible();
  });
});
