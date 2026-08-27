import React, { useState } from "react";
import { Radio } from "./Radio";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Radio } from '@mp-ku/mp-components';

// Controlled radio group
const [value, setValue] = useState("option1");

<Radio
  name="group"
  value="option1"
  checked={value === "option1"}
  onChange={(e) => setValue(e.target.value)}
  inlineLabel="Option 1"
/>
<Radio
  name="group"
  value="option2"
  checked={value === "option2"}
  onChange={(e) => setValue(e.target.value)}
  inlineLabel="Option 2"
/>

// With error
<Radio
  label="Required choice"
  inlineLabel="Select this"
  error
  errorMessage="You must make a selection"
/>`;

/** Live render of {@link usageSource}, used on the Radio demo page. */
export const UsageExample = () => {
  const [value, setValue] = useState("option1");

  return (
    <>
      <Radio
        name="group"
        value="option1"
        checked={value === "option1"}
        onChange={(e) => setValue(e.target.value)}
        inlineLabel="Option 1"
      />
      <Radio
        name="group"
        value="option2"
        checked={value === "option2"}
        onChange={(e) => setValue(e.target.value)}
        inlineLabel="Option 2"
      />
      <Radio
        label="Required choice"
        inlineLabel="Select this"
        error
        errorMessage="You must make a selection"
      />
    </>
  );
};
