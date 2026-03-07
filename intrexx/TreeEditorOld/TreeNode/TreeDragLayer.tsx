import React from "react";
import { useDragLayer } from "react-dnd";

export const TreeDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as { label?: string } | null,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const { x, y } = currentOffset;

  return (
    <div className="tree-drag-layer" aria-hidden="true">
      <div
        className="tree-drag-layer__preview"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        {item?.label ?? "Item"}
      </div>
    </div>
  );
};

TreeDragLayer.displayName = "TreeDragLayer";
