import React, { forwardRef } from "react";
import clsx from "clsx";
import "./IntrexxIcon.css";

export type IntrexxIconProps = React.HTMLAttributes<HTMLElement> & {
  /** Icon font class name (e.g., "fa fa-icon") */
  iconClass?: string;
  /** Icon size in pixels (12, 16, 20, 24, 32, 36, 48) */
  size?: 12 | 16 | 20 | 24 | 32 | 36 | 48;
  /** Icon color variant */
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "info"
    | "foreground"
    | "currentColor";
};

/**
 * IntrexxIcon – Renders an icon from an icon font.
 *
 * @example
 * <IntrexxIcon iconClass="fa fa-heart" size="md" />
 */
export const IntrexxIcon = forwardRef<HTMLElement, IntrexxIconProps>(
  (
    { iconClass, size = 16, color = "currentColor", className, ...props },
    ref,
  ) => {
    return (
      <i
        ref={ref}
        className={clsx(
          "intrexx-icon",
          `intrexx-icon--${size}`,
          `intrexx-icon--${color}`,
          iconClass,
          className,
        )}
        aria-hidden="true"
        {...props}
      />
    );
  },
);

IntrexxIcon.displayName = "IntrexxIcon";
