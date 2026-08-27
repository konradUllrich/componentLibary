import React from "react";
import { Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { UsageExample, usageSource } from "../../common/Text/Text.example";
import { u } from "../../utils";

export const TextPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Text Component
        </Text>
        <Text color="secondary">
          Flexible text component with semantic HTML and styling options
        </Text>
      </Section>

      <Section title="Sizes" subtitle="Various text sizes from extra small to 3xl">
        <Flex gap="md" direction="column" className={u({ pt: 4 })}>
          <Text size="xs">Extra Small Text (xs)</Text>
          <Text size="sm">Small Text (sm)</Text>
          <Text size="base">Base Text (default)</Text>
          <Text size="lg">Large Text (lg)</Text>
          <Text size="xl">Extra Large Text (xl)</Text>
          <Text size="2xl">2XL Text</Text>
          <Text size="3xl">3XL Text</Text>
        </Flex>
      </Section>

      <Section title="Weights" subtitle="Different font weights">
        <Flex gap="md" direction="column" className={u({ pt: 4 })}>
          <Text weight="normal">Normal Weight</Text>
          <Text weight="medium">Medium Weight</Text>
          <Text weight="semibold">Semibold Weight</Text>
          <Text weight="bold">Bold Weight</Text>
        </Flex>
      </Section>

      <Section title="Colors" subtitle="Semantic color options">
        <Flex gap="md" direction="column" className={u({ pt: 4 })}>
          <Text>Default Color</Text>
          <Text color="secondary">Secondary Color</Text>
          <Text color="tertiary">Tertiary Color</Text>
          <Text color="primary">Primary Color</Text>
          <Text color="destructive">Destructive Color</Text>
        </Flex>
      </Section>

      <Section title="Usage">
        <Flex gap="md" wrap direction="column" className={u({ pt: 4 })}>
          <UsageExample />
        </Flex>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
