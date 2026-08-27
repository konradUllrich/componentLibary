import React from "react";
import { Disclosure } from "./Disclosure";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Disclosure } from '@mp-ku/mp-components';

<Disclosure label="Click to expand">
  <p>Hidden content that can be toggled</p>
</Disclosure>`;

/** Live render of {@link usageSource}, used on the Disclosure demo page. */
export const UsageExample = () => (
  <Disclosure label="Click to expand">
    <p>Hidden content that can be toggled</p>
  </Disclosure>
);
