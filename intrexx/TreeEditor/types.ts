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
