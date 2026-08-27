import { test, expect } from "../../playwright/coverage-fixtures";
import { CardContent } from './CardContent';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('CardContent Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <CardContent>Body content</CardContent>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-card__content/);
    await expect(component).toHaveText('Body content');
  });

  test('should render standalone without a parent Card', async ({ mount }) => {
    const component = await mount(
      <CardContent>
        <p>Standalone paragraph</p>
      </CardContent>
    );

    await expect(component).toBeVisible();
    await expect(component.locator('p')).toHaveText('Standalone paragraph');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <CardContent className="custom-content">Content</CardContent>
    );

    await expect(component).toHaveClass(/custom-content/);
    await expect(component).toHaveClass(/mp-card__content/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <CardContent data-testid="card-content" aria-label="Content region">Content</CardContent>
    );

    await expect(component).toHaveAttribute('data-testid', 'card-content');
    await expect(component).toHaveAttribute('aria-label', 'Content region');
  });

  test('should forward ref to the underlying div', async ({ mount }) => {
    const component = await mount(<CardContent>Content</CardContent>);

    const tagName = await component.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('div');
  });

  test.describe('Empty and Edge States', () => {
    test('should render with empty string children', async ({ mount }) => {
      const component = await mount(<CardContent>{''}</CardContent>);

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-card__content/);
    });

    test('should render with complex children', async ({ mount }) => {
      const component = await mount(
        <CardContent>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </CardContent>
      );

      await expect(component.locator('p')).toHaveCount(2);
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <CardContent>
          <p>Meaningful body content.</p>
        </CardContent>
      );

      await checkA11y(page);
    });
  });
});
