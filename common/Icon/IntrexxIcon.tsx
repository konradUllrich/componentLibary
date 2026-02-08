import React from "react";

interface KanbanIconProps {
  iconClass: string;
  className?: string;
}

export const IntrexxIcon: React.FC<KanbanIconProps> = ({
  iconClass,
  className = "",
}) => {
  return (
    <i className={`kanban-icon ${iconClass} ${className}`} aria-hidden="true" />
  );
};
