import React from "react";
import {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem,
  SidebarProvider,
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

      <Section title="Features" subtitle="The Sidebar component provides:">
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

      <Section title="Basic Example" subtitle="Sidebar with navigation items">

        <div
          style={{
            height: "400px",
            position: "relative",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {/* This page itself renders inside the docs site's AppLayout,
              which already wraps everything in a SidebarProvider for its
              own sidebar. Without an explicit SidebarProvider here, this
              example Sidebar would inherit that ambient store and its
              toggle would open/collapse the real docs sidebar too. */}
          <SidebarProvider>
            <Sidebar defaultOpen={true}>
              <SidebarToggle />
              <SidebarNav>
                <SidebarItem label="Dashboard" icon="📊" isActive />
                <SidebarItem label="Users" icon="👥">
                  <SidebarItem label="All Users" href="#all" />
                  <SidebarItem label="Add User" href="#add" />
                </SidebarItem>
                <SidebarItem label="Settings" icon="⚙️" />
                <SidebarItem label="Help" icon="❓" />
              </SidebarNav>
            </Sidebar>
          </SidebarProvider>
        </div>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { 
  Sidebar, 
  SidebarToggle, 
  SidebarNav, 
  SidebarItem 
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
      <SidebarItem label="All Users" href="/users" />
      <SidebarItem label="Add User" href="/users/add" />
    </SidebarItem>
    <SidebarItem label="Settings" icon="⚙️" />
  </SidebarNav>
</Sidebar>

// Use the useSidebar hook to control sidebar state
import { useSidebar } from '@konradullrich/mp-components';

const { isCollapsed, toggleCollapsed } = useSidebar();

// Each Sidebar owns its own open/collapsed state by default, so multiple
// Sidebars on one page never interfere with each other. To share state
// between a Sidebar and a toggle rendered outside its subtree (e.g. a
// mobile menu button in the header), wrap both in a SidebarProvider —
// AppLayout does this automatically for its header/sidebar/main slots.
import { SidebarProvider, SidebarMobileToggle } from '@konradullrich/mp-components';

<SidebarProvider>
  <SidebarMobileToggle />
  <Sidebar>...</Sidebar>
</SidebarProvider>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
