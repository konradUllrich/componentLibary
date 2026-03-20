import { useParams as useWouterParams, useLocation } from "wouter";

type SearchParams = Record<string, string | number | boolean | undefined>;

function buildSearch(search?: SearchParams) {
  if (!search) return "";

  const params = new URLSearchParams();

  for (const [k, v] of Object.entries(search)) {
    if (v !== undefined) params.set(k, String(v));
  }

  const s = params.toString();
  return s ? `?${s}` : "";
}

function injectParams(path: string, params: Record<string, string | number>) {
  return Object.entries(params).reduce(
    (p, [key, value]) => p.replace(`:${key}`, String(value)),
    path,
  );
}

/**
Defining routes

export const userRoute = createRoute<
  { id: string },
  { tab?: "posts" | "likes" }
>({
  path: "/users/:id",
})

Safe navigation

import { Link } from "wouter"

<Link
  href={userRoute.build(
    { id: "123" },
    { tab: "posts" }
  )}
>
  User
</Link>

Getting params safely

const { id } = userRoute.useParams()

Getting search params safely

const { tab } = userRoute.useSearch()

Checking if route is active

const isActive = userRoute.useIsActive({ id: "123" })

 */

export function createRoute<
  Params extends Record<string, string | number>,
  Search extends SearchParams = SearchParams,
>(config: { path: string; component?: React.JSXElementConstructor<unknown> }) {
  const { path, component } = config;

  function build(params: Params, search?: Search) {
    const p = injectParams(path, params);
    return p + buildSearch(search);
  }

  function useParams(): Params {
    return useWouterParams() as Params;
  }

  function useSearch(): Search {
    const [location] = useLocation();
    const search = location.split("?")[1] ?? "";

    const parsed = Object.fromEntries(new URLSearchParams(search));

    return parsed as Search;
  }

  function useIsActive(params: Params) {
    const [location] = useLocation();
    return location.startsWith(injectParams(path, params));
  }

  return {
    path,
    build,
    useParams,
    useSearch,
    useIsActive,
    component,
  };
}
