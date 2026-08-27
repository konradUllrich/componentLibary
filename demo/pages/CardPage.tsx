import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Page,
  Section,
  Flex,
} from "../../layout";
import { Text, Button } from "../../common";
import { UsageExample, usageSource } from "../../layout/Card/Card.example";
import { u } from "../../utils";

export const CardPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Card Component
        </Text>
        <Text color="secondary">
          Flexible container component for displaying content in card format
        </Text>
      </Section>

      <Section
        title="Card Variants"
        subtitle="Different card styles for various contexts"
      >
        <Flex gap="md" wrap>
          <Card variant="elevated" padding="md">
            <CardHeader>
              <Text weight="semibold">Elevated Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has a subtle shadow for elevation
              </Text>
            </CardContent>
          </Card>

          <Card variant="outlined" padding="md">
            <CardHeader>
              <Text weight="semibold">Outlined Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has a border outline
              </Text>
            </CardContent>
          </Card>

          <Card variant="flat" padding="md">
            <CardHeader>
              <Text weight="semibold">Flat Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card has no border or shadow
              </Text>
            </CardContent>
          </Card>
        </Flex>
      </Section>

      <Section
        title=" With Footer"
        subtitle="Cards can include header, content, and footer sections"
      >
        <Flex gap="md" wrap>
          <Card variant="elevated" padding="md">
            <CardHeader>
              <Text weight="semibold">Complete Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                This card demonstrates all three sections: header, content, and
                footer.
              </Text>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="primary">
                Action
              </Button>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </Flex>
      </Section>

      <Section title="Padding Options" subtitle="Control card padding size">
        <Flex gap="md" wrap>
          <Card variant="outlined" padding="sm">
            <Text size="sm">Small Padding</Text>
          </Card>
          <Card variant="outlined" padding="md">
            <Text size="sm">Medium Padding</Text>
          </Card>
          <Card variant="outlined" padding="lg">
            <Text size="sm">Large Padding</Text>
          </Card>
        </Flex>
      </Section>

      <Section
        title="Interactive Card"
        subtitle="Cards can be interactive with hover effects"
      >
        <Flex gap="md" wrap>
          <Card variant="elevated" padding="md" interactive>
            <CardHeader>
              <Text weight="semibold">Interactive Card</Text>
            </CardHeader>
            <CardContent>
              <Text color="secondary" size="sm">
                Hover over this card to see the effect
              </Text>
            </CardContent>
          </Card>
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
