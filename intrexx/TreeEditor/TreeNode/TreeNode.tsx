import React, { useRef, useCallback } from "react";
import clsx from "clsx";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { StoreApi, UseBoundStore } from "zustand";
import {
  BaseTreeItem,
  TreeEditorState,
  DragItem,
  DropResult,
  TREE_ITEM_TYPE,
  useTreeEditorStore,
} from "../treeEditorState";
import { DropIndicator } from "./DropIndicator";
import { TreeNodeChildren } from "./TreeNodeChildren";

export type TreeNodeProps<T extends BaseTreeItem> = {
  parentId?: string;
  index: number;
  isLast?: boolean;
  level?: number;
  setSize?: number;
  store?: UseBoundStore<StoreApi<TreeEditorState<T>>>;
  renderItem?: (item: T) => React.ReactNode;
  canDrag?: (item: T) => boolean;
} & T;

export const TreeNode = <T extends BaseTreeItem>(
  props: TreeNodeProps<T>
) => {
  const {
    label,
    children,
    id,
    parentId,
    index,
    store,
    renderItem,
    canDrag = () => true,
    isLast,
    level = 1,
    setSize = 1,
    ...rest
  } = props;

  // Reconstruct the full item from spread props.
  // The `as unknown as T` cast is required because TypeScript cannot verify that
  // spreading a generic rest + explicitly listed props satisfies T's full shape,
  // even though conceptually they are identical. This mirrors the MenuEditorItem pattern.
  const treeItem = { ...rest, label, children, id, parentId } as unknown as T;

  const defaultStore = useTreeEditorStore as unknown as UseBoundStore<
    StoreApi<TreeEditorState<T>>
  >;
  const currentStore = store ?? defaultStore;

  const moveTreeItem = currentStore((state) => state.moveTreeItem);
  const reorderTreeItems = currentStore((state) => state.reorderTreeItems);
  const selectedItemId = currentStore((state) => state.selectedItemId);
  const setSelectedItem = currentStore((state) => state.setSelectedItem);
  const expandedItems = currentStore((state) => state.expandedItems);
  const toggleExpanded = currentStore((state) => state.toggleExpanded);

  const hasChildren = Array.isArray(children) && children.length > 0;
  const ref = useRef<HTMLDivElement>(null);
  const dropBetweenRef = useRef<HTMLDivElement>(null);
  const dropUnderRef = useRef<HTMLDivElement>(null);
  const isSelected = selectedItemId === id;
  const isExpanded = expandedItems.has(id);

  const [{ canDrop, isOver, dropPosition }, drop] = useDrop<
    DragItem,
    DropResult,
    { canDrop: boolean; isOver: boolean; dropPosition: "before" | "after" | null }
  >({
    accept: TREE_ITEM_TYPE,
    drop: (dragItem: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        if (hoverBoundingRect && clientOffset) {
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (dragItem.id !== id) {
            if (
              hoverClientY > hoverMiddleY * 0.3 &&
              hoverClientY < hoverMiddleY * 1.7
            ) {
              moveTreeItem(
                dragItem.id,
                id,
                hasChildren ? (children as BaseTreeItem[]).length : 0
              );
            } else {
              const dropBefore = hoverClientY < hoverMiddleY;
              if (dragItem.parentId === parentId) {
                const dragIndex = dragItem.index;
                const targetIndex = dropBefore ? index : index + 1;
                if (dragIndex !== targetIndex) {
                  reorderTreeItems(dragIndex, targetIndex, parentId);
                }
              } else {
                if (dropBefore) {
                  moveTreeItem(dragItem.id, parentId ?? null, index);
                } else {
                  moveTreeItem(dragItem.id, parentId ?? null, index + 1);
                }
              }
            }
          }
        }
      }
      return { parentId: id };
    },
    collect: (monitor) => {
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      let position: "before" | "after" | null = null;

      if (
        monitor.isOver({ shallow: true }) &&
        hoverBoundingRect &&
        clientOffset
      ) {
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        position = hoverClientY < hoverMiddleY ? "before" : "after";
      }

      return {
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        dropPosition: position,
      };
    },
    canDrop: (dragItem) => dragItem.id !== id,
  });

  const [{ isDragging }, drag] = useDrag<DragItem, DropResult, { isDragging: boolean }>({
    type: TREE_ITEM_TYPE,
    item: () => ({ id, parentId, index, type: TREE_ITEM_TYPE, label }),
    // Delegate drag permission to the canDrag prop so the hook itself controls
    // draggability, rather than conditionally omitting the ref.
    canDrag: () => canDrag(treeItem),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOverBetween }, dropBetween] = useDrop<
    DragItem,
    DropResult,
    { isOverBetween: boolean }
  >({
    accept: TREE_ITEM_TYPE,
    drop: (dragItem: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop() && dragItem.id !== id) {
        if (dragItem.parentId === parentId) {
          const dragIndex = dragItem.index;
          if (dragIndex !== index) {
            reorderTreeItems(dragIndex, index, parentId);
          }
        } else {
          moveTreeItem(dragItem.id, parentId ?? null, index);
        }
      }
      return { parentId };
    },
    collect: (monitor) => ({
      isOverBetween: monitor.isOver({ shallow: true }),
    }),
    canDrop: (dragItem) => dragItem.id !== id,
  });

  const [{ isUnderLast }, dropUnder] = useDrop<
    DragItem,
    DropResult,
    { isUnderLast: boolean }
  >({
    accept: TREE_ITEM_TYPE,
    drop: (dragItem: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop() && dragItem.id !== id) {
        if (dragItem.parentId === parentId) {
          const dragIndex = dragItem.index;
          if (dragIndex !== index) {
            reorderTreeItems(dragIndex, index, parentId);
          }
        } else {
          moveTreeItem(dragItem.id, parentId ?? null, index);
        }
      }
      return { parentId };
    },
    collect: (monitor) => ({
      isUnderLast: monitor.isOver({ shallow: true }),
    }),
    canDrop: (dragItem) => dragItem.id !== id,
  });

  dropBetween(dropBetweenRef);
  drag(drop(ref));
  dropUnder(dropUnderRef);

  const handleToggleExpanded = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        toggleExpanded(id);
      }
    },
    [hasChildren, id, toggleExpanded]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedItem(id);
    },
    [id, setSelectedItem]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          setSelectedItem(id);
          break;
        case " ":
          e.preventDefault();
          if (hasChildren) toggleExpanded(id);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (hasChildren && !isExpanded) toggleExpanded(id);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (isExpanded) toggleExpanded(id);
          break;
        default:
          break;
      }
    },
    [id, hasChildren, isExpanded, setSelectedItem, toggleExpanded]
  );

  return (
    <>
      <DropIndicator isActive={isOverBetween} position="before" />
      <div
        ref={ref}
        data-id={id}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-level={level}
        aria-setsize={setSize}
        aria-posinset={index + 1}
        tabIndex={isSelected ? 0 : -1}
        className={clsx(
          "tree-node",
          isDragging && "tree-node--dragging",
          isSelected && "tree-node--selected",
          canDrop && isOver && "tree-node--drop-target",
          dropPosition === "before" && "tree-node--drop-before",
          dropPosition === "after" && "tree-node--drop-after"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="tree-node__content">
          {hasChildren ? (
            // Per WAI-ARIA tree widget pattern, expand/collapse is handled via
            // keyboard events on the treeitem itself (Space, ArrowRight, ArrowLeft).
            // The toggle button is click-only and hidden from tab order to avoid
            // duplicate focus stops. Screen readers access it through the treeitem.
            <button
              type="button"
              className="tree-node__toggle"
              aria-label={isExpanded ? "Collapse" : "Expand"}
              onClick={handleToggleExpanded}
              tabIndex={-1}
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          ) : (
            <span className="tree-node__spacer" aria-hidden="true" />
          )}

          <span className="tree-node__label">
            {renderItem ? renderItem(treeItem) : label}
          </span>

          {hasChildren && (
            <span className="tree-node__count" aria-hidden="true">
              {(children as BaseTreeItem[]).length}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <TreeNodeChildren
            children={children as T[]}
            parentId={id}
            level={level + 1}
            store={currentStore}
            renderItem={renderItem}
            canDrag={canDrag}
          />
        )}
      </div>
      {isLast && (
        <DropIndicator isActive={isUnderLast} position="after" />
      )}
      <div ref={dropUnderRef} className="tree-node__drop-sink" aria-hidden="true" />
    </>
  );
};

TreeNode.displayName = "TreeNode";
