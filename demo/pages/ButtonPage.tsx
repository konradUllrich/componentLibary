import React from "react";
import { Button } from "../../common";
import { Text } from "../../common";
import { UsageExample, usageSource } from "../../common/Button/Button.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const ButtonPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Button Component
        </Text>
        <Text color="secondary">
          Versatile button component with multiple variants, sizes, and states
        </Text>
      </Section>

      <Section title="Variants" subtitle="Different button styles for various contexts">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </Flex>
      </Section>

      <Section title="Sizes" subtitle="Different button sizes for different contexts">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Flex>
      </Section>

      <Section title="States" subtitle="Button states including disabled and loading">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" isLoading>
            Loading
          </Button>
          <Button variant="destructive" disabled>
            Disabled
          </Button>
          <Button variant="destructive" isLoading>
            Loading
          </Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
          <Button variant="ghost" isLoading>
            Loading
          </Button>
        </Flex>
      </Section>

      <Section title="Usage">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <UsageExample />
        </Flex>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
