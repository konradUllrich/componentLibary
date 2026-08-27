import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { useFieldId } from "../../hooks/useFieldId";
import "./Textarea.css";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label for the textarea
   */
  label?: string;

  /**
   * Helper text below the textarea
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
}

/**
 * Textarea Component
 *
 * Multi-line text input with label, helper text, and error message support.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter a description"
 *   rows={4}
 * />
 *
 * <Textarea
 *   label="Notes"
 *   error
 *   errorMessage="Notes are required"
 * />
 * ```
 */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      className,
      disabled,
      id,
      rows = 3,
      ...props
    },
    ref,
  ) => {
    const textareaId = useFieldId(id);
    const messageId = `${textareaId}-message`;
    const hasMessage = Boolean(helperText || (error && errorMessage));

    return (
      <FormControl
        label={label}
        htmlFor={textareaId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        required={props.required}
        messageId={messageId}
      >
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            "mp-textarea",
            error && "mp-textarea--error",
            disabled && "mp-textarea--disabled",
          )}
          disabled={disabled}
          rows={rows}
          aria-invalid={error || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          {...props}
        />
      </FormControl>
    );
  },
);

Textarea.displayName = "Textarea";
