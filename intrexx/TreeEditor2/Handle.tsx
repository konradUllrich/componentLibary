import React, { forwardRef } from "react";
import { GripHorizontal } from "lucide-react";
import clsx from "clsx";
import { Button } from "../../common";
export const Handle = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      className={clsx("sortable-tree__drag-handle", className)}
      {...props}
    >
      <GripHorizontal size={16} />
    </Button>
  );
});

Handle.displayName = "Handle";
