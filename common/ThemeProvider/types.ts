export interface ThemeColors {
  // Primary colors
  primaryA: number;
  primaryB: number;
  
  // Secondary colors
  secondaryA: number;
  secondaryB: number;
  
  // Success colors
  successA: number;
  successB: number;
  
  // Warning colors
  warningA: number;
  warningB: number;
  
  // Destructive colors
  destructiveA: number;
  destructiveB: number;
  
  // Info colors
  infoA: number;
  infoB: number;
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
    primaryA: 0.15,
    primaryB: -0.15,
    secondaryA: 0.007,
    secondaryB: 0.011,
    successA: -0.2,
    successB: 0.183,
    warningA: 0.065,
    warningB: 0.172,
    destructiveA: 0.252,
    destructiveB: 0.11,
    infoA: -0.088,
    infoB: -0.103,
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
