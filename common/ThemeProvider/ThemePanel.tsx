import React, { useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTheme } from "./ThemeContext";
import "./ThemePanel.css";

export const ThemePanel: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  
  const isOpen = search.themeEditor === "open";

  const handleColorChange = (
    colorKey: keyof typeof theme.colors,
    value: string,
  ) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
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

  const toggleThemeEditor = () => {
    const newSearch = { ...search };
    if (isOpen) {
      delete newSearch.themeEditor;
    } else {
      newSearch.themeEditor = "open";
    }
    navigate({ search: newSearch });
  };

  return (
    <div
      className={clsx("theme-panel", !isOpen && "theme-panel--collapsed")}
    >
      <button
        className="theme-panel__toggle"
        onClick={toggleThemeEditor}
        aria-label={isOpen ? "Close theme panel" : "Open theme panel"}
      >
        {isOpen ? "✕" : "🎨"}
      </button>

      <div className="theme-panel__header">
        <h2 className="theme-panel__title">Theme Customizer</h2>
      </div>

      <div className="theme-panel__content">
        <section className="theme-panel__section">
          <h3 className="theme-panel__section-title">Colors</h3>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Primary Color</label>
            <input
              type="color"
              className="theme-panel__input theme-panel__color-picker"
              value={theme.colors.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
            />
            <span className="theme-panel__value">{theme.colors.primary}</span>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Secondary Color</label>
            <input
              type="color"
              className="theme-panel__input theme-panel__color-picker"
              value={theme.colors.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
            />
            <span className="theme-panel__value">{theme.colors.secondary}</span>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Success Color</label>
            <input
              type="color"
              className="theme-panel__input theme-panel__color-picker"
              value={theme.colors.success}
              onChange={(e) => handleColorChange("success", e.target.value)}
            />
            <span className="theme-panel__value">{theme.colors.success}</span>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Warning Color</label>
            <input
              type="color"
              className="theme-panel__input theme-panel__color-picker"
              value={theme.colors.warning}
              onChange={(e) => handleColorChange("warning", e.target.value)}
            />
            <span className="theme-panel__value">{theme.colors.warning}</span>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Destructive Color</label>
            <input
              type="color"
              className="theme-panel__input theme-panel__color-picker"
              value={theme.colors.destructive}
              onChange={(e) => handleColorChange("destructive", e.target.value)}
            />
            <span className="theme-panel__value">
              {theme.colors.destructive}
            </span>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Info Color</label>
            <input
              type="color"
              className="theme-panel__input theme-panel__color-picker"
              value={theme.colors.info}
              onChange={(e) => handleColorChange("info", e.target.value)}
            />
            <span className="theme-panel__value">{theme.colors.info}</span>
          </div>
        </section>

        <section className="theme-panel__section">
          <h3 className="theme-panel__section-title">Typography</h3>

          <div className="theme-panel__control">
            <label className="theme-panel__label">
              Base Font Size: {theme.typography.baseFontSize}px
            </label>
            <input
              type="range"
              className="theme-panel__range"
              value={theme.typography.baseFontSize}
              onChange={(e) =>
                handleTypographyChange("baseFontSize", parseInt(e.target.value))
              }
              min="12"
              max="20"
              step="1"
            />
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">
              Base Line Height: {theme.typography.baseLineHeight.toFixed(2)}
            </label>
            <input
              type="range"
              className="theme-panel__range"
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

        <section className="theme-panel__section">
          <h3 className="theme-panel__section-title">Border Radius</h3>

          <div className="theme-panel__control">
            <label className="theme-panel__label">
              Border Radius Scale: {theme.borderRadius.base.toFixed(2)}x
            </label>
            <input
              type="range"
              className="theme-panel__range"
              value={theme.borderRadius.base}
              onChange={(e) =>
                handleBorderRadiusChange(parseFloat(e.target.value))
              }
              min="0"
              max="2"
              step="0.1"
            />
          </div>
        </section>
      </div>

      <div className="theme-panel__footer">
        <button className="theme-panel__reset-button" onClick={resetTheme}>
          Reset to Default
        </button>
      </div>
    </div>
  );
};
