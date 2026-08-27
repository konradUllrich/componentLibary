import React, { useState } from "react";
import { IconPicker } from "./IconPicker";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { IconPicker } from '@mp-ku/mp-components/intrexx';

function MyComponent() {
  const [selectedIcon, setSelectedIcon] = useState('');

  return (
    <IconPicker
      selectedIcon={selectedIcon}
      onSelectIcon={(icon) => setSelectedIcon(icon.className)}
      defaultStyle="line"
      maxHeight="600px"
    />
  );
}`;

/** Live render of {@link usageSource}. */
export const UsageExample = () => {
  const [selectedIcon, setSelectedIcon] = useState("");

  return (
    <IconPicker
      selectedIcon={selectedIcon}
      onSelectIcon={(icon) => setSelectedIcon(icon.className)}
      defaultStyle="line"
      maxHeight="600px"
    />
  );
};
