import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
  ValueStoreTestWrapper,
  ObjectValueStoreTestWrapper,
} from "./valueStore.stories";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("valueStore", () => {
  test("initialises with the provided value", async ({ mount }) => {
    const component = await mount(<ValueStoreTestWrapper />);
    await expect(component.getByTestId("value")).toHaveText("hello");
  });

  test("setValue updates the value directly", async ({ mount }) => {
    const component = await mount(<ValueStoreTestWrapper />);
    await component.getByText("set world").click();
    await expect(component.getByTestId("value")).toHaveText("world");
  });

  test("setValue accepts an updater function", async ({ mount }) => {
    const component = await mount(<ValueStoreTestWrapper />);
    await component.getByText("append !").click();
    await expect(component.getByTestId("value")).toHaveText("hello!");
  });

  test("reset restores the initial value", async ({ mount }) => {
    const component = await mount(<ValueStoreTestWrapper />);
    await component.getByText("set world").click();
    await component.getByText("reset").click();
    await expect(component.getByTestId("value")).toHaveText("hello");
  });

  test("works with object values", async ({ mount }) => {
    const component = await mount(<ObjectValueStoreTestWrapper />);
    await expect(component.getByTestId("value")).toContainText('"count":0');
    await component.getByText("set 42").click();
    await expect(component.getByTestId("value")).toContainText('"count":42');
  });

  test("updater function works with object values", async ({ mount }) => {
    const component = await mount(<ObjectValueStoreTestWrapper />);
    await component.getByText("increment").click();
    await component.getByText("increment").click();
    await expect(component.getByTestId("value")).toContainText('"count":2');
  });

  test("reset restores object initial value", async ({ mount }) => {
    const component = await mount(<ObjectValueStoreTestWrapper />);
    await component.getByText("set 42").click();
    await component.getByText("reset").click();
    await expect(component.getByTestId("value")).toContainText('"count":0');
  });
});
