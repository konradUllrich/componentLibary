import { create } from "zustand";

export interface SidebarState {
  isMobile: boolean;
  isCollapsed: boolean;
  mobileOpen: boolean;

  // Actions
  setIsMobile: (isMobile: boolean) => void;
  toggleCollapsed: () => void;
  toggleMobileOpen: () => void;
  setMobileOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  isCollapsed: false,
  mobileOpen: false,

  setIsMobile: (isMobile) => set({ isMobile }),

  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

  toggleMobileOpen: () => set((state) => ({ mobileOpen: !state.mobileOpen })),

  setMobileOpen: (open) => set({ mobileOpen: open }),

  setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
}));
