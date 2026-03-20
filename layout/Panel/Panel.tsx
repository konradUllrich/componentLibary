import React from "react";
import clsx from "clsx";
import { buildSpacingStyle, type SpacingProps } from "../../utils/styleProps";
import "./Panel.css";

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SpacingProps {
  /**
   * Panel variant
   * @default "default"
   */
  variant?: "default" | "outlined" | "elevated" | "subtle";

  /**
   * Predefined padding size applied via CSS class.
   * For fine-grained control use the spacing props (`p`, `pt`, `pb`, `pl`,
   * `pr`, `px`, `py`). Inline spacing props take precedence over this value.
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
 * Supports multiple variants, padding sizes, and granular spacing props.
 *
 * Spacing props (`p`, `pt`, `pb`, `pl`, `pr`, `px`, `py`, `m`, `mt`, `mb`,
 * `ml`, `mr`, `mx`, `my`) accept spacing tokens (0–24) that map to
 * `--spacing-{n}` CSS variables, or any raw CSS string (e.g. `"auto"`).
 * Inline spacing props take precedence over the class-based `padding` prop.
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
 * // Granular padding control with spacing tokens
 * <Panel variant="elevated" px={6} py={4}>
 *   <div>Custom horizontal/vertical padding</div>
 * </Panel>
 *
 * // Margin and padding spacing props
 * <Panel p={4} mt={6} mx="auto">
 *   <div>Centered panel with margin</div>
 * </Panel>
 *
 * // Individual side overrides
 * <Panel p={4} pt={8} pb={2}>
 *   <small>Asymmetric padding</small>
 * </Panel>
 * ```
 */
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      variant = "default",
      padding = "md",
      className,
      children,
      style,
      // Spacing props
      p, pt, pb, pl, pr, px, py,
      m, mt, mb, ml, mr, mx, my,
      ...props
    },
    ref,
  ) => {
    const spacingStyle = buildSpacingStyle({
      p, pt, pb, pl, pr, px, py,
      m, mt, mb, ml, mr, mx, my,
    });

    return (
      <div
        ref={ref}
        className={clsx(
          "panel",
          `panel--${variant}`,
          `panel--padding-${padding}`,
          className,
        )}
        style={{ ...spacingStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Panel.displayName = "Panel";
