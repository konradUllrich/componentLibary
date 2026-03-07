/**
 * TreeEditor test fixtures / stories.
 *
 * These wrapper components avoid Playwright CT's function-prop serialization
 * issue. Playwright CT intercepts function props on the top-level mounted
 * component and calls them as Node.js-side bound callbacks, which breaks
 * React hooks like Zustand stores. By creating the store inside a React
 * component wrapper (not in the test file), the store stays in the browser
 * context.
 *
 * All wrappers accept only JSON-serializable props.
 */
import React from "react";
import { TreeEditor } from "./TreeEditor";
import { createTreeEditorStore, BaseTreeItem } from "./treeEditorState";

const sampleItems: BaseTreeItem[] = [
  {
    id: "1",
    label: "Root Item 1",
    children: [
      { id: "1-1", label: "Child 1.1" },
      { id: "1-2", label: "Child 1.2" },
    ],
  },
  {
    id: "2",
    label: "Root Item 2",
  },
  {
    id: "3",
    label: "Root Item 3",
    children: [{ id: "3-1", label: "Child 3.1" }],
  },
];

/** Basic rendering story */
export const BasicTreeEditor = () => {
  const storeRef = React.useRef(
    createTreeEditorStore("story-basic", { treeItems: sampleItems })
  );
  return <TreeEditor store={storeRef.current} />;
};
BasicTreeEditor.displayName = "BasicTreeEditor";

/** Expand/collapse story */
export const ExpandTreeEditor = () => {
  const storeRef = React.useRef(
    createTreeEditorStore("story-expand", { treeItems: sampleItems })
  );
  return <TreeEditor store={storeRef.current} />;
};
ExpandTreeEditor.displayName = "ExpandTreeEditor";

/** Select story */
export const SelectTreeEditor = () => {
  const storeRef = React.useRef(
    createTreeEditorStore("story-select", { treeItems: sampleItems })
  );
  return <TreeEditor store={storeRef.current} />;
};
SelectTreeEditor.displayName = "SelectTreeEditor";

/** Accessibility story */
export const A11yTreeEditor = () => {
  const storeRef = React.useRef(
    createTreeEditorStore("story-a11y", { treeItems: sampleItems })
  );
  return <TreeEditor store={storeRef.current} />;
};
A11yTreeEditor.displayName = "A11yTreeEditor";

/** Custom renderItem story */
export const CustomRenderTreeEditor = () => {
  const storeRef = React.useRef(
    createTreeEditorStore("story-render", { treeItems: sampleItems })
  );
  return (
    <TreeEditor
      store={storeRef.current}
      renderItem={(item) => (
        <span data-testid={`custom-${item.id}`}>{item.label} (custom)</span>
      )}
    />
  );
};
CustomRenderTreeEditor.displayName = "CustomRenderTreeEditor";

/** ARIA attributes story */
export const AriaTreeEditor = () => {
  const storeRef = React.useRef(
    createTreeEditorStore("story-aria", { treeItems: sampleItems })
  );
  return <TreeEditor store={storeRef.current} />;
};
AriaTreeEditor.displayName = "AriaTreeEditor";
