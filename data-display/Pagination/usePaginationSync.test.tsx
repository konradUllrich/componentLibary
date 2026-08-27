import { test, expect } from "../../playwright/coverage-fixtures";
import React from "react";
import {
  PaginationSyncTestWrapper,
  TwoSyncedPaginationsWrapper,
} from "./usePaginationSync.stories";
import { PaginationTestWrapper } from "./Pagination.stories";
import { checkA11y } from "../../playwright/test-utils";

type TestPage = import("@playwright/test").Page;

/** Read a single search param from the live browser URL inside the CT iframe. */
async function getUrlParam(page: TestPage, name: string) {
  return page.evaluate(
    (paramName) => new URLSearchParams(window.location.search).get(paramName),
    name,
  );
}

/** Inject search params into the URL *before* mounting so the hook can restore them. */
async function setUrlParams(page: TestPage, params: Record<string, string>) {
  await page.evaluate((entries) => {
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(entries)) {
      url.searchParams.set(k, v);
    }
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, params);
}

/** Remove search params from the URL (cleanup between tests). */
async function clearUrlParams(page: TestPage, ...names: string[]) {
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

test.describe("usePaginationSync", () => {
  // Clear default params after every test so they never bleed into the next.
  test.afterEach(async ({ page }) => {
    await clearUrlParams(
      page,
      "page",
      "pageSize",
      "tableA_page",
      "tableA_pageSize",
      "tableB_page",
      "tableB_pageSize",
      "p",
      "size",
    );
  });

  // -------------------------------------------------------------------------
  // URL → Store (restore on mount)
  // -------------------------------------------------------------------------

  test("restores page from URL params on mount", async ({ mount, page }) => {
    await setUrlParams(page, { page: "4", pageSize: "10" });

    const component = await mount(
      <PaginationSyncTestWrapper totalItems={100} />,
    );

    await expect(component.locator(".mp-pagination__info")).toContainText(
      "31 bis 40 von 100 Einträge",
    );
  });

  test("applies pageSize from URL before page so clamping is correct", async ({
    mount,
    page,
  }) => {
    // 60 items ÷ pageSize 20 = 3 total pages → page 3 is valid
    await setUrlParams(page, { page: "3", pageSize: "20" });

    const component = await mount(
      <PaginationSyncTestWrapper totalItems={60} pageSize={10} />,
    );

    await expect(component.locator(".mp-pagination__info")).toContainText(
      "41 bis 60 von 60 Einträge",
    );
  });

  test("ignores invalid URL params and keeps store defaults", async ({
    mount,
    page,
  }) => {
    await setUrlParams(page, { page: "abc", pageSize: "-5" });

    const component = await mount(
      <PaginationSyncTestWrapper totalItems={100} />,
    );

    // Invalid values → store stays on page 1 with default pageSize 10
    await expect(component.locator(".mp-pagination__info")).toContainText(
      "1 bis 10 von 100 Einträge",
    );
  });

  // -------------------------------------------------------------------------
  // Store → URL (write on navigation)
  // -------------------------------------------------------------------------

  test("writes page param to URL when navigating to next page", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <PaginationSyncTestWrapper totalItems={100} />,
    );

    await component.locator(".mp-pagination-button--next").click();

    expect(await getUrlParam(page, "page")).toBe("2");
  });

  test("writes pageSize param to URL when page size is changed", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <PaginationSyncTestWrapper totalItems={100} />,
    );

    await component.locator("#pageSize").selectOption("20");

    expect(await getUrlParam(page, "pageSize")).toBe("20");
  });

  test("uses replace navigation so clicking next does not add history entries", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <PaginationSyncTestWrapper totalItems={100} />,
    );

    const historyBefore = await page.evaluate(() => window.history.length);

    await component.locator(".mp-pagination-button--next").click();
    await component.locator(".mp-pagination-button--next").click();

    // history.length must not grow (replace: true)
    expect(await page.evaluate(() => window.history.length)).toBe(
      historyBefore,
    );
  });

  // -------------------------------------------------------------------------
  // key namespacing
  // -------------------------------------------------------------------------

  test("namespaces URL params using the key option", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <PaginationSyncTestWrapper totalItems={100} syncKey="tableA" />,
    );

    await component.locator(".mp-pagination-button--next").click();

    expect(await getUrlParam(page, "tableA_page")).toBe("2");
    expect(await getUrlParam(page, "page")).toBeNull();
  });

  test("two keyed stores do not overwrite each other's URL params", async ({
    mount,
    page,
  }) => {
    const component = await mount(<TwoSyncedPaginationsWrapper />);
    const nextButtons = component.locator(".mp-pagination-button--next");

    await nextButtons.first().click();
    await nextButtons.last().click();
    await nextButtons.last().click();

    expect(await getUrlParam(page, "tableA_page")).toBe("2");
    expect(await getUrlParam(page, "tableB_page")).toBe("3");
  });

  test("restores each keyed store independently from URL", async ({
    mount,
    page,
  }) => {
    await setUrlParams(page, {
      tableA_page: "3",
      tableA_pageSize: "10",
      tableB_page: "2",
      tableB_pageSize: "5",
    });

    const component = await mount(<TwoSyncedPaginationsWrapper />);
    const infos = component.locator(".mp-pagination__info");

    await expect(infos.nth(0)).toContainText("21 bis 30 von 100 Einträge");
    await expect(infos.nth(1)).toContainText("6 bis 10 von 60 Einträge");
  });

  // -------------------------------------------------------------------------
  // Custom param names
  // -------------------------------------------------------------------------

  test("supports custom pageParam and pageSizeParam names", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <PaginationSyncTestWrapper
        totalItems={100}
        pageParam="p"
        pageSizeParam="size"
      />,
    );

    await component.locator(".mp-pagination-button--next").click();

    expect(await getUrlParam(page, "p")).toBe("2");
    expect(await getUrlParam(page, "page")).toBeNull();
  });

  test("restores from custom-named URL params on mount", async ({
    mount,
    page,
  }) => {
    await setUrlParams(page, { p: "5", size: "10" });

    const component = await mount(
      <PaginationSyncTestWrapper
        totalItems={100}
        pageParam="p"
        pageSizeParam="size"
      />,
    );

    await expect(component.locator(".mp-pagination__info")).toContainText(
      "41 bis 50 von 100 Einträge",
    );
  });

  // -------------------------------------------------------------------------
  // Unsynced store is unaffected
  // -------------------------------------------------------------------------

  test("unsynced Pagination component does not write to URL", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <PaginationTestWrapper totalItems={100} pageSize={10} />,
    );

    await component.locator(".mp-pagination-button--next").click();

    expect(await getUrlParam(page, "page")).toBeNull();
  });

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------

  test("has no accessibility violations", async ({ mount, page }) => {
    await mount(<PaginationSyncTestWrapper totalItems={100} />);
    await checkA11y(page);
  });
});
