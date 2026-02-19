import React, { useId } from "react";
import type { FieldApi } from "@tanstack/form-core";
import { Input } from "../Input";
import { NativeSelect } from "../NativeSelect";
import { Checkbox } from "../Checkbox";
import { FormControl } from "../FormControl";
import type { FieldDef } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFieldApi = FieldApi<any, any, any, any, any>;

interface FormBuilderFieldProps<TData extends object> {
  field: FieldDef<TData>;
  fieldApi: AnyFieldApi;
}

/**
 * Renders the correct control component for a single field definition.
 * This is an internal sub-component used by FormBuilder.
 */
export function FormBuilderField<TData extends object>({
  field,
  fieldApi,
}: FormBuilderFieldProps<TData>) {
  const { state, handleChange, handleBlur } = fieldApi;
  const textareaId = useId();
  const hasError = state.meta.errors.length > 0;
  const errorMessage = hasError ? String(state.meta.errors[0]) : undefined;

  if (field.fieldType === "custom") {
    return (
      <>
        {field.render({
          label: field.label,
          value: state.value,
          onChange: handleChange,
          onBlur: handleBlur,
          hasError,
          errorMessage,
        })}
      </>
    );
  }

  if (field.fieldType === "checkbox") {
    return (
      <Checkbox
        className={field.className}
        label={field.label}
        inlineLabel={field.inlineLabel}
        helperText={field.helperText}
        required={field.required}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        checked={Boolean(state.value)}
        onChange={(e) => handleChange(e.target.checked)}
        onBlur={handleBlur}
      />
    );
  }

  if (field.fieldType === "select") {
    return (
      <NativeSelect
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        value={String(state.value ?? "")}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
      >
        {field.placeholder && <option value="">{field.placeholder}</option>}
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </NativeSelect>
    );
  }

  if (field.fieldType === "textarea") {
    return (
      <FormControl
        className={field.className}
        label={field.label}
        htmlFor={textareaId}
        helperText={field.helperText}
        required={field.required}
        error={hasError}
        errorMessage={errorMessage}
      >
        <textarea
          id={textareaId}
          className="form-builder__textarea"
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          disabled={field.disabled}
          value={String(state.value ?? "")}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
        />
      </FormControl>
    );
  }

  // text | email | password | number
  return (
    <Input
      className={field.className}
      type={field.fieldType}
      label={field.label}
      helperText={field.helperText}
      placeholder={field.placeholder}
      required={field.required}
      disabled={field.disabled}
      error={hasError}
      errorMessage={errorMessage}
      value={String(state.value ?? "")}
      onChange={(e) =>
        handleChange(
          field.fieldType === "number"
            ? e.target.valueAsNumber
            : e.target.value,
        )
      }
      onBlur={handleBlur}
    />
  );
}

FormBuilderField.displayName = "FormBuilderField";
