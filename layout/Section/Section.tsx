import React from "react";
import clsx from "clsx";
import "./Section.css";

type SectionElement = "section" | "div" | "article" | "aside";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML element to render
   * @default "section"
   */
  as?: SectionElement;
  /**
   * Visual variant
   * @default "default"
   */
  variant?: "default" | "hero";
  /** Additional CSS classes */
  className?: string;
  /** Section content */
  children?: React.ReactNode;
}

/**
 * Section – A content section block with consistent styling.
 *
 * @example
 * ```tsx
 * <Section>
 *   <h2>Section Title</h2>
 *   <p>Content</p>
 * </Section>
 *
 * <Section variant="hero">
 *   <h1>Page Title</h1>
 *   <p>Page description</p>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (props, ref) => {
    const {
      as: Element = "section",
      variant = "default",
      className,
      children,
      ...restProps
    } = props;

    return React.createElement(
      Element as React.ElementType,
      {
        ref,
        className: clsx("section", `section--${variant}`, className),
        ...restProps,
      },
      children,
    );
  },
);

Section.displayName = "Section";
