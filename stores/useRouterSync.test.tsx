import { test, expect } from "@playwright/experimental-ct-react";
import type { Page } from "@playwright/test";
import React from "react";
import {
  RouterSyncFilterWrapper,
  RouterSyncSortingWrapper,
  RouterSyncValueWrapper,
} from "./useRouterSync.stories";

/** Read a single search param from the live browser URL inside the CT iframe. */
async function getUrlParam(page: Page, name: string) {
  return page.evaluate(
    (paramName) => new URLSearchParams(window.location.search).get(paramName),
    name,
  );
}

/** Inject search params into the URL before mounting so the hook can restore them. */
async function setUrlParams(page: Page, params: Record<string, string>) {
  await page.evaluate((entries) => {
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(entries)) {
      url.searchParams.set(k, v);
    }
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, params);
}

/** Remove search params from the URL between tests. */
async function clearUrlParams(page: Page, ...names: string[]) {
  await page.evaluate((keys) => {
    const url = new URL(window.location.href);
    for (const k of keys) url.searchParams.delete(k);
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, names);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("useRouterSync", () => {
  test.afterEach(async ({ page }) => {
    await clearUrlParams(page, "status", "category", "sort", "theme");
  });

  // -------------------------------------------------------------------------
  // Store → URL
  // -------------------------------------------------------------------------

  test("writes store state to URL on change (filterStore)", async ({
    mount,
    page,
  }) => {
    await mount(<RouterSyncFilterWrapper />);
    await page.getByText("set status=inactive").click();
    expect(await getUrlParam(page, "status")).toBe("inactive");
  });

  test("removes empty params from URL (filterStore)", async ({
    mount,
    page,
  }) => {
    const component = await mount(<RouterSyncFilterWrapper />);
    await component.getByText("set status=inactive").click();
    await component.getByText("clear").click();
    // after clear, filters are {}, so serialize returns '' → param is deleted
    expect(await getUrlParam(page, "status")).toBeNull();
  });

  test("writes sort columns to URL (sortingStore)", async ({ mount, page }) => {
    await mount(<RouterSyncSortingWrapper />);
    await page.getByText("set name asc").click();
    expect(await getUrlParam(page, "sort")).toBe("name:asc");
  });

  test("encodes multiple sort columns in a single param", async ({
    mount,
    page,
  }) => {
    await mount(<RouterSyncSortingWrapper />);
    await page.getByText("set name asc").click();
    await page.getByText("set age desc").click();
    expect(await getUrlParam(page, "sort")).toBe("name:asc,age:desc");
  });

  test("writes value store to URL", async ({ mount, page }) => {
    await mount(<RouterSyncValueWrapper />);
    await page.getByText("set dark").click();
    expect(await getUrlParam(page, "theme")).toBe("dark");
  });

  // -------------------------------------------------------------------------
  // URL → Store (restore on mount)
  // -------------------------------------------------------------------------

  test("restores filterStore state from URL on mount", async ({
    mount,
    page,
  }) => {
    await setUrlParams(page, { status: "archived", category: "news" });
    const component = await mount(<RouterSyncFilterWrapper />);
    await expect(component.getByTestId("filters")).toContainText(
      '"status":"archived"',
    );
    await expect(component.getByTestId("filters")).toContainText(
      '"category":"news"',
    );
  });

  test("restores sortingStore state from URL on mount", async ({
    mount,
    page,
  }) => {
    await setUrlParams(page, { sort: "name:asc,age:desc" });
    const component = await mount(<RouterSyncSortingWrapper />);
    const text = await component.getByTestId("sort").textContent();
    expect(text).toContain('"key":"name"');
    expect(text).toContain('"key":"age"');
  });

  test("restores valueStore state from URL on mount", async ({
    mount,
    page,
  }) => {
    await setUrlParams(page, { theme: "dark" });
    const component = await mount(<RouterSyncValueWrapper />);
    await expect(component.getByTestId("value")).toHaveText("dark");
  });
});
