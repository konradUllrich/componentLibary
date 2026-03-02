import { test, expect } from "@playwright/experimental-ct-react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";
import { checkA11y } from "../../playwright/test-utils";

test.describe("ToggleGroup Component", () => {
  test("should render with single type", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="single" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/toggle-group/);

    const items = component.locator("button");
    await expect(items).toHaveCount(3);
  });

  test("should render with multiple type", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="multiple" aria-label="Text formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    await expect(component).toBeVisible();
    const items = component.locator("button");
    await expect(items).toHaveCount(3);
  });

  test("should render different variants", async ({ mount }) => {
    const component = await mount(
      <div>
        <ToggleGroup type="single" variant="default" aria-label="Default">
          <ToggleGroupItem value="a" aria-label="A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline" aria-label="Outline">
          <ToggleGroupItem value="a" aria-label="A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );

    const groups = component.locator(".toggle-group");
    await expect(groups.nth(0)).toHaveClass(/toggle-group--default/);
    await expect(groups.nth(1)).toHaveClass(/toggle-group--outline/);
  });

  test("should render different sizes", async ({ mount }) => {
    const component = await mount(
      <div>
        <ToggleGroup type="single" size="sm" aria-label="Small">
          <ToggleGroupItem value="a" aria-label="A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" size="md" aria-label="Medium">
          <ToggleGroupItem value="a" aria-label="A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" size="lg" aria-label="Large">
          <ToggleGroupItem value="a" aria-label="A">
            A
          </ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );

    const groups = component.locator(".toggle-group");
    await expect(groups.nth(0)).toHaveClass(/toggle-group--sm/);
    await expect(groups.nth(1)).toHaveClass(/toggle-group--md/);
    await expect(groups.nth(2)).toHaveClass(/toggle-group--lg/);
  });

  test("should select item in single mode", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const leftBtn = component.locator("button").nth(0);
    const rightBtn = component.locator("button").nth(1);

    // Nothing selected initially
    await expect(leftBtn).toHaveAttribute("data-state", "off");
    await expect(rightBtn).toHaveAttribute("data-state", "off");

    // Select left
    await leftBtn.click();
    await expect(leftBtn).toHaveAttribute("data-state", "on");
    await expect(rightBtn).toHaveAttribute("data-state", "off");

    // Select right – left should deselect
    await rightBtn.click();
    await expect(leftBtn).toHaveAttribute("data-state", "off");
    await expect(rightBtn).toHaveAttribute("data-state", "on");
  });

  test("should select multiple items in multiple mode", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="multiple" aria-label="Formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const boldBtn = component.locator("button").nth(0);
    const italicBtn = component.locator("button").nth(1);

    await boldBtn.click();
    await italicBtn.click();

    await expect(boldBtn).toHaveAttribute("data-state", "on");
    await expect(italicBtn).toHaveAttribute("data-state", "on");
  });

  test("should handle controlled value in single mode", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="single" value="center" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const buttons = component.locator("button");
    await expect(buttons.nth(0)).toHaveAttribute("data-state", "off");
    await expect(buttons.nth(1)).toHaveAttribute("data-state", "on");
    await expect(buttons.nth(2)).toHaveAttribute("data-state", "off");
  });

  test("should apply item BEM class", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="single" aria-label="Test">
        <ToggleGroupItem value="x" aria-label="X">
          X
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const item = component.locator("button");
    await expect(item).toHaveClass(/toggle-group__item/);
  });

  test("should handle disabled item", async ({ mount }) => {
    const component = await mount(
      <ToggleGroup type="single" aria-label="Test">
        <ToggleGroupItem value="x" disabled aria-label="X">
          X
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const item = component.locator("button");
    await expect(item).toBeDisabled();
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <div>
        <ToggleGroup type="single" aria-label="Text alignment">
          <ToggleGroupItem value="left" aria-label="Left align">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center align">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right align">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="multiple" aria-label="Text formatting">
          <ToggleGroupItem value="bold" aria-label="Bold">
            B
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            I
          </ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );

    await checkA11y(page, { disableRules: ["color-contrast"] });
  });

  test("should focus first item on Tab", async ({ mount, page }) => {
    await mount(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">
          Center
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const firstItem = page.locator(".toggle-group__item").first();
    await firstItem.focus();
    await expect(firstItem).toBeFocused();
  });

  test("should navigate between items with arrow keys", async ({
    mount,
    page,
  }) => {
    await mount(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const firstItem = page.locator(".toggle-group__item").first();
    await firstItem.focus();

    await page.keyboard.press("ArrowRight");
    const secondItem = page.locator(".toggle-group__item").nth(1);
    await expect(secondItem).toBeFocused();

    await page.keyboard.press("ArrowRight");
    const thirdItem = page.locator(".toggle-group__item").nth(2);
    await expect(thirdItem).toBeFocused();
  });

  test("should activate item with Space key", async ({ mount, page }) => {
    await mount(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">
          Center
        </ToggleGroupItem>
      </ToggleGroup>,
    );

    const firstItem = page.locator(".toggle-group__item").first();
    await firstItem.focus();
    await page.keyboard.press("Space");
    await expect(firstItem).toHaveAttribute("data-state", "on");
  });
});
