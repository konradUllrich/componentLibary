import React from "react";
import { Panel, Page, Section } from "../../layout";
import { Text } from "../../common";

export const PanelPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Panel Component
        </Text>
        <Text color="secondary">
          Container component with different visual styles
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Variants
        </Text>
        <Text color="secondary" size="sm">
          Different panel styles for different contexts
        </Text>
        <div className="component-page__demo-column">
          <Panel variant="default" padding="md">
            <Text weight="medium">Default Panel</Text>
            <Text size="sm" color="secondary">
              This is a default panel variant
            </Text>
          </Panel>

          <Panel variant="outlined" padding="md">
            <Text weight="medium">Outlined Panel</Text>
            <Text size="sm" color="secondary">
              This is an outlined panel variant
            </Text>
          </Panel>

          <Panel variant="elevated" padding="md">
            <Text weight="medium">Elevated Panel</Text>
            <Text size="sm" color="secondary">
              This is an elevated panel variant with shadow
            </Text>
          </Panel>

          <Panel variant="subtle" padding="md">
            <Text weight="medium">Subtle Panel</Text>
            <Text size="sm" color="secondary">
              This is a subtle panel variant
            </Text>
          </Panel>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Spacing Utility
        </Text>
        <Text color="secondary" size="sm">
          Fine-grained padding and margin control using the <code>spacing</code>{" "}
          prop with spacing tokens (0-6). Supports responsive breakpoints (base,
          sm, md, lg, xl).
        </Text>

        <div className="component-page__demo-column">
          <Panel variant="outlined" spacing={{ pt: 1 }}>
            <Text weight="medium">pt: 1 - padding-top (4px)</Text>
          </Panel>

          <Panel variant="outlined" spacing={{ pt: 4 }}>
            <Text weight="medium">pt: 4 - padding-top (16px)</Text>
          </Panel>

          <Panel variant="outlined" spacing={{ pl: 3, pr: 4 }}>
            <Text weight="medium">pl: 3, pr: 4 — horizontal padding</Text>
          </Panel>

          <Panel variant="outlined" spacing={{ pt: 4, pb: 1, pl: 2, pr: 3 }}>
            <Text weight="medium">
              pt: 4, pb: 1, pl: 2, pr: 3 — individual sides
            </Text>
          </Panel>

          <Panel variant="elevated" spacing={{ pt: 4, pb: 4, mt: 2, mb: 2 }}>
            <Text weight="medium">
              pt: 4, pb: 4, mt: 2, mb: 2 — padding + margin
            </Text>
          </Panel>

          <Panel
            variant="subtle"
            spacing={{ pl: 2, pr: 2, ml: { base: 0, md: 4 } }}
            style={{ maxWidth: "320px" }}
          >
            <Text weight="medium">Responsive: ml: 0 on base, ml: 4 on md+</Text>
          </Panel>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Panel } from '@mp-ku/mp-components';

// Predefined padding size (variant-driven)
<Panel variant="elevated" padding="md">
  <h2>Card Title</h2>
</Panel>

// Granular spacing with tokens (0-6 map to --spacing-0..--spacing-6)
<Panel variant="outlined" spacing={{ pl: 6, pr: 6, pt: 4, pb: 4 }}>
  <p>Custom horizontal / vertical padding</p>
</Panel>

// Margin + padding
<Panel spacing={{ pt: 4, pb: 4, pl: 4, pr: 4, mt: 2, mb: 2, ml: "auto", mr: "auto" }}>
  <p>Centered panel with margin</p>
</Panel>

// Individual side overrides
<Panel spacing={{ pt: 5, pb: 4, pl: 4, pr: 4 }}>
  <p>Extra top padding</p>
</Panel>

// Responsive spacing
<Panel spacing={{ mt: 2, ml: { base: 0, md: 4, lg: 6 } }}>
  <p>Different margin-left at breakpoints</p>
</Panel>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
