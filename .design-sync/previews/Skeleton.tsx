import React from 'react';
import { Skeleton, Flex, Text } from '@mp-ku/mp-components';

export const Shapes = () => (
  <Flex gap="lg" align="center">
    <Skeleton variant="circle" width={48} height={48} />
    <Skeleton variant="rectangle" width={120} height={72} />
    <div style={{ width: 160 }}>
      <Skeleton variant="text" lines={3} />
    </div>
  </Flex>
);

export const ProfileRow = () => (
  <div style={{ width: 320 }}>
    <Flex gap="md" align="center">
      <Skeleton variant="circle" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="45%" />
        <Skeleton variant="text" width="75%" />
      </div>
    </Flex>
  </div>
);

export const CardPlaceholder = () => (
  <div style={{ width: 280 }}>
    <Flex direction="column" gap="sm">
      <Skeleton variant="rectangle" height={140} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" lines={2} />
    </Flex>
  </div>
);

export const Animations = () => (
  <Flex direction="column" gap="sm" style={{ width: 280 }}>
    {(['pulse', 'wave', 'none'] as const).map((a) => (
      <Flex key={a} gap="md" align="center">
        <Text size="sm" color="secondary" style={{ width: 48 }}>{a}</Text>
        <div style={{ flex: 1 }}>
          <Skeleton variant="rectangle" height={24} animation={a} />
        </div>
      </Flex>
    ))}
  </Flex>
);
