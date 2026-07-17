import React from "react";
import { Badge, Text } from "../../common";
import { Page, Section, Flex } from "../../layout";
import { u } from "../../utils";

export const BadgePage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Badge Component
        </Text>
        <Text color="secondary">
          Small status indicators with different colors and styles
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Variants
        </Text>
        <Text color="secondary" size="sm">
          Different badge colors for different purposes
        </Text>
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </Flex>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Appearances
        </Text>
        <Text color="secondary" size="sm">
          Different visual styles
        </Text>
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Badge appearance="solid">Solid</Badge>
          <Badge appearance="outline">Outline</Badge>
          <Badge appearance="subtle">Subtle</Badge>
        </Flex>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Badge } from '@konradullrich/mp-components';

<Badge variant="success">Active</Badge>
<Badge variant="warning" appearance="outline">Pending</Badge>
<Badge variant="destructive">Error</Badge>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
