import { test, expect } from "@playwright/experimental-ct-react";
import { Router } from "./index";
import {
  LocationDisplay,
  SearchDisplay,
  NavigateWithSearch,
  RouteChecker,
  MatchWithNav,
  ParamsScene,
  NavigateWithQuery,
} from "./RouterHookTestComponents";

test.describe("Router Hooks", () => {
  test.describe("useLocation", () => {
    test("should return '/' as the default location", async ({
      mount,
      page,
    }) => {
      await mount(
        <Router>
          <LocationDisplay />
        </Router>,
      );
      await expect(page.getByTestId("location")).toHaveText("/");
    });

    test("should update location after programmatic navigation", async ({
      mount,
      page,
    }) => {
      await mount(
        <Router>
          <LocationDisplay />
        </Router>,
      );
      await expect(page.getByTestId("location")).toHaveText("/");
      await page.getByRole("button", { name: "navigate" }).click();
      await expect(page.getByTestId("location")).toHaveText("/about");
    });
  });

  test.describe("useSearch", () => {
    test("should return empty string when there are no search params", async ({
      mount,
      page,
    }) => {
      await mount(
        <Router>
          <SearchDisplay />
        </Router>,
      );
      await expect(page.getByTestId("search")).toHaveText("empty");
    });

    test("should reflect search portion after navigating with query string", async ({
      mount,
      page,
    }) => {
      await mount(
        <Router>
          <NavigateWithSearch />
        </Router>,
      );
      await page.getByRole("button", { name: "search" }).click();
      await expect(page.getByTestId("search")).toHaveText("q=hello");
    });
  });

  test.describe("useRoute", () => {
    test("should match the current path", async ({ mount, page }) => {
      await mount(
        <Router>
          <RouteChecker path="/" />
        </Router>,
      );
      await expect(page.getByTestId("match")).toHaveText("matched");
    });

    test("should not match a different path", async ({ mount, page }) => {
      await mount(
        <Router>
          <RouteChecker path="/other" />
        </Router>,
      );
      await expect(page.getByTestId("match")).toHaveText("no match");
    });

    test("should update match after navigation", async ({ mount, page }) => {
      await mount(
        <Router>
          <MatchWithNav />
        </Router>,
      );
      await expect(page.getByTestId("match")).toHaveText("no match");
      await page.getByRole("button", { name: "go" }).click();
      await expect(page.getByTestId("match")).toHaveText("matched");
    });
  });

  test.describe("useParams", () => {
    test("should return route params for a matching parameterised route", async ({
      mount,
      page,
    }) => {
      await mount(
        <Router>
          <ParamsScene />
        </Router>,
      );
      await page.getByRole("link", { name: "Go" }).click();
      await expect(page.getByTestId("params")).toHaveText("42");
    });
  });

  test.describe("useSearchParams", () => {
    test("should parse search params from the appRoute query string", async ({
      mount,
      page,
    }) => {
      await mount(
        <Router>
          <NavigateWithQuery />
        </Router>,
      );
      await expect(page.getByTestId("search-params")).toHaveText("none");
      await page.getByRole("button", { name: "query" }).click();
      await expect(page.getByTestId("search-params")).toHaveText("world");
    });
  });
});
