import { useRef } from "react";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { DragItem, DropResult } from "../types";
import {
  useMenuEditorStore,
  BaseMenuItem,
  MenuEditorState,
} from "../menuEditorState";
import { StoreApi, UseBoundStore } from "zustand";

import { MenuItemContent } from "./MenuItemContent";
import DropZone from "./Dropzone";

export type MenuEditorItemProps<T extends BaseMenuItem> = {
  parentId?: string;
  index: number;
  isLast?: boolean;
  store?: UseBoundStore<StoreApi<MenuEditorState<T>>>;
  renderItem?: (item: T) => React.ReactNode;
  canDrag?: (item: T) => boolean;
} & T;

export const MenuEditorItem = <T extends BaseMenuItem>(
  props: MenuEditorItemProps<T>
) => {
  const {
    title,
    children,
    id,
    parentId,
    index,
    store,
    renderItem,
    canDrag = () => true,
    isLast,
    ...rest
  } = props;

  const menuitem = { ...rest, title, children, id, parentId } as unknown as T;

  // Use provided store or default store
  const currentStore = (store ||
    (useMenuEditorStore as unknown as UseBoundStore<
      StoreApi<MenuEditorState<T>>
    >));

  const moveMenuItem = currentStore((state) => state.moveMenuItem);
  const reorderMenuItems = currentStore((state) => state.reorderMenuItems);
  const selectedItemId = currentStore((state) => state.selectedItemId);
  const setSelectedItem = currentStore((state) => state.setSelectedItem);
  const expandedItems = currentStore((state) => state.expandedItems);
  const toggleExpanded = currentStore((state) => state.toggleExpanded);

  const hasChildren = children && children.length > 0;
  const ref = useRef<HTMLDivElement>(null);
  const isSelected = selectedItemId === id;
  const isExpanded = expandedItems.has(id);

  const [{ canDrop, isOver, dropPosition }, drop] = useDrop<
    DragItem,
    DropResult,
    {
      canDrop: boolean;
      isOver: boolean;
      dropPosition: "before" | "after" | null;
    }
  >({
    accept: "MENU_ITEM",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop()) {
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        if (hoverBoundingRect && clientOffset) {
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (item.id !== id) {
            // If dropping on a container type and in the center area, make it a child
            if (
              hoverClientY > hoverMiddleY * 0.3 &&
              hoverClientY < hoverMiddleY * 1.7
            ) {
              moveMenuItem(item.id, id, hasChildren ? children!.length : 0);
            } else {
              // Otherwise, position relative to this item
              const dropBefore = hoverClientY < hoverMiddleY;
              if (item.parentId === parentId) {
                // Reordering within same parent
                const dragIndex = item.index;
                const targetIndex = dropBefore ? index : index + 1;
                if (dragIndex !== targetIndex) {
                  reorderMenuItems(dragIndex, targetIndex, parentId);
                }
              } else {
                // Moving to different parent - drop before/after
                if (dropBefore) {
                  moveMenuItem(item.id, parentId || null, index);
                } else {
                  moveMenuItem(item.id, parentId || null, index + 1);
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
    canDrop: (item) => item.id !== id, // Can't drop item on itself
  });

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    DropResult,
    { isDragging: boolean }
  >({
    type: "MENU_ITEM",
    item: () => ({ id, parentId, index, type: "MENU_ITEM" }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Create separate refs for drop zones
  const dropBetweenRef = useRef<HTMLDivElement>(null);
  const dropUnderRef = useRef<HTMLDivElement>(null);

  const [{ isOverBetween }, dropBetween] = useDrop<
    DragItem,
    DropResult,
    { isOverBetween: boolean }
  >({
    accept: "MENU_ITEM",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop() && item.id !== id) {
        if (item.parentId === parentId) {
          // Reordering within same parent
          const dragIndex = item.index;
          if (dragIndex !== index) {
            reorderMenuItems(dragIndex, index, parentId);
          }
        } else {
          // Moving to different parent
          moveMenuItem(item.id, parentId || null, index);
        }
      }
      return { parentId };
    },
    collect: (monitor) => ({
      isOverBetween: monitor.isOver({ shallow: true }),
    }),
    canDrop: (item) => item.id !== id,
  });

  const [{ isUnderLast }, dropUnder] = useDrop<
    DragItem,
    DropResult,
    { isUnderLast: boolean }
  >({
    accept: "MENU_ITEM",
    drop: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.didDrop() && item.id !== id) {
        if (item.parentId === parentId) {
          // Reordering within same parent
          const dragIndex = item.index;
          if (dragIndex !== index) {
            reorderMenuItems(dragIndex, index, parentId);
          }
        } else {
          // Moving to different parent
          moveMenuItem(item.id, parentId || null, index);
        }
      }
      return { parentId };
    },
    collect: (monitor) => ({
      isUnderLast: monitor.isOver({ shallow: true }),
    }),
    canDrop: (item) => item.id !== id,
  });

  dropBetween(dropBetweenRef);
  drag(drop(ref));
  dropUnder(dropUnderRef);

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleExpanded(id);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItem(id);
  };

  return (
    <>
      <DropZone isOver={isOverBetween} ref={dropBetweenRef} />

      <div
        ref={canDrag(menuitem) ? ref : null}
        data-id={id}
        className={`menu-editor-item ${
          isDragging ? "menu-editor-item--dragging" : ""
        } ${isSelected ? "menu-editor-item--selected" : ""} ${
          canDrop && isOver ? "menu-editor-item--drop-target" : ""
        } ${dropPosition === "before" ? "menu-editor-item--drop-before" : ""} ${
          dropPosition === "after" ? "menu-editor-item--drop-after" : ""
        }`}
        onClick={handleClick}
        style={{
          opacity: isDragging ? 0.5 : 1,
          position: "relative",
        }}
      >
        <MenuItemContent
          item={menuitem}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          handleToggleExpanded={handleToggleExpanded}
          renderItem={renderItem}
        />

        {hasChildren && isExpanded && (
          <ul className="menu-editor-item__children">
            {children!.map((child, childIndex) => (
              <li key={child.id} className="menu-editor-item__child">
                <MenuEditorItem
                  isLast={childIndex === children.length - 1}
                  {...(child as T)}
                  parentId={id}
                  index={childIndex}
                  store={currentStore}
                  renderItem={renderItem}
                  canDrag={canDrag}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {isLast && <DropZone isOver={isUnderLast} ref={dropUnderRef} />}
    </>
  );
};
