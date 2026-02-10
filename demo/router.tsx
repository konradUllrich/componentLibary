import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { App } from "./App";

import { RouterConfig } from "./routerConfig";

// Root route
const rootRoute = createRootRoute({
  component: App,
});

// Define all routes
export function createAppRouter(config: RouterConfig) {
  // For 'param' mode, all routes are handled at the root level
  // For 'url' mode, routes use normal URL paths

  if (config.mode === "param") {
    // In param mode, we use a single route that handles the parameter
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => null, // Content is rendered by App based on the param
    });

    const routeTree = rootRoute.addChildren([indexRoute]);

    return createRouter({
      routeTree,
      defaultPreload: "intent",
      basepath: import.meta.env.BASE_URL || "/",
    });
  }

  // URL mode - traditional routing
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
  });

  const componentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/components",
  });

  const docsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/docs",
  });

  // Individual component routes
  const componentRoutes = [
    { path: "/components/button", name: "button" },
    { path: "/components/badge", name: "badge" },
    { path: "/components/text", name: "text" },
    { path: "/components/form-controls", name: "form-controls" },
    { path: "/components/panel", name: "panel" },
    { path: "/components/accordion", name: "accordion" },
    { path: "/components/disclosure", name: "disclosure" },
    { path: "/components/pagination", name: "pagination" },
    { path: "/components/tabs", name: "tabs" },
    { path: "/components/user-avatars", name: "user-avatars" },
    { path: "/components/date", name: "date" },
    { path: "/components/table", name: "table" },
    { path: "/components/card-list", name: "card-list" },
    { path: "/components/card", name: "card" },
    { path: "/components/flex", name: "flex" },
    { path: "/components/horizontal-nav", name: "horizontal-nav" },
    { path: "/components/sidebar", name: "sidebar" },
    { path: "/components/app-layout", name: "app-layout" },
    { path: "/components/dialog", name: "dialog" },
    { path: "/components/dropdown", name: "dropdown" },
    { path: "/components/tooltip", name: "tooltip" },
  ].map(({ path }) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
    }),
  );

  const routeTree = rootRoute.addChildren([
    indexRoute,
    componentsRoute,
    docsRoute,
    ...componentRoutes,
  ]);

  return createRouter({
    routeTree,
    defaultPreload: "intent",
    basepath: import.meta.env.BASE_URL || "/",
  });
}

// Export route paths for easy access
export const ROUTES = {
  HOME: "/",
  COMPONENTS: "/components",
  DOCS: "/docs",
  COMPONENT: (name: string) => `/components/${name}`,
};
