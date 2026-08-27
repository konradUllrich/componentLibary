import { ThemeContextProvider } from "../../common";
import { darkPreset } from "../../common/ThemeProvider/presets";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContextProvider theme={darkPreset.theme}>
      {children}
    </ThemeContextProvider>
  );
};
