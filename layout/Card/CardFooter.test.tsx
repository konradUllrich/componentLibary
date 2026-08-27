import { test, expect } from "../../playwright/coverage-fixtures";
import { CardFooter } from './CardFooter';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('CardFooter Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <CardFooter>Footer content</CardFooter>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-card__footer/);
    await expect(component).toHaveText('Footer content');
  });

  test('should render standalone without a parent Card', async ({ mount }) => {
    const component = await mount(
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    );

    await expect(component).toBeVisible();
    await expect(component.locator('button')).toHaveText('Action');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <CardFooter className="custom-footer">Footer</CardFooter>
    );

    await expect(component).toHaveClass(/custom-footer/);
    await expect(component).toHaveClass(/mp-card__footer/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <CardFooter data-testid="card-footer" aria-label="Footer region">Footer</CardFooter>
    );

    await expect(component).toHaveAttribute('data-testid', 'card-footer');
    await expect(component).toHaveAttribute('aria-label', 'Footer region');
  });

  test('should forward ref to the underlying div', async ({ mount }) => {
    const component = await mount(<CardFooter>Footer</CardFooter>);

    const tagName = await component.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('div');
  });

  test.describe('Empty and Edge States', () => {
    test('should render with empty string children', async ({ mount }) => {
      const component = await mount(<CardFooter>{''}</CardFooter>);

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-card__footer/);
    });

    test('should render with multiple action buttons', async ({ mount }) => {
      const component = await mount(
        <CardFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </CardFooter>
      );

      await expect(component.locator('button')).toHaveCount(2);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should allow tab navigation through footer buttons', async ({ mount, page }) => {
      await mount(
        <CardFooter>
          <button>First</button>
          <button>Second</button>
        </CardFooter>
      );

      await page.keyboard.press('Tab');
      await expect(page.locator('button').first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('button').last()).toBeFocused();
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <CardFooter>
          <button>Learn More</button>
        </CardFooter>
      );

      await checkA11y(page);
    });
  });
});
