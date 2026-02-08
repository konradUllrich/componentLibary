import { Member } from "@store/boardData";
import { createElement } from "../../util/createElement";
import { getInitialsColor } from "./utils";

import "./UserAvatars.css";

export interface UserAvatarOptions {
  size?: "small" | "medium" | "large";
  showTooltip?: boolean;
  clickable?: boolean;
  showStatus?: boolean;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
  avatarUrl?: string; // Optional avatar image URL
}

export class VanillaUserAvatars {
  createElement = createElement;

  getAccessibleTitle(title: string) {
    return [
      { key: "title", value: title },
      {
        key: "aria-label",
        value: title,
      },
    ];
  }

  getUserInitials(member: Member): string {
    if (member.initials) {
      return member.initials;
    }

    // Generate initials from fullName if not provided
    if (member.fullName) {
      return member.fullName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
    }

    return "??";
  }

  getUserAvatar(member: Member, options: UserAvatarOptions = {}) {
    const {
      size = "medium",
      showTooltip = true,
      clickable = false,
      showStatus = false,
      status = "offline",
      className = "",
      avatarUrl,
    } = options;

    const initials = this.getUserInitials(member);
    const sizeClass =
      size === "small"
        ? "userAvatars-avatarSm"
        : size === "large"
        ? "userAvatars-avatarLg"
        : "userAvatars-avatarMd";

    const avatarClass = `userAvatars-avatar ${sizeClass} ${className}`.trim();

    const color =
      member.avatarColor || getInitialsColor(member.initials || "aa");

    const attributes = [
      { key: "style", value: `background-color: ${color}` },

      ...(showTooltip
        ? this.getAccessibleTitle(member.fullName || initials)
        : []),
      ...(clickable
        ? [
            { key: "tabindex", value: "0" },
            { key: "role", value: "button" },
            { key: "data-user-id", value: member.id?.toString() || "" },
            { key: "data-action", value: "user-avatar-click" },
          ]
        : []),
    ];

    // If avatarUrl is provided in options, use it
    if (avatarUrl) {
      const avatarElement = this.createElement({
        tag: clickable ? "button" : "div",
        class: avatarClass,
        attributes,
        children: [
          this.createElement({
            tag: "img",
            attributes: [
              { key: "src", value: avatarUrl },
              { key: "alt", value: member.fullName || initials },
            ],
          }),
          ...(showStatus ? [this.getStatusIndicator(status)] : []),
        ],
      });
      return avatarElement;
    }

    // Fallback to initials
    const avatarElement = this.createElement({
      tag: clickable ? "button" : "div",
      class: avatarClass,
      attributes,
      children: [
        this.createElement({
          tag: "span",
          text: initials,
        }),
        ...(showStatus ? [this.getStatusIndicator(status)] : []),
      ],
    });

    return avatarElement;
  }

  getStatusIndicator(status: string) {
    return this.createElement({
      tag: "div",
      class: `userAvatars-status userAvatars-${status}`,
      attributes: [...this.getAccessibleTitle(`Status: ${status}`)],
    });
  }

  getUserAvatarGroup(
    members: Member[],
    options: UserAvatarOptions & {
      maxVisible?: number;
      showAddUser?: boolean;
      cardId?: string;
    } = {}
  ) {
    const { maxVisible = 5, showAddUser = false, ...avatarOptions } = options;
    const visibleMembers = members.slice(0, maxVisible);
    const remainingCount = members.length - maxVisible;

    const avatars = visibleMembers.map((member) =>
      this.getUserAvatar(member, avatarOptions)
    );

    if (remainingCount > 0) {
      const sizeClass =
        avatarOptions.size === "small"
          ? "userAvatars-avatarSm"
          : avatarOptions.size === "large"
          ? "userAvatars-avatarLg"
          : "userAvatars-avatarMd";
      avatars.push(
        this.createElement({
          tag: "div",
          class: `userAvatars-avatar ${sizeClass} userAvatars-remainingCount`,
          text: `+${remainingCount}`,
          attributes: [
            ...this.getAccessibleTitle(`${remainingCount} weitere Mitglieder`),
          ],
        })
      );
    }

    // Add the "add user" button if requested
    if (showAddUser) {
      avatars.push(
        this.getAddUserAvatar({
          size: avatarOptions.size || "medium",
          className: avatarOptions.className,
          cardId: options.cardId,
        })
      );
    }

    return this.createElement({
      tag: "div",
      class: "userAvatars-avatarGroup",
      attributes: [...this.getAccessibleTitle(`${members.length} Mitglieder`)],
      children: avatars,
    });
  }

  getAddUserAvatar(options: UserAvatarOptions & { cardId?: string } = {}) {
    const { size = "medium", className = "", cardId } = options;

    const sizeClass =
      size === "small"
        ? "userAvatars-avatarSm"
        : size === "large"
        ? "userAvatars-avatarLg"
        : "userAvatars-avatarMd";
    const avatarClass =
      `userAvatars-avatar ${sizeClass} userAvatars-addUser ${className}`.trim();

    return this.createElement({
      tag: "button",
      class: avatarClass,
      attributes: [
        ...this.getAccessibleTitle("Mitglied hinzufügen"),
        { key: "data-action", value: "add-card-Menmber" },
        { key: "data-card_id", value: cardId || "" },
        { key: "role", value: "button" },
        { key: "tabindex", value: "0" },
      ],
      children: [
        this.createElement({
          tag: "span",
          text: "+",
        }),
      ],
    });
  }
}

// Legacy function for backward compatibility
export const getUserAvatars = (member: Member) => {
  const avatarComponent = new VanillaUserAvatars();
  return avatarComponent.getUserAvatar(member);
};
