import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

import { Handle } from "./Handle.tsx";

import { FlattenedItem, Item } from "./types.ts";
import styles from "./Tree.module.css";
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
  const { ref, handleRef, isDragSource } = useSortable({
    ...config,
    id,
    index,
    disabled: !isMovable,
    data: {
      depth,
      parentId,
    },
  });

  return (
    <li
      ref={ref}
      className={styles.TreeItem}
      style={{
        marginLeft: depth * INDENTATION,
      }}
      aria-hidden={isDragSource}
    >
      <span className={styles.Handle}>
        <Handle ref={handleRef} />
      </span>
      {renderItem ? (
        renderItem(item)
      ) : (
        <>
          {id} {children.length > 0 ? `(${children.length})` : null}
        </>
      )}
      {itemMenu && actions && (
        <div className={styles.Action}>{itemMenu(item, actions)}</div>
      )}
    </li>
  );
}
