import React from "react";
import clsx from "clsx";
import { useSidebar } from "./useSidebar";
import "./SidebarToggle.css";

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
 * SidebarToggle Component
 *
 * Button to toggle sidebar open/closed state.
 * Must be used within a Sidebar component.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarToggle aria-label="Toggle sidebar" />
 *   <SidebarNav>...</SidebarNav>
 * </Sidebar>
 * ```
 */
export const SidebarToggle = React.forwardRef<
  HTMLButtonElement,
  SidebarToggleProps
>(
  (
    {
      className = "",
      onClick,
      "aria-label": ariaLabel,
      children,
      ...props
    }: SidebarToggleProps,
    ref,
  ) => {
    const { toggleSidebar, isOpen } = useSidebar();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toggleSidebar();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={clsx("sidebar__toggle", className)}
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-label={ariaLabel || "Toggle sidebar"}
        {...props}
      >
        {children || (
          <>
            <span className="sidebar__line" />
            <span className="sidebar__line" />
            <span className="sidebar__line" />
          </>
        )}
      </button>
    );
  },
);

SidebarToggle.displayName = "SidebarToggle";
