import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useMemo } from "react";

// Generic base type
export interface BaseMenuItem {
  id: string;
  title: string;
  children?: BaseMenuItem[];
  // Allow index signature to support extending types accessing generic properties
  [key: string]: any;
}

export type MenuAction<T extends BaseMenuItem> =
  | {
      action: "move";
      menuItemId: string;
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
      menuItemId: string;
    }
  | {
      action: "update";
      menuItemId: string;
      updates: Partial<T>;
    };

export interface MenuEditorState<T extends BaseMenuItem> {
  // State
  menuItems: T[];
  selectedItemId: string | null;
  expandedItems: Set<string>;
  actions: MenuAction<T>[];

  // Actions
  setMenuItems: (items: T[]) => void;
  addMenuItem: (item: T, parentId?: string) => void;
  updateMenuItem: (id: string, updates: Partial<T>) => void;
  deleteMenuItem: (id: string) => void;
  moveMenuItem: (
    itemId: string,
    newParentId: string | null,
    newIndex: number
  ) => void;
  reorderMenuItems: (
    oldIndex: number,
    newIndex: number,
    parentId?: string
  ) => void;

  // Action Management
  addAction: (action: MenuAction<T>) => void;
  removeAction: (index: number) => void;
  clearActions: () => void;
  getActions: () => MenuAction<T>[];

  // UI State
  setSelectedItem: (id: string | null) => void;
  toggleExpanded: (id: string) => void;
  setExpandedItems: (ids: Set<string>) => void;

  initializeStore: (menuItems: T[]) => void;
}

export interface MenuEditorInitialState<T extends BaseMenuItem> {
  menuItems?: T[];
  selectedItemId?: string | null;
  expandedItems?: Set<string>;
}

