import React from "react";
import clsx from "clsx";
import * as RadixAccordion from "@radix-ui/react-accordion";
import "./Accordion.css";

export interface AccordionItem {
  /**
   * Unique identifier for the accordion item
   */
  id: string;

  /**
   * Title/label displayed on the trigger
   */
  title: React.ReactNode;

  /**
   * Content displayed when expanded
   */
  content: React.ReactNode;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;
}

export interface AccordionProps {
  /**
   * Array of accordion items
   */
  items: AccordionItem[];

  /**
   * Currently expanded item ID(s)
   * For single mode: string | undefined
   * For multiple mode: string[]
   */
  value?: string | string[];

  /**
   * Callback when expanded state changes
   */
  onValueChange?: (value: string | string[]) => void;

  /**
   * Allow multiple items to be open at the same time
   * @default false
   */
  multiple?: boolean;

  /**
   * Allow all items to be closed
   * @default true
   */
  collapsible?: boolean;

  /**
   * Layout variant: 'vertical' (stacked) or 'horizontal' (side-by-side)
   * @default 'vertical'
   */
  variant?: "vertical" | "horizontal";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Accordion Component
 *
 * A stacked set of collapsible panels for organizing content.
 * Built on Radix UI Accordion primitives with full accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [value, setValue] = useState("item1");
 * <Accordion
 *   items={[
 *     { id: "item1", title: "Section 1", content: <div>Content 1</div> },
 *     { id: "item2", title: "Section 2", content: <div>Content 2</div> },
 *   ]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 *
 * // Multiple items open
 * const [values, setValues] = useState<string[]>(["item1"]);
 * <Accordion
 *   multiple
 *   items={[...]}
 *   value={values}
 *   onValueChange={setValues}
 * />
 *
 * // Cannot close all items
 * <Accordion
 *   collapsible={false}
 *   items={[...]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 * ```
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      value,
      onValueChange,
      multiple = false,
      collapsible = true,
      variant = "vertical",
      className,
    },
    ref,
  ) => {
    if (multiple) {
      return (
        <RadixAccordion.Root
          ref={ref}
          type="multiple"
          value={value as string[]}
          onValueChange={onValueChange as (value: string[]) => void}
          className={clsx("mp-accordion", `mp-accordion--${variant}`, className)}
        >
          {items.map((item) => (
            <RadixAccordion.Item
              key={item.id}
              value={item.id}
              disabled={item.disabled}
              className="mp-accordion-item"
            >
              <RadixAccordion.Trigger className="mp-accordion-trigger">
                <span className="mp-accordion-title">{item.title}</span>
                <span className="mp-accordion-chevron" aria-hidden="true">
                  ▼
                </span>
              </RadixAccordion.Trigger>
              <RadixAccordion.Content className="mp-accordion-content">
                <div className="mp-accordion-content-inner">{item.content}</div>
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          ))}
        </RadixAccordion.Root>
      );
    }

    return (
      <RadixAccordion.Root
        ref={ref}
        type="single"
        value={value as string | undefined}
        onValueChange={onValueChange as (value: string) => void}
        collapsible={collapsible}
        className={clsx("mp-accordion", `mp-accordion--${variant}`, className)}
      >
        {items.map((item) => (
          <RadixAccordion.Item
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className="mp-accordion-item"
          >
            <RadixAccordion.Trigger className="mp-accordion-trigger">
              <span className="mp-accordion-title">{item.title}</span>
              <span className="mp-accordion-chevron" aria-hidden="true">
                ▼
              </span>
            </RadixAccordion.Trigger>
            <RadixAccordion.Content className="mp-accordion-content">
              <div className="mp-accordion-content-inner">{item.content}</div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    );
  },
);

Accordion.displayName = "Accordion";
