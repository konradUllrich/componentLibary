import React from "react";
import clsx from "clsx";
import "./AppHeader.css";

export interface AppHeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  /**
   * Header content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AppHeader Component
 *
 * Header section of the application layout.
 * Sticky top positioning, fixed height, and proper z-indexing.
 *
 * @example
 * ```tsx
 * <AppHeader>
 *   <Logo />
 *   <Nav />
 *   <UserMenu />
 * </AppHeader>
 * ```
 */
export const AppHeader = React.forwardRef<HTMLHeadElement, AppHeaderProps>(
  ({ className = "", children, ...props }: AppHeaderProps, ref) => (
    <header ref={ref} className={clsx("app-header", className)} {...props}>
      {children}
    </header>
  ),
);

AppHeader.displayName = "AppHeader";
