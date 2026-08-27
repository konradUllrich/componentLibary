import React from "react";
import { ThemeContextProvider } from "./ThemeContext";
import { ThemePanel } from "./ThemePanel";
import { ThemePresetProvider } from "./ThemePresetProvider";
import { Text } from "../Text/Text";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { ThemeContextProvider, ThemePanel } from '@mp-ku/mp-components';

<ThemeContextProvider theme={{ colors: { primary: '#7c3aed' } }}>
  <App />
  <ThemePanel />
</ThemeContextProvider>

// Or, to apply a fixed theme without an editor:
import { ThemePresetProvider } from '@mp-ku/mp-components';

<ThemePresetProvider theme={{ colors: { primary: '#7c3aed' } }}>
  <App />
</ThemePresetProvider>`;

/** Live render of {@link usageSource}, used on the ThemeProvider demo page. */
export const UsageExample = () => (
  <>
    <ThemeContextProvider theme={{ colors: { primary: "#7c3aed" } }}>
      <Text>Themed via ThemeContextProvider</Text>
      <ThemePanel />
    </ThemeContextProvider>
    <ThemePresetProvider theme={{ colors: { primary: "#7c3aed" } }}>
      <Text>Themed via ThemePresetProvider</Text>
    </ThemePresetProvider>
  </>
);
