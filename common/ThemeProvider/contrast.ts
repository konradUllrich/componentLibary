const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const expandHex = (hex: string): string =>
  hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;

const relativeLuminance = (hex: string): number => {
  const [r, g, b] = [1, 3, 5].map((i) =>
    parseInt(expandHex(hex).slice(i, i + 2), 16),
  );
  const channel = (c: number) => {
    const srgb = c / 255;
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/**
 * WCAG contrast ratio between two hex colors, from 1 (no contrast) to 21.
 * Returns null when either value isn't a plain hex color (e.g. a CSS
 * variable or color-mix() expression) — those can't be evaluated statically.
 */
export const getContrastRatio = (
  colorA: string,
  colorB: string,
): number | null => {
  if (!HEX_RE.test(colorA.trim()) || !HEX_RE.test(colorB.trim())) return null;

  const lumA = relativeLuminance(colorA.trim());
  const lumB = relativeLuminance(colorB.trim());
  const [lighter, darker] = lumA > lumB ? [lumA, lumB] : [lumB, lumA];
  return (lighter + 0.05) / (darker + 0.05);
};

/** WCAG 2.1 AA minimum for normal text. */
export const WCAG_AA_MIN_CONTRAST = 4.5;
