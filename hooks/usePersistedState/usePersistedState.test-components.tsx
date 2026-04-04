/**
 * Helper components used exclusively by usePersistedState tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 *
 * Storage model (current hook behaviour):
 * - No direct `key → value` writes to localStorage / sessionStorage.
 * - On setState (syncUrl=true): writes URL search param AND the route-scoped key
 *   `${routeStatePrefix}:${currentPath}` as a URLSearchParams string.
 * - `storage` option picks the backend for the route key:
 *     "localStorage" (default) → localStorage["mp-route:/"]
 *     "sessionStorage" | false → sessionStorage["mp-route:/"]
 * - Init reads URL params first, then falls back to defaultValue.
 */
import React from "react";
import { usePersistedState, type StorageType } from "./usePersistedState";
import { Router } from "../../Router";

// ─── Basic string state (default storage = localStorage) ─────────────────────

export const PersistedStateDisplay = ({
  storageKey,
  defaultValue,
}: {
  storageKey: string;
  defaultValue: string;
}) => {
  const [state, setState] = usePersistedState({
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
PersistedStateDisplay.displayName = "PersistedStateDisplay";

// ─── Object state ─────────────────────────────────────────────────────────────

export const PersistedObjectState = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const defaultObj = { name: "test", count: 0 };
  const [state, setState] = usePersistedState({
    key: storageKey,
    defaultValue: defaultObj,
  });

  return (
    <div>
      <span data-testid="object-name">{state.name}</span>
      <span data-testid="object-count">{state.count}</span>
      <button
        type="button"
        onClick={() => setState({ name: "updated", count: 5 })}
        data-testid="update-object-button"
      >
        Update Object
      </button>
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
PersistedObjectState.displayName = "PersistedObjectState";

// ─── Custom serialisation ─────────────────────────────────────────────────────
// serialize: n  → "num:N" ; deserialize: "num:N" → N

export const CustomSerializationComponent = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const [state, setState] = usePersistedState({
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
  const [state, setState] = usePersistedState({
    key: storageKey,
    defaultValue,
    removeIfDefault,
  });

  return (
    <div>
      <span data-testid="remove-if-default-value">{state}</span>
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

// ─── Multiple independent keys (same route, same storage backend) ─────────────
// Both use default storage=localStorage → both write into localStorage["mp-route:/"].

export const MultipleKeysComponent = () => {
  const [name, setName] = usePersistedState({
    key: "mk-name",
    defaultValue: "alice",
  });
  const [page, setPage] = usePersistedState({
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

// ─── Deserialization error ────────────────────────────────────────────────────

export const DeserializationErrorComponent = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const [state] = usePersistedState({
    key: storageKey,
    defaultValue: "fallback",
    deserialize: (value: string) => {
      if (value === "broken") throw new Error("Deserialization failed");
      return value;
    },
  });

  return <span data-testid="error-fallback-value">{state}</span>;
};
DeserializationErrorComponent.displayName = "DeserializationErrorComponent";

// ─── Router context (URL param tests using appRoute encoding) ─────────────────

export const RouterPersistedState = ({
  storageKey = "rps-key",
  defaultValue = "default",
}: {
  storageKey?: string;
  defaultValue?: string;
}) => {
  const Inner = () => {
    const [state, setState] = usePersistedState({
      key: storageKey,
      defaultValue,
    });
    return (
      <div>
        <span data-testid="router-state-value">{state}</span>
        <button
          type="button"
          onClick={() => setState("from-button")}
          data-testid="router-update-button"
        >
          Update
        </button>
      </div>
    );
  };
  Inner.displayName = "Inner";
  return (
    <Router>
      <Inner />
    </Router>
  );
};
RouterPersistedState.displayName = "RouterPersistedState";

// ─── Route-scoped storage type testing ───────────────────────────────────────
// Exposes `storageType` so tests can verify which backend receives the route key.
// Route key: `mp-route:/`  Value: URLSearchParams string e.g. `storageKey=%22persisted%22`

export const RouteStorageComponent = ({
  storageKey,
  storageType = "sessionStorage",
  defaultValue = "initial",
}: {
  storageKey: string;
  storageType?: StorageType;
  defaultValue?: string;
}) => {
  const [state, setState] = usePersistedState({
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

// ─── syncUrl option ───────────────────────────────────────────────────────────

export const SyncUrlComponent = ({
  storageKey,
  syncUrl,
}: {
  storageKey: string;
  syncUrl: boolean;
}) => {
  const [state, setState] = usePersistedState({
    key: storageKey,
    defaultValue: "initial",
    syncUrl,
  });

  return (
    <div>
      <span data-testid="sync-url-value">{state}</span>
      <button
        type="button"
        onClick={() => setState("updated")}
        data-testid="set-button"
      >
        Set
      </button>
    </div>
  );
};
SyncUrlComponent.displayName = "SyncUrlComponent";

// ─── flatUrlParams (filter-style: each property → own URL param) ──────────────
// Primitives serialised with String(), not JSON.stringify:
//   { status: "active", page: 3 } → ?status=active&page=3
// Route storage backend: localStorage (default)

export const FlatFiltersComponent = ({
  storageKey = "flat-filters",
}: {
  storageKey?: string;
}) => {
  const defaultFilters = { status: "all", page: 1 };
  const [filters, setFilters] = usePersistedState({
    key: storageKey,
    defaultValue: defaultFilters,
    flatUrlParams: true,
    syncUrl: true,
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

// ─── Cross-instance URL sync (within Router) ──────────────────────────────────
// Both instances share the same key. Instance A writes; Instance B reads via
// the reactive URL-sync effect.

export const CrossInstanceSyncComponent = ({
  storageKey,
  defaultValue = "default",
}: {
  storageKey: string;
  defaultValue?: string;
}) => {
  const InstanceA = () => {
    const [state, setState] = usePersistedState({
      key: storageKey,
      defaultValue,
    });
    return (
      <div>
        <span data-testid="instance-a-value">{state}</span>
        <button
          type="button"
          onClick={() => setState("from-a")}
          data-testid="instance-a-set"
        >
          Set
        </button>
        <button
          type="button"
          onClick={() => setState(defaultValue)}
          data-testid="instance-a-reset"
        >
          Reset
        </button>
      </div>
    );
  };
  InstanceA.displayName = "InstanceA";

  const InstanceB = () => {
    const [state] = usePersistedState({ key: storageKey, defaultValue });
    return <span data-testid="instance-b-value">{state}</span>;
  };
  InstanceB.displayName = "InstanceB";

  return (
    <Router>
      <InstanceA />
      <InstanceB />
    </Router>
  );
};
CrossInstanceSyncComponent.displayName = "CrossInstanceSyncComponent";
