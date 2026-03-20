import {
  forwardRef,
  type ReactNode,
  type ReactElement,
  type Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { isKeyboardEvent } from "@dnd-kit/dom/utilities";
import { move } from "@dnd-kit/helpers";

import { Action, FlattenedItem, type Item } from "./types";
import {
  flattenTree,
  buildTree,
  getProjection,
  getDragDepth,
  getDescendants,
} from "./utilities";
import { TreeItem } from "./TreeItem";
import { TreeItemOverlay } from "./TreeItemOverlay";
import "./TreeEditor.css";

function getSiblingContext<T extends Item>(
  flatItems: FlattenedItem<T>[],
  itemId: string,
  parentId: string | null,
): { afterItemId: string | null; beforeItemId: string | null; order: number } {
  const siblings = flatItems.filter((i) => i.parentId === parentId);
  const sibIdx = siblings.findIndex((i) => i.id === itemId);
  return {
    afterItemId: sibIdx > 0 ? siblings[sibIdx - 1].id : null,
    beforeItemId: sibIdx < siblings.length - 1 ? siblings[sibIdx + 1].id : null,
    order: sibIdx,
  };
}

type SiblingContext = {
  afterItemId: string | null;
  beforeItemId: string | null;
  order: number;
};

export interface ItemMenuActions<T extends Item> {
  erase: () => void;
  addItemAfter: (newItem: Omit<T, "children">) => void;
  addChild: (newItem: Omit<T, "children">) => void;
  moveDown: () => void;
  moveUp: () => void;
}

export interface TreeHandle<T extends Item> {
  addItemAfter: (targetId: string, newItem: Omit<T, "children">) => boolean;
  addChild: (targetId: string, newItem: Omit<T, "children">) => boolean;
  moveUp: (itemId: string) => boolean;
  moveDown: (itemId: string) => boolean;
  erase: (itemId: string) => boolean;
  getItems: () => T[];
}

interface Props<T extends Item> {
  items: T[];
  indentation?: number;
  renderItem?(item: FlattenedItem<T>): ReactNode;
  itemMenu?(item: FlattenedItem<T>, actions: ItemMenuActions<T>): ReactNode;
  canMove?(item: FlattenedItem<T>): boolean;
  canReceiveChildren?(item: FlattenedItem<T>): boolean;
  onChange(items: T[]): void;
  onAction?(action: Action<T>): void;
}

function TreeInner<T extends Item>(
  {
    items,
    indentation = 50,
    renderItem,
    itemMenu,
    canMove,
    canReceiveChildren,
    onChange,
    onAction,
  }: Props<T>,
  ref: Ref<TreeHandle<T>>,
) {
  const [flattenedItems, setFlattenedItems] = useState<FlattenedItem<T>[]>(() =>
    flattenTree(items),
  );
  const initialDepth = useRef(0);
  const sourceChildren = useRef<FlattenedItem<T>[]>([]);
  const dragStartMoveContext = useRef<{
    parentId: string | null;
    siblingContext: SiblingContext;
  } | null>(null);

  useEffect(() => {
    setFlattenedItems(flattenTree(items));
    sourceChildren.current = [];
    dragStartMoveContext.current = null;
  }, [items]);

  const applyFlattenedChanges = (newFlattenedItems: FlattenedItem<T>[]) => {
    const tree = buildTree(newFlattenedItems);
    const newFlat = flattenTree(tree);
    setFlattenedItems(newFlat);
    onChange(tree);
    return { tree, newFlat };
  };

  const eraseById = (itemId: string): boolean => {
    const item = flattenedItems.find((i) => i.id === itemId);

    if (!item) {
      return false;
    }

    const descendants = getDescendants(flattenedItems, item.id);
    const newItems = flattenedItems.filter(
      (i) => i.id !== item.id && !descendants.has(i.id),
    );

    applyFlattenedChanges(newItems);
    onAction?.({ action: "delete", menuItemId: item.id });

    return true;
  };

  const addItemAfterId = (
    targetId: string,
    newItem: Omit<T, "children">,
  ): boolean => {
    const targetItem = flattenedItems.find((i) => i.id === targetId);

    if (!targetItem) {
      return false;
    }

    const newItemWithChildren = {
      ...newItem,
      children: [],
    } as unknown as T;

    const itemIndex = flattenedItems.findIndex((i) => i.id === targetId);
    const newFlattenedItem: FlattenedItem<T> = {
      ...newItemWithChildren,
      parentId: targetItem.parentId,
      depth: targetItem.depth,
      index: targetItem.index + 1,
    };

    const newFlattenedItems = [
      ...flattenedItems.slice(0, itemIndex + 1),
      newFlattenedItem,
      ...flattenedItems.slice(itemIndex + 1),
    ];

    const { newFlat } = applyFlattenedChanges(newFlattenedItems);

    if (onAction) {
      const ctx = getSiblingContext(
        newFlat,
        newItemWithChildren.id,
        newFlattenedItem.parentId,
      );

      onAction({
        action: "add",
        item: newItemWithChildren,
        parentId: newFlattenedItem.parentId ?? "",
        ...ctx,
      });
    }

    return true;
  };

  const addChildById = (
    targetId: string,
    newItem: Omit<T, "children">,
  ): boolean => {
    const targetItem = flattenedItems.find((i) => i.id === targetId);

    if (!targetItem) {
      return false;
    }

    const newItemWithChildren = {
      ...newItem,
      children: [],
    } as unknown as T;

    const itemIndex = flattenedItems.findIndex((i) => i.id === targetId);
    const newFlattenedItem: FlattenedItem<T> = {
      ...newItemWithChildren,
      parentId: targetItem.id,
      depth: targetItem.depth + 1,
      index: 0,
    };

    const newFlattenedItems = [
      ...flattenedItems.slice(0, itemIndex + 1),
      newFlattenedItem,
      ...flattenedItems.slice(itemIndex + 1),
    ];

    const { newFlat } = applyFlattenedChanges(newFlattenedItems);

    if (onAction) {
      const ctx = getSiblingContext(
        newFlat,
        newItemWithChildren.id,
        targetItem.id,
      );

      onAction({
        action: "add",
        item: newItemWithChildren,
        parentId: targetItem.id,
        ...ctx,
      });
    }

    return true;
  };

  const moveSibling = (itemId: string, direction: "up" | "down"): boolean => {
    const itemIndex = flattenedItems.findIndex((i) => i.id === itemId);

    if (itemIndex === -1) {
      return false;
    }

    const targetIndex = direction === "down" ? itemIndex + 1 : itemIndex - 1;

    if (targetIndex < 0 || targetIndex >= flattenedItems.length) {
      return false;
    }

    const item = flattenedItems[itemIndex];
    const sibling = flattenedItems[targetIndex];
    const oldCtx = getSiblingContext(flattenedItems, item.id, item.parentId);

    // Only swap siblings at the same level.
    if (
      !sibling ||
      sibling.depth !== item.depth ||
      sibling.parentId !== item.parentId
    ) {
      return false;
    }

    const newFlattenedItems = [...flattenedItems];
    [newFlattenedItems[itemIndex], newFlattenedItems[targetIndex]] = [
      newFlattenedItems[targetIndex],
      newFlattenedItems[itemIndex],
    ];

    const { newFlat } = applyFlattenedChanges(newFlattenedItems);

    if (onAction) {
      const ctx = getSiblingContext(newFlat, item.id, item.parentId);

      onAction({
        action: "move",
        menuItemId: item.id,
        parentId: item.parentId ?? "",
        oldParentId: item.parentId ?? "",
        oldAfterItemId: oldCtx.afterItemId,
        oldBeforeItemId: oldCtx.beforeItemId,
        oldOrder: oldCtx.order,
        ...ctx,
      });
    }

    return true;
  };

  useImperativeHandle(ref, () => ({
    addItemAfter: addItemAfterId,
    addChild: addChildById,
    moveUp: (itemId) => moveSibling(itemId, "up"),
    moveDown: (itemId) => moveSibling(itemId, "down"),
    erase: eraseById,
    getItems: () => buildTree(flattenedItems),
  }));

  return (
    <DragDropProvider
      onDragStart={(event) => {
        const { source } = event.operation;

        if (!source) return;

        const sourceItem = flattenedItems.find(({ id }) => id === source.id);

        if (!sourceItem) return;

        const { depth } = sourceItem;

        dragStartMoveContext.current = {
          parentId: sourceItem.parentId,
          siblingContext: getSiblingContext(
            flattenedItems,
            sourceItem.id,
            sourceItem.parentId,
          ),
        };

        // Store the source item's initial depth for later use
        initialDepth.current = depth;

        setFlattenedItems((flattenedItems) => {
          sourceChildren.current = [];

          // Get all descendants of the source item
          const descendants = getDescendants(flattenedItems, source.id);

          return flattenedItems.filter((item) => {
            if (descendants.has(item.id)) {
              sourceChildren.current = [...sourceChildren.current, item];
              return false;
            }

            return true;
          });
        });

        initialDepth.current = depth;
      }}
      onDragOver={(event, manager) => {
        const { source, target } = event.operation;

        event.preventDefault();

        if (source && target && source.id !== target.id) {
          setFlattenedItems((flattenedItems) => {
            const offsetLeft = manager.dragOperation.transform.x;
            const dragDepth = getDragDepth(offsetLeft, indentation);
            const projectedDepth = initialDepth.current + dragDepth;

            const { depth, parentId } = getProjection(
              flattenedItems,
              target.id,
              projectedDepth,
              canReceiveChildren,
            );

            const sortedItems = move(flattenedItems, event);
            const newItems = sortedItems.map((item) =>
              item.id === source.id ? { ...item, depth, parentId } : item,
            );

            return newItems;
          });
        }
      }}
      onDragMove={(event, manager) => {
        if (event.defaultPrevented) {
          return;
        }

        const { source, target } = event.operation;

        if (source && target) {
          const keyboard = isKeyboardEvent(event.operation.activatorEvent);
          const currentDepth = source.data!.depth ?? 0;
          let keyboardDepth;

          if (keyboard) {
            const isHorizontal = event.by?.x !== 0 && event.by?.y === 0;

            if (isHorizontal) {
              event.preventDefault();

              keyboardDepth = currentDepth + Math.sign(event.by!.x);
            }
          }

          const offsetLeft = manager.dragOperation.transform.x;
          const dragDepth = getDragDepth(offsetLeft, indentation);

          const projectedDepth =
            keyboardDepth ?? initialDepth.current + dragDepth;

          const { depth, parentId } = getProjection(
            flattenedItems,
            source.id,
            projectedDepth,
            canReceiveChildren,
          );

          if (keyboard) {
            if (currentDepth !== depth) {
              const offset = indentation * (depth - currentDepth);

              manager.actions.move({
                by: { x: offset, y: 0 },
                propagate: false,
              });
            }
          }

          if (
            source.data!.depth !== depth ||
            source.data!.parentId !== parentId
          ) {
            setFlattenedItems((flattenedItems) => {
              return flattenedItems.map((item) =>
                item.id === source.id ? { ...item, depth, parentId } : item,
              );
            });
          }
        }
      }}
      onDragEnd={(event) => {
        if (event.canceled) {
          dragStartMoveContext.current = null;
          return setFlattenedItems(flattenTree(items));
        }

        const updatedTree = buildTree([
          ...flattenedItems,
          ...sourceChildren.current,
        ]);

        const newFlat = flattenTree(updatedTree);
        setFlattenedItems(newFlat);
        onChange(updatedTree);

        if (onAction) {
          const sourceId = String(event.operation.source!.id);
          const movedItem = newFlat.find((i) => i.id === sourceId);
          if (movedItem) {
            const oldCtx = dragStartMoveContext.current;
            const ctx = getSiblingContext(
              newFlat,
              sourceId,
              movedItem.parentId,
            );
            onAction({
              action: "move",
              menuItemId: sourceId,
              parentId: movedItem.parentId ?? "",
              oldParentId: oldCtx?.parentId ?? "",
              oldAfterItemId: oldCtx?.siblingContext.afterItemId ?? null,
              oldBeforeItemId: oldCtx?.siblingContext.beforeItemId ?? null,
              oldOrder: oldCtx?.siblingContext.order ?? ctx.order,
              ...ctx,
            });
          }
        }

        dragStartMoveContext.current = null;
      }}
    >
      <ul className="sortable-tree">
        {flattenedItems.map((item, index) => {
          const actions: ItemMenuActions<T> = {
            erase: () => {
              eraseById(item.id);
            },
            addItemAfter: (newItem) => {
              addItemAfterId(item.id, newItem);
            },
            addChild: (newItem) => {
              addChildById(item.id, newItem);
            },
            moveDown: () => {
              moveSibling(item.id, "down");
            },
            moveUp: () => {
              moveSibling(item.id, "up");
            },
          };

          return (
            <TreeItem
              key={item.id}
              {...item}
              index={index}
              renderItem={renderItem}
              itemMenu={itemMenu}
              actions={actions}
              canMove={canMove}
            />
          );
        })}
      </ul>
      <DragOverlay style={{ width: "min-content" }}>
        {(source) => (
          <TreeItemOverlay
            id={source.id}
            count={sourceChildren.current.length}
          />
        )}
      </DragOverlay>
    </DragDropProvider>
  );
}

type TreeComponent = <T extends Item>(
  props: Props<T> & { ref?: Ref<TreeHandle<T>> },
) => ReactElement;

export const Tree = forwardRef(TreeInner) as TreeComponent;
