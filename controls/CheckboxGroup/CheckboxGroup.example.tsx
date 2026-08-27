import React, { useState } from "react";
import { CheckboxGroup } from "./CheckboxGroup";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { CheckboxGroup } from '@mp-ku/mp-components';

const [selected, setSelected] = useState<string[]>([]);

// Vertical (default)
<CheckboxGroup
  label="Select options"
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  value={selected}
  onValueChange={setSelected}
/>

// Horizontal with variant
<CheckboxGroup
  label="Filters"
  direction="horizontal"
  variant="filled"
  options={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ]}
  value={selected}
  onValueChange={setSelected}
/>`;

/** Live render of {@link usageSource}, used on the CheckboxGroup demo page. */
export const UsageExample = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <CheckboxGroup
        label="Select options"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
        value={selected}
        onValueChange={setSelected}
      />
      <CheckboxGroup
        label="Filters"
        direction="horizontal"
        variant="filled"
        options={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ]}
        value={selected}
        onValueChange={setSelected}
      />
    </>
  );
};
