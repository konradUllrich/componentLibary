import React from "react";
import clsx from "clsx";
import "./UserAvatars.css";
import { getInitialsColor } from "./utils";

export interface User {
  id: number;
  fullName: string;
  initials: string;
  avatarColor?: string | null;
}

export interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
}

/**
 * UserAvatar Component
 *
 * Displays a single user avatar with initials or image.
 */
export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, size = "sm", showTooltip = true, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("user-avatar", `user-avatar--${size}`, className)}
        style={{
          backgroundColor: user.avatarColor || getInitialsColor(user.initials),
        }}
        title={showTooltip ? user.fullName : undefined}
      >
        {user.initials}
      </div>
    );
  },
);

UserAvatar.displayName = "UserAvatar";
