import React, { useState } from "react";
import { Tabs, Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { useParamState } from "../../Router/hooks";
import { UsageExample, usageSource } from "../../common/Tabs/Tabs.example";
import { u } from "../../utils";

export const TabsPage: React.FC = () => {
  // const [activeTab, setActiveTab] = useState("tab1");
  const [pillsTab, setPillsTab] = useState("pills1");
  const [activeTab, setActiveTab] = useParamState("activeTab", "tab1");
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Tabs Component
        </Text>
        <Text color="secondary">
          Flexible tabbed interface with keyboard navigation and multiple
          variants
        </Text>
      </Section>

      <Section title="Default Variant" subtitle="Standard tab interface with default styling">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Tabs
            items={[
              {
                id: "tab1",
                label: "Overview",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>
                      Overview content goes here. This is the first tab.
                    </Text>
                  </div>
                ),
              },
              {
                id: "tab2",
                label: "Details",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>
                      Details content goes here. This is the second tab.
                    </Text>
                  </div>
                ),
              },
              {
                id: "tab3",
                label: "Settings",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>
                      Settings content goes here. This is the third tab.
                    </Text>
                  </div>
                ),
              },
            ]}
            activeId={activeTab}
            onActiveChange={setActiveTab}
          />
        </Flex>
      </Section>

      <Section title="Underline Variant" subtitle="Tabs with underline indicator for active tab">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Tabs
            variant="underline"
            items={[
              {
                id: "u1",
                label: "Tab 1",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>Content for underline tab 1</Text>
                  </div>
                ),
              },
              {
                id: "u2",
                label: "Tab 2",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>Content for underline tab 2</Text>
                  </div>
                ),
              },
              {
                id: "u3",
                label: "Tab 3",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>Content for underline tab 3</Text>
                  </div>
                ),
              },
            ]}
          />
        </Flex>
      </Section>

      <Section title="Pills Variant" subtitle="Tabs styled as pills for a more compact look">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <Tabs
            variant="pills"
            items={[
              {
                id: "pills1",
                label: "First",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>Pills tab 1 content</Text>
                  </div>
                ),
              },
              {
                id: "pills2",
                label: "Second",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>Pills tab 2 content</Text>
                  </div>
                ),
              },
              {
                id: "pills3",
                label: "Third",
                content: (
                  <div style={{ padding: "1rem" }}>
                    <Text>Pills tab 3 content</Text>
                  </div>
                ),
              },
            ]}
            activeId={pillsTab}
            onActiveChange={setPillsTab}
          />
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
