import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { useFieldId } from "../../hooks/useFieldId";
import "./ColorPicker.css";

export interface ColorPickerProps {
  /** Current color, as a hex string (e.g. "#7c3aed") */
  value: string;

  /** Called with the new hex string when the swatch or text field changes */
  onValueChange: (value: string) => void;

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
 * <ColorPicker label="Primary Color" value={color} onValueChange={setColor} />
 * ```
 */
export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      value,
      onValueChange,
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
    const swatchId = useFieldId(id);
    const messageId = `${swatchId}-message`;
    const hasMessage = Boolean(helperText || (error && errorMessage));

    return (
      <FormControl
        label={label}
        htmlFor={swatchId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        messageId={messageId}
      >
        <div className="mp-color-picker">
          <input
            ref={ref}
            id={swatchId}
            name={name}
            type="color"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            className={clsx(
              "mp-color-picker__swatch",
              disabled && "mp-color-picker__swatch--disabled",
            )}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            disabled={disabled}
            aria-label={label ? `${label} hex value` : "Color hex value"}
            aria-invalid={error || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
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
