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
   * Layout variant: 'vertical' (stacked), 'horizontal' (side-by-side), or 'tabs' (tab-like appearance)
   * @default 'vertical'
   */
  variant?: "vertical" | "horizontal" | "tabs";

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
 *   onValueChange={setValues as any}
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
    const isTabsVariant = variant === "tabs";
    const [internalValue, setInternalValue] = React.useState<
      string | undefined
    >(items[0]?.id);

    if (isTabsVariant) {
      // Tabs variant: render triggers in a row, then content below
      const isControlled = value !== undefined;
      const activeValue = multiple
        ? (value as string[])?.[0]
        : isControlled
          ? (value as string | undefined)
          : internalValue;

      const handleValueChange = (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (onValueChange) {
          onValueChange(newValue);
        }
      };

      const handleTabClick = (itemId: string) => {
        if (collapsible && activeValue === itemId) {
          handleValueChange("");
        } else {
          handleValueChange(itemId);
        }
      };

      const activeItem = activeValue
        ? items.find((item) => item.id === activeValue)
        : null;

      return (
        <div
          ref={ref}
          className={clsx("accordion", `accordion--${variant}`, className)}
        >
          <div className="accordion-tabs-triggers">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                disabled={item.disabled}
                className={clsx(
                  "accordion-trigger",
                  activeValue === item.id && "accordion-trigger--active",
                )}
                data-state={activeValue === item.id ? "open" : "closed"}
              >
                <span className="accordion-title">{item.title}</span>
              </button>
            ))}
          </div>
          {activeItem && (
            <div className="accordion-tabs-content">
              <div className="accordion-content-inner">
                {activeItem.content}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (multiple) {
      return (
        <RadixAccordion.Root
          ref={ref}
          type="multiple"
          value={value as string[]}
          onValueChange={onValueChange as (value: string[]) => void}
          className={clsx("accordion", `accordion--${variant}`, className)}
        >
          {items.map((item) => (
            <RadixAccordion.Item
              key={item.id}
              value={item.id}
              disabled={item.disabled}
              className="accordion-item"
            >
              <RadixAccordion.Trigger className="accordion-trigger">
                <span className="accordion-title">{item.title}</span>
                <span className="accordion-chevron" aria-hidden="true">
                  ▼
                </span>
              </RadixAccordion.Trigger>
              <RadixAccordion.Content className="accordion-content">
                <div className="accordion-content-inner">{item.content}</div>
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
        className={clsx("accordion", `accordion--${variant}`, className)}
      >
        {items.map((item) => (
          <RadixAccordion.Item
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className="accordion-item"
          >
            <RadixAccordion.Trigger className="accordion-trigger">
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-chevron" aria-hidden="true">
                ▼
              </span>
            </RadixAccordion.Trigger>
            <RadixAccordion.Content className="accordion-content">
              <div className="accordion-content-inner">{item.content}</div>
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        ))}
      </RadixAccordion.Root>
    );
  },
);

Accordion.displayName = "Accordion";
