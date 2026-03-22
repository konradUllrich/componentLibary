import React from "react";
import clsx from "clsx";
import "./Card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode;

  /**
   * Card variant
   * @default "elevated"
   */
  variant?: "elevated" | "outlined" | "flat";

  /**
   * Card padding size
   * @default "md"
   */
  padding?: "none" | "sm" | "md" | "lg";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether card is interactive (hoverable)
   */
  interactive?: boolean;
}

/**
 * Card Component
 *
 * A flexible container component for displaying content in a card format.
 * Use with CardHeader, CardContent, and CardFooter sub-components.
 *
 * @example
 * ```tsx
 * <Card variant="elevated" padding="md">
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardContent>
 *     Card content goes here
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "elevated",
      padding = "md",
      className,
      interactive = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "mp-card",
          `mp-card--${variant}`,
          `mp-card--padding-${padding}`,
          {
            "mp-card--interactive": interactive,
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

