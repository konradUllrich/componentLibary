import React from "react";
import { Button, Text, useTheme, useThemeEditor } from "../../common";
import { UsageExample, usageSource } from "../../common/ThemeProvider/ThemeProvider.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";
import "./ThemeProviderPage.css";

export const ThemeProviderPage: React.FC = () => {
  const { theme, resetTheme } = useTheme();
  const { isOpen, toggle } = useThemeEditor();

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Theme Provider
        </Text>
        <Text color="secondary">
          Runtime theme customization via CSS custom properties — swap
          colors, spacing, typography and border radius without a rebuild.
        </Text>
      </Section>

      <Section
        title="Try it"
        subtitle="This page (and the whole demo) is already wrapped in ThemeContextProvider, so the live theme editor works right here."
      >
        <Flex gap="md" align="center" className={u({ pt: 4 })}>
          <Button onClick={toggle}>
            {isOpen ? "Close" : "Open"} theme editor
          </Button>
          <Button variant="secondary" onClick={resetTheme}>
            Reset to default
          </Button>
          <Text color="secondary" size="sm">
            Current primary color: {theme.colors.primary}
          </Text>
        </Flex>
      </Section>

      <Section
        title="Two providers, two use cases"
        subtitle="Pick the one that matches how your app needs to use theming."
      >
        <div className="theme-provider-page__grid">
          <div className="theme-provider-page__card">
            <Text weight="semibold">ThemeContextProvider</Text>
            <Text color="secondary" size="sm">
              Interactive. Holds theme state, persists edits to{" "}
              <code>localStorage</code>, and exposes <code>useTheme()</code>{" "}
              for reading/updating it — e.g. paired with{" "}
              <code>ThemePanel</code> for an in-app theme editor.
            </Text>
          </div>
          <div className="theme-provider-page__card">
            <Text weight="semibold">ThemePresetProvider</Text>
            <Text color="secondary" size="sm">
              Static. Applies a fixed <code>ThemePresetInput</code> as CSS
              variables and nothing else — no state, no persistence, no
              editor. Use this when the host application supplies its own
              theme (e.g. via its own CSS variables) and only needs the
              library's components to pick it up.
            </Text>
          </div>
        </div>

        <Flex gap="md" wrap direction="column" className={u({ pt: 4 })}>
          <UsageExample />
        </Flex>
        <pre className="theme-provider-page__code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>

      <Section
        title="Presets"
        subtitle="Named ThemePresetInput objects ready to hand to either provider."
      >
        <pre className="theme-provider-page__code-block">
          <code>{`import { themePresets, darkPreset } from "@mp-ku/mp-components";

// themePresets = [lightPreset, darkPreset]
<ThemeContextProvider theme={darkPreset.theme}>
  <App />
</ThemeContextProvider>`}</code>
        </pre>
      </Section>

      <Section
        title="Contrast checking"
        subtitle="ThemePanel flags color pairs that fall below the WCAG AA minimum (4.5:1) as you edit."
      >
        <Text color="secondary" size="sm">
          The same check is available directly via{" "}
          <code>getContrastRatio(foreground, background)</code>, which
          returns a ratio from 1–21, or <code>null</code> when a color can't
          be evaluated statically (e.g. a CSS variable reference or a{" "}
          <code>color-mix()</code> expression).
        </Text>
      </Section>

      <Section
        title="ThemeConfig shape"
        subtitle="Everything a theme can customize."
      >
        <pre className="theme-provider-page__code-block">
          <code>{`interface ThemeConfig {
  colors: {
    primary, primaryLight, primaryStrong, onPrimary,
    secondary, success, onSuccess, warning, onWarning,
    destructive, onDestructive, info,
    background, onBackground, onBackgroundLight,
    border, borderLight, borderStrong,
  };
  spacing: { base: number };
  typography: { baseFontSize: number; baseLineHeight: number };
  borderRadius: { base: number | string }; // multiplier, or a CSS value
  focus: { size: string; color: string; offset: string };
}`}</code>
        </pre>
      </Section>
    </Page>
  );
};
