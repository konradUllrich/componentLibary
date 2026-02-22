import { test, expect } from "@playwright/experimental-ct-react";
import { Page } from "./Page";

test.describe("Page", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Page>Content</Page>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText("Content");
  });

  test("should apply default lg max-width class", async ({ mount }) => {
    const component = await mount(<Page>Content</Page>);
    await expect(component).toHaveClass(/page--lg/);
  });

  test("should apply sm max-width variant", async ({ mount }) => {
    const component = await mount(<Page maxWidth="sm">Content</Page>);
    await expect(component).toHaveClass(/page--sm/);
  });

  test("should apply xl max-width variant", async ({ mount }) => {
    const component = await mount(<Page maxWidth="xl">Content</Page>);
    await expect(component).toHaveClass(/page--xl/);
  });

  test("should apply full max-width variant", async ({ mount }) => {
    const component = await mount(<Page maxWidth="full">Content</Page>);
    await expect(component).toHaveClass(/page--full/);
  });

  test("should forward additional props", async ({ mount }) => {
    const component = await mount(
      <Page data-testid="my-page">Content</Page>,
    );
    await expect(component).toHaveAttribute("data-testid", "my-page");
  });

  test("should merge custom className", async ({ mount }) => {
    const component = await mount(
      <Page className="custom-class">Content</Page>,
    );
    await expect(component).toHaveClass(/custom-class/);
    await expect(component).toHaveClass(/page/);
  });
});
