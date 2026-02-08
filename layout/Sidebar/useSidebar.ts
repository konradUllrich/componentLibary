import { useSidebarStore } from "./sidebarStore";

/**
 * useSidebar Hook
 *
 * Access sidebar state and control from anywhere in the app.
 *
 * @example
 * ```tsx
 * const { isOpen, toggleMobileOpen, toggleCollapsed } = useSidebar();
 * ```
 */
export function useSidebar() {
  const isMobile = useSidebarStore((state) => state.isMobile);
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const toggleCollapsed = useSidebarStore((state) => state.toggleCollapsed);
  const toggleMobileOpen = useSidebarStore((state) => state.toggleMobileOpen);
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);
  const setCollapsed = useSidebarStore((state) => state.setCollapsed);

  const isOpen = isMobile ? mobileOpen : !isCollapsed;

  // Single toggle function that checks mobile state when called
  const toggleSidebar = () => {
    const state = useSidebarStore.getState();
    if (state.isMobile) {
      state.toggleMobileOpen();
    } else {
      state.toggleCollapsed();
    }
  };

  return {
    // State
    isMobile,
    isOpen,
    isCollapsed,
    mobileOpen,

    // Desktop actions
    toggleCollapsed,
    setCollapsed,

    // Mobile actions
    toggleMobileOpen,
    setMobileOpen,

    // Main toggle action
    toggleSidebar,

    // Backward compatibility aliases
    isMobileMenuOpen: mobileOpen,
    openSidebar: () => {
      const state = useSidebarStore.getState();
      if (state.isMobile) {
        state.setMobileOpen(true);
      } else {
        state.setCollapsed(false);
      }
    },
    closeSidebar: () => {
      const state = useSidebarStore.getState();
      if (state.isMobile) {
        state.setMobileOpen(false);
      } else {
        state.setCollapsed(true);
      }
    },
  };
}

export { useSidebarStore } from "./sidebarStore";
