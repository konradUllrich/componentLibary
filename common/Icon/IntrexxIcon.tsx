import React from "react";
import clsx from "clsx";

interface KanbanIconProps {
  iconClass: string;
  className?: string;
}

export const IntrexxIcon: React.FC<KanbanIconProps> = ({
  iconClass,
  className = "",
}) => {
  return (
    <i className={clsx("kanban-icon", iconClass, className)} aria-hidden="true" />
  );
};
