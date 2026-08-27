import { defaultTheme, ThemeConfig } from "./types";

export interface ThemePresetInput {
  colors?: Partial<ThemeConfig["colors"]>;
  spacing?: Partial<ThemeConfig["spacing"]>;
  typography?: Partial<ThemeConfig["typography"]>;
  borderRadius?: Partial<ThemeConfig["borderRadius"]>;
  focus?: Partial<ThemeConfig["focus"]>;
}

export const mergeThemeWithDefaults = (
  theme?: ThemePresetInput,
): ThemeConfig => {
  const mergedTheme: ThemeConfig = {
    colors: {
      ...defaultTheme.colors,
      ...(theme?.colors ?? {}),
    },
    spacing: {
      ...defaultTheme.spacing,
      ...(theme?.spacing ?? {}),
    },
    typography: {
      ...defaultTheme.typography,
      ...(theme?.typography ?? {}),
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...(theme?.borderRadius ?? {}),
    },
    focus: {
      ...defaultTheme.focus,
      ...(theme?.focus ?? {}),
    },
  };

  if (!theme?.focus?.color) {
    mergedTheme.focus.color = mergedTheme.colors.primary;
  }

  return mergedTheme;
};

export const applyThemeToDOM = (theme: ThemeConfig): void => {
  applyThemeToElement(document.documentElement, theme);
};

export const getThemeCssVariables = (
  theme: ThemeConfig,
): Record<string, string> => {
  const colors = theme.colors;
  const borderRadius = theme.borderRadius;
  const focus = theme.focus;

  return {
    "--mp-color-primary-base": colors.primary,
    "--mp-color-primary": "var(--mp-color-primary-base)",
    "--mp-color-primary-light": colors.primaryLight,
    "--mp-color-primary-strong": colors.primaryStrong,
    "--mp-color-onPrimary": colors.onPrimary,

    "--mp-color-background": colors.background,
    "--mp-color-foreground": colors.onBackground,
    "--mp-color-foreground-light": colors.onBackgroundLight,

    "--mp-color-border": colors.border,
    "--mp-color-border-light": colors.borderLight,
    "--mp-color-border-strong": colors.borderStrong,
    "--mp-radius-md": borderRadius.base,
    "--mp-radius-sm": `calc(borderRadius.base * 0.5)`,

    "--mp-focus-size": focus.size,
    "--mp-focus-color": focus.color,
    "--mp-focus-offset:": focus.offset,

    // "--mp-color-secondary-base": secondaryColor,
    // "--mp-color-secondary": "var(--mp-color-secondary-base)",
    // "--mp-color-secondary-light":
    //   "color-mix(in oklch, var(--mp-color-secondary-base), white 20%)",
    // "--mp-color-secondary-dark":
    //   "color-mix(in oklch, var(--mp-color-secondary-base), black 15%)",
    // "--mp-color-secondary-foreground": "white",
    // "--mp-color-success-base": theme.colors.success,
    // "--mp-color-success": "var(--mp-color-success-base)",
    // "--mp-color-success-light":
    //   "color-mix(in oklch, var(--mp-color-success-base), white 30%)",
    // "--mp-color-success-dark":
    //   "color-mix(in oklch, var(--mp-color-success-base), black 20%)",
    // "--mp-color-success-foreground": "white",
    // "--mp-color-warning-base": theme.colors.warning,
    // "--mp-color-warning": "var(--mp-color-warning-base)",
    // "--mp-color-warning-light":
    //   "color-mix(in oklch, var(--mp-color-warning-base), white 15%)",
    // "--mp-color-warning-dark":
    //   "color-mix(in oklch, var(--mp-color-warning-base), black 20%)",
    // "--mp-color-warning-foreground": "black",
    // "--mp-color-destructive-base": theme.colors.destructive,
    // "--mp-color-destructive": "var(--mp-color-destructive-base)",
    // "--mp-color-destructive-light":
    //   "color-mix(in oklch, var(--mp-color-destructive-base), white 20%)",
    // "--mp-color-destructive-dark":
    //   "color-mix(in oklch, var(--mp-color-destructive-base), black 15%)",
    // "--mp-color-destructive-foreground": "white",
    // "--mp-color-info-base": theme.colors.info,
    // "--mp-color-info": "var(--mp-color-info-base)",
    // "--mp-color-info-light":
    //   "color-mix(in oklch, var(--mp-color-info-base), white 30%)",
    // "--mp-color-info-dark":
    //   "color-mix(in oklch, var(--mp-color-info-base), black 20%)",
    // "--mp-color-info-foreground": "white",
    // "--mp-color-primary-gradient": `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
    // "--mp-color-ring": "var(--mp-color-primary-light)",
    // "--spacing-base": `${theme.spacing.base}`,
    // "--mp-font-size-base": `${theme.typography.baseFontSize}px`,
    // "--line-height-normal": theme.typography.baseLineHeight.toString(),
    // "--mp-radius-sm": `${0.25 * radiusBase}rem`,
    // "--mp-radius-md": `${0.375 * radiusBase}rem`,
    // "--mp-radius-lg": `${0.5 * radiusBase}rem`,
    // "--mp-radius-xl": `${0.75 * radiusBase}rem`,
    // "--mp-radius-2xl": `${1 * radiusBase}rem`,
  };
};

export const applyThemeToElement = (
  element: HTMLElement,
  theme: ThemeConfig,
): void => {
  const vars = getThemeCssVariables(theme);
  for (const [name, value] of Object.entries(vars)) {
    element.style.setProperty(name, value);
  }
};

export const clearThemeFromElement = (element: HTMLElement): void => {
  const vars = getThemeCssVariables(defaultTheme);
  for (const name of Object.keys(vars)) {
    element.style.removeProperty(name);
  }
};

const THEME_STORAGE_KEY = "mp-components-theme";

export const loadThemeFromStorage = (): ThemeConfig | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return mergeThemeWithDefaults(JSON.parse(stored));
    }
  } catch (error) {
    console.error("Failed to load theme from storage:", error);
  }
  return null;
};

export const saveThemeToStorage = (theme: ThemeConfig): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error("Failed to save theme to storage:", error);
  }
};

export const removeThemeFromStorage = (): void => {
  try {
    localStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to remove theme from storage:", error);
  }
};
