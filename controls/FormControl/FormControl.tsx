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

  /**
   * HTML id for the label element itself.
   * Pass this same id as `aria-labelledby` on the wrapped control (e.g. a
   * `role="group"` container that has no single focusable element to
   * `htmlFor`) so assistive tech associates the label with the group.
   */
  labelId?: string;

  /**
   * HTML id for the helper/error message element.
   * Pass this same id as `aria-describedby` on the wrapped control so
   * assistive tech associates the message with the field (WCAG 3.3.1).
   */
  messageId?: string;
}

/**
 * FormControl Component
 *
 * Shared wrapper for consistent form control layout across Input, Select, Checkbox, etc.
 * Handles top label, helper text, and error messages.
 *
 * @example
 * ```tsx
 * <FormControl label="Email" htmlFor="email-input">
 *   <input id="email-input" type="email" />
 * </FormControl>
 * ```
 *
 * See {@link ./FormControl.example.tsx} for the live, greppable version of
 * this snippet — it also drives the demo site's "Usage" section.
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
  labelId,
  messageId,
}: FormControlProps) => {
  return (
    <div className={clsx("mp-form-control", className)}>
      {label && (
        <Label id={labelId} htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      <div className="mp-form-control__input">{children}</div>
      {(helperText || (error && errorMessage)) && (
        <div
          id={messageId}
          className={clsx("mp-form-control__message", {
            "mp-form-control__message--error": error,
          })}
        >
          {error && errorMessage ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

FormControl.displayName = "FormControl";
