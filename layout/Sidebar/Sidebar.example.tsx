import React from "react";
import { Sidebar } from "./Sidebar";
import { SidebarToggle } from "./SidebarToggle";
import { SidebarNav } from "./SidebarNav";
import { SidebarItem } from "./SidebarItem";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  Sidebar,
  SidebarToggle,
  SidebarNav,
  SidebarItem
} from '@mp-ku/mp-components';

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
import { useSidebar } from '@mp-ku/mp-components';

const { isCollapsed, toggleCollapsed } = useSidebar();

// Each Sidebar owns its own open/collapsed state by default, so multiple
// Sidebars on one page never interfere with each other. To share state
// between a Sidebar and a toggle rendered outside its subtree (e.g. a
// mobile menu button in the header), wrap both in a SidebarProvider —
// AppLayout does this automatically for its header/sidebar/main slots.
import { SidebarProvider, SidebarMobileToggle } from '@mp-ku/mp-components';

<SidebarProvider>
  <SidebarMobileToggle />
  <Sidebar>...</Sidebar>
</SidebarProvider>`;

/**
 * Live render of the basic-usage part of {@link usageSource}, used on the
 * Sidebar demo page. Bounded to a fixed-height box since a real Sidebar is
 * meant to fill its viewport.
 */
export const UsageExample = () => (
  <div style={{ height: "320px", position: "relative", overflow: "hidden" }}>
    <Sidebar defaultOpen={true} width="250px">
      <SidebarToggle />
      <SidebarNav>
        <SidebarItem label="Dashboard" icon="📊" isActive />
        <SidebarItem label="Users" icon="👥">
          <SidebarItem label="All Users" href="/users" />
          <SidebarItem label="Add User" href="/users/add" />
        </SidebarItem>
        <SidebarItem label="Settings" icon="⚙️" />
      </SidebarNav>
    </Sidebar>
  </div>
);
