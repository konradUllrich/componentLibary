import React from "react";
import clsx from "clsx";

export interface DropIndicatorProps {
  isActive: boolean;
  position: "before" | "after";
  label?: string;
}

export const DropIndicator = ({ isActive, position, label }: DropIndicatorProps) => {
  return (
    <div
      className={clsx(
        "drop-indicator",
        `drop-indicator--${position}`,
        isActive && "drop-indicator--active"
      )}
      aria-hidden="true"
    >
      {isActive && (
        <div className="drop-indicator__preview">
          <span className="drop-indicator__spacer" aria-hidden="true" />
          <span className="drop-indicator__label">{label ?? "Item"}</span>
        </div>
      )}
    </div>
  );
};

DropIndicator.displayName = "DropIndicator";
