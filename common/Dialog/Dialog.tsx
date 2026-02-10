import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import "./Dialog.css";

export interface DialogProps {
  /**
   * Whether the dialog is open
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Dialog content
   */
  children: React.ReactNode;
}

export interface DialogContentProps {
  /**
   * Dialog content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Dialog title for accessibility
   */
  title?: string;

  /**
   * Dialog description for accessibility
   */
  description?: string;
}

export interface DialogTitleProps {
  /**
   * Title content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface DialogDescriptionProps {
  /**
   * Description content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface DialogCloseProps {
  /**
   * Button content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Aria label for accessibility
   */
  "aria-label"?: string;
}

/**
 * Dialog Root Component
 *
 * Accessible modal dialog component built with Radix UI primitives.
 * Provides focus trap, keyboard navigation, and proper ARIA attributes.
 *
 * @example
 * ```tsx
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogContent title="Dialog Title" description="Dialog description">
 *     <p>Dialog body content</p>
 *     <DialogClose>Close</DialogClose>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};

/**
 * Dialog Trigger Component
 *
 * Button that opens the dialog when clicked.
 */
export const DialogTrigger = DialogPrimitive.Trigger;

/**
 * Dialog Content Component
 *
 * The main dialog content container with overlay.
 */
export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, title, description, ...props }, ref) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="dialog__overlay" />
        <DialogPrimitive.Content
          ref={ref}
          className={clsx("dialog__content", className)}
          {...props}
        >
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);

DialogContent.displayName = "DialogContent";

/**
 * Dialog Title Component
 *
 * Accessible dialog title.
 */
export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        className={clsx("dialog__title", className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Title>
    );
  },
);

DialogTitle.displayName = "DialogTitle";

/**
 * Dialog Description Component
 *
 * Accessible dialog description.
 */
export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        className={clsx("dialog__description", className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Description>
    );
  },
);

DialogDescription.displayName = "DialogDescription";

/**
 * Dialog Close Component
 *
 * Button to close the dialog.
 */
export const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, className, "aria-label": ariaLabel = "Close", ...props }, ref) => {
    return (
      <DialogPrimitive.Close
        ref={ref}
        className={clsx("dialog__close", className)}
        aria-label={ariaLabel}
        {...props}
      >
        {children || "×"}
      </DialogPrimitive.Close>
    );
  },
);

DialogClose.displayName = "DialogClose";

Dialog.displayName = "Dialog";
