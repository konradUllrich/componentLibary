import { create, type StoreApi, type UseBoundStore } from "zustand";

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

export type SidebarStore = UseBoundStore<StoreApi<SidebarState>>;

/**
 * Creates a fresh, independent sidebar store. Each `<Sidebar>` (or
 * `<SidebarProvider>`, see `SidebarContext.tsx`) instance gets its own via
 * this factory, so multiple sidebars on one page — or in the same test file
 * — no longer share open/collapsed state.
 */
export function createSidebarStore(): SidebarStore {
  return create<SidebarState>((set) => ({
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
    isCollapsed: false,
    mobileOpen: false,

    setIsMobile: (isMobile) => set({ isMobile }),

    toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

    toggleMobileOpen: () => set((state) => ({ mobileOpen: !state.mobileOpen })),

    setMobileOpen: (open) => set({ mobileOpen: open }),

    setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
  }));
}

/**
 * Backward-compatible module-scope store, used as the fallback when a
 * sidebar component is rendered without a `<Sidebar>`/`<SidebarProvider>`
 * ancestor to read its store from context (see `SidebarContext.tsx`).
 */
export const useSidebarStore = createSidebarStore();
