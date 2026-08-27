import React, { useState, useCallback, useMemo } from "react";
import { ThemeConfig, defaultTheme } from "./types";
import {
  loadThemeFromStorage,
  removeThemeFromStorage,
  saveThemeToStorage,
  ThemePresetInput,
  getThemeCssVariables,
  mergeThemeWithDefaults,
} from "./themeUtils";
import { ThemeContext } from "./ThemeProviderContext";

export interface ThemeContextProviderProps {
  children: React.ReactNode;
  theme: ThemePresetInput;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
  theme: themeInput,
}) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    return loadThemeFromStorage() ?? mergeThemeWithDefaults(themeInput);
  });

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
      saveThemeToStorage(newTheme);
      return newTheme;
    });
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(mergeThemeWithDefaults(defaultTheme));
    try {
      removeThemeFromStorage();
    } catch (error) {
      console.error("Failed to remove theme from storage:", error);
    }
  }, []);

  const resolvedTheme = useMemo(() => mergeThemeWithDefaults(theme), [theme]);
  const cssVars = useMemo(
    () => getThemeCssVariables(resolvedTheme),
    [resolvedTheme],
  );

  return (
    <div style={{ display: "contents", ...cssVars } as React.CSSProperties}>
      <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
