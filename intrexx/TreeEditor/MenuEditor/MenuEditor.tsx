import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { MenuEditorItem } from "./MenuItem/MenuEditorItem";
import "./menuEditor.css";
import {
  useMenuEditorStore,
  BaseMenuItem,
  MenuEditorState,
} from "./menuEditorState";
import { StoreApi, UseBoundStore } from "zustand";

interface MenuEditorProps<T extends BaseMenuItem> {
  store: UseBoundStore<StoreApi<MenuEditorState<T>>>;
  renderItem?: (item: T) => React.ReactNode;
  canDrag?: (item: T) => boolean;
}

const MenuEditor = <T extends BaseMenuItem>({
  store,
  renderItem,
  canDrag,
}: MenuEditorProps<T>) => {
  // Use provided store or default store
  // We need to cast the store to any because Typescript struggles with the optional generic store
  // and the specific default store

  // We know the structure of the state even if we had to cast the store
  const menuItems = store((state) => state.menuItems);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="menu-editor">
        <div className="menu-editor__tree">
          {menuItems.map((menu, index) => (
            <MenuEditorItem
              isLast={index === menuItems.length - 1}
              renderItem={renderItem as any}
              key={menu.id}
              {...menu}
              index={index}
              store={store}
              canDrag={canDrag}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default MenuEditor;
