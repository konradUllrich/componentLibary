import React from 'react';
import { Input, Flex } from '@mp-ku/mp-components';

export const Default = () => (
  <Input
    label="Email"
    type="email"
    placeholder="jane.doe@example.com"
    helperText="We'll never share your email"
  />
);

export const Variants = () => (
  <Flex direction="column" gap="md">
    <Input variant="default" label="Default" defaultValue="Jane Doe" />
    <Input variant="outline" label="Outline" defaultValue="Jane Doe" />
    <Input variant="filled" label="Filled" defaultValue="Jane Doe" />
  </Flex>
);

export const Sizes = () => (
  <Flex direction="column" gap="md">
    <Input size="sm" placeholder="Small input" />
    <Input size="md" placeholder="Medium input" />
    <Input size="lg" placeholder="Large input" />
  </Flex>
);

export const States = () => (
  <Flex direction="column" gap="md">
    <Input label="Company" defaultValue="Acme GmbH" disabled />
    <Input label="Username" defaultValue="j" error errorMessage="Username must be at least 3 characters" />
  </Flex>
);
