import { type ReactNode, useRef, useState } from "react";
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
    beforeItemId:
      sibIdx < siblings.length - 1 ? siblings[sibIdx + 1].id : null,
    order: sibIdx,
  };
}

export interface ItemMenuActions<T extends Item> {
  erase: () => void;
  addItemAfter: (newItem: Omit<T, "children">) => void;
  addChild: (newItem: Omit<T, "children">) => void;
  moveDown: () => void;
  moveUp: () => void;
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

export function Tree<T extends Item>({
  items,
  indentation = 50,
  renderItem,
  itemMenu,
  canMove,
  canReceiveChildren,
  onChange,
  onAction,
}: Props<T>) {
  const [flattenedItems, setFlattenedItems] = useState<FlattenedItem<T>[]>(() =>
    flattenTree(items),
  );
  const initialDepth = useRef(0);
  const sourceChildren = useRef<FlattenedItem<T>[]>([]);

  return (
    <DragDropProvider
      onDragStart={(event) => {
        const { source } = event.operation;

        if (!source) return;

        const { depth } = flattenedItems.find(({ id }) => id === source.id)!;

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
            const ctx = getSiblingContext(newFlat, sourceId, movedItem.parentId);
            onAction({
              action: "move",
              menuItemId: sourceId,
              parentId: movedItem.parentId ?? "",
              ...ctx,
            });
          }
        }
      }}
    >
      <ul className="sortable-tree">
        {flattenedItems.map((item, index) => {
          const actions: ItemMenuActions<T> = {
            erase: () => {
              const descendants = getDescendants(flattenedItems, item.id);
              const newItems = flattenedItems.filter(
                (i) => i.id !== item.id && !descendants.has(i.id),
              );
              const tree = buildTree(newItems);
              setFlattenedItems(flattenTree(tree));
              onChange(tree);
              onAction?.({ action: "delete", menuItemId: item.id });
            },
            addItemAfter: (newItem) => {
              const newItemWithChildren = {
                ...newItem,
                children: [],
              } as unknown as T;
              const itemIndex = flattenedItems.findIndex(
                (i) => i.id === item.id,
              );
              const newFlattenedItem: FlattenedItem<T> = {
                ...newItemWithChildren,
                parentId: item.parentId,
                depth: item.depth,
                index: item.index + 1,
              };
              const newFlattenedItems = [
                ...flattenedItems.slice(0, itemIndex + 1),
                newFlattenedItem,
                ...flattenedItems.slice(itemIndex + 1),
              ];
              const tree = buildTree(newFlattenedItems);
              const newFlat = flattenTree(tree);
              setFlattenedItems(newFlat);
              onChange(tree);

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
            },
            addChild: (newItem) => {
              const newItemWithChildren = {
                ...newItem,
                children: [],
              } as unknown as T;
              const itemIndex = flattenedItems.findIndex(
                (i) => i.id === item.id,
              );
              const newFlattenedItem: FlattenedItem<T> = {
                ...newItemWithChildren,
                parentId: item.id,
                depth: item.depth + 1,
                index: 0,
              };
              const newFlattenedItems = [
                ...flattenedItems.slice(0, itemIndex + 1),
                newFlattenedItem,
                ...flattenedItems.slice(itemIndex + 1),
              ];
              const tree = buildTree(newFlattenedItems);
              const newFlat = flattenTree(tree);
              setFlattenedItems(newFlat);
              onChange(tree);

              if (onAction) {
                const ctx = getSiblingContext(
                  newFlat,
                  newItemWithChildren.id,
                  item.id,
                );
                onAction({
                  action: "add",
                  item: newItemWithChildren,
                  parentId: item.id,
                  ...ctx,
                });
              }
            },
            moveDown: () => {
              const itemIndex = flattenedItems.findIndex(
                (i) => i.id === item.id,
              );
              if (itemIndex >= flattenedItems.length - 1) return;

              const nextItem = flattenedItems[itemIndex + 1];
              // Only swap if next item is at same level (same depth and parent)
              if (
                nextItem &&
                nextItem.depth === item.depth &&
                nextItem.parentId === item.parentId
              ) {
                const newFlattenedItems = [...flattenedItems];
                [
                  newFlattenedItems[itemIndex],
                  newFlattenedItems[itemIndex + 1],
                ] = [
                  newFlattenedItems[itemIndex + 1],
                  newFlattenedItems[itemIndex],
                ];
                const tree = buildTree(newFlattenedItems);
                const newFlat = flattenTree(tree);
                setFlattenedItems(newFlat);
                onChange(tree);

                if (onAction) {
                  const ctx = getSiblingContext(newFlat, item.id, item.parentId);
                  onAction({
                    action: "move",
                    menuItemId: item.id,
                    parentId: item.parentId ?? "",
                    ...ctx,
                  });
                }
              }
            },
            moveUp: () => {
              const itemIndex = flattenedItems.findIndex(
                (i) => i.id === item.id,
              );
              if (itemIndex <= 0) return;

              const prevItem = flattenedItems[itemIndex - 1];
              // Only swap if previous item is at same level (same depth and parent)
              if (
                prevItem &&
                prevItem.depth === item.depth &&
                prevItem.parentId === item.parentId
              ) {
                const newFlattenedItems = [...flattenedItems];
                [
                  newFlattenedItems[itemIndex - 1],
                  newFlattenedItems[itemIndex],
                ] = [
                  newFlattenedItems[itemIndex],
                  newFlattenedItems[itemIndex - 1],
                ];
                const tree = buildTree(newFlattenedItems);
                const newFlat = flattenTree(tree);
                setFlattenedItems(newFlat);
                onChange(tree);

                if (onAction) {
                  const ctx = getSiblingContext(newFlat, item.id, item.parentId);
                  onAction({
                    action: "move",
                    menuItemId: item.id,
                    parentId: item.parentId ?? "",
                    ...ctx,
                  });
                }
              }
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
