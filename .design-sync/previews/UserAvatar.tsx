import React from 'react';
import { UserAvatar, Flex } from '@mp-ku/mp-components';

const anna = { id: 1, fullName: 'Anna Weber', initials: 'AW' };

export const Sizes = () => (
  <Flex gap="md" align="center">
    <UserAvatar user={anna} size="sm" />
    <UserAvatar user={anna} size="md" />
    <UserAvatar user={anna} size="lg" />
  </Flex>
);

export const Colors = () => (
  <Flex gap="sm" align="center">
    <UserAvatar size="md" user={{ id: 1, fullName: 'Anna Weber', initials: 'AW' }} />
    <UserAvatar size="md" user={{ id: 2, fullName: 'Lukas Schmidt', initials: 'LS' }} />
    <UserAvatar size="md" user={{ id: 3, fullName: 'Maria Garcia', initials: 'MG' }} />
    <UserAvatar size="md" user={{ id: 4, fullName: 'Tom Becker', initials: 'TB' }} />
    <UserAvatar size="md" user={{ id: 5, fullName: 'Priya Nair', initials: 'PN', avatarColor: '#1f6f8b' }} />
  </Flex>
);
