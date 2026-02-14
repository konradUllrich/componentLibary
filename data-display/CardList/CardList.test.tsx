import { test, expect } from '@playwright/experimental-ct-react';
import { CardList } from './CardList';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

/**
 * Test Component: CardList (Medium Priority)
 * 
 * Tests for CardList component - displays items in a responsive grid of cards
 * 
 * Coverage:
 * - Custom renderCard function
 * - Card content rendering
 * - Loading state display
 * - Empty state with custom messages
 * - Column configuration (default 3, custom values)
 * - Custom gap settings
 * - Custom className application
 * - Custom getKey function
 * - Index as fallback key
 * - BEM class structure
 * - Ref forwarding
 * - RenderCard receives correct item and index
 * - Generic type support with different item types
 * - Accessibility for normal, loading, and empty states
 * - Edge cases: single item, large datasets, columns=1, null values
 */

// Test Component: CardList
test.describe('CardList Component', () => {
  interface TestItem {
    id: string;
    name: string;
    value: number;
  }

  const mockItems: TestItem[] = [
    { id: '1', name: 'Item 1', value: 100 },
    { id: '2', name: 'Item 2', value: 200 },
    { id: '3', name: 'Item 3', value: 300 },
    { id: '4', name: 'Item 4', value: 400 },
    { id: '5', name: 'Item 5', value: 500 },
  ];

  const defaultRenderCard = (item: TestItem) => (
    <div className="test-card">
      <h3>{item.name}</h3>
      <p>Value: {item.value}</p>
    </div>
  );

  test('should render items with custom renderCard function', async ({ mount, page }) => {
    await mount(
      <CardList
        items={mockItems.slice(0, 3)}
        renderCard={defaultRenderCard}
      />
    );
    
    // Use page locator instead of component locator
    const cardList = page.locator('.card-list');
    await expect(cardList).toBeVisible();
    
    const cards = page.locator('.card-list__item');
    await expect(cards).toHaveCount(3);
  });

  test('should render card content correctly', async ({ mount, page }) => {
    await mount(
      <CardList
        items={mockItems.slice(0, 2)}
        renderCard={defaultRenderCard}
      />
    );
    
    await expect(page.locator('text=Item 1')).toBeVisible();
    await expect(page.locator('text=Item 2')).toBeVisible();
    await expect(page.locator('text=Value: 100')).toBeVisible();
    await expect(page.locator('text=Value: 200')).toBeVisible();
  });

  test('should display loading state when isLoading is true', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
        isLoading={true}
      />
    );
    
    const loading = component.locator('.card-list__loading');
    await expect(loading).toBeVisible();
    await expect(loading).toContainText('Loading...');
    
    // Items should not be rendered
    const cards = component.locator('.card-list__item');
    await expect(cards).toHaveCount(0);
  });

  test('should display empty state when no items provided', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={[]}
        renderCard={defaultRenderCard}
      />
    );
    
    const empty = component.locator('.card-list__empty');
    await expect(empty).toBeVisible();
    await expect(empty).toContainText('No items');
  });

  test('should display custom empty message', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={[]}
        renderCard={defaultRenderCard}
        emptyMessage="Custom empty message"
      />
    );
    
    const empty = component.locator('.card-list__empty');
    await expect(empty).toContainText('Custom empty message');
  });

  test('should use default columns (3)', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
      />
    );
    
    const grid = component.locator('.card-list__grid');
    await expect(grid).toBeVisible();
    
    // Check CSS variable is set
    const columns = await component.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue('--card-list-columns');
    });
    
    expect(columns).toBe('3');
  });

  test('should apply custom columns setting', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
        columns={4}
      />
    );
    
    const columns = await component.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue('--card-list-columns');
    });
    
    expect(columns).toBe('4');
  });

  test('should apply custom gap setting', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
        gap="2rem"
      />
    );
    
    const gap = await component.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.getPropertyValue('--card-list-gap');
    });
    
    expect(gap).toBe('2rem');
  });

  test('should apply custom className to grid', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
        className="custom-grid-class"
      />
    );
    
    const grid = component.locator('.card-list__grid');
    await expect(grid).toHaveClass(/custom-grid-class/);
  });

  test('should use custom getKey function', async ({ mount, page }) => {
    const customGetKey = (item: TestItem) => `custom-${item.id}`;
    
    await mount(
      <CardList
        items={mockItems.slice(0, 2)}
        renderCard={defaultRenderCard}
        getKey={customGetKey}
      />
    );
    
    // Keys are internal to React, so we just verify the component renders correctly
    const cards = page.locator('.card-list__item');
    await expect(cards).toHaveCount(2);
  });

  test('should use index as fallback key when getKey is not provided', async ({ mount, page }) => {
    await mount(
      <CardList
        items={mockItems.slice(0, 2)}
        renderCard={defaultRenderCard}
      />
    );
    
    const cards = page.locator('.card-list__item');
    await expect(cards).toHaveCount(2);
  });

  test('should have correct BEM structure', async ({ mount }) => {
    const component = await mount(
      <CardList
        items={mockItems.slice(0, 2)}
        renderCard={defaultRenderCard}
      />
    );
    
    await expect(component).toBeVisible();
    await expect(component.locator('.card-list__grid')).toBeVisible();
    await expect(component.locator('.card-list__item')).toHaveCount(2);
  });

  test('should forward ref to root element', async ({ mount }) => {
    let refElement: HTMLDivElement | null = null;
    
    await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
        ref={(el: HTMLDivElement | null) => { refElement = el; }}
      />
    );
    
    expect(refElement).toBeTruthy();
    expect(refElement?.tagName).toBe('DIV');
  });

  test('should pass renderCard the correct item and index', async ({ mount, page }) => {
    const renderWithIndex = (item: TestItem, index: number) => (
      <div className="test-card">
        <span data-testid={`item-${index}`}>{item.name}</span>
        <span data-testid={`index-${index}`}>Index: {index}</span>
      </div>
    );

    await mount(
      <CardList
        items={mockItems.slice(0, 3)}
        renderCard={renderWithIndex}
      />
    );
    
    await expect(page.locator('[data-testid="item-0"]')).toContainText('Item 1');
    await expect(page.locator('[data-testid="index-0"]')).toContainText('Index: 0');
    await expect(page.locator('[data-testid="item-1"]')).toContainText('Item 2');
    await expect(page.locator('[data-testid="index-1"]')).toContainText('Index: 1');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
      />
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with loading state', async ({ mount, page }) => {
    await mount(
      <CardList
        items={mockItems}
        renderCard={defaultRenderCard}
        isLoading={true}
      />
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with empty state', async ({ mount, page }) => {
    await mount(
      <CardList
        items={[]}
        renderCard={defaultRenderCard}
      />
    );
    
    await checkA11y(page);
  });

  test.describe('Generic Type Support', () => {
    interface Product {
      productId: number;
      productName: string;
      price: number;
    }

    const products: Product[] = [
      { productId: 1, productName: 'Product A', price: 29.99 },
      { productId: 2, productName: 'Product B', price: 49.99 },
    ];

    test('should work with different item types', async ({ mount, page }) => {
      const renderProduct = (product: Product) => (
        <div className="product-card">
          <h3>{product.productName}</h3>
          <p>${product.price}</p>
        </div>
      );

      await mount(
        <CardList
          items={products}
          renderCard={renderProduct}
          getKey={(p) => String(p.productId)}
        />
      );
      
      await expect(page.locator('text=Product A')).toBeVisible();
      await expect(page.locator('text=$29.99')).toBeVisible();
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle single item', async ({ mount }) => {
      const component = await mount(
        <CardList
          items={[mockItems[0]]}
          renderCard={defaultRenderCard}
        />
      );
      
      const cards = component.locator('.card-list__item');
      await expect(cards).toHaveCount(1);
    });

    test('should handle large number of items', async ({ mount }) => {
      const manyItems = Array.from({ length: 50 }, (_, i) => ({
        id: String(i),
        name: `Item ${i}`,
        value: i * 100,
      }));

      const component = await mount(
        <CardList
          items={manyItems}
          renderCard={defaultRenderCard}
        />
      );
      
      const cards = component.locator('.card-list__item');
      await expect(cards).toHaveCount(50);
    });

    test('should handle columns value of 1', async ({ mount }) => {
      const component = await mount(
        <CardList
          items={mockItems}
          renderCard={defaultRenderCard}
          columns={1}
        />
      );
      
      const columns = await component.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.getPropertyValue('--card-list-columns');
      });
      
      expect(columns).toBe('1');
    });

    test('should handle items with null values gracefully', async ({ mount, page }) => {
      interface NullableItem {
        id: string;
        name: string | null;
        value: number | null;
      }

      const itemsWithNulls: NullableItem[] = [
        { id: '1', name: null, value: null },
        { id: '2', name: 'Valid', value: 100 },
      ];

      const renderNullable = (item: NullableItem) => (
        <div className="nullable-card">
          <h3>{item.name || 'N/A'}</h3>
          <p>Value: {item.value ?? 'N/A'}</p>
        </div>
      );

      await mount(
        <CardList
          items={itemsWithNulls}
          renderCard={renderNullable}
        />
      );
      
      await expect(page.locator('text=N/A')).toBeVisible();
      await expect(page.locator('text=Valid')).toBeVisible();
    });
  });
});
