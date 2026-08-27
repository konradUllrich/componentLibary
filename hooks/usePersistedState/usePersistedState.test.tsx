/**
 * usePersistedState test suite
 *
 * Storage model being tested:
 * - No direct `key → value` writes to any Web Storage. That format is gone.
 * - setState (syncUrl=true) writes:
 *     1. URL search param            key=%22value%22
 *     2. Route-scoped storage key    `${routeStatePrefix}:${currentPath}`
 *        as a URLSearchParams blob:  key=%22value%22
 * - `storage` option picks the backend for the route key:
 *     "localStorage" (default) → localStorage["mp-route:/"]
 *     "sessionStorage" | false → sessionStorage["mp-route:/"]
 * - Init reads URL params only; falls back to defaultValue.
 * - syncUrl=false  → pure React state (nothing persisted).
 *
 * Helper: routeParams(page, backend)
 *   Reads the route key from the given storage backend and returns a
 *   parsed URLSearchParams object so individual params can be asserted.
 */
import { test, expect } from "@playwright/experimental-ct-react";
import {
  PersistedStateDisplay,
  PersistedObjectState,
  CustomSerializationComponent,
  RemoveIfDefaultComponent,
  MultipleKeysComponent,
  DeserializationErrorComponent,
  RouterPersistedState,
  RouteStorageComponent,
  SyncUrlComponent,
  FlatFiltersComponent,
  CrossInstanceSyncComponent,
} from "./usePersistedState.test-components";
import type { Page } from "@playwright/test";

// ─── helpers ─────────────────────────────────────────────────────

