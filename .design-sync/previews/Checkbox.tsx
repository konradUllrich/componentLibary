import React from 'react';
import { Checkbox, Flex } from '@mp-ku/mp-components';

export const Default = () => (
  <Flex direction="column" gap="md">
    <Checkbox label="Notifications" inlineLabel="Email me product updates" />
    <Checkbox inlineLabel="Remember me on this device" defaultChecked />
  </Flex>
);

export const Variants = () => (
  <Flex gap="xl">
    <Flex direction="column" gap="sm">
      <Checkbox variant="default" inlineLabel="Default" />
      <Checkbox variant="default" inlineLabel="Default" defaultChecked />
    </Flex>
    <Flex direction="column" gap="sm">
      <Checkbox variant="outline" inlineLabel="Outline" />
      <Checkbox variant="outline" inlineLabel="Outline" defaultChecked />
    </Flex>
    <Flex direction="column" gap="sm">
      <Checkbox variant="filled" inlineLabel="Filled" />
      <Checkbox variant="filled" inlineLabel="Filled" defaultChecked />
    </Flex>
  </Flex>
);

export const Toggle = () => (
  <Flex direction="column" gap="md">
    <Checkbox variant="toggle" label="Appearance" inlineLabel="Enable dark mode" defaultChecked />
    <Checkbox variant="toggle" inlineLabel="Show weekends in calendar" />
  </Flex>
);

export const States = () => (
  <Flex direction="column" gap="md">
    <Checkbox inlineLabel="Archived projects (disabled)" disabled />
    <Checkbox inlineLabel="Admin access (disabled)" disabled defaultChecked />
    <Checkbox
      label="Terms"
      inlineLabel="I accept the terms of service"
      required
      error
      errorMessage="You must accept the terms"
    />
  </Flex>
);
