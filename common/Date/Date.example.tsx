import React from "react";
import { DateComponent } from "./Date";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { DateComponent } from '@mp-ku/mp-components';

// Basic usage (short format, German locale)
<DateComponent date={new Date()} />

// Long format with US locale
<DateComponent
  date={new Date()}
  format="long"
  locale="en-US"
/>

// DateTime format
<DateComponent
  date={new Date()}
  format="datetime"
/>

// With custom fallback for null dates
<DateComponent
  date={null}
  fallback="No date available"
/>`;

/** Live render of {@link usageSource}, used on the Date demo page. */
export const UsageExample = () => (
  <>
    <DateComponent date={new Date()} />
    <DateComponent date={new Date()} format="long" locale="en-US" />
    <DateComponent date={new Date()} format="datetime" />
    <DateComponent date={null} fallback="No date available" />
  </>
);
