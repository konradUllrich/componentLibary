import { createContext, useContext } from "react";
import { useSidebarStore as defaultSidebarStore, type SidebarStore } from "./sidebarStore";

/**
 * Holds the sidebar store instance shared by a `<Sidebar>` subtree and any
 * `<SidebarMobileToggle>` rendered as its sibling (e.g. in an `AppLayout`
 * header). `null` means "no ancestor provided one" — consumers fall back to
 * the shared module-scope store from `sidebarStore.ts` to stay
 * backward-compatible with usage outside `<Sidebar>`/`<SidebarProvider>`.
 */
export const SidebarStoreContext = createContext<SidebarStore | null>(null);

/** Resolves the store to render: nearest context store, or the module singleton. */
export function useSidebarStoreContext(): SidebarStore {
  return useContext(SidebarStoreContext) ?? defaultSidebarStore;
}

/** Nearest context store only, without the singleton fallback — used by
 * `<Sidebar>` to decide whether it needs to create its own instance. */
export function useOptionalSidebarStoreContext(): SidebarStore | null {
  return useContext(SidebarStoreContext);
}
