/**
 * Test fixture components for FormBuilder.
 * Validators must be defined at module level (not inline in tests) so they
 * run in the browser context in Playwright CT without cross-process marshaling.
 */
import React from "react";
import { FormBuilder } from "./FormBuilder";

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
