import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import "./Dropdown.css";

export interface DropdownProps {
  /**
   * Dropdown content
   */
  children: React.ReactNode;
}

export interface DropdownContentProps {
  /**
   * Dropdown items
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Alignment of dropdown relative to trigger
   * @default 'start'
   */
  align?: "start" | "center" | "end";

  /**
   * Side of trigger to place dropdown
   * @default 'bottom'
   */
  side?: "top" | "right" | "bottom" | "left";
}

export interface DropdownItemProps {
  /**
   * Item content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onSelect?: (event: Event) => void;
}

export interface DropdownLabelProps {
  /**
   * Label content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface DropdownSeparatorProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Dropdown Root Component
 *
 * Accessible dropdown menu component built with Radix UI primitives.
 * Provides keyboard navigation, focus management, and proper ARIA attributes.
 *
 * @example
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>
 *     <Button>Open Menu</Button>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <DropdownItem onSelect={() => console.log('Edit')}>
 *       Edit
 *     </DropdownItem>
 *     <DropdownSeparator />
 *     <DropdownItem onSelect={() => console.log('Delete')}>
 *       Delete
 *     </DropdownItem>
 *   </DropdownContent>
 * </Dropdown>
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  return (
    <DropdownMenuPrimitive.Root>
      {children}
    </DropdownMenuPrimitive.Root>
  );
};

/**
 * Dropdown Trigger Component
 *
 * Button that opens the dropdown when clicked.
 */
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;

/**
 * Dropdown Content Component
 *
 * The main dropdown content container.
 */
export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, align = "start", side = "bottom", ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          className={clsx("dropdown__content", className)}
          align={align}
          side={side}
          sideOffset={4}
          {...props}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  },
);

DropdownContent.displayName = "DropdownContent";

/**
 * Dropdown Item Component
 *
 * Individual menu item.
 */
export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, disabled, onSelect, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={clsx("dropdown__item", className)}
        disabled={disabled}
        onSelect={onSelect}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  },
);

DropdownItem.displayName = "DropdownItem";

/**
 * Dropdown Label Component
 *
 * Label for grouping dropdown items.
 */
export const DropdownLabel = React.forwardRef<HTMLDivElement, DropdownLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Label
        ref={ref}
        className={clsx("dropdown__label", className)}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Label>
    );
  },
);

DropdownLabel.displayName = "DropdownLabel";

/**
 * Dropdown Separator Component
 *
 * Visual separator between menu items.
 */
export const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Separator
        ref={ref}
        className={clsx("dropdown__separator", className)}
        {...props}
      />
    );
  },
);

DropdownSeparator.displayName = "DropdownSeparator";

Dropdown.displayName = "Dropdown";
