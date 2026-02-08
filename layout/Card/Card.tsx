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

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card Component
 *
 * A flexible container component for displaying content in a card format.
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
          "card",
          `card--${variant}`,
          `card--padding-${padding}`,
          {
            "card--interactive": interactive,
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

/**
 * CardHeader Component
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("card__header", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

/**
 * CardContent Component
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("card__content", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

/**
 * CardFooter Component
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("card__footer", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
