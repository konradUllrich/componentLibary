import React, { forwardRef } from "react";
import { GripHorizontal } from "lucide-react";
import { Button } from "../../common";

export const Handle = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  return (
    <Button ref={ref} variant="ghost" {...props}>
      <GripHorizontal size={16} />
    </Button>
  );
});

Handle.displayName = "Handle";
