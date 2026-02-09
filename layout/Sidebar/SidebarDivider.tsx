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
      className={clsx("sidebar-divider", className)}
      role="separator"
      {...props}
    >
      {label ? (
        <>
          <span className="sidebar-divider__line sidebar-divider__line--left" />
          <span className="sidebar-divider__label">{label}</span>
          <span className="sidebar-divider__line sidebar-divider__line--right" />
        </>
      ) : (
        <span className="sidebar-divider__line" />
      )}
    </div>
  );
});

SidebarDivider.displayName = "SidebarDivider";
