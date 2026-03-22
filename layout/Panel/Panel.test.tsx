import { test, expect } from "@playwright/experimental-ct-react";
import { Panel } from "./Panel";
import { PanelHeader } from "./PanelHeader";
import { PanelBody } from "./PanelBody";
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

    const panels = component.locator(".mp-panel");
    await expect(panels.nth(0)).toHaveClass(/mp-panel--default/);
    await expect(panels.nth(1)).toHaveClass(/mp-panel--outlined/);
    await expect(panels.nth(2)).toHaveClass(/mp-panel--elevated/);
    await expect(panels.nth(3)).toHaveClass(/mp-panel--subtle/);
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

    const panels = component.locator(".mp-panel");
    await expect(panels.nth(0)).toHaveClass(/mp-panel--padding-none/);
    await expect(panels.nth(1)).toHaveClass(/mp-panel--padding-sm/);
    await expect(panels.nth(2)).toHaveClass(/mp-panel--padding-md/);
    await expect(panels.nth(3)).toHaveClass(/mp-panel--padding-lg/);
    await expect(panels.nth(4)).toHaveClass(/mp-panel--padding-xl/);
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

  test("should apply uniform padding via spacing prop", async ({ mount }) => {
    const component = await mount(
      <Panel padding="none" spacing={{ pt: 4, pb: 4, pl: 4, pr: 4 }}>
        Content
      </Panel>,
    );

    const paddingTop = await component.evaluate(
      (el) => window.getComputedStyle(el).paddingTop,
    );
    // --spacing-4 = 1rem = 16px at default font size
    expect(paddingTop).toBe("16px");
  });

  test("should apply horizontal padding via spacing prop", async ({
    mount,
  }) => {
    const component = await mount(
      <Panel padding="none" spacing={{ pl: 6, pr: 6 }}>
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

  test("should apply vertical padding via spacing prop", async ({ mount }) => {
    const component = await mount(
      <Panel padding="none" spacing={{ pt: 4, pb: 4 }}>
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
      <Panel padding="none" spacing={{ pt: 5, pb: 2, pl: 4, pr: 6 }}>
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

    // Spacing tokens: 2=sm/8px, 4=lg/16px, 5=xl/20px, 6=2xl/24px
    expect(paddingTop).toBe("20px");
    expect(paddingBottom).toBe("8px");
    expect(paddingLeft).toBe("16px");
    expect(paddingRight).toBe("24px");
  });

  test("should apply uniform margin via spacing prop", async ({ mount }) => {
    const component = await mount(
      <Panel spacing={{ mt: 4, mb: 4, ml: 4, mr: 4 }}>Content</Panel>,
    );

    const margin = await component.evaluate(
      (el) => window.getComputedStyle(el).margin,
    );
    expect(margin).toBeTruthy();
  });

  test("should apply horizontal margin via spacing prop", async ({ mount }) => {
    const component = await mount(
      <Panel spacing={{ ml: "auto", mr: "auto" }}>Content</Panel>,
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

  test("should apply vertical margin via spacing prop", async ({ mount }) => {
    const component = await mount(
      <Panel spacing={{ mt: 4, mb: 4 }}>Content</Panel>,
    );

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
      <Panel spacing={{ mt: 5, mb: 2, ml: 4, mr: 6 }}>Content</Panel>,
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

  test("should support numeric spacing values", async ({ mount }) => {
    const component = await mount(
      <Panel spacing={{ pt: 3, mt: 2 }}>Content</Panel>,
    );

    const className = await component.evaluate((el) => el.className);
    expect(className).toContain("pt-3");
    expect(className).toContain("mt-2");
  });

  test("should merge spacing classes with custom style prop", async ({
    mount,
  }) => {
    const component = await mount(
      <Panel spacing={{ pt: 4, pb: 4, pl: 4, pr: 4 }} style={{ color: "red" }}>
        Content
      </Panel>,
    );

    const color = await component.evaluate(
      (el) => window.getComputedStyle(el).color,
    );
    expect(color).toBeTruthy();
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <Panel variant="elevated" spacing={{ pt: 4, pb: 4, pl: 4, pr: 4 }}>
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
        <Panel
          variant="default"
          spacing={{ pl: 6, pr: 6, pt: 4, pb: 4, mb: 4 }}
        >
          <p>Panel with spacing props</p>
        </Panel>
        <Panel
          variant="outlined"
          spacing={{ pt: 4, pb: 4, pl: 4, pr: 4, mt: 2 }}
        >
          <p>Another panel</p>
        </Panel>
      </div>,
    );

    await checkA11y(page);
  });

  test.describe("PanelHeader and PanelBody sub-components", () => {
    test("should render PanelHeader correctly", async ({ mount }) => {
      const component = await mount(
        <Panel>
          <PanelHeader>Panel Title</PanelHeader>
          <PanelBody>Panel content</PanelBody>
        </Panel>,
      );

      const header = component.locator(".mp-panel__header");
      await expect(header).toBeVisible();
      await expect(header).toHaveText("Panel Title");
    });

    test("should render PanelBody correctly", async ({ mount }) => {
      const component = await mount(
        <Panel>
          <PanelHeader>Title</PanelHeader>
          <PanelBody>Main content area</PanelBody>
        </Panel>,
      );

      const body = component.locator(".mp-panel__body");
      await expect(body).toBeVisible();
      await expect(body).toHaveText("Main content area");
    });

    test("should support custom className on PanelHeader", async ({
      mount,
    }) => {
      const component = await mount(
        <Panel>
          <PanelHeader className="custom-header">Title</PanelHeader>
        </Panel>,
      );

      await expect(component.locator(".mp-panel__header")).toHaveClass(
        /custom-header/,
      );
    });

    test("should support custom className on PanelBody", async ({ mount }) => {
      const component = await mount(
        <Panel>
          <PanelBody className="custom-body">Content</PanelBody>
        </Panel>,
      );

      await expect(component.locator(".mp-panel__body")).toHaveClass(
        /custom-body/,
      );
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("should allow tab navigation through focusable children", async ({
      mount,
      page,
    }) => {
      await mount(
        <Panel>
          <PanelHeader>Title</PanelHeader>
          <PanelBody>
            <a href="#">Link 1</a>
            <button>Button 1</button>
          </PanelBody>
        </Panel>,
      );

      await page.keyboard.press("Tab");
      await expect(page.locator("a")).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(page.locator("button")).toBeFocused();
    });
  });

  test.describe("Empty and Edge States", () => {
    test("should render panel with no title", async ({ mount }) => {
      const component = await mount(
        <Panel>
          <PanelBody>Content without title</PanelBody>
        </Panel>,
      );

      await expect(component.locator(".mp-panel__header")).not.toBeAttached();
      await expect(component.locator(".mp-panel__body")).toBeVisible();
    });

    test("should render panel with empty content", async ({ mount }) => {
      const component = await mount(<Panel>{""}</Panel>);

      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/mp-panel/);
    });

    test("should render panel with only header", async ({ mount }) => {
      const component = await mount(
        <Panel>
          <PanelHeader>Title Only</PanelHeader>
        </Panel>,
      );

      await expect(component.locator(".mp-panel__header")).toBeVisible();
      await expect(component.locator(".mp-panel__body")).not.toBeAttached();
    });
  });
});
