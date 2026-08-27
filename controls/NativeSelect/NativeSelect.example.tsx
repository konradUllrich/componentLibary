import React from "react";
import { NativeSelect } from "./NativeSelect";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { NativeSelect } from '@mp-ku/mp-components';

<NativeSelect label="Country">
  <option value="">Select a country...</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</NativeSelect>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <NativeSelect label="Country">
    <option value="">Select a country...</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </NativeSelect>
);
