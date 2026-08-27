import React from "react";
import { FormControl } from "./FormControl";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { FormControl } from '@mp-ku/mp-components';

<FormControl label="Email" htmlFor="email-input">
  <input id="email-input" type="email" />
</FormControl>`;

/** Live render of {@link usageSource}, used on the FormControl demo page. */
export const UsageExample = () => (
  <FormControl label="Email" htmlFor="usage-example-email-input">
    <input id="usage-example-email-input" type="email" />
  </FormControl>
);
