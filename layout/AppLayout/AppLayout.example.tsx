import React from "react";
import { AppLayout } from "./AppLayout";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { AppMain } from "./AppMain";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain
} from '@mp-ku/mp-components';

function App() {
  return (
    <AppLayout
      header={
        <AppHeader>
          <h1>My App</h1>
          <nav>{/* Navigation items */}</nav>
        </AppHeader>
      }
      sidebar={
        <AppSidebar>
          {/* Sidebar navigation content */}
        </AppSidebar>
      }
    >
      <AppMain>
        <h2>Welcome</h2>
        <p>Your content here</p>
      </AppMain>
    </AppLayout>
  );
}`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <AppLayout
    header={
      <AppHeader>
        <div>My App</div>
      </AppHeader>
    }
    sidebar={
      <AppSidebar>
        <div>Sidebar content</div>
      </AppSidebar>
    }
  >
    <AppMain>
      <div>Content</div>
    </AppMain>
  </AppLayout>
);
