import React from "react";
import clsx from "clsx";
import { u, type UtilityInput } from "../../utils";
import "./Card.css";
import "../../styles/spacing.css";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
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
   * Optional spacing utility configuration for responsive padding/margin.
   * Pass an object with p, pt, pb, pl, pr, m, mt, mb, ml, mr keys.
   * Values can be static (0–6) or responsive across breakpoints.
   * Shares the same scale as `Flex`/`Panel`'s `spacing` prop.
   *
   * @example
   * <Card spacing={{ pt: 4, pb: { base: 2, md: 4 } }} />
   */
  spacing?: UtilityInput;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether card is interactive (hoverable)
   */
  interactive?: boolean;

  /**
   * When provided, renders the card as an `<a>` element.
   * Automatically applies `mp-card--link` and `mp-card--interactive` classes.
   */
  href?: string;

  /**
   * Link target (e.g. `"_blank"`). Only used when `href` is provided.
   * When set to `"_blank"`, `rel` defaults to `"noopener noreferrer"`.
   */
  target?: string;

  /**
   * Relationship attribute for the link. Only used when `href` is provided.
   * Defaults to `"noopener noreferrer"` when `target="_blank"`.
   */
  rel?: string;
}

/**
 * Card Component
 *
 * A flexible container component for displaying content in a card format.
 * Use with CardHeader, CardContent, and CardFooter sub-components.
 *
 * @example
 * ```tsx
 * // Standard card
 * <Card variant="elevated" padding="md">
 *   <CardHeader><h3>Card Title</h3></CardHeader>
 *   <CardContent>Card content goes here</CardContent>
 *   <CardFooter><Button>Action</Button></CardFooter>
 * </Card>
 *
 * // Link card — renders as <a>
 * <Card href="/details" target="_blank">
 *   <CardContent>Click to navigate</CardContent>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      children,
      variant = "elevated",
      padding = "md",
      spacing,
      className,
      interactive = false,
      href,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const isLink = Boolean(href);
    const resolvedRel =
      rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

    const classes = clsx(
      "mp-card",
      `mp-card--${variant}`,
      `mp-card--padding-${padding}`,
      {
        "mp-card--interactive": interactive || isLink,
        "mp-card--link": isLink,
      },
      spacing && u(spacing),
      className,
    );

    if (isLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={resolvedRel}
          className={classes}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

