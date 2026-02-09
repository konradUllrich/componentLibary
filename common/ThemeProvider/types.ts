export interface ThemeColors {
  // Base hex colors (easy to customize)
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  destructive: string;
  info: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  spacing: {
    base: number; // Multiplier for spacing scale
  };
  typography: {
    baseFontSize: number; // in px
    baseLineHeight: number;
  };
  borderRadius: {
    base: number; // Multiplier for radius scale
  };
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: "#7c3aed", // Purple
    secondary: "#64748b", // Slate gray
    success: "#22c55e", // Green
    warning: "#f59e0b", // Amber
    destructive: "#ef4444", // Red
    info: "#3b82f6", // Blue
  },
  spacing: {
    base: 1,
  },
  typography: {
    baseFontSize: 16,
    baseLineHeight: 1.5,
  },
  borderRadius: {
    base: 1,
  },
};
