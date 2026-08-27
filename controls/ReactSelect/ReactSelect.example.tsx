import React, { useState } from "react";
import { ReactSelect } from "./ReactSelect";
import { ReactSelectItem } from "./ReactSelectItem";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { ReactSelect, ReactSelectItem } from '@mp-ku/mp-components';

const [value, setValue] = useState("");

<ReactSelect
  label="Country"
  placeholder="Select a country"
  value={value}
  onValueChange={setValue}
>
  <ReactSelectItem value="us">United States</ReactSelectItem>
  <ReactSelectItem value="uk">United Kingdom</ReactSelectItem>
  <ReactSelectItem value="ca">Canada</ReactSelectItem>
</ReactSelect>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => {
  const [value, setValue] = useState("");

  return (
    <ReactSelect
      label="Country"
      placeholder="Select a country"
      value={value}
      onValueChange={setValue}
    >
      <ReactSelectItem value="us">United States</ReactSelectItem>
      <ReactSelectItem value="uk">United Kingdom</ReactSelectItem>
      <ReactSelectItem value="ca">Canada</ReactSelectItem>
    </ReactSelect>
  );
};
