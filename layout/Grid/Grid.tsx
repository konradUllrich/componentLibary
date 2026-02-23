import React from "react";
import clsx from "clsx";
import "./Grid.css";

const COLUMN_PRESETS = ["1", "2", "3", "4", "6", "12"] as const;
const GAP_PRESETS = ["xs", "sm", "md", "lg", "xl"] as const;

type ColumnPreset = (typeof COLUMN_PRESETS)[number];
type GapPreset = (typeof GAP_PRESETS)[number];

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns. Accepts a preset (1–4, 6, 12) or any valid
   * CSS `grid-template-columns` value (e.g. `"repeat(auto-fill, minmax(200px, 1fr))"`).
   * @default "1"
   */
  columns?: ColumnPreset | number | string;

  /**
   * Number of rows. Accepts a number or any valid CSS `grid-template-rows` value.
   */
  rows?: number | string;

  /**
   * Gap between all grid cells. Preset token or any valid CSS gap value.
   */
  gap?: GapPreset | string;

  /**
   * Gap between columns only. Overrides `gap` for the column axis.
   */
  columnGap?: GapPreset | string;

  /**
   * Gap between rows only. Overrides `gap` for the row axis.
   */
  rowGap?: GapPreset | string;

  /**
   * Aligns grid items along the block (column) axis.
   * @default "stretch"
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Justifies grid items along the inline (row) axis.
   * @default "stretch"
   */
  justify?: "start" | "center" | "end" | "stretch";

  /**
   * Controls the auto-placement algorithm direction.
   * @default "row"
   */
  flow?: "row" | "column" | "dense" | "row dense" | "column dense";

  /** Additional CSS classes */
  className?: string;

  children?: React.ReactNode;
}

function resolveGapClass(prefix: string, value: string | undefined) {
  if (!value) return undefined;
  return (GAP_PRESETS as readonly string[]).includes(value)
    ? `grid--${prefix}-${value}`
    : undefined;
}

function resolveGapStyle(value: string | undefined) {
  if (!value) return undefined;
  return (GAP_PRESETS as readonly string[]).includes(value) ? undefined : value;
}

/**
 * Grid – CSS Grid layout wrapper.
 *
 * Use `columns` for quick column configs and `GridItem` for per-cell span control.
 *
 * @example
 * ```tsx
 * <Grid columns="3" gap="md">
 *   <GridItem colSpan={2}>Wide cell</GridItem>
 *   <div>Cell</div>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = "1",
      rows,
      gap,
      columnGap,
      rowGap,
      align = "stretch",
      justify = "stretch",
      flow = "row",
      className,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const colStr = String(columns);
    const colIsPreset = (COLUMN_PRESETS as readonly string[]).includes(colStr);

    const inlineStyle: React.CSSProperties = {
      ...(!colIsPreset && { gridTemplateColumns: colStr }),
      ...(rows !== undefined && {
        gridTemplateRows:
          typeof rows === "number" ? `repeat(${rows}, 1fr)` : rows,
      }),
      ...(resolveGapStyle(gap) && { gap: resolveGapStyle(gap) }),
      ...(resolveGapStyle(columnGap) && {
        columnGap: resolveGapStyle(columnGap),
      }),
      ...(resolveGapStyle(rowGap) && { rowGap: resolveGapStyle(rowGap) }),
      ...style,
    };

    const flowClass =
      flow !== "row" ? `grid--flow-${flow.replace(" ", "-")}` : undefined;

    return (
      <div
        ref={ref}
        className={clsx(
          "grid",
          colIsPreset && `grid--cols-${colStr}`,
          `grid--align-${align}`,
          `grid--justify-${justify}`,
          flowClass,
          resolveGapClass("gap", gap),
          resolveGapClass("col-gap", columnGap),
          resolveGapClass("row-gap", rowGap),
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

Grid.displayName = "Grid";
