import { createContext } from "react";
import { ThemeConfig } from "./types";

export interface ThemeContextValue {
  theme: ThemeConfig;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
