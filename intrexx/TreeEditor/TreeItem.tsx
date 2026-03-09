import { type ReactNode, useEffect } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

import { Handle } from "./Handle.tsx";

import { FlattenedItem, Item } from "./types.ts";
import "./TreeEditor.css";
import type { ItemMenuActions } from "./Tree.tsx";

export type Props<T extends Item> = FlattenedItem<T> & {
  toggleOpen?(id: string): void;
  renderItem?(item: FlattenedItem<T>): ReactNode;
  itemMenu?(item: FlattenedItem<T>, actions: ItemMenuActions<T>): ReactNode;
  actions?: ItemMenuActions<T>;
  canMove?(item: FlattenedItem<T>): boolean;
};

const INDENTATION = 50;

const config = {
  alignment: {
    x: "start",
    y: "center",
  },
  transition: {
    idle: true,
  },
} as const;

export function TreeItem<T extends Item>({
  collapsed,
  depth,
  children,
  id,
  index,
  parentId,
  renderItem,
  itemMenu,
  actions,
  canMove,
  ...rest
}: Props<T>) {
  const item = {
    id,
    children,
    collapsed,
    parentId,
    depth,
    index,
    ...rest,
  } as FlattenedItem<T>;
  const isMovable = canMove ? canMove(item) : true;
  const { ref, handleRef, isDragSource, sortable } = useSortable({
    ...config,
    id,
    index,
    disabled: !isMovable,
    data: {
      depth,
      parentId,
    },
  });

  // `useSortable`'s `disabled` prop disables both the drag source *and* the
  // drop target for the item.  Non-moveable items should remain valid drop
  // targets so that moveable items can still be sorted past them.
  // `isMovable` is intentionally included in the deps: when it changes,
  // useSortable re-disables the droppable and we must undo that immediately.
  useEffect(() => {
    sortable.droppable.disabled = false;
  }, [sortable, isMovable]);

  return (
    <li
      ref={ref}
      className="sortable-tree__item"
      style={{
        marginLeft: depth * INDENTATION,
      }}
      aria-hidden={isDragSource}
    >
      <span className="sortable-tree__handle">
        <Handle ref={handleRef} />
      </span>
      {renderItem ? (
        renderItem(item)
      ) : (
        <>
          {id} {children && children.length > 0 ? `(${children.length})` : null}
        </>
      )}
      {itemMenu && actions && (
        <div className="sortable-tree__action">{itemMenu(item, actions)}</div>
      )}
    </li>
  );
}
