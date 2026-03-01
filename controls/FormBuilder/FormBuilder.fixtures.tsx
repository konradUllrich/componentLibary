/**
 * Test fixture components for FormBuilder.
 * Validators must be defined at module level (not inline in tests) so they
 * run in the browser context in Playwright CT without cross-process marshaling.
 */
import React from "react";
import { z } from "zod";
import { FormBuilder } from "./FormBuilder";
import type { FieldDef } from "./types";

/** Fixture: text field with onBlur validation (empty = error). */
export const BlurValidationForm = () => (
  <FormBuilder
    defaultValues={{ name: "" }}
    fields={[
      {
        name: "name" as const,
        fieldType: "text" as const,
        label: "Name",
        validate: {
          onBlur: (v: string) =>
            v.trim().length === 0 ? "Name is required" : undefined,
        },
      },
    ]}
    onSubmit={() => {}}
  />
);

const emailSchema = z.string().email("Invalid email address");

/** Fixture: email field validated with a Zod schema (onChange). */
export const ZodEmailValidationForm = () => (
  <FormBuilder
    defaultValues={{ email: "" }}
    fields={[
      {
        name: "email" as const,
        fieldType: "email" as const,
        label: "Email",
        schema: emailSchema,
      },
    ]}
    onSubmit={() => {}}
  />
);

const nameSchema = z.string().min(2, "Name must be at least 2 characters");

/** Fixture: text field with both a Zod schema and a validate function. */
export const ZodAndValidateFnForm = () => (
  <FormBuilder
    defaultValues={{ username: "" }}
    fields={[
      {
        name: "username" as const,
        fieldType: "text" as const,
        label: "Username",
        schema: nameSchema,
        validate: {
          onChange: (v: string) =>
            v === "admin" ? "Username 'admin' is reserved" : undefined,
        },
      },
    ]}
    onSubmit={() => {}}
  />
);

const customRatingField: FieldDef<{ rating: number }> = {
  name: "rating",
  fieldType: "custom",
  label: "Rating",
  render: ({ value, onChange }) => (
    <button
      type="button"
      data-testid="custom-control"
      onClick={() => onChange(5)}
    >
      {String(value)}
    </button>
  ),
};

/** Fixture: custom field render prop (module scope for CT). */
export const CustomFieldForm = () => (
  <FormBuilder
    defaultValues={{ rating: 0 }}
    fields={[customRatingField]}
    onSubmit={() => {}}
  />
);
