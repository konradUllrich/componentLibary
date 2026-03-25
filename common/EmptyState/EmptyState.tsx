import React from "react";
import clsx from "clsx";
import "./EmptyState.css";

export type EmptyStateVariant =
  | "default"
  | "search"
  | "error"
  | "no-data"
  | "no-access";

export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Main heading of the empty state
   */
  title: string;

  /**
   * Optional supporting description text
   */
  description?: string;

  /**
   * Optional icon or illustration element
   */
  icon?: React.ReactNode;

  /**
   * Optional action element, e.g. a Button or link
   */
  action?: React.ReactNode;

  /**
   * Semantic scenario variant – applies a subtle background tint
   * @default "default"
   */
  variant?: EmptyStateVariant;

  /**
   * Size of the component (affects padding and icon size)
   * @default "md"
   */
  size?: EmptyStateSize;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * EmptyState Component
 *
 * Communicates that an area has no content yet, or that a user action
 * is required. Supports diverse scenarios such as empty lists, search
 * results, errors, restricted access, and more.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   variant="search"
 *   title="No results found"
 *   description="Try adjusting your search terms."
 *   action={<Button onClick={onClear}>Clear search</Button>}
 * />
 * ```
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      title,
      description,
      icon,
      action,
      variant = "default",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={title}
        className={clsx(
          "mp-empty-state",
          `mp-empty-state--${variant}`,
          `mp-empty-state--${size}`,
          className,
        )}
        {...props}
      >
        {icon && (
          <div className="mp-empty-state__icon" aria-hidden="true">
            {icon}
          </div>
        )}
        <p className="mp-empty-state__title">{title}</p>
        {description && (
          <p className="mp-empty-state__description">{description}</p>
        )}
        {action && <div className="mp-empty-state__action">{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
