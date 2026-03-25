import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistorConfig } from "./persistors";

export type ValueStore<T> = {
  /** The current value held by the store. */
  value: T;
  /**
   * Update the value.
   * Accepts a new value directly **or** an updater function `(prev) => next`,
   * matching the familiar `useState` setter pattern.
   */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Restore the value to the initial value provided at store creation. */
  reset: () => void;
};

export interface ValueStoreOptions<T> {
  /**
   * Attach a persistor to automatically hydrate and persist the value.
   *
   * @example
   * ```ts
   * const store = createValueStore('light', {
   *   persistor: createLocalStoragePersistor('my-app:theme'),
   * });
   * ```
   */
  persistor?: PersistorConfig<ValueStore<T>>;
}

/**
 * Creates a generic Zustand store that holds a single typed value.
 *
 * Useful for simple pieces of shared state (theme, locale, selected item, etc.)
 * that benefit from Zustand's subscription model without the need for a
 * custom store.
 *
 * @param initialValue - The value the store is initialised with and that
 *                       `reset()` restores.
 * @param options      - Optional configuration (persistor, etc.).
 *
 * @example
 * ```ts
 * const themeStore = createValueStore<'light' | 'dark'>('light');
 *
 * themeStore.getState().setValue('dark');
 * themeStore.getState().value; // 'dark'
 *
 * themeStore.getState().reset();
 * themeStore.getState().value; // 'light'
 * ```
 */
export function createValueStore<T>(
  initialValue: T,
  options: ValueStoreOptions<T> = {},
) {
  const stateCreator = (
    set: (fn: (state: ValueStore<T>) => Partial<ValueStore<T>>) => void,
  ): ValueStore<T> => ({
    value: initialValue,

    setValue: (valueOrUpdater) =>
      set((state) => ({
        value:
          typeof valueOrUpdater === "function"
            ? (valueOrUpdater as (prev: T) => T)(state.value)
            : valueOrUpdater,
      })),

    reset: () => set(() => ({ value: initialValue })),
  });

  if (options.persistor) {
    return create<ValueStore<T>>()(persist(stateCreator, options.persistor));
  }

  return create<ValueStore<T>>()(stateCreator);
}
