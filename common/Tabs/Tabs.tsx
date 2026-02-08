import React from "react";
import clsx from "clsx";
import * as RadixTabs from "@radix-ui/react-tabs";
import "./Tabs.css";

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Label displayed on the tab
   */
  label: React.ReactNode;

  /**
   * Content displayed in the panel
   */
  content: React.ReactNode;

  /**
   * Whether this tab is disabled
   */
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];

  /**
   * Currently active tab ID
   */
  activeId?: string;

  /**
   * Callback when tab changes
   */
  onActiveChange?: (id: string) => void;

  /**
   * Tab variant
   * @default "default"
   */
  variant?: "default" | "underline" | "pills";

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Tabs Component
 *
 * A flexible tabbed interface component with keyboard navigation and ARIA support.
 * Built on Radix UI primitives for full accessibility.
 * Supports multiple variants and controlled/uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Basic usage with state
 * const [activeTab, setActiveTab] = useState("tab1");
 *
 * <Tabs
 *   items={[
 *     { id: "tab1", label: "Tab 1", content: <div>Content 1</div> },
 *     { id: "tab2", label: "Tab 2", content: <div>Content 2</div> },
 *   ]}
 *   activeId={activeTab}
 *   onActiveChange={setActiveTab}
 * />
 *
 * // Underline variant
 * <Tabs
 *   variant="underline"
 *   items={[...]}
 *   activeId={activeTab}
 *   onActiveChange={setActiveTab}
 * />
 *
 * // Pills variant
 * <Tabs
 *   variant="pills"
 *   items={[...]}
 *   activeId={activeTab}
 *   onActiveChange={setActiveTab}
 * />
 * ```
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeId,
      onActiveChange,
      variant = "default",
      className,
      ...props
    },
    ref,
  ) => {
    const value = activeId || items[0]?.id || "";

    return (
      <RadixTabs.Root value={value} onValueChange={onActiveChange}>
        <div
          ref={ref}
          className={clsx("tabs", `tabs--${variant}`, className)}
          {...props}
        >
          <RadixTabs.List className="tabs-list">
            {items.map((item) => (
              <RadixTabs.Trigger
                key={item.id}
                value={item.id}
                disabled={item.disabled}
                className={clsx("tabs-trigger", {
                  "tabs-trigger--disabled": item.disabled,
                })}
              >
                {item.label}
              </RadixTabs.Trigger>
            ))}
          </RadixTabs.List>
          {items.map((item) => (
            <RadixTabs.Content
              key={item.id}
              value={item.id}
              className="tabs-content"
            >
              {item.content}
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    );
  },
);

Tabs.displayName = "Tabs";
