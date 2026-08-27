import React from "react";
import {
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain,
  Page,
  Section,
  Panel,
} from "../../layout";
import { Text } from "../../common";
import { UsageExample, usageSource } from "../../layout/AppLayout/AppLayout.example";

export const AppLayoutPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          AppLayout Component
        </Text>
        <Text color="secondary">
          Complete application layout with header, sidebar, and main content
          area
        </Text>
      </Section>

      <Section title="Features" subtitle="AppLayout provides a complete application structure:">
        <ul style={{ marginTop: "1rem", marginLeft: "1.5rem" }}>
          <li>
            <Text>AppHeader: Fixed header for branding and actions</Text>
          </li>
          <li>
            <Text>AppSidebar: Collapsible sidebar navigation</Text>
          </li>
          <li>
            <Text>AppMain: Main content area with proper spacing</Text>
          </li>
          <li>
            <Text>Responsive layout that adapts to mobile</Text>
          </li>
        </ul>
      </Section>

      <Section title="Basic Example" subtitle="Complete application layout structure">
        <Panel variant="subtle">
          <div
            style={{
              height: "500px",
              position: "relative",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <AppLayout>
              <AppHeader>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Text weight="bold">My Application</Text>
                </div>
              </AppHeader>
              <AppSidebar>
                <Text size="sm" color="secondary" style={{ padding: "1rem" }}>
                  Sidebar content
                </Text>
              </AppSidebar>
              <AppMain>
                <Text as="h2" size="xl" weight="semibold">
                  Main Content Area
                </Text>
                <Text color="secondary">
                  This is where your main application content goes. The layout
                  handles proper spacing and responsive behavior automatically.
                </Text>
              </AppMain>
            </AppLayout>
          </div>
        </Panel>
      </Section>

      <Section title="Usage">
        <Panel variant="subtle">
          <div
            style={{
              height: "300px",
              position: "relative",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <UsageExample />
          </div>
        </Panel>
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
