import React from "react";
import clsx from "clsx";
import "./CardHeader.css";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardHeader Component
 *
 * Header section of a Card. Provides a visually distinct top area
 * with a separator border below it.
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <h3>Card Title</h3>
 * </CardHeader>
 * ```
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("mp-card__header", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";
