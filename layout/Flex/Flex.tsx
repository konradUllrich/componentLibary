import React from "react";
import clsx from "clsx";
import "./Flex.css";

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
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | string;

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
        ? `flex--gap-${gap}`
        : undefined
      : undefined;

    return (
      <div
        ref={ref}
        className={clsx(
          "flex",
          `flex--direction-${direction}`,
          `flex--justify-${justify}`,
          `flex--align-${align}`,
          {
            "flex--wrap": wrap,
          },
          gapClass,
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
