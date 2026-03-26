import React, { forwardRef } from "react";
import clsx from "clsx";
import "./IntrexxIcon.css";

export type IntrexxIconProps = React.HTMLAttributes<HTMLElement> & {
  /** Icon font class name (e.g., "icon54-l_Animals-Bee") */
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

  /**
   * Some icons, like Home, are slightly offset and do not appear centered.
   * This adds 2px on the left, which fixes the issue in most cases.
   */
  fixPosition?: boolean;
};

/**
 * IntrexxIcon – Renders an icon from an icon font.
 *
 * @example
 * <IntrexxIcon iconClass="icon54-l_Animals-Bee" size={16} />
 */
export const IntrexxIcon = forwardRef<HTMLElement, IntrexxIconProps>(
  (
    {
      iconClass,
      size = 16,
      color = "currentColor",
      fixPosition,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <i
        ref={ref}
        className={clsx(
          "intrexx-icon",
          `intrexx-icon--${size}`,
          `intrexx-icon--${color}`,
          { "intrexx-icon--fix-position": fixPosition },
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
