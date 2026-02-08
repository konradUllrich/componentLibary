import React from 'react';
import { 
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain,
} from '../../layout';
import { Text } from '../../common';

export const AppLayoutPage: React.FC = () => {
  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">AppLayout Component</Text>
        <Text color="secondary">
          Complete application layout with header, sidebar, and main content area
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Features</Text>
        <Text color="secondary" size="sm">
          AppLayout provides a complete application structure:
        </Text>
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
          <li><Text>AppHeader: Fixed header for branding and actions</Text></li>
          <li><Text>AppSidebar: Collapsible sidebar navigation</Text></li>
          <li><Text>AppMain: Main content area with proper spacing</Text></li>
          <li><Text>Responsive layout that adapts to mobile</Text></li>
        </ul>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Example</Text>
        <Text color="secondary" size="sm">
          Complete application layout structure
        </Text>
        <div className="component-page__demo">
          <div style={{ height: '500px', position: 'relative', border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
            <AppLayout>
              <AppHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Text weight="bold">My Application</Text>
                </div>
              </AppHeader>
              <AppSidebar>
                <Text size="sm" color="secondary" style={{ padding: '1rem' }}>
                  Sidebar content
                </Text>
              </AppSidebar>
              <AppMain>
                <Text as="h2" size="xl" weight="semibold">Main Content Area</Text>
                <Text color="secondary">
                  This is where your main application content goes. The layout handles
                  proper spacing and responsive behavior automatically.
                </Text>
              </AppMain>
            </AppLayout>
          </div>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  AppLayout,
  AppHeader,
  AppSidebar,
  AppMain
} from '@konradullrich/mp-components';

function App() {
  return (
    <AppLayout>
      <AppHeader>
        <div>
          <h1>My App</h1>
          <nav>{/* Navigation items */}</nav>
        </div>
      </AppHeader>
      
      <AppSidebar>
        {/* Sidebar navigation content */}
      </AppSidebar>
      
      <AppMain>
        {/* Main application content */}
        <h2>Welcome</h2>
        <p>Your content here</p>
      </AppMain>
    </AppLayout>
  );
}`}</code>
        </pre>
      </section>
    </div>
  );
};
