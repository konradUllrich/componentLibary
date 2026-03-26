import { defaultTheme, ThemeConfig } from "./types";

export interface ThemePresetInput {
  colors?: Partial<ThemeConfig["colors"]>;
  spacing?: Partial<ThemeConfig["spacing"]>;
  typography?: Partial<ThemeConfig["typography"]>;
  borderRadius?: Partial<ThemeConfig["borderRadius"]>;
}

export const mergeThemeWithDefaults = (
  theme?: ThemePresetInput,
): ThemeConfig => ({
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
});

export const applyThemeToDOM = (theme: ThemeConfig): void => {
  applyThemeToElement(document.documentElement, theme);
};

export const getThemeCssVariables = (
  theme: ThemeConfig,
): Record<string, string> => {
  const primaryColor = theme.colors.primary;
  const secondaryColor = theme.colors.secondary;
  const radiusBase = theme.borderRadius.base;

  return {
    "--color-primary-base": primaryColor,
    "--color-primary": "var(--color-primary-base)",
    "--color-primary-light":
      "color-mix(in oklch, var(--color-primary-base), white 25%)",
    "--color-primary-dark":
      "color-mix(in oklch, var(--color-primary-base), black 15%)",
    "--color-primary-foreground": "white",
    "--color-secondary-base": secondaryColor,
    "--color-secondary": "var(--color-secondary-base)",
    "--color-secondary-light":
      "color-mix(in oklch, var(--color-secondary-base), white 20%)",
    "--color-secondary-dark":
      "color-mix(in oklch, var(--color-secondary-base), black 15%)",
    "--color-secondary-foreground": "white",
    "--color-success-base": theme.colors.success,
    "--color-success": "var(--color-success-base)",
    "--color-success-light":
      "color-mix(in oklch, var(--color-success-base), white 30%)",
    "--color-success-dark":
      "color-mix(in oklch, var(--color-success-base), black 20%)",
    "--color-success-foreground": "white",
    "--color-warning-base": theme.colors.warning,
    "--color-warning": "var(--color-warning-base)",
    "--color-warning-light":
      "color-mix(in oklch, var(--color-warning-base), white 15%)",
    "--color-warning-dark":
      "color-mix(in oklch, var(--color-warning-base), black 20%)",
    "--color-warning-foreground": "black",
    "--color-destructive-base": theme.colors.destructive,
    "--color-destructive": "var(--color-destructive-base)",
    "--color-destructive-light":
      "color-mix(in oklch, var(--color-destructive-base), white 20%)",
    "--color-destructive-dark":
      "color-mix(in oklch, var(--color-destructive-base), black 15%)",
    "--color-destructive-foreground": "white",
    "--color-info-base": theme.colors.info,
    "--color-info": "var(--color-info-base)",
    "--color-info-light":
      "color-mix(in oklch, var(--color-info-base), white 30%)",
    "--color-info-dark":
      "color-mix(in oklch, var(--color-info-base), black 20%)",
    "--color-info-foreground": "white",
    "--color-primary-gradient": `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
    "--color-ring": "var(--color-primary-light)",
    "--spacing-base": `${theme.spacing.base}`,
    "--font-size-base": `${theme.typography.baseFontSize}px`,
    "--line-height-normal": theme.typography.baseLineHeight.toString(),
    "--radius-sm": `${0.25 * radiusBase}rem`,
    "--radius-md": `${0.375 * radiusBase}rem`,
    "--radius-lg": `${0.5 * radiusBase}rem`,
    "--radius-xl": `${0.75 * radiusBase}rem`,
    "--radius-2xl": `${1 * radiusBase}rem`,
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
