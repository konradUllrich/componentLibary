import React from "react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";
import { SearchX, FolderOpen } from "lucide-react";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { EmptyState } from '@mp-ku/mp-components';

// Basic
<EmptyState title="Nothing here yet" />

// With description
<EmptyState
  title="No results found"
  description="Try adjusting your search terms."
/>

// With icon
<EmptyState
  variant="search"
  title="No results found"
  description="Try a different query."
  icon={<SearchX size={48} />}
/>

// With action button
<EmptyState
  variant="default"
  title="No items"
  description="Create your first item to get started."
  icon={<FolderOpen size={48} />}
  action={<Button onClick={onCreate}>New item</Button>}
/>

// Sizes: "sm" | "md" (default) | "lg"
<EmptyState size="sm" title="Empty" />

// Variants: "default" | "search" | "error" | "no-data" | "no-access"
<EmptyState variant="error" title="Something went wrong" />`;

/** Live render of {@link usageSource}, used on the EmptyState demo page. */
export const UsageExample = () => (
  <>
    <EmptyState title="Nothing here yet" />
    <EmptyState
      title="No results found"
      description="Try adjusting your search terms."
    />
    <EmptyState
      variant="search"
      title="No results found"
      description="Try a different query."
      icon={<SearchX size={48} />}
    />
    <EmptyState
      variant="default"
      title="No items"
      description="Create your first item to get started."
      icon={<FolderOpen size={48} />}
      action={<Button onClick={() => console.log("create")}>New item</Button>}
    />
    <EmptyState size="sm" title="Empty" />
    <EmptyState variant="error" title="Something went wrong" />
  </>
);
