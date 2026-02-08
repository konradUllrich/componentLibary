import React, { useState } from "react";
import "./SidebarItem.css";

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
   * Nested items for dropdown/collapsable menu
   */
  items?: SidebarItemProps[];

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
 * SidebarItem Component
 *
 * Individual navigation item with optional nested items.
 * Supports collapsable submenus and active state styling.
 *
 * @example
 * ```tsx
 * <SidebarItem href="/dashboard" isActive icon={<HomeIcon />}>
 *   Dashboard
 * </SidebarItem>
 *
 * <SidebarItem icon={<SettingsIcon />}>
 *   Settings
 *   <SidebarItem href="/settings/profile">Profile</SidebarItem>
 *   <SidebarItem href="/settings/security">Security</SidebarItem>
 * </SidebarItem>
 * ```
 */
export const SidebarItem = React.forwardRef<
  HTMLAnchorElement,
  SidebarItemProps
>(
  (
    {
      href = "#",
      children,
      isActive = false,
      icon,
      items = [],
      onClick,
      className = "",
      ...props
    }: SidebarItemProps,
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasNestedItems = items.length > 0;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (hasNestedItems) {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      }
      onClick?.(e);
    };

    return (
      <>
        <a
          ref={ref}
          href={href}
          className={`
            sidebar-item
            ${isActive ? "sidebar-item--active" : ""}
            ${hasNestedItems ? "sidebar-item--expandable" : ""}
            ${className}
          `.trim()}
          onClick={handleClick}
          aria-expanded={hasNestedItems ? isExpanded : undefined}
          {...props}
        >
          {hasNestedItems && (
            <span
              className={`sidebar-item__chevron ${isExpanded ? "sidebar-item__chevron--open" : ""}`}
            >
              ▼
            </span>
          )}
          {icon && <span className="sidebar-item__icon">{icon}</span>}
          <span className="sidebar-item__label">{children}</span>
        </a>
        {hasNestedItems && isExpanded && (
          <div className="sidebar-item--nested">
            {items.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </div>
        )}
      </>
    );
  },
);

SidebarItem.displayName = "SidebarItem";
