import React from "react";
import { Badge } from "./Badge";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Badge } from '@mp-ku/mp-components';

<Badge variant="success">Active</Badge>
<Badge variant="warning" appearance="outline">Pending</Badge>
<Badge variant="destructive">Error</Badge>`;

/** Live render of {@link usageSource}, used on the Badge demo page. */
export const UsageExample = () => (
  <>
    <Badge variant="success">Active</Badge>
    <Badge variant="warning" appearance="outline">
      Pending
    </Badge>
    <Badge variant="destructive">Error</Badge>
  </>
);
