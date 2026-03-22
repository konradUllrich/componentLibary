import React from "react";
import clsx from "clsx";
import "./PanelBody.css";

export interface PanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Body content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * PanelBody Component
 *
 * Main content area of a Panel. Grows to fill available space.
 *
 * @example
 * ```tsx
 * <Panel>
 *   <PanelHeader>Title</PanelHeader>
 *   <PanelBody>
 *     <p>Panel content goes here.</p>
 *   </PanelBody>
 * </Panel>
 * ```
 */
export const PanelBody = React.forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("mp-panel__body", className)} {...props}>
        {children}
      </div>
    );
  },
);

PanelBody.displayName = "PanelBody";
