/**
 * routeStateStorage – internal utilities for route-scoped storage.
 *
 * Used by the navigation surfaces (useLocation, Link) to restore stored
 * search params when navigating to a route, and by useStoreUrlSync to
 * persist the current route's params on state changes.
 *
 * When reading, sessionStorage is checked first, then localStorage as a
 * fallback — allowing params to survive across sessions when the consumer
 * writes the key to localStorage using the same `${prefix}:${path}` format.
 *
 * NOT exported from the Router public index.
 */

/**
 * Returns the current app route path (without its search portion).
 * Reads the `appRoute` search parameter from the host-page URL.
 */
export function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  const params = new URLSearchParams(window.location.search);
  const appRoute = params.get("appRoute");
  if (!appRoute) return "/";
  return appRoute.split("?")[0];
}

/**
 * Returns the current app route search string (without the leading `?`).
 * Reads directly from `window.location` so it always reflects the latest
 * synchronous `history.replaceState` write — allowing multiple `useUrlState`
 * setters called in the same tick to chain off each other's writes.
 */
export function getCurrentSearch(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const appRoute = params.get("appRoute");
  if (!appRoute) return "";
  return appRoute.split("?")[1] ?? "";
}

/**
 * Given a navigation destination and a namespace prefix, returns the
 * destination with stored search params appended — unless the destination
 * already contains explicit search params (explicit always wins).
 *
 * @example
 * // sessionStorage has "mp-route:/items" = "page=3&pageSize=25"
 * buildDestinationWithState("/items", "mp-route") // → "/items?page=3&pageSize=25"
 * buildDestinationWithState("/items?page=1", "mp-route") // → "/items?page=1"  (explicit wins)
 */
export function buildDestinationWithState(
  destination: string,
  prefix: string,
): string {
  const questionIdx = destination.indexOf("?");
  if (questionIdx !== -1) {
    // Destination already has explicit search params — leave untouched.
    return destination;
  }

  if (typeof window === "undefined") return destination;

  const key = `${prefix}:${destination}`;
  // Merge both storages — localStorage provides the baseline, sessionStorage
  // params override it (same-key sessionStorage wins).
  const localStored = localStorage.getItem(key) ?? "";
  const sessionStored = sessionStorage.getItem(key) ?? "";

  if (!localStored && !sessionStored) return destination;

  const merged = new URLSearchParams(localStored);
  for (const [k, v] of new URLSearchParams(sessionStored)) {
    merged.set(k, v);
  }
  const str = merged.toString();
  return str ? `${destination}?${str}` : destination;
}
