import React from "react";
import clsx from "clsx";
import type { FieldApi } from "@tanstack/react-form";
import { Input } from "../Input";
import { NativeSelect } from "../NativeSelect";
import { Checkbox } from "../Checkbox";
import { Textarea } from "../Textarea";
import { Slider } from "../Slider";
import { ColorPicker } from "../ColorPicker";
import { Combobox } from "../Combobox";
import { ReactSelect, ReactSelectItem } from "../ReactSelect";
import { CheckboxGroup } from "../CheckboxGroup";
import { Radio } from "../Radio";
import { FormControl } from "../FormControl";
import { useFieldId } from "../../hooks/useFieldId";
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
  const hasError = state.meta.errors.length > 0;
  const errorMessage = hasError ? String(state.meta.errors[0]) : undefined;
  const radioGroupLabelId = useFieldId();

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
        variant={field.variant}
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

  if (field.fieldType === "slider") {
    return (
      <Slider
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        min={field.min}
        max={field.max}
        step={field.step}
        value={Number(state.value ?? 0)}
        onChange={(e) => handleChange(e.target.valueAsNumber)}
        onBlur={handleBlur}
      />
    );
  }

  if (field.fieldType === "colorPicker") {
    return (
      <ColorPicker
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        value={String(state.value ?? "")}
        onValueChange={handleChange}
      />
    );
  }

  if (field.fieldType === "combobox") {
    return (
      <Combobox
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        placeholder={field.placeholder}
        options={field.options}
        allowCreate={field.allowCreate}
        onCreate={field.onCreate}
        value={String(state.value ?? "")}
        onValueChange={handleChange}
      />
    );
  }

  if (field.fieldType === "reactSelect") {
    return (
      <ReactSelect
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        placeholder={field.placeholder}
        value={String(state.value ?? "")}
        onValueChange={handleChange}
      >
        {field.options.map((opt) => (
          <ReactSelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </ReactSelectItem>
        ))}
      </ReactSelect>
    );
  }

  if (field.fieldType === "checkboxGroup") {
    return (
      <CheckboxGroup
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        required={field.required}
        error={hasError}
        errorMessage={errorMessage}
        direction={field.direction}
        variant={field.variant}
        options={field.options}
        value={Array.isArray(state.value) ? state.value : []}
        onValueChange={handleChange}
      />
    );
  }

  if (field.fieldType === "radioGroup") {
    return (
      <FormControl
        label={field.label}
        required={field.required}
        error={hasError}
        errorMessage={errorMessage}
        helperText={field.helperText}
        className={field.className}
        labelId={radioGroupLabelId}
      >
        <div
          role="radiogroup"
          aria-labelledby={field.label ? radioGroupLabelId : undefined}
          className={clsx(
            "mp-radio-group",
            field.direction === "horizontal" && "mp-radio-group--horizontal",
          )}
        >
          {field.options.map((opt) => (
            <Radio
              key={opt.value}
              name={field.name}
              value={opt.value}
              variant={field.variant}
              inlineLabel={opt.label}
              disabled={field.disabled}
              checked={state.value === opt.value}
              onChange={() => handleChange(opt.value)}
              onBlur={handleBlur}
            />
          ))}
        </div>
      </FormControl>
    );
  }

  if (field.fieldType === "textarea") {
    return (
      <Textarea
        className={field.className}
        label={field.label}
        helperText={field.helperText}
        required={field.required}
        disabled={field.disabled}
        error={hasError}
        errorMessage={errorMessage}
        placeholder={field.placeholder}
        rows={field.rows ?? 3}
        value={String(state.value ?? "")}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
      />
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
            ? Number.isNaN(e.target.valueAsNumber)
              ? 0
              : e.target.valueAsNumber
            : e.target.value,
        )
      }
      onBlur={handleBlur}
    />
  );
}

FormBuilderField.displayName = "FormBuilderField";
