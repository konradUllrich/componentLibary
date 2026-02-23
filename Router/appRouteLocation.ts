/**
 * appRouteLocation.ts
 *
 * Custom wouter location and search hooks that store the current route in a
 * URL search parameter (`appRoute`). This is useful when the application is
 * embedded in an environment where the URL path cannot be changed freely
 * (e.g. iframes, static hosts). Navigation still triggers `popstate` events
 * so the browser back/forward buttons work as expected.
 */
import { useCallback, useSyncExternalStore } from "react";
import type { BaseSearchHook, BaseLocationHook } from "wouter";

const APP_ROUTE_KEY = "appRoute";

function getAppRoute() {
  const params = new URLSearchParams(window.location.search);
  const appRoute = params.get(APP_ROUTE_KEY);
  if (!appRoute) return "/";
  return appRoute.split("?")[0];
}

function getAppRouteSearchParams() {
  const params = new URLSearchParams(window.location.search);
  const appRoute = params.get(APP_ROUTE_KEY);
  if (!appRoute) return "";
  const search = appRoute.split("?")[1] || "";
  return search;
}

function setAppRoute(route: string, replace = false) {
  const url = new URL(window.location.href);
  url.searchParams.set(APP_ROUTE_KEY, route);
  if (replace) {
    window.history.replaceState({}, "", url);
  } else {
    window.history.pushState({}, "", url);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export const useAppRouteLocation: BaseLocationHook = () => {
  const subscribe = (listener: () => void) => {
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  };
  const pathname = useSyncExternalStore(subscribe, getAppRoute, getAppRoute);
  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    setAppRoute(to, opts?.replace);
  }, []);

  return [pathname, navigate];
};

export const useAppRouteSearch: BaseSearchHook = () => {
  const subscribe = (listener: () => void) => {
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  };

  return useSyncExternalStore(
    subscribe,
    getAppRouteSearchParams,
    getAppRouteSearchParams,
  );
};
