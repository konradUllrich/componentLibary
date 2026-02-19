import { test, expect } from "@playwright/test";

test.describe("Documentation Page", () => {
  test("should display documentation page", async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("h1, h2", { timeout: 15000 });

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("Documentation").click();

    // Check heading
    await expect(
      page.getByRole("heading", { name: "Documentation" }),
    ).toBeVisible();
  });

  test("should display installation instructions", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("Documentation").click();

    // Check for installation section
    await expect(page.getByText(/Installation/i)).toBeVisible();
  });

  test("should display usage examples", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("Documentation").click();

    // Check for usage section
    await expect(page.getByText(/Usage/i)).toBeVisible();
  });

  test("should display component categories", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("Documentation").click();

    // Check for component categories section
    await expect(page.getByText(/Component Categories/i)).toBeVisible();
  });

  test("should navigate from documentation to button component", async ({
    page,
  }) => {
    await page.goto("/componentLibary/");

    // Navigate to documentation via horizontal nav
    await page.getByRole("navigation").getByText("Documentation").click();
    await expect(
      page.getByRole("heading", { name: "Documentation" }),
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
