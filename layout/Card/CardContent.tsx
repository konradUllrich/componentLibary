import React from "react";
import clsx from "clsx";
import "./CardContent.css";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardContent Component
 *
 * Main content area of a Card. Grows to fill available space
 * and scrolls independently if content overflows.
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Card body text goes here.</p>
 * </CardContent>
 * ```
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("mp-card__content", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";
