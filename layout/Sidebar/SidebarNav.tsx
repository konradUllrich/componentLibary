import React from "react";
import clsx from "clsx";
import { useSidebarStore } from "./sidebarStore";

import "./SidebarNav.css";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Navigation content (SidebarItem components)
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SidebarNav Component
 *
 * Navigation container within sidebar.
 * Holds SidebarItem components and manages layout.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarToggle />
 *   <SidebarNav>
 *     <SidebarItem href="/home">Home</SidebarItem>
 *     <SidebarItem href="/about">About</SidebarItem>
 *   </SidebarNav>
 * </Sidebar>
 * ```
 */
export const SidebarNav = React.forwardRef<HTMLDivElement, SidebarNavProps>(
  ({ className = "", children, ...props }: SidebarNavProps, ref) => {
    const isCollapsed = useSidebarStore((state) => state.isCollapsed);
    const isMobile = useSidebarStore((state) => state.isMobile);

    return (
      <nav
        ref={ref}
        className={clsx(
          "sidebar__nav",
          !isMobile && isCollapsed && "sidebar__nav--collapsed",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

SidebarNav.displayName = "SidebarNav";
