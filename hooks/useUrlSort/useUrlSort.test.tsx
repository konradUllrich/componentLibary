import { test, expect } from "../../playwright/coverage-fixtures";
import {
  SortDisplay,
  RouterSortDisplay,
  CrossInstanceSortSyncComponent,
  SortNavigationRestoreComponent,
} from "./useUrlSort.test-components";

test.describe("useUrlSort Hook", () => {
  // ===== Defaults =====
  test.describe("Default Values", () => {
    test("should initialise with null sort by default", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await expect(component.getByTestId("sort")).toHaveText("null");
    });

    test("should respect a custom initialSort", async ({ mount, page }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(
        <SortDisplay initialSort={{ key: "name", direction: "asc" }} />,
      );

      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
    });
  });

  // ===== setSort =====
  test.describe("setSort", () => {
    test("sets the active sort column and direction", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("set-name-asc").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
    });

    test("replaces any existing sort", async ({ mount, page }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("set-name-asc").click();
      await component.getByTestId("set-age-desc").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"age","direction":"desc"}',
      );
    });
  });

  // ===== toggleSort =====
  test.describe("toggleSort", () => {
    test("not active → asc on first toggle", async ({ mount, page }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("toggle-name").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
    });

    test("asc → desc on second toggle of the same column", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("toggle-name").click();
      await component.getByTestId("toggle-name").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"desc"}',
      );
    });

    test("desc → null (cleared) on third toggle of the same column", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("toggle-name").click();
      await component.getByTestId("toggle-name").click();
      await component.getByTestId("toggle-name").click();
      await expect(component.getByTestId("sort")).toHaveText("null");
    });

    test("switching to a different column always starts at asc", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("toggle-name").click();
      await component.getByTestId("toggle-name").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"desc"}',
      );

      await component.getByTestId("toggle-age").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"age","direction":"asc"}',
      );
    });
  });

  // ===== clearSort =====
  test.describe("clearSort", () => {
    test("removes the active sort", async ({ mount, page }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("set-name-asc").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );

      await component.getByTestId("clear").click();
      await expect(component.getByTestId("sort")).toHaveText("null");
    });
  });

  // ===== reset =====
  test.describe("reset", () => {
    test("restores the initial sort value provided at creation", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(
        <SortDisplay initialSort={{ key: "name", direction: "asc" }} />,
      );

      await component.getByTestId("set-age-desc").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"age","direction":"desc"}',
      );

      await component.getByTestId("reset").click();
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
    });

    test("restores to null when no initialSort was provided", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortDisplay />);

      await component.getByTestId("set-name-asc").click();
      await component.getByTestId("reset").click();
      await expect(component.getByTestId("sort")).toHaveText("null");
    });
  });

  // ===== URL Sync =====
  test.describe("URL Sync", () => {
    test("should write sort to URL under a custom sortParam", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(
        <RouterSortDisplay sortParam="orderBy" />,
      );

      await component.getByTestId("toggle-name").click();
      await page.waitForTimeout(100);

      // Params are embedded inside the `appRoute` value (e.g. "?appRoute=/path?orderBy=...")
      const rawParam = await page.evaluate(() => {
        const outer = new URLSearchParams(window.location.search);
        const appRoute = outer.get("appRoute") ?? "";
        const innerSearch = appRoute.includes("?")
          ? appRoute.split("?")[1]
          : "";
        const inner = new URLSearchParams(innerSearch);
        return inner.get("orderBy");
      });

      expect(rawParam).not.toBeNull();
      expect(JSON.parse(rawParam!)).toEqual({
        key: "name",
        direction: "asc",
      });
    });

    test("should remove the param from the URL when sort is cleared", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<RouterSortDisplay />);

      const readSortParam = () =>
        page.evaluate(() => {
          const outer = new URLSearchParams(window.location.search);
          const appRoute = outer.get("appRoute") ?? "";
          const innerSearch = appRoute.includes("?")
            ? appRoute.split("?")[1]
            : "";
          return new URLSearchParams(innerSearch).get("sort");
        });

      await component.getByTestId("toggle-name").click();
      await page.waitForTimeout(100);
      expect(await readSortParam()).not.toBeNull();

      // asc → desc → null
      await component.getByTestId("toggle-name").click();
      await component.getByTestId("toggle-name").click();
      await page.waitForTimeout(100);

      expect(await readSortParam()).toBeNull();
    });
  });

  // ===== Restore on navigation =====
  test.describe("Restore on navigation", () => {
    test("should restore sort when navigating back to a route", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<SortNavigationRestoreComponent />);

      await component.getByTestId("toggle-name").click();
      await page.waitForTimeout(50);
      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );

      // Navigate away
      await component.getByTestId("go-other").click();
      await expect(component.getByTestId("other-page")).toBeVisible();

      // Navigate back — router injects stored params into the URL
      await component.getByTestId("go-back").click();
      await page.waitForTimeout(50);

      await expect(component.getByTestId("sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
    });
  });

  // ===== Cross-instance sync =====
  test.describe("Cross-instance sync", () => {
    test("instance B reflects toggleSort called by instance A", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<CrossInstanceSortSyncComponent />);

      await expect(component.getByTestId("instance-a-sort")).toHaveText("null");
      await expect(component.getByTestId("instance-b-sort")).toHaveText("null");

      await component.getByTestId("instance-a-toggle-name").click();

      await expect(component.getByTestId("instance-a-sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
      await expect(component.getByTestId("instance-b-sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );
    });

    test("instance B reflects clearSort called by instance A", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<CrossInstanceSortSyncComponent />);

      await component.getByTestId("instance-a-toggle-name").click();
      await expect(component.getByTestId("instance-b-sort")).toHaveText(
        '{"key":"name","direction":"asc"}',
      );

      await component.getByTestId("instance-a-clear").click();
      await expect(component.getByTestId("instance-b-sort")).toHaveText("null");
    });
  });

  // ===== Cleanup =====
  test.afterEach(async ({ page }) => {
    try {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch {
      // ignore closed page
    }
  });
});
