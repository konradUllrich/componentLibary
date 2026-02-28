import React from "react";
import clsx from "clsx";
import "./Page.css";

import { Text } from "../../common";
import { Flex } from "../Flex";

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

  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

/**
 * Page – A full-page content wrapper with max-width centering and consistent padding.
 *
 * @example
 * ```tsx
 * <Page>
 *   <Section variant="heroooo">
 *     <h1>Title</h1>
 *   </Section>
 *   <Section>
 *     <p>Content</p>
 *   </Section>
 * </Page>
 * ```
 */
export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  (
    {
      maxWidth = "lg",
      className,
      children,
      title,
      subtitle,
      actions,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx("page", `page--${maxWidth}`, className)}
        {...props}
      >
        <Flex justify="space-between" align="center">
          <div>
            <Text as="h1" size="3xl" weight="bold">
              {title}
            </Text>
            <Text color="secondary">{subtitle}</Text>
          </div>
          {actions}
        </Flex>
        {children}
      </div>
    );
  },
);

Page.displayName = "Page";
