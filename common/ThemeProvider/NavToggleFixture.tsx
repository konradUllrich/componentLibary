import React from "react";
import { useThemeEditor } from "./useThemeEditor";

export const NavToggleFixture: React.FC = () => {
  const { isOpen, toggle } = useThemeEditor();
  return (
    <button data-testid="nav-toggle" onClick={toggle}>
      {isOpen ? "open" : "closed"}
    </button>
  );
};
