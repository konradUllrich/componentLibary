import React, { useState } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

export const ControlledTooltip = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          Tooltip text
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
