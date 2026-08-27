import React from "react";
import { Panel, Page, Section, Flex } from "../../layout";
import { UsageExample, usageSource } from "../../layout/Panel/Panel.example";
import { Text } from "../../common";
import { u } from "../../utils";

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

      <Section title="Variants" subtitle="Different panel styles for different contexts">
        <Panel variant="subtle" flex>
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
        </Panel>
      </Section>

      <Section title="Spacing Utility" subtitle="Fine-grained padding and margin control using the spacing prop with spacing tokens (0-6). Supports responsive breakpoints (base, sm, md, lg, xl).">

        <Panel variant="subtle" flex>
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
        </Panel>
      </Section>

      <Section title="Usage">
        <Flex direction="column" gap="md" className={u({ pt: 4 })}>
          <UsageExample />
        </Flex>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
