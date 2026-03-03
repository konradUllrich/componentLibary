import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useMemo } from "react";

// Constant for the drag item type
export const TREE_ITEM_TYPE = "TREE_ITEM";

// Generic base type
export interface BaseTreeItem {
  id: string;
  label: string;
  children?: BaseTreeItem[];
  // Allow index signature to support extending types accessing generic properties
  [key: string]: unknown;
}

// TreeItem type alias
export type TreeItem = BaseTreeItem;

export interface DragItem {
  type: string;
  id: string;
  parentId?: string;
  index: number;
  label: string;
}

export interface DropResult {
  parentId?: string;
  position?: number;
}

export type TreeAction<T extends BaseTreeItem> =
  | {
      action: "move";
      treeItemId: string;
      parentId: string;
      afterItemId?: string | null;
      order: number;
    }
  | {
      action: "add";
      item: T;
      parentId: string;
      afterItemId?: string | null;
      order: number;
    }
  | {
      action: "delete";
      treeItemId: string;
    }
  | {
      action: "update";
      treeItemId: string;
      updates: Partial<T>;
    };

export interface TreeEditorState<T extends BaseTreeItem> {
  // State
  treeItems: T[];
  selectedItemId: string | null;
  expandedItems: Set<string>;
  actions: TreeAction<T>[];

  // Actions
  setTreeItems: (items: T[]) => void;
  addTreeItem: (item: T, parentId?: string) => void;
  updateTreeItem: (id: string, updates: Partial<T>) => void;
  deleteTreeItem: (id: string) => void;
  moveTreeItem: (
    itemId: string,
    newParentId: string | null,
    newIndex: number
  ) => void;
  reorderTreeItems: (
    oldIndex: number,
    newIndex: number,
    parentId?: string
  ) => void;

  // Action Management
  addAction: (action: TreeAction<T>) => void;
  removeAction: (index: number) => void;
  clearActions: () => void;
  getActions: () => TreeAction<T>[];

  // UI State
  setSelectedItem: (id: string | null) => void;
  toggleExpanded: (id: string) => void;
  setExpandedItems: (ids: Set<string>) => void;

  initializeStore: (treeItems: T[]) => void;
}

export interface TreeEditorInitialState<T extends BaseTreeItem> {
  treeItems?: T[];
  selectedItemId?: string | null;
  expandedItems?: Set<string>;
}

