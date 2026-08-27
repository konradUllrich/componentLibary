import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { createSidebarStore } from "./sidebarStore";
import { SidebarStoreContext, useOptionalSidebarStoreContext } from "./SidebarContext";
import "./Sidebar.css";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Initial expanded/collapsed state on desktop (ignored on mobile, which
   * always starts closed).
   * @default false
   */
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * Width of the sidebar on desktop, as a CSS length.
   * @default "250px"
   */
  width?: string;
  /**
   * Viewport width (in px) below which the sidebar switches to the mobile
   * drawer behavior.
   * @default 768
   */
  mobileBreakpoint?: number;
}

/**
 * Sidebar Component
 *
 * Responsive sidebar with:
 * - Mobile: drawer that opens/closes
 * - Desktop: collapsible sidebar
 *
 * @example
 * ```tsx
 * <Sidebar defaultOpen={true} width="250px">
 *   <SidebarToggle />
 *   <SidebarNav>
 *     <SidebarItem label="Dashboard" icon="📊" isActive />
 *     <SidebarItem label="Settings" icon="⚙️" />
 *   </SidebarNav>
 * </Sidebar>
 * ```
 *
 * See {@link ./Sidebar.example.tsx} for the live, greppable version of this
 * snippet, plus the `SidebarProvider`/`useSidebar` composition pattern.
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      defaultOpen = false,
      children,
      className = "",
      width = "250px",
      mobileBreakpoint = 768,
      ...props
    }: SidebarProps,
    ref,
  ) => {
  const inheritedStore = useOptionalSidebarStoreContext();
  const [ownStore] = useState(() => createSidebarStore());
  const store = inheritedStore ?? ownStore;

  const isMobile = store((state) => state.isMobile);
  const isCollapsed = store((state) => state.isCollapsed);
  const mobileOpen = store((state) => state.mobileOpen);
  const setIsMobile = store((state) => state.setIsMobile);
  const setCollapsed = store((state) => state.setCollapsed);
  const setMobileOpen = store((state) => state.setMobileOpen);

  // Determine what state to show based on mobile/desktop
  const isOpen = isMobile ? mobileOpen : !isCollapsed;

  // Initialize state on mount
  useEffect(() => {
    setCollapsed(!defaultOpen);
    setMobileOpen(false); // Always start with mobile drawer closed
  }, [defaultOpen, setCollapsed, setMobileOpen]);

  // Handle window resize - separate effect to avoid dependency loops
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < mobileBreakpoint;
      setIsMobile(newIsMobile);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, setIsMobile]);

    return (
      <SidebarStoreContext.Provider value={store}>
        <div
          ref={ref}
          className={clsx(
            "mp-sidebar",
            isOpen ? "mp-sidebar--expanded" : "mp-sidebar--collapsed",
            isMobile ? "mp-sidebar--mobile" : "mp-sidebar--desktop",
            className,
          )}
          style={{ "--sidebar-width": width } as React.CSSProperties}
          {...props}
        >
          <div className="mp-sidebar__wrapper">{children}</div>
        </div>
      </SidebarStoreContext.Provider>
    );
  },
);

Sidebar.displayName = "Sidebar";
