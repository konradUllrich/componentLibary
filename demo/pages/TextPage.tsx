import React from 'react';
import { Text } from '../../common';

export const TextPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">Text Component</Text>
        <Text color="secondary">
          Flexible text component with semantic HTML and styling options
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Sizes</Text>
        <Text color="secondary" size="sm">
          Various text sizes from extra small to 3xl
        </Text>
        <div className="component-page__demo-column">
          <Text size="xs">Extra Small Text (xs)</Text>
          <Text size="sm">Small Text (sm)</Text>
          <Text size="base">Base Text (default)</Text>
          <Text size="lg">Large Text (lg)</Text>
          <Text size="xl">Extra Large Text (xl)</Text>
          <Text size="2xl">2XL Text</Text>
          <Text size="3xl">3XL Text</Text>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Weights</Text>
        <Text color="secondary" size="sm">
          Different font weights
        </Text>
        <div className="component-page__demo-column">
          <Text weight="normal">Normal Weight</Text>
          <Text weight="medium">Medium Weight</Text>
          <Text weight="semibold">Semibold Weight</Text>
          <Text weight="bold">Bold Weight</Text>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Colors</Text>
        <Text color="secondary" size="sm">
          Semantic color options
        </Text>
        <div className="component-page__demo-column">
          <Text>Default Color</Text>
          <Text color="secondary">Secondary Color</Text>
          <Text color="tertiary">Tertiary Color</Text>
          <Text color="primary">Primary Color</Text>
          <Text color="destructive">Destructive Color</Text>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Text } from '@konradullrich/mp-components';

<Text as="h1" size="3xl" weight="bold">
  Page Title
</Text>

<Text as="p" color="secondary">
  Secondary paragraph text
</Text>`}</code>
        </pre>
      </Section>
    </Page>
  );
};