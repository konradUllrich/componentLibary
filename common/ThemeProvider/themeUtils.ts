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

const colorMix = (base: string, mixColor: string, percent: number): string =>
  `color-mix(in oklch, ${base}, ${mixColor} ${percent}%)`;

const radiusValue = (
  base: ThemeConfig["borderRadius"]["base"],
  scale: number,
): string =>
  typeof base === "string" ? `calc(${base} * ${scale})` : `${0.25 * scale * base}rem`;

export const getThemeCssVariables = (
  theme: ThemeConfig,
): Record<string, string> => {
  const colors = theme.colors;
  const borderRadius = theme.borderRadius;
  const focus = theme.focus;
  const typography = theme.typography;
  const spacing = theme.spacing;

  return {
    "--mp-color-primary-base": colors.primary,
    "--mp-color-primary": "var(--mp-color-primary-base)",
    "--mp-color-primary-light": colors.primaryLight,
    "--mp-color-primary-strong": colors.primaryStrong,
    "--mp-color-onPrimary": colors.onPrimary,

    "--mp-color-secondary-base": colors.secondary,
    "--mp-color-secondary": "var(--mp-color-secondary-base)",
    "--mp-color-secondary-light": colorMix(colors.secondary, "white", 20),
    "--mp-color-secondary-dark": colorMix(colors.secondary, "black", 15),
    "--mp-color-secondary-foreground": colors.onPrimary,

    "--mp-color-success-base": colors.success,
    "--mp-color-success": "var(--mp-color-success-base)",
    "--mp-color-success-light": colorMix(colors.success, "white", 30),
    "--mp-color-success-dark": colorMix(colors.success, "black", 20),
    "--mp-color-success-foreground": colors.onSuccess,

    "--mp-color-warning-base": colors.warning,
    "--mp-color-warning": "var(--mp-color-warning-base)",
    "--mp-color-warning-light": colorMix(colors.warning, "white", 15),
    "--mp-color-warning-dark": colorMix(colors.warning, "black", 20),
    "--mp-color-warning-foreground": colors.onWarning,

    "--mp-color-destructive-base": colors.destructive,
    "--mp-color-destructive": "var(--mp-color-destructive-base)",
    "--mp-color-destructive-light": colorMix(colors.destructive, "white", 20),
    "--mp-color-destructive-dark": colorMix(colors.destructive, "black", 15),
    "--mp-color-destructive-foreground": colors.onDestructive,

    "--mp-color-info-base": colors.info,
    "--mp-color-info": "var(--mp-color-info-base)",
    "--mp-color-info-light": colorMix(colors.info, "white", 30),
    "--mp-color-info-dark": colorMix(colors.info, "black", 20),
    "--mp-color-info-foreground": colors.onPrimary,

    "--mp-color-background": colors.background,
    "--mp-color-foreground": colors.onBackground,
    "--mp-color-foreground-light": colors.onBackgroundLight,

    "--mp-color-border": colors.border,
    "--mp-color-border-light": colors.borderLight,
    "--mp-color-border-dark": colors.borderStrong,

    "--mp-radius-sm": radiusValue(borderRadius.base, 0.5),
    "--mp-radius-md": radiusValue(borderRadius.base, 1),
    "--mp-radius-lg": radiusValue(borderRadius.base, 2),
    "--mp-radius-xl": radiusValue(borderRadius.base, 3),
    "--mp-radius-2xl": radiusValue(borderRadius.base, 4),

    "--mp-focus-size": focus.size,
    "--mp-focus-color": focus.color,
    "--mp-focus-offset": focus.offset,

    "--mp-spacing-base": `${spacing.base}`,
    "--mp-font-size-base": `${typography.baseFontSize}px`,
    "--line-height-normal": typography.baseLineHeight.toString(),
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
