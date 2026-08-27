import { useSidebarStoreContext } from "./SidebarContext";

/**
 * useSidebar Hook
 *
 * Access sidebar state and control from anywhere inside a `<Sidebar>` or
 * `<SidebarProvider>` subtree.
 *
 * @example
 * ```tsx
 * const { isOpen, toggleMobileOpen, toggleCollapsed } = useSidebar();
 * ```
 */
export function useSidebar() {
  const store = useSidebarStoreContext();

  const isMobile = store((state) => state.isMobile);
  const isCollapsed = store((state) => state.isCollapsed);
  const mobileOpen = store((state) => state.mobileOpen);
  const toggleCollapsed = store((state) => state.toggleCollapsed);
  const toggleMobileOpen = store((state) => state.toggleMobileOpen);
  const setMobileOpen = store((state) => state.setMobileOpen);
  const setCollapsed = store((state) => state.setCollapsed);

  const isOpen = isMobile ? mobileOpen : !isCollapsed;

  // Single toggle function that checks mobile state when called
  const toggleSidebar = () => {
    const state = store.getState();
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
      const state = store.getState();
      if (state.isMobile) {
        state.setMobileOpen(true);
      } else {
        state.setCollapsed(false);
      }
    },
    closeSidebar: () => {
      const state = store.getState();
      if (state.isMobile) {
        state.setMobileOpen(false);
      } else {
        state.setCollapsed(true);
      }
    },
  };
}

export { useSidebarStore } from "./sidebarStore";
