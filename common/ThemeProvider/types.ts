/** Hex color values used to compute the theme's CSS custom properties. All fields are required — pass a partial theme to {@link ThemeProvider} and it is merged with `defaultTheme`. */
export interface ThemeColors {
  /** Primary brand color. */
  primary: string;
  /** Text/icon color placed on top of `primary`. */
  onPrimary: string;
  /** Lighter tint of `primary`, used for hover/subtle backgrounds. */
  primaryLight: string;
  /** Darker shade of `primary`, used for active/pressed states. */
  primaryStrong: string;

  /**
   * @deprecated No longer used to compute any CSS custom property — the
   * secondary color always tracks `onBackgroundLight` instead. Kept only so
   * existing theme configs that set it don't fail to type-check.
   */
  secondary: string;
  /** Success state color (e.g. positive Badge, success Toast). */
  success: string;
  /** Text/icon color placed on top of `success`. */
  onSuccess: string;
  /** Warning state color. */
  warning: string;
  /** Text/icon color placed on top of `warning`. */
  onWarning: string;
  /** Destructive/error state color. */
  destructive: string;
  /** Text/icon color placed on top of `destructive`. */
  onDestructive: string;
  /** Informational state color. */
  info: string;
  /** Page/surface background color. */
  background: string;
  /** Primary text/icon color placed on top of `background`. */
  onBackground: string;
  /** Muted/secondary text color placed on top of `background`. */
  onBackgroundLight: string;

  /** Default border color. */
  border: string;
  /** Lighter border color, for subtle dividers. */
  borderLight: string;
  /** Stronger border color, for emphasized outlines. */
  borderStrong: string;
}

/**
 * Full theme shape consumed by {@link ThemeProvider}. Passed as a deep partial
 * (`Partial<ThemeConfig>`-like) and merged with `defaultTheme`; see
 * `themeUtils.ts` for how each field maps to computed CSS custom properties.
 */
export interface ThemeConfig {
  colors: ThemeColors;
  spacing: {
    /** Multiplier applied to the base spacing scale (1 = default spacing). */
    base: number;
  };
  typography: {
    /** Base font size, in px. */
    baseFontSize: number;
    /** Base line height (unitless multiplier). */
    baseLineHeight: number;
  };
  borderRadius: {
    /** Multiplier for the radius scale, or an explicit CSS value (e.g. `"8px"`). */
    base: number | string;
  };
  focus: {
    /** Focus ring size, as a CSS length (e.g. `"2px"`). */
    size: string;
    /** Focus ring color. Defaults to the theme's primary color if not provided. */
    color: string;
    /** Focus ring offset, as a CSS length (e.g. `"2px"`). */
    offset: string;
  };
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: "#7c3aed",
    primaryLight: "#a7a8f6",
    primaryStrong: "#5b21b6",
    onPrimary: "#ffffff",
    onDestructive: "#ffffff",
    onSuccess: "#ffffff",
    onWarning: "#000000",
    onBackground: "#000000",
    onBackgroundLight: "#6b7280",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    destructive: "#dc2626",
    info: "#3b82f6",
    background: "#ffffff",

    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    borderStrong: "#cbd5e0",
  },
  spacing: {
    base: 1,
  },
  typography: {
    baseFontSize: 16,
    baseLineHeight: 1.5,
  },
  borderRadius: {
    base: 1,
  },
  focus: {
    size: "3px",
    color: "#7c3aed",
    offset: "2px",
  },
};
