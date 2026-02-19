import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { FormBuilder } from "./FormBuilder";
import { BlurValidationForm } from "./FormBuilder.fixtures";
import { checkA11y } from "../../playwright/test-utils";

// ─── Shared test data ─────────────────────────────────────────────────────────

interface BasicForm {
  name: string;
  email: string;
  age: number;
  country: string;
  bio: string;
  subscribe: boolean;
}

const defaultValues: BasicForm = {
  name: "",
  email: "",
  age: 0,
  country: "",
  bio: "",
  subscribe: false,
};

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe("FormBuilder", () => {
  test("renders text fields", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Full name" }]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator("label")).toHaveText("Full name");
    await expect(component.locator('input[type="text"]')).toBeVisible();
  });

  test("renders email field", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ email: "" }}
        fields={[{ name: "email", fieldType: "email", label: "Email" }]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator('input[type="email"]')).toBeVisible();
  });

  test("renders password field", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ password: "" }}
        fields={[
          { name: "password", fieldType: "password", label: "Password" },
        ]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator('input[type="password"]')).toBeVisible();
  });

  test("renders number field", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ age: 0 }}
        fields={[{ name: "age", fieldType: "number", label: "Age" }]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator('input[type="number"]')).toBeVisible();
  });

  test("renders textarea field", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ bio: "" }}
        fields={[{ name: "bio", fieldType: "textarea", label: "Bio", rows: 4 }]}
        onSubmit={() => {}}
      />,
    );

    const textarea = component.locator("textarea");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute("rows", "4");
  });

  test("renders select field with options", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ country: "" }}
        fields={[
          {
            name: "country",
            fieldType: "select",
            label: "Country",
            options: [
              { label: "Germany", value: "de" },
              { label: "USA", value: "us" },
            ],
          },
        ]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator("select")).toBeVisible();
    await expect(component.locator("option[value='de']")).toBeAttached();
    await expect(component.locator("option[value='us']")).toBeAttached();
  });

  test("renders checkbox field", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ subscribe: false }}
        fields={[
          {
            name: "subscribe",
            fieldType: "checkbox",
            label: "Preferences",
            inlineLabel: "Subscribe to newsletter",
          },
        ]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator('input[type="checkbox"]')).toBeAttached();
  });

  test("renders submit button with default label", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Name" }]}
        onSubmit={() => {}}
      />,
    );

    await expect(
      component.locator('button[type="submit"]'),
    ).toContainText("Submit");
  });

  test("renders custom submit label", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Name" }]}
        onSubmit={() => {}}
        submitLabel="Send"
      />,
    );

    await expect(component.locator('button[type="submit"]')).toHaveText("Send");
  });

  test("renders reset button when resetLabel is provided", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Name" }]}
        onSubmit={() => {}}
        resetLabel="Clear"
      />,
    );

    await expect(component.locator('button[type="reset"]')).toHaveText("Clear");
  });

  test("does not render reset button when resetLabel is omitted", async ({
    mount,
  }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Name" }]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator('button[type="reset"]')).not.toBeAttached();
  });

  test("accepts user input in text field", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Name" }]}
        onSubmit={() => {}}
      />,
    );

    await component.locator('input[type="text"]').fill("Alice");
    await expect(component.locator('input[type="text"]')).toHaveValue("Alice");
  });

  test("shows validation error after field is blurred", async ({
    mount,
  }) => {
    // BlurValidationForm uses a module-level onBlur validator so it runs
    // fully in the browser context (no cross-process callback round-trip).
    const component = await mount(<BlurValidationForm />);
    const input = component.locator('input[type="text"]');
    await input.click();
    await input.evaluate((el) => (el as HTMLInputElement).blur());
    await expect(
      component.locator(".form-control__message--error"),
    ).toHaveText("Name is required");
  });

  test("calls onSubmit with typed values", async ({ mount }) => {
    let submittedValues: BasicForm | null = null;

    const component = await mount(
      <FormBuilder<BasicForm>
        defaultValues={defaultValues}
        fields={[
          { name: "name", fieldType: "text", label: "Name" },
          { name: "email", fieldType: "email", label: "Email" },
        ]}
        onSubmit={(values) => {
          submittedValues = values;
        }}
      />,
    );

    await component.locator('input[type="text"]').fill("Bob");
    await component.locator('input[type="email"]').fill("bob@example.com");
    await component.locator('button[type="submit"]').click();

    await expect
      .poll(() => submittedValues?.name)
      .toBe("Bob");
    await expect
      .poll(() => submittedValues?.email)
      .toBe("bob@example.com");
  });

  test("resets form on reset button click", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[{ name: "name", fieldType: "text", label: "Name" }]}
        onSubmit={() => {}}
        resetLabel="Reset"
      />,
    );

    const input = component.locator('input[type="text"]');
    await input.fill("Charlie");
    await component.locator('button[type="reset"]').click();
    await expect(input).toHaveValue("");
  });

  test("renders multiple fields in order", async ({ mount }) => {
    const component = await mount(
      <FormBuilder<BasicForm>
        defaultValues={defaultValues}
        fields={[
          { name: "name", fieldType: "text", label: "Name" },
          { name: "email", fieldType: "email", label: "Email" },
          { name: "age", fieldType: "number", label: "Age" },
        ]}
        onSubmit={() => {}}
      />,
    );

    const labels = component.locator("label");
    await expect(labels.nth(0)).toHaveText("Name");
    await expect(labels.nth(1)).toHaveText("Email");
    await expect(labels.nth(2)).toHaveText("Age");
  });

  test("disables a field when disabled prop is set", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[
          { name: "name", fieldType: "text", label: "Name", disabled: true },
        ]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator('input[type="text"]')).toBeDisabled();
  });

  test("renders helper text", async ({ mount }) => {
    const component = await mount(
      <FormBuilder
        defaultValues={{ name: "" }}
        fields={[
          {
            name: "name",
            fieldType: "text",
            label: "Name",
            helperText: "Enter your full name",
          },
        ]}
        onSubmit={() => {}}
      />,
    );

    await expect(component.locator(".form-control__message")).toContainText(
      "Enter your full name",
    );
  });

  test("passes accessibility checks", async ({ mount, page }) => {
    await mount(
      <FormBuilder<BasicForm>
        defaultValues={defaultValues}
        fields={[
          { name: "name", fieldType: "text", label: "Full name" },
          { name: "email", fieldType: "email", label: "Email address" },
          { name: "age", fieldType: "number", label: "Age" },
          {
            name: "country",
            fieldType: "select",
            label: "Country",
            options: [{ label: "Germany", value: "de" }],
          },
          { name: "bio", fieldType: "textarea", label: "Bio" },
          {
            name: "subscribe",
            fieldType: "checkbox",
            label: "Preferences",
            inlineLabel: "Subscribe",
          },
        ]}
        onSubmit={() => {}}
      />,
    );

    await checkA11y(page, { disableRules: ["color-contrast"] });
  });
});
