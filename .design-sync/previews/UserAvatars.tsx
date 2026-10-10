import React from 'react';
import { UserAvatars, Flex, Text } from '@mp-ku/mp-components';

const team = [
  { id: 1, fullName: 'Anna Weber', initials: 'AW' },
  { id: 2, fullName: 'Lukas Schmidt', initials: 'LS' },
  { id: 3, fullName: 'Maria Garcia', initials: 'MG' },
  { id: 4, fullName: 'Tom Becker', initials: 'TB' },
  { id: 5, fullName: 'Priya Nair', initials: 'PN' },
  { id: 6, fullName: 'Jonas Klein', initials: 'JK' },
  { id: 7, fullName: 'Sofia Rossi', initials: 'SR' },
];

export const Default = () => <UserAvatars users={team.slice(0, 4)} size="md" />;

export const Overflow = () => (
  <Flex gap="sm" align="center">
    <UserAvatars users={team} maxVisible={3} size="md" />
    <Text size="sm" color="secondary">7 members</Text>
  </Flex>
);

export const Sizes = () => (
  <Flex direction="column" gap="md" align="flex-start">
    <UserAvatars users={team} maxVisible={4} size="sm" />
    <UserAvatars users={team} maxVisible={4} size="md" />
    <UserAvatars users={team} maxVisible={4} size="lg" />
  </Flex>
);
