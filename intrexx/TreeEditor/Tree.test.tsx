import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
  BasicSortableTree,
  BemClassTree,
  CustomRenderSortableTree,
  MenuActionsSortableTree,
  NonMovableSortableTree,
  SandwichedMovableSortableTree,
  HandleVisibilitySortableTree,
  OnActionSortableTree,
  NoChildrenSortableTree,
} from "./TreeEditor2Stories";

/**
 * Tree (SortableTree) component tests.
 *
 * Wrapper components are imported from TreeEditor2Stories.tsx to avoid
 * Playwright CT's function-prop serialization issue.
 */

test.describe("Tree (SortableTree)", () => {
  test("should render items correctly", async ({ mount }) => {
    const component = await mount(<BasicSortableTree />);

    await expect(component).toBeVisible();
    // Default render shows the item id; root items with children show "(N)"
    await expect(component.getByText("1 (2)", { exact: true })).toBeVisible();
    await expect(component.getByText("2", { exact: true })).toBeVisible();
    await expect(component.getByText("3 (1)", { exact: true })).toBeVisible();
  });

  test("should apply BEM CSS classes correctly", async ({ mount }) => {
    const component = await mount(<BemClassTree />);

    // Root list has sortable-tree class
    const list = component.locator(".sortable-tree");
    await expect(list).toBeVisible();

    // Individual items have sortable-tree__item class
    const items = component.locator(".sortable-tree__item");
    await expect(items).toHaveCount(6); // 3 roots + 3 nested children (1-1, 1-2, 3-1)
  });

  test("should render with custom renderItem", async ({ mount }) => {
    const component = await mount(<CustomRenderSortableTree />);

    await expect(component.getByText("Root One (custom)")).toBeVisible();
    await expect(component.getByText("Root Two (custom)")).toBeVisible();
    await expect(component.getByText("Root Three (custom)")).toBeVisible();
    await expect(component.getByText("Child 1.1 (custom)")).toBeVisible();
  });

  test("should render itemMenu actions for each item", async ({ mount }) => {
    const component = await mount(<MenuActionsSortableTree />);

    // Menu containers are rendered
    await expect(component.locator('[data-testid="menu-a"]')).toBeVisible();
    await expect(component.locator('[data-testid="menu-b"]')).toBeVisible();

    // Action buttons are present
    await expect(
      component.locator('[data-testid="erase-a"]'),
    ).toBeVisible();
    await expect(
      component.locator('[data-testid="add-after-a"]'),
    ).toBeVisible();
    await expect(
      component.locator('[data-testid="move-up-a"]'),
    ).toBeVisible();
    await expect(
      component.locator('[data-testid="move-down-a"]'),
    ).toBeVisible();
  });

  test("should render drag handle for each item", async ({ mount }) => {
    const component = await mount(<HandleVisibilitySortableTree />);

    // Each item has a handle wrapper
    const handles = component.locator(".sortable-tree__handle");
    // 3 root items + 3 children = 6 handles total
    await expect(handles).toHaveCount(6);
  });

  test("should apply sortable-tree__action class to menu container", async ({
    mount,
  }) => {
    const component = await mount(<MenuActionsSortableTree />);
    const actionContainers = component.locator(".sortable-tree__action");
    // One action container per item (2 items)
    await expect(actionContainers).toHaveCount(2);
  });

  test("should erase an item when delete action is triggered", async ({
    mount,
  }) => {
    const component = await mount(<MenuActionsSortableTree />);

    // Both items visible initially
    await expect(component.getByText("Alpha")).toBeVisible();
    await expect(component.getByText("Beta")).toBeVisible();

    // Click delete on Alpha
    await component.locator('[data-testid="erase-a"]').click();

    // Alpha should be gone, Beta should remain
    await expect(component.getByText("Alpha")).not.toBeVisible();
    await expect(component.getByText("Beta")).toBeVisible();
  });

  test("should add an item after when addItemAfter action is triggered", async ({
    mount,
  }) => {
    const component = await mount(<MenuActionsSortableTree />);

    const initialItems = component.locator(".sortable-tree__item");
    await expect(initialItems).toHaveCount(2);

    // Click "Add After" on Alpha
    await component.locator('[data-testid="add-after-a"]').click();

    // A new item should appear
    const updatedItems = component.locator(".sortable-tree__item");
    await expect(updatedItems).toHaveCount(3);
  });

  test("should render non-movable items alongside movable items", async ({
    mount,
  }) => {
    const component = await mount(<NonMovableSortableTree />);

    await expect(component.getByTestId("item-locked")).toBeVisible();
    await expect(component.getByTestId("item-free")).toBeVisible();
  });

  test("should allow moveUp on a moveable item sandwiched between locked items", async ({
    mount,
  }) => {
    const component = await mount(<SandwichedMovableSortableTree />);

    // Initial order: Locked Top, Free, Locked Bottom
    const items = component.locator(".sortable-tree__item");
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toContainText("Locked Top");
    await expect(items.nth(1)).toContainText("Free");
    await expect(items.nth(2)).toContainText("Locked Bottom");

    // Move "Free" up — it should swap with "Locked Top"
    await component.getByTestId("move-up-free").click();

    await expect(items.nth(0)).toContainText("Free");
    await expect(items.nth(1)).toContainText("Locked Top");
    await expect(items.nth(2)).toContainText("Locked Bottom");
  });

  test("should allow moveDown on a moveable item sandwiched between locked items", async ({
    mount,
  }) => {
    const component = await mount(<SandwichedMovableSortableTree />);

    // Initial order: Locked Top, Free, Locked Bottom
    const items = component.locator(".sortable-tree__item");
    await expect(items).toHaveCount(3);

    // Move "Free" down — it should swap with "Locked Bottom"
    await component.getByTestId("move-down-free").click();

    await expect(items.nth(0)).toContainText("Locked Top");
    await expect(items.nth(1)).toContainText("Locked Bottom");
    await expect(items.nth(2)).toContainText("Free");
  });

  test("should render items that have no children property", async ({
    mount,
  }) => {
    const component = await mount(<NoChildrenSortableTree />);

    await expect(component.getByTestId("item-p")).toBeVisible();
    await expect(component.getByTestId("item-q")).toBeVisible();
    await expect(component.getByTestId("item-r")).toBeVisible();
  });

  test.describe("onAction callback", () => {
    test("should fire delete action when erase is triggered", async ({
      mount,
    }) => {
      const component = await mount(<OnActionSortableTree />);

      await component.getByTestId("delete-x").click();

      const lastAction = component.getByTestId("last-action");
      await expect(lastAction).toBeVisible();
      const text = await lastAction.textContent();
      const action = JSON.parse(text!);
      expect(action.action).toBe("delete");
      expect(action.menuItemId).toBe("x");
    });

    test("should fire add action when addItemAfter is triggered", async ({
      mount,
    }) => {
      const component = await mount(<OnActionSortableTree />);

      await component.getByTestId("add-after-x").click();

      const lastAction = component.getByTestId("last-action");
      await expect(lastAction).toBeVisible();
      const text = await lastAction.textContent();
      const action = JSON.parse(text!);
      expect(action.action).toBe("add");
      expect(action.item.id).toBe("new-1");
      expect(action.parentId).toBe("");
      expect(typeof action.order).toBe("number");
    });

    test("should fire add action when addChild is triggered", async ({
      mount,
    }) => {
      const component = await mount(<OnActionSortableTree />);

      await component.getByTestId("add-child-x").click();

      const lastAction = component.getByTestId("last-action");
      await expect(lastAction).toBeVisible();
      const text = await lastAction.textContent();
      const action = JSON.parse(text!);
      expect(action.action).toBe("add");
      expect(action.item.id).toBe("child-1");
      expect(action.parentId).toBe("x");
      expect(action.order).toBe(0);
    });

    test("should fire move action when moveDown is triggered", async ({
      mount,
    }) => {
      const component = await mount(<OnActionSortableTree />);

      await component.getByTestId("move-down-x").click();

      const lastAction = component.getByTestId("last-action");
      await expect(lastAction).toBeVisible();
      const text = await lastAction.textContent();
      const action = JSON.parse(text!);
      expect(action.action).toBe("move");
      expect(action.menuItemId).toBe("x");
      expect(action.order).toBe(1);
    });

    test("should fire move action when moveUp is triggered", async ({
      mount,
    }) => {
      const component = await mount(<OnActionSortableTree />);

      await component.getByTestId("move-up-y").click();

      const lastAction = component.getByTestId("last-action");
      await expect(lastAction).toBeVisible();
      const text = await lastAction.textContent();
      const action = JSON.parse(text!);
      expect(action.action).toBe("move");
      expect(action.menuItemId).toBe("y");
      expect(action.order).toBe(0);
    });
  });
});
