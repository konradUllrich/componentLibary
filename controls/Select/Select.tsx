import React from "react";
import { ReactSelect, ReactSelectItem } from "../ReactSelect";
import { NativeSelect } from "../NativeSelect";
import { useIsMobile } from "./useIsMobile";

export interface SelectProps {
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
   * Select options - array of {value, label} or {value, label, disabled}
   */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Force mobile or desktop mode (for testing)
   */
  forceMobile?: boolean;
}

/**
 * Select Component
 *
 * Intelligent select that uses native HTML select on mobile devices
 * and Radix UI select on desktop for optimal UX.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *     { value: "ca", label: "Canada" },
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
export const Select = ({
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
  options,
  className,
  forceMobile,
}: SelectProps) => {
  const isMobile = useIsMobile();
  const useMobile = forceMobile !== undefined ? forceMobile : isMobile;

  // For NativeSelect, we need to handle onChange
  const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onValueChange?.(e.target.value);
  };

  if (useMobile) {
    return (
      <NativeSelect
        variant={variant}
        size={size}
        error={error}
        label={label}
        helperText={helperText}
        errorMessage={errorMessage}
        value={value}
        defaultValue={defaultValue}
        onChange={handleNativeChange}
        disabled={disabled}
        className={className}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </NativeSelect>
    );
  }

  return (
    <ReactSelect
      variant={variant}
      size={size}
      error={error}
      label={label}
      helperText={helperText}
      errorMessage={errorMessage}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      className={className}
    >
      {options.map((option) => (
        <ReactSelectItem
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </ReactSelectItem>
      ))}
    </ReactSelect>
  );
};

Select.displayName = "Select";
