import React from "react";
import {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarSubItem,
  Page,
  Section,
} from "../../layout";
import { Text } from "../../common";

export const SidebarPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Sidebar Component
        </Text>
        <Text color="secondary">
          Responsive sidebar with collapsible navigation for desktop and mobile
          drawer
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Features
        </Text>
        <Text color="secondary" size="sm">
          The Sidebar component provides:
        </Text>
        <ul style={{ marginTop: "1rem", marginLeft: "1.5rem" }}>
          <li>
            <Text>
              Responsive design: drawer on mobile, collapsible on desktop
            </Text>
          </li>
          <li>
            <Text>Toggle button for expanding/collapsing</Text>
          </li>
          <li>
            <Text>Nested navigation with sub-items</Text>
          </li>
          <li>
            <Text>Active state tracking</Text>
          </li>
          <li>
            <Text>Customizable width and breakpoint</Text>
          </li>
        </ul>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Example
        </Text>
        <Text color="secondary" size="sm">
          Sidebar with navigation items
        </Text>
        <div className="component-page__demo">
          <div
            style={{
              height: "400px",
              position: "relative",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <Sidebar defaultOpen={true}>
              <SidebarToggle />
              <SidebarNav>
                <SidebarItem label="Dashboard" icon="📊" isActive />
                <SidebarItem label="Users" icon="👥">
                  <SidebarSubItem label="All Users" href="#all" />
                  <SidebarSubItem label="Add User" href="#add" />
                </SidebarItem>
                <SidebarItem label="Settings" icon="⚙️" />
                <SidebarItem label="Help" icon="❓" />
              </SidebarNav>
            </Sidebar>
          </div>
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { 
  Sidebar, 
  SidebarToggle, 
  SidebarNav, 
  SidebarItem, 
  SidebarSubItem 
} from '@konradullrich/mp-components';

<Sidebar defaultOpen={true} width="250px">
  <SidebarToggle />
  <SidebarNav>
    <SidebarItem 
      label="Dashboard" 
      icon="📊" 
      isActive 
    />
    <SidebarItem label="Users" icon="👥">
      <SidebarSubItem label="All Users" href="/users" />
      <SidebarSubItem label="Add User" href="/users/add" />
    </SidebarItem>
    <SidebarItem label="Settings" icon="⚙️" />
  </SidebarNav>
</Sidebar>

// Use the useSidebar hook to control sidebar state
import { useSidebar } from '@konradullrich/mp-components';

const { isCollapsed, toggleCollapsed } = useSidebar();`}</code>
        </pre>
      </Section>
    </Page>
  );
};
