import React from "react";
import clsx from "clsx";
import "./Badge.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge variant
   * @default "default"
   */
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "info";

  /**
   * Badge size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Badge appearance
   * @default "solid"
   */
  appearance?: "solid" | "outline" | "subtle";

  /**
   * Badge content/label
   */
  children: React.ReactNode;

  /**
   * Optional icon element (displayed before text)
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Badge Component
 *
 * A small, colored label for displaying status, category, or count information.
 * Supports multiple variants, sizes, and styles.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" size="sm">Pending</Badge>
 * <Badge variant="destructive" appearance="outline">Error</Badge>
 * <Badge icon={<CheckIcon />}>Verified</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = "default",
      size = "md",
      appearance: badgeStyle = "solid",
      children,
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "mp-badge",
          `mp-badge--${variant}`,
          `mp-badge--${size}`,
          `mp-badge--${badgeStyle}`,
          className,
        )}
        {...props}
      >
        {icon && <span className="mp-badge__icon">{icon}</span>}
        <span className="mp-badge__text">{children}</span>
      </div>
    );
  },
);

Badge.displayName = "Badge";
