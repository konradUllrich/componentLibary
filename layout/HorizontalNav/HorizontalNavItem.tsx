import React from "react";
import clsx from "clsx";
import "./HorizontalNavItem.css";

export interface HorizontalNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Navigation target URL
   */
  href?: string;

  /**
   * Item label
   */
  children?: React.ReactNode;

  /**
   * Whether item is currently active
   * @default false
   */
  isActive?: boolean;

  /**
   * Optional icon element to display before label
   */
  icon?: React.ReactNode;

  /**
   * Custom handler for item click
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HorizontalNavItem Component
 *
 * Individual horizontal navigation item.
 * Styled similarly to SidebarItem but optimized for horizontal layout.
 *
 * @example
 * ```tsx
 * <HorizontalNavItem href="/dashboard" isActive icon={<HomeIcon />}>
 *   Dashboard
 * </HorizontalNavItem>
 *
 * <HorizontalNavItem href="/settings" icon={<SettingsIcon />}>
 *   Settings
 * </HorizontalNavItem>
 * ```
 */
export const HorizontalNavItem = React.forwardRef<
  HTMLAnchorElement,
  HorizontalNavItemProps
>(
  (
    {
      href = "#",
      children,
      isActive = false,
      icon,
      onClick,
      className = "",
      ...props
    }: HorizontalNavItemProps,
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        className={clsx(
          "horizontal-nav-item",
          isActive && "horizontal-nav-item--active",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="horizontal-nav-item__icon">{icon}</span>}
        <span className="horizontal-nav-item__label">{children}</span>
      </a>
    );
  },
);

HorizontalNavItem.displayName = "HorizontalNavItem";
