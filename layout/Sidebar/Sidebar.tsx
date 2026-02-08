import React, { useEffect } from "react";
import clsx from "clsx";
import { useSidebarStore } from "./sidebarStore";
import "./Sidebar.css";

export interface SidebarProps {
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  width?: string;
  mobileBreakpoint?: number;
}

/**
 * Sidebar Component
 *
 * Responsive sidebar with:
 * - Mobile: drawer that opens/closes
 * - Desktop: collapsible sidebar
 */
export function Sidebar({
  defaultOpen = false,
  children,
  className = "",
  width = "250px",
  mobileBreakpoint = 768,
}: SidebarProps) {
  const isMobile = useSidebarStore((state) => state.isMobile);
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const setIsMobile = useSidebarStore((state) => state.setIsMobile);
  const setCollapsed = useSidebarStore((state) => state.setCollapsed);
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);

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
    <div
      className={clsx(
        "sidebar",
        isOpen ? "sidebar--expanded" : "sidebar--collapsed",
        isMobile ? "sidebar--mobile" : "sidebar--desktop",
        className
      )}
      style={{ "--sidebar-width": width } as React.CSSProperties}
    >
      <div className="sidebar__wrapper">{children}</div>
    </div>
  );
}

Sidebar.displayName = "Sidebar";
