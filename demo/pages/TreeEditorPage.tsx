import React, { useState } from "react";
import { Button, Text } from "../../common";
import { Page, Panel, Section } from "../../layout";
import { Tree } from "../../intrexx/TreeEditor";
import type { Item, FlattenedItem } from "../../intrexx/TreeEditor";

interface MyTreeItem extends Item {
  label: string;
  icon?: string;
  children: MyTreeItem[];
}

const basicItems: MyTreeItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "🏠",
    children: [],
  },
  {
    id: "collections",
    label: "Collections",
    icon: "📁",
    children: [
      {
        id: "spring",
        label: "Spring Collection",
        icon: "🌸",
        children: [],
      },
      {
        id: "summer",
        label: "Summer Collection",
        icon: "☀️",
        children: [],
      },
      { id: "fall", label: "Fall Collection", icon: "🍂", children: [] },
      {
        id: "winter",
        label: "Winter Collection",
        icon: "❄️",
        children: [],
      },
    ],
  },
  {
    id: "about",
    label: "About Us",
    icon: "ℹ️",
    children: [],
  },
  {
    id: "account",
    label: "My Account",
    icon: "👤",
    children: [
      { id: "addresses", label: "Addresses", icon: "📍", children: [] },
      {
        id: "orders",
        label: "Order History",
        icon: "📦",
        children: [],
      },
    ],
  },
];

const restrictedItems: MyTreeItem[] = [
  {
    id: "docs",
    label: "Documents",
    icon: "📁",
    children: [
      {
        id: "work",
        label: "Work",
        icon: "💼",
        children: [
          { id: "proj-a", label: "Project A", icon: "📄", children: [] },
        ],
      },
    ],
  },
  { id: "leaf-a", label: "Leaf Node A", icon: "🍃", children: [] },
  { id: "leaf-b", label: "Leaf Node B", icon: "🍃", children: [] },
];

