import type { FC, PropsWithChildren } from "react";
import { Router as WRouter } from "wouter";
import { useAppRouteLocation, useAppRouteSearch } from "./appRouteLocation";

export { Route, Link } from "wouter";
export {
  useSearch,
  useLocation,
  useParams,
  useRoute,
  useSearchParams,
} from "./hooks";

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
export const Router: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WRouter hook={useAppRouteLocation} searchHook={useAppRouteSearch}>
      {children}
    </WRouter>
  );
};

Router.displayName = "Router";
