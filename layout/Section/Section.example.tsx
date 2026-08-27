import React from "react";
import { Section } from "./Section";
import { Text } from "../../common";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Section } from '@mp-ku/mp-components';

<Section title="Variants" subtitle="Different styles for various contexts">
  <p>Section content</p>
</Section>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <Section title="Variants" subtitle="Different styles for various contexts">
    <Text>Section content</Text>
  </Section>
);
