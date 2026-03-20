/**
 * Responsive spacing utility for generating semantic class names.
 *
 * Token scale (0-6) maps directly to spacing CSS vars:
 * - 0 = var(--spacing-0)
 * - 1 = var(--spacing-1) = 4px
 * - 2 = var(--spacing-2) = 8px
 * - 3 = var(--spacing-3) = 12px
 * - 4 = var(--spacing-4) = 16px
 * - 5 = var(--spacing-5) = 20px
 * - 6 = var(--spacing-6) = 24px
 *
 * Breakpoints (base, sm, md, lg, xl) allow responsive spacing values.
 */

export type ResponsiveSpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | "auto";

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl";

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

export interface UtilityInput {
  pt?: Responsive<ResponsiveSpacingValue>;
  pb?: Responsive<ResponsiveSpacingValue>;
  pl?: Responsive<ResponsiveSpacingValue>;
  pr?: Responsive<ResponsiveSpacingValue>;
  mt?: Responsive<ResponsiveSpacingValue>;
  mb?: Responsive<ResponsiveSpacingValue>;
  ml?: Responsive<ResponsiveSpacingValue>;
  mr?: Responsive<ResponsiveSpacingValue>;
}

const SPACING_MAP: Record<ResponsiveSpacingValue, string> = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  auto: "auto",
};

const ALLOWED_KEYS = new Set([
  "pt",
  "pb",
  "pl",
  "pr",
  "mt",
  "mb",
  "ml",
  "mr",
] as const);

/**
 * Generates utility class names for responsive spacing.
 *
 * @param input Spacing configuration with optional responsive breakpoint overrides
 * @returns Space-separated class names
 *
 * @example
 * // Base spacing
 * u({ pt: 4, pb: 2 })
 * // → "pt-4 pb-2"
 *
 * // Responsive spacing
 * u({ pt: 2, ml: { base: 0, md: 4, lg: 6 } })
 * // → "pt-2 ml-0 md:ml-4 lg:ml-6"
 *
 * // Responsive with base override
 * u({ mt: { base: 1, sm: 2, lg: 4 } })
 * // → "mt-1 sm:mt-2 lg:mt-4"
 */
export function u(input: UtilityInput = {}): string {
  const classes: string[] = [];

  for (const [key, value] of Object.entries(input)) {
    if (!ALLOWED_KEYS.has(key as keyof UtilityInput)) continue;

    if (typeof value === "object" && value !== null) {
      // Responsive object
      for (const [bp, v] of Object.entries(value)) {
        if (v === undefined) continue;

        const token = SPACING_MAP[v as ResponsiveSpacingValue] ?? v;
        const cls = `${key}-${token}`;

        if (bp === "base") {
          classes.push(cls);
        } else {
          classes.push(`${bp}:${cls}`);
        }
      }
    } else if (value !== undefined) {
      // Static value
      const token = SPACING_MAP[value as ResponsiveSpacingValue] ?? value;
      classes.push(`${key}-${token}`);
    }
  }

  return classes.join(" ");
}
