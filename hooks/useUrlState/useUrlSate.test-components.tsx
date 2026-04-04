/**
 * Helper components used exclusively by useUrlState tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 *
 * Storage model (current hook behaviour):
 * - URL search params are the single source of truth — no separate useState.
 * - On setState: writes URL search param AND the route-scoped key
 *   `${routeStatePrefix}:${currentPath}` as a URLSearchParams string.
 * - `storage` option picks the backend for the route key:
 *     "sessionStorage" (default) → sessionStorage["mp-route:/"]
 *     "localStorage"             → localStorage["mp-route:/"]
 *     false                      → no storage write
 * - Init reads URL params first, then falls back to defaultValue.
 */
import React from "react";
import { useUrlState, type StorageType } from "./useUrlSate";

// ─── Basic string state (default storage = sessionStorage) ───────────────────

export const UrlStateDisplay = ({
  storageKey,
  defaultValue,
}: {
  storageKey: string;
  defaultValue: string;
}) => {
  const [state, setState] = useUrlState({
    key: storageKey,
    defaultValue,
  });

  return (
    <div>
      <span data-testid="state-value">{state}</span>
      <button
        type="button"
        onClick={() => setState("updated")}
        data-testid="update-button"
      >
        Update
      </button>
      <button
        type="button"
        onClick={() => setState((prev) => prev + "-modified")}
        data-testid="modify-button"
      >
        Modify
      </button>
    </div>
  );
};
UrlStateDisplay.displayName = "UrlStateDisplay";

// ─── Object state ─────────────────────────────────────────────────────────────

export const UrlObjectState = () => {
  const defaultObj = { name: "test", count: 0 };
  const [state, setState] = useUrlState({
    key: "obj-state",
    defaultValue: defaultObj,
  });

  return (
    <div>
      <span data-testid="object-name">{state.name}</span>
      <span data-testid="object-count">{state.count}</span>
      <button
        type="button"
        onClick={() => setState((prev) => ({ ...prev, count: prev.count + 1 }))}
        data-testid="increment-button"
      >
        Increment
      </button>
    </div>
  );
};
UrlObjectState.displayName = "UrlObjectState";

// ─── removeIfDefault ──────────────────────────────────────────────────────────

export const RemoveIfDefaultComponent = ({
  storageKey,
  defaultValue = "default",
  removeIfDefault,
}: {
  storageKey: string;
  defaultValue?: string;
  removeIfDefault: boolean;
}) => {
  const [state, setState] = useUrlState({
    key: storageKey,
    defaultValue,
    removeIfDefault,
  });

  return (
    <div>
      <span data-testid="state-value">{state}</span>
      <button
        type="button"
        onClick={() => setState("custom")}
        data-testid="set-custom-button"
      >
        Set Custom
      </button>
      <button
        type="button"
        onClick={() => setState("default")}
        data-testid="reset-button"
      >
        Reset to Default
      </button>
    </div>
  );
};
RemoveIfDefaultComponent.displayName = "RemoveIfDefaultComponent";

// ─── Route-scoped storage type testing ───────────────────────────────────────
// Exposes `storageType` so tests can verify which backend receives the route key.
// Route key: `mp-route:/`  Value: URLSearchParams string e.g. `key=%22persisted%22`

export const RouteStorageComponent = ({
  storageKey,
  storageType = "sessionStorage",
  defaultValue = "initial",
}: {
  storageKey: string;
  storageType?: StorageType;
  defaultValue?: string;
}) => {
  const [state, setState] = useUrlState({
    key: storageKey,
    defaultValue,
    storage: storageType,
  });

  return (
    <div>
      <span data-testid="state-value">{state}</span>
      <button
        type="button"
        onClick={() => setState("persisted")}
        data-testid="set-button"
      >
        Set
      </button>
      <button
        type="button"
        onClick={() => setState(defaultValue)}
        data-testid="reset-button"
      >
        Reset
      </button>
    </div>
  );
};
RouteStorageComponent.displayName = "RouteStorageComponent";

// ─── flatUrlParams (filter-style: each property → own URL param) ──────────────
// Primitives serialised with String(), not JSON.stringify:
//   { status: "active", page: 3 } → ?status=active&page=3
// Route storage backend: sessionStorage (default for useUrlState)

export const FlatFiltersComponent = () => {
  const defaultFilters = { status: "all", page: 1 };
  const [filters, setFilters] = useUrlState({
    key: "flat-filters",
    defaultValue: defaultFilters,
    flatUrlParams: true,
  });

  return (
    <div>
      <span data-testid="status">{String(filters.status)}</span>
      <span data-testid="page">{String(filters.page)}</span>
      <button
        type="button"
        onClick={() => setFilters((prev) => ({ ...prev, status: "active" }))}
        data-testid="set-status"
      >
        Set Status
      </button>
      <button
        type="button"
        onClick={() => setFilters((prev) => ({ ...prev, page: 3 }))}
        data-testid="set-page"
      >
        Set Page
      </button>
      <button
        type="button"
        onClick={() => setFilters(defaultFilters)}
        data-testid="reset"
      >
        Reset
      </button>
    </div>
  );
};
FlatFiltersComponent.displayName = "FlatFiltersComponent";

// ─── Custom serialisation ─────────────────────────────────────────────────────
// serialize: n → "num:N" ; deserialize: "num:N" → N

export const CustomSerializationComponent = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const [state, setState] = useUrlState({
    key: storageKey,
    defaultValue: 0,
    serialize: (value: number) => `num:${value}`,
    deserialize: (value: string) => {
      if (!value.startsWith("num:")) throw new Error("Invalid format");
      const parsed = parseInt(value.slice(4), 10);
      if (Number.isNaN(parsed)) throw new Error("Invalid number");
      return parsed;
    },
  });

  return (
    <div>
      <span data-testid="custom-value">{state}</span>
      <button
        type="button"
        onClick={() => setState(42)}
        data-testid="set-custom"
      >
        Set 42
      </button>
    </div>
  );
};
CustomSerializationComponent.displayName = "CustomSerializationComponent";

// ─── Multiple independent keys (same route, same storage backend) ─────────────
// Both write into sessionStorage["mp-route:/"].

export const MultipleKeysComponent = () => {
  const [name, setName] = useUrlState({
    key: "mk-name",
    defaultValue: "alice",
  });
  const [page, setPage] = useUrlState({
    key: "mk-page",
    defaultValue: 1,
    serialize: String,
    deserialize: (s) => parseInt(s, 10) || 1,
  });

  return (
    <div>
      <span data-testid="name-value">{name}</span>
      <span data-testid="page-value">{page}</span>
      <button
        type="button"
        onClick={() => setName("bob")}
        data-testid="change-name"
      >
        Change Name
      </button>
      <button
        type="button"
        onClick={() => setPage(3)}
        data-testid="change-page"
      >
        Change Page
      </button>
    </div>
  );
};
MultipleKeysComponent.displayName = "MultipleKeysComponent";

// ─── Deserialisation error ────────────────────────────────────────────────────

export const DeserializationErrorComponent = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const [state] = useUrlState({
    key: storageKey,
    defaultValue: "fallback",
    deserialize: (value: string) => {
      if (value === "broken") throw new Error("Deserialisation failed");
      return value;
    },
  });

  return <span data-testid="error-fallback-value">{state}</span>;
};
DeserializationErrorComponent.displayName = "DeserializationErrorComponent";
