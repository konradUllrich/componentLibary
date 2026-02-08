import React from "react";
import clsx from "clsx";
import { useSidebar } from "./useSidebar";
import "./SidebarMobileToggle.css";

export interface SidebarMobileToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button label for accessibility
   */
  "aria-label"?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Toggle icon content (customizable)
   */
  children?: React.ReactNode;
}

/**
 * SidebarMobileToggle Component
 *
 * Button to toggle mobile sidebar. Only visible on mobile screens.
 * Hidden on desktop.
 *
 * @example
 * ```tsx
 * <SidebarMobileToggle aria-label="Open menu" />
 * ```
 */
export const SidebarMobileToggle = React.forwardRef<
  HTMLButtonElement,
  SidebarMobileToggleProps
>(
  (
    {
      className = "",
      onClick,
      "aria-label": ariaLabel,
      children,
      ...props
    }: SidebarMobileToggleProps,
    ref,
  ) => {
    const { toggleMobileOpen, mobileOpen } = useSidebar();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toggleMobileOpen();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={clsx("sidebar__mobile-toggle", className)}
        onClick={handleClick}
        aria-expanded={mobileOpen}
        aria-label={ariaLabel || "Toggle mobile menu"}
        {...props}
      >
        {children || (
          <>
            <span className="sidebar__mobile-line" />
            <span className="sidebar__mobile-line" />
            <span className="sidebar__mobile-line" />
          </>
        )}
      </button>
    );
  },
);

SidebarMobileToggle.displayName = "SidebarMobileToggle";
