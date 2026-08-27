import React from "react";
import { IntrexxIcon } from "./IntrexxIcon";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { IntrexxIcon } from '@mp-ku/mp-components/intrexx';

function Toolbar() {
  return (
    <IntrexxIcon
      iconClass="icon54-l_Animals-Butterfly"
      size={24}
      color="primary"
    />
  );
}`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <IntrexxIcon iconClass="icon54-l_Animals-Butterfly" size={24} color="primary" />
);
