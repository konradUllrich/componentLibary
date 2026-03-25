import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import { FilterStoreTestWrapper } from "./filterStore.stories";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("filterStore", () => {
  test("initialises with provided default filters", async ({ mount }) => {
    const component = await mount(<FilterStoreTestWrapper />);
    await expect(component.getByTestId("filters")).toContainText(
      '"status":"active"',
    );
  });

  test("setFilter updates a single key", async ({ mount }) => {
    const component = await mount(<FilterStoreTestWrapper />);
    await component.getByText("set status=inactive").click();
    await expect(component.getByTestId("filters")).toContainText(
      '"status":"inactive"',
    );
  });

  test("setFilters merges multiple keys", async ({ mount }) => {
    const component = await mount(<FilterStoreTestWrapper />);
    await component.getByText("set multiple").click();
    const text = await component.getByTestId("filters").textContent();
    expect(text).toContain('"category":"books"');
    expect(text).toContain('"page":2');
    expect(text).toContain('"status":"active"'); // existing key retained
  });

  test("removeFilter deletes a single key", async ({ mount }) => {
    const component = await mount(<FilterStoreTestWrapper />);
    await component.getByText("remove status").click();
    await expect(component.getByTestId("filters")).not.toContainText("status");
  });

  test("clearFilters empties all filters", async ({ mount }) => {
    const component = await mount(<FilterStoreTestWrapper />);
    await component.getByText("set multiple").click();
    await component.getByText("clear").click();
    await expect(component.getByTestId("filters")).toHaveText("{}");
  });

  test("reset restores initial filters", async ({ mount }) => {
    const component = await mount(<FilterStoreTestWrapper />);
    await component.getByText("set multiple").click();
    await component.getByText("reset").click();
    await expect(component.getByTestId("filters")).toHaveText(
      '{"status":"active"}',
    );
  });
});
