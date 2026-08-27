/**
 * routeStateStorage – internal utilities for route-scoped storage.
 *
 * Used by the navigation surfaces (useLocation, Link) to restore stored
 * search params when navigating to a route, and by useStoreUrlSync to
 * persist the current route's params on state changes.
 *
 * When reading, localStorage and sessionStorage entries for the same
 * `${prefix}:${path}` key are merged per search-param, not treated as a
 * whole-blob fallback. This is intentional: different `usePersistedState` /
 * `useUrlState` / `useFilter` / `useUrlSort` call sites on the same route
 * can each choose their own `storage` backend (e.g. a `viewMode` toggle
 * persisted to localStorage alongside filters persisted to sessionStorage),
 * so both stores may hold different params for the same route key at once.
 * sessionStorage wins on a per-param key collision, since it reflects the
 * current session's most recent write.
 *
 * NOT exported from the Router public index.
 */
import { getAppRoute, getAppRouteSearchParams } from "./appRouteLocation";

/**
 * Returns the current app route path (without its search portion).
 * Reads the `appRoute` search parameter from the host-page URL.
 */
export function getCurrentPath(): string {
  if (typeof window === "undefined") return "/";
  return getAppRoute();
}

/**
 * Returns the current app route search string (without the leading `?`).
 * Reads directly from `window.location` so it always reflects the latest
 * synchronous `history.replaceState` write — allowing multiple `useUrlState`
 * setters called in the same tick to chain off each other's writes.
 */
export function getCurrentSearch(): string {
  if (typeof window === "undefined") return "";
  return getAppRouteSearchParams();
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
  // Merge both storages per param — different hooks on the same route may
  // persist to different backends (see file header) — sessionStorage wins
  // on a same-key collision.
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
