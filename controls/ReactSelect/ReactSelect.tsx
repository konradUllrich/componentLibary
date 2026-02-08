import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import "./ReactSelect.css";

export interface ReactSelectProps {
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
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Current value
   */
  value?: string;

  /**
   * Default value
   */
  defaultValue?: string;

  /**
   * Change handler
   */
  onValueChange?: (value: string) => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Select options
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Select Component
 *
 * Accessible select dropdown built with Radix UI.
 * Supports variants, sizes, labels, and error states.
 *
 * @example
 * ```tsx
 * <Select label="Country" placeholder="Select a country">
 *   <SelectItem value="us">United States</SelectItem>
 *   <SelectItem value="uk">United Kingdom</SelectItem>
 *   <SelectItem value="ca">Canada</SelectItem>
 * </Select>
 * ```
 */
export const ReactSelect = ({
  variant = "default",
  size = "md",
  error = false,
  label,
  helperText,
  errorMessage,
  placeholder,
  value,
  defaultValue,
  onValueChange,
  disabled,
  children,
  className,
}: ReactSelectProps) => {
  return (
    <FormControl
      label={label}
      error={error}
      errorMessage={errorMessage}
      helperText={helperText}
      className={className}
    >
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={clsx(
            "select-trigger",
            `select-trigger--${variant}`,
            `select-trigger--${size}`,
            error && "select-trigger--error",
            disabled && "select-trigger--disabled",
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="select-icon">▼</SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="select-content">
            <SelectPrimitive.Viewport className="select-viewport">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </FormControl>
  );
};

ReactSelect.displayName = "ReactSelect";
