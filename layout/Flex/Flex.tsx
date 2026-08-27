import React from "react";
import clsx from "clsx";
import { u, type UtilityInput } from "../../utils";
import "./Flex.css";
import "../../styles/spacing.css";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Flex direction
   * @default "row"
   */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";

  /**
   * Justify content alignment
   * @default "flex-start"
   */
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";

  /**
   * Align items alignment
   * @default "stretch"
   */
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";

  /**
   * Gap between items
   */
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | ({} & string);

  /**
   * Optional spacing utility configuration for responsive padding/margin.
   * Pass an object with p, pt, pb, pl, pr, m, mt, mb, ml, mr keys.
   * Values can be static (0–6) or responsive across breakpoints.
   * Shares the same scale as `Card`/`Panel`'s `spacing` prop.
   *
   * @example
   * <Flex spacing={{ p: 4, mt: { base: 2, md: 4 } }} />
   */
  spacing?: UtilityInput;

  /**
   * Whether to wrap items
   */
  wrap?: boolean;

  /**
   * Flex value for growing/shrinking
   */
  flex?: number | "1" | "auto" | "none";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Children elements
   */
  children: React.ReactNode;
}

/**
 * Flex Component
 *
 * A flexible wrapper component for creating flexbox layouts.
 *
 * @example
 * ```tsx
 * <Flex direction="row" justify="space-between" align="center" gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 * ```
 */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = "row",
      justify = "flex-start",
      align = "stretch",
      gap,
      spacing,
      wrap = false,
      flex,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    // Determine if gap is a preset or custom value
    const gapValue = gap
      ? ["xs", "sm", "md", "lg", "xl"].includes(gap as string)
        ? undefined
        : gap
      : undefined;

    const gapClass = gap
      ? ["xs", "sm", "md", "lg", "xl"].includes(gap as string)
        ? `mp-flex--gap-${gap}`
        : undefined
      : undefined;

    return (
      <div
        ref={ref}
        className={clsx(
          "mp-flex",
          `mp-flex--direction-${direction}`,
          `mp-flex--justify-${justify}`,
          `mp-flex--align-${align}`,
          {
            "mp-flex--wrap": wrap,
          },
          gapClass,
          spacing && u(spacing),
          className,
        )}
        style={{
          ...(gapValue && { gap: gapValue }),
          ...(flex !== undefined && {
            flex: typeof flex === "number" ? flex : flex,
          }),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Flex.displayName = "Flex";
