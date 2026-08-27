import { test, expect } from "../../playwright/coverage-fixtures";
import { ThemePanel } from "./ThemePanel";
import { ThemeContextProvider } from "./ThemeContext";
import { NavToggleFixture } from "./NavToggleFixture";
import React from "react";

test.describe("useThemeEditor", () => {
  test("keeps independent callers in sync without a Router", async ({
    mount,
    page,
  }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <NavToggleFixture />
        <ThemePanel />
      </ThemeContextProvider>,
    );

    await expect(page.locator(".mp-theme-panel")).toHaveClass(
      /mp-theme-panel--collapsed/,
    );

    await page.getByTestId("nav-toggle").click();
    await expect(page.getByTestId("nav-toggle")).toHaveText("open");
    await expect(page.locator(".mp-theme-panel")).not.toHaveClass(
      /mp-theme-panel--collapsed/,
    );

    await page.getByTestId("nav-toggle").click();
    await expect(page.locator(".mp-theme-panel")).toHaveClass(
      /mp-theme-panel--collapsed/,
    );
  });
});
