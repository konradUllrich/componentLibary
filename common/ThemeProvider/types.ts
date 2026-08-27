export interface ThemeColors {
  // Base hex colors (easy to customize)
  primary: string;
  onPrimary: string;
  primaryLight: string;
  primaryStrong: string;

  secondary: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
  destructive: string;
  onDestructive: string;
  info: string;
  background: string; // Optional background color
  onBackground: string; // Optional foreground color
  onBackgroundLight: string; // Optional foreground color

  border: string; // Optional border color
  borderLight: string; // Optional light border color
  borderStrong: string; // Optional strong border color
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
  focus: {
    size: string; // Optional focus ring size
    color: string; // Optional focus ring color defaults to primary color if not provided
    offset: string; // Optional focus ring offset
  };
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: "#7c3aed",
    primaryLight: "#a7a8f6",
    primaryStrong: "#5b21b6",
    onPrimary: "#ffffff",
    onDestructive: "#ffffff",
    onSuccess: "#ffffff",
    onWarning: "#000000",
    onBackground: "#000000",
    onBackgroundLight: "#6b7280",
    secondary: "#64748b",
    success: "#22c55e",
    warning: "#f59e0b",
    destructive: "#ef4444",
    info: "#3b82f6",
    background: "#ffffff",

    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    borderStrong: "#9ca3af",
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
  focus: {
    size: "3px",
    color: "#7c3aed",
    offset: "2px",
  },
};
