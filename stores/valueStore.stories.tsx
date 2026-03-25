import React from "react";
import { createValueStore } from "./valueStore";

/**
 * Test story wrapper using a string value.
 * Used in valueStore.test.tsx Playwright CT tests.
 */
export const ValueStoreTestWrapper: React.FC = () => {
  const [store] = React.useState(() => createValueStore<string>("hello"));

  const value = store((s) => s.value);
  const { setValue, reset } = store.getState();

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue("world")}>set world</button>
      <button onClick={() => setValue((prev) => prev + "!")}>append !</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};
ValueStoreTestWrapper.displayName = "ValueStoreTestWrapper";

/**
 * Test story wrapper using an object value.
 * Used in valueStore.test.tsx Playwright CT tests.
 */
export const ObjectValueStoreTestWrapper: React.FC = () => {
  const [store] = React.useState(() =>
    createValueStore<{ count: number }>({ count: 0 }),
  );

  const value = store((s) => s.value);
  const { setValue, reset } = store.getState();

  return (
    <div>
      <span data-testid="value">{JSON.stringify(value)}</span>
      <button onClick={() => setValue({ count: 42 })}>set 42</button>
      <button onClick={() => setValue((prev) => ({ count: prev.count + 1 }))}>
        increment
      </button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};
ObjectValueStoreTestWrapper.displayName = "ObjectValueStoreTestWrapper";
