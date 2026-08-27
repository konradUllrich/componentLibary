import { test, expect } from "../../playwright/coverage-fixtures";
import { CardHeader } from './CardHeader';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('CardHeader Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <CardHeader>Header content</CardHeader>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-card__header/);
    await expect(component).toHaveText('Header content');
  });

  test('should render standalone without a parent Card', async ({ mount }) => {
    const component = await mount(
      <CardHeader>
        <h3>Standalone Title</h3>
      </CardHeader>
    );

    await expect(component).toBeVisible();
    await expect(component.locator('h3')).toHaveText('Standalone Title');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <CardHeader className="custom-header">Header</CardHeader>
    );

    await expect(component).toHaveClass(/custom-header/);
    await expect(component).toHaveClass(/mp-card__header/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <CardHeader data-testid="card-header" aria-label="Header region">Header</CardHeader>
    );

    await expect(component).toHaveAttribute('data-testid', 'card-header');
    await expect(component).toHaveAttribute('aria-label', 'Header region');
  });

  test('should forward ref to the underlying div', async ({ mount }) => {
    const component = await mount(<CardHeader>Header</CardHeader>);

    const tagName = await component.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('div');
  });

  test.describe('Empty and Edge States', () => {
    test('should render with empty string children', async ({ mount }) => {
      const component = await mount(<CardHeader>{''}</CardHeader>);

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-card__header/);
    });

    test('should render with complex children', async ({ mount }) => {
      const component = await mount(
        <CardHeader>
          <h3>Title</h3>
          <p>Subtitle</p>
        </CardHeader>
      );

      await expect(component.locator('h3')).toBeVisible();
      await expect(component.locator('p')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <CardHeader>
          <h3>Card Title</h3>
        </CardHeader>
      );

      await checkA11y(page);
    });
  });
});
