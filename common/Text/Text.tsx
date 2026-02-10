import React from "react";
import clsx from "clsx";
import "./Text.css";

export type TextElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label";
export type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right";
export type TextColor =
  | "default"
  | "secondary"
  | "tertiary"
  | "primary"
  | "destructive"
  | "success"
  | "warning";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML element to render
   * @default 'p'
   */
  as?: TextElement;

  /**
   * Text size
   * @default 'base'
   */
  size?: TextSize;

  /**
   * Font weight
   * @default 'normal'
   */
  weight?: TextWeight;

  /**
   * Text alignment
   */
  align?: TextAlign;

  /**
   * Text color variant
   * @default 'default'
   */
  color?: TextColor;

  /**
   * Number of lines to show before truncating with ellipsis
   * @example truncate={2} // Shows 2 lines then ...
   */
  truncate?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Text content
   */
  children?: React.ReactNode;
}

/**
 * Text Component
 *
 * Flexible text component with semantic HTML elements and consistent typography.
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="semibold">Heading Text</Text>
 * <Text as="h1" size="3xl" weight="bold">Page Title</Text>
 * <Text color="secondary">Secondary text</Text>
 * <Text truncate={1}>Long text that will be truncated...</Text>
 * <Text truncate={3}>Multi-line text truncated after 3 lines...</Text>
 * ```
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Element = "p",
      size = "base",
      weight = "normal",
      align,
      color = "default",
      truncate,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Element
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(
          "text",
          `text--${size}`,
          `text--${weight}`,
          align && `text--${align}`,
          `text--${color}`,
          truncate && "text--truncate",
          className,
        )}
        style={{
          ...(truncate &&
            ({ "--line-clamp": truncate } as React.CSSProperties)),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

Text.displayName = "Text";
