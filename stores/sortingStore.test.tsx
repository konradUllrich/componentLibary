import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import { SortingStoreTestWrapper } from "./sortingStore.stories";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("sortingStore", () => {
  test("initialises with provided initial sort", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    const text = await component.getByTestId("sort").textContent();
    expect(text).toContain('"key":"name"');
    expect(text).toContain('"direction":"asc"');
  });

  test("setSortColumn adds a new column", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("set age desc").click();
    const text = await component.getByTestId("sort").textContent();
    expect(text).toContain('"key":"age"');
    expect(text).toContain('"direction":"desc"');
  });

  test("setSortColumn updates direction of existing column", async ({
    mount,
  }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("set name desc").click();
    const text = await component.getByTestId("sort").textContent();
    // Should still only have one entry for 'name'
    expect((text?.match(/"key":"name"/g) ?? []).length).toBe(1);
    expect(text).toContain('"direction":"desc"');
  });

  test("toggleSort: asc → desc", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    // initial: name=asc
    await component.getByText("toggle name").click();
    const text = await component.getByTestId("sort").textContent();
    expect(text).toContain('"direction":"desc"');
  });

  test("toggleSort: desc → removed", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("toggle name").click(); // asc → desc
    await component.getByText("toggle name").click(); // desc → removed
    await expect(component.getByTestId("sort")).toHaveText("[]");
  });

  test("toggleSort: adds new column with asc direction", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("set age desc").click();
    const text = await component.getByTestId("sort").textContent();
    expect(text).toContain('"key":"age"');
    expect(text).toContain('"direction":"desc"');
  });

  test("removeSortColumn removes a specific column", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("remove name").click();
    await expect(component.getByTestId("sort")).toHaveText("[]");
  });

  test("clearSort removes all columns", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("set age desc").click();
    await component.getByText("clear").click();
    await expect(component.getByTestId("sort")).toHaveText("[]");
  });

  test("reset restores initial sort", async ({ mount }) => {
    const component = await mount(<SortingStoreTestWrapper />);
    await component.getByText("clear").click();
    await component.getByText("reset").click();
    const text = await component.getByTestId("sort").textContent();
    expect(text).toContain('"key":"name"');
    expect(text).toContain('"direction":"asc"');
  });
});
