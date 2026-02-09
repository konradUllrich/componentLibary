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
      return JSON.parse(stored);
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

  // Apply base color variables (hex colors)
  root.style.setProperty("--color-primary-base", theme.colors.primary);
  root.style.setProperty("--color-secondary-base", theme.colors.secondary);
  root.style.setProperty("--color-success-base", theme.colors.success);
  root.style.setProperty("--color-warning-base", theme.colors.warning);
  root.style.setProperty("--color-destructive-base", theme.colors.destructive);
  root.style.setProperty("--color-info-base", theme.colors.info);

  // Apply spacing scale
  root.style.setProperty(
    "--font-size-base",
    `${theme.typography.baseFontSize}px`,
  );
  root.style.setProperty(
    "--line-height-normal",
    theme.typography.baseLineHeight.toString(),
  );

  // Apply border radius scale (multiply base values)
  const radiusBase = theme.borderRadius.base;
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
