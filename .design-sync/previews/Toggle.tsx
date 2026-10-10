import React from 'react';
import { Toggle, Flex, Text } from '@mp-ku/mp-components';

export const Default = () => (
  <Flex gap="sm" align="center">
    <Toggle variant="outline" aria-label="Bold" defaultPressed><strong>B</strong></Toggle>
    <Toggle variant="outline" aria-label="Italic"><em>I</em></Toggle>
    <Toggle variant="outline" aria-label="Underline"><span style={{ textDecoration: 'underline' }}>U</span></Toggle>
  </Flex>
);

// Note: the `default` variant's unpressed state is not shown — its text uses
// --mp-color-onPrimary on a transparent background and is invisible (library bug).
export const Variants = () => (
  <Flex gap="lg" align="center">
    <Flex direction="column" gap="xs" align="flex-start">
      <Text size="sm" color="secondary">Default (pressed)</Text>
      <Toggle variant="default" defaultPressed>Show archived</Toggle>
    </Flex>
    <Flex direction="column" gap="xs" align="flex-start">
      <Text size="sm" color="secondary">Outline</Text>
      <Flex gap="sm" align="center">
        <Toggle variant="outline">Show archived</Toggle>
        <Toggle variant="outline" defaultPressed>Show archived</Toggle>
      </Flex>
    </Flex>
  </Flex>
);

export const Sizes = () => (
  <Flex gap="sm" align="center">
    <Toggle variant="outline" size="sm" defaultPressed>Small</Toggle>
    <Toggle variant="outline" size="md" defaultPressed>Medium</Toggle>
    <Toggle variant="outline" size="lg" defaultPressed>Large</Toggle>
  </Flex>
);

export const Disabled = () => (
  <Flex gap="sm" align="center">
    <Toggle variant="outline" disabled>Notifications</Toggle>
    <Toggle variant="outline" disabled defaultPressed>Notifications</Toggle>
  </Flex>
);
