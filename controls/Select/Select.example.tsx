import React from "react";
import { Select } from "./Select";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Select } from '@mp-ku/mp-components';

<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
  onValueChange={(value) => console.log(value)}
/>

// With error
<Select
  label="Required"
  error
  errorMessage="Please select an option"
  options={[...]}
/>`;

/** Live render of {@link usageSource}, used on the Select demo page. */
export const UsageExample = () => {
  const [country, setCountry] = React.useState("");

  return (
    <>
      <Select
        label="Country"
        placeholder="Select a country"
        value={country}
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
        onValueChange={setCountry}
      />
      <Select
        label="Required"
        error
        errorMessage="Please select an option"
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
      />
    </>
  );
};
