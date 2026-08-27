import React from "react";
import { Grid } from "./Grid";
import { GridItem } from "./GridItem";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Grid, GridItem } from '@mp-ku/mp-components';

<Grid columns="1" columnsMd="2" columnsLg="4" gap="md">
  <GridItem colSpan={2}>Wide cell</GridItem>
  <div>Cell</div>
  <div>Cell</div>
</Grid>`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => (
  <Grid columns="1" columnsMd="2" columnsLg="4" gap="md">
    <GridItem colSpan={2}>Wide cell</GridItem>
    <div>Cell</div>
    <div>Cell</div>
  </Grid>
);
