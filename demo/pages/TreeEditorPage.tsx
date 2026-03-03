import React from "react";
import { Text } from "../../common";
import { Page, Panel, Section } from "../../layout";
import {
  TreeEditor,
  createTreeEditorStore,
  BaseTreeItem,
} from "../../intrexx/TreeEditor";

interface ExtendedTreeItem extends BaseTreeItem {
  icon?: string;
  children?: ExtendedTreeItem[];
}

const sampleItems: ExtendedTreeItem[] = [
  {
    id: "1",
    label: "Documents",
    icon: "📁",
    children: [
      {
        id: "1-1",
        label: "Work",
        icon: "📁",
        children: [
          { id: "1-1-1", label: "Project A", icon: "📄" },
          { id: "1-1-2", label: "Project B", icon: "📄" },
        ],
      },
      { id: "1-2", label: "Personal", icon: "📁" },
    ],
  },
  {
    id: "2",
    label: "Images",
    icon: "🖼️",
    children: [
      { id: "2-1", label: "Vacation", icon: "📷" },
      { id: "2-2", label: "Screenshots", icon: "📷" },
    ],
  },
  {
    id: "3",
    label: "Downloads",
    icon: "📥",
  },
];

const treeStore = createTreeEditorStore<ExtendedTreeItem>("demo-tree", {
  treeItems: sampleItems,
});

export const TreeEditorPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Tree Editor
        </Text>
        <Text color="secondary">
          Drag-and-drop tree editor with keyboard navigation and accessibility
          support
        </Text>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Basic Tree Editor
        </Text>
        <Text color="secondary" size="sm">
          Drag items to reorder or nest them. Click to select. Click ▶ to
          expand.
        </Text>

        <Panel variant="subtle">
          <TreeEditor<ExtendedTreeItem>
            store={treeStore}
            renderItem={(item) => (
              <span>
                {item.icon && (
                  <span className="tree-editor-page__item-icon">{item.icon}</span>
                )}
                {item.label}
              </span>
            )}
          />
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { TreeEditor, createTreeEditorStore } from '@mp-ku/mp-components/intrexx';

// Define your tree item type
interface MyTreeItem extends BaseTreeItem {
  label: string;
  icon?: string;
  children?: MyTreeItem[];
}

// Create the store
const store = createTreeEditorStore<MyTreeItem>('my-tree', {
  treeItems: [...],
});

// Use the component
<TreeEditor
  store={store}
  renderItem={(item) => <span>{item.label}</span>}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
