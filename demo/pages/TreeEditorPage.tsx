import React, { useState } from "react";
import { Button, Text } from "../../common";
import { Page, Panel, Section } from "../../layout";
import { Tree } from "../../intrexx/TreeEditor";
import type { Item, FlattenedItem } from "../../intrexx/TreeEditor";
import { usageSource } from "../../intrexx/TreeEditor/Tree.example";

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
      <Section title="Basic Usage" subtitle="Provide items, onChange, and a renderItem callback. Drag to reorder or nest.">
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
      <Section title="Full-Featured — with Item Menu" subtitle="Pass an itemMenu callback to render action buttons for each item. Available actions: moveUp, moveDown, addItemAfter, addChild, and erase.">
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
              <div style={{ display: "flex", gap: "var(--mp-spacing-1)" }}>
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
      <Section title="Read-Only / Non-Movable Items" subtitle="Use canMove to prevent specific items from being dragged. Locked items are shown at reduced opacity.">
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
      <Section title="Restricted Nesting" subtitle="Use canReceiveChildren to prevent certain items from becoming parent nodes. Leaf nodes below will not accept children when dragged over.">
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
      <Section title="Live State (Full-Featured Tree)" subtitle="The JSON below updates in real-time as you modify the tree above.">
        <Panel variant="subtle">
          <pre
            style={{
              fontSize: "var(--mp-font-size-xs)",
              overflowX: "auto",
              margin: 0,
            }}
          >
            {JSON.stringify(fullState, null, 2)}
          </pre>
        </Panel>
      </Section>

      {/* ── API reference ────────────────────────────────── */}
      <Section title="Usage">
        <pre className="code-block">
          <code>{usageSource}</code>
        </pre>
      </Section>
    </Page>
  );
};
