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
          Spacing Props
        </Text>
        <Text color="secondary" size="sm">
          Fine-grained padding and margin control using spacing tokens (0–24) or
          raw CSS values. Spacing props override the class-based{" "}
          <code>padding</code> prop.
        </Text>

        <div className="component-page__demo-column">
          <Panel variant="outlined" p={2}>
            <Text weight="medium">p={2} — uniform padding (8px)</Text>
          </Panel>

          <Panel variant="outlined" p={6}>
            <Text weight="medium">p={6} — uniform padding (24px)</Text>
          </Panel>

          <Panel variant="outlined" px={8} py={2}>
            <Text weight="medium">
              px={8} py={2} — horizontal / vertical padding
            </Text>
          </Panel>

          <Panel variant="outlined" pt={8} pb={2} pl={4} pr={6}>
            <Text weight="medium">
              pt={8} pb={2} pl={4} pr={6} — individual sides
            </Text>
          </Panel>

          <Panel variant="elevated" p={6} mt={4} mb={4}>
            <Text weight="medium">
              p={6} mt={4} mb={4} — padding + vertical margin
            </Text>
          </Panel>

          <Panel variant="subtle" p={4} mx="auto" style={{ maxWidth: "320px" }}>
            <Text weight="medium">mx="auto" — horizontally centered</Text>
          </Panel>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Panel } from '@konradullrich/mp-components';

// Predefined padding size (class-based)
<Panel variant="elevated" padding="md">
  <h2>Card Title</h2>
</Panel>

// Granular spacing with tokens (0–24 map to --spacing-{n})
<Panel variant="outlined" px={6} py={4}>
  <p>Custom horizontal / vertical padding</p>
</Panel>

// Margin props
<Panel p={4} mt={6} mb={4} mx="auto">
  <p>Centered panel with margin</p>
</Panel>

// Individual side overrides
<Panel p={4} pt={8}>
  <p>Extra top padding</p>
</Panel>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
