import React from "react";
import clsx from "clsx";
import "./AppLayout.css";

export interface AppLayoutProps {
  /**
   * Header content
   */
  header?: React.ReactNode;

  /**
   * Sidebar content
   */
  sidebar?: React.ReactNode;

  /**
   * Main content area
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AppLayout Component
 *
 * Main layout container with header, sidebar, and content areas.
 * Manages responsive behavior and z-index stacking.
 *
 * @example
 * ```tsx
 * <AppLayout
 *   header={<Header />}
 *   sidebar={
 *     <Sidebar>
 *       <SidebarNav>
 *         <SidebarItem href="/home">Home</SidebarItem>
 *       </SidebarNav>
 *     </Sidebar>
 *   }
 * >
 *   <MainContent />
 * </AppLayout>
 * ```
 */
export function AppLayout({
  header,
  sidebar,
  children,
  className = "",
}: AppLayoutProps) {
  return (
    <div className={clsx("app-layout", className)}>
      {header && <div className="app-layout__header">{header}</div>}
      <div className="app-layout__container">
        {sidebar && <div className="app-layout__sidebar">{sidebar}</div>}
        <main className="app-layout__main">{children}</main>
      </div>
    </div>
  );
}

AppLayout.displayName = "AppLayout";
