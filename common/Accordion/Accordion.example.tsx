import React, { useState } from "react";
import { Accordion } from "./Accordion";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Accordion } from '@mp-ku/mp-components';

<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <div>Content 1</div> },
    { id: '2', title: 'Section 2', content: <div>Content 2</div> },
  ]}
  value={value}
  onValueChange={setValue}
/>

<Accordion
  variant="horizontal"
  items={[
    { id: '1', title: 'Section 1', content: <div>Content 1</div> },
    { id: '2', title: 'Section 2', content: <div>Content 2</div> },
  ]}
/>`;

/** Live render of {@link usageSource}, used on the Accordion demo page. */
export const UsageExample = () => {
  const [value, setValue] = useState<string | string[] | undefined>("1");

  return (
    <>
      <Accordion
        items={[
          { id: "1", title: "Section 1", content: <div>Content 1</div> },
          { id: "2", title: "Section 2", content: <div>Content 2</div> },
        ]}
        value={value}
        onValueChange={setValue}
      />

      <Accordion
        variant="horizontal"
        items={[
          { id: "1", title: "Section 1", content: <div>Content 1</div> },
          { id: "2", title: "Section 2", content: <div>Content 2</div> },
        ]}
      />
    </>
  );
};
