import React from 'react';
import { Button, Flex } from '@mp-ku/mp-components';

export const Variants = () => (
  <Flex gap="md" wrap align="center">
    <Button variant="primary">Save changes</Button>
    <Button variant="secondary">Cancel</Button>
    <Button variant="destructive">Delete</Button>
    <Button variant="ghost">Learn more</Button>
  </Flex>
);

export const Sizes = () => (
  <Flex gap="md" wrap align="center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </Flex>
);

export const States = () => (
  <Flex gap="md" wrap align="center">
    <Button disabled>Disabled</Button>
    <Button variant="secondary" disabled>Disabled</Button>
    <Button variant="destructive" disabled>Disabled</Button>
  </Flex>
);
