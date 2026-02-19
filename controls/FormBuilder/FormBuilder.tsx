import React from "react";
import clsx from "clsx";
import { useForm } from "@tanstack/react-form";
import type { DeepKeys } from "@tanstack/form-core";
import { Button } from "../../common/Button";
import { FormBuilderField } from "./FormBuilderField";
import type { FieldDef, FormBuilderProps } from "./types";
import "./FormBuilder.css";

/**
 * Converts a `FieldDef` `validate` object into the `validators` shape
 * expected by TanStack Form's `form.Field`.
 */
function buildValidators(field: FieldDef<Record<string, unknown>>) {
  const v = field.validate;
  if (!v) return undefined;
  return {
    onChange: v.onChange
      ? ({ value }: { value: unknown }) => v.onChange!(value as never) ?? undefined
      : undefined,
    onBlur: v.onBlur
      ? ({ value }: { value: unknown }) => v.onBlur!(value as never) ?? undefined
      : undefined,
  };
}

/**
 * FormBuilder – declarative, type-safe form generation powered by TanStack Form.
 *
 * Pass `defaultValues` and a typed `fields` array; `TData` is inferred
 * automatically.  The `onSubmit` handler receives values narrowed to `TData`.
 *
 * Field names are constrained to the matching value type:
 * - `'text' | 'email' | 'password' | 'textarea' | 'select'` → `string` keys only
 * - `'number'` → `number` keys only
 * - `'checkbox'` → `boolean` keys only
 *
 * Each field can carry a `validate` object with typed `onChange`/`onBlur`
 * functions that receive the correct primitive value type.
 *
 * @example
 * ```tsx
 * <FormBuilder
 *   defaultValues={{ name: '', age: 0, newsletter: false }}
 *   fields={[
 *     { name: 'name',       fieldType: 'text',     label: 'Full name',   required: true },
 *     { name: 'age',        fieldType: 'number',   label: 'Age', min: 0, max: 120 },
 *     { name: 'newsletter', fieldType: 'checkbox', label: 'Newsletter',
 *       inlineLabel: 'Send me updates' },
 *   ]}
 *   onSubmit={(values) => console.log(values)}
 * />
 * ```
 */
export function FormBuilder<TData extends Record<string, unknown>>({
  defaultValues,
  fields,
  onSubmit,
  submitLabel = "Submit",
  resetLabel,
  onReset,
  className,
}: FormBuilderProps<TData>) {
  const form = useForm<TData>({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      className={clsx("form-builder", className)}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      onReset={(e) => {
        e.preventDefault();
        form.reset();
        onReset?.();
      }}
      noValidate
    >
      {fields.map((field) => (
        <form.Field
          key={field.name}
          name={field.name as DeepKeys<TData>}
          validators={buildValidators(field as FieldDef<Record<string, unknown>>)}
        >
          {(fieldApi) => (
            <FormBuilderField
              field={field as FieldDef<Record<string, unknown>>}
              fieldApi={fieldApi}
            />
          )}
        </form.Field>
      ))}

      <div className="form-builder__actions">
        {resetLabel && (
          <Button type="reset" variant="outline">
            {resetLabel}
          </Button>
        )}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              variant="primary"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? "Submitting…" : submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}

FormBuilder.displayName = "FormBuilder";
