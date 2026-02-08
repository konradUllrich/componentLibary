import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./Radio.css";

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * Radio variant (only used if no custom children provided)
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";

  /**
   * Label text displayed above radio
   */
  label?: string;

  /**
   * Inline label text next to radio
   */
  inlineLabel?: string;

  /**
   * Helper text below radio
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
   * If provided, this replaces the default radio styling
   */
  children?: React.ReactNode;
}

/**
 * Radio Component
 *
 * An accessible radio input with support for top labels, inline labels,
 * error states, and helper text. Aligned with other form controls.
 *
 * @example
 * ```tsx
 * // With top label
 * <Radio
 *   name="option"
 *   value="option1"
 *   label="Select Option"
 *   inlineLabel="Option 1"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * // With inline label only
 * <Radio
 *   name="agreement"
 *   value="agree"
 *   inlineLabel="I agree"
 * />
 *
 * // With error state
 * <Radio
 *   name="choice"
 *   value="choice1"
 *   label="Make a choice"
 *   inlineLabel="Choice 1"
 *   error
 *   errorMessage="You must make a selection"
 * />
 *
 * // With custom trigger (e.g., Badge)
 * <Radio
 *   name="status"
 *   value="active"
 *   label="Status"
 * >
 *   <Badge variant="success">Active</Badge>
 * </Radio>
 * ```
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <FormControl
        label={label}
        htmlFor={radioId}
        required={required}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <div className="radio-container">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className={clsx("radio-input", {
              "radio-input--error": error,
              "radio-input--disabled": disabled,
            })}
            disabled={disabled}
            {...props}
          />
          <label htmlFor={radioId} className="radio-label">
            {children ? (
              <>{children}</>
            ) : (
              <>
                <span
                  className={clsx("radio-custom", `radio-custom--${variant}`)}
                />
                {inlineLabel && (
                  <span className="radio-text">{inlineLabel}</span>
                )}
              </>
            )}
          </label>
        </div>
      </FormControl>
    );
  },
);

Radio.displayName = "Radio";
