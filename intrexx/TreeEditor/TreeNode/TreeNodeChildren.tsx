import React from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { BaseTreeItem, TreeEditorState } from "../treeEditorState";
import { TreeNode } from "./TreeNode";

interface TreeNodeChildrenProps<T extends BaseTreeItem> {
  children: T[];
  parentId: string;
  level: number;
  store: UseBoundStore<StoreApi<TreeEditorState<T>>>;
  renderItem?: (item: T) => React.ReactNode;
  canDrag?: (item: T) => boolean;
}

export const TreeNodeChildren = <T extends BaseTreeItem>({
  children,
  parentId,
  level,
  store,
  renderItem,
  canDrag,
}: TreeNodeChildrenProps<T>) => {
  return (
    <ul className="tree-node__children" role="group">
      {children.map((child, idx) => (
        <li key={child.id} className="tree-node__child-item">
          <TreeNode
            {...(child as T)}
            parentId={parentId}
            index={idx}
            isLast={idx === children.length - 1}
            level={level}
            setSize={children.length}
            store={store}
            renderItem={renderItem}
            canDrag={canDrag}
          />
        </li>
      ))}
    </ul>
  );
};

TreeNodeChildren.displayName = "TreeNodeChildren";
