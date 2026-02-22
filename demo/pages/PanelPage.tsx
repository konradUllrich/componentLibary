import React from 'react';
import { Panel, Page, Section } from '../../layout';
import { Text } from '../../common';

export const PanelPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">Panel Component</Text>
        <Text color="secondary">
          Container component with different visual styles
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Variants</Text>
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
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Panel } from '@konradullrich/mp-components';

<Panel variant="elevated" padding="md">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Panel>`}</code>
        </pre>
      </Section>
    </Page>
  );
};