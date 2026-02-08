import React from 'react';
import { UserAvatar, UserAvatars, Text } from '../../common';

const sampleUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com' },
];

export const UserAvatarsPage: React.FC = () => {
  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">User Avatars Component</Text>
        <Text color="secondary">
          Display user avatars individually or in groups with overflow indicator
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Single Avatar</Text>
        <Text color="secondary" size="sm">
          Display a single user avatar
        </Text>
        <div className="component-page__demo">
          <UserAvatar user={sampleUsers[0]} size="sm" />
          <UserAvatar user={sampleUsers[0]} size="md" />
          <UserAvatar user={sampleUsers[0]} size="lg" />
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Avatar Group</Text>
        <Text color="secondary" size="sm">
          Display multiple user avatars with overflow indicator
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Small (max 3 visible)</Text>
            <UserAvatars users={sampleUsers} maxVisible={3} size="sm" />
          </div>
          <div>
            <Text weight="medium" size="sm">Medium (max 4 visible)</Text>
            <UserAvatars users={sampleUsers} maxVisible={4} size="md" />
          </div>
          <div>
            <Text weight="medium" size="sm">Large (max 2 visible)</Text>
            <UserAvatars users={sampleUsers} maxVisible={2} size="lg" />
          </div>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { UserAvatar, UserAvatars } from '@konradullrich/mp-components';

// Single avatar
<UserAvatar 
  user={{ id: '1', name: 'John Doe', email: 'john@example.com' }} 
  size="md" 
/>

// Avatar group
<UserAvatars 
  users={[
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  ]} 
  maxVisible={3}
  size="sm"
/>`}</code>
        </pre>
      </section>
    </div>
  );
};
