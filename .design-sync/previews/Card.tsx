import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, Button, Text, Flex, Badge } from '@mp-ku/mp-components';

export const Basic = () => (
  <Card variant="elevated" padding="md" style={{ maxWidth: 360 }}>
    <CardHeader>
      <Flex justify="space-between" align="center">
        <Text as="h3" size="lg" weight="semibold">Website relaunch</Text>
        <Badge variant="success" appearance="subtle">Active</Badge>
      </Flex>
    </CardHeader>
    <CardContent>
      <Text color="secondary">Redesign of the public website including the new CMS integration.</Text>
    </CardContent>
    <CardFooter>
      <Flex gap="sm" justify="flex-end">
        <Button variant="secondary" size="sm">Details</Button>
        <Button size="sm">Open project</Button>
      </Flex>
    </CardFooter>
  </Card>
);

export const Variants = () => (
  <Flex gap="md" wrap>
    <Card variant="flat" padding="md" style={{ width: 180 }}>
      <Text weight="semibold">Flat</Text>
      <Text size="sm" color="secondary">No border, no shadow</Text>
    </Card>
    <Card variant="outlined" padding="md" style={{ width: 180 }}>
      <Text weight="semibold">Outlined</Text>
      <Text size="sm" color="secondary">Subtle border</Text>
    </Card>
    <Card variant="elevated" padding="md" style={{ width: 180 }}>
      <Text weight="semibold">Elevated</Text>
      <Text size="sm" color="secondary">Raised with shadow</Text>
    </Card>
  </Flex>
);

export const Interactive = () => (
  <Card variant="outlined" padding="md" interactive style={{ maxWidth: 360 }}>
    <Text weight="semibold">Clickable card</Text>
    <Text size="sm" color="secondary">The whole card acts as a single click target.</Text>
  </Card>
);
