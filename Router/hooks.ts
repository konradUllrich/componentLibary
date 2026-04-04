export { useSearch, useParams, useRoute } from "wouter";
export type { SetSearchParams, URLSearchParamsInit } from "wouter";
import { useCallback } from "react";
import {
  useLocation as useWouterLocation,
  useSearchParams as useWouterSearchParams,
} from "wouter";
export { createRoute } from "./createRoute";
import { useRouterConfig } from "./RouterConfigContext";
import { buildDestinationWithState } from "./routeStateStorage";

/**
 * Hook for accessing and modifying search parameters in the URL.
 * Returns a tuple with the current search params string and a setter function.
 *
 * @returns {[string, (searchParams: Record<string, string>) => void]} Tuple containing search params and setter
 *
 * @example
 * const [searchParams, setSearchParams] = useSearchParams();
 * const query = new URLSearchParams(searchParams).get('q');
 * 
 * 
 * import { useSearchParams } from 'wouter';

const [searchParams, setSearchParams] = useSearchParams();

// extract a specific search parameter
const id = searchParams.get('id');

// modify a specific search parameter
setSearchParams((prev) => {
  prev.set('tab', 'settings');
  return prev;
});

// override all search parameters
setSearchParams({
  id: 1234,
  tab: 'settings',
});

// by default, setSearchParams() will push a new history entry
// to avoid this, set `replace` option to `true`
setSearchParams(
  (prev) => {
    prev.set('order', 'desc');
    return prev;
  },
  {
    replace: true,
  },
);

// you can also pass a history state in options
setSearchParams(
  (prev) => {
    prev.set('foo', 'bar');
    return prev;
  },
  {
    state: 'hello',
  },
);
 */
export const useSearchParams = useWouterSearchParams;

/**
 * Hook for reading the current route path and navigating programmatically.
 * Wraps wouter's useLocation to restore persisted route state (search params)
 * from sessionStorage before navigating — keyed by the Router's routeStatePrefix.
 */
export const useLocation = () => {
  const [path, wNavigate] = useWouterLocation();
  const { routeStatePrefix } = useRouterConfig();

  const navigate = useCallback(
    (to: string, opts?: { replace?: boolean }) => {
      wNavigate(buildDestinationWithState(to, routeStatePrefix), opts);
    },
    [wNavigate, routeStatePrefix],
  );

  return [path, navigate] as const;
};

export const useParamState = <T>(
  paramName: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParamValue = (): T => {
    const params = new URLSearchParams(searchParams);
    const value = params.get(paramName);
    return (value !== null ? JSON.parse(value) : defaultValue) as T;
  };

  const setParamValue = (value: T) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, JSON.stringify(value));
    setSearchParams(params.toString());
  };

  return [getParamValue(), setParamValue];
};

/**
 * Hook for navigating programmatically within the router.
 * Returns an object with `navigate` to go to a path and `back` to go back in history.
 *
 * @returns {{ navigate: (to: string, opts?: { replace?: boolean }) => void, back: () => void }}
 *
 * @example
 * const { navigate, back } = useNavigation();
 * navigate('/about');
 * back();
 */
export const useNavigation = () => {
  const [, navigate] = useLocation(); // uses the wrapped useLocation above
  const back = () => window.history.back();
  return { navigate, back };
};
