import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { Button } from "../Button";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@mp-ku/mp-components';

// Wrap your app or section with TooltipProvider
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      Helpful information
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Custom positioning
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="right" align="start">
    Tooltip text
  </TooltipContent>
</Tooltip>

// Custom delay
<TooltipProvider delayDuration={0}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Instant</Button>
    </TooltipTrigger>
    <TooltipContent>
      Appears immediately
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`;

/** Live render of {@link usageSource}, used on the Tooltip demo page. */
export const UsageExample = () => (
  <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Helpful information</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover</Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="start">
          Tooltip text
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Instant</Button>
        </TooltipTrigger>
        <TooltipContent>Appears immediately</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </>
);
