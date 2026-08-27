import React from "react";
import { Skeleton } from "./Skeleton";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Skeleton } from '@mp-ku/mp-components';

// Text placeholder
<Skeleton variant="text" />
<Skeleton variant="text" lines={3} />

// Avatar placeholder
<Skeleton variant="circle" width={40} height={40} />

// Image / card placeholder
<Skeleton variant="rectangle" height={200} />

// Wave animation
<Skeleton animation="wave" height={40} />

// Compose for a profile card
<div style={{ display: 'flex', gap: '1rem' }}>
  <Skeleton variant="circle" width={48} height={48} />
  <div style={{ flex: 1 }}>
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" width="60%" />
  </div>
</div>`;

/** Live render of {@link usageSource}, used on the Skeleton demo page. */
export const UsageExample = () => (
  <>
    <Skeleton variant="text" />
    <Skeleton variant="text" lines={3} />
    <Skeleton variant="circle" width={40} height={40} />
    <Skeleton variant="rectangle" height={200} />
    <Skeleton animation="wave" height={40} />
    <div style={{ display: "flex", gap: "1rem" }}>
      <Skeleton variant="circle" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  </>
);
