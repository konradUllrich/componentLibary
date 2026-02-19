/**
 * FormBuilder types – all public types for the FormBuilder component.
 *
 * The key design goal is to make field names and validator signatures
 * fully type-safe relative to the form data type (TData).
 *
 * Discriminated unions on `fieldType` ensure that:
 *  – only string keys may be used with text / email / password / textarea / select fields
 *  – only number keys may be used with number fields
 *  – only boolean keys may be used with checkbox fields
 *  – any key may be used with custom fields
 *
 * Validator functions receive a value that is already narrowed to the
 * correct primitive type for their field, so IDEs provide full autocomplete.
 */

import type React from "react";

// ─── Key-type helpers ─────────────────────────────────────────────────────────

/** Keys of TData whose values extend `string` */
export type StringKeys<TData> = {
  [K in keyof TData]: TData[K] extends string ? K : never;
}[keyof TData] &
  string;

/** Keys of TData whose values extend `number` */
export type NumberKeys<TData> = {
  [K in keyof TData]: TData[K] extends number ? K : never;
}[keyof TData] &
  string;

/** Keys of TData whose values extend `boolean` */
export type BooleanKeys<TData> = {
  [K in keyof TData]: TData[K] extends boolean ? K : never;
}[keyof TData] &
  string;

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * A synchronous validator for a single field.
 * Return an error message string, or `undefined` when the value is valid.
 */
export type FieldValidatorFn<TValue> = (value: TValue) => string | undefined;

/** Validation hooks that can be attached to a field */
export interface FieldValidation<TValue> {
  /** Runs on every change – ideal for real-time feedback */
  onChange?: FieldValidatorFn<TValue>;
  /** Runs when the field loses focus */
  onBlur?: FieldValidatorFn<TValue>;
}

// ─── Option type (for select fields) ─────────────────────────────────────────

/** A single option rendered inside a `<select>` element */
export interface SelectOption {
  label: string;
  value: string;
}

// ─── Base field definition ────────────────────────────────────────────────────

interface BaseField<TData extends object, TName extends keyof TData & string> {
  /** Key in the form data object – constrained by the value type */
  name: TName;
  /** Visible label rendered above the control */
  label: string;
  /** Optional helper text shown beneath the control */
  helperText?: string;
  /** Marks the field visually and semantically as required */
  required?: boolean;
  /** Disables the field */
  disabled?: boolean;
  /** Additional CSS class applied to the field wrapper */
  className?: string;
  /**
   * Number of grid columns this field spans when the form uses a multi-column
   * layout via the `columns` prop.  Values are clamped to the total column
   * count.  Has no effect when `columns` is 1 (the default).
   * @default 1
   */
  colSpan?: number;
}

// ─── Concrete field types ─────────────────────────────────────────────────────

/** Single-line text input – `name` must map to a `string` value */
export type TextField<TData extends object> = BaseField<
  TData,
  StringKeys<TData>
> & {
  fieldType: "text" | "email" | "password";
  placeholder?: string;
  validate?: FieldValidation<string>;
};

/** Multi-line textarea – `name` must map to a `string` value */
export type TextareaField<TData extends object> = BaseField<
  TData,
  StringKeys<TData>
> & {
  fieldType: "textarea";
  placeholder?: string;
  /** Number of visible rows @default 3 */
  rows?: number;
  validate?: FieldValidation<string>;
};

/** Numeric input – `name` must map to a `number` value */
export type NumberField<TData extends object> = BaseField<
  TData,
  NumberKeys<TData>
> & {
  fieldType: "number";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  validate?: FieldValidation<number>;
};

/** Native `<select>` dropdown – `name` must map to a `string` value */
export type SelectField<TData extends object> = BaseField<
  TData,
  StringKeys<TData>
> & {
  fieldType: "select";
  options: SelectOption[];
  /** Placeholder option shown when no value is selected */
  placeholder?: string;
  validate?: FieldValidation<string>;
};

/** Checkbox – `name` must map to a `boolean` value */
export type CheckboxField<TData extends object> = BaseField<
  TData,
  BooleanKeys<TData>
> & {
  fieldType: "checkbox";
  /** Inline label text rendered next to the checkbox */
  inlineLabel?: string;
  validate?: FieldValidation<boolean>;
};

// ─── Custom field ─────────────────────────────────────────────────────────────

/**
 * Props passed to the `render` function of a `CustomField`.
 * The custom renderer receives the current value, change/blur handlers,
 * and any validation error state so it can integrate with TanStack Form.
 */
export interface CustomFieldRenderProps {
  /** Current field value (narrowed at runtime by the consumer) */
  value: unknown;
  /** Update the field value */
  onChange: (value: unknown) => void;
  /** Notify form that the field has lost focus */
  onBlur: () => void;
  /** Whether the field currently has a validation error */
  hasError: boolean;
  /** Validation error message, if any */
  errorMessage: string | undefined;
}

/**
 * Custom field – renders any React element via a `render` function.
 * Use this when no built-in `fieldType` suits your needs (e.g. a date picker,
 * colour input, or any compound control).  `name` may be any key in `TData`.
 */
export type CustomField<TData extends object> = BaseField<
  TData,
  keyof TData & string
> & {
  fieldType: "custom";
  /** Render function for the custom control */
  render: (props: CustomFieldRenderProps) => React.ReactNode;
  validate?: FieldValidation<unknown>;
};

// ─── Union ────────────────────────────────────────────────────────────────────

/** All supported field definitions for a given form data type */
export type FieldDef<TData extends object> =
  | TextField<TData>
  | TextareaField<TData>
  | NumberField<TData>
  | SelectField<TData>
  | CheckboxField<TData>
  | CustomField<TData>;

// ─── FormBuilder props ────────────────────────────────────────────────────────

export interface FormBuilderProps<TData extends object> {
  /**
   * Initial (default) values for every field.
   * The generic `TData` is inferred from this prop, so no explicit
   * type argument is needed at the call site.
   */
  defaultValues: TData;

  /**
   * Ordered list of field definitions.
   * Each entry is a discriminated-union member keyed to the matching
   * value type in `TData`.
   */
  fields: FieldDef<TData>[];

  /**
   * Called with fully-typed form values once the form passes validation
   * and the user submits.
   */
  onSubmit: (values: TData) => void | Promise<void>;

  /** Label for the submit button @default "Submit" */
  submitLabel?: string;

  /** If provided, a reset button is rendered with this label */
  resetLabel?: string;

  /** Called after the form has been reset to its default values */
  onReset?: () => void;

  /** Additional CSS class applied to the `<form>` element */
  className?: string;

  /**
   * Number of columns in the form grid layout.
   * When greater than 1 a CSS grid is applied and individual fields can
   * span multiple columns via their `colSpan` property.
   * @default 1
   */
  columns?: number;
}
