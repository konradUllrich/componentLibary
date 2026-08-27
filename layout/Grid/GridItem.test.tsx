import { test, expect } from "../../playwright/coverage-fixtures";
import { GridItem } from './GridItem';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('GridItem Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <GridItem>Item content</GridItem>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-grid-item/);
    await expect(component).toContainText('Item content');
  });

  test.describe('Column span', () => {
    test('should apply preset col-span class for numeric preset value', async ({ mount }) => {
      const component = await mount(
        <GridItem colSpan={6}>Item</GridItem>
      );

      await expect(component).toHaveClass(/mp-grid-item--col-span-6/);
    });

    test('should apply preset col-span class for "full"', async ({ mount }) => {
      const component = await mount(
        <GridItem colSpan="full">Item</GridItem>
      );

      await expect(component).toHaveClass(/mp-grid-item--col-span-full/);
    });

    test('should apply inline style for non-preset col-span value', async ({ mount }) => {
      const component = await mount(
        <GridItem colSpan={20}>Item</GridItem>
      );

      await expect(component).not.toHaveClass(/mp-grid-item--col-span-20/);
      const gridColumn = await component.evaluate(el =>
        window.getComputedStyle(el).gridColumn
      );
      expect(gridColumn).toContain('span 20');
    });
  });

  test.describe('Row span', () => {
    test('should apply preset row-span class', async ({ mount }) => {
      const component = await mount(
        <GridItem rowSpan={3}>Item</GridItem>
      );

      await expect(component).toHaveClass(/mp-grid-item--row-span-3/);
    });

    test('should apply inline style for non-preset row-span value', async ({ mount }) => {
      const component = await mount(
        <GridItem rowSpan={10}>Item</GridItem>
      );

      await expect(component).not.toHaveClass(/mp-grid-item--row-span-10/);
      const gridRow = await component.evaluate(el =>
        window.getComputedStyle(el).gridRow
      );
      expect(gridRow).toContain('span 10');
    });
  });

  test.describe('Placement', () => {
    test('should apply colStart and colEnd via inline style', async ({ mount }) => {
      const component = await mount(
        <GridItem colStart={2} colEnd={4}>Item</GridItem>
      );

      const gridColumnStart = await component.evaluate(el =>
        window.getComputedStyle(el).gridColumnStart
      );
      const gridColumnEnd = await component.evaluate(el =>
        window.getComputedStyle(el).gridColumnEnd
      );
      expect(gridColumnStart).toBe('2');
      expect(gridColumnEnd).toBe('4');
    });

    test('should apply rowStart and rowEnd via inline style', async ({ mount }) => {
      const component = await mount(
        <GridItem rowStart={1} rowEnd={3}>Item</GridItem>
      );

      const gridRowStart = await component.evaluate(el =>
        window.getComputedStyle(el).gridRowStart
      );
      const gridRowEnd = await component.evaluate(el =>
        window.getComputedStyle(el).gridRowEnd
      );
      expect(gridRowStart).toBe('1');
      expect(gridRowEnd).toBe('3');
    });
  });

  test('should merge custom style with computed inline style', async ({ mount }) => {
    const component = await mount(
      <GridItem colSpan={4} style={{ backgroundColor: 'rgb(255, 0, 0)' }}>Item</GridItem>
    );

    const backgroundColor = await component.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBe('rgb(255, 0, 0)');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <GridItem className="custom-grid-item">Item</GridItem>
    );

    await expect(component).toHaveClass(/custom-grid-item/);
    await expect(component).toHaveClass(/mp-grid-item/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <GridItem data-testid="grid-item" aria-label="Main content">Item</GridItem>
    );

    await expect(component).toHaveAttribute('data-testid', 'grid-item');
    await expect(component).toHaveAttribute('aria-label', 'Main content');
  });

  test('should forward ref to the underlying div', async ({ mount }) => {
    const component = await mount(<GridItem>Item</GridItem>);

    const tagName = await component.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('div');
  });

  test.describe('Empty and Edge States', () => {
    test('should render without children', async ({ mount }) => {
      const component = await mount(<GridItem />);

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-grid-item/);
    });

    test('should render without span/placement props', async ({ mount }) => {
      const component = await mount(<GridItem>Plain item</GridItem>);

      await expect(component).toBeVisible();
      await expect(component).not.toHaveClass(/mp-grid-item--col-span/);
      await expect(component).not.toHaveClass(/mp-grid-item--row-span/);
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <GridItem colSpan={6} aria-label="Content area">Item content</GridItem>
      );

      await checkA11y(page);
    });
  });
});
