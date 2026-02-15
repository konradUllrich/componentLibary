import { test, expect } from "@playwright/experimental-ct-react";
import { Combobox } from "./Combobox";
import { checkA11y } from "../../playwright/test-utils";

/**
 * Combobox Component Tests
 *
 * Comprehensive tests for the Combobox component including rendering,
 * filtering, keyboard navigation, selection, and accessibility.
 */
test.describe("Combobox Component", () => {
  const testOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
  ];

  test("should render with default props", async ({ mount }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("placeholder", "Search...");
  });

  test("should render different variants", async ({ mount }) => {
    const component = await mount(
      <div>
        <Combobox variant="default" options={testOptions} />
        <Combobox variant="filled" options={testOptions} />
        <Combobox variant="outline" options={testOptions} />
      </div>,
    );

    const inputs = component.locator('input[role="combobox"]');
    await expect(inputs.nth(0)).toHaveClass(/combobox__input--default/);
    await expect(inputs.nth(1)).toHaveClass(/combobox__input--filled/);
    await expect(inputs.nth(2)).toHaveClass(/combobox__input--outline/);
  });

  test("should render different sizes", async ({ mount }) => {
    const component = await mount(
      <div>
        <Combobox size="sm" options={testOptions} />
        <Combobox size="md" options={testOptions} />
        <Combobox size="lg" options={testOptions} />
      </div>,
    );

    const inputs = component.locator('input[role="combobox"]');
    await expect(inputs.nth(0)).toHaveClass(/combobox__input--sm/);
    await expect(inputs.nth(1)).toHaveClass(/combobox__input--md/);
    await expect(inputs.nth(2)).toHaveClass(/combobox__input--lg/);
  });

  test("should render with label", async ({ mount }) => {
    const component = await mount(
      <Combobox label="Country" options={testOptions} />,
    );

    const label = component.locator("label");
    await expect(label).toBeVisible();
    await expect(label).toHaveText("Country");
  });

  test("should render with helper text", async ({ mount }) => {
    const component = await mount(
      <Combobox options={testOptions} helperText="Select your country" />,
    );

    const helperText = component.locator(".form-control__message");
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText("Select your country");
  });

  test("should render with error state", async ({ mount }) => {
    const component = await mount(
      <Combobox
        options={testOptions}
        error
        errorMessage="This field is required"
      />,
    );

    const input = component.locator('input[role="combobox"]');
    await expect(input).toHaveClass(/combobox__input--error/);

    const errorMessage = component.locator(".form-control__message--error");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("This field is required");
  });

  test("should open dropdown on focus", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();
  });

  test("should display all options when opened", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const options = page.locator('[role="option"]');
    await expect(options).toHaveCount(4);
  });

  test("should filter options based on search", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.fill("united");
    await page.waitForTimeout(100);

    const options = page.locator('[role="option"]');
    await expect(options).toHaveCount(2); // United States and United Kingdom
    await expect(options.nth(0)).toHaveText("United States");
    await expect(options.nth(1)).toHaveText("United Kingdom");
  });

  test("should filter options case-insensitively", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.fill("CANADA");
    await page.waitForTimeout(100);

    const options = page.locator('[role="option"]');
    await expect(options).toHaveCount(1);
    await expect(options.first()).toHaveText("Canada");
  });

  test("should show empty state when no matches", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.fill("xyz");
    await page.waitForTimeout(100);

    const empty = page.locator(".combobox__empty");
    await expect(empty).toBeVisible();
    await expect(empty).toHaveText("No options found");
  });

  test("should select option on click", async ({ mount, page }) => {
    let selectedValue = "";
    const component = await mount(
      <Combobox
        options={testOptions}
        onValueChange={(value) => {
          selectedValue = value;
        }}
      />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const canadaOption = page.locator('[role="option"]').filter({ hasText: "Canada" });
    await canadaOption.click();
    await page.waitForTimeout(100);

    expect(selectedValue).toBe("ca");
    await expect(input).toHaveValue("Canada");
  });

  test("should navigate options with arrow keys", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(200);

    // Initial highlighted should be first option (index 0)
    let highlightedOption = page.locator(".combobox__option--highlighted");
    await expect(highlightedOption).toHaveText("United States");

    // Press down arrow once to move to second option (index 1)
    await input.press("ArrowDown");
    await page.waitForTimeout(100);

    highlightedOption = page.locator(".combobox__option--highlighted");
    await expect(highlightedOption).toHaveText("United Kingdom");
  });

  test("should select option with Enter key", async ({ mount, page }) => {
    let selectedValue = "";
    const component = await mount(
      <Combobox
        options={testOptions}
        onValueChange={(value) => {
          selectedValue = value;
        }}
      />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    // Navigate to second option and press Enter
    await input.press("ArrowDown");
    await page.waitForTimeout(50);
    await input.press("Enter");
    await page.waitForTimeout(100);

    expect(selectedValue).toBe("uk");
    await expect(input).toHaveValue("United Kingdom");
  });

  test("should close dropdown with Escape key", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await input.press("Escape");
    await page.waitForTimeout(100);

    await expect(listbox).not.toBeVisible();
  });

  test("should navigate up with ArrowUp key", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(200);

    // Navigate down three times to index 3, then up once to index 2
    await input.press("ArrowDown");
    await page.waitForTimeout(100);
    await input.press("ArrowDown");
    await page.waitForTimeout(100);
    await input.press("ArrowDown");
    await page.waitForTimeout(100);
    await input.press("ArrowUp");
    await page.waitForTimeout(100);

    const highlightedOption = page.locator(".combobox__option--highlighted");
    await expect(highlightedOption).toHaveText("Canada");
  });

  test("should handle disabled state", async ({ mount }) => {
    const component = await mount(
      <Combobox options={testOptions} disabled />,
    );

    const input = component.locator('input[role="combobox"]');
    await expect(input).toBeDisabled();
    await expect(input).toHaveClass(/combobox__input--disabled/);
  });

  test("should render disabled options", async ({ mount, page }) => {
    const optionsWithDisabled = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom", disabled: true },
      { value: "ca", label: "Canada" },
    ];

    const component = await mount(
      <Combobox options={optionsWithDisabled} />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const disabledOption = page.locator(".combobox__option--disabled");
    await expect(disabledOption).toBeVisible();
    await expect(disabledOption).toHaveText("United Kingdom");
  });

  test("should not select disabled options", async ({ mount, page }) => {
    let selectedValue = "";
    const optionsWithDisabled = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom", disabled: true },
      { value: "ca", label: "Canada" },
    ];

    const component = await mount(
      <Combobox
        options={optionsWithDisabled}
        onValueChange={(value) => {
          selectedValue = value;
        }}
      />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(200);

    // Try to click disabled option
    const disabledOption = page.locator(".combobox__option--disabled");
    await disabledOption.click({ force: true });
    await page.waitForTimeout(100);

    expect(selectedValue).toBe("");
  });

  test("should work with controlled value", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} value="uk" />,
    );

    const input = component.locator('input[role="combobox"]');
    await expect(input).toHaveValue("United Kingdom");
  });

  test("should work with defaultValue", async ({ mount }) => {
    const component = await mount(
      <Combobox options={testOptions} defaultValue="ca" />,
    );

    const input = component.locator('input[role="combobox"]');
    await expect(input).toHaveValue("Canada");
  });

  test("should display selected option with checkmark", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} defaultValue="au" />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const selectedOption = page.locator(".combobox__option--selected");
    await expect(selectedOption).toBeVisible();
    await expect(selectedOption).toHaveText(/Australia/);

    const checkmark = selectedOption.locator(".combobox__check");
    await expect(checkmark).toBeVisible();
  });

  test("should update highlighted option on mouse enter", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const thirdOption = page.locator('[role="option"]').nth(2);
    await thirdOption.hover();
    await page.waitForTimeout(50);

    await expect(thirdOption).toHaveClass(/combobox__option--highlighted/);
  });

  test("should close dropdown on Tab key", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    const listbox = page.locator('[role="listbox"]');
    await expect(listbox).toBeVisible();

    await input.press("Tab");
    await page.waitForTimeout(100);

    await expect(listbox).not.toBeVisible();
  });

  test("should restore original value when closing without selection", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <Combobox options={testOptions} defaultValue="ca" />,
    );

    const input = component.locator('input[role="combobox"]');
    await page.waitForTimeout(100);
    await expect(input).toHaveValue("Canada");

    // Type something else
    await input.fill("United");
    await page.waitForTimeout(200);

    // Close with Escape
    await input.press("Escape");
    await page.waitForTimeout(100);

    // Should restore original value
    await expect(input).toHaveValue("Canada");
  });

  test("should have correct ARIA attributes", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} placeholder="Search..." />,
    );

    const input = component.locator('input[role="combobox"]');
    await expect(input).toHaveAttribute("role", "combobox");
    await expect(input).toHaveAttribute("aria-expanded", "false");
    await expect(input).toHaveAttribute("aria-autocomplete", "list");
    await expect(input).toHaveAttribute("aria-controls", "combobox-listbox");

    await input.focus();
    await page.waitForTimeout(100);

    await expect(input).toHaveAttribute("aria-expanded", "true");
  });

  test("should pass accessibility checks with basic usage", async ({
    mount,
    page,
  }) => {
    await mount(
      <div>
        <Combobox
          label="Country"
          options={testOptions}
          placeholder="Search countries..."
        />
      </div>,
    );

    await page.waitForTimeout(100);
    await checkA11y(page, {
      disableRules: ["color-contrast"],
    });
  });

  test("should pass accessibility checks with open dropdown", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <Combobox
        label="Country"
        options={testOptions}
        placeholder="Search countries..."
      />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.focus();
    await page.waitForTimeout(100);

    await checkA11y(page, {
      disableRules: ["color-contrast"],
    });
  });

  test("should pass accessibility checks with error state", async ({
    mount,
    page,
  }) => {
    await mount(
      <Combobox
        label="Country"
        options={testOptions}
        error
        errorMessage="Please select a country"
      />,
    );

    await page.waitForTimeout(100);
    await checkA11y(page, {
      disableRules: ["color-contrast"],
    });
  });

  test("should pass accessibility checks with disabled state", async ({
    mount,
    page,
  }) => {
    await mount(
      <Combobox
        label="Country"
        options={testOptions}
        placeholder="Search..."
        disabled
      />,
    );

    await page.waitForTimeout(100);
    await checkA11y(page, {
      disableRules: ["color-contrast"],
    });
  });

  test("should support allowCreate prop", async ({ mount, page }) => {
    const component = await mount(
      <Combobox options={testOptions} allowCreate />,
    );

    const input = component.locator('input[role="combobox"]');
    await input.fill("New Country");
    await page.waitForTimeout(100);

    const empty = page.locator(".combobox__empty");
    await expect(empty).toBeVisible();
    await expect(empty).toContainText('Press Enter to create "New Country"');
  });
});
