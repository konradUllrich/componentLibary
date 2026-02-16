import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ThemeConfig, defaultTheme } from "./types";

interface ThemeContextValue {
  theme: ThemeConfig;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "mp-components-theme";

const loadThemeFromStorage = (): ThemeConfig | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate and merge with defaults to prevent undefined values
      return {
        colors: {
          primary: parsed.colors?.primary || defaultTheme.colors.primary,
          secondary: parsed.colors?.secondary || defaultTheme.colors.secondary,
          success: parsed.colors?.success || defaultTheme.colors.success,
          warning: parsed.colors?.warning || defaultTheme.colors.warning,
          destructive:
            parsed.colors?.destructive || defaultTheme.colors.destructive,
          info: parsed.colors?.info || defaultTheme.colors.info,
        },
        spacing: {
          base: parsed.spacing?.base ?? defaultTheme.spacing.base,
        },
        typography: {
          baseFontSize:
            parsed.typography?.baseFontSize ??
            defaultTheme.typography.baseFontSize,
          baseLineHeight:
            parsed.typography?.baseLineHeight ??
            defaultTheme.typography.baseLineHeight,
        },
        borderRadius: {
          base: parsed.borderRadius?.base ?? defaultTheme.borderRadius.base,
        },
      };
    }
  } catch (error) {
    console.error("Failed to load theme from storage:", error);
  }
  return null;
};

const saveThemeToStorage = (theme: ThemeConfig): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error("Failed to save theme to storage:", error);
  }
};

const applyThemeToDOM = (theme: ThemeConfig): void => {
  const root = document.documentElement;

  // Apply base color variables (hex colors) with fallback to default theme
  const primaryColor = theme.colors.primary || defaultTheme.colors.primary;
  const secondaryColor =
    theme.colors.secondary || defaultTheme.colors.secondary;

  root.style.setProperty("--color-primary-base", primaryColor);
  root.style.setProperty("--color-secondary-base", secondaryColor);
  root.style.setProperty(
    "--color-success-base",
    theme.colors.success || defaultTheme.colors.success,
  );
  root.style.setProperty(
    "--color-warning-base",
    theme.colors.warning || defaultTheme.colors.warning,
  );
  root.style.setProperty(
    "--color-destructive-base",
    theme.colors.destructive || defaultTheme.colors.destructive,
  );
  root.style.setProperty(
    "--color-info-base",
    theme.colors.info || defaultTheme.colors.info,
  );

  // Apply gradient that uses primary color (for text headings)
  root.style.setProperty(
    "--color-primary-gradient",
    `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
  );

  // Apply spacing scale with fallback
  root.style.setProperty(
    "--font-size-base",
    `${theme.typography.baseFontSize ?? defaultTheme.typography.baseFontSize}px`,
  );
  root.style.setProperty(
    "--line-height-normal",
    (
      theme.typography.baseLineHeight ?? defaultTheme.typography.baseLineHeight
    ).toString(),
  );

  // Apply border radius scale (multiply base values) with fallback
  const radiusBase = theme.borderRadius.base ?? defaultTheme.borderRadius.base;
  root.style.setProperty("--radius-sm", `${0.25 * radiusBase}rem`);
  root.style.setProperty("--radius-md", `${0.375 * radiusBase}rem`);
  root.style.setProperty("--radius-lg", `${0.5 * radiusBase}rem`);
  root.style.setProperty("--radius-xl", `${0.75 * radiusBase}rem`);
  root.style.setProperty("--radius-2xl", `${1 * radiusBase}rem`);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    const stored = loadThemeFromStorage();
    return stored || defaultTheme;
  });

  useEffect(() => {
    applyThemeToDOM(theme);
    saveThemeToStorage(theme);
  }, [theme]);

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setTheme((prev) => {
      const newTheme = { ...prev };

      if (updates.colors) {
        newTheme.colors = { ...prev.colors, ...updates.colors };
      }
      if (updates.spacing) {
        newTheme.spacing = { ...prev.spacing, ...updates.spacing };
      }
      if (updates.typography) {
        newTheme.typography = { ...prev.typography, ...updates.typography };
      }
      if (updates.borderRadius) {
        newTheme.borderRadius = {
          ...prev.borderRadius,
          ...updates.borderRadius,
        };
      }

      return newTheme;
    });
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove theme from storage:", error);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
