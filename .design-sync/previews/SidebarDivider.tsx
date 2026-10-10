import React from 'react';
import { Sidebar, SidebarNav, SidebarItem, SidebarDivider } from '@mp-ku/mp-components';

const frame: React.CSSProperties = { height: 340, position: 'relative', overflow: 'hidden' };

export const Labeled = () => (
  <div style={frame}>
    <Sidebar defaultOpen width="240px">
      <SidebarNav>
        <SidebarItem label="Dashboard" isActive />
        <SidebarDivider label="Components" />
        <SidebarItem label="Buttons" />
        <SidebarItem label="Forms" />
        <SidebarDivider label="Hooks" />
        <SidebarItem label="usePagination" />
        <SidebarItem label="useFilter" />
      </SidebarNav>
    </Sidebar>
  </div>
);

export const Plain = () => (
  <div style={frame}>
    <Sidebar defaultOpen width="240px">
      <SidebarNav>
        <SidebarItem label="Inbox" isActive />
        <SidebarItem label="Drafts" />
        <SidebarItem label="Sent" />
        <SidebarDivider />
        <SidebarItem label="Archive" />
        <SidebarItem label="Trash" />
      </SidebarNav>
    </Sidebar>
  </div>
);
