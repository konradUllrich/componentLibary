import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { useFieldId } from "../../hooks/useFieldId";
import "./Checkbox.css";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * Checkbox variant (only used if no custom children provided)
   * @default "default"
   */
  variant?: "default" | "filled" | "outline" | "toggle";

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
 * <Checkbox
 *   label="Notifications"
 *   inlineLabel="Email me updates"
 *   onChange={(e) => console.log(e.target.checked)}
 * />
 *
 * <Checkbox
 *   label="Terms"
 *   inlineLabel="I accept the terms"
 *   error
 *   errorMessage="You must accept the terms"
 * />
 *
 * <Checkbox
 *   variant="toggle"
 *   label="Dark mode"
 *   inlineLabel="Enable dark mode"
 *   defaultChecked
 * />
 * ```
 *
 * See {@link ./Checkbox.example.tsx} for the live, greppable version of this
 * snippet — it also drives the demo site's "Usage" section.
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
    const checkboxId = useFieldId(id);
    const messageId = `${checkboxId}-message`;
    const hasMessage = Boolean(helperText || (error && errorMessage));

    return (
      <FormControl
        label={label}
        htmlFor={checkboxId}
        required={required}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        messageId={messageId}
      >
        <div className="mp-checkbox-container">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={clsx("mp-checkbox-input", {
              "mp-checkbox-input--error": error,
              "mp-checkbox-input--disabled": disabled,
            })}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            {...props}
          />
          <label htmlFor={checkboxId} className="mp-checkbox-label">
            {children ? (
              <>{children}</>
            ) : (
              <>
                {variant === "toggle" ? (
                  <span className="mp-checkbox-toggle" aria-hidden="true" />
                ) : (
                  <span
                    className={clsx(
                      "mp-checkbox-custom",
                      `mp-checkbox-custom--${variant}`,
                    )}
                  />
                )}
                {inlineLabel && (
                  <span className="mp-checkbox-text">{inlineLabel}</span>
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
