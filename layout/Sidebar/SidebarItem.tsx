import React, { useState } from "react";
import clsx from "clsx";
import { useSidebarStore } from "./sidebarStore";
import "./SidebarItem.css";

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Navigation target URL
   */
  href?: string;

  /**
   * Item label (can use label prop or children for text, label takes precedence)
   */
  label?: string;

  /**
   * Item content - can be text label or nested SidebarItem components
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
   * Nested items for dropdown/collapsable menu (alternative to using children)
   */
  items?: SidebarItemProps[];

  /**
   * Custom handler for item click
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Whether to show the item
   * @default true
   */
  show?: boolean;

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
      label,
      children,
      isActive = false,
      icon,
      items = [],
      onClick,
      show = true,
      className = "",
      ...props
    }: SidebarItemProps,
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);

    if (!show) {
      return null;
    }

    // Check if children contains React components (nested items)
    const hasChildrenItems =
      React.Children.count(children) > 0 &&
      React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) && typeof child.type !== "string",
      );

    const hasNestedItems = (items?.length ?? 0) > 0 || hasChildrenItems;

    // Determine what to display as label
    const displayLabel =
      label || (typeof children === "string" ? children : undefined);

    // Separate nested items from label content
    const nestedContent = hasChildrenItems ? children : null;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (hasNestedItems) {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      } else {
        // Close mobile sidebar when navigating
        setMobileOpen(false);
      }
      onClick?.(e);
    };

    return (
      <>
        <a
          ref={ref}
          href={href}
          className={clsx(
            "mp-sidebar-item",
            isActive && "mp-sidebar-item--active",
            hasNestedItems && "mp-sidebar-item--expandable",
            className,
          )}
          onClick={handleClick}
          aria-expanded={hasNestedItems ? isExpanded : undefined}
          {...props}
        >
          {hasNestedItems && (
            <span
              className={clsx(
                "mp-sidebar-item__chevron",
                isExpanded && "mp-sidebar-item__chevron--open",
              )}
            >
              ▼
            </span>
          )}
          {icon && <span className="mp-sidebar-item__icon">{icon}</span>}
          <span className="mp-sidebar-item__label">{displayLabel}</span>
        </a>
        {hasNestedItems && isExpanded && (
          <div className="mp-sidebar-item--nested">
            {(items?.length ?? 0) > 0
              ? items.map((item, index) => (
                  <SidebarItem key={index} {...item} />
                ))
              : nestedContent}
          </div>
        )}
      </>
    );
  },
);

SidebarItem.displayName = "SidebarItem";
