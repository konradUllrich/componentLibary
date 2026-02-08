import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./NativeSelect.css";

export interface NativeSelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  /**
   * Select variant
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";

  /**
   * Select size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Label for the select
   */
  label?: string;

  /**
   * Helper text below select
   */
  helperText?: string;

  /**
   * Error message (shows when error is true)
   */
  errorMessage?: string;

  /**
   * Select options
   */
  children: React.ReactNode;
}

/**
 * NativeSelect Component
 *
 * Native HTML select with custom styling.
 * Simpler alternative to the Radix-based Select component.
 *
 * @example
 * ```tsx
 * <NativeSelect label="Country" placeholder="Select a country">
 *   <option value="">Choose...</option>
 *   <option value="us">United States</option>
 *   <option value="uk">United Kingdom</option>
 *   <option value="ca">Canada</option>
 * </NativeSelect>
 * ```
 */
export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(
  (
    {
      variant = "default",
      size = "md",
      error = false,
      label,
      helperText,
      errorMessage,
      className,
      disabled,
      id,
      children,
      ...props
    },
    ref,
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <FormControl
        label={label}
        htmlFor={selectId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <div className="native-select-container">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              "native-select",
              `native-select--${variant}`,
              `native-select--${size}`,
              error && "native-select--error",
              disabled && "native-select--disabled",
            )}
            disabled={disabled}
            {...props}
          >
            {children}
          </select>
          <span className="native-select-icon">▼</span>
        </div>
      </FormControl>
    );
  },
);

NativeSelect.displayName = "NativeSelect";
