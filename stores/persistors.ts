import { createJSONStorage } from "zustand/middleware";
import type { PersistOptions } from "zustand/middleware";

/**
 * A persistor describes how a store's state should be persisted to an
 * external storage (e.g. localStorage or sessionStorage).
 *
 * Pass it to a store factory's `options.persistor` to enable automatic
 * hydration and rehydration.
 *
 * @example
 * ```ts
 * const persistor = createLocalStoragePersistor<FilterStore<MyFilters>>('my-filters');
 * const store = createFilterStore(initialFilters, { persistor });
 * ```
 */
export type PersistorConfig<T> = Pick<
  PersistOptions<T>,
  "name" | "storage" | "partialize" | "version" | "migrate" | "merge"
>;

/** @internal */
function makePersistorConfig<T>(
  storageKey: string,
  getStorage: () => Storage,
  options?: Omit<PersistorConfig<T>, "name" | "storage">,
): PersistorConfig<T> {
  return {
    name: storageKey,
    storage: createJSONStorage(getStorage),
    ...options,
  };
}

/**
 * Creates a persistor that reads and writes state to `window.localStorage`.
 *
 * @param storageKey - Unique key used for the localStorage entry.
 * @param options    - Optional overrides (partialize, version, migrate, merge).
 *
 * @example
 * ```ts
 * const persistor = createLocalStoragePersistor<FilterStore<MyFilters>>(
 *   'my-app:filters',
 *   { partialize: (s) => ({ filters: s.filters }) },
 * );
 * const store = createFilterStore({}, { persistor });
 * ```
 */
export function createLocalStoragePersistor<T>(
  storageKey: string,
  options?: Omit<PersistorConfig<T>, "name" | "storage">,
): PersistorConfig<T> {
  return makePersistorConfig(storageKey, () => window.localStorage, options);
}

/**
 * Creates a persistor that reads and writes state to `window.sessionStorage`.
 *
 * @param storageKey - Unique key used for the sessionStorage entry.
 * @param options    - Optional overrides (partialize, version, migrate, merge).
 *
 * @example
 * ```ts
 * const persistor = createSessionStoragePersistor<SortingStore>(
 *   'my-app:sorting',
 * );
 * const store = createSortingStore({ persistor });
 * ```
 */
export function createSessionStoragePersistor<T>(
  storageKey: string,
  options?: Omit<PersistorConfig<T>, "name" | "storage">,
): PersistorConfig<T> {
  return makePersistorConfig(storageKey, () => window.sessionStorage, options);
}
