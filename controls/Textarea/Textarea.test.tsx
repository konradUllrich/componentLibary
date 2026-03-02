import { test, expect } from "@playwright/experimental-ct-react";
import { Textarea } from "./Textarea";
import { checkA11y } from "../../playwright/test-utils";

test.describe("Textarea Component", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Textarea />);
    const textarea = component.locator("textarea");
    await expect(textarea).toBeVisible();
  });

  test("should render with label", async ({ mount }) => {
    const component = await mount(<Textarea label="Description" />);
    const label = component.locator("label");
    await expect(label).toBeVisible();
    await expect(label).toHaveText("Description");
  });

  test("should render helper text", async ({ mount }) => {
    const component = await mount(
      <Textarea helperText="Max 500 characters" />,
    );
    const helperText = component.locator(".form-control__message");
    await expect(helperText).toBeVisible();
    await expect(helperText).toContainText("Max 500 characters");
  });

  test("should handle error state", async ({ mount }) => {
    const component = await mount(
      <Textarea error errorMessage="This field is required" />,
    );
    const textarea = component.locator("textarea");
    await expect(textarea).toHaveClass(/textarea--error/);

    const errorMsg = component.locator(".form-control__message--error");
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText("This field is required");
  });

  test("should handle disabled state", async ({ mount }) => {
    const component = await mount(<Textarea disabled />);
    const textarea = component.locator("textarea");
    await expect(textarea).toBeDisabled();
    await expect(textarea).toHaveClass(/textarea--disabled/);
  });

  test("should respect rows prop", async ({ mount }) => {
    const component = await mount(<Textarea rows={5} />);
    const textarea = component.locator("textarea");
    await expect(textarea).toHaveAttribute("rows", "5");
  });

  test("should default to 3 rows", async ({ mount }) => {
    const component = await mount(<Textarea />);
    const textarea = component.locator("textarea");
    await expect(textarea).toHaveAttribute("rows", "3");
  });

  test("should accept user input", async ({ mount }) => {
    const component = await mount(<Textarea placeholder="Enter text" />);
    const textarea = component.locator("textarea");

    await textarea.fill("Hello World");
    await expect(textarea).toHaveValue("Hello World");
  });

  test("should handle placeholder", async ({ mount }) => {
    const component = await mount(
      <Textarea placeholder="Enter a description" />,
    );
    const textarea = component.locator("textarea");
    await expect(textarea).toHaveAttribute("placeholder", "Enter a description");
  });

  test("should link label to textarea with htmlFor", async ({ mount }) => {
    const component = await mount(
      <Textarea label="Notes" id="notes-textarea" />,
    );
    const label = component.locator("label");
    const textarea = component.locator("textarea");

    const textareaId = await textarea.getAttribute("id");
    const labelFor = await label.getAttribute("for");
    expect(textareaId).toBe(labelFor);
  });

  test("should maintain focus state", async ({ mount }) => {
    const component = await mount(<Textarea label="Focus test" />);
    const textarea = component.locator("textarea");

    await textarea.focus();
    await expect(textarea).toBeFocused();
  });

  test("should support required attribute", async ({ mount }) => {
    const component = await mount(
      <Textarea label="Required Field" required />,
    );
    const textarea = component.locator("textarea");
    await expect(textarea).toHaveAttribute("required");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <div>
        <Textarea label="Description" placeholder="Enter a description" />
        <Textarea label="Notes" helperText="Optional notes" />
      </div>,
    );

    await checkA11y(page);
  });

  test("should pass accessibility checks with error state", async ({
    mount,
    page,
  }) => {
    await mount(
      <Textarea
        label="Description"
        error
        errorMessage="Description is required"
      />,
    );

    await checkA11y(page, { disableRules: ["color-contrast"] });
  });
});
