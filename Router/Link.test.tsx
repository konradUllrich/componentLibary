import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import { Router } from "./index";
import { Link } from "./Link";

test.describe("Link", () => {
  test("renders default variant with correct classes", async ({
    mount,
    page,
  }) => {
    await mount(
      <Router>
        <Link href="/test">Home</Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toBeVisible();
    await expect(anchor).toHaveClass(/mp-link--default/);
  });

  test("renders subtle variant with correct class", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="/test" variant="subtle">
          Subtle
        </Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toHaveClass(/mp-link--subtle/);
  });

  test("renders button variant with size class", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="/test" variant="button">
          Sign up
        </Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toHaveClass(/mp-link--button/);
    await expect(anchor).toHaveClass(/mp-link--md/);
  });

  test("renders button variant with explicit size", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="/test" variant="button" size="lg">
          Large button
        </Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toHaveClass(/mp-link--button/);
    await expect(anchor).toHaveClass(/mp-link--lg/);
  });

  test("isExternal adds target and rel attributes", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="https://example.com" isExternal>
          External
        </Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toHaveAttribute("target", "_blank");
    await expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("isExternal includes visually hidden opens-in-new-tab text", async ({
    mount,
    page,
  }) => {
    await mount(
      <Router>
        <Link href="https://example.com" isExternal>
          External
        </Link>
      </Router>,
    );
    const srOnly = page.locator(".sr-only");
    await expect(srOnly).toBeAttached();
    await expect(srOnly).toHaveText(" (opens in new tab)");
  });

  test("custom className is applied", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="/test" className="my-custom-class">
          Custom
        </Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toHaveClass(/my-custom-class/);
  });

  test("children render correctly", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="/test">Hello world</Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toContainText("Hello world");
  });

  test("href is passed through to the anchor element", async ({
    mount,
    page,
  }) => {
    await mount(
      <Router>
        <Link href="/about">About</Link>
      </Router>,
    );
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toHaveAttribute("href", "/about");
  });

  test("is keyboard focusable", async ({ mount, page }) => {
    await mount(
      <Router>
        <Link href="/test">Focus me</Link>
      </Router>,
    );
    await page.keyboard.press("Tab");
    const anchor = page.locator("a.mp-link");
    await expect(anchor).toBeFocused();
  });
});
