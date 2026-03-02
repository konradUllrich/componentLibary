import React from "react";
import clsx from "clsx";
import * as RadixToggle from "@radix-ui/react-toggle";
import "./Toggle.css";

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof RadixToggle.Root> {
  /**
   * Visual style variant
   * @default "default"
   */
  variant?: ToggleVariant;

  /**
   * Toggle size
   * @default "md"
   */
  size?: ToggleSize;

  /**
   * Whether the toggle is in a pressed state
   */
  pressed?: boolean;

  /**
   * Default pressed state for uncontrolled usage
   */
  defaultPressed?: boolean;

  /**
   * Callback fired when the pressed state changes
   */
  onPressedChange?: (pressed: boolean) => void;

  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Toggle content
   */
  children?: React.ReactNode;

  /**
   * Accessible label (required when no visible text)
   */
  "aria-label"?: string;
}

/**
 * Toggle – A two-state button that can be turned on or off.
 *
 * Built on Radix UI for full accessibility (keyboard navigation, ARIA attributes).
 * Supports controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Toggle aria-label="Bold" defaultPressed>
 *   B
 * </Toggle>
 *
 * // Controlled
 * <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Bold">
 *   B
 * </Toggle>
 *
 * // Outline variant
 * <Toggle variant="outline" size="sm" aria-label="Italic">
 *   I
 * </Toggle>
 * ```
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      variant = "default",
      size = "md",
      pressed,
      defaultPressed,
      onPressedChange,
      disabled = false,
      className,
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixToggle.Root
        ref={ref}
        pressed={pressed}
        defaultPressed={defaultPressed}
        onPressedChange={onPressedChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={clsx(
          "toggle",
          `toggle--${variant}`,
          `toggle--${size}`,
          className,
        )}
        {...props}
      >
        {children}
      </RadixToggle.Root>
    );
  },
);

Toggle.displayName = "Toggle";
