import React from "react";
import { UserAvatar, UserAvatars, Text } from "../../common";
import { Flex, Page, Section } from "../../layout";
import { u } from "../../utils";

const sampleUsers = [
  { id: 1, fullName: "John Doe", initials: "JD" },
  { id: 2, fullName: "Jane Smith", initials: "JS" },
  { id: 3, fullName: "Bob Johnson", initials: "BJ" },
  { id: 4, fullName: "Alice Williams", initials: "AW" },
  { id: 5, fullName: "Charlie Brown", initials: "CB" },
];

export const UserAvatarsPage: React.FC = () => {
  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          User Avatars Component
        </Text>
        <Text color="secondary">
          Display user avatars individually or in groups with overflow indicator
        </Text>
      </Section>

      <Section title="Single Avatar" subtitle="Display a single user avatar">
        <Flex gap="md" wrap className={u({ pt: 4 })}>
          <UserAvatar user={sampleUsers[0]} size="sm" />
          <UserAvatar user={sampleUsers[0]} size="md" />
          <UserAvatar user={sampleUsers[0]} size="lg" />
        </Flex>
      </Section>

      <Section title="Avatar Group" subtitle="Display multiple user avatars with overflow indicator">
        <Flex gap="md" wrap justify="space-between" className={u({ pt: 4 })}>
          <div>
            <Text weight="medium" size="sm">
              Small (max 3 visible)
            </Text>
            <UserAvatars users={sampleUsers} maxVisible={3} size="sm" />
          </div>
          <div>
            <Text weight="medium" size="sm">
              Medium (max 4 visible)
            </Text>
            <UserAvatars users={sampleUsers} maxVisible={4} size="md" />
          </div>
          <div>
            <Text weight="medium" size="sm">
              Large (max 2 visible)
            </Text>
            <UserAvatars users={sampleUsers} maxVisible={2} size="lg" />
          </div>
        </Flex>
      </Section>

      <Section title="Usage">
        <pre className="code-block">
          <code>{`import { UserAvatar, UserAvatars } from '@konradullrich/mp-components';

// Single avatar
<UserAvatar 
  user={{ id: 1, fullName: 'John Doe', initials: 'JD' }} 
  size="md" 
/>

// Avatar group
<UserAvatars 
  users={[
    { id: 1, fullName: 'John Doe', initials: 'JD' },
    { id: 2, fullName: 'Jane Smith', initials: 'JS' },
    { id: 3, fullName: 'Bob Johnson', initials: 'BJ' },
  ]} 
  maxVisible={3}
  size="sm"
/>`}</code>
        </pre>
      </Section>
    </Page>
  );
};
