import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./Checkbox.css";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * Checkbox variant (only used if no custom children provided)
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";

  /**
   * Label text displayed above checkbox
   */
  label?: string;

  /**
   * Inline label text next to checkbox
   */
  inlineLabel?: string;

  /**
   * Helper text below checkbox
   */
  helperText?: string;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Error message (shows when error is true)
   */
  errorMessage?: string;

  /**
   * Required indicator for label
   */
  required?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom trigger element (e.g., Badge, Button)
   * If provided, this replaces the default checkbox styling
   */
  children?: React.ReactNode;
}

/**
 * Checkbox Component
 *
 * An accessible checkbox input with support for top labels, inline labels,
 * error states, and helper text. Aligned with other form controls.
 *
 * @example
 * ```tsx
 * // With top label
 * <Checkbox
 *   label="Notifications"
 *   inlineLabel="Email me updates"
 *   onChange={(e) => console.log(e.target.checked)}
 * />
 *
 * // With inline label only
 * <Checkbox
 *   inlineLabel="I agree to the terms"
 * />
 *
 * // With error state
 * <Checkbox
 *   label="Preferences"
 *   inlineLabel="Accept terms"
 *   error
 *   errorMessage="You must accept the terms"
 * />
 *
 * // With custom trigger (e.g., Badge)
 * <Checkbox
 *   name="filters"
 *   value="active"
 *   label="Status Filters"
 * >
 *   <Badge variant="primary">Active</Badge>
 * </Checkbox>
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = "default",
      label,
      inlineLabel,
      helperText,
      error = false,
      errorMessage,
      required = false,
      className,
      disabled,
      id,
      children,
      ...props
    },
    ref,
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <FormControl
        label={label}
        htmlFor={checkboxId}
        required={required}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <div className="checkbox-container">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={clsx("checkbox-input", {
              "checkbox-input--error": error,
              "checkbox-input--disabled": disabled,
            })}
            disabled={disabled}
            {...props}
          />
          <label htmlFor={checkboxId} className="checkbox-label">
            {children ? (
              <>{children}</>
            ) : (
              <>
                <span
                  className={clsx(
                    "checkbox-custom",
                    `checkbox-custom--${variant}`,
                  )}
                />
                {inlineLabel && (
                  <span className="checkbox-text">{inlineLabel}</span>
                )}
              </>
            )}
          </label>
        </div>
      </FormControl>
    );
  },
);

Checkbox.displayName = "Checkbox";
