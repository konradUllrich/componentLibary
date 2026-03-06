/**
 * TreeEditor2 test fixtures / stories.
 *
 * These wrapper components avoid Playwright CT's function-prop serialization
 * issue. All state and callbacks live inside browser-side React components.
 *
 * All wrappers accept only JSON-serializable props.
 */
import React, { useState } from "react";
import { Tree } from "./Tree";
import type { Item, FlattenedItem } from "./types";

/** Shared custom item type for tests */
interface LabelItem extends Item {
  label: string;
  children: LabelItem[];
}

const sampleItems: LabelItem[] = [
  {
    id: "1",
    label: "Root One",
    children: [
      { id: "1-1", label: "Child 1.1", children: [] },
      { id: "1-2", label: "Child 1.2", children: [] },
    ],
  },
  {
    id: "2",
    label: "Root Two",
    children: [],
  },
  {
    id: "3",
    label: "Root Three",
    children: [{ id: "3-1", label: "Child 3.1", children: [] }],
  },
];

/** Basic rendering — default renderItem (id-based) */
export const BasicSortableTree = () => {
  const [items, setItems] = useState<LabelItem[]>(sampleItems);
  return <Tree items={items} onChange={setItems} />;
};
BasicSortableTree.displayName = "BasicSortableTree";

/** BEM class check — renders items so we can assert class names */
export const BemClassTree = () => {
  const [items, setItems] = useState<LabelItem[]>(sampleItems);
  return <Tree items={items} onChange={setItems} />;
};
BemClassTree.displayName = "BemClassTree";

/** Custom renderItem */
export const CustomRenderSortableTree = () => {
  const [items, setItems] = useState<LabelItem[]>(sampleItems);
  return (
    <Tree
      items={items}
      onChange={setItems}
      renderItem={(item: FlattenedItem<LabelItem>) => (
        <span data-testid={`label-${item.id}`}>{item.label} (custom)</span>
      )}
    />
  );
};
CustomRenderSortableTree.displayName = "CustomRenderSortableTree";

/** Item menu actions */
export const MenuActionsSortableTree = () => {
  const [items, setItems] = useState<LabelItem[]>([
    { id: "a", label: "Alpha", children: [] },
    { id: "b", label: "Beta", children: [] },
  ]);
  return (
    <Tree
      items={items}
      onChange={setItems}
      renderItem={(item: FlattenedItem<LabelItem>) => (
        <span>{item.label}</span>
      )}
      itemMenu={(item, actions) => (
        <div data-testid={`menu-${item.id}`} style={{ display: "flex", gap: "4px" }}>
          <button data-testid={`erase-${item.id}`} onClick={actions.erase}>
            Delete
          </button>
          <button
            data-testid={`add-after-${item.id}`}
            onClick={() =>
              actions.addItemAfter({
                id: crypto.randomUUID(),
                label: "New Item",
              })
            }
          >
            Add After
          </button>
          <button data-testid={`move-up-${item.id}`} onClick={actions.moveUp}>
            Up
          </button>
          <button data-testid={`move-down-${item.id}`} onClick={actions.moveDown}>
            Down
          </button>
        </div>
      )}
    />
  );
};
MenuActionsSortableTree.displayName = "MenuActionsSortableTree";

/** canMove — certain items should not be draggable */
export const NonMovableSortableTree = () => {
  const [items, setItems] = useState<LabelItem[]>([
    { id: "locked", label: "Locked", children: [] },
    { id: "free", label: "Free", children: [] },
  ]);
  return (
    <Tree
      items={items}
      onChange={setItems}
      renderItem={(item: FlattenedItem<LabelItem>) => (
        <span data-testid={`item-${item.id}`}>{item.label}</span>
      )}
      canMove={(item) => item.id !== "locked"}
    />
  );
};
NonMovableSortableTree.displayName = "NonMovableSortableTree";

/** Handle visibility — all items should show a drag handle */
export const HandleVisibilitySortableTree = () => {
  const [items, setItems] = useState<LabelItem[]>(sampleItems);
  return (
    <Tree
      items={items}
      onChange={setItems}
      renderItem={(item: FlattenedItem<LabelItem>) => (
        <span>{item.label}</span>
      )}
    />
  );
};
HandleVisibilitySortableTree.displayName = "HandleVisibilitySortableTree";
