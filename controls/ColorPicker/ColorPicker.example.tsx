import React, { useState } from "react";
import { ColorPicker } from "./ColorPicker";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { ColorPicker } from '@mp-ku/mp-components';

// Controlled color picker
const [color, setColor] = useState("#7c3aed");

<ColorPicker
  label="Primary Color"
  value={color}
  onValueChange={setColor}
/>

// With error
<ColorPicker
  label="Brand Color"
  value={color}
  onValueChange={setColor}
  error
  errorMessage="This color does not meet contrast requirements"
/>`;

/** Live render of {@link usageSource}, used on the ColorPicker demo page. */
export const UsageExample = () => {
  const [color, setColor] = useState("#7c3aed");

  return (
    <>
      <ColorPicker label="Primary Color" value={color} onValueChange={setColor} />
      <ColorPicker
        label="Brand Color"
        value={color}
        onValueChange={setColor}
        error
        errorMessage="This color does not meet contrast requirements"
      />
    </>
  );
};
