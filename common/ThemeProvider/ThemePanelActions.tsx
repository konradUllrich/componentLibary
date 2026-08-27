import React, { useState } from "react";
import { Button } from "../Button";
import { Textarea } from "../../controls";
import { ThemeConfig } from "./types";
import { themePresets } from "./presets";
import { mergeThemeWithDefaults } from "./themeUtils";

export interface ThemePanelActionsProps {
  theme: ThemeConfig;
  onApplyTheme: (theme: ThemeConfig) => void;
}

export const ThemePanelActions: React.FC<ThemePanelActionsProps> = ({
  theme,
  onApplyTheme,
}) => {
  const [importValue, setImportValue] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(theme, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy theme to clipboard:", error);
    }
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importValue);
      onApplyTheme(mergeThemeWithDefaults(parsed));
      setImportValue("");
      setImportError(null);
    } catch {
      setImportError("Invalid theme JSON");
    }
  };

  return (
    <div className="mp-theme-panel__actions">
      <div className="mp-theme-panel__presets">
        {themePresets.map((preset) => (
          <Button
            key={preset.id}
            variant="secondary"
            size="sm"
            onClick={() => onApplyTheme(mergeThemeWithDefaults(preset.theme))}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      <div className="mp-theme-panel__import-export">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy theme as JSON"}
        </Button>
        <Textarea
          label="Import theme JSON"
          placeholder="Paste theme JSON to import…"
          value={importValue}
          error={!!importError}
          errorMessage={importError ?? undefined}
          className="mp-theme-panel__import-textarea"
          onChange={(e) => {
            setImportValue(e.target.value);
            setImportError(null);
          }}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleImport}
          disabled={!importValue.trim()}
        >
          Import
        </Button>
      </div>
    </div>
  );
};
