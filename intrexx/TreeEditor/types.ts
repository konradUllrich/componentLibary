export interface Item {
  id: string;
  children?: Item[];
  collapsed?: boolean;
}

export type FlattenedItem<T extends Item = Item> = T & {
  parentId: string | null;
  depth: number;
  index: number;
};

export type Action<T extends Item = Item> =
  | {
      action: "move";
      menuItemId: string;
      parentId: string;
      afterItemId?: string | null;
      beforeItemId?: string | null;
      order: number;
    }
  | {
      action: "add";
      item: T;
      parentId: string;
      afterItemId?: string | null;
      beforeItemId?: string | null;
      order: number;
    }
  | {
      action: "delete";
      menuItemId: string;
    }
  | {
      action: "update";
      menuItemId: string;
      updates: Partial<T>;
    };
