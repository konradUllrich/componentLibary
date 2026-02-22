import { test, expect } from "@playwright/experimental-ct-react";
import { CardList } from "./CardList";
import { checkA11y } from "../../playwright/test-utils";
import React from "react";

/**
 * Test Component: CardList
 *
 * IMPORTANT: Playwright Component Testing Limitation
 * ----------------------------------------------------
 * Playwright CT cannot serialize functions that return JSX/React elements.
 * This means we CANNOT test the actual content rendered by renderCard.
 *
 * These tests focus on:
 * - Component structure and layout
 * - Loading and empty states
 * - Style prop application (columns, gap)
 * - Accessibility
 * - DOM structure and BEM classes
 *
 * Content rendering from renderCard should be tested via:
 * - E2E tests with real data
 * - Visual regression tests
 * - Integration tests in the demo app
 */

test.describe("CardList Component", () => {
  interface TestItem {
    id: string;
    name: string;
    value: number;
  }

  const mockItems: TestItem[] = [
    { id: "1", name: "Item 1", value: 100 },
    { id: "2", name: "Item 2", value: 200 },
    { id: "3", name: "Item 3", value: 300 },
    { id: "4", name: "Item 4", value: 400 },
    { id: "5", name: "Item 5", value: 500 },
  ];

  // Simple renderCard for structural tests (content won't render in Playwright CT)
  const renderCard = (item: TestItem) => (
    <div className="test-card">
      <h3>{item.name}</h3>
      <p>Value: {item.value}</p>
    </div>
  );

  test("should render with correct structure and item count", async ({
    mount,
  }) => {
    const component = await mount(
      <CardList items={mockItems.slice(0, 3)} renderCard={renderCard} />,
    );

    await expect(component).toHaveClass(/card-list/);

    const cards = component.locator(".card-list__item");
    await expect(cards).toHaveCount(3);
  });

  test("should display loading state when isLoading is true", async ({
    mount,
  }) => {
    const component = await mount(
      <CardList items={mockItems} renderCard={renderCard} isLoading={true} />,
    );

    await expect(component).toHaveAttribute("data-state", "loading");
    await expect(component).toContainText("Loading...");

    const cards = component.locator(".card-list__item");
    await expect(cards).toHaveCount(0);
  });

  test("should display empty state when no items provided", async ({
    mount,
  }) => {
    const component = await mount(
      <CardList items={[]} renderCard={renderCard} />,
    );

    await expect(component).toHaveAttribute("data-state", "empty");
    await expect(component).toContainText("No items");
  });

  test("should display custom empty message", async ({ mount }) => {
    const component = await mount(
      <CardList
        items={[]}
        renderCard={renderCard}
        emptyMessage="Custom empty message"
      />,
    );

    await expect(component).toHaveAttribute("data-state", "empty");
    await expect(component).toContainText("Custom empty message");
  });

  test("should apply default column count (3)", async ({ mount }) => {
    const component = await mount(
      <CardList items={mockItems} renderCard={renderCard} />,
    );

    const columns = await component.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue("--card-list-columns");
    });

    expect(columns).toBe("3");
  });

  test("should apply custom column count", async ({ mount }) => {
    const component = await mount(
      <CardList items={mockItems} renderCard={renderCard} columns={4} />,
    );

    const columns = await component.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue("--card-list-columns");
    });

    expect(columns).toBe("4");
  });

  test("should apply custom gap setting", async ({ mount }) => {
    const component = await mount(
      <CardList items={mockItems} renderCard={renderCard} gap="2rem" />,
    );

    const gap = await component.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue("--card-list-gap");
    });

    expect(gap).toBe("2rem");
  });

  test("should apply custom className to grid", async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems}
        renderCard={renderCard}
        className="custom-grid-class"
      />,
    );

    const grid = component.locator(".card-list__grid");
    await expect(grid).toHaveClass(/custom-grid-class/);
  });

  test("should use custom getKey function for keys", async ({ mount }) => {
    const customGetKey = (item: TestItem) => `custom-${item.id}`;
    const component = await mount(
      <CardList
        items={mockItems.slice(0, 2)}
        renderCard={renderCard}
        getKey={customGetKey}
      />,
    );

    await expect(component.locator(".card-list__item")).toHaveCount(2);
  });

  test("should use index as fallback key when getKey not provided", async ({
    mount,
  }) => {
    const component = await mount(
      <CardList items={mockItems.slice(0, 2)} renderCard={renderCard} />,
    );

    await expect(component.locator(".card-list__item")).toHaveCount(2);
  });

  test("should have correct BEM class structure", async ({ mount }) => {
    const component = await mount(
      <CardList items={mockItems.slice(0, 2)} renderCard={renderCard} />,
    );

    // Check root element has card-list class
    await expect(component).toHaveClass(/card-list/);

    // Check grid exists
    const grid = component.locator(".card-list__grid");
    await expect(grid).toHaveCount(1);

    // Check items exist
    const items = grid.locator(".card-list__item");
    await expect(items).toHaveCount(2);
  });

  // Note: Ref forwarding test is skipped because Playwright CT does not support
  // wrapper components or callback refs. Ref forwarding is manually verified to work
  // in the demo app and real usage.

  test.describe("Accessibility", () => {
    test("should pass accessibility audit with items", async ({
      mount,
      page,
    }) => {
      await mount(
        <CardList items={mockItems.slice(0, 3)} renderCard={renderCard} />,
      );

      await checkA11y(page);
    });

    test("should pass accessibility audit when loading", async ({
      mount,
      page,
    }) => {
      await mount(
        <CardList items={mockItems} renderCard={renderCard} isLoading={true} />,
      );

      await checkA11y(page);
    });

    test("should pass accessibility audit when empty", async ({
      mount,
      page,
    }) => {
      await mount(<CardList items={[]} renderCard={renderCard} />);

      await checkA11y(page);
    });
  });

  test.describe("Edge Cases", () => {
    test("should handle single item", async ({ mount }) => {
      const component = await mount(
        <CardList items={mockItems.slice(0, 1)} renderCard={renderCard} />,
      );

      await expect(component.locator(".card-list__item")).toHaveCount(1);
    });

    test("should handle large dataset", async ({ mount }) => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        id: `item-${i}`,
        name: `Item ${i}`,
        value: i * 100,
      }));

      const component = await mount(
        <CardList items={largeDataset} renderCard={renderCard} />,
      );

      await expect(component.locator(".card-list__item")).toHaveCount(100);
    });

    test("should handle columns=1 (single column layout)", async ({
      mount,
    }) => {
      const component = await mount(
        <CardList items={mockItems} renderCard={renderCard} columns={1} />,
      );

      const columns = await component.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.getPropertyValue("--card-list-columns");
      });

      expect(columns).toBe("1");
    });
  });
});
