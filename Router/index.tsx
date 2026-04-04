import type { FC } from "react";
import { Router as WRouter } from "wouter";
import { useAppRouteLocation, useAppRouteSearch } from "./appRouteLocation";
import { RouterConfigContext } from "./RouterConfigContext";

export { Route, Switch } from "wouter";
export { Link } from "./Link";
export type { LinkProps } from "./Link";

export interface RouterProps {
  children?: React.ReactNode;
  /**
   * Namespace prefix for route-scoped sessionStorage keys.
   * Use a unique value per Router instance when multiple routers exist on the
   * same page to prevent state collisions.
   * @default "mp-route"
   */
  routeStatePrefix?: string;
}

/**
 * Router – param-based application router built on top of wouter.
 *
 * Stores the current route in the `appRoute` URL search parameter instead of
 * the URL path. This allows the library to be embedded in environments where
 * the host controls the URL path (e.g. iframes, GitHub Pages).
 *
 * Use `Route` and `Link` (re-exported from wouter) together with this
 * `Router` wrapper.
 *
 * @example
 * ```tsx
 * import { Router, Route, Link } from '@konradullrich/mp-components';
 *
 * <Router>
 *   <nav>
 *     <Link href="/">Home</Link>
 *     <Link href="/about">About</Link>
 *   </nav>
 *   <Route path="/">Home page</Route>
 *   <Route path="/about">About page</Route>
 * </Router>
 * ```
 */

export const Router: FC<RouterProps> = ({
  children,
  routeStatePrefix = "mp-route",
}) => {
  return (
    <RouterConfigContext.Provider value={{ routeStatePrefix }}>
      <WRouter hook={useAppRouteLocation} searchHook={useAppRouteSearch}>
        {children}
      </WRouter>
    </RouterConfigContext.Provider>
  );
};

Router.displayName = "Router";
