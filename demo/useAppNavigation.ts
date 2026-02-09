import { useNavigate, useSearch, useLocation } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { getRouterConfig } from "./routerConfig";

// Type for search params when in param mode
type SearchParams = Record<string, string | undefined>;

/**
 * Custom navigation hook that handles both URL and param modes
 */
export function useAppNavigation() {
  const navigate = useNavigate();
  const config = getRouterConfig();
  const search = useSearch({ strict: false }) as SearchParams;
  const location = useLocation();

  // Get current route from URL or param
  const currentRoute = useMemo(() => {
    if (config.mode === "param") {
      return search[config.paramName] || "/";
    }
    return location.pathname;
  }, [config, search, location.pathname]);

  // Navigate to a route
  const navigateTo = useCallback(
    (path: string) => {
      if (config.mode === "param") {
        // In param mode, update the URL parameter
        navigate({
          to: "/",
          search: { [config.paramName]: path },
        });
      } else {
        // In URL mode, navigate normally
        navigate({ to: path });
      }
    },
    [config, navigate],
  );

  // Check if a route is active
  const isRouteActive = useCallback(
    (path: string) => {
      return currentRoute === path || currentRoute.startsWith(path + "/");
    },
    [currentRoute],
  );

  // Get the current page and component from the route
  const { currentPage, currentComponent } = useMemo(() => {
    const route = currentRoute;

    if (route === "/" || route === "") {
      return { currentPage: "home", currentComponent: null };
    }

    if (route === "/docs") {
      return { currentPage: "docs", currentComponent: null };
    }

    if (route === "/components") {
      return { currentPage: "components", currentComponent: null };
    }

    if (route.startsWith("/components/")) {
      const component = route.replace("/components/", "");
      return { currentPage: "components", currentComponent: component };
    }

    return { currentPage: "home", currentComponent: null };
  }, [currentRoute]);

  return {
    currentRoute,
    currentPage,
    currentComponent,
    navigateTo,
    isRouteActive,
    routerMode: config.mode,
  };
}
