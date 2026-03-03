import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
  BasicTreeEditor,
  ExpandTreeEditor,
  SelectTreeEditor,
  A11yTreeEditor,
  CustomRenderTreeEditor,
  AriaTreeEditor,
} from "./TreeEditorStories";

/**
 * TreeEditor component tests.
 *
 * Wrapper components are imported from TreeEditorStories.tsx to avoid
 * Playwright CT's function-prop serialization issue with Zustand stores.
 */

test.describe("TreeEditor", () => {
  test("should render root items", async ({ mount }) => {
    const component = await mount(<BasicTreeEditor />);

    await expect(component).toBeVisible();
    await expect(component.getByText("Root Item 1")).toBeVisible();
    await expect(component.getByText("Root Item 2")).toBeVisible();
    await expect(component.getByText("Root Item 3")).toBeVisible();
  });

  test("should expand items to reveal children", async ({ mount }) => {
    const component = await mount(<ExpandTreeEditor />);

    // Children should not be visible initially
    await expect(component.getByText("Child 1.1")).not.toBeVisible();

    // Click the expand toggle on item 1
    const toggleBtn = component.locator(".tree-node__toggle").first();
    await toggleBtn.click();

    // Children should now be visible
    await expect(component.getByText("Child 1.1")).toBeVisible();
  });

  test("should select an item on click", async ({ mount }) => {
    const component = await mount(<SelectTreeEditor />);

    // Find the tree node for Root Item 2 and click it
    const treeNode = component
      .locator(".tree-node")
      .filter({ hasText: "Root Item 2" })
      .first();
    await treeNode.click();

    // The tree-node should now have the selected class
    await expect(treeNode).toHaveClass(/tree-node--selected/);
  });

  test("should have accessible tree role", async ({ mount }) => {
    const component = await mount(<A11yTreeEditor />);

    // The tree should have role="tree"
    const tree = component.locator('[role="tree"]');
    await expect(tree).toBeVisible();
  });

  test("should render with custom renderItem", async ({ mount }) => {
    const component = await mount(<CustomRenderTreeEditor />);

    await expect(component.getByText("Root Item 1 (custom)")).toBeVisible();
  });

  test("should apply correct aria attributes", async ({ mount }) => {
    const component = await mount(<AriaTreeEditor />);

    const treeItem = component.locator('[role="treeitem"]').first();
    await expect(treeItem).toHaveAttribute("aria-level", "1");
    await expect(treeItem).toHaveAttribute("aria-setsize", "3");
    await expect(treeItem).toHaveAttribute("aria-posinset", "1");
  });
});
