import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { ToggleGroup, ToggleGroupItem } from '@mp-ku/mp-components';

// Single selection (exclusive)
<ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">Right</ToggleGroupItem>
</ToggleGroup>

// Multiple selection (controlled)
<ToggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  aria-label="Text formatting"
>
  <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
</ToggleGroup>

// Outline variant, small size
<ToggleGroup type="single" variant="outline" size="sm" aria-label="Alignment">
  <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Right">R</ToggleGroupItem>
</ToggleGroup>

// Disable the entire group
<ToggleGroup type="single" disabled aria-label="Disabled group">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
</ToggleGroup>

// Sizes: "sm" | "md" (default) | "lg"
// Variants: "default" | "outline"`;

/** Live render of {@link usageSource}, used on the ToggleGroup demo page. */
export const UsageExample = () => {
  const [formatting, setFormatting] = useState<string[]>(["bold"]);

  return (
    <>
      <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        type="multiple"
        value={formatting}
        onValueChange={setFormatting}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" size="sm" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">
          L
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          R
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" disabled aria-label="Disabled group">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    </>
  );
};
