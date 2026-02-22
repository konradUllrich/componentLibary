import { test, expect } from "@playwright/experimental-ct-react";
import { Section } from "./Section";

test.describe("Section", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Section>Content</Section>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText("Content");
  });

  test("should render as section element by default", async ({ mount, page }) => {
    await mount(<Section>Content</Section>);
    const el = page.locator("section.section");
    await expect(el).toBeVisible();
  });

  test("should apply default variant class", async ({ mount }) => {
    const component = await mount(<Section>Content</Section>);
    await expect(component).toHaveClass(/section--default/);
  });

  test("should apply hero variant class", async ({ mount }) => {
    const component = await mount(<Section variant="hero">Content</Section>);
    await expect(component).toHaveClass(/section--hero/);
  });

  test("should render as div when as='div'", async ({ mount, page }) => {
    await mount(<Section as="div">Content</Section>);
    const el = page.locator("div.section");
    await expect(el).toBeVisible();
  });

  test("should forward additional props", async ({ mount }) => {
    const component = await mount(
      <Section data-testid="my-section">Content</Section>,
    );
    await expect(component).toHaveAttribute("data-testid", "my-section");
  });

  test("should merge custom className", async ({ mount }) => {
    const component = await mount(
      <Section className="custom-class">Content</Section>,
    );
    await expect(component).toHaveClass(/custom-class/);
    await expect(component).toHaveClass(/section/);
  });
});
