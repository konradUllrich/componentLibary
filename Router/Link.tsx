import React, { forwardRef } from "react";
import clsx from "clsx";
import { useLocation } from "wouter";
import "./Link.css";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destination path (alias for href) */
  to?: string;
  /** Visual style variant
   * @default "default"
   */
  variant?: "default" | "subtle" | "button";
  /** Size modifier — only meaningful when variant="button"
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /** Opens the link in a new tab with proper rel attributes */
  isExternal?: boolean;
  /** Additional CSS classes */
  className?: string;
  children?: React.ReactNode;
}

/**
 * Link – styled anchor that integrates with the wouter router.
 *
 * Supports multiple visual variants and handles external links
 * with accessible visually-hidden "opens in new tab" text.
 *
 * @example
 * ```tsx
 * <Link href="/about">About</Link>
 * <Link href="/contact" variant="subtle">Contact</Link>
 * <Link href="/signup" variant="button" size="lg">Sign up</Link>
 * <Link href="https://example.com" isExternal>External site</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      to,
      onClick,
      variant = "default",
      size = "md",
      isExternal = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [, navigate] = useLocation();
    const destination = to ?? href ?? "";

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(event);
      if (isExternal) return;
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.button !== 0
      )
        return;
      event.preventDefault();
      navigate(destination);
    };

    return (
      <a
        ref={ref}
        href={destination}
        className={clsx(
          "mp-link",
          `mp-link--${variant}`,
          variant === "button" && `mp-link--${size}`,
          className,
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
        {isExternal && (
          <span className="sr-only"> (opens in new tab)</span>
        )}
      </a>
    );
  },
);

Link.displayName = "Link";
