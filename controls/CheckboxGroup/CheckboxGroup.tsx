import React from "react";
import clsx from "clsx";
import { FormControl } from "../FormControl";
import { Checkbox } from "../Checkbox";
import { useFieldId } from "../../hooks/useFieldId";
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
  "onChange" | "onValueChange"
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
  onValueChange?: (values: string[]) => void;

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
 * const [selected, setSelected] = useState<string[]>([]);
 *
 * <CheckboxGroup
 *   label="Select options"
 *   options={[
 *     { value: "option1", label: "Option 1" },
 *     { value: "option2", label: "Option 2" },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 *
 * <CheckboxGroup
 *   label="Filters"
 *   direction="horizontal"
 *   variant="filled"
 *   options={[
 *     { value: "a", label: "Option A" },
 *     { value: "b", label: "Option B" },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 * ```
 *
 * See {@link ./CheckboxGroup.example.tsx} for the live, greppable version of
 * this snippet — it also drives the demo site's "Usage" section.
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
      onValueChange,
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
    const groupId = useFieldId();
    const messageId = `${groupId}-message`;
    const hasMessage = Boolean(helperText || (error && errorMessage));

    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      const newValue = checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      onValueChange?.(newValue);
    };

    return (
      <FormControl
        label={label}
        required={required}
        error={error}
        errorMessage={errorMessage}
        helperText={helperText}
        className={className}
        labelId={groupId}
        messageId={messageId}
      >
        <div
          ref={ref}
          className={clsx("mp-checkbox-group", `mp-checkbox-group--${direction}`, {
            "mp-checkbox-group--error": error,
          })}
          role="group"
          aria-labelledby={label ? groupId : undefined}
          aria-invalid={error || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
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
