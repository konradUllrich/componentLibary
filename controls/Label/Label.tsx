import React from "react";
import clsx from "clsx";
import "./Label.css";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label text
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Associated input id
   */
  htmlFor?: string;

  /**
   * Required indicator
   */
  required?: boolean;
}

/**
 * Label Component
 *
 * Shared label component for form inputs.
 * Displays label text with optional required indicator.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="username" required>Username</Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, required, ...props }, ref) => {
    return (
      <label ref={ref} className={clsx("label", className)} {...props}>
        {children}
        {required && <span className="label__required">*</span>}
      </label>
    );
  },
);

Label.displayName = "Label";
