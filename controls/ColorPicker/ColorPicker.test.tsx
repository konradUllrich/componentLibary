import { test, expect } from "../../playwright/coverage-fixtures";
import { ColorPicker } from "./ColorPicker";
import { checkA11y } from "../../playwright/test-utils";

test.describe("ColorPicker Component", () => {
  test("should render swatch and text field with the current value", async ({
    mount,
  }) => {
    const component = await mount(
      <ColorPicker label="Primary" value="#7c3aed" onChange={() => {}} />,
    );
    await expect(component.locator("input[type='color']")).toHaveValue(
      "#7c3aed",
    );
    await expect(component.locator("input[type='text']")).toHaveValue(
      "#7c3aed",
    );
  });

  test("should call onChange when the swatch changes", async ({ mount }) => {
    let lastValue = "";
    const component = await mount(
      <ColorPicker
        label="Primary"
        value="#7c3aed"
        onChange={(v) => {
          lastValue = v;
        }}
      />,
    );
    await component
      .locator("input[type='color']")
      .evaluate((el: HTMLInputElement) => {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )!.set!;
        setter.call(el, "#ff0000");
        el.dispatchEvent(new Event("input", { bubbles: true }));
      });
    await expect
      .poll(() => lastValue)
      .toBe("#ff0000");
  });

  test("should call onChange when the text field changes", async ({
    mount,
  }) => {
    let lastValue = "";
    const component = await mount(
      <ColorPicker
        label="Primary"
        value="#7c3aed"
        onChange={(v) => {
          lastValue = v;
        }}
      />,
    );
    await component.locator("input[type='text']").fill("#123456");
    expect(lastValue).toBe("#123456");
  });

  test("should render disabled state", async ({ mount }) => {
    const component = await mount(
      <ColorPicker label="Primary" value="#7c3aed" onChange={() => {}} disabled />,
    );
    await expect(component.locator("input[type='color']")).toBeDisabled();
    await expect(component.locator("input[type='text']")).toBeDisabled();
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <ColorPicker label="Primary" value="#7c3aed" onChange={() => {}} />,
    );
    await checkA11y(page);
  });
});
