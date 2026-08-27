import React from "react";
import { FormBuilder } from "./FormBuilder";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { FormBuilder } from '@mp-ku/mp-components';

<FormBuilder
  defaultValues={{ name: '', age: 0, newsletter: false }}
  fields={[
    { name: 'name', fieldType: 'text', label: 'Full name', required: true },
    { name: 'age', fieldType: 'number', label: 'Age', min: 0, max: 120 },
    { name: 'newsletter', fieldType: 'checkbox', label: 'Newsletter',
      inlineLabel: 'Send me updates' },
  ]}
  onSubmit={(values) => console.log(values)}
/>`;

/** Live render of {@link usageSource}, used on the FormBuilder demo page. */
export const UsageExample = () => (
  <FormBuilder
    defaultValues={{ name: "", age: 0, newsletter: false }}
    fields={[
      { name: "name", fieldType: "text", label: "Full name", required: true },
      { name: "age", fieldType: "number", label: "Age", min: 0, max: 120 },
      {
        name: "newsletter",
        fieldType: "checkbox",
        label: "Newsletter",
        inlineLabel: "Send me updates",
      },
    ]}
    onSubmit={(values) => console.log(values)}
  />
);
