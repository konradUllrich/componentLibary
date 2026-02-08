import React from "react";
import clsx from "clsx";
import "./AppSidebar.css";

export interface AppSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Sidebar content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AppSidebar Component
 *
 * Sidebar container within application layout.
 * Manages responsive visibility and positioning.
 *
 * @example
 * ```tsx
 * <AppSidebar>
 *   <Sidebar>
 *     <SidebarNav>
 *       <SidebarItem href="/home">Home</SidebarItem>
 *     </SidebarNav>
 *   </Sidebar>
 * </AppSidebar>
 * ```
 */
export const AppSidebar = React.forwardRef<HTMLDivElement, AppSidebarProps>(
  ({ className = "", children, ...props }: AppSidebarProps, ref) => (
    <div ref={ref} className={clsx("app-sidebar", className)} {...props}>
      {children}
    </div>
  ),
);

AppSidebar.displayName = "AppSidebar";
