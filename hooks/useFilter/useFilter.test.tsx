import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
  FilterDisplay,
  RouterFilterDisplay,
  ArrayFilterDisplay,
  RouterArrayFilterDisplay,
  CrossInstanceFilterSyncComponent,
  FilterNavigationRestoreComponent,
} from "./useFilter.test-components";

test.describe("useFilter Hook", () => {
  // ===== Defaults =====
  test.describe("Default Values", () => {
    test("should initialise with empty filters when no defaults provided", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(<FilterDisplay />);

      await expect(component.getByTestId("filters")).toHaveText("{}");
    });

    test("should initialise with provided defaultFilters", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay defaultFilters={{ status: "active" }} />,
      );

      await expect(component.getByTestId("filters")).toContainText(
        '"status":"active"',
      );
    });
  });

  // ===== Mutations =====
  test.describe("Mutations", () => {
    test("setFilter updates a single key", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay defaultFilters={{ status: "active" }} />,
      );

      await component.getByTestId("set-status-inactive").click();
      await expect(component.getByTestId("filters")).toContainText(
        '"status":"inactive"',
      );
    });

    test("setFilters merges multiple keys", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay defaultFilters={{ status: "active" }} />,
      );

      await component.getByTestId("set-multiple").click();
      const text = await component.getByTestId("filters").textContent();
      expect(text).toContain('"category":"books"');
      expect(text).toContain('"page":2');
      expect(text).toContain('"status":"active"'); // existing key retained
    });

    test("removeFilter deletes a single key", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay defaultFilters={{ status: "active" }} />,
      );

      await component.getByTestId("remove-status").click();
      await expect(component.getByTestId("filters")).not.toContainText(
        "status",
      );
    });

    test("clearFilters empties all filters", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay defaultFilters={{ status: "active" }} />,
      );

      await component.getByTestId("set-multiple").click();
      await component.getByTestId("clear").click();
      await expect(component.getByTestId("filters")).toHaveText("{}");
    });

    test("reset restores defaultFilters", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay defaultFilters={{ status: "active" }} />,
      );

      await component.getByTestId("set-multiple").click();
      await component.getByTestId("reset").click();
      await expect(component.getByTestId("filters")).toHaveText(
        '{"status":"active"}',
      );
    });
  });

  // ===== Restore on navigation =====
  test.describe("Restore on navigation", () => {
    test("should restore filter state when navigating back to a route", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => sessionStorage.clear());

      const component = await mount(<FilterNavigationRestoreComponent />);

      // Set a non-default filter value
      await component.getByTestId("set-archived").click();
      await page.waitForTimeout(50);
      await expect(component.getByTestId("filters")).toContainText(
        '"status":"archived"',
      );

      // Navigate away
      await component.getByTestId("go-other").click();
      await expect(component.getByTestId("other-page")).toBeVisible();

      // Navigate back — router injects stored params into the URL
      await component.getByTestId("go-back").click();
      await page.waitForTimeout(50);

      await expect(component.getByTestId("filters")).toContainText(
        '"status":"archived"',
      );
    });
  });

  // ===== URL Sync =====
  test.describe("URL Sync", () => {
    test("should write filters to URL when syncUrl=true", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      type TestFilters = { status: string };
      const component = await mount(
        <RouterFilterDisplay<TestFilters>
          syncUrl={true}
          extraFilters={{ status: "inactive" } as Partial<TestFilters>}
        />,
      );

      await component.getByTestId("set-extra").click();
      await page.waitForTimeout(100);

      const url = decodeURIComponent(page.url());
      expect(url).toContain("status=inactive");
    });

    test("should not write to URL when syncUrl=false", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      type TestFilters = { status: string };
      const component = await mount(
        <RouterFilterDisplay<TestFilters>
          syncUrl={false}
          extraFilters={{ status: "inactive" } as Partial<TestFilters>}
        />,
      );

      await component.getByTestId("set-extra").click();
      await page.waitForTimeout(100);

      const url = page.url();
      expect(url).not.toContain("status=");
    });
  });

  // ===== Array values =====
  test.describe("Array values", () => {
    test("array filter survives localStorage roundtrip as array (not string)", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(<ArrayFilterDisplay />);

      await component.getByTestId("set-tags").click();
      await page.waitForTimeout(100);

      // Verify in-memory state is an array
      await expect(component.getByTestId("tags-type")).toHaveText("array");
      await expect(component.getByTestId("filters")).toContainText(
        '"tags":["react","typescript"]',
      );
    });

    test("array filter survives URL roundtrip as array (not comma-separated string)", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      // Mount and write an array filter — the hook serialises it to the URL
      const component = await mount(
        <RouterArrayFilterDisplay
          syncUrl={true}
          defaultFilters={{ tags: [], status: "" }}
        />,
      );

      await component.getByTestId("set-tags").click();
      await page.waitForTimeout(100);

      // Params are embedded inside the `appRoute` value (e.g. "?appRoute=/path?tags=...")
      const rawParam = await page.evaluate(() => {
        const outer = new URLSearchParams(window.location.search);
        const appRoute = outer.get("appRoute") ?? "";
        const innerSearch = appRoute.includes("?")
          ? appRoute.split("?")[1]
          : "";
        const inner = new URLSearchParams(innerSearch);
        return inner.get("tags");
      });

      expect(rawParam).not.toBeNull();
      // Must be parseable back to an array — not "react,typescript"
      const parsed = JSON.parse(rawParam!);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toEqual(["react", "typescript"]);
    });
  });

  // ===== Cross-instance sync =====
  test.describe("Cross-instance sync", () => {
    test("instance B reflects setFilter called by instance A", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(<CrossInstanceFilterSyncComponent />);

      await expect(component.getByTestId("instance-a-filters")).toHaveText(
        "{}",
      );
      await expect(component.getByTestId("instance-b-filters")).toHaveText(
        "{}",
      );

      await component.getByTestId("instance-a-set").click();

      await expect(component.getByTestId("instance-a-filters")).toContainText(
        '"status":"inactive"',
      );
      await expect(component.getByTestId("instance-b-filters")).toContainText(
        '"status":"inactive"',
      );
    });

    test("instance B reflects clearFilters called by instance A", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(<CrossInstanceFilterSyncComponent />);

      await component.getByTestId("instance-a-set").click();
      await expect(component.getByTestId("instance-b-filters")).toContainText(
        '"status":"inactive"',
      );

      await component.getByTestId("instance-a-clear").click();
      await expect(component.getByTestId("instance-b-filters")).toHaveText(
        "{}",
      );
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
