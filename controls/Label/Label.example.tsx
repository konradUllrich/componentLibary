import React from "react";
import { Label } from "./Label";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Label } from '@mp-ku/mp-components';

<Label htmlFor="email">Email</Label>
<Label htmlFor="username" required>Username</Label>`;

/** Live render of {@link usageSource}, used on the Label demo page. */
export const UsageExample = () => (
  <>
    <Label htmlFor="usage-example-email">Email</Label>
    <Label htmlFor="usage-example-username" required>
      Username
    </Label>
  </>
);
