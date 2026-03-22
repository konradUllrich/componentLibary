import React from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="mp-sidebar__toggle-wrapper">
        <button
          ref={ref}
          className={clsx("mp-sidebar__toggle", className)}
          onClick={handleClick}
          aria-expanded={isOpen}
          aria-label={ariaLabel || "Toggle sidebar"}
          {...props}
        >
          {children ||
            (isOpen ? (
              <ChevronLeft size={20} aria-hidden="true" />
            ) : (
              <ChevronRight size={20} aria-hidden="true" />
            ))}
        </button>
      </div>
    );
  },
);

SidebarToggle.displayName = "SidebarToggle";
