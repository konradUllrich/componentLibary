import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import "./ReactSelect.css";

export interface ReactSelectItemProps {
  /**
   * Item value
   */
  value: string;

  /**
   * Item label
   */
  children: React.ReactNode;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SelectItem Component
 *
 * Individual option within a Select dropdown.
 *
 * @example
 * ```tsx
 * <SelectItem value="option1">Option 1</SelectItem>
 * <SelectItem value="option2" disabled>Option 2</SelectItem>
 * ```
 */
export const ReactSelectItem = React.forwardRef<
  HTMLDivElement,
  ReactSelectItemProps
>(({ value, children, disabled, className }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={clsx(
        "select-item",
        disabled && "select-item--disabled",
        className,
      )}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="select-item-indicator">
        ✓
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

ReactSelectItem.displayName = "SelectItem";
