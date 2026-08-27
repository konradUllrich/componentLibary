import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { useFieldId } from "../../hooks/useFieldId";
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
 * import { NativeSelect } from '@mp-ku/mp-components';
 *
 * <NativeSelect label="Country">
 *   <option value="">Select a country...</option>
 *   <option value="us">United States</option>
 *   <option value="uk">United Kingdom</option>
 *   <option value="ca">Canada</option>
 * </NativeSelect>
 * ```
 *
 * See {@link ./NativeSelect.example.tsx} for the live, greppable version of
 * this snippet.
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
    const selectId = useFieldId(id);
    const messageId = `${selectId}-message`;
    const hasMessage = Boolean(helperText || (error && errorMessage));

    return (
      <FormControl
        label={label}
        htmlFor={selectId}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        messageId={messageId}
      >
        <div className="mp-native-select-container">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              "mp-native-select",
              `mp-native-select--${variant}`,
              `mp-native-select--${size}`,
              error && "mp-native-select--error",
              disabled && "mp-native-select--disabled",
            )}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={hasMessage ? messageId : undefined}
            {...props}
          >
            {children}
          </select>
          <span className="mp-native-select-icon">▼</span>
        </div>
      </FormControl>
    );
  },
);

NativeSelect.displayName = "NativeSelect";
