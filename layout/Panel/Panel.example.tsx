import React from "react";
import { Panel } from "./Panel";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Panel } from '@mp-ku/mp-components';

// Predefined padding size (variant-driven)
<Panel variant="elevated" padding="md">
  <h2>Card Title</h2>
</Panel>

// Granular spacing with tokens (0-6 map to --mp-spacing-0..--mp-spacing-6)
<Panel variant="outlined" spacing={{ pl: 6, pr: 6, pt: 4, pb: 4 }}>
  <p>Custom horizontal / vertical padding</p>
</Panel>

// Margin + padding
<Panel spacing={{ pt: 4, pb: 4, pl: 4, pr: 4, mt: 2, mb: 2, ml: "auto", mr: "auto" }}>
  <p>Centered panel with margin</p>
</Panel>

// Individual side overrides
<Panel spacing={{ pt: 5, pb: 4, pl: 4, pr: 4 }}>
  <p>Extra top padding</p>
</Panel>

// Responsive spacing
<Panel spacing={{ mt: 2, ml: { base: 0, md: 4, lg: 6 } }}>
  <p>Different margin-left at breakpoints</p>
</Panel>`;

/** Live render of {@link usageSource}, used on the Panel demo page. */
export const UsageExample = () => (
  <>
    <Panel variant="elevated" padding="md">
      <h2>Card Title</h2>
    </Panel>
    <Panel variant="outlined" spacing={{ pl: 6, pr: 6, pt: 4, pb: 4 }}>
      <p>Custom horizontal / vertical padding</p>
    </Panel>
    <Panel spacing={{ pt: 4, pb: 4, pl: 4, pr: 4, mt: 2, mb: 2, ml: "auto", mr: "auto" }}>
      <p>Centered panel with margin</p>
    </Panel>
    <Panel spacing={{ pt: 5, pb: 4, pl: 4, pr: 4 }}>
      <p>Extra top padding</p>
    </Panel>
    <Panel spacing={{ mt: 2, ml: { base: 0, md: 4, lg: 6 } }}>
      <p>Different margin-left at breakpoints</p>
    </Panel>
  </>
);
