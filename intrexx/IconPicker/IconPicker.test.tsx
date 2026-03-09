import { test, expect } from "@playwright/experimental-ct-react";
import { IconPicker } from "./IconPicker";
import { checkA11y } from "../../playwright/test-utils";

test.describe("IconPicker", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<IconPicker />);
    await expect(component).toBeVisible();
  });

  test("should render search input", async ({ mount }) => {
    const component = await mount(<IconPicker />);
    const input = component.locator(".icon-picker__search-input");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("placeholder", "Search icons...");
  });

  test("should render style toggle buttons", async ({ mount }) => {
    const component = await mount(<IconPicker />);
    const lineBtn = component.locator('[title="Line style icons"]');
    const solidBtn = component.locator('[title="Solid style icons"]');
    await expect(lineBtn).toBeVisible();
    await expect(solidBtn).toBeVisible();
  });

  test("should activate line style by default", async ({ mount }) => {
    const component = await mount(<IconPicker defaultStyle="line" />);
    const lineBtn = component.locator('[title="Line style icons"]');
    await expect(lineBtn).toHaveClass(/icon-picker__style-btn--active/);
  });

  test("should activate solid style when defaultStyle is solid", async ({
    mount,
  }) => {
    const component = await mount(<IconPicker defaultStyle="solid" />);
    const solidBtn = component.locator('[title="Solid style icons"]');
    await expect(solidBtn).toHaveClass(/icon-picker__style-btn--active/);
  });

  test("should render category toggle button", async ({ mount }) => {
    const component = await mount(<IconPicker />);
    const categoryBtn = component.locator(".icon-picker__category-toggle");
    await expect(categoryBtn).toBeVisible();
    await expect(categoryBtn).toContainText("Categories");
  });

  test("should show category filter panel when toggle is clicked", async ({
    mount,
  }) => {
    const component = await mount(<IconPicker />);
    const categoryBtn = component.locator(".icon-picker__category-toggle");

    // Panel should not be visible initially
    await expect(
      component.locator(".icon-picker__category-filter"),
    ).not.toBeVisible();

    // Click to open
    await categoryBtn.click();
    await expect(
      component.locator(".icon-picker__category-filter"),
    ).toBeVisible();
  });

  test("should display icon count in results info", async ({ mount }) => {
    const component = await mount(<IconPicker />);
    const resultsInfo = component.locator(".icon-picker__results-info");
    await expect(resultsInfo).toBeVisible();
    await expect(resultsInfo).toContainText("found");
  });

  test("should show no results message when search has no matches", async ({
    mount,
  }) => {
    const component = await mount(<IconPicker />);
    const input = component.locator(".icon-picker__search-input");
    await input.fill("xyzxyzxyznotanicon");
    await expect(
      component.locator(".icon-picker__no-results"),
    ).toBeVisible();
  });

  test("should show clear button when search has text", async ({ mount }) => {
    const component = await mount(<IconPicker />);
    const input = component.locator(".icon-picker__search-input");

    await expect(
      component.locator(".icon-picker__clear-search"),
    ).not.toBeVisible();
    await input.fill("home");
    await expect(
      component.locator(".icon-picker__clear-search"),
    ).toBeVisible();
  });

  test("should clear search when clear button is clicked", async ({
    mount,
  }) => {
    const component = await mount(<IconPicker />);
    const input = component.locator(".icon-picker__search-input");
    await input.fill("home");
    await component.locator(".icon-picker__clear-search").click();
    await expect(input).toHaveValue("");
  });

  test("should call onSelectIcon with correct data when icon is clicked", async ({
    mount,
  }) => {
    const selected: Array<{ category: string; name: string; className: string }> =
      [];
    const component = await mount(
      <IconPicker
        defaultStyle="line"
        onSelectIcon={(icon) => selected.push(icon)}
      />,
    );

    // Click the first icon button
    const firstIcon = component.locator(".icon-picker__icon-button").first();
    await firstIcon.click();

    expect(selected.length).toBe(1);
    expect(selected[0].className).toMatch(/^icon54-l_/);
    expect(selected[0].category).toBeTruthy();
    expect(selected[0].name).toBeTruthy();
  });

  test("should mark selected icon with active modifier class", async ({
    mount,
  }) => {
    // Use a known valid icon class name (first icon in the data)
    const knownIconClass = "icon54-l_AlignmentParagraph-AlignCenter";

    const component = await mount(
      <IconPicker defaultStyle="line" selectedIcon={knownIconClass} />,
    );

    const selectedBtn = component.locator(".icon-picker__icon-button--selected");
    await expect(selectedBtn).toBeVisible();
    await expect(selectedBtn).toHaveAttribute("aria-pressed", "true");
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(
      <IconPicker className="custom-picker" />,
    );
    await expect(component).toHaveClass(/custom-picker/);
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    // Limit rendered icons via search to keep the a11y scan fast
    await mount(<IconPicker />);
    const input = page.locator(".icon-picker__search-input");
    await input.fill("home");
    await checkA11y(page, { disableRules: ["color-contrast"] });
  });
});
