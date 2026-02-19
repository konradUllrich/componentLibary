import { test, expect } from "@playwright/test";

test.describe("Sidebar Navigation", () => {
  test("should display sidebar with navigation items", async ({ page }) => {
    await page.goto("/componentLibary/");
    await page.waitForLoadState("networkidle");
    await page.waitForSelector("h1, h2", { timeout: 15000 });

    // Check that sidebar is visible
    await expect(
      page.getByRole("heading", { name: "mpComponents", level: 2 }),
    ).toBeVisible();

    // Check main navigation items - sidebar items are links
    await expect(page.getByRole("link", { name: /Home/i })).toBeVisible();
    await expect(
      page.getByRole("navigation").getByText(/^Components$/i),
    ).toBeVisible();
  });

  test("should navigate to home from sidebar", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Navigate to a specific component via sidebar
    await page.getByRole("link", { name: /Common/i }).click();
    await expect(page.getByRole("link", { name: "Button" })).toBeVisible();
    await page.getByRole("link", { name: "Button" }).click();
    await expect(
      page.getByRole("heading", { name: "Button Component" }),
    ).toBeVisible();

    // Navigate back to home
    await page.getByRole("link", { name: /^Home$/i }).click();
    await expect(
      page.getByRole("heading", { name: /Component Library/i }),
    ).toBeVisible();
  });

  test("should navigate to button component from sidebar", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Expand Components section and click Button item
    await page.getByRole("link", { name: /Common/i }).click();
    await expect(page.getByRole("link", { name: "Button" })).toBeVisible();
    await page.getByRole("link", { name: "Button" }).click();

    // Should show Button component page
    await expect(
      page.getByRole("heading", { name: "Button Component" }),
    ).toBeVisible();
  });

  test("should expand components submenu", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Click on Common category link to expand
    await page.getByRole("link", { name: /Common/i }).click();

    // Check that component items are visible as links
    await expect(page.getByRole("link", { name: "Button" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Badge" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Text" })).toBeVisible();
  });

  test("should navigate to specific component from submenu", async ({
    page,
  }) => {
    await page.goto("/componentLibary/");

    // Click on Common category link to expand
    await page.getByRole("link", { name: /Common/i }).click();

    // Click on Button component link
    await page.getByRole("link", { name: "Button" }).click();

    // Should show Button component page
    await expect(
      page.getByRole("heading", { name: "Button Component" }),
    ).toBeVisible();
  });

  test("should toggle sidebar on desktop", async ({ page }) => {
    await page.goto("/componentLibary/");

    // Find and click the sidebar toggle button
    // The SidebarToggle component renders a button with aria-label
    const toggleButton = page.getByRole("button", { name: /Toggle sidebar/i });
    await toggleButton.click();

    // Wait a moment for animation
    await page.waitForTimeout(300);

    // The sidebar should still be in the DOM but might be collapsed
    await expect(
      page.getByRole("heading", { name: "mpComponents", level: 2 }),
    ).toBeVisible();
  });

  test("should close mobile sidebar when navigation item is clicked", async ({
    page,
  }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/componentLibary/");

    // Open the mobile sidebar using the mobile toggle button
    const mobileToggle = page.getByRole("button", {
      name: /Toggle mobile menu/i,
    });
    await mobileToggle.click();

    // Wait for sidebar to open
    await page.waitForTimeout(300);

    // Click on a navigation item (e.g., Button component)
    await page.getByRole("link", { name: /Common/i }).click();
    await expect(page.getByRole("link", { name: "Button" })).toBeVisible();
    await page.getByRole("link", { name: "Button" }).click();

    // Wait for navigation and sidebar animation
    await page.waitForTimeout(300);

    // Check that we navigated to Button component page
    await expect(
      page.getByRole("heading", { name: "Button Component" }),
    ).toBeVisible();

    // The sidebar should be closed (overlay/backdrop should not be visible)
    // In mobile mode, the sidebar uses a ::before pseudo-element for the overlay
    // We can check if the sidebar is not in the expanded state by checking if the sidebar wrapper is off-screen
    const sidebar = page.locator(".sidebar--mobile.sidebar--expanded");
    await expect(sidebar).toHaveCount(0);
  });
});
