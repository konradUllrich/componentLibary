import { UniqueIdentifier } from "@dnd-kit/abstract";

import type { Item, FlattenedItem } from "./types.ts";

export function flattenTree<T extends Item>(
  items: T[],
  parentId: string | null = null,
  depth = 0,
): FlattenedItem<T>[] {
  return items.reduce<FlattenedItem<T>[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flattenTree(item.children as T[], item.id, depth + 1),
    ];
  }, []);
}

export function buildTree<T extends Item>(
  flattenedItems: FlattenedItem<T>[],
): T[] {
  const root = { id: "root", children: [] } as unknown as T;
  const nodes: Record<string, T> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const { id, children } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? items.find(({ id }) => id === parentId);

    if (!parent || !parent.children) continue;

    nodes[id] = { ...item, children } as unknown as T;
    parent.children.push(item as unknown as T);
  }

  return root.children as T[];
}

export function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export function getProjection<T extends Item>(
  items: FlattenedItem<T>[],
  targetId: UniqueIdentifier,
  projectedDepth: number,
  canReceiveChildren?: (item: FlattenedItem<T>) => boolean,
) {
  const targetItemIndex = items.findIndex(({ id }) => id === targetId);
  const previousItem = items[targetItemIndex - 1];
  const targetItem = items[targetItemIndex];
  const nextItem = items[targetItemIndex + 1];
  const maxDepth = getMaxDepth(targetItem, previousItem, canReceiveChildren);
  const minDepth = getMinDepth(nextItem);
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = items
      .slice(0, targetItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

function getMaxDepth<T extends Item>(
  targetItem: FlattenedItem<T>,
  previousItem: FlattenedItem<T> | undefined,
  canReceiveChildren?: (item: FlattenedItem<T>) => boolean,
) {
  if (!previousItem) return 0;

  // If previousItem can't receive children, don't allow item to become its child
  if (canReceiveChildren && !canReceiveChildren(previousItem)) {
    return previousItem.depth;
  }

  return Math.min(targetItem.depth + 1, previousItem.depth + 1);
}

function getMinDepth<T extends Item>(nextItem: FlattenedItem<T>) {
  return nextItem ? nextItem.depth : 0;
}

export function getDescendants<T extends Item>(
  items: FlattenedItem<T>[],
  parentId: UniqueIdentifier,
): Set<UniqueIdentifier> {
  const directChildren = items.filter((item) => item.parentId === parentId);

  return directChildren.reduce((descendants, child) => {
    return new Set([
      ...descendants,
      child.id,
      ...getDescendants(items, child.id),
    ]);
  }, new Set<UniqueIdentifier>());
}
