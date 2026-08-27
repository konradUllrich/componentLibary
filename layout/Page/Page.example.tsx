import React from "react";
import { Page } from "./Page";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Page } from '@mp-ku/mp-components';

<Page title="Dashboard" subHeader="Overview of your account" maxWidth="lg">
  <p>Page content</p>
</Page>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <Page title="Dashboard" subHeader="Overview of your account" maxWidth="lg">
    <p>Page content</p>
  </Page>
);
