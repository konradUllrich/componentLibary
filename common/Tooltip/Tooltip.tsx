import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";
import "./Tooltip.css";

export interface TooltipProviderProps {
  /**
   * Children components
   */
  children: React.ReactNode;

  /**
   * Delay before showing tooltip in milliseconds
   * @default 700
   */
  delayDuration?: number;

  /**
   * Skip delay when moving between tooltips
   * @default 300
   */
  skipDelayDuration?: number;
}

export interface TooltipProps {
  /**
   * Tooltip content
   */
  children: React.ReactNode;

  /**
   * Whether tooltip is open (controlled)
   */
  open?: boolean;

  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export interface TooltipContentProps {
  /**
   * Tooltip content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Side of trigger to place tooltip
   * @default 'top'
   */
  side?: "top" | "right" | "bottom" | "left";

  /**
   * Alignment of tooltip relative to trigger
   * @default 'center'
   */
  align?: "start" | "center" | "end";

  /**
   * Whether to hide when pointer moves out
   * @default true
   */
  hideWhenDetached?: boolean;
}

/**
 * Tooltip Provider Component
 *
 * Provides context for all tooltips in the app.
 * Wrap your app or section with this provider.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <App />
 * </TooltipProvider>
 * ```
 */
export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
}) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
};

/**
 * Tooltip Root Component
 *
 * Accessible tooltip component built with Radix UI primitives.
 * Provides hover, focus, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>
 *       <button>Hover me</button>
 *     </TooltipTrigger>
 *     <TooltipContent>
 *       Tooltip text
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </TooltipPrimitive.Root>
  );
};

/**
 * Tooltip Trigger Component
 *
 * Element that triggers the tooltip on hover/focus.
 */
export const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * Tooltip Content Component
 *
 * The tooltip content that appears.
 */
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      children,
      className,
      side = "top",
      align = "center",
      hideWhenDetached = true,
      ...props
    },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          className={clsx("tooltip__content", className)}
          side={side}
          align={align}
          sideOffset={4}
          hideWhenDetached={hideWhenDetached}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="tooltip__arrow" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  },
);

TooltipContent.displayName = "TooltipContent";

TooltipProvider.displayName = "TooltipProvider";
Tooltip.displayName = "Tooltip";
