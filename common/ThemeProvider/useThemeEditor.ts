import { create } from "zustand";

interface ThemeEditorState {
  isOpen: boolean;
  toggle: () => void;
}

/**
 * Shared open/closed state for the ThemePanel, so any component (e.g. a nav
 * toggle button) stays in sync with the panel itself. Plain module state
 * instead of URL sync — keeps ThemePanel usable outside a <Router>.
 */
const useThemeEditorStore = create<ThemeEditorState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function useThemeEditor() {
  const isOpen = useThemeEditorStore((state) => state.isOpen);
  const toggle = useThemeEditorStore((state) => state.toggle);
  return { isOpen, toggle };
}
