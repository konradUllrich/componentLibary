import React from 'react';
import { Sidebar, SidebarToggle, SidebarNav, SidebarItem, SidebarDivider } from '@mp-ku/mp-components';

const frame: React.CSSProperties = { height: 340, position: 'relative', overflow: 'hidden' };

export const Expanded = () => (
  <div style={frame}>
    <Sidebar defaultOpen width="250px">
      <SidebarToggle />
      <SidebarNav>
        <SidebarItem label="Dashboard" icon="📊" isActive />
        <SidebarItem label="Projects" icon="📁" />
        <SidebarItem label="Calendar" icon="📅" />
        <SidebarItem label="Users" icon="👥">
          <SidebarItem label="All users" href="#users" />
          <SidebarItem label="Add user" href="#users/add" />
        </SidebarItem>
        <SidebarItem label="Settings" icon="⚙️" />
      </SidebarNav>
    </Sidebar>
  </div>
);

export const Collapsed = () => (
  <div style={frame}>
    <Sidebar defaultOpen={false}>
      <SidebarToggle />
      <SidebarNav>
        <SidebarItem label="Dashboard" icon="📊" isActive />
        <SidebarItem label="Projects" icon="📁" />
        <SidebarItem label="Settings" icon="⚙️" />
      </SidebarNav>
    </Sidebar>
  </div>
);

export const WithSections = () => (
  <div style={frame}>
    <Sidebar defaultOpen width="250px">
      <SidebarNav>
        <SidebarItem label="Home" />
        <SidebarDivider label="Workspace" />
        <SidebarItem label="Projects" icon="📁" isActive />
        <SidebarItem label="Tasks" />
        <SidebarDivider label="Account" />
        <SidebarItem label="Profile" />
        <SidebarItem label="Sign out" />
      </SidebarNav>
    </Sidebar>
  </div>
);
