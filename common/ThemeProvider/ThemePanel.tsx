import React from "react";
import clsx from "clsx";
import { Button } from "../Button";
import { Slider } from "../../controls";
import { useTheme } from "./useTheme";
import { useThemeEditor } from "./useThemeEditor";
import { ThemeConfig, ThemeColors } from "./types";
import { ThemePanelColors } from "./ThemePanelColors";
import { ThemePanelActions } from "./ThemePanelActions";
import "./ThemePanel.css";

export const ThemePanel: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const { isOpen, toggle } = useThemeEditor();

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
  };

  const handleApplyTheme = (nextTheme: ThemeConfig) => {
    updateTheme(nextTheme);
  };

  const handleTypographyChange = (
    key: keyof typeof theme.typography,
    value: number,
  ) => {
    if (isNaN(value)) return; // Prevent NaN from corrupting theme state
    updateTheme({
      typography: {
        ...theme.typography,
        [key]: value,
      },
    });
  };

  const handleBorderRadiusChange = (value: number) => {
    if (isNaN(value)) return; // Prevent NaN from corrupting theme state
    updateTheme({
      borderRadius: {
        base: value,
      },
    });
  };

  const borderRadiusBase = theme.borderRadius.base;
  const isBorderRadiusScale = typeof borderRadiusBase === "number";

  return (
    <div className={clsx("mp-theme-panel", !isOpen && "mp-theme-panel--collapsed")}>
      <button
        className="mp-theme-panel__toggle"
        onClick={toggle}
        aria-label={isOpen ? "Close theme panel" : "Open theme panel"}
      >
        {isOpen ? "✕" : "🎨"}
      </button>

      <div className="mp-theme-panel__header">
        <h2 className="mp-theme-panel__title">Theme Customizer</h2>
      </div>

      <div className="mp-theme-panel__content">
        <ThemePanelColors
          colors={theme.colors}
          onColorChange={handleColorChange}
        />

        <section className="mp-theme-panel__section">
          <h3 className="mp-theme-panel__section-title">Typography</h3>

          <div className="mp-theme-panel__control">
            <Slider
              label={`Base Font Size: ${theme.typography.baseFontSize}px`}
              value={theme.typography.baseFontSize}
              onChange={(e) =>
                handleTypographyChange("baseFontSize", parseInt(e.target.value))
              }
              min="12"
              max="20"
              step="1"
            />
          </div>

          <div className="mp-theme-panel__control">
            <Slider
              label={`Base Line Height: ${theme.typography.baseLineHeight.toFixed(2)}`}
              value={theme.typography.baseLineHeight}
              onChange={(e) =>
                handleTypographyChange(
                  "baseLineHeight",
                  parseFloat(e.target.value),
                )
              }
              min="1.2"
              max="2"
              step="0.05"
            />
          </div>
        </section>

        <section className="mp-theme-panel__section">
          <h3 className="mp-theme-panel__section-title">Border Radius</h3>

          <div className="mp-theme-panel__control">
            {isBorderRadiusScale ? (
              <Slider
                label={`Border Radius Scale: ${borderRadiusBase.toFixed(2)}x`}
                value={borderRadiusBase}
                onChange={(e) =>
                  handleBorderRadiusChange(parseFloat(e.target.value))
                }
                min="0"
                max="2"
                step="0.1"
              />
            ) : (
              <span className="mp-theme-panel__label">
                Border Radius: {borderRadiusBase}
              </span>
            )}
          </div>
        </section>
      </div>

      <div className="mp-theme-panel__footer">
        <ThemePanelActions theme={theme} onApplyTheme={handleApplyTheme} />
        <Button variant="secondary" className="mp-theme-panel__reset-button" onClick={resetTheme}>
          Reset to Default
        </Button>
      </div>
    </div>
  );
};
