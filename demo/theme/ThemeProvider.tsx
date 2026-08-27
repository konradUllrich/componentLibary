import { ThemeContextProvider, type ThemePresetInput } from "../../common";

const darkTheme: ThemePresetInput = {
  colors: {
    background: "#2a2a27",
    onBackground: "#fafafa",
    onBackgroundLight: "#dedcdc",
    border: "#dedcdc",
    borderLight: "#3e3e3b",
  },
};

// const lightTheme: ThemePresetInput = {
//   colors: {
//     primary: "#139C13",
//     primaryLight: "#B5F9B5",
//     primaryStrong: "#0E630E",
//     onPrimary: "#ffffff",
//     background: "#fafafa",
//     onBackground: "#2a2a27",
//     // onBackgroundLight: "#dedcdc",
//     // border: "#dedcdc",
//     // borderLight: "#3e3e3b",
//   },
// };
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContextProvider theme={darkTheme}>{children}</ThemeContextProvider>
  );
};
