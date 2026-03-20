import React from "react";

/**
 * Numeric spacing tokens that map to design system CSS variables.
 * Corresponds to `--spacing-{n}` in `styles/variables.css`.
 *
 * | Token | CSS variable      | Value         |
 * |-------|-------------------|---------------|
 * | 0     | --spacing-0       | 0             |
 * | 1     | --spacing-1       | 0.25rem (4px) |
 * | 2     | --spacing-2       | 0.5rem  (8px) |
 * | 3     | --spacing-3       | 0.75rem (12px)|
 * | 4     | --spacing-4       | 1rem    (16px)|
 * | 5     | --spacing-5       | 1.25rem (20px)|
 * | 6     | --spacing-6       | 1.5rem  (24px)|
 * | 8     | --spacing-8       | 2rem    (32px)|
 * | 10    | --spacing-10      | 2.5rem  (40px)|
 * | 12    | --spacing-12      | 3rem    (48px)|
 * | 16    | --spacing-16      | 4rem    (64px)|
 * | 20    | --spacing-20      | 5rem    (80px)|
 * | 24    | --spacing-24      | 6rem    (96px)|
 */
export type SpacingToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/**
 * Accepts either a numeric spacing token (maps to `--spacing-{n}`)
 * or any raw CSS string value (e.g. `"auto"`, `"10px"`, `"1rem"`).
 */
export type SpacingValue = SpacingToken | (string & {});

/**
 * Reusable spacing props for padding and margin.
 * Shorthand props (`p`, `px`, `py`, `m`, `mx`, `my`) have lower priority
 * than individual side props (`pt`, `pb`, `pl`, `pr`, `mt`, `mb`, `ml`, `mr`).
 *
 * @example
 * // Uniform padding
 * <Panel p={4} />
 *
 * // Horizontal / vertical padding
 * <Panel px={6} py={2} />
 *
 * // Individual side overrides
 * <Panel p={4} pt={8} />
 *
 * // Margin with spacing tokens
 * <Panel mt={4} mb={2} />
 */
export interface SpacingProps {
  // ── Padding ──────────────────────────────────────────────────────────────

  /**
   * Padding on all sides.
   * Overridden by `px`/`py` and individual side props.
   */
  p?: SpacingValue;

  /** Padding top. Overrides `p` and `py` for the top side. */
  pt?: SpacingValue;

  /** Padding bottom. Overrides `p` and `py` for the bottom side. */
  pb?: SpacingValue;

  /** Padding left. Overrides `p` and `px` for the left side. */
  pl?: SpacingValue;

  /** Padding right. Overrides `p` and `px` for the right side. */
  pr?: SpacingValue;

  /** Padding on the horizontal axis (left + right). Overrides `p`. */
  px?: SpacingValue;

  /** Padding on the vertical axis (top + bottom). Overrides `p`. */
  py?: SpacingValue;

  // ── Margin ───────────────────────────────────────────────────────────────

  /**
   * Margin on all sides.
   * Overridden by `mx`/`my` and individual side props.
   */
  m?: SpacingValue;

  /** Margin top. Overrides `m` and `my` for the top side. */
  mt?: SpacingValue;

  /** Margin bottom. Overrides `m` and `my` for the bottom side. */
  mb?: SpacingValue;

  /** Margin left. Overrides `m` and `mx` for the left side. */
  ml?: SpacingValue;

  /** Margin right. Overrides `m` and `mx` for the right side. */
  mr?: SpacingValue;

  /** Margin on the horizontal axis (left + right). Overrides `m`. */
  mx?: SpacingValue;

  /** Margin on the vertical axis (top + bottom). Overrides `m`. */
  my?: SpacingValue;
}

/** Converts a SpacingValue to a CSS value string. */
function resolveSpacing(value: SpacingValue): string {
  if (typeof value === "number") {
    return `var(--spacing-${value})`;
  }
  return value;
}

/**
 * Converts `SpacingProps` into a `React.CSSProperties` object that can be
 * spread onto a component's `style` prop.
 *
 * Priority (highest wins):
 *   individual sides (`pt`, `pb`, `pl`, `pr`, `mt`, `mb`, `ml`, `mr`)
 *   > axis shorthands (`px`, `py`, `mx`, `my`)
 *   > all-sides shorthands (`p`, `m`)
 *
 * @example
 * const style = buildSpacingStyle({ p: 4, pt: 8, mx: "auto" });
 * // → { padding: "var(--spacing-4)", paddingTop: "var(--spacing-8)", marginLeft: "auto", marginRight: "auto" }
 */
export function buildSpacingStyle(props: SpacingProps): React.CSSProperties {
  const style: React.CSSProperties = {};
  const { p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my } = props;

  // ── Padding ──────────────────────────────────────────────────────────────
  // Apply all-sides first, then axis shorthands, then individual sides
  // (later assignments override earlier ones for the same CSS property)

  if (p !== undefined) {
    style.padding = resolveSpacing(p);
  }

  if (py !== undefined) {
    style.paddingTop = resolveSpacing(py);
    style.paddingBottom = resolveSpacing(py);
  }

  if (px !== undefined) {
    style.paddingLeft = resolveSpacing(px);
    style.paddingRight = resolveSpacing(px);
  }

  if (pt !== undefined) {
    style.paddingTop = resolveSpacing(pt);
  }

  if (pb !== undefined) {
    style.paddingBottom = resolveSpacing(pb);
  }

  if (pl !== undefined) {
    style.paddingLeft = resolveSpacing(pl);
  }

  if (pr !== undefined) {
    style.paddingRight = resolveSpacing(pr);
  }

  // ── Margin ───────────────────────────────────────────────────────────────

  if (m !== undefined) {
    style.margin = resolveSpacing(m);
  }

  if (my !== undefined) {
    style.marginTop = resolveSpacing(my);
    style.marginBottom = resolveSpacing(my);
  }

  if (mx !== undefined) {
    style.marginLeft = resolveSpacing(mx);
    style.marginRight = resolveSpacing(mx);
  }

  if (mt !== undefined) {
    style.marginTop = resolveSpacing(mt);
  }

  if (mb !== undefined) {
    style.marginBottom = resolveSpacing(mb);
  }

  if (ml !== undefined) {
    style.marginLeft = resolveSpacing(ml);
  }

  if (mr !== undefined) {
    style.marginRight = resolveSpacing(mr);
  }

  return style;
}

/**
 * Extracts `SpacingProps` keys from a props object, returning the remaining
 * props separately. Useful when a component needs to forward all non-spacing
 * props to the underlying element.
 *
 * @example
 * const { spacingProps, rest } = extractSpacingProps(props);
 * const spacingStyle = buildSpacingStyle(spacingProps);
 */
export function extractSpacingProps<T extends SpacingProps>(
  props: T,
): { spacingProps: SpacingProps; rest: Omit<T, keyof SpacingProps> } {
  const {
    p, pt, pb, pl, pr, px, py,
    m, mt, mb, ml, mr, mx, my,
    ...rest
  } = props;

  return {
    spacingProps: { p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my },
    rest: rest as Omit<T, keyof SpacingProps>,
  };
}
