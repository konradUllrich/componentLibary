import React from "react";
import MenuEditor from "./index";
import { BaseMenuItem, useCreateMenuEditorStore } from "./menuEditorState";

// Define your custom menu item type extending BaseMenuItem
interface ExtendedMenuItem extends BaseMenuItem {
  bla: string;
  // recursive definition for children to ensure they matched the extended type
  children?: ExtendedMenuItem[];
}

const sampleMenuItems: ExtendedMenuItem[] = [
  {
    id: "1",
    title: "Home",
    bla: "ddd",
    children: [
      {
        id: "1.1",
        title: "About Us",
        bla: "ddd",
        children: [
          { id: "1.1.1", title: "Our Story", bla: "ddd" },
          { id: "1.1.2", title: "Our Team", bla: "ddd" },
          { id: "1.1.3", title: "Mission & Values", bla: "ddd" },
        ],
      },
      { id: "1.2", title: "Services", bla: "ddd" },
      { id: "1.3", title: "Contact", bla: "ddd" },
    ],
  },
  {
    id: "2",
    title: "Products",
    bla: "ddd",
    children: [
      { id: "2.1", title: "Category A", bla: "ddd" },
      { id: "2.2", title: "Category B", bla: "ddd" },
      { id: "2.3", title: "Category C", bla: "ddd" },
    ],
  },
  {
    id: "3",
    title: "Resources",
    bla: "ddd",
    children: [
      { id: "3.1", title: "Documentation", bla: "ddd" },
      { id: "3.2", title: "Blog", bla: "ddd" },
      { id: "3.3", title: "Downloads", bla: "ddd" },
    ],
  },
];

const MenuEditorExample: React.FC = () => {
  // Use the custom hook with your extended type
  const useMenuEditorStore = useCreateMenuEditorStore<ExtendedMenuItem>(
    "main-menu-store",
    {
      menuItems: sampleMenuItems,
    }
  );

  const menuItems = useMenuEditorStore((state) => state.menuItems);

  const setSelectedItemId = useMenuEditorStore(
    (state) => state.setSelectedItem
  );
  const setExpandedItems = useMenuEditorStore(
    (state) => state.setExpandedItems
  );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h3>Quick Actions:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedItemId(null)}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
            }}
          >
            Clear Selection
          </button>
          <button
            onClick={() => setExpandedItems(new Set())}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
            }}
          >
            Collapse All
          </button>
          <button
            onClick={() => {
              const allIds = getAllItemIds(menuItems);
              setExpandedItems(new Set(allIds));
            }}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#fff",
            }}
          >
            Expand All
          </button>
        </div>
      </div>

      <details style={{ marginTop: "20px" }}>
        <summary
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          View Current Menu JSON
        </summary>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "12px",
          }}
        >
          {JSON.stringify(menuItems, null, 2)}
        </pre>
      </details>
      <MenuEditor<ExtendedMenuItem>
        store={useMenuEditorStore}
        renderItem={(item) => (
          <span className="flex items-center gap-2">
            {item.title}
            {item.bla && (
              <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                {item.bla}
              </span>
            )}
          </span>
        )}
      />
    </div>
  );
};

function getAllItemIds(items: ExtendedMenuItem[]): string[] {
  const ids: string[] = [];

  const traverse = (menuItems: ExtendedMenuItem[]) => {
    menuItems.forEach((item) => {
      if (item.children && item.children.length > 0) {
        ids.push(item.id);
        traverse(item.children);
      }
    });
  };

  traverse(items);
  return ids;
}

export default MenuEditorExample;
