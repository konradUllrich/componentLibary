import React from "react";
import { Input } from "./Input";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { Input } from '@mp-ku/mp-components';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

<Input
  label="Username"
  error
  errorMessage="Username is required"
/>

<Input
  variant="filled"
  size="lg"
  placeholder="Large filled input"
/>`;

/** Live render of {@link usageSource}, used on the Input demo page. */
export const UsageExample = () => (
  <>
    <Input
      label="Email"
      type="email"
      placeholder="Enter your email"
      helperText="We'll never share your email"
    />
    <Input label="Username" error errorMessage="Username is required" />
    <Input variant="filled" size="lg" placeholder="Large filled input" />
  </>
);
