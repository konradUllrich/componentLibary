import clsx from "clsx";
import { useForm, DeepKeys } from "@tanstack/react-form";
import { Button } from "../../common/Button";
import { FormBuilderField } from "./FormBuilderField";
import type { FieldDef, FieldSchema, FormBuilderProps } from "./types";
import "./FormBuilder.css";

/**
 * Converts a `FieldDef` `validate` object and optional `schema` into the
 * `validators` shape expected by TanStack Form's `form.Field`.
 *
 * When a `schema` is provided its `safeParse` is run first (on both
 * `onChange` and `onBlur`); if validation passes the optional `validate`
 * function for that trigger is run next.  Either check may return an error
 * message string; `undefined` means valid.
 */
function buildValidators<TData extends object>(field: FieldDef<TData>) {
  const { validate: v, schema } = field;
  if (!v && !schema) return undefined;

  const applySchema = (value: unknown): string | undefined => {
    if (!schema) return undefined;
    const result = (schema as FieldSchema<unknown>).safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };

  return {
    onChange:
      v?.onChange || schema
        ? ({ value }: { value: unknown }) =>
            applySchema(value) ??
            (v?.onChange ? (v.onChange(value as never) ?? undefined) : undefined)
        : undefined,
    onBlur:
      v?.onBlur || schema
        ? ({ value }: { value: unknown }) =>
            applySchema(value) ??
            (v?.onBlur ? (v.onBlur(value as never) ?? undefined) : undefined)
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
 * - `'custom'` → any key, renders via a `render` prop
 *
 * Each field can carry a `validate` object with typed `onChange`/`onBlur`
 * functions that receive the correct primitive value type.
 *
 * Use the `columns` prop for a multi-column grid layout; individual fields
 * can span multiple columns with the `colSpan` field property.
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
export function FormBuilder<TData extends object>({
  defaultValues,
  fields,
  onSubmit,
  submitLabel = "Submit",
  resetLabel,
  onReset,
  className,
  columns,
}: FormBuilderProps<TData>) {
  const gridColumns = Number(columns ?? 1);
  const isGrid = Number.isFinite(gridColumns) && gridColumns > 1;
  const form = useForm<TData>({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      className={clsx(
        "form-builder",
        isGrid && "form-builder--grid",
        className,
      )}
      style={
        isGrid
          ? { gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }
          : undefined
      }
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
        <div
          key={field.name}
          className="form-builder__field"
          style={
            isGrid && (field.colSpan ?? 1) > 1
              ? {
                  gridColumn: `span ${Math.min(
                    field.colSpan ?? 1,
                    gridColumns,
                  )}`,
                }
              : undefined
          }
        >
          <form.Field
            name={field.name as unknown as DeepKeys<TData>}
            validators={buildValidators(field)}
          >
            {(fieldApi) => (
              <FormBuilderField field={field} fieldApi={fieldApi} />
            )}
          </form.Field>
        </div>
      ))}

      <div className="form-builder__actions">
        {resetLabel && (
          <Button type="reset" variant="ghost">
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
