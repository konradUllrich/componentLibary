import React, { useState } from "react";
import { Toggle } from "./Toggle";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Toggle } from '@mp-ku/mp-components';

// Uncontrolled – default variant
<Toggle aria-label="Bold" defaultPressed>
  B
</Toggle>

// Controlled
<Toggle
  pressed={isBold}
  onPressedChange={setIsBold}
  aria-label="Bold"
>
  B
</Toggle>

// Outline variant, small size
<Toggle variant="outline" size="sm" aria-label="Italic">
  I
</Toggle>

// Disabled
<Toggle disabled aria-label="Underline">
  U
</Toggle>

// Sizes: "sm" | "md" (default) | "lg"
// Variants: "default" | "outline"`;

/** Live render of {@link usageSource}, used on the Toggle demo page. */
export const UsageExample = () => {
  const [isBold, setIsBold] = useState(false);

  return (
    <>
      <Toggle aria-label="Bold" defaultPressed>
        B
      </Toggle>
      <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Bold">
        B
      </Toggle>
      <Toggle variant="outline" size="sm" aria-label="Italic">
        I
      </Toggle>
      <Toggle disabled aria-label="Underline">
        U
      </Toggle>
    </>
  );
};
