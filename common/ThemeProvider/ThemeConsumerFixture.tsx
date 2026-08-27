import React from "react";
import { useTheme } from "./useTheme";

export const ThemeConsumerFixture: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();

  return (
    <div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
      <div data-testid="secondary-color">{theme.colors.secondary}</div>
      <div data-testid="border-radius">{theme.borderRadius.base}</div>
      <button
        data-testid="update-primary"
        onClick={() =>
          updateTheme({ colors: { ...theme.colors, primary: "#ff0000" } })
        }
      >
        Update Primary
      </button>
      <button
        data-testid="update-radius"
        onClick={() => updateTheme({ borderRadius: { base: "8px" } })}
      >
        Update Radius
      </button>
      <button data-testid="reset-theme" onClick={resetTheme}>
        Reset
      </button>
    </div>
  );
};
