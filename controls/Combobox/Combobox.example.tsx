import React, { useState } from "react";
import { Combobox } from "./Combobox";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Combobox } from '@mp-ku/mp-components';

<Combobox
  label="Country"
  placeholder="Search countries..."
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
  value={selected}
  onValueChange={(value) => console.log(value)}
/>

// With error
<Combobox
  label="Required"
  error
  errorMessage="Please select a valid option"
  options={[...]}
/>

// With disabled options
<Combobox
  label="Options"
  options={[
    { value: "1", label: "Available" },
    { value: "2", label: "Unavailable", disabled: true },
  ]}
/>`;

/** Live render of {@link usageSource}, used on the Combobox demo page. */
export const UsageExample = () => {
  const [selected, setSelected] = useState("");

  return (
    <>
      <Combobox
        label="Country"
        placeholder="Search countries..."
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
        value={selected}
        onValueChange={(value) => setSelected(value)}
      />
      <Combobox
        label="Required"
        error
        errorMessage="Please select a valid option"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
      <Combobox
        label="Options"
        options={[
          { value: "1", label: "Available" },
          { value: "2", label: "Unavailable", disabled: true },
        ]}
      />
    </>
  );
};
