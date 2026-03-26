import React, { useMemo } from "react";
import {
  getThemeCssVariables,
  mergeThemeWithDefaults,
  ThemePresetInput,
} from "./themeUtils";

export interface ThemePresetProviderProps {
  children: React.ReactNode;
  theme: ThemePresetInput;
}

/**
 * ThemePresetProvider
 *
 * Applies a static theme preset to CSS variables.
 * Unlike ThemeProvider, this provider does not persist values or expose editing state.
 */
export const ThemePresetProvider: React.FC<ThemePresetProviderProps> = ({
  children,
  theme,
}) => {
  const resolvedTheme = useMemo(() => mergeThemeWithDefaults(theme), [theme]);
  const cssVars = useMemo(
    () => getThemeCssVariables(resolvedTheme),
    [resolvedTheme],
  );

  return (
    <div style={{ display: "contents", ...cssVars } as React.CSSProperties}>
      {children}
    </div>
  );
};
