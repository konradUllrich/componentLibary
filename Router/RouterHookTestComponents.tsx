/**
 * Helper components used exclusively by Router hook tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import {
  useLocation,
  useSearch,
  useParams,
  useRoute,
  useSearchParams,
} from "./hooks";
import { Link, Route } from "./index";

export const LocationDisplay = () => {
  const [location, navigate] = useLocation();
  return (
    <div>
      <span data-testid="location">{location}</span>
      <button type="button" onClick={() => navigate("/about")}>
        navigate
      </button>
    </div>
  );
};
LocationDisplay.displayName = "LocationDisplay";

export const SearchDisplay = () => {
  const search = useSearch();
  return <span data-testid="search">{search || "empty"}</span>;
};
SearchDisplay.displayName = "SearchDisplay";

export const NavigateWithSearch = () => {
  const [, navigate] = useLocation();
  return (
    <div>
      <SearchDisplay />
      <button type="button" onClick={() => navigate("/results?q=hello")}>
        search
      </button>
    </div>
  );
};
NavigateWithSearch.displayName = "NavigateWithSearch";

export const RouteChecker = ({ path }: { path: string }) => {
  const [match] = useRoute(path);
  return <span data-testid="match">{match ? "matched" : "no match"}</span>;
};
RouteChecker.displayName = "RouteChecker";

export const MatchWithNav = () => {
  const [, navigate] = useLocation();
  return (
    <div>
      <RouteChecker path="/dashboard" />
      <button type="button" onClick={() => navigate("/dashboard")}>
        go
      </button>
    </div>
  );
};
MatchWithNav.displayName = "MatchWithNav";

// Internal – not mounted directly; must live inside a matched Route
const ParamsContent = () => {
  const params = useParams<{ id: string }>();
  return <span data-testid="params">{params.id ?? "none"}</span>;
};

/** Renders a nav link and a parameterised route that displays the matched id. */
export const ParamsScene = () => (
  <>
    <Link href="/users/42">Go</Link>
    <Route path="/users/:id">
      <ParamsContent />
    </Route>
  </>
);
ParamsScene.displayName = "ParamsScene";

export const SearchParamsDisplay = () => {
  const [searchParams] = useSearchParams();
  return (
    <span data-testid="search-params">{searchParams.get("q") ?? "none"}</span>
  );
};
SearchParamsDisplay.displayName = "SearchParamsDisplay";

export const NavigateWithQuery = () => {
  const [, navigate] = useLocation();
  return (
    <div>
      <SearchParamsDisplay />
      <button type="button" onClick={() => navigate("/results?q=world")}>
        query
      </button>
    </div>
  );
};
NavigateWithQuery.displayName = "NavigateWithQuery";
