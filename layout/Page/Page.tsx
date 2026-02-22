import React from "react";
import clsx from "clsx";
import "./Page.css";

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width preset
   * @default "lg"
   */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  /** Additional CSS classes */
  className?: string;
  /** Page content */
  children?: React.ReactNode;
}

/**
 * Page – A full-page content wrapper with max-width centering and consistent padding.
 *
 * @example
 * ```tsx
 * <Page>
 *   <Section variant="hero">
 *     <h1>Title</h1>
 *   </Section>
 *   <Section>
 *     <p>Content</p>
 *   </Section>
 * </Page>
 * ```
 */
export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ maxWidth = "lg", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("page", `page--${maxWidth}`, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Page.displayName = "Page";
