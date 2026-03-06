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

type DropPosition = "before" | "after" | "nest" | null;

/**
 * Zone thresholds for drag-and-drop position detection.
 * Items are divided into three zones (top 30% / middle 40% / bottom 30%):
 *   - 0–30%   → "before": reorder the dragged item BEFORE this node
 *   - 30–70%  → "nest": make the dragged item a child of this node
 *   - 70–100% → "after": reorder the dragged item AFTER this node
 */
const NEST_ZONE_START = 0.3;
const NEST_ZONE_END = 0.7;

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

export const TreeNode = <T extends BaseTreeItem>(props: TreeNodeProps<T>) => {
  const {
    label,
    children,
    id,
    parentId,
    index,
    store,
    renderItem,
    canDrag = () => true,
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
  const isSelected = selectedItemId === id;
  const isExpanded = expandedItems.has(id);

  const [{ canDrop, isOver, dropPosition, dragItem }, drop] = useDrop<
    DragItem,
    DropResult,
    {
      canDrop: boolean;
      isOver: boolean;
      dropPosition: DropPosition;
      dragItem: DragItem | null;
    }
  >({
    accept: TREE_ITEM_TYPE,
    drop: (dragItem: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        if (hoverBoundingRect && clientOffset) {
          const height = hoverBoundingRect.bottom - hoverBoundingRect.top;
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          const pct = hoverClientY / height;

          if (dragItem.id !== id) {
            if (pct >= NEST_ZONE_START && pct <= NEST_ZONE_END) {
              // Nest: drop INTO the item
              moveTreeItem(
                dragItem.id,
                id,
                hasChildren ? (children as BaseTreeItem[]).length : 0,
              );
            } else {
              // Reorder: before or after this item
              const dropBefore = pct < 0.5;
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
      let position: DropPosition = null;

      if (
        monitor.isOver({ shallow: true }) &&
        hoverBoundingRect &&
        clientOffset
      ) {
        const height = hoverBoundingRect.bottom - hoverBoundingRect.top;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        const pct = hoverClientY / height;

        if (pct < NEST_ZONE_START) position = "before";
        else if (pct > NEST_ZONE_END) position = "after";
        else position = "nest";
      }

      return {
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        dropPosition: position,
        dragItem: monitor.getItem() as DragItem | null,
      };
    },
    canDrop: (dragItem) => dragItem.id !== id,
  });

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    DropResult,
    { isDragging: boolean }
  >({
    type: TREE_ITEM_TYPE,
    item: () => ({ id, parentId, index, type: TREE_ITEM_TYPE, label }),
    // Delegate drag permission to the canDrag prop so the hook itself controls
    // draggability, rather than conditionally omitting the ref.
    canDrag: () => canDrag(treeItem),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleToggleExpanded = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        toggleExpanded(id);
      }
    },
    [hasChildren, id, toggleExpanded],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedItem(id);
    },
    [id, setSelectedItem],
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
    [id, hasChildren, isExpanded, setSelectedItem, toggleExpanded],
  );

  return (
    <>
      {index === 0 && (
        <DropIndicator
          isActive={isOver && dropPosition === "before"}
          position="before"
          label={dragItem?.label}
        />
      )}
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
          canDrop &&
            isOver &&
            dropPosition === "nest" &&
            "tree-node--drop-target",
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
      <DropIndicator
        isActive={isOver && dropPosition === "after"}
        position="after"
        label={dragItem?.label}
      />
    </>
  );
};

TreeNode.displayName = "TreeNode";
