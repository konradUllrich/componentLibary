import React from "react";
import clsx from "clsx";

export interface DropIndicatorProps {
  isActive: boolean;
  position: "before" | "after";
}

export const DropIndicator = ({ isActive, position }: DropIndicatorProps) => {
  return (
    <div
      className={clsx(
        "drop-indicator",
        `drop-indicator--${position}`,
        isActive && "drop-indicator--active"
      )}
      aria-hidden="true"
    />
  );
};

DropIndicator.displayName = "DropIndicator";