/** Read route-scoped URLSearchParams from a storage backend. */
async function routeParams(
  page: Page,
  backend: "localStorage" | "sessionStorage" = "localStorage",
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

// ────────────────────────────────────────────────────────────────────────────

test.describe("usePersistedState", () => {
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  // ===== 1. State Management ================================================

  test.describe("State Management", () => {
    test("initialises with the default value", async ({ mount }) => {
      const c = await mount(
        <PersistedStateDisplay storageKey="sm-init" defaultValue="hello" />,
      );
      await expect(c.getByTestId("state-value")).toHaveText("hello");
    });

    test("updates state with a literal value", async ({ mount }) => {
      const c = await mount(
        <PersistedStateDisplay
          storageKey="sm-literal"
          defaultValue="initial"
        />,
      );
      await c.getByTestId("update-button").click();
      await expect(c.getByTestId("state-value")).toHaveText("updated");
    });

    test("updates state with a functional updater – receives previous value", async ({
      mount,
    }) => {
      const c = await mount(
        <PersistedStateDisplay storageKey="sm-fn" defaultValue="base" />,
      );
      await c.getByTestId("modify-button").click();
      await expect(c.getByTestId("state-value")).toHaveText("base-modified");
    });

    test("functional updater always uses the latest state (rapid clicks)", async ({
      mount,
    }) => {
      const c = await mount(
        <PersistedStateDisplay storageKey="sm-rapid" defaultValue="x" />,
      );
      for (let i = 0; i < 4; i++) {
        await c.getByTestId("modify-button").click();
      }
      await expect(c.getByTestId("state-value")).toHaveText(
        "x-modified-modified-modified-modified",
      );
    });

    test("object state: updates via functional updater preserves unchanged keys", async ({
      mount,
    }) => {
      const c = await mount(<PersistedObjectState storageKey="sm-obj" />);
      await c.getByTestId("increment-button").click();
      await c.getByTestId("increment-button").click();
      await expect(c.getByTestId("object-name")).toHaveText("test");
      await expect(c.getByTestId("object-count")).toHaveText("2");
    });
  });

  // ===== 2. URL Sync (syncUrl=true) =========================================

  test.describe("URL synchronisation", () => {
    test("setState writes a URL search param (JSON-serialised value)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <PersistedStateDisplay storageKey="url-write" defaultValue="start" />,
      );
      await c.getByTestId("update-button").click();
      const param = await urlParam(page, "url-write");
      // JSON.stringify("updated") = '"updated"'
      expect(param).toBe('"updated"');
    });

    test("init reads URL search param (takes priority over defaultValue)", async ({
      mount,
      page,
    }) => {
      // Pre-set a URL param before mounting
      await page.goto(
        `/?url-init=${encodeURIComponent(JSON.stringify("from-url"))}`,
      );
      const c = await mount(
        <PersistedStateDisplay storageKey="url-init" defaultValue="default" />,
      );
      await expect(c.getByTestId("state-value")).toHaveText("from-url");
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

    test("Router context: init reads from appRoute-encoded URL param", async ({
      mount,
      page,
    }) => {
      // appRoute value: /?rps-key=%22from-url%22  (double-encoded for the outer URL)
      await page.goto("/?appRoute=%2F%3Frps-key%3D%2522from-url%2522");
      const c = await mount(
        <RouterPersistedState
          storageKey="rps-key"
          defaultValue="from-default"
        />,
      );
      await expect(c.getByTestId("router-state-value")).toHaveText("from-url");
    });
  });

  // ===== 3. Route-Scoped Storage ==========================================

  test.describe("Route-scoped storage", () => {
    test("writes route key to sessionStorage when storage='sessionStorage'", async ({
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

    test("writes route key to localStorage when storage='localStorage' (default)", async ({
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

    test("does NOT write the raw key directly to localStorage (old format is gone)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rsl-direct"
          storageType="localStorage"
        />,
      );
      await c.getByTestId("set-button").click();

      // Direct key must be absent
      const direct = await page.evaluate(() =>
        localStorage.getItem("rsl-direct"),
      );
      expect(direct).toBeNull();
    });

    test("does NOT write the raw key directly to sessionStorage (old format is gone)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rss-direct"
          storageType="sessionStorage"
        />,
      );
      await c.getByTestId("set-button").click();

      const direct = await page.evaluate(() =>
        sessionStorage.getItem("rss-direct"),
      );
      expect(direct).toBeNull();
    });

    test("subsequent setStates merge into the same route key entry", async ({
      mount,
      page,
    }) => {
      const c = await mount(<MultipleKeysComponent />);

      await c.getByTestId("change-name").click();
      await c.getByTestId("change-page").click();

      const params = await routeParams(page, "localStorage");
      // Both keys must coexist in the same route storage entry.
      expect(params["mk-name"]).toBe('"bob"');
      expect(params["mk-page"]).toBe("3");
    });

    test("route key param removed when value resets to default (removeIfDefault=true)", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rss-rid"
          storageType="sessionStorage"
        />,
      );
      await c.getByTestId("set-button").click();
      expect(
        (await routeParams(page, "sessionStorage"))["rss-rid"],
      ).toBeDefined();

      await c.getByTestId("reset-button").click();
      // Entry removed (empty URLSearchParams → key removed from storage)
      expect(
        await page.evaluate(() => sessionStorage.getItem("mp-route:/")),
      ).toBeNull();
    });

    test("does NOT write route key when syncUrl=false", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <SyncUrlComponent storageKey="rss-no-sync" syncUrl={false} />,
      );
      await c.getByTestId("set-button").click();

      const sessionEntry = await page.evaluate(() =>
        sessionStorage.getItem("mp-route:/"),
      );
      const localEntry = await page.evaluate(() =>
        localStorage.getItem("mp-route:/"),
      );
      expect(sessionEntry).toBeNull();
      expect(localEntry).toBeNull();
    });
  });

  // ===== 4. syncUrl=false ==================================================

  test.describe("syncUrl=false (pure React state)", () => {
    test("state updates work without URL or storage side-effects", async ({
      mount,
    }) => {
      const c = await mount(
        <SyncUrlComponent storageKey="nourl-state" syncUrl={false} />,
      );
      await c.getByTestId("set-button").click();
      await expect(c.getByTestId("sync-url-value")).toHaveText("updated");
    });

    test("URL param is NOT written", async ({ mount, page }) => {
      const c = await mount(
        <SyncUrlComponent storageKey="nourl-write" syncUrl={false} />,
      );
      await c.getByTestId("set-button").click();
      expect(await urlParam(page, "nourl-write")).toBeNull();
    });

    test("URL param is NOT read on init", async ({ mount, page }) => {
      await page.goto(
        `/?nourl-init=${encodeURIComponent(JSON.stringify("from-url"))}`,
      );
      const c = await mount(
        <SyncUrlComponent storageKey="nourl-init" syncUrl={false} />,
      );
      await expect(c.getByTestId("sync-url-value")).toHaveText("initial");
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

      const params = await routeParams(page, "localStorage");
      expect(params["status"]).toBe("active");
      expect(params["page"]).toBe("3");
    });

    test("resetting to default removes default-valued params from URL and route storage", async ({
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
        await page.evaluate(() => localStorage.getItem("mp-route:/")),
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

      const params = await routeParams(page, "localStorage");
      expect(params["cs-route"]).toBe("num:42");
    });
  });

  // ===== 7. removeIfDefault ===============================================

  test.describe("removeIfDefault behaviour", () => {
    test("removeIfDefault=true: URL param removed when value equals defaultValue", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RemoveIfDefaultComponent
          storageKey="rid-url-true"
          removeIfDefault={true}
        />,
      );
      await c.getByTestId("set-custom-button").click();
      expect(await urlParam(page, "rid-url-true")).not.toBeNull();

      await c.getByTestId("reset-button").click();
      expect(await urlParam(page, "rid-url-true")).toBeNull();
    });

    test("removeIfDefault=false: URL param kept when value equals defaultValue", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RemoveIfDefaultComponent
          storageKey="rid-url-false"
          removeIfDefault={false}
        />,
      );
      await c.getByTestId("reset-button").click();
      expect(await urlParam(page, "rid-url-false")).not.toBeNull();
    });

    test("removeIfDefault=true: route storage param removed when value equals defaultValue", async ({
      mount,
      page,
    }) => {
      const c = await mount(
        <RouteStorageComponent
          storageKey="rid-route"
          storageType="sessionStorage"
        />,
      );
      await c.getByTestId("set-button").click();
      expect(
        (await routeParams(page, "sessionStorage"))["rid-route"],
      ).toBeDefined();

      await c.getByTestId("reset-button").click();
      // Route key entry removed because URLSearchParams is now empty
      expect(
        await page.evaluate(() => sessionStorage.getItem("mp-route:/")),
      ).toBeNull();
    });
  });

  // ===== 8. Error handling =================================================

  test.describe("Error handling", () => {
    test("falls back to defaultValue when URL param is invalid JSON", async ({
      mount,
      page,
    }) => {
      await page.goto("/?err-json=%22invalid"); // Broken JSON string
      const c = await mount(
        <PersistedStateDisplay
          storageKey="err-json"
          defaultValue="safe-default"
        />,
      );
      await expect(c.getByTestId("state-value")).toHaveText("safe-default");
    });

    test("falls back to defaultValue on custom deserialiser error", async ({
      mount,
      page,
    }) => {
      await page.goto("/?err-custom=broken");
      const c = await mount(
        <DeserializationErrorComponent storageKey="err-custom" />,
      );
      await expect(c.getByTestId("error-fallback-value")).toHaveText(
        "fallback",
      );
    });
  });

  // ===== 9. Cross-instance URL sync ========================================

  test.describe("Cross-instance URL sync (within Router)", () => {
    test("instance B reflects instance A's update via URL reactive effect", async ({
      mount,
    }) => {
      const c = await mount(
        <CrossInstanceSyncComponent
          storageKey="ci-set"
          defaultValue="initial"
        />,
      );
      await expect(c.getByTestId("instance-a-value")).toHaveText("initial");
      await expect(c.getByTestId("instance-b-value")).toHaveText("initial");

      await c.getByTestId("instance-a-set").click();

      await expect(c.getByTestId("instance-a-value")).toHaveText("from-a");
      await expect(c.getByTestId("instance-b-value")).toHaveText("from-a");
    });

    test("instance B reverts when instance A resets to default", async ({
      mount,
    }) => {
      const c = await mount(
        <CrossInstanceSyncComponent
          storageKey="ci-reset"
          defaultValue="initial"
        />,
      );
      await c.getByTestId("instance-a-set").click();
      await expect(c.getByTestId("instance-b-value")).toHaveText("from-a");

      await c.getByTestId("instance-a-reset").click();
      await expect(c.getByTestId("instance-b-value")).toHaveText("initial");
    });
  });
});
