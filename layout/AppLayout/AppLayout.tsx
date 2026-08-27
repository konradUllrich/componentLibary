import React from "react";
import clsx from "clsx";
import { SidebarProvider } from "../Sidebar/SidebarProvider";
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
 *
 * See {@link ./AppLayout.example.tsx} for the live, greppable version of a
 * full header+sidebar+main composition.
 */
export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  ({ header, sidebar, children, className = "" }: AppLayoutProps, ref) => {
    return (
      <SidebarProvider>
        <div ref={ref} className={clsx("mp-app-layout", className)}>
          <a href="#mp-app-layout-main" className="mp-app-layout__skip-link">
            Skip to main content
          </a>
          {header && <header className="mp-app-layout__header">{header}</header>}
          <div className="mp-app-layout__container">
            {sidebar && <aside className="mp-app-layout__sidebar">{sidebar}</aside>}
            <main id="mp-app-layout-main" className="mp-app-layout__main">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  },
);

AppLayout.displayName = "AppLayout";
