import React, { useState } from 'react';
import { SortableTree, Button, Flex, Text } from '@mp-ku/mp-components';

interface NavItem {
  id: string;
  label: string;
  children: NavItem[];
  collapsed?: boolean;
}

const siteNav: NavItem[] = [
  { id: 'home', label: 'Home', children: [] },
  {
    id: 'products',
    label: 'Products',
    children: [
      { id: 'software', label: 'Software', children: [] },
      { id: 'hardware', label: 'Hardware', children: [] },
      { id: 'services', label: 'Services', children: [] },
    ],
  },
  { id: 'about', label: 'About us', children: [] },
  {
    id: 'account',
    label: 'My account',
    children: [
      { id: 'orders', label: 'Order history', children: [] },
      { id: 'addresses', label: 'Addresses', children: [] },
    ],
  },
];

export const Basic = () => {
  const [items, setItems] = useState(siteNav);
  return (
    <SortableTree
      items={items}
      onChange={setItems}
      indentation={32}
      renderItem={(item: NavItem) => <Text>{item.label}</Text>}
    />
  );
};

export const WithItemMenu = () => {
  const [items, setItems] = useState(siteNav.slice(0, 2));
  return (
    <SortableTree
      items={items}
      onChange={setItems}
      indentation={32}
      renderItem={(item: NavItem) => <Text style={{ flex: 1 }}>{item.label}</Text>}
      itemMenu={(_item: NavItem, actions: { moveUp: () => void; moveDown: () => void; erase: () => void }) => (
        <Flex gap="xs">
          <Button size="sm" variant="ghost" title="Move up" onClick={actions.moveUp}>↑</Button>
          <Button size="sm" variant="ghost" title="Move down" onClick={actions.moveDown}>↓</Button>
          <Button size="sm" variant="ghost" title="Delete" onClick={actions.erase}>×</Button>
        </Flex>
      )}
    />
  );
};

const docs: NavItem[] = [
  {
    id: 'handbook',
    label: 'Employee handbook',
    children: [
      { id: 'locked-policies', label: 'Company policies (locked)', children: [] },
      { id: 'onboarding', label: 'Onboarding guide', children: [] },
    ],
  },
  { id: 'locked-legal', label: 'Legal notice (locked)', children: [] },
  { id: 'faq', label: 'FAQ', children: [] },
];

export const LockedItems = () => {
  const [items, setItems] = useState(docs);
  return (
    <SortableTree
      items={items}
      onChange={setItems}
      indentation={32}
      renderItem={(item: NavItem) => <Text>{item.label}</Text>}
      canMove={(item: NavItem) => !item.id.startsWith('locked-')}
    />
  );
};
