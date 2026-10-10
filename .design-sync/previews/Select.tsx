import React from 'react';
import { Select, Flex } from '@mp-ku/mp-components';

const countries = [
  { value: 'de', label: 'Germany' },
  { value: 'at', label: 'Austria' },
  { value: 'ch', label: 'Switzerland' },
];

export const Default = () => (
  <Select label="Country" placeholder="Select a country" options={countries} />
);

export const Filled = () => (
  <Select label="Country" defaultValue="de" helperText="Used for tax calculation" options={countries} />
);

export const Variants = () => (
  <Flex direction="column" gap="md">
    <Select variant="outline" size="sm" defaultValue="at" options={countries} />
    <Select variant="filled" size="lg" defaultValue="ch" options={countries} />
  </Flex>
);

export const States = () => (
  <Flex direction="column" gap="md">
    <Select label="Region" defaultValue="de" disabled options={countries} />
    <Select
      label="Department"
      placeholder="Select a department"
      error
      errorMessage="Please select a department"
      options={[
        { value: 'sales', label: 'Sales' },
        { value: 'support', label: 'Support' },
      ]}
    />
  </Flex>
);
