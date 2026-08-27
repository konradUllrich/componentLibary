import React, { useState } from "react";
import { Tabs } from "./Tabs";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Tabs } from '@mp-ku/mp-components';

// Basic usage
const [activeTab, setActiveTab] = useState('tab1');

<Tabs
  items={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  activeId={activeTab}
  onActiveChange={setActiveTab}
/>

// Underline variant
<Tabs
  variant="underline"
  items={[...]}
/>

// Pills variant
<Tabs
  variant="pills"
  items={[...]}
/>`;

/** Live render of {@link usageSource}, used on the Tabs demo page. */
export const UsageExample = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <>
      <Tabs
        items={[
          { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
          { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
        ]}
        activeId={activeTab}
        onActiveChange={setActiveTab}
      />
      <Tabs
        variant="underline"
        items={[
          { id: "u1", label: "Tab 1", content: <div>Underline content 1</div> },
          { id: "u2", label: "Tab 2", content: <div>Underline content 2</div> },
        ]}
      />
      <Tabs
        variant="pills"
        items={[
          { id: "p1", label: "Tab 1", content: <div>Pills content 1</div> },
          { id: "p2", label: "Tab 2", content: <div>Pills content 2</div> },
        ]}
      />
    </>
  );
};
