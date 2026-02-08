import React, { useState } from "react";
import clsx from "clsx";
import * as RadixCollapsible from "@radix-ui/react-collapsible";
import "./Disclosure.css";

export interface DisclosureProps {
  /**
   * Disclosure trigger label/title
   */
  label: React.ReactNode;

  /**
   * Content displayed when open
   */
  children: React.ReactNode;

  /**
   * Whether the disclosure is initially open
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Currently open state (for controlled mode)
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Icon to display next to the label
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS classes for the root
   */
  className?: string;

  /**
   * Additional CSS classes for the trigger
   */
  triggerClassName?: string;

  /**
   * Additional CSS classes for the content
   */
  contentClassName?: string;
}

/**
 * Disclosure Component
 *
 * A collapsible component for showing/hiding content with keyboard support.
 * Built on Radix UI Collapsible primitives.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Disclosure label="Click to expand">
 *   <p>Hidden content</p>
 * </Disclosure>
 *
 * // With controlled state
 * const [open, setOpen] = useState(false);
 * <Disclosure
 *   label="Show/Hide"
 *   open={open}
 *   onOpenChange={setOpen}
 * >
 *   Content here
 * </Disclosure>
 *
 * // With custom icon
 * <Disclosure
 *   label="Details"
 *   icon={<ChevronIcon />}
 * >
 *   Detailed information
 * </Disclosure>
 * ```
 */
export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(
  (
    {
      label,
      children,
      defaultOpen = false,
      open,
      onOpenChange,
      icon,
      className,
      triggerClassName,
      contentClassName,
    },
    ref,
  ) => {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? open : internalOpen;

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <RadixCollapsible.Root
        ref={ref}
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={clsx("disclosure", className)}
      >
        <RadixCollapsible.Trigger
          className={clsx("disclosure-trigger", triggerClassName)}
        >
          {icon && <span className="disclosure-icon">{icon}</span>}
          <span className="disclosure-label">{label}</span>
          <span className="disclosure-chevron" aria-hidden="true">
            ▼
          </span>
        </RadixCollapsible.Trigger>
        <RadixCollapsible.Content
          className={clsx("disclosure-content", contentClassName)}
        >
          {children}
        </RadixCollapsible.Content>
      </RadixCollapsible.Root>
    );
  },
);

Disclosure.displayName = "Disclosure";
