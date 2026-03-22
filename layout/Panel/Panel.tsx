import React from "react";
import clsx from "clsx";
import { u, type UtilityInput } from "../../utils";
import "./Panel.css";
import "../../styles/spacing.css";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Panel variant
   * @default "default"
   */
  variant?: "default" | "outlined" | "elevated" | "subtle";

  /**
   * Predefined padding size applied via CSS class.
   * For fine-grained control use the `spacing` utility object.
   * @default "md"
   */
  padding?: "none" | "sm" | "md" | "lg" | "xl";

  /**
   * Optional spacing utility configuration for responsive padding/margin.
   * Pass an object with pt, pb, pl, pr, mt, mb, ml, mr keys.
   * Values can be static (0–6) or responsive across breakpoints.
   *
   * @example
   * <Panel spacing={{ pt: 4, pb: { base: 2, md: 4 } }} />
   */
  spacing?: UtilityInput;

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
 * Supports multiple variants, padding sizes, and responsive spacing utility.
 *
 *
 * @example
 * ```tsx
 * // Default panel with content
 * <Panel>
 *   <h2>Title</h2>
 *   <p>Content goes here</p>
 * </Panel>
 *
 * // Outlined variant with predefined padding size
 * <Panel variant="outlined" padding="lg">
 *   <p>Outlined content panel</p>
 * </Panel>
 *
 * // Responsive spacing via utility
 * <Panel variant="elevated" spacing={{ pt: 4, pb: { base: 2, md: 4 } }}>
 *   <div>Custom responsive spacing</div>
 * </Panel>
 *
 * // Margin utility
 * <Panel spacing={{ mt: 4, mx: { base: 0, md: 2 } }}>
 *   <div>Centered with responsive margin</div>
 * </Panel>
 * ```
 */
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      variant = "default",
      padding = "md",
      spacing,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const spacingClasses = spacing ? u(spacing) : "";

    return (
      <div
        ref={ref}
        className={clsx(
          "mp-panel",
          `mp-panel--${variant}`,
          `mp-panel--padding-${padding}`,
          spacingClasses,
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Panel.displayName = "Panel";
