import React from "react";
import "./SidebarSubItem.css";

export interface SidebarSubItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Navigation target URL
   */
  href?: string;

  /**
   * Sub-item label (can use label prop or children for text)
   */
  label?: string;

  /**
   * Sub-item content
   */
  children?: React.ReactNode;

  /**
   * Whether sub-item is currently active
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
 * SidebarSubItem Component
 *
 * Child navigation item displayed within a nested SidebarItem.
 * Provides consistent styling and spacing for sub-menu items.
 *
 * @example
 * ```tsx
 * <SidebarItem icon={<SettingsIcon />}>
 *   Settings
 *   <SidebarSubItem href="/settings/profile" isActive>
 *     Profile
 *   </SidebarSubItem>
 *   <SidebarSubItem href="/settings/security">
 *     Security
 *   </SidebarSubItem>
 * </SidebarItem>
 * ```
 */
export const SidebarSubItem = React.forwardRef<
  HTMLAnchorElement,
  SidebarSubItemProps
>(
  (
    {
      href = "#",
      label,
      children,
      isActive = false,
      icon,
      onClick,
      className = "",
      ...props
    }: SidebarSubItemProps,
    ref,
  ) => {
    const displayLabel = label || children;
    
    return (
      <a
        ref={ref}
        href={href}
        className={`
          sidebar-subitem
          ${isActive ? "sidebar-subitem--active" : ""}
          ${className}
        `.trim()}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="sidebar-subitem__icon">{icon}</span>}
        <span className="sidebar-subitem__label">{displayLabel}</span>
      </a>
    );
  },
);

SidebarSubItem.displayName = "SidebarSubItem";
