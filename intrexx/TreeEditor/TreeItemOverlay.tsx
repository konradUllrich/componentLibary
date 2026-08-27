import type { UniqueIdentifier } from "@dnd-kit/abstract";

import { Handle } from "./Handle.tsx";
import "./TreeEditor.css";

interface Props {
  id: UniqueIdentifier;
  count: number;
}

export function TreeItemOverlay({ id, count }: Props) {
  return (
    <div className="mp-sortable-tree__item" data-overlay>
      <Handle />
      {id}
      {count > 0 ? <span className="mp-sortable-tree__badge">{count}</span> : null}
    </div>
  );
}
