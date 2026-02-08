import React from "react";
import clsx from "clsx";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "destructive" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether button is in loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Aria label for accessibility (required if no visible text)
   */
  "aria-label"?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Button content
   */
  children?: React.ReactNode;
}

/**
 * Button Component
 *
 * Accessible button component with multiple variants and sizes.
 * Built with Radix primitives and OkLab color system.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="destructive" disabled>
 *   Delete
 * </Button>
 *
 * <Button isLoading>
 *   Saving...
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      className,
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={clsx(
          "button",
          `button--${variant}`,
          `button--${size}`,
          isLoading && "button--loading",
          className,
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        {...props}
      >
        {isLoading && (
          <span className="button__spinner" aria-hidden="true">
            <span className="button__spinner-dot"></span>
          </span>
        )}
        <span className="button__content">{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
