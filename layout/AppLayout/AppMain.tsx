import React from "react";
import clsx from "clsx";
import "./AppMain.css";

export interface AppMainProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Main content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AppMain Component
 *
 * Main content area of the application layout.
 * Flexible container that grows to fill available space.
 *
 * @example
 * ```tsx
 * <AppMain>
 *   <PageContent />
 * </AppMain>
 * ```
 */
export const AppMain = React.forwardRef<HTMLElement, AppMainProps>(
  ({ className = "", children, ...props }: AppMainProps, ref) => (
    <main className={clsx("app-main", className)} {...props} ref={ref}>
      {children}
    </main>
  ),
);

AppMain.displayName = "AppMain";
