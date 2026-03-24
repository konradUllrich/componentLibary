import { useSearchParams, useRoute } from "wouter";

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
    const [, params] = useRoute(path);
    return params as Params;
  }

  function useSearch(): Search {
    const [search] = useSearchParams();

    const parsed = Object.fromEntries(new URLSearchParams(search));

    return parsed as Search;
  }
  function useSetSearch(): (search: Search) => void {
    const [, setSearchParams] = useSearchParams();

    const setSearch = (props: Search) => {
      setSearchParams((prev) => {
        Object.entries(props).forEach(([k, v]) => {
          if (v === undefined) {
            prev.delete(k);
          } else {
            prev.set(k, String(v));
          }
        });
        return prev;
      });
    };
    return setSearch;
  }

  function useIsActive(params: Params) {
    const [match] = useRoute(injectParams(path, params));
    return match;
  }

  return {
    path,
    build,
    useParams,
    useSearch,
    useIsActive,
    useSetSearch,
    component,
  };
}
