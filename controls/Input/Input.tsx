import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./Input.css";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /**
   * Input variant
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";

  /**
   * Input size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Label for the input
   */
  label?: string;

  /**
   * Helper text below input
   */
  helperText?: string;

  /**
   * Error message (shows when error is true)
   */
  errorMessage?: string;
}

/**
 * Input Component
 *
 * Flexible input field with variants, sizes, and states.
 * Supports labels, helper text, and error messages.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 * />
 *
 * <Input
 *   label="Username"
 *   error
 *   errorMessage="Username is required"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      className,
      label,
      helperText,
      errorMessage,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <FormControl
        label={label}
        htmlFor={inputId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "input",
            `input--${variant}`,
            `input--${size}`,
            error && "input--error",
            disabled && "input--disabled",
          )}
          disabled={disabled}
          {...props}
        />
      </FormControl>
    );
  },
);

Input.displayName = "Input";
