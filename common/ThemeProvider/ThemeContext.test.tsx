import { test, expect } from "../../playwright/coverage-fixtures";
import { ThemeContextProvider } from "./ThemeContext";
import { ThemeConsumerFixture as ThemeConsumer } from "./ThemeConsumerFixture";
import { checkA11y } from "../../playwright/test-utils";
import React from "react";

test.describe("ThemeContextProvider", () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.removeItem("mp-components-theme");
    });
  });

  test("provides the merged default theme and applies CSS variables", async ({
    mount,
    page,
  }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemeConsumer />
      </ThemeContextProvider>,
    );

    await expect(page.getByTestId("primary-color")).toContainText("#");

    const primaryColorTestId = page.getByTestId("primary-color");
    const primaryVar = await primaryColorTestId.evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--mp-color-primary-base"),
    );
    expect(primaryVar.trim()).toBeTruthy();

    const successVar = await primaryColorTestId.evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--mp-color-success-foreground"),
    );
    expect(successVar.trim()).toBeTruthy();
  });

  test("updates theme colors and persists to localStorage", async ({
    mount,
    page,
  }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemeConsumer />
      </ThemeContextProvider>,
    );

    await page.getByTestId("update-primary").click();
    await expect(page.getByTestId("primary-color")).toContainText("#ff0000");

    const stored = await page.evaluate(() =>
      localStorage.getItem("mp-components-theme"),
    );
    expect(stored).toContain("#ff0000");
  });

  test("supports a string border-radius value", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemeConsumer />
      </ThemeContextProvider>,
    );

    await page.getByTestId("update-radius").click();
    await expect(page.getByTestId("border-radius")).toContainText("8px");

    const radiusMd = await page
      .getByTestId("border-radius")
      .evaluate((el) => getComputedStyle(el).getPropertyValue("--mp-radius-md"));
    expect(radiusMd.trim()).toBe("calc(8px * 1)");
  });

  test("resets theme and clears localStorage", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemeConsumer />
      </ThemeContextProvider>,
    );

    await page.getByTestId("update-primary").click();
    await page.getByTestId("reset-theme").click();

    await expect(page.getByTestId("primary-color")).not.toContainText(
      "#ff0000",
    );
    const stored = await page.evaluate(() =>
      localStorage.getItem("mp-components-theme"),
    );
    expect(stored).toBeNull();
  });

  test("loads a persisted theme from localStorage on mount", async ({
    mount,
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.setItem(
        "mp-components-theme",
        JSON.stringify({ colors: { primary: "#123456" } }),
      );
    });

    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemeConsumer />
      </ThemeContextProvider>,
    );

    await expect(page.getByTestId("primary-color")).toContainText("#123456");
  });

  test("falls back to the default theme on corrupted localStorage data", async ({
    mount,
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.setItem("mp-components-theme", "not-json{");
    });

    await mount(
      <ThemeContextProvider theme={{}}>
        <ThemeConsumer />
      </ThemeContextProvider>,
    );

    await expect(page.getByTestId("primary-color")).toContainText("#");
  });

  test("passes accessibility checks", async ({ mount, page }) => {
    await mount(
      <ThemeContextProvider theme={{}}>
        <div>
          <h1>Theme Test</h1>
          <p>Testing ThemeContextProvider accessibility</p>
        </div>
      </ThemeContextProvider>,
    );

    await checkA11y(page);
  });
});
