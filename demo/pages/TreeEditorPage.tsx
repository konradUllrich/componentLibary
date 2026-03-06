import React, { useState } from "react";
import { Text } from "../../common";
import { Page, Panel, Section } from "../../layout";
// import {
//   TreeEditor,
//   createTreeEditorStore,
//   BaseTreeItem,
// } from "../../intrexx/TreeEditor";
import { Tree } from "../../intrexx/TreeEditor2/Tree";
// import { BaseTreeItem } from "../../intrexx";
import { Item } from "../../intrexx/TreeEditor2/types";

interface MyTreeItem extends Item {
  label: string;
  icon?: string;
  children: MyTreeItem[];
}

// interface ExtendedTreeItem extends BaseTreeItem {
//   icon?: string;
//   children?: ExtendedTreeItem[];
// }

// const sampleItems: ExtendedTreeItem[] = [
//   {
//     id: "1",
//     label: "Documents",
//     icon: "📁",
//     children: [
//       {
//         id: "1-1",
//         label: "Work",
//         icon: "📁",
//         children: [
//           { id: "1-1-1", label: "Project A", icon: "📄" },
//           { id: "1-1-2", label: "Project B", icon: "📄" },
//         ],
//       },
//       { id: "1-2", label: "Personal", icon: "📁" },
//     ],
//   },
//   {
//     id: "2",
//     label: "Images",
//     icon: "🖼️",
//     children: [
//       { id: "2-1", label: "Vacation", icon: "📷" },
//       { id: "2-2", label: "Screenshots", icon: "📷" },
//     ],
//   },
//   {
//     id: "3",
//     label: "Downloads",
//     icon: "📥",
//   },
// ];

// const treeStore = createTreeEditorStore<ExtendedTreeItem>("demo-tree", {
//   treeItems: sampleItems,
// });

export const TreeEditorPage: React.FC = () => {
  const [items, setItems] = useState<MyTreeItem[]>([
    {
      id: "Home",
      label: "Home",
      icon: "🏠",
      children: [],
    },
    {
      id: "Collections",
      label: "Collections",
      icon: "📁",
      children: [
        { id: "Spring", label: "Spring Collection", icon: "🌸", children: [] },
        { id: "Summer", label: "Summer Collection", icon: "☀️", children: [] },
        { id: "Fall", label: "Fall Collection", icon: "🍂", children: [] },
        { id: "Winter", label: "Winter Collection", icon: "❄️", children: [] },
      ],
    },
    {
      id: "About Us",
      label: "About Us",
      icon: "ℹ️",
      children: [],
    },
    {
      id: "My Account",
      label: "My Account",
      icon: "👤",
      children: [
        { id: "Addresses", label: "Addresses", icon: "📍", children: [] },
        {
          id: "Order History",
          label: "Order History",
          icon: "📦",
          children: [],
        },
      ],
    },
  ]);

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
          <Tree
            items={items}
            onChange={setItems}
            renderItem={({ label, icon }) => (
              <div>
                {icon} {label}
              </div>
            )}
            itemMenu={(item, actions) => {
              return null;
              return (
                <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                  <button
                    onClick={actions.moveUp}
                    title="Move up"
                    style={{ padding: "2px 6px", fontSize: "12px" }}
                  >
                    ↑
                  </button>
                  <button
                    onClick={actions.moveDown}
                    title="Move down"
                    style={{ padding: "2px 6px", fontSize: "12px" }}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => {
                      const newId = `new-${Date.now()}`;
                      actions.addItemAfter({
                        id: newId,
                        label: "New Item",
                        icon: "📄",
                      });
                    }}
                    title="Add item after"
                    style={{ padding: "2px 6px", fontSize: "12px" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      const newId = `child-${Date.now()}`;
                      actions.addChild({
                        id: newId,
                        label: "New Child",
                        icon: "📄",
                      });
                    }}
                    title="Add child"
                    style={{ padding: "2px 6px", fontSize: "12px" }}
                  >
                    +↳
                  </button>
                  <button
                    onClick={actions.erase}
                    title="Delete"
                    style={{
                      padding: "2px 6px",
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            }}
            canMove={(item) => item.label !== "Fall Collection"}
            canReceiveChildren={(item) =>
              !["About Us", "Order History", "Addresses"].includes(item.label)
            }
          />
          {/* <TreeEditor<ExtendedTreeItem>
            store={treeStore}
            renderItem={(item) => (
              <span>
                {item.icon && (
                  <span className="tree-editor-page__item-icon">{item.icon}</span>
                )}
                {item.label}
              </span>
            )}
          /> */}
        </Panel>
      </Section>

      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Usage
        </Text>
        <pre className="code-block">
          <code>{`import { Tree } from '@mp-ku/mp-components/intrexx/TreeEditor/TreeEditor2';
import { Item } from '@mp-ku/mp-components/intrexx/TreeEditor/TreeEditor2/types';

// Define your custom tree item type
interface MyTreeItem extends Item {
  label: string;
  icon?: string;
  children: MyTreeItem[];
}

const [items, setItems] = useState<MyTreeItem[]>([...]);

// Use the component
<Tree
  items={items}
  onChange={setItems}
  renderItem={(item) => (
    <div>{item.icon} {item.label}</div>
  )}
  itemMenu={(item, actions) => (
    <div>
      <button onClick={actions.moveUp}>↑</button>
      <button onClick={actions.moveDown}>↓</button>
      <button onClick={() => actions.addItemAfter({ id: 'new', label: 'New' })}>
        Add After
      </button>
      <button onClick={() => actions.addChild({ id: 'child', label: 'Child' })}>
        Add Child
      </button>
      <button onClick={actions.erase}>Delete</button>
    </div>
  )}
  canMove={(item) => item.label !== "Locked Item"}
  canReceiveChildren={(item) => item.label !== "Leaf Node"}
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
