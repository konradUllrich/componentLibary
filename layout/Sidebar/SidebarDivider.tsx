import React from "react";
import clsx from "clsx";
import "./SidebarDivider.css";

export interface SidebarDividerProps {
  /** Optional label for the divider */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SidebarDivider – A visual separator for sidebar sections with optional label.
 *
 * @example
 * <SidebarDivider />
 * <SidebarDivider label="Navigation" />
 */
export const SidebarDivider = React.forwardRef<
  HTMLDivElement,
  SidebarDividerProps
>(({ label, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx("mp-sidebar-divider", className)}
      role="separator"
      {...props}
    >
      {label ? (
        <>
          <span className="mp-sidebar-divider__line mp-sidebar-divider__line--left" />
          <span className="mp-sidebar-divider__label">{label}</span>
          <span className="mp-sidebar-divider__line mp-sidebar-divider__line--right" />
        </>
      ) : (
        <span className="mp-sidebar-divider__line" />
      )}
    </div>
  );
});

SidebarDivider.displayName = "SidebarDivider";
