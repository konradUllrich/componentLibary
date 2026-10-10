import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from '@mp-ku/mp-components';

export const Open = () => (
  <TooltipProvider delayDuration={0}>
    <div style={{ padding: '64px 0 0' }}>
      <Tooltip open>
        <TooltipTrigger asChild>
          <Button variant="secondary">Share project</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Copy a link that anyone in your team can open</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

export const RightSide = () => (
  <TooltipProvider delayDuration={0}>
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button variant="ghost">Export</Button>
      </TooltipTrigger>
      <TooltipContent side="right">Download as CSV</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
