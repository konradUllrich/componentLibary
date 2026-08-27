import React from "react";
import { getContrastRatio, WCAG_AA_MIN_CONTRAST } from "./contrast";

export interface ContrastBadgeProps {
  foreground: string;
  background: string;
}

/**
 * Inline WCAG AA contrast indicator for a foreground/background color pair.
 * Renders nothing when either color can't be evaluated (e.g. a CSS variable
 * reference) or when the pair already passes.
 */
export const ContrastBadge: React.FC<ContrastBadgeProps> = ({
  foreground,
  background,
}) => {
  const ratio = getContrastRatio(foreground, background);
  if (ratio === null || ratio >= WCAG_AA_MIN_CONTRAST) return null;

  return (
    <span
      className="mp-theme-panel__contrast-warning"
      role="status"
      title={`Contrast ${ratio.toFixed(2)}:1 is below the WCAG AA minimum of ${WCAG_AA_MIN_CONTRAST}:1`}
    >
      ⚠ {ratio.toFixed(2)}:1
    </span>
  );
};
