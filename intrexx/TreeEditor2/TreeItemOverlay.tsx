import type { UniqueIdentifier } from "@dnd-kit/abstract";

import { Handle } from "./Handle.tsx";
import "./TreeEditor2.css";

interface Props {
  id: UniqueIdentifier;
  count: number;
}

export function TreeItemOverlay({ id, count }: Props) {
  return (
    <div className="sortable-tree__item" data-overlay>
      <Handle />
      {id}
      {count > 0 ? <span className="sortable-tree__badge">{count}</span> : null}
    </div>
  );
}
