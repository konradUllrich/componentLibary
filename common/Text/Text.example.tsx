import React from "react";
import { Text } from "./Text";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Text } from '@mp-ku/mp-components';

<Text as="h1" size="3xl" weight="bold">
  Page Title
</Text>

<Text as="p" color="secondary">
  Secondary paragraph text
</Text>`;

/** Live render of {@link usageSource}, used on the Text demo page. */
export const UsageExample = () => (
  <>
    <Text as="h1" size="3xl" weight="bold">
      Page Title
    </Text>
    <Text as="p" color="secondary">
      Secondary paragraph text
    </Text>
  </>
);
