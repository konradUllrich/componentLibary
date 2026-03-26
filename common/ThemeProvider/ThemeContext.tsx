import React, { useState, useEffect, useCallback } from "react";
import { ThemeConfig, defaultTheme } from "./types";
import { applyThemeToDOM, mergeThemeWithDefaults } from "./themeUtils";
import { ThemeContext } from "./ThemeProviderContext";

const THEME_STORAGE_KEY = "mp-components-theme";

const loadThemeFromStorage = (): ThemeConfig | null => {
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

const saveThemeToStorage = (theme: ThemeConfig): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error("Failed to save theme to storage:", error);
  }
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
