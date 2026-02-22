import React, { useState } from 'react';
import { Tabs, Text } from '../../common';

export const TabsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [pillsTab, setPillsTab] = useState('pills1');

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">Tabs Component</Text>
        <Text color="secondary">
          Flexible tabbed interface with keyboard navigation and multiple variants
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Default Variant</Text>
        <Text color="secondary" size="sm">
          Standard tab interface with default styling
        </Text>
        <div className="component-page__demo">
          <Tabs
            items={[
              { 
                id: 'tab1', 
                label: 'Overview', 
                content: <div style={{ padding: '1rem' }}><Text>Overview content goes here. This is the first tab.</Text></div>
              },
              { 
                id: 'tab2', 
                label: 'Details', 
                content: <div style={{ padding: '1rem' }}><Text>Details content goes here. This is the second tab.</Text></div>
              },
              { 
                id: 'tab3', 
                label: 'Settings', 
                content: <div style={{ padding: '1rem' }}><Text>Settings content goes here. This is the third tab.</Text></div>
              },
            ]}
            activeId={activeTab}
            onActiveChange={setActiveTab}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Underline Variant</Text>
        <Text color="secondary" size="sm">
          Tabs with underline indicator for active tab
        </Text>
        <div className="component-page__demo">
          <Tabs
            variant="underline"
            items={[
              { 
                id: 'u1', 
                label: 'Tab 1', 
                content: <div style={{ padding: '1rem' }}><Text>Content for underline tab 1</Text></div>
              },
              { 
                id: 'u2', 
                label: 'Tab 2', 
                content: <div style={{ padding: '1rem' }}><Text>Content for underline tab 2</Text></div>
              },
              { 
                id: 'u3', 
                label: 'Tab 3', 
                content: <div style={{ padding: '1rem' }}><Text>Content for underline tab 3</Text></div>
              },
            ]}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Pills Variant</Text>
        <Text color="secondary" size="sm">
          Tabs styled as pills for a more compact look
        </Text>
        <div className="component-page__demo">
          <Tabs
            variant="pills"
            items={[
              { 
                id: 'pills1', 
                label: 'First', 
                content: <div style={{ padding: '1rem' }}><Text>Pills tab 1 content</Text></div>
              },
              { 
                id: 'pills2', 
                label: 'Second', 
                content: <div style={{ padding: '1rem' }}><Text>Pills tab 2 content</Text></div>
              },
              { 
                id: 'pills3', 
                label: 'Third', 
                content: <div style={{ padding: '1rem' }}><Text>Pills tab 3 content</Text></div>
              },
            ]}
            activeId={pillsTab}
            onActiveChange={setPillsTab}
          />
        </div>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { Tabs } from '@konradullrich/mp-components';

// Basic usage
const [activeTab, setActiveTab] = useState('tab1');

<Tabs
  items={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  activeId={activeTab}
  onActiveChange={setActiveTab}
/>

// Underline variant
<Tabs
  variant="underline"
  items={[...]}
/>

// Pills variant
<Tabs
  variant="pills"
  items={[...]}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};