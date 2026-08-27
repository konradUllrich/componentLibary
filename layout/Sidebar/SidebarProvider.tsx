import React, { useState } from "react";
import { createSidebarStore } from "./sidebarStore";
import { SidebarStoreContext } from "./SidebarContext";

export interface SidebarProviderProps {
  children?: React.ReactNode;
}

/**
 * Scopes a sidebar store to everything rendered inside it, so a `<Sidebar>`
 * and a `<SidebarMobileToggle>` rendered as siblings (e.g. `AppLayout`'s
 * `sidebar` and `header` slots) share one instance's state, independent of
 * any other `<SidebarProvider>`/`<Sidebar>` on the page.
 *
 * `AppLayout` wraps its `header`/`sidebar`/`children` in this automatically —
 * reach for it directly only when composing a layout by hand.
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [store] = useState(() => createSidebarStore());

  return (
    <SidebarStoreContext.Provider value={store}>
      {children}
    </SidebarStoreContext.Provider>
  );
}

SidebarProvider.displayName = "SidebarProvider";
