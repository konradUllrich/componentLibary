import React from "react";
import { Disclosure, Text } from "../../common";
import { UsageExample, usageSource } from "../../common/Disclosure/Disclosure.example";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

export const DisclosurePage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Disclosure Component
        </Text>
        <Text color="secondary">Simple collapsible content section</Text>
      </Section>

      <Section title="Basic Usage" subtitle="Click to expand and collapse content">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Disclosure label="Click to expand">
            <Text>
              This is collapsible content that can be shown or hidden. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Disclosure>

          <Disclosure label="Another disclosure">
            <Text>Each disclosure operates independently.</Text>
          </Disclosure>
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
