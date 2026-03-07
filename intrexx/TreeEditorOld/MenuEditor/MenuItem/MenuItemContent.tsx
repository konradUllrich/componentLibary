import { MouseEventHandler, ReactNode } from "react";

import { BaseMenuItem } from "../menuEditorState";

type MenuItemContentProps<T extends BaseMenuItem> = {
  item: T;
  isExpanded: boolean;
  hasChildren?: boolean;
  handleToggleExpanded: MouseEventHandler<HTMLButtonElement>;
  renderItem?: (item: T) => ReactNode;
};

export const MenuItemContent = <T extends BaseMenuItem>(
  props: MenuItemContentProps<T>
) => {
  const { hasChildren, handleToggleExpanded, isExpanded, item, renderItem } =
    props;
  const { title, children } = item;
  return (
    <div className="menu-editor-item__content">
      {hasChildren && (
        <button
          className="menu-editor-item__expand-button"
          onClick={handleToggleExpanded}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "8px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          {isExpanded ? "▼" : "▶"}
        </button>
      )}
      <span className="menu-editor-item__name">{title}</span>
      {hasChildren && (
        <span className="menu-editor-item__count">({children!.length})</span>
      )}

      {renderItem ? renderItem(item) : null}
    </div>
  );
};
