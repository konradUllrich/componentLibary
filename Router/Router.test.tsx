import { test, expect } from "@playwright/experimental-ct-react";
import { Router, Route, Link } from "./index";

test.describe("Router Component", () => {
  test("should render children", async ({ mount }) => {
    const component = await mount(
      <Router>
        <div>App content</div>
      </Router>,
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText("App content");
  });

  test("should render a Route component", async ({ mount }) => {
    const component = await mount(
      <Router>
        <Route path="/">
          <div>Home page</div>
        </Route>
      </Router>,
    );
    await expect(component).toContainText("Home page");
  });

  test("should render a Link component", async ({ mount }) => {
    const component = await mount(
      <Router>
        <Link href="/about">About</Link>
      </Router>,
    );
    const link = component.locator("a");
    await expect(link).toBeVisible();
    await expect(link).toHaveText("About");
  });
});