/** ─── Demo Page ─────────────────────────────────────────── */
export const TreeEditorPage: React.FC = () => {
  /* ── Basic tree state ─────────────────────────────────── */
  const [basicState, setBasicState] = useState<MyTreeItem[]>(basicItems);

  /* ── Full-featured tree state ────────────────────────── */
  const [fullState, setFullState] = useState<MyTreeItem[]>([
    { id: "f1", label: "Menu Item 1", icon: "📄", children: [] },
    {
      id: "f2",
      label: "Menu Item 2",
      icon: "📁",
      children: [
        { id: "f2-1", label: "Sub Item 2.1", icon: "📄", children: [] },
        { id: "f2-2", label: "Sub Item 2.2", icon: "📄", children: [] },
      ],
    },
    { id: "f3", label: "Menu Item 3", icon: "📄", children: [] },
  ]);

  /* ── Read-only tree state ────────────────────────────── */
  const [readOnlyState, setReadOnlyState] = useState<MyTreeItem[]>([
    {
      id: "ro-locked",
      label: "🔒 Locked (cannot move)",
      icon: "🔒",
      children: [],
    },
    { id: "ro-free1", label: "Free Item 1", icon: "📄", children: [] },
    { id: "ro-free2", label: "Free Item 2", icon: "📄", children: [] },
    { id: "ro-locked2", label: "🔒 Also Locked", icon: "🔒", children: [] },
  ]);

  /* ── Restricted nesting state ───────────────────────── */
  const [restrictedState, setRestrictedState] =
    useState<MyTreeItem[]>(restrictedItems);

  return (
    <Page>
      {/* ── Hero ────────────────────────────────────────── */}
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Sortable Tree Editor
        </Text>
        <Text color="secondary">
          A drag-and-drop tree editor built on <strong>@dnd-kit/react</strong>.
          Supports keyboard navigation, arbitrary nesting, and a fully
          customisable item renderer and action menu.
        </Text>
      </Section>

      {/* ── Basic usage ─────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Usage
        </Text>
        <Text color="secondary" size="sm">
          Provide <code>items</code>, <code>onChange</code>, and a{" "}
          <code>renderItem</code> callback. Drag to reorder or nest.
        </Text>

        <Panel variant="subtle">
          <Tree
            items={basicState}
            onChange={setBasicState}
            renderItem={({ label, icon }: FlattenedItem<MyTreeItem>) => (
              <span>
                {icon} {label}
              </span>
            )}
          />
        </Panel>
      </Section>

      {/* ── Full-featured ────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Full-Featured — with Item Menu
        </Text>
        <Text color="secondary" size="sm">
          Pass an <code>itemMenu</code> callback to render action buttons for
          each item. Available actions: <code>moveUp</code>,{" "}
          <code>moveDown</code>, <code>addItemAfter</code>,{" "}
          <code>addChild</code>, and <code>erase</code>.
        </Text>

        <Panel variant="subtle">
          <Tree
            items={fullState}
            onChange={setFullState}
            renderItem={({ label, icon }: FlattenedItem<MyTreeItem>) => (
              <span style={{ flex: 1 }}>
                {icon} {label}
              </span>
            )}
            itemMenu={(item, actions) => (
              <div style={{ display: "flex", gap: "var(--spacing-1)" }}>
                <Button
                  size="sm"
                  variant="ghost"
                  title="Move up"
                  onClick={actions.moveUp}
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  title="Move down"
                  onClick={actions.moveDown}
                >
                  ↓
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  title="Add item after"
                  onClick={() =>
                    actions.addItemAfter({
                      id: crypto.randomUUID(),
                      label: "New Item",
                      icon: "📄",
                    })
                  }
                >
                  +
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  title="Add child"
                  onClick={() =>
                    actions.addChild({
                      id: crypto.randomUUID(),
                      label: "New Child",
                      icon: "📄",
                    })
                  }
                >
                  +↳
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  title="Delete"
                  onClick={actions.erase}
                >
                  ×
                </Button>
              </div>
            )}
          />
        </Panel>
      </Section>

      {/* ── Read-only / non-movable ───────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Read-Only / Non-Movable Items
        </Text>
        <Text color="secondary" size="sm">
          Use <code>canMove</code> to prevent specific items from being dragged.
          Locked items are shown at reduced opacity.
        </Text>

        <Panel variant="subtle">
          <Tree
            items={readOnlyState}
            onChange={setReadOnlyState}
            renderItem={({ label }: FlattenedItem<MyTreeItem>) => (
              <span>{label}</span>
            )}
            canMove={(item) => !item.id.startsWith("ro-locked")}
          />
        </Panel>
      </Section>

      {/* ── Restricted nesting ───────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Restricted Nesting
        </Text>
        <Text color="secondary" size="sm">
          Use <code>canReceiveChildren</code> to prevent certain items from
          becoming parent nodes. Leaf nodes below will not accept children when
          dragged over.
        </Text>

        <Panel variant="subtle">
          <Tree
            items={restrictedState}
            onChange={setRestrictedState}
            renderItem={({ label, icon }: FlattenedItem<MyTreeItem>) => (
              <span>
                {icon} {label}
              </span>
            )}
            canReceiveChildren={(item) => !item.id.startsWith("leaf-")}
          />
        </Panel>
      </Section>

      {/* ── Live state ───────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Live State (Full-Featured Tree)
        </Text>
        <Text color="secondary" size="sm">
          The JSON below updates in real-time as you modify the tree above.
        </Text>

        <Panel variant="subtle">
          <pre
            style={{
              fontSize: "var(--font-size-xs)",
              overflowX: "auto",
              margin: 0,
            }}
          >
            {JSON.stringify(fullState, null, 2)}
          </pre>
        </Panel>
      </Section>

      {/* ── API reference ────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>

        <pre className="code-block">
          <code>{`import { SortableTree } from '@mp-ku/mp-components/intrexx';
import type { SortableTreeItem, SortableTreeFlattenedItem } from '@mp-ku/mp-components/intrexx';

// 1. Define your custom item type (must extend SortableTreeItem)
interface NavItem extends SortableTreeItem {
  label: string;
  icon?: string;
  children: NavItem[];
}

// 2. Control state yourself
const [items, setItems] = useState<NavItem[]>([...]);

// 3. Render the tree
<SortableTree<NavItem>
  items={items}
  onChange={setItems}

  // Custom renderer for each item
  renderItem={(item: SortableTreeFlattenedItem<NavItem>) => (
    <span>{item.icon} {item.label}</span>
  )}

  // Action menu per item
  itemMenu={(item, actions) => (
    <div>
      <button onClick={actions.moveUp}>↑</button>
      <button onClick={actions.moveDown}>↓</button>
      <button onClick={() => actions.addItemAfter({ id: 'new-1', label: 'New' })}>
        Add After
      </button>
      <button onClick={() => actions.addChild({ id: 'child-1', label: 'Child' })}>
        Add Child
      </button>
      <button onClick={actions.erase}>Delete</button>
    </div>
  )}

  // Optional: prevent certain items from being moved
  canMove={(item) => item.id !== 'locked-item'}

  // Optional: prevent certain items from receiving children
  canReceiveChildren={(item) => item.id !== 'leaf-node'}

  // Optional: override indentation (default: 50px per level)
  indentation={40}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
