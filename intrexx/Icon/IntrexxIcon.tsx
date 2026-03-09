import React from "react";
import clsx from "clsx";

export type IntrexxIconProps = {
  iconClass?: string;
  className?: string;
};

export const IntrexxIcon: React.FC<IntrexxIconProps> = ({
  iconClass,
  className = "",
}) => {
  return <i className={clsx(iconClass, className)} aria-hidden="true" />;
};