export const createTreeEditorStore = <T extends BaseTreeItem>(
  storeName = "tree-editor-store",
  initialState?: TreeEditorInitialState<T>
) => {
  return create<TreeEditorState<T>>()(
    devtools(
      (set, get) => ({
        // State with initial values
        treeItems: initialState?.treeItems ?? [],
        selectedItemId: initialState?.selectedItemId ?? null,
        expandedItems: initialState?.expandedItems ?? new Set(),
        actions: [],

        // Actions
        setTreeItems: (items: T[]) =>
          set({ treeItems: items }, false, "setTreeItems"),

        addTreeItem: (item: T, parentId?: string) => {
          const state = get();

          let order = state.treeItems.length;
          if (parentId) {
            const findParent = (items: T[]): T | undefined => {
              for (const i of items) {
                if (i.id === parentId) return i;
                if (i.children) {
                  const found = findParent(i.children as T[]);
                  if (found) return found;
                }
              }
              return undefined;
            };
            const parent = findParent(state.treeItems);
            if (parent) {
              order = parent.children ? parent.children.length : 0;
            }
          }

          const addAction: TreeAction<T> = {
            action: "add",
            item,
            parentId: parentId ?? "",
            order,
          };

          if (!parentId) {
            set(
              {
                treeItems: [...state.treeItems, item],
                actions: [...state.actions, addAction],
              },
              false,
              "addTreeItem"
            );
          } else {
            const updatedItems = addItemToParent(
              state.treeItems,
              item,
              parentId
            );
            set(
              {
                treeItems: updatedItems,
                actions: [...state.actions, addAction],
              },
              false,
              "addTreeItem"
            );
          }
        },

        updateTreeItem: (id: string, updates: Partial<T>) => {
          const state = get();
          const updatedItems = updateItemRecursively(
            state.treeItems,
            id,
            updates
          );
          const updateAction: TreeAction<T> = {
            action: "update",
            treeItemId: id,
            updates,
          };
          set(
            {
              treeItems: updatedItems,
              actions: [...state.actions, updateAction],
            },
            false,
            "updateTreeItem"
          );
        },

        deleteTreeItem: (id: string) => {
          const state = get();
          const updatedItems = deleteItemRecursively(state.treeItems, id);
          const deleteAction: TreeAction<T> = {
            action: "delete",
            treeItemId: id,
          };
          set(
            {
              treeItems: updatedItems,
              actions: [...state.actions, deleteAction],
            },
            false,
            "deleteTreeItem"
          );
        },

        moveTreeItem: (
          itemId: string,
          newParentId: string | null,
          newIndex: number
        ) => {
          const state = get();
          const updatedItems = moveItemToNewParent(
            state.treeItems,
            itemId,
            newParentId,
            newIndex
          );

          const afterItemId = getAfterItemId(
            updatedItems,
            newParentId,
            newIndex
          );

          const moveAction: TreeAction<T> = {
            action: "move",
            treeItemId: itemId,
            parentId: newParentId ?? "",
            afterItemId: afterItemId,
            order: newIndex,
          };

          const actionsWithoutDuplicate = state.actions.filter(
            (action) =>
              !(action.action === "move" && action.treeItemId === itemId)
          );

          set(
            {
              treeItems: updatedItems,
              actions: [...actionsWithoutDuplicate, moveAction],
            },
            false,
            "moveTreeItem"
          );
        },

        reorderTreeItems: (
          oldIndex: number,
          newIndex: number,
          parentId?: string
        ) => {
          const state = get();
          const updatedItems = reorderItems(
            state.treeItems,
            oldIndex,
            newIndex,
            parentId
          );

          const movedItemId = getMovedItemId(
            state.treeItems,
            oldIndex,
            parentId
          );

          if (movedItemId) {
            const afterItemId = getAfterItemId(
              updatedItems,
              parentId ?? null,
              newIndex
            );

            const moveAction: TreeAction<T> = {
              action: "move",
              treeItemId: movedItemId,
              parentId: parentId ?? "",
              afterItemId: afterItemId,
              order: newIndex,
            };

            const actionsWithoutDuplicate = state.actions.filter(
              (action) =>
                !(
                  action.action === "move" && action.treeItemId === movedItemId
                )
            );

            set(
              {
                treeItems: updatedItems,
                actions: [...actionsWithoutDuplicate, moveAction],
              },
              false,
              "reorderTreeItems"
            );
          } else {
            set({ treeItems: updatedItems }, false, "reorderTreeItems");
          }
        },

        // Action Management
        addAction: (action: TreeAction<T>) => {
          const state = get();
          set({ actions: [...state.actions, action] }, false, "addAction");
        },

        removeAction: (index: number) => {
          const state = get();
          const newActions = [...state.actions];
          newActions.splice(index, 1);
          set({ actions: newActions }, false, "removeAction");
        },

        clearActions: () => {
          set({ actions: [] }, false, "clearActions");
        },

        getActions: () => {
          return get().actions;
        },

        // UI State
        setSelectedItem: (id: string | null) =>
          set({ selectedItemId: id }, false, "setSelectedItem"),

        toggleExpanded: (id: string) => {
          const state = get();
          const newExpandedItems = new Set(state.expandedItems);

          if (newExpandedItems.has(id)) {
            newExpandedItems.delete(id);
          } else {
            newExpandedItems.add(id);
          }

          set({ expandedItems: newExpandedItems }, false, "toggleExpanded");
        },

        setExpandedItems: (ids: Set<string>) =>
          set({ expandedItems: ids }, false, "setExpandedItems"),

        // Initialization
        initializeStore: (treeItems = []) => {
          set(
            {
              treeItems,
              selectedItemId: null,
              expandedItems: new Set(),
              actions: [],
            },
            false,
            "initializeStore"
          );
        },
      }),
      { name: storeName }
    )
  );
};

// Custom hook for creating and memoizing tree editor stores
export const useCreateTreeEditorStore = <T extends BaseTreeItem>(
  storeName = "tree-editor-store",
  initialState?: TreeEditorInitialState<T>
) => {
  return useMemo(
    () => createTreeEditorStore<T>(storeName, initialState),
    // Intentionally track only primitive/stable properties of initialState (not the
    // object reference itself) so that inline object literals as props don't cause
    // the store to be recreated on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      storeName,
      initialState?.treeItems,
      initialState?.selectedItemId,
      initialState?.expandedItems,
    ]
  );
};

