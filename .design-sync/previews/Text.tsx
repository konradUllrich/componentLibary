import React from 'react';
import { Text, Flex } from '@mp-ku/mp-components';

export const Headings = () => (
  <Flex direction="column" gap="sm">
    <Text as="h1" size="3xl" weight="bold">Project overview</Text>
    <Text as="h2" size="2xl" weight="semibold">Quarterly report</Text>
    <Text as="h3" size="xl" weight="semibold">Open tasks</Text>
    <Text as="h4" size="lg" weight="medium">Assigned to you</Text>
  </Flex>
);

export const BodyText = () => (
  <Flex direction="column" gap="sm" style={{ maxWidth: 420 }}>
    <Text as="p">
      The component library provides accessible building blocks for internal tools, built on Radix UI primitives.
    </Text>
    <Text as="p" size="sm" color="secondary">
      Last updated 10 October 2026 by the platform team.
    </Text>
    <Text as="p" size="xs" color="tertiary">Version 0.1.16</Text>
  </Flex>
);

export const Colors = () => (
  <Flex direction="column" gap="xs">
    <Text color="default">Default text</Text>
    <Text color="primary">Primary text</Text>
    <Text color="success">Changes saved successfully</Text>
    <Text color="warning">Your session expires in 5 minutes</Text>
    <Text color="destructive">The file could not be uploaded</Text>
  </Flex>
);

export const Truncated = () => (
  <div style={{ maxWidth: 320 }}>
    <Text truncate={2}>
      Long descriptions are clamped to a fixed number of lines so list rows keep a consistent height, even when the source text is considerably longer than the available space allows.
    </Text>
  </div>
);
