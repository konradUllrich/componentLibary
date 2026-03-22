import React from "react";
import clsx from "clsx";
import "./GridItem.css";

const COL_SPAN_PRESETS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "full",
] as const;
const ROW_SPAN_PRESETS = ["1", "2", "3", "4", "5", "6"] as const;

type ColSpanPreset = (typeof COL_SPAN_PRESETS)[number];
type RowSpanPreset = (typeof ROW_SPAN_PRESETS)[number];

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns this item should span.
   * Use "full" to span all columns.
   */
  colSpan?: ColSpanPreset | number;

  /**
   * Number of rows this item should span.
   */
  rowSpan?: RowSpanPreset | number;

  /**
   * Column start line (1-based).
   */
  colStart?: number;

  /**
   * Column end line (1-based, exclusive).
   */
  colEnd?: number;

  /**
   * Row start line (1-based).
   */
  rowStart?: number;

  /**
   * Row end line (1-based, exclusive).
   */
  rowEnd?: number;

  /** Additional CSS classes */
  className?: string;

  children?: React.ReactNode;
}

/**
 * GridItem – child element of `Grid` for controlling cell placement and span.
 *
 * @example
 * ```tsx
 * <Grid columns="12" gap="md">
 *   <GridItem colSpan={8}>Main content</GridItem>
 *   <GridItem colSpan={4}>Sidebar</GridItem>
 * </Grid>
 * ```
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      colSpan,
      rowSpan,
      colStart,
      colEnd,
      rowStart,
      rowEnd,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const colSpanStr = colSpan !== undefined ? String(colSpan) : undefined;
    const rowSpanStr = rowSpan !== undefined ? String(rowSpan) : undefined;

    const colSpanIsPreset =
      colSpanStr !== undefined &&
      (COL_SPAN_PRESETS as readonly string[]).includes(colSpanStr);
    const rowSpanIsPreset =
      rowSpanStr !== undefined &&
      (ROW_SPAN_PRESETS as readonly string[]).includes(rowSpanStr);

    const inlineStyle: React.CSSProperties = {
      ...(!colSpanIsPreset &&
        colSpan !== undefined && { gridColumn: `span ${colSpan}` }),
      ...(!rowSpanIsPreset &&
        rowSpan !== undefined && { gridRow: `span ${rowSpan}` }),
      ...(colStart !== undefined && { gridColumnStart: colStart }),
      ...(colEnd !== undefined && { gridColumnEnd: colEnd }),
      ...(rowStart !== undefined && { gridRowStart: rowStart }),
      ...(rowEnd !== undefined && { gridRowEnd: rowEnd }),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "mp-grid-item",
          colSpanIsPreset && `mp-grid-item--col-span-${colSpanStr}`,
          rowSpanIsPreset && `mp-grid-item--row-span-${rowSpanStr}`,
          className,
        )}
        style={inlineStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GridItem.displayName = "GridItem";
