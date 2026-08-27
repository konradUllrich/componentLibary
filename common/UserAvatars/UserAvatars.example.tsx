import React from "react";
import { UserAvatar } from "./UserAvatar";
import { UserAvatars } from "./UserAvatars";

/**
 * Source text shown on the demo site's "Usage" section — kept as the single
 * source of truth so the rendered example below and the demo page never drift.
 */
export const usageSource = `import { UserAvatar, UserAvatars } from '@mp-ku/mp-components';

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
/>`;

/** Live render of {@link usageSource}, used on the UserAvatars demo page. */
export const UsageExample = () => (
  <>
    <UserAvatar user={{ id: 1, fullName: "John Doe", initials: "JD" }} size="md" />
    <UserAvatars
      users={[
        { id: 1, fullName: "John Doe", initials: "JD" },
        { id: 2, fullName: "Jane Smith", initials: "JS" },
        { id: 3, fullName: "Bob Johnson", initials: "BJ" },
      ]}
      maxVisible={3}
      size="sm"
    />
  </>
);
