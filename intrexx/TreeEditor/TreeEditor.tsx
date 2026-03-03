import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import clsx from "clsx";
import { StoreApi, UseBoundStore } from "zustand";
import { BaseTreeItem, TreeEditorState } from "./treeEditorState";
import { TreeNode } from "./TreeNode/TreeNode";
import { TreeDragLayer } from "./TreeNode/TreeDragLayer";
import "./TreeEditor.css";

export interface TreeEditorProps<T extends BaseTreeItem> {
  store: UseBoundStore<StoreApi<TreeEditorState<T>>>;
  renderItem?: (item: T) => React.ReactNode;
  canDrag?: (item: T) => boolean;
  className?: string;
}

export const TreeEditor = <T extends BaseTreeItem>({
  store,
  renderItem,
  canDrag,
  className,
}: TreeEditorProps<T>) => {
  const treeItems = store((state) => state.treeItems);

  return (
    <DndProvider backend={HTML5Backend}>
      <TreeDragLayer />
      <div className={clsx("tree-editor", className)}>
        <ul
          className="tree-editor__tree"
          role="tree"
          aria-label="Tree editor"
        >
          {treeItems.map((item, index) => (
            <li key={item.id} className="tree-editor__root-item">
              <TreeNode
                {...(item as T)}
                index={index}
                isLast={index === treeItems.length - 1}
                level={1}
                setSize={treeItems.length}
                store={store}
                renderItem={renderItem}
                canDrag={canDrag}
              />
            </li>
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

TreeEditor.displayName = "TreeEditor";
