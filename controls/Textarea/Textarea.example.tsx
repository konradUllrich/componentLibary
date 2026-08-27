import React from "react";
import { Textarea } from "./Textarea";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Textarea } from '@mp-ku/mp-components';

<Textarea
  label="Description"
  placeholder="Enter a description"
  rows={4}
/>

<Textarea
  label="Notes"
  error
  errorMessage="Notes are required"
/>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <>
    <Textarea label="Description" placeholder="Enter a description" rows={4} />
    <Textarea label="Notes" error errorMessage="Notes are required" />
  </>
);
