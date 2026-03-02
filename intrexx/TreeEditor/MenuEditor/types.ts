export type MenuItem = {
  title: string;
  id: string;
  children?: MenuItem[];
};

export interface DragItem {
  type: string;
  id: string;
  parentId?: string;
  index: number;
}

export interface DropResult {
  parentId?: string;
  position?: number;
}
