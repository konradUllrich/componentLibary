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
  header?: React.ReactNode;
  subHeader?: React.ReactNode;
  actions?: React.ReactNode;
  headerType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Page – A full-page content wrapper with max-width centering and consistent padding.
 *
 * @example
 * ```tsx
 * <Page title="Dashboard" subHeader="Overview of your account" maxWidth="lg">
 *   <p>Page content</p>
 * </Page>
 * ```
 *
 * See {@link ./Page.example.tsx} for the live, greppable version of this
 * snippet.
 */
export const Page = React.forwardRef<HTMLDivElement, PageProps>(
  (
    {
      maxWidth = "lg",
      className,
      children,
      title,
      header,
      subHeader,
      actions,
      headerType = "h1",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx("mp-page", `mp-page--${maxWidth}`, className)}
        {...props}
      >
        {(header || title || subHeader) && (
          <Flex justify="space-between" align="center">
            <div>
              <Text as={headerType} size="3xl" weight="bold">
                {header || title}
              </Text>
              <Text color="secondary">{subHeader}</Text>
            </div>
            {actions}
          </Flex>
        )}
        {children}
      </div>
    );
  },
);

Page.displayName = "Page";
