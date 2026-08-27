import React from "react";
import { ColorPicker } from "../../controls";
import { ThemeColors } from "./types";
import { ContrastBadge } from "./ContrastBadge";

export interface ThemePanelColorsProps {
  colors: ThemeColors;
  onColorChange: (colorKey: keyof ThemeColors, value: string) => void;
}

const COLOR_ROWS: {
  key: keyof ThemeColors;
  label: string;
  onKey?: keyof ThemeColors;
}[] = [
  { key: "primary", label: "Primary Color", onKey: "onPrimary" },
  { key: "secondary", label: "Secondary Color" },
  { key: "success", label: "Success Color", onKey: "onSuccess" },
  { key: "warning", label: "Warning Color", onKey: "onWarning" },
  { key: "destructive", label: "Destructive Color", onKey: "onDestructive" },
  { key: "info", label: "Info Color" },
];

export const ThemePanelColors: React.FC<ThemePanelColorsProps> = ({
  colors,
  onColorChange,
}) => (
  <section className="mp-theme-panel__section">
    <h3 className="mp-theme-panel__section-title">Colors</h3>

    {COLOR_ROWS.map(({ key, label, onKey }) => (
      <div className="mp-theme-panel__color-row" key={key}>
        <ColorPicker
          label={label}
          value={colors[key]}
          onChange={(value) => onColorChange(key, value)}
          className="mp-theme-panel__color-picker"
        />
        {onKey && (
          <ContrastBadge foreground={colors[onKey]} background={colors[key]} />
        )}
      </div>
    ))}
  </section>
);
