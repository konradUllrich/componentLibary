import React from "react";
import { Flex } from "./Flex";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Flex } from '@mp-ku/mp-components';

// Basic row layout
<Flex direction="row" justify="space-between" align="center" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Column layout
<Flex direction="column" gap="sm">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// With wrapping
<Flex wrap gap="md">
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</Flex>`;

/** Live render of {@link usageSource}, used on the Flex demo page. */
export const UsageExample = () => (
  <>
    <Flex direction="row" justify="space-between" align="center" gap="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>

    <Flex direction="column" gap="sm">
      <div>Item 1</div>
      <div>Item 2</div>
    </Flex>
  </>
);
