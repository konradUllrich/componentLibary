import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { Checkbox } from "../Checkbox";
import "./CheckboxGroup.css";

export interface CheckboxOption {
  /**
   * The value of the checkbox
   */
  value: string;

  /**
   * Label text displayed next to checkbox
   */
  label: string;

  /**
   * Whether this option is disabled
   */
  disabled?: boolean;

  /**
   * Custom content to render instead of label
   * Can be a React node or a function that receives the checked state
   */
  children?: React.ReactNode | ((checked: boolean) => React.ReactNode);
}

export interface CheckboxGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Group label displayed above all checkboxes
   */
  label?: string;

  /**
   * Array of checkbox options
   */
  options: CheckboxOption[];

  /**
   * Currently selected values
   */
  value?: string[];

  /**
   * Callback when selection changes
   */
  onChange?: (values: string[]) => void;

  /**
   * Checkbox variant for all items
   * @default "default"
   */
  variant?: "default" | "filled" | "outline";

  /**
   * Helper text below the group
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
   * Layout direction
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
}

/**
 * CheckboxGroup Component
 *
 * A group of checkboxes allowing multiple selections with unified state management.
 * Supports custom variants, error states, and flexible layouts.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [selected, setSelected] = useState<string[]>([]);
 *
 * <CheckboxGroup
 *   label="Select Options"
 *   options={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 *
 * // Horizontal layout
 * <CheckboxGroup
 *   label="Status Filters"
 *   direction="horizontal"
 *   options={[
 *     { value: "active", label: "Active" },
 *     { value: "inactive", label: "Inactive" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 *
 * // With error state
 * <CheckboxGroup
 *   label="Preferences"
 *   options={[...]}
 *   value={selected}
 *   onChange={setSelected}
 *   error
 *   errorMessage="You must select at least one option"
 * />
 *
 * // With custom triggers (e.g., Badges)
 * <CheckboxGroup
 *   label="Tags"
 *   options={[
 *     {
 *       value: "tag1",
 *       label: "Tag 1",
 *       children: <Badge variant="primary">Tag 1</Badge>,
 *     },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 *
 * // With custom triggers as function (showing state)
 * <CheckboxGroup
 *   label="Status Options"
 *   options={[
 *     {
 *       value: "active",
 *       label: "Active",
 *       children: (checked) => (
 *         <Badge variant={checked ? "success" : "default"}>
 *           {checked ? "✓ Active" : "Active"}
 *         </Badge>
 *       ),
 *     },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(
  (
    {
      label,
      options,
      value = [],
      onChange,
      variant = "default",
      helperText,
      error = false,
      errorMessage,
      required = false,
      className,
      direction = "vertical",
      ...props
    },
    ref,
  ) => {
    const groupId = `checkbox-group-${Math.random().toString(36).substr(2, 9)}`;

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      const newValue = checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      onChange?.(newValue);
    };

    return (
      <FormControl
        label={label}
        required={required}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
      >
        <div
          ref={ref}
          className={clsx("checkbox-group", `checkbox-group--${direction}`, {
            "checkbox-group--error": error,
          })}
          role="group"
          aria-labelledby={groupId}
          {...props}
        >
          {options.map((option) => (
            <Checkbox
              key={option.value}
              id={`${groupId}-${option.value}`}
              name={groupId}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(e) =>
                handleCheckboxChange(option.value, e.target.checked)
              }
              disabled={option.disabled}
              variant={variant}
              inlineLabel={option.label}
            >
              {typeof option.children === "function"
                ? option.children(value.includes(option.value))
                : option.children}
            </Checkbox>
          ))}
        </div>
      </FormControl>
    );
  },
);

CheckboxGroup.displayName = "CheckboxGroup";
