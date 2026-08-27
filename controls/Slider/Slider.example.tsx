import React, { useState } from "react";
import { Slider } from "./Slider";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Slider } from '@mp-ku/mp-components';

// Controlled slider
const [fontSize, setFontSize] = useState(16);

<Slider
  label={\`Font Size: \${fontSize}px\`}
  value={fontSize}
  min={12}
  max={20}
  onChange={(e) => setFontSize(Number(e.target.value))}
/>

// With error
<Slider
  label="Volume"
  value={volume}
  onChange={(e) => setVolume(Number(e.target.value))}
  error
  errorMessage="Value must be at least 30"
/>`;

/** Live render of {@link usageSource}, used on the Slider demo page. */
export const UsageExample = () => {
  const [fontSize, setFontSize] = useState(16);
  const [volume, setVolume] = useState(20);

  return (
    <>
      <Slider
        label={`Font Size: ${fontSize}px`}
        value={fontSize}
        min={12}
        max={20}
        onChange={(e) => setFontSize(Number(e.target.value))}
      />
      <Slider
        label="Volume"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        error
        errorMessage="Value must be at least 30"
      />
    </>
  );
};
