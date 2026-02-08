import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from './ThemeContext';
import './ThemePanel.css';

export const ThemePanel: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleColorChange = (colorKey: keyof typeof theme.colors, value: number) => {
    if (isNaN(value)) return; // Prevent NaN from corrupting theme state
    updateTheme({
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
  };

  const handleTypographyChange = (key: keyof typeof theme.typography, value: number) => {
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

  return (
    <div className={clsx("theme-panel", isCollapsed && "theme-panel--collapsed")}>
      <button
        className="theme-panel__toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Open theme panel' : 'Close theme panel'}
      >
        {isCollapsed ? '🎨' : '✕'}
      </button>

      <div className="theme-panel__header">
        <h2 className="theme-panel__title">Theme Customizer</h2>
      </div>

      <div className="theme-panel__content">
        <section className="theme-panel__section">
          <h3 className="theme-panel__section-title">Colors</h3>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Primary Color (OkLab A/B)</label>
            <div className="theme-panel__color-inputs">
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.primaryA}
                  onChange={(e) => handleColorChange('primaryA', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">A</span>
              </div>
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.primaryB}
                  onChange={(e) => handleColorChange('primaryB', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">B</span>
              </div>
            </div>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Secondary Color (OkLab A/B)</label>
            <div className="theme-panel__color-inputs">
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.secondaryA}
                  onChange={(e) => handleColorChange('secondaryA', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">A</span>
              </div>
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.secondaryB}
                  onChange={(e) => handleColorChange('secondaryB', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">B</span>
              </div>
            </div>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Success Color (OkLab A/B)</label>
            <div className="theme-panel__color-inputs">
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.successA}
                  onChange={(e) => handleColorChange('successA', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">A</span>
              </div>
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.successB}
                  onChange={(e) => handleColorChange('successB', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">B</span>
              </div>
            </div>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Warning Color (OkLab A/B)</label>
            <div className="theme-panel__color-inputs">
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.warningA}
                  onChange={(e) => handleColorChange('warningA', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">A</span>
              </div>
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.warningB}
                  onChange={(e) => handleColorChange('warningB', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">B</span>
              </div>
            </div>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Destructive Color (OkLab A/B)</label>
            <div className="theme-panel__color-inputs">
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.destructiveA}
                  onChange={(e) => handleColorChange('destructiveA', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">A</span>
              </div>
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.destructiveB}
                  onChange={(e) => handleColorChange('destructiveB', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">B</span>
              </div>
            </div>
          </div>

          <div className="theme-panel__control">
            <label className="theme-panel__label">Info Color (OkLab A/B)</label>
            <div className="theme-panel__color-inputs">
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.infoA}
                  onChange={(e) => handleColorChange('infoA', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">A</span>
              </div>
              <div className="theme-panel__color-input">
                <input
                  type="number"
                  className="theme-panel__input theme-panel__number-input"
                  value={theme.colors.infoB}
                  onChange={(e) => handleColorChange('infoB', parseFloat(e.target.value))}
                  step="0.01"
                  min="-0.5"
                  max="0.5"
                />
                <span className="theme-panel__value">B</span>
              </div>
            </div>
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
              onChange={(e) => handleTypographyChange('baseFontSize', parseInt(e.target.value))}
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
              onChange={(e) => handleTypographyChange('baseLineHeight', parseFloat(e.target.value))}
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
              onChange={(e) => handleBorderRadiusChange(parseFloat(e.target.value))}
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
