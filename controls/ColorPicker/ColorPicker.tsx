import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./ColorPicker.css";

export interface ColorPickerProps {
  /** Current color, as a hex string (e.g. "#7c3aed") */
  value: string;

  /** Called with the new hex string when the swatch or text field changes */
  onChange: (value: string) => void;

  /** Label for the color picker */
  label?: string;

  /** Helper text below the control */
  helperText?: string;

  /** Error state */
  error?: boolean;

  /** Error message (shows when error is true) */
  errorMessage?: string;

  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

/**
 * ColorPicker Component
 *
 * A native color swatch paired with an editable hex text field.
 *
 * @example
 * ```tsx
 * <ColorPicker label="Primary Color" value={color} onChange={setColor} />
 * ```
 */
export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      value,
      onChange,
      label,
      helperText,
      error = false,
      errorMessage,
      disabled,
      id,
      name,
      className,
    },
    ref,
  ) => {
    const swatchId =
      id || `color-picker-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <FormControl
        label={label}
        htmlFor={swatchId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <div className="mp-color-picker">
          <input
            ref={ref}
            id={swatchId}
            name={name}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={clsx(
              "mp-color-picker__swatch",
              disabled && "mp-color-picker__swatch--disabled",
            )}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            aria-label={label ? `${label} hex value` : "Color hex value"}
            className={clsx(
              "mp-input",
              "mp-color-picker__text",
              error && "mp-input--error",
              disabled && "mp-input--disabled",
            )}
          />
        </div>
      </FormControl>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
