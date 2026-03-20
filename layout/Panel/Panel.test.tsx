import { test, expect } from "@playwright/experimental-ct-react";
import { Panel } from "./Panel";
import { checkA11y } from "../../playwright/test-utils";
import React from "react";

test.describe("Panel Component", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Panel>Panel content</Panel>);

    await expect(component).toBeVisible();
    await expect(component).toHaveText("Panel content");
  });

  test("should render different variants", async ({ mount }) => {
    const component = await mount(
      <div>
        <Panel variant="default">Default</Panel>
        <Panel variant="outlined">Outlined</Panel>
        <Panel variant="elevated">Elevated</Panel>
        <Panel variant="subtle">Subtle</Panel>
      </div>,
    );

    const panels = component.locator(".panel");
    await expect(panels.nth(0)).toHaveClass(/panel--default/);
    await expect(panels.nth(1)).toHaveClass(/panel--outlined/);
    await expect(panels.nth(2)).toHaveClass(/panel--elevated/);
    await expect(panels.nth(3)).toHaveClass(/panel--subtle/);
  });

  test("should render different padding sizes", async ({ mount }) => {
    const component = await mount(
      <div>
        <Panel padding="none">None</Panel>
        <Panel padding="sm">Small</Panel>
        <Panel padding="md">Medium</Panel>
        <Panel padding="lg">Large</Panel>
        <Panel padding="xl">Extra Large</Panel>
      </div>,
    );

    const panels = component.locator(".panel");
    await expect(panels.nth(0)).toHaveClass(/panel--padding-none/);
    await expect(panels.nth(1)).toHaveClass(/panel--padding-sm/);
    await expect(panels.nth(2)).toHaveClass(/panel--padding-md/);
    await expect(panels.nth(3)).toHaveClass(/panel--padding-lg/);
    await expect(panels.nth(4)).toHaveClass(/panel--padding-xl/);
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(
      <Panel className="custom-panel">Content</Panel>,
    );

    await expect(component).toHaveClass(/custom-panel/);
  });

  test("should spread additional props", async ({ mount }) => {
    const component = await mount(
      <Panel data-testid="my-panel" aria-label="Info panel">
        Content
      </Panel>,
    );

    await expect(component).toHaveAttribute("data-testid", "my-panel");
    await expect(component).toHaveAttribute("aria-label", "Info panel");
  });

  // ── Spacing props ───────────────────────────────────────────────────────

  test("should apply uniform padding via p prop", async ({ mount }) => {
    const component = await mount(
      <Panel padding="none" p={4}>
        Content
      </Panel>,
    );

    const paddingTop = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingTop,
    );
    // --spacing-4 = 1rem = 16px at default font size
    expect(paddingTop).toBe("16px");
  });

  test("should apply horizontal padding via px prop", async ({ mount }) => {
    const component = await mount(
      <Panel padding="none" px={6}>
        Content
      </Panel>,
    );

    const paddingLeft = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingLeft,
    );
    const paddingRight = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingRight,
    );
    // --spacing-6 = 1.5rem = 24px at default font size
    expect(paddingLeft).toBe("24px");
    expect(paddingRight).toBe("24px");
  });

  test("should apply vertical padding via py prop", async ({ mount }) => {
    const component = await mount(
      <Panel padding="none" py={4}>
        Content
      </Panel>,
    );

    const paddingTop = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingTop,
    );
    const paddingBottom = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingBottom,
    );
    // --spacing-4 = 1rem = 16px at default font size
    expect(paddingTop).toBe("16px");
    expect(paddingBottom).toBe("16px");
  });

  test("should apply individual padding sides", async ({ mount }) => {
    const component = await mount(
      <Panel padding="none" pt={8} pb={2} pl={4} pr={6}>
        Content
      </Panel>,
    );

    const paddingTop = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingTop,
    );
    const paddingBottom = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingBottom,
    );
    const paddingLeft = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingLeft,
    );
    const paddingRight = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingRight,
    );

    // --spacing-8=32px, --spacing-2=8px, --spacing-4=16px, --spacing-6=24px
    expect(paddingTop).toBe("32px");
    expect(paddingBottom).toBe("8px");
    expect(paddingLeft).toBe("16px");
    expect(paddingRight).toBe("24px");
  });

  test("should apply uniform margin via m prop", async ({ mount }) => {
    const component = await mount(<Panel m={4}>Content</Panel>);

    const margin = await component.evaluate(
      (el) => window.getComputedStyle(el).margin,
    );
    expect(margin).toBeTruthy();
  });

  test("should apply horizontal margin via mx prop", async ({ mount }) => {
    const component = await mount(
      <Panel mx="auto">Content</Panel>,
    );

    const marginLeft = await component.evaluate(
      (el) => window.getComputedStyle(el).marginLeft,
    );
    const marginRight = await component.evaluate(
      (el) => window.getComputedStyle(el).marginRight,
    );
    expect(marginLeft).toBeTruthy();
    expect(marginRight).toBe(marginLeft);
  });

  test("should apply vertical margin via my prop", async ({ mount }) => {
    const component = await mount(<Panel my={4}>Content</Panel>);

    const marginTop = await component.evaluate(
      (el) => window.getComputedStyle(el).marginTop,
    );
    const marginBottom = await component.evaluate(
      (el) => window.getComputedStyle(el).marginBottom,
    );
    expect(marginTop).toBeTruthy();
    expect(marginBottom).toBe(marginTop);
  });

  test("should apply individual margin sides", async ({ mount }) => {
    const component = await mount(
      <Panel mt={8} mb={2} ml={4} mr={6}>Content</Panel>,
    );

    const marginTop = await component.evaluate(
      (el) => window.getComputedStyle(el).marginTop,
    );
    const marginBottom = await component.evaluate(
      (el) => window.getComputedStyle(el).marginBottom,
    );
    const marginLeft = await component.evaluate(
      (el) => window.getComputedStyle(el).marginLeft,
    );
    const marginRight = await component.evaluate(
      (el) => window.getComputedStyle(el).marginRight,
    );

    expect(marginTop).not.toBe(marginBottom);
    expect(marginLeft).not.toBe(marginRight);
  });

  test("should allow raw CSS string spacing values", async ({ mount }) => {
    const component = await mount(
      <Panel p="1.5rem" mt="10px">Content</Panel>,
    );

    const padding = await component.evaluate(
      (el) => window.getComputedStyle(el).padding,
    );
    expect(padding).toBeTruthy();
  });

  test("should merge spacing styles with custom style prop", async ({ mount }) => {
    const component = await mount(
      <Panel p={4} style={{ color: "red" }}>Content</Panel>,
    );

    const color = await component.evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    expect(color).toBeTruthy();
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <Panel variant="elevated" p={4}>
        <p>Accessible panel content</p>
      </Panel>,
    );

    await checkA11y(page);
  });

  test("should pass accessibility checks with spacing props", async ({
    mount,
    page,
  }) => {
    await mount(
      <div>
        <Panel variant="default" px={6} py={4} mb={4}>
          <p>Panel with spacing props</p>
        </Panel>
        <Panel variant="outlined" p={4} mt={2}>
          <p>Another panel</p>
        </Panel>
      </div>,
    );

    await checkA11y(page);
  });
});
