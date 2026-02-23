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
    await expect(component.getByText("App content")).toBeVisible();
  });

  test("should render a Route matching the default path", async ({ mount }) => {
    const component = await mount(
      <Router>
        <Route path="/">Home page</Route>
      </Router>,
    );
    await expect(component.getByText("Home page")).toBeVisible();
  });

  test("should not render a Route that does not match", async ({ mount }) => {
    const component = await mount(
      <Router>
        <Route path="/other">Other page</Route>
        <Route path="/">Home page</Route>
      </Router>,
    );
    await expect(component.getByText("Home page")).toBeVisible();
    await expect(component.getByText("Other page")).not.toBeVisible();
  });

  test("should render Link as an anchor element", async ({ mount }) => {
    const component = await mount(
      <Router>
        <Link href="/about">About</Link>
      </Router>,
    );
    const link = component.getByRole("link", { name: "About" });
    await expect(link).toBeVisible();
  });

  test("should navigate when a Link is clicked", async ({ mount, page }) => {
    const component = await mount(
      <Router>
        <Link href="/about">Go to About</Link>
        <Route path="/">Home</Route>
        <Route path="/about">About page</Route>
      </Router>,
    );

    await expect(component.getByText("Home")).toBeVisible();
    await expect(component.getByText("About page")).not.toBeVisible();

    await component.getByRole("link", { name: "Go to About" }).click();

    await expect(component.getByText("About page")).toBeVisible();
  });

  test("should update the URL search param when navigating", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <Router>
        <Link href="/about">Go to About</Link>
        <Route path="/">Home</Route>
        <Route path="/about">About page</Route>
      </Router>,
    );

    await component.getByRole("link", { name: "Go to About" }).click();
    await expect(component.getByText("About page")).toBeVisible();
    await expect(page.url()).toContain("appRoute=%2Fabout");
  });

  test("should render multiple routes independently", async ({ mount }) => {
    const component = await mount(
      <Router>
        <Link href="/page-a">Page A</Link>
        <Link href="/page-b">Page B</Link>
        <Route path="/page-a">Content A</Route>
        <Route path="/page-b">Content B</Route>
        <Route path="/">Default</Route>
      </Router>,
    );

    await expect(component.getByText("Default")).toBeVisible();

    await component.getByRole("link", { name: "Page A" }).click();
    await expect(component.getByText("Content A")).toBeVisible();
    await expect(component.getByText("Content B")).not.toBeVisible();

    await component.getByRole("link", { name: "Page B" }).click();
    await expect(component.getByText("Content B")).toBeVisible();
    await expect(component.getByText("Content A")).not.toBeVisible();
  });
});
