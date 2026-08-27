import { ThemePresetInput } from "./themeUtils";

export interface NamedThemePreset {
  id: string;
  label: string;
  theme: ThemePresetInput;
}

export const lightPreset: NamedThemePreset = {
  id: "light",
  label: "Light",
  theme: {},
};

export const darkPreset: NamedThemePreset = {
  id: "dark",
  label: "Dark",
  theme: {
    colors: {
      background: "#2a2a27",
      onBackground: "#fafafa",
      onBackgroundLight: "#dedcdc",
      border: "#dedcdc",
      borderLight: "#3e3e3b",
    },
  },
};

export const themePresets: NamedThemePreset[] = [lightPreset, darkPreset];
