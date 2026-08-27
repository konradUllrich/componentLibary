import { test, expect } from "../../playwright/coverage-fixtures";
import { Slider } from "./Slider";
import { checkA11y } from "../../playwright/test-utils";

test.describe("Slider Component", () => {
  test("should render with a value", async ({ mount }) => {
    const component = await mount(<Slider value={5} min={0} max={10} />);
    const input = component.locator("input[type='range']");
    await expect(input).toHaveValue("5");
  });

  test("should render the given label", async ({ mount }) => {
    const component = await mount(
      <Slider label="Font Size: 16px" value={16} min={12} max={20} onChange={() => {}} />,
    );
    await expect(component.locator("label")).toHaveText("Font Size: 16px");
  });

  test("should render disabled state", async ({ mount }) => {
    const component = await mount(<Slider value={5} disabled onChange={() => {}} />);
    await expect(component.locator("input")).toBeDisabled();
    await expect(component.locator("input")).toHaveClass(/mp-slider--disabled/);
  });

  test("should render error state", async ({ mount }) => {
    const component = await mount(
      <Slider label="Volume" value={5} error errorMessage="Out of range" onChange={() => {}} />,
    );
    await expect(component.locator("input")).toHaveClass(/mp-slider--error/);
    await expect(component.locator(".mp-form-control__message")).toHaveText(
      "Out of range",
    );
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(<Slider label="Font Size" value={16} onChange={() => {}} />);
    await checkA11y(page);
  });
});
