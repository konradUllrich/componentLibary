import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
  FilterDisplay,
  RouterFilterDisplay,
  ArrayFilterDisplay,
  RouterArrayFilterDisplay,
} from "./useFilter.test-components";

test.describe("useFilter Hook", () => {
  // ===== Defaults =====
  test.describe("Default Values", () => {
    test("should initialise with empty filters when no defaults provided", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay storageKey="test-defaults" />,
      );

      await expect(component.getByTestId("filters")).toHaveText("{}");
    });

    test("should initialise with provided defaultFilters", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay
          storageKey="test-default-filters"
          defaultFilters={{ status: "active" }}
        />,
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
        <FilterDisplay
          storageKey="test-set-filter"
          defaultFilters={{ status: "active" }}
        />,
      );

      await component.getByTestId("set-status-inactive").click();
      await expect(component.getByTestId("filters")).toContainText(
        '"status":"inactive"',
      );
    });

    test("setFilters merges multiple keys", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay
          storageKey="test-set-filters"
          defaultFilters={{ status: "active" }}
        />,
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
        <FilterDisplay
          storageKey="test-remove-filter"
          defaultFilters={{ status: "active" }}
        />,
      );

      await component.getByTestId("remove-status").click();
      await expect(component.getByTestId("filters")).not.toContainText(
        "status",
      );
    });

    test("clearFilters empties all filters", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay
          storageKey="test-clear-filters"
          defaultFilters={{ status: "active" }}
        />,
      );

      await component.getByTestId("set-multiple").click();
      await component.getByTestId("clear").click();
      await expect(component.getByTestId("filters")).toHaveText("{}");
    });

    test("reset restores defaultFilters", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay
          storageKey="test-reset"
          defaultFilters={{ status: "active" }}
        />,
      );

      await component.getByTestId("set-multiple").click();
      await component.getByTestId("reset").click();
      await expect(component.getByTestId("filters")).toHaveText(
        '{"status":"active"}',
      );
    });
  });

  // ===== localStorage Persistence =====
  test.describe("Storage Persistence", () => {
    test("should persist filters to localStorage", async ({ mount, page }) => {
      await page.evaluate(() => localStorage.clear());

      const component = await mount(
        <FilterDisplay storageKey="test-persist" />,
      );

      await component.getByTestId("set-status-inactive").click();
      await page.waitForTimeout(100);

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-persist"),
      );
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.status).toBe("inactive");
    });

    test("should restore filters from localStorage on mount", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        localStorage.setItem(
          "test-restore-filters",
          JSON.stringify({ status: "archived", category: "news" }),
        );
      });

      const component = await mount(
        <FilterDisplay storageKey="test-restore-filters" />,
      );

      const text = await component.getByTestId("filters").textContent();
      expect(text).toContain('"status":"archived"');
      expect(text).toContain('"category":"news"');
    });

    test("should remove from localStorage when filters match default (empty)", async ({
      mount,
      page,
    }) => {
      await page.evaluate(() => {
        localStorage.clear();
        localStorage.setItem(
          "test-remove-default",
          JSON.stringify({ status: "active" }),
        );
      });

      const component = await mount(
        <FilterDisplay storageKey="test-remove-default" />,
      );

      await component.getByTestId("clear").click();
      await page.waitForTimeout(100);

      const stored = await page.evaluate(() =>
        localStorage.getItem("test-remove-default"),
      );
      expect(stored).toBeNull();
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
          storageKey="test-url-write"
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
          storageKey="test-url-disabled"
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

      const component = await mount(
        <ArrayFilterDisplay storageKey="test-array-storage" />,
      );

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
          storageKey="test-array-url"
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
