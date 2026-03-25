import React from "react";
import clsx from "clsx";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import "./ToggleGroup.css";

export type ToggleGroupVariant = "default" | "outline";
export type ToggleGroupSize = "sm" | "md" | "lg";

export type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroup.Root
> & {
  /**
   * Visual style variant applied to all items
   * @default "default"
   */
  variant?: ToggleGroupVariant;

  /**
   * Size applied to all items
   * @default "md"
   */
  size?: ToggleGroupSize;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Accessible label for the group
   */
  "aria-label"?: string;
};

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Item> {
  /**
   * The unique value for this item within the group
   */
  value: string;

  /**
   * Whether this specific item is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Item content
   */
  children?: React.ReactNode;

  /**
   * Accessible label (required when no visible text)
   */
  "aria-label"?: string;
}

/**
 * ToggleGroup – A set of toggle buttons where one or multiple can be pressed.
 *
 * Built on Radix UI for full accessibility (roving focus, keyboard nav, ARIA).
 * Use `type="single"` for exclusive selection, `type="multiple"` for multi-select.
 *
 * @example
 * ```tsx
 * // Single selection
 * <ToggleGroup type="single" aria-label="Text alignment">
 *   <ToggleGroupItem value="left" aria-label="Left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Center">Center</ToggleGroupItem>
 *   <ToggleGroupItem value="right" aria-label="Right">Right</ToggleGroupItem>
 * </ToggleGroup>
 *
 * // Multiple selection
 * <ToggleGroup type="multiple" aria-label="Text formatting">
 *   <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
 *   <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <RadixToggleGroup.Root
        ref={ref}
        className={clsx(
          "mp-toggle-group",
          `mp-toggle-group--${variant}`,
          `mp-toggle-group--${size}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixToggleGroup.Root>
    );
  },
);

ToggleGroup.displayName = "ToggleGroup";

/**
 * ToggleGroupItem – An individual toggle button inside a ToggleGroup.
 *
 * @example
 * ```tsx
 * <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
 * ```
 */
export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, children, "aria-label": ariaLabel, ...props }, ref) => {
  return (
    <RadixToggleGroup.Item
      ref={ref}
      aria-label={ariaLabel}
      className={clsx("mp-toggle-group__item", className)}
      {...props}
    >
      {children}
    </RadixToggleGroup.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";
