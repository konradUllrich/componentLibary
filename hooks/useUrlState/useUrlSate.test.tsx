/**
 * useUrlState test suite
 *
 * Storage model being tested:
 * - URL search params are the SINGLE SOURCE OF TRUTH — no separate useState.
 * - setState writes:
 *     1. URL search param            key=%22value%22
 *     2. Route-scoped storage key    `${routeStatePrefix}:${currentPath}`
 *        as a URLSearchParams blob:  key=%22value%22
 * - `storage` option picks the backend for the route key:
 *     "sessionStorage" (default) → sessionStorage["mp-route:/"]
 *     "localStorage"             → localStorage["mp-route:/"]
 *     false                      → no storage write
 * - Init reads URL params only; falls back to defaultValue.
 *
 * Helper: routeParams(page, backend)
 *   Reads the route key from the given storage backend and returns a
 *   parsed URLSearchParams object so individual params can be asserted.
 */
import { test, expect } from "@playwright/experimental-ct-react";
import {
  UrlStateDisplay,
  UrlObjectState,
  RemoveIfDefaultComponent,
  RouteStorageComponent,
  FlatFiltersComponent,
  CustomSerializationComponent,
  MultipleKeysComponent,
} from "./useUrlSate.test-components";
import type { Page } from "@playwright/test";

// ─── helpers ─────────────────────────────────────────────────────

/** Read route-scoped URLSearchParams from a storage backend. */
async function routeParams(
  page: Page,
  backend: "localStorage" | "sessionStorage" = "sessionStorage",
): Promise<Record<string, string>> {
  const stored = await page.evaluate(
    ([b]) =>
      window[b as "localStorage" | "sessionStorage"].getItem("mp-route:/"),
    [backend],
  );
  return Object.fromEntries(new URLSearchParams(stored ?? ""));
}

/** Read a single URL search param from the current page URL. */
async function urlParam(page: Page, key: string): Promise<string | null> {
  return page.evaluate(
    ([k]) => new URL(window.location.href).searchParams.get(k),
    [key],
  );
}

// ─────────────────────────────────────────────────────────────────

