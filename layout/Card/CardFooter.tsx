import React from "react";
import clsx from "clsx";
import "./CardFooter.css";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardFooter Component
 *
 * Footer section of a Card. Provides a visually distinct bottom area
 * with a separator border above it, typically used for actions.
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <Button>Learn More</Button>
 * </CardFooter>
 * ```
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("mp-card__footer", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
