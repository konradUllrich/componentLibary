import React from "react";
import { Button } from "./Button";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Button } from '@mp-ku/mp-components';

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="destructive" disabled>
  Delete
</Button>

<Button isLoading>
  Saving...
</Button>`;

/** Live render of {@link usageSource}, used on the Button demo page. */
export const UsageExample = () => (
  <>
    <Button variant="primary" size="md">
      Click me
    </Button>
    <Button variant="destructive" disabled>
      Delete
    </Button>
    <Button isLoading>Saving...</Button>
  </>
);
