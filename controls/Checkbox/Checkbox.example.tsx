import React, { useState } from "react";
import { Checkbox } from "./Checkbox";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Checkbox } from '@mp-ku/mp-components';

// Basic checkbox
<Checkbox
  label="Notifications"
  inlineLabel="Email me updates"
  onChange={(e) => console.log(e.target.checked)}
/>

// Error state
<Checkbox
  label="Terms"
  inlineLabel="I accept the terms"
  error
  errorMessage="You must accept the terms"
/>

// Toggle switch
<Checkbox
  variant="toggle"
  label="Dark mode"
  inlineLabel="Enable dark mode"
  defaultChecked
/>

// Controlled
<Checkbox
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>`;

/** Live render of {@link usageSource}, used on the Checkbox demo page. */
export const UsageExample = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <Checkbox
        label="Notifications"
        inlineLabel="Email me updates"
        onChange={(e) => console.log(e.target.checked)}
      />
      <Checkbox
        label="Terms"
        inlineLabel="I accept the terms"
        error
        errorMessage="You must accept the terms"
      />
      <Checkbox
        variant="toggle"
        label="Dark mode"
        inlineLabel="Enable dark mode"
        defaultChecked
      />
      <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
    </>
  );
};
