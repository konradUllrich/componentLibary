import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "./HorizontalNav.css";
import { HorizontalNavItem } from "./HorizontalNavItem";

export interface NavItem {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Display label for the item
   */
  label: React.ReactNode;

  /**
   * Navigation target URL
   */
  href?: string;

  /**
   * Whether item is currently active
   */
  isActive?: boolean;

  /**
   * Optional icon element
   */
  icon?: React.ReactNode;

  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Whether to show the item
   * @default true
   */
  show?: boolean;
}

export interface HorizontalNavProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Navigation items data
   */
  items: NavItem[];

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Breakpoint for mobile view (in pixels)
   * @default 768
   */
  mobileBreakpoint?: number;
}

/**
 * HorizontalNav Component
 *
 * Horizontal navigation container that displays items in a row on desktop
 * and as a select dropdown on mobile.
 *
 * @example
 * ```tsx
 * <HorizontalNav
 *   items={[
 *     { id: "home", label: "Home", href: "/home", isActive: true },
 *     { id: "about", label: "About", href: "/about" }
 *   ]}
 * />
 * ```
 */
export const HorizontalNav = React.forwardRef<HTMLElement, HorizontalNavProps>(
  (
    {
      className = "",
      items,
      mobileBreakpoint = 768,
      ...props
    }: HorizontalNavProps,
    ref,
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const visibleItems = items.filter((item) => item.show !== false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < mobileBreakpoint);
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [mobileBreakpoint]);

    const activeItem = visibleItems.find((item) => item.isActive);
    const activeValue = activeItem?.id || visibleItems[0]?.id || "";

    const handleMobileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = e.target.value;
      const selectedItem = visibleItems.find((item) => item.id === selectedId);

      if (selectedItem?.onClick) {
        const syntheticEvent = {
          preventDefault: () => {},
          currentTarget: { href: selectedItem.href || "#" },
        } as React.MouseEvent<HTMLAnchorElement>;
        selectedItem.onClick(syntheticEvent);
      }
    };

    if (isMobile) {
      return (
        <div
          className={clsx(
            "mp-horizontal-nav",
            "mp-horizontal-nav--mobile",
            className,
          )}
        >
          <select
            className="mp-horizontal-nav__select"
            value={activeValue}
            onChange={handleMobileChange}
          >
            {visibleItems.map((item) => {
              const label =
                typeof item.label === "string" ? item.label : item.id;

              return (
                <option key={item.id} value={item.id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    return (
      <nav
        ref={ref}
        className={clsx("mp-horizontal-nav", className)}
        {...props}
      >
        {visibleItems.map((item) => {
          return (
            <HorizontalNavItem
              key={item.id}
              href={item.href}
              isActive={item.isActive}
              icon={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </HorizontalNavItem>
          );
        })}
      </nav>
    );
  },
);

HorizontalNav.displayName = "HorizontalNav";
