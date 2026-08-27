import React, { useState } from "react";
import { Tree } from "./Tree";
import type { Item, FlattenedItem } from "./types";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Tree } from '@mp-ku/mp-components/intrexx';
import type { Item, FlattenedItem } from '@mp-ku/mp-components/intrexx';

// 1. Define your custom item type (must extend Item)
interface NavItem extends Item {
  label: string;
  icon?: string;
  children: NavItem[];
}

// 2. Control state yourself
const [items, setItems] = useState<NavItem[]>([...]);

// 3. Render the tree
<Tree<NavItem>
  items={items}
  onChange={setItems}
  renderItem={(item: FlattenedItem<NavItem>) => (
    <span>{item.icon} {item.label}</span>
  )}

  // Optional: prevent certain items from being moved
  canMove={(item) => item.id !== 'locked-item'}

  // Optional: prevent certain items from receiving children
  canReceiveChildren={(item) => item.id !== 'leaf-node'}

  // Optional: override indentation (default: 50px per level)
  indentation={40}
/>`;

interface NavItem extends Item {
  label: string;
  icon?: string;
  children: NavItem[];
}

const initialItems: NavItem[] = [
  { id: "home", label: "Home", icon: "🏠", children: [] },
  {
    id: "docs",
    label: "Documents",
    icon: "📁",
    children: [{ id: "readme", label: "README", icon: "📄", children: [] }],
  },
];

/** Live render of {@link usageSource}. */
export const UsageExample = () => {
  const [items, setItems] = useState<NavItem[]>(initialItems);

  return (
    <Tree<NavItem>
      items={items}
      onChange={setItems}
      renderItem={(item: FlattenedItem<NavItem>) => (
        <span>
          {item.icon} {item.label}
        </span>
      )}
      indentation={40}
    />
  );
};