// Helper functions - properly typed with Generics
function addItemToParent<T extends BaseTreeItem>(
  items: T[],
  newItem: T,
  parentId: string
): T[] {
  return items.map((item) => {
    if (item.id === parentId) {
      const currentChildren = (item.children ?? []) as T[];
      return {
        ...item,
        children: [...currentChildren, newItem],
      };
    } else if (item.children) {
      return {
        ...item,
        children: addItemToParent(item.children as T[], newItem, parentId),
      };
    }
    return item;
  });
}

function updateItemRecursively<T extends BaseTreeItem>(
  items: T[],
  id: string,
  updates: Partial<T>
): T[] {
  return items.map((item) => {
    if (item.id === id) {
      return { ...item, ...updates };
    } else if (item.children) {
      return {
        ...item,
        children: updateItemRecursively(item.children as T[], id, updates),
      };
    }
    return item;
  });
}

function deleteItemRecursively<T extends BaseTreeItem>(
  items: T[],
  id: string
): T[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: deleteItemRecursively(item.children as T[], id),
        };
      }
      return item;
    });
}

function moveItemToNewParent<T extends BaseTreeItem>(
  items: T[],
  itemId: string,
  newParentId: string | null,
  newIndex: number
): T[] {
  let itemToMove: T | null = null;
  const itemsWithoutMoved = removeItemRecursively(items, itemId, (item) => {
    itemToMove = item;
  });

  if (!itemToMove) return items;

  if (newParentId === null) {
    const result = [...itemsWithoutMoved];
    result.splice(newIndex, 0, itemToMove);
    return result;
  } else {
    return addItemToParentAtIndex(
      itemsWithoutMoved,
      itemToMove,
      newParentId,
      newIndex
    );
  }
}

function removeItemRecursively<T extends BaseTreeItem>(
  items: T[],
  id: string,
  onRemove?: (item: T) => void
): T[] {
  return items
    .filter((item) => {
      if (item.id === id) {
        if (onRemove) onRemove(item);
        return false;
      }
      return true;
    })
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: removeItemRecursively(item.children as T[], id, onRemove),
        };
      }
      return item;
    });
}

function addItemToParentAtIndex<T extends BaseTreeItem>(
  items: T[],
  newItem: T,
  parentId: string,
  index: number
): T[] {
  return items.map((item) => {
    if (item.id === parentId) {
      const children = [...((item.children ?? []) as T[])];
      children.splice(index, 0, newItem);
      return { ...item, children };
    } else if (item.children) {
      return {
        ...item,
        children: addItemToParentAtIndex(
          item.children as T[],
          newItem,
          parentId,
          index
        ),
      };
    }
    return item;
  });
}

function reorderItems<T extends BaseTreeItem>(
  items: T[],
  oldIndex: number,
  newIndex: number,
  parentId?: string
): T[] {
  if (parentId) {
    return items.map((item) => {
      if (item.id === parentId && item.children) {
        const children = [...(item.children as T[])];
        const [movedItem] = children.splice(oldIndex, 1);
        children.splice(newIndex, 0, movedItem);
        return { ...item, children };
      } else if (item.children) {
        return {
          ...item,
          children: reorderItems(
            item.children as T[],
            oldIndex,
            newIndex,
            parentId
          ),
        };
      }
      return item;
    });
  } else {
    const result = [...items];
    const [movedItem] = result.splice(oldIndex, 1);
    result.splice(newIndex, 0, movedItem);
    return result;
  }
}

function getAfterItemId<T extends BaseTreeItem>(
  items: T[],
  parentId: string | null,
  index: number
): string | null {
  if (parentId === null) {
    return index < items.length - 1 ? items[index + 1].id : null;
  } else {
    const findAfterItem = (treeItems: T[]): string | null => {
      for (const item of treeItems) {
        if (item.id === parentId && item.children) {
          return index < item.children.length - 1
            ? item.children[index + 1].id
            : null;
        }
        if (item.children) {
          const result = findAfterItem(item.children as T[]);
          if (result !== undefined) return result;
        }
      }
      return null;
    };
    return findAfterItem(items);
  }
}

function getMovedItemId<T extends BaseTreeItem>(
  items: T[],
  index: number,
  parentId?: string
): string | null {
  if (parentId) {
    const findMovedItem = (treeItems: T[]): string | null => {
      for (const item of treeItems) {
        if (item.id === parentId && item.children) {
          return (item.children as T[])[index]?.id ?? null;
        }
        if (item.children) {
          const result = findMovedItem(item.children as T[]);
          if (result) return result;
        }
      }
      return null;
    };
    return findMovedItem(items);
  } else {
    return items[index]?.id ?? null;
  }
}

// Default store instance
export const useTreeEditorStore = createTreeEditorStore();
