import { createContext, useContext } from "react";

export interface RouterConfig {
  /**
   * Namespace prefix for route-scoped sessionStorage keys.
   * Each Router instance should use a unique value when multiple routers
   * exist on the same page to prevent state collisions.
   * @default "mp-route"
   */
  routeStatePrefix: string;
}

export const RouterConfigContext = createContext<RouterConfig>({
  routeStatePrefix: "mp-route",
});

/**
 * Returns the current RouterConfig. Falls back to defaults when called
 * outside a Router provider (routeStatePrefix = "mp-route").
 */
export const useRouterConfig = (): RouterConfig => {
  return useContext(RouterConfigContext);
};
