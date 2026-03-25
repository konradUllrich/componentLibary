import React, { useState } from "react";
import clsx from "clsx";
import { useSidebarStore } from "./sidebarStore";
import "./SidebarItem.css";

export interface SidebarItemProps {
  /**
   * Navigation target URL.
   * When provided, the item renders as an `<a>` element.
   * When omitted on an expandable item (one with nested items), it renders as a `<button>`.
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
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Whether to show the item
   * @default true
   */
  show?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /** ARIA label for screen readers. Especially useful when the sidebar is collapsed
   *  and the visible label text is hidden by CSS. */
  "aria-label"?: string;

  /** Tab index override for keyboard navigation order. */
  tabIndex?: number;

  /** DOM element ID. */
  id?: string;

  /** Tooltip text shown on hover. */
  title?: string;
}

/**
 * SidebarItem Component
 *
 * Individual navigation item with optional nested items.
 * Supports collapsable submenus and active state styling.
 *
 * Renders as an `<a>` element when `href` is provided, or as a `<button>` when
 * the item is expandable (has nested items) and no `href` is given.
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
export const SidebarItem = React.forwardRef<HTMLElement, SidebarItemProps>(
  (
    {
      href,
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

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (hasNestedItems) {
        e.preventDefault();
        setIsExpanded((prev) => !prev);
      } else {
        // Close mobile sidebar when navigating
        setMobileOpen(false);
      }
      onClick?.(e);
    };

    const sharedClassName = clsx(
      "mp-sidebar-item",
      isActive && "mp-sidebar-item--active",
      hasNestedItems && "mp-sidebar-item--expandable",
      className,
    );

    const sharedContent = (
      <>
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
      </>
    );

    const nestedItems = hasNestedItems && isExpanded && (
      <div className="mp-sidebar-item--nested">
        {(items?.length ?? 0) > 0
          ? items.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))
          : nestedContent}
      </div>
    );

    // Render as <button> when expandable with no navigation href, as <a> otherwise
    if (hasNestedItems && !href) {
      return (
        <>
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            type="button"
            className={sharedClassName}
            onClick={handleClick}
            aria-expanded={isExpanded}
            aria-label={props["aria-label"] ?? displayLabel}
            {...props}
          >
            {sharedContent}
          </button>
          {nestedItems}
        </>
      );
    }

    return (
      <>
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={sharedClassName}
          onClick={handleClick}
          aria-expanded={hasNestedItems ? isExpanded : undefined}
          aria-label={props["aria-label"] ?? displayLabel}
          {...props}
        >
          {sharedContent}
        </a>
        {nestedItems}
      </>
    );
  },
);

SidebarItem.displayName = "SidebarItem";
