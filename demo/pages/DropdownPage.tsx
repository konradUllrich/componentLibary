import React from 'react';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownLabel, 
  DropdownSeparator,
  Button,
  Text 
} from '../../common';

export const DropdownPage: React.FC = () => {
  const [lastAction, setLastAction] = React.useState<string>('');

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Dropdown Component</Text>
        <Text color="secondary">
          Accessible dropdown menu with keyboard navigation, item grouping, and positioning
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Basic Dropdown</Text>
        <Text color="secondary" size="sm">
          Simple dropdown menu with basic items
        </Text>
        <div className="component-page__demo">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button>Open Menu</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onSelect={() => setLastAction('New File')}>
                New File
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('New Folder')}>
                New Folder
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem onSelect={() => setLastAction('Settings')}>
                Settings
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
          {lastAction && (
            <Text size="sm" color="secondary" style={{ marginTop: '0.5rem' }}>
              Last action: {lastAction}
            </Text>
          )}
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Grouped Items</Text>
        <Text color="secondary" size="sm">
          Dropdown with labels and separators to organize items
        </Text>
        <div className="component-page__demo">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="secondary">Actions</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownLabel>File Actions</DropdownLabel>
              <DropdownItem onSelect={() => setLastAction('Open')}>
                Open
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Save')}>
                Save
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Export')}>
                Export
              </DropdownItem>
              <DropdownSeparator />
              <DropdownLabel>Edit Actions</DropdownLabel>
              <DropdownItem onSelect={() => setLastAction('Cut')}>
                Cut
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Copy')}>
                Copy
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Paste')}>
                Paste
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Disabled Items</Text>
        <Text color="secondary" size="sm">
          Some menu items can be disabled
        </Text>
        <div className="component-page__demo">
          <Dropdown>
            <DropdownTrigger asChild>
              <Button>Edit Menu</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onSelect={() => setLastAction('Edit')}>
                Edit
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Duplicate')}>
                Duplicate
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem disabled onSelect={() => setLastAction('Archive')}>
                Archive (disabled)
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Delete')}>
                Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Positioning</Text>
        <Text color="secondary" size="sm">
          Dropdown can be positioned on different sides of the trigger
        </Text>
        <div className="component-page__demo" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost">Bottom (default)</Button>
            </DropdownTrigger>
            <DropdownContent side="bottom">
              <DropdownItem onSelect={() => setLastAction('Bottom 1')}>
                Item 1
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Bottom 2')}>
                Item 2
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost">Top</Button>
            </DropdownTrigger>
            <DropdownContent side="top">
              <DropdownItem onSelect={() => setLastAction('Top 1')}>
                Item 1
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Top 2')}>
                Item 2
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost">Right</Button>
            </DropdownTrigger>
            <DropdownContent side="right">
              <DropdownItem onSelect={() => setLastAction('Right 1')}>
                Item 1
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Right 2')}>
                Item 2
              </DropdownItem>
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost">Left</Button>
            </DropdownTrigger>
            <DropdownContent side="left">
              <DropdownItem onSelect={() => setLastAction('Left 1')}>
                Item 1
              </DropdownItem>
              <DropdownItem onSelect={() => setLastAction('Left 2')}>
                Item 2
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Keyboard Navigation</Text>
        <Text color="secondary" size="sm">
          Dropdown supports keyboard interactions for accessibility
        </Text>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li><Text size="sm"><strong>Enter / Space</strong> - Opens the menu when trigger is focused</Text></li>
          <li><Text size="sm"><strong>Arrow Down</strong> - Moves focus to next menu item</Text></li>
          <li><Text size="sm"><strong>Arrow Up</strong> - Moves focus to previous menu item</Text></li>
          <li><Text size="sm"><strong>Escape</strong> - Closes the menu</Text></li>
          <li><Text size="sm"><strong>Enter</strong> - Selects the focused menu item</Text></li>
        </ul>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem,
  DropdownLabel,
  DropdownSeparator
} from '@konradullrich/mp-components';

// Basic dropdown
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem onSelect={() => console.log('Edit')}>
      Edit
    </DropdownItem>
    <DropdownItem onSelect={() => console.log('Delete')}>
      Delete
    </DropdownItem>
  </DropdownContent>
</Dropdown>

// With groups and separators
<Dropdown>
  <DropdownTrigger asChild>
    <Button>Actions</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownLabel>File</DropdownLabel>
    <DropdownItem onSelect={...}>New</DropdownItem>
    <DropdownItem onSelect={...}>Open</DropdownItem>
    <DropdownSeparator />
    <DropdownLabel>Edit</DropdownLabel>
    <DropdownItem onSelect={...}>Cut</DropdownItem>
    <DropdownItem onSelect={...}>Copy</DropdownItem>
  </DropdownContent>
</Dropdown>

// Positioning
<DropdownContent side="top" align="start">
  ...
</DropdownContent>`}</code>
        </pre>
      </section>
    </div>
  );
};
