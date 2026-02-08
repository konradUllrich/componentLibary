import React from "react";
import clsx from "clsx";
import "./UserAvatars.css";
import { UserAvatar, User } from "./UserAvatar";

export interface UserAvatarsProps {
  users: User[];
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * UserAvatars Component
 *
 * Displays multiple user avatars in a group with overflow indicator.
 */
export const UserAvatars = React.forwardRef<HTMLDivElement, UserAvatarsProps>(
  ({ users, maxVisible = 3, size = "sm", className }, ref) => {
    if (users.length === 0) {
      return <span className="user-avatars__empty">-</span>;
    }

    const visibleUsers = users.slice(0, maxVisible);
    const remainingCount = users.length - maxVisible;

    return (
      <div ref={ref} className={clsx("user-avatars", className)}>
        <div className="user-avatars__group">
          {visibleUsers.map((user) => (
            <UserAvatar
              key={user.id}
              user={user}
              size={size}
              className="user-avatars__item"
            />
          ))}
          {remainingCount > 0 && (
            <div
              className={clsx(
                "user-avatar",
                `user-avatar--${size}`,
                "user-avatars__item",
                "user-avatars__item--remaining",
              )}
              style={{ zIndex: 0 }}
              title={`+${remainingCount} more`}
            >
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    );
  },
);

UserAvatars.displayName = "UserAvatars";
