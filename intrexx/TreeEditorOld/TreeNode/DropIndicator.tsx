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
        "mp-drop-indicator",
        `mp-drop-indicator--${position}`,
        isActive && "mp-drop-indicator--active"
      )}
      aria-hidden="true"
    >
      {isActive && (
        <div className="mp-drop-indicator__preview">
          <span className="mp-drop-indicator__spacer" aria-hidden="true" />
          <span className="mp-drop-indicator__label">{label ?? "Item"}</span>
        </div>
      )}
    </div>
  );
};

DropIndicator.displayName = "DropIndicator";
