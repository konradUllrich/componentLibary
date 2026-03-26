import { test, expect } from "@playwright/test";

test.describe("Documentation Page", () => {
  test("should display usePersistedState page", async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("h1, h2", { timeout: 15000 });

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("usePersistedState").click();

    // Check heading
    await expect(
      page.getByRole("heading", { name: "usePersistedState" }),
    ).toBeVisible();
  });

  test("should display quick start section", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("usePersistedState").click();

    // Check for quick start section
    await expect(page.getByText(/Quick Start/i)).toBeVisible();
  });

  test("should display live examples section", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("usePersistedState").click();

    // Check for live examples section
    await expect(page.getByText(/Live Examples/i)).toBeVisible();
  });

  test("should display API section", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("usePersistedState").click();

    // Check for API section
    await expect(page.getByText(/^API$/i)).toBeVisible();
  });

  test("should navigate from hooks docs to button component", async ({
    page,
  }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("usePersistedState").click();
    await expect(
      page.getByRole("heading", { name: "usePersistedState" }),
    ).toBeVisible();

    // Navigate to a component from sidebar
    await page.getByRole("link", { name: /Common/i }).click();
    await expect(page.getByRole("link", { name: "Button" })).toBeVisible();
    await page.getByRole("link", { name: "Button" }).click();
    await expect(
      page.getByRole("heading", { name: "Button Component" }),
    ).toBeVisible();
  });
});
