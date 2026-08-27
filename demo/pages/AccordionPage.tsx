import React, { useState } from "react";
import { Accordion, Text } from "../../common";
import { UsageExample, usageSource } from "../../common/Accordion/Accordion.example";
import { Page, Panel, Section } from "../../layout";

export const AccordionPage: React.FC = () => {
  const [accordionValue, setAccordionValue] = useState("item1");

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Accordion Component
        </Text>
        <Text color="secondary">
          Collapsible content sections with vertical or horizontal layout
        </Text>
      </Section>

      <Section title="Vertical (Default)" subtitle="Traditional accordion with collapsible sections">
        <Panel variant="subtle">
          <Accordion
            items={[
              {
                id: "item1",
                title: "Section 1",
                content: <Text>Content for section 1</Text>,
              },
              {
                id: "item2",
                title: "Section 2",
                content: <Text>Content for section 2</Text>,
              },
              {
                id: "item3",
                title: "Section 3",
                content: <Text>Content for section 3</Text>,
              },
            ]}
            value={accordionValue as string | undefined}
            onValueChange={(value: string | string[] | undefined) =>
              setAccordionValue(
                Array.isArray(value) ? value[0] : value || "item1",
              )
            }
          />
        </Panel>
      </Section>

      <Section title="Horizontal" subtitle="Side-by-side collapsible sections">
        <Panel variant="subtle">
          <Accordion
            variant="horizontal"
            items={[
              {
                id: "h1",
                title: "Section 1",
                content: <Text>Content for section 1</Text>,
              },
              {
                id: "h2",
                title: "Section 2",
                content: <Text>Content for section 2</Text>,
              },
              {
                id: "h3",
                title: "Section 3",
                content: <Text>Content for section 3</Text>,
              },
            ]}
          />
        </Panel>
      </Section>

      <Section
        title="Looking for tabs?"
        subtitle="Use the dedicated Tabs component instead of Accordion for tab-style navigation."
      >
        <Text color="secondary">
          See the <code>Tabs</code> component (built on Radix UI Tabs) for a
          proper tabbed interface with ARIA roles and keyboard navigation.
        </Text>
      </Section>

      <Section title="Usage">
        <Panel variant="subtle">
          <UsageExample />
        </Panel>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
