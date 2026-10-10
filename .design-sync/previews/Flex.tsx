import React from 'react';
import { Flex, Text, Badge, Button } from '@mp-ku/mp-components';

const box: React.CSSProperties = {
  padding: 'var(--mp-spacing-3) var(--mp-spacing-4)',
  background: 'var(--mp-color-background-light)',
  border: '1px solid var(--mp-color-border)',
  borderRadius: 'var(--mp-radius-md)',
};

const swatch: React.CSSProperties = {
  width: 48,
  height: 28,
  background: 'var(--mp-color-primary-light)',
  border: '1px solid var(--mp-color-primary)',
  borderRadius: 'var(--mp-radius-sm)',
};

export const RowSpaceBetween = () => (
  <Flex direction="row" justify="space-between" align="center" gap="md" style={{ width: 420 }}>
    <div style={box}><Text size="sm">Draft</Text></div>
    <div style={box}><Text size="sm">In review</Text></div>
    <div style={box}><Text size="sm">Published</Text></div>
  </Flex>
);

export const Column = () => (
  <Flex direction="column" gap="sm" style={{ width: 260 }}>
    <div style={box}><Text size="sm" weight="semibold">Account details</Text></div>
    <div style={box}><Text size="sm">Notification settings</Text></div>
    <div style={box}><Text size="sm">Security and login</Text></div>
  </Flex>
);

export const Gaps = () => (
  <Flex direction="column" gap="md">
    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((g) => (
      <Flex key={g} gap={g} align="center">
        <Text size="xs" color="secondary" style={{ width: 24 }}>{g}</Text>
        <div style={swatch} />
        <div style={swatch} />
        <div style={swatch} />
      </Flex>
    ))}
  </Flex>
);

export const Wrapping = () => (
  <Flex wrap gap="sm" style={{ width: 300 }}>
    {['Design', 'Frontend', 'Backend', 'Accessibility', 'Testing', 'Documentation', 'DevOps'].map((tag) => (
      <Badge key={tag} variant="info" appearance="subtle">{tag}</Badge>
    ))}
  </Flex>
);

export const Toolbar = () => (
  <Flex justify="space-between" align="center" gap="md" style={{ width: 440 }}>
    <Text weight="semibold">12 selected</Text>
    <Flex gap="sm">
      <Button variant="secondary" size="sm">Export</Button>
      <Button variant="destructive" size="sm">Delete</Button>
    </Flex>
  </Flex>
);
