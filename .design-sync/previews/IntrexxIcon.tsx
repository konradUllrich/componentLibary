import React from 'react';
import { IntrexxIcon, Flex, Text } from '@mp-ku/mp-components';

const sizes = [12, 16, 20, 24, 32, 48] as const;
const colors = ['primary', 'success', 'warning', 'destructive', 'info', 'foreground'] as const;

export const Sizes = () => (
  <Flex gap="md" align="center">
    {sizes.map((size) => (
      <IntrexxIcon key={size} iconClass="icon54-l_BasicIcons-Home" size={size} color="foreground" fixPosition />
    ))}
  </Flex>
);

export const Colors = () => (
  <Flex gap="md" align="center">
    {colors.map((color) => (
      <IntrexxIcon key={color} iconClass="icon54-l_BasicIcons-Star" size={24} color={color} />
    ))}
  </Flex>
);

export const WithLabels = () => (
  <Flex direction="column" gap="sm">
    <Flex gap="sm" align="center">
      <IntrexxIcon iconClass="icon54-l_BasicIcons-Folder" size={20} color="primary" />
      <Text>Projects</Text>
    </Flex>
    <Flex gap="sm" align="center">
      <IntrexxIcon iconClass="icon54-l_BasicIcons-Mail" size={20} color="primary" />
      <Text>Inbox</Text>
    </Flex>
    <Flex gap="sm" align="center">
      <IntrexxIcon iconClass="icon54-l_BasicIcons-Trash" size={20} color="destructive" />
      <Text>Deleted items</Text>
    </Flex>
  </Flex>
);