test.describe("useUrlState", () => {
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  // ===== 1. State Management ================================================

  test.describe("State Management", () => {
    test("returns default value when no URL param is present", async ({
      mount,
    }) => {
      const c = await mount(
        <UrlStateDisplay storageKey="sm-init" defaultValue="hello" />,
      );
      await expect(c.getByTestId("state-value")).toHaveText("hello");
    });

    test("updates state with a literal value", async ({ mount }) => {
      const c = await mount(
        <UrlStateDisplay storageKey="sm-literal" defaultValue="initial" />,
      );
      await c.getByTestId("update-button").click();
      await expect(c.getByTestId("state-value")).toHaveText("updated");
    });

    test("updates state with a functional updater – receives previous value", async ({
      mount,
    }) => {
      const c = await mount(
        <UrlStateDisplay storageKey="sm-fn" defaultValue="base" />,
      );
      await c.getByTestId("modify-button").click();
      await expect(c.getByTestId("state-value")).toHaveText("base-modified");
    });

    test("functional updater stacks correctly on rapid clicks", async ({
      mount,
    }) => {
      const c = await mount(
        <UrlStateDisplay storageKey="sm-rapid" defaultValue="x" />,
      );
      for (let i = 0; i < 4; i++) {
        await c.getByTestId("modify-button").click();
      }
      await expect(c.getByTestId("state-value")).toHaveText(
        "x-modified-modified-modified-modified",
      );
    });

    test("object state: functional updater preserves unchanged keys", async ({
      mount,
    }) => {
      const c = await mount(<UrlObjectState />);
      await c.getByTestId("increment-button").click();
      await c.getByTestId("increment-button").click();
      await expect(c.getByTestId("object-name")).toHaveText("test");
      await expect(c.getByTestId("object-count")).toHaveText("2");
    });
  });

  // ===== 2. URL initialisation =============================================

  test.describe("URL initialisation", () => {
    test("reads URL search param on init (takes priority over defaultValue)", async ({
      mount,
      page,
    }) => {
      await page.goto(
        `/?url-init=${encodeURIComponent(JSON.stringify("from-url"))}`,
      );
      const c = await mount(
        <UrlStateDisplay storageKey="url-init" defaultValue="default" />,
      );
      await expect(c.getByTestId("state-value")).toHaveText("from-url");
    });

    test("falls back to defaultValue when URL param is absent", async ({
      mount,
    }) => {
      const c = await mount(
        <UrlStateDisplay storageKey="url-fallback" defaultValue="fallback" />,
      );
      await expect(c.getByTestId("state-value")).toHaveText("fallback");
    });
  });

  // ===== 3. URL writes =====================================================

  test.describe("URL writes", () => {
    test("setState writes a URL search param (JSON-serialised value)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <UrlStateDisplay storageKey="url-write" defaultValue="start" />,
      );
      await c.getByTestId("update-button").click();
      const param = await urlParam(page, "url-write");
      // JSON.stringify("updated") = '"updated"'
      expect(param).toBe('"updated"');
    });

    test("URL param is removed when value resets to default (removeIfDefault=true)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RemoveIfDefaultComponent
          storageKey="url-rid-true"
          removeIfDefault={true}
        />,
      );
      await c.getByTestId("set-custom-button").click();
      expect(await urlParam(page, "url-rid-true")).not.toBeNull();

      await c.getByTestId("reset-button").click();
      expect(await urlParam(page, "url-rid-true")).toBeNull();
    });

    test("URL param is retained when removeIfDefault=false", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RemoveIfDefaultComponent
          storageKey="url-rid-false"
          removeIfDefault={false}
        />,
      );
      await c.getByTestId("reset-button").click();
      expect(await urlParam(page, "url-rid-false")).not.toBeNull();
    });
  });

  // ===== 4. Route-scoped storage ==========================================

  test.describe("Route-scoped storage", () => {
    test("writes route key to sessionStorage (default storage)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rss-key"
          storageType="sessionStorage"
        />,
      );
      await c.getByTestId("set-button").click();

      const session = await routeParams(page, "sessionStorage");
      // JSON.stringify("persisted") = '"persisted"'
      expect(session["rss-key"]).toBe('"persisted"');

      // localStorage must NOT receive the route key
      const local = await routeParams(page, "localStorage");
      expect(local["rss-key"]).toBeUndefined();
    });

    test("writes route key to localStorage when storage='localStorage'", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rsl-key"
          storageType="localStorage"
        />,
      );
      await c.getByTestId("set-button").click();

      const local = await routeParams(page, "localStorage");
      expect(local["rsl-key"]).toBe('"persisted"');

      // sessionStorage must NOT receive the route key
      const session = await routeParams(page, "sessionStorage");
      expect(session["rsl-key"]).toBeUndefined();
    });

    test("does NOT write to storage when storage=false", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent storageKey="rs-false" storageType={false} />,
      );
      await c.getByTestId("set-button").click();

      // URL param should still be written
      expect(await urlParam(page, "rs-false")).toBe('"persisted"');

      // Neither storage backend should have the route key
      const session = await page.evaluate(() =>
        sessionStorage.getItem("mp-route:/"),
      );
      const local = await page.evaluate(() =>
        localStorage.getItem("mp-route:/"),
      );
      expect(session).toBeNull();
      expect(local).toBeNull();
    });

    test("does NOT write the raw key directly to storage (route-scoped format only)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rs-direct"
          storageType="sessionStorage"
        />,
      );
      await c.getByTestId("set-button").click();

      const direct = await page.evaluate(() =>
        sessionStorage.getItem("rs-direct"),
      );
      expect(direct).toBeNull();
    });

    test("route key param removed when value resets to default", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rs-rid"
          storageType="sessionStorage"
        />,
      );
      await c.getByTestId("set-button").click();
      expect(
        (await routeParams(page, "sessionStorage"))["rs-rid"],
      ).toBeDefined();

      await c.getByTestId("reset-button").click();
      // Route key removed entirely when no params remain
      expect(
        await page.evaluate(() => sessionStorage.getItem("mp-route:/")),
      ).toBeNull();
    });

    test("subsequent setStates merge into the same route key entry", async ({
      mount,
      page,
    }) => {
      const c = await mount(<MultipleKeysComponent />);

      await c.getByTestId("change-name").click();
      await c.getByTestId("change-page").click();

      const params = await routeParams(page, "sessionStorage");
      // Both keys must coexist in the same route storage entry.
      expect(params["mk-name"]).toBe('"bob"');
      expect(params["mk-page"]).toBe("3");
    });
  });

  // ===== 5. flatUrlParams ==================================================

  test.describe("flatUrlParams (filter-style state)", () => {
    test("each property is written as its own URL param (primitives unquoted)", async ({
      mount,
      page,
    }) => {
      const c = await mount(<FlatFiltersComponent />);
      await c.getByTestId("set-status").click();

      // Primitives use String(), not JSON.stringify → no surrounding quotes
      expect(await urlParam(page, "status")).toBe("active");
    });

    test("numeric param written as plain digit string", async ({
      mount,
      page,
    }) => {
      const c = await mount(<FlatFiltersComponent />);
      await c.getByTestId("set-page").click();

      expect(await urlParam(page, "page")).toBe("3");
    });

    test("flat params written to route-scoped storage", async ({
      mount,
      page,
    }) => {
      const c = await mount(<FlatFiltersComponent />);
      await c.getByTestId("set-status").click();
      await c.getByTestId("set-page").click();

      const params = await routeParams(page, "sessionStorage");
      expect(params["status"]).toBe("active");
      expect(params["page"]).toBe("3");
    });

    test("resetting to default removes default-valued params from URL and storage", async ({
      mount,
      page,
    }) => {
      const c = await mount(<FlatFiltersComponent />);
      await c.getByTestId("set-status").click();
      await c.getByTestId("set-page").click();

      await c.getByTestId("reset").click();

      // Default values: status="all", page=1 → both removed (removeIfDefault=true)
      expect(await urlParam(page, "status")).toBeNull();
      expect(await urlParam(page, "page")).toBeNull();
      // Route key also cleared
      expect(
        await page.evaluate(() => sessionStorage.getItem("mp-route:/")),
      ).toBeNull();
    });

    test("init reads flat values from URL params", async ({ mount, page }) => {
      await page.goto("/?status=active&page=5");
      const c = await mount(<FlatFiltersComponent />);
      await expect(c.getByTestId("status")).toHaveText("active");
      await expect(c.getByTestId("page")).toHaveText("5");
    });
  });

  // ===== 6. Custom serialisation ===========================================

  test.describe("Custom serialisation", () => {
    test("custom serialize function formats the URL param", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <CustomSerializationComponent storageKey="cs-write" />,
      );
      await c.getByTestId("set-custom").click();

      // Custom format: "num:42" (not JSON)
      expect(await urlParam(page, "cs-write")).toBe("num:42");
    });

    test("custom deserialize function parses the URL param on init", async ({
      mount,
      page,
    }) => {
      await page.goto("/?cs-read=num%3A99");
      const c = await mount(
        <CustomSerializationComponent storageKey="cs-read" />,
      );
      await expect(c.getByTestId("custom-value")).toHaveText("99");
    });

    test("falls back to defaultValue when URL param fails custom deserialisation", async ({
      mount,
      page,
    }) => {
      await page.goto("/?cs-err=not-a-num-format");
      const c = await mount(
        <CustomSerializationComponent storageKey="cs-err" />,
      );
      // Deserialiser throws → falls back to defaultValue = 0
      await expect(c.getByTestId("custom-value")).toHaveText("0");
    });

    test("custom serialised value written to route-scoped storage", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <CustomSerializationComponent storageKey="cs-route" />,
      );
      await c.getByTestId("set-custom").click();

      const params = await routeParams(page, "sessionStorage");
      expect(params["cs-route"]).toBe("num:42");
    });
  });
});
