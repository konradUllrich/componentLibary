import React from "react";
import clsx from "clsx";
import { Label } from "../Label";
import "./FormControl.css";

export interface FormControlProps {
  /**
   * Top label text
   */
  label?: string;

  /**
   * Helper text below control
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
   * The input/select/checkbox element
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * HTML id for label association
   */
  htmlFor?: string;
}

/**
 * FormControl Component
 *
 * Shared wrapper for consistent form control layout across Input, Select, Checkbox, etc.
 * Handles top label, helper text, and error messages.
 *
 * @internal Use within form control components
 *
 * @example
 * ```tsx
 * <FormControl label="Email" htmlFor="email-input">
 *   <input id="email-input" type="email" />
 * </FormControl>
 * ```
 */
export const FormControl = ({
  label,
  helperText,
  error = false,
  errorMessage,
  required = false,
  children,
  className,
  htmlFor,
}: FormControlProps) => {
  return (
    <div className={clsx("form-control", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      <div className="form-control__input">{children}</div>
      {(helperText || (error && errorMessage)) && (
        <div
          className={clsx("form-control__message", {
            "form-control__message--error": error,
          })}
        >
          {error && errorMessage ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

FormControl.displayName = "FormControl";
