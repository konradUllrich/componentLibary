/**
 * Router configuration
 * Controls whether routes use normal URL paths or URL parameters
 */

export type RouterMode = 'url' | 'param';

export interface RouterConfig {
  mode: RouterMode;
  paramName: string; // Name of the URL parameter to use when mode is 'param'
}

/**
 * Default router configuration
 * Can be overridden by environment variables or runtime configuration
 */
export const defaultRouterConfig: RouterConfig = {
  mode: (import.meta.env.VITE_ROUTER_MODE as RouterMode) || 'url',
  paramName: 'route',
};

/**
 * Get the current router configuration
 */
export function getRouterConfig(): RouterConfig {
  return defaultRouterConfig;
}