export const createMenuEditorStore = <T extends BaseMenuItem>(
  storeName = "menu-editor-store",
  initialState?: MenuEditorInitialState<T>
) => {
  return create<MenuEditorState<T>>()(
    devtools(
      (set, get) => ({
        // State with initial values
        menuItems: initialState?.menuItems || [],
        selectedItemId: initialState?.selectedItemId || null,
        expandedItems: initialState?.expandedItems || new Set(),
        actions: [],

        // Actions
        setMenuItems: (items: T[]) =>
          set({ menuItems: items }, false, "setMenuItems"),

        addMenuItem: (item: T, parentId?: string) => {
          const state = get();

          let order = state.menuItems.length;
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
            const parent = findParent(state.menuItems);
            if (parent) {
              order = parent.children ? parent.children.length : 0;
            }
          }

          const addAction: MenuAction<T> = {
            action: "add",
            item,
            parentId: parentId || "",
            order,
          };

          if (!parentId) {
            // Add to root level
            set(
              {
                menuItems: [...state.menuItems, item],
                actions: [...state.actions, addAction],
              },
              false,
              "addMenuItem"
            );
          } else {
            // Add to specific parent
            const updatedItems = addItemToParent(
              state.menuItems,
              item,
              parentId
            );
            set(
              {
                menuItems: updatedItems,
                actions: [...state.actions, addAction],
              },
              false,
              "addMenuItem"
            );
          }
        },

        updateMenuItem: (id: string, updates: Partial<T>) => {
          const state = get();
          const updatedItems = updateItemRecursively(
            state.menuItems,
            id,
            updates
          );
          const updateAction: MenuAction<T> = {
            action: "update",
            menuItemId: id,
            updates,
          };
          set(
            {
              menuItems: updatedItems,
              actions: [...state.actions, updateAction],
            },
            false,
            "updateMenuItem"
          );
        },

        deleteMenuItem: (id: string) => {
          const state = get();
          const updatedItems = deleteItemRecursively(state.menuItems, id);
          const deleteAction: MenuAction<T> = {
            action: "delete",
            menuItemId: id,
          };
          set(
            {
              menuItems: updatedItems,
              actions: [...state.actions, deleteAction],
            },
            false,
            "deleteMenuItem"
          );
        },

        moveMenuItem: (
          itemId: string,
          newParentId: string | null,
          newIndex: number
        ) => {
          const state = get();
          const updatedItems = moveItemToNewParent(
            state.menuItems,
            itemId,
            newParentId,
            newIndex
          );

          // Find the item that comes after the new position to use as afterItemId
          const afterItemId = getAfterItemId(
            updatedItems,
            newParentId,
            newIndex
          );

          const moveAction: MenuAction<T> = {
            action: "move",
            menuItemId: itemId,
            parentId: newParentId || "",
            afterItemId: afterItemId,
            order: newIndex,
          };

          // Remove any existing move action for this menu item and add the new one
          const actionsWithoutDuplicate = state.actions.filter(
            (action) =>
              !(action.action === "move" && action.menuItemId === itemId)
          );

          set(
            {
              menuItems: updatedItems,
              actions: [...actionsWithoutDuplicate, moveAction],
            },
            false,
            "moveMenuItem"
          );
        },

        reorderMenuItems: (
          oldIndex: number,
          newIndex: number,
          parentId?: string
        ) => {
          const state = get();
          const updatedItems = reorderItems(
            state.menuItems,
            oldIndex,
            newIndex,
            parentId
          );

          // Get the item that was moved to track the action
          const movedItemId = getMovedItemId(
            state.menuItems,
            oldIndex,
            parentId
          );

          if (movedItemId) {
            // Find the item that comes after the new position
            const afterItemId = getAfterItemId(
              updatedItems,
              parentId || null,
              newIndex
            );

            const moveAction: MenuAction<T> = {
              action: "move",
              menuItemId: movedItemId,
              parentId: parentId || "",
              afterItemId: afterItemId,
              order: newIndex,
            };

            // Remove any existing move action for this menu item and add the new one
            const actionsWithoutDuplicate = state.actions.filter(
              (action) =>
                !(action.action === "move" && action.menuItemId === movedItemId)
            );

            set(
              {
                menuItems: updatedItems,
                actions: [...actionsWithoutDuplicate, moveAction],
              },
              false,
              "reorderMenuItems"
            );
          } else {
            set({ menuItems: updatedItems }, false, "reorderMenuItems");
          }
        },

        // Action Management
        addAction: (action: MenuAction<T>) => {
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
        initializeStore: (menuItems = []) => {
          // Initialize with sample data or load from API
          set(
            {
              menuItems,
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

// Custom hook for creating and memoizing menu editor stores
export const useCreateMenuEditorStore = <T extends BaseMenuItem>(
  storeName = "menu-editor-store",
  initialState?: MenuEditorInitialState<T>
) => {
  return useMemo(
    () => createMenuEditorStore<T>(storeName, initialState),
    [
      storeName,
      initialState?.menuItems,
      initialState?.selectedItemId,
      initialState?.expandedItems,
    ]
  );
};

// Helper functions - properly typed with Generics
function addItemToParent<T extends BaseMenuItem>(
  items: T[],
  newItem: T,
  parentId: string
): T[] {
  return items.map((item) => {
    if (item.id === parentId) {
      // We need to cast children to T[] because Typescript finds it hard to verify recursion
      const currentChildren = (item.children || []) as T[];
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

function updateItemRecursively<T extends BaseMenuItem>(
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

function deleteItemRecursively<T extends BaseMenuItem>(
  items: T[],
  id: string
): T[] {
  return items.filter((item) => {
    if (item.id === id) {
      return false;
    }
    if (item.children) {
      item.children = deleteItemRecursively(item.children as T[], id);
    }
    return true;
  });
}

function moveItemToNewParent<T extends BaseMenuItem>(
  items: T[],
  itemId: string,
  newParentId: string | null,
  newIndex: number
): T[] {
  // First, find and remove the item
  let itemToMove: T | null = null;
  const itemsWithoutMoved = removeItemRecursively(items, itemId, (item) => {
    itemToMove = item;
  });

  if (!itemToMove) return items;

  // Then add it to the new location
  if (newParentId === null) {
    // Move to root level
    const result = [...itemsWithoutMoved];
    result.splice(newIndex, 0, itemToMove);
    return result;
  } else {
    // Move to specific parent
    return addItemToParentAtIndex(
      itemsWithoutMoved,
      itemToMove,
      newParentId,
      newIndex
    );
  }
}

function removeItemRecursively<T extends BaseMenuItem>(
  items: T[],
  id: string,
  onRemove?: (item: T) => void
): T[] {
  return items.filter((item) => {
    if (item.id === id) {
      if (onRemove) onRemove(item);
      return false;
    }
    if (item.children) {
      item.children = removeItemRecursively(item.children as T[], id, onRemove);
    }
    return true;
  });
}

function addItemToParentAtIndex<T extends BaseMenuItem>(
  items: T[],
  newItem: T,
  parentId: string,
  index: number
): T[] {
  return items.map((item) => {
    if (item.id === parentId) {
      const children = [...((item.children || []) as T[])];
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

function reorderItems<T extends BaseMenuItem>(
  items: T[],
  oldIndex: number,
  newIndex: number,
  parentId?: string
): T[] {
  if (parentId) {
    // Reorder within a specific parent
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
    // Reorder at root level
    const result = [...items];
    const [movedItem] = result.splice(oldIndex, 1);
    result.splice(newIndex, 0, movedItem);
    return result;
  }
}

function getAfterItemId<T extends BaseMenuItem>(
  items: T[],
  parentId: string | null,
  index: number
): string | null {
  if (parentId === null) {
    // Root level - check if there's an item after the given index
    return index < items.length - 1 ? items[index + 1].id : null;
  } else {
    // Find the parent and check its children
    const findAfterItem = (menuItems: T[]): string | null => {
      for (const item of menuItems) {
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

function getMovedItemId<T extends BaseMenuItem>(
  items: T[],
  index: number,
  parentId?: string
): string | null {
  if (parentId) {
    // Find the specific parent and get the item at the index
    const findMovedItem = (menuItems: T[]): string | null => {
      for (const item of menuItems) {
        if (item.id === parentId && item.children) {
          // Cast to T[]
          return (item.children as T[])[index]?.id || null;
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
    // Root level - get the item at the index
    return items[index]?.id || null;
  }
}

// Default store instance for backwards compatibility
export const useMenuEditorStore = createMenuEditorStore();
