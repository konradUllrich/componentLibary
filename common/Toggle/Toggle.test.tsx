import { test, expect } from "@playwright/experimental-ct-react";
import { Toggle } from "./Toggle";
import { checkA11y } from "../../playwright/test-utils";

test.describe("Toggle Component", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Toggle aria-label="Toggle">Bold</Toggle>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText("Bold");
  });

  test("should render different variants", async ({ mount }) => {
    const component = await mount(
      <div>
        <Toggle variant="default" aria-label="Default">
          Default
        </Toggle>
        <Toggle variant="outline" aria-label="Outline">
          Outline
        </Toggle>
      </div>,
    );

    const buttons = component.locator("button");
    await expect(buttons.nth(0)).toHaveClass(/toggle--default/);
    await expect(buttons.nth(1)).toHaveClass(/toggle--outline/);
  });

  test("should render different sizes", async ({ mount }) => {
    const component = await mount(
      <div>
        <Toggle size="sm" aria-label="Small">
          Sm
        </Toggle>
        <Toggle size="md" aria-label="Medium">
          Md
        </Toggle>
        <Toggle size="lg" aria-label="Large">
          Lg
        </Toggle>
      </div>,
    );

    const buttons = component.locator("button");
    await expect(buttons.nth(0)).toHaveClass(/toggle--sm/);
    await expect(buttons.nth(1)).toHaveClass(/toggle--md/);
    await expect(buttons.nth(2)).toHaveClass(/toggle--lg/);
  });

  test("should toggle pressed state when clicked", async ({ mount }) => {
    const component = await mount(<Toggle aria-label="Bold">B</Toggle>);

    // Initially not pressed
    await expect(component).toHaveAttribute("data-state", "off");

    // Click to press
    await component.click();
    await expect(component).toHaveAttribute("data-state", "on");

    // Click again to un-press
    await component.click();
    await expect(component).toHaveAttribute("data-state", "off");
  });

  test("should handle defaultPressed prop", async ({ mount }) => {
    const component = await mount(
      <Toggle defaultPressed aria-label="Bold">
        B
      </Toggle>,
    );

    await expect(component).toHaveAttribute("data-state", "on");
    await expect(component).toHaveAttribute("aria-pressed", "true");
  });

  test("should handle disabled state", async ({ mount }) => {
    const component = await mount(
      <Toggle disabled aria-label="Disabled">
        X
      </Toggle>,
    );

    await expect(component).toBeDisabled();

    // Should not toggle when disabled
    await component.click({ force: true });
    await expect(component).toHaveAttribute("data-state", "off");
  });

  test("should support aria-label", async ({ mount }) => {
    const component = await mount(
      <Toggle aria-label="Bold text">B</Toggle>,
    );
    await expect(component).toHaveAttribute("aria-label", "Bold text");
  });

  test("should have correct accessible role", async ({ mount }) => {
    const component = await mount(<Toggle aria-label="Toggle">T</Toggle>);
    await expect(component).toHaveRole("button");
  });

  test("should expose aria-pressed attribute", async ({ mount }) => {
    const component = await mount(
      <Toggle pressed={true} onPressedChange={() => {}} aria-label="Pressed">
        P
      </Toggle>,
    );
    await expect(component).toHaveAttribute("aria-pressed", "true");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <div>
        <Toggle aria-label="Bold">B</Toggle>
        <Toggle variant="outline" aria-label="Italic">
          I
        </Toggle>
        <Toggle defaultPressed aria-label="Underline">
          U
        </Toggle>
        <Toggle disabled aria-label="Disabled">
          D
        </Toggle>
      </div>,
    );

    await checkA11y(page, { disableRules: ["color-contrast"] });
  });

  test("should maintain focus state", async ({ mount }) => {
    const component = await mount(<Toggle aria-label="Focus me">F</Toggle>);
    await component.focus();
    await expect(component).toBeFocused();
  });

  test("should support keyboard interaction", async ({ mount, page }) => {
    let pressedState = false;
    const component = await mount(
      <Toggle
        aria-label="Keyboard"
        onPressedChange={(p) => {
          pressedState = p;
        }}
      >
        K
      </Toggle>,
    );

    await component.focus();
    await page.keyboard.press("Space");
    await page.waitForTimeout(50);
    expect(pressedState).toBe(true);
  });
});
