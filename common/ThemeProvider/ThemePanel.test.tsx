import { test, expect } from "../../playwright/coverage-fixtures";
import { ThemePanel } from "./ThemePanel";
import { ThemeContextProvider } from "./ThemeContext";
import { checkA11y } from "../../playwright/test-utils";
import React from "react";

test.describe("ThemePanel", () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem("mp-components-theme");
    });
  });

  test("opens, applies a preset, and resets", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemePanel />
      </ThemeContextProvider>,
    );

    await page.locator(".mp-theme-panel__toggle").click();
    await expect(page.locator(".mp-theme-panel")).not.toHaveClass(
      /mp-theme-panel--collapsed/,
    );

    await page.getByRole("button", { name: "Dark" }).click();
    await expect(page.getByLabel("Primary Color hex value")).toBeVisible();

    await page.getByRole("button", { name: "Reset to Default" }).click();
    await expect(page.evaluate(() => localStorage.getItem("mp-components-theme"))).resolves.toBeNull();
  });

  test("shows a contrast warning for a low-contrast color pair", async ({
    mount,
    page,
  }) => {
    await mount(
      <ThemeContextProvider
        theme={{ colors: { warning: "#ffffff", onWarning: "#fefefe" } }}
      >
        <ThemePanel />
      </ThemeContextProvider>,
    );

    await page.locator(".mp-theme-panel__toggle").click();
    await expect(
      page.locator(".mp-theme-panel__contrast-warning").first(),
    ).toBeVisible();
  });

  test("imports a theme from pasted JSON", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemePanel />
      </ThemeContextProvider>,
    );

    await page.locator(".mp-theme-panel__toggle").click();
    await page
      .getByLabel("Import theme JSON")
      .fill(JSON.stringify({ colors: { primary: "#123456" } }));
    await page.getByRole("button", { name: "Import" }).click();

    await expect(page.getByLabel("Primary Color hex value")).toHaveValue(
      "#123456",
    );
  });

  test("shows an error for invalid import JSON", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemePanel />
      </ThemeContextProvider>,
    );

    await page.locator(".mp-theme-panel__toggle").click();
    await page.getByLabel("Import theme JSON").fill("not-json{");
    await page.getByRole("button", { name: "Import" }).click();

    await expect(page.locator(".mp-form-control__message--error")).toHaveText(
      "Invalid theme JSON",
    );
  });

  test("passes accessibility checks", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemePanel />
      </ThemeContextProvider>,
    );

    await page.locator(".mp-theme-panel__toggle").click();
    await checkA11y(page);
  });
});
