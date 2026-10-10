import React from 'react';
import { Badge, Flex } from '@mp-ku/mp-components';

export const Variants = () => (
  <Flex gap="sm" wrap align="center">
    <Badge variant="default">Draft</Badge>
    <Badge variant="primary">New</Badge>
    <Badge variant="success">Active</Badge>
    <Badge variant="warning">Pending</Badge>
    <Badge variant="destructive">Overdue</Badge>
    <Badge variant="info">Beta</Badge>
  </Flex>
);

export const Appearances = () => (
  <Flex direction="column" gap="sm">
    <Flex gap="sm" wrap align="center">
      <Badge variant="success" appearance="solid">Solid</Badge>
      <Badge variant="warning" appearance="solid">Solid</Badge>
      <Badge variant="destructive" appearance="solid">Solid</Badge>
    </Flex>
    <Flex gap="sm" wrap align="center">
      <Badge variant="success" appearance="subtle">Subtle</Badge>
      <Badge variant="warning" appearance="subtle">Subtle</Badge>
      <Badge variant="destructive" appearance="subtle">Subtle</Badge>
    </Flex>
    <Flex gap="sm" wrap align="center">
      <Badge variant="success" appearance="outline">Outline</Badge>
      <Badge variant="warning" appearance="outline">Outline</Badge>
      <Badge variant="destructive" appearance="outline">Outline</Badge>
    </Flex>
  </Flex>
);

export const Sizes = () => (
  <Flex gap="sm" wrap align="center">
    <Badge variant="info" size="sm">Small</Badge>
    <Badge variant="info" size="md">Medium</Badge>
    <Badge variant="info" size="lg">Large</Badge>
  </Flex>
);

export const WithIcon = () => (
  <Flex gap="sm" wrap align="center">
    <Badge variant="success" appearance="subtle" icon={<span aria-hidden="true">●</span>}>Online</Badge>
    <Badge variant="warning" appearance="subtle" icon={<span aria-hidden="true">●</span>}>Away</Badge>
    <Badge variant="default" appearance="subtle" icon={<span aria-hidden="true">●</span>}>Offline</Badge>
  </Flex>
);
