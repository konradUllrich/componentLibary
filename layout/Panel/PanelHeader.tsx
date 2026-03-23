import React from "react";
import clsx from "clsx";
import "./PanelHeader.css";

export interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * PanelHeader Component
 *
 * Header section of a Panel. Provides a visually distinct top area
 * with a separator border below it.
 *
 * @example
 * ```tsx
 * <Panel>
 *   <PanelHeader>Panel Title</PanelHeader>
 *   <PanelBody>Panel content</PanelBody>
 * </Panel>
 * ```
 */
export const PanelHeader = React.forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("mp-panel__header", className)} {...props}>
        {children}
      </div>
    );
  },
);

PanelHeader.displayName = "PanelHeader";
