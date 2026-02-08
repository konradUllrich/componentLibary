import React from "react";
import clsx from "clsx";
import "./Panel.css";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Panel variant
   * @default "default"
   */
  variant?: "default" | "outlined" | "elevated" | "subtle";

  /**
   * Padding size
   * @default "md"
   */
  padding?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Panel content
   */
  children?: React.ReactNode;
}

/**
 * Panel Component
 *
 * A flexible container component for grouping content with consistent styling.
 * Supports multiple variants, padding sizes, and styling options.
 *
 * @example
 * ```tsx
 * // Default panel with content
 * <Panel>
 *   <h2>Title</h2>
 *   <p>Content goes here</p>
 * </Panel>
 *
 * // Outlined variant
 * <Panel variant="outlined" padding="lg">
 *   <p>Outlined content panel</p>
 * </Panel>
 *
 * // Elevated variant
 * <Panel variant="elevated" padding="md">
 *   <div>Elevated content</div>
 * </Panel>
 *
 * // Subtle variant for nested content
 * <Panel variant="subtle" padding="sm">
 *   <small>Subtle information</small>
 * </Panel>
 * ```
 */
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    { variant = "default", padding = "md", className, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "panel",
          `panel--${variant}`,
          `panel--padding-${padding}`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Panel.displayName = "Panel";
