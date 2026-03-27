/**
 * Helper components used exclusively by usePersistedState tests.
 * Playwright CT requires mounted components to be defined outside the test file.
 */
import React from "react";
import { usePersistedState, type StorageType } from "./usePersistedState";
import { Router } from "../../Router";

// ===== Basic State Display =====
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

// ===== Object State =====
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

// ===== Custom Serialization =====
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

// ===== Remove If Default Component =====
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
        onClick={() => setState("default")}
        data-testid="reset-button"
      >
        Reset to Default
      </button>
      <button
        type="button"
        onClick={() => setState("custom")}
        data-testid="set-custom-button"
      >
        Set Custom
      </button>
    </div>
  );
};
RemoveIfDefaultComponent.displayName = "RemoveIfDefaultComponent";

// ===== Multiple Keys Component =====
export const MultipleKeysComponent = () => {
  const [email, setEmail] = usePersistedState({
    key: "email",
    defaultValue: "default@example.com",
  });
  const [theme, setTheme] = usePersistedState({
    key: "theme",
    defaultValue: "light",
  });

  return (
    <div>
      <span data-testid="email-value">{email}</span>
      <span data-testid="theme-value">{theme}</span>
      <button
        type="button"
        onClick={() => setEmail("new@example.com")}
        data-testid="change-email"
      >
        Change Email
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        data-testid="change-theme"
      >
        Change Theme
      </button>
    </div>
  );
};
MultipleKeysComponent.displayName = "MultipleKeysComponent";

// ===== Deserialization Error Component =====
export const DeserializationErrorComponent = ({
  storageKey,
}: {
  storageKey: string;
}) => {
  const [state, setState] = usePersistedState({
    key: storageKey,
    defaultValue: "fallback",
    deserialize: (value: string) => {
      if (value === "broken") {
        throw new Error("Deserialization failed");
      }
      return value;
    },
  });

  return (
    <div>
      <span data-testid="error-fallback-value">{state}</span>
      <button
        type="button"
        onClick={() => setState("working")}
        data-testid="set-working"
      >
        Set Working
      </button>
    </div>
  );
};
DeserializationErrorComponent.displayName = "DeserializationErrorComponent";

// ===== In Router Context (for URL param testing) =====
export const RouterPersistedState = ({
  storageKey = "test",
  defaultValue = "default",
}: {
  storageKey?: string;
  defaultValue?: string;
}) => {
  const RouterPersistedStateInner = () => {
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

  RouterPersistedStateInner.displayName = "RouterPersistedStateInner";

  return (
    <Router>
      <RouterPersistedStateInner />
    </Router>
  );
};

RouterPersistedState.displayName = "RouterPersistedState";

// ===== Storage Type Component (localStorage vs sessionStorage) =====
export const StorageTypeComponent = ({
  storageKey,
  storageType,
}: {
  storageKey: string;
  storageType: StorageType;
}) => {
  const [state, setState] = usePersistedState({
    key: storageKey,
    defaultValue: "initial",
    storage: storageType,
  });

  return (
    <div>
      <span data-testid="storage-value">{state}</span>
      <button
        type="button"
        onClick={() => setState("persisted")}
        data-testid="set-button"
      >
        Set
      </button>
      <button
        type="button"
        onClick={() => setState("initial")}
        data-testid="reset-button"
      >
        Reset
      </button>
    </div>
  );
};

StorageTypeComponent.displayName = "StorageTypeComponent";

// ===== Sync URL Component =====
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
