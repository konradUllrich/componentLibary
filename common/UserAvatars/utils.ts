export const getInitialsColor = (initials: string) => {
  const colors = [
    "var(--mp-color-avatar-1)", // red
    "var(--mp-color-avatar-2)", // orange
    "var(--mp-color-avatar-3)", // amber
    "var(--mp-color-avatar-4)", // yellow
    "var(--mp-color-avatar-5)", // lime
    "var(--mp-color-avatar-6)", // green
    "var(--mp-color-avatar-7)", // emerald
    "var(--mp-color-avatar-8)", // teal
    "var(--mp-color-avatar-9)", // cyan
    "var(--mp-color-avatar-10)", // sky
    "var(--mp-color-avatar-11)", // blue
    "var(--mp-color-avatar-12)", // indigo
    "var(--mp-color-avatar-13)", // violet
    "var(--mp-color-avatar-14)", // purple
    "var(--mp-color-avatar-15)", // fuchsia
    "var(--mp-color-avatar-16)", // pink
    "var(--mp-color-avatar-17)", // rose
  ];
  const charCode = initials.charCodeAt(0) + initials.charCodeAt(1);
  return colors[charCode % colors.length];
};
