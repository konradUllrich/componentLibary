import { test, expect } from '@playwright/experimental-ct-react';
import { Flex } from './Flex';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('Flex Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-flex/);
  });

  test('should default to row direction', async ({ mount }) => {
    const component = await mount(
      <Flex>
        <div>Item</div>
      </Flex>
    );

    await expect(component).toHaveClass(/mp-flex--direction-row/);
  });

  test.describe('Direction variants', () => {
    test('should apply column direction', async ({ mount }) => {
      const component = await mount(
        <Flex direction="column">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--direction-column/);
    });

    test('should apply row-reverse direction', async ({ mount }) => {
      const component = await mount(
        <Flex direction="row-reverse">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--direction-row-reverse/);
    });

    test('should apply column-reverse direction', async ({ mount }) => {
      const component = await mount(
        <Flex direction="column-reverse">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--direction-column-reverse/);
    });
  });

  test.describe('Justify content variants', () => {
    test('should apply center justify', async ({ mount }) => {
      const component = await mount(
        <Flex justify="center">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--justify-center/);
    });

    test('should apply space-between justify', async ({ mount }) => {
      const component = await mount(
        <Flex justify="space-between">
          <div>Item 1</div>
          <div>Item 2</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--justify-space-between/);
    });

    test('should apply space-around justify', async ({ mount }) => {
      const component = await mount(
        <Flex justify="space-around">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--justify-space-around/);
    });

    test('should apply space-evenly justify', async ({ mount }) => {
      const component = await mount(
        <Flex justify="space-evenly">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--justify-space-evenly/);
    });

    test('should apply flex-end justify', async ({ mount }) => {
      const component = await mount(
        <Flex justify="flex-end">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--justify-flex-end/);
    });
  });

  test.describe('Align items variants', () => {
    test('should apply center align', async ({ mount }) => {
      const component = await mount(
        <Flex align="center">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--align-center/);
    });

    test('should apply flex-start align', async ({ mount }) => {
      const component = await mount(
        <Flex align="flex-start">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--align-flex-start/);
    });

    test('should apply flex-end align', async ({ mount }) => {
      const component = await mount(
        <Flex align="flex-end">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--align-flex-end/);
    });

    test('should apply baseline align', async ({ mount }) => {
      const component = await mount(
        <Flex align="baseline">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--align-baseline/);
    });
  });

  test.describe('Gap variants', () => {
    test('should apply xs gap class', async ({ mount }) => {
      const component = await mount(
        <Flex gap="xs">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--gap-xs/);
    });

    test('should apply sm gap class', async ({ mount }) => {
      const component = await mount(
        <Flex gap="sm">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--gap-sm/);
    });

    test('should apply md gap class', async ({ mount }) => {
      const component = await mount(
        <Flex gap="md">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--gap-md/);
    });

    test('should apply lg gap class', async ({ mount }) => {
      const component = await mount(
        <Flex gap="lg">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--gap-lg/);
    });

    test('should apply xl gap class', async ({ mount }) => {
      const component = await mount(
        <Flex gap="xl">
          <div>Item</div>
        </Flex>
      );

      await expect(component).toHaveClass(/mp-flex--gap-xl/);
    });

    test('should apply custom gap value via inline style', async ({ mount }) => {
      const component = await mount(
        <Flex gap="24px">
          <div>Item</div>
        </Flex>
      );

      const gap = await component.evaluate(el =>
        window.getComputedStyle(el).gap
      );
      expect(gap).toBe('24px');
    });
  });

  test('should apply wrap modifier', async ({ mount }) => {
    const component = await mount(
      <Flex wrap>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );

    await expect(component).toHaveClass(/mp-flex--wrap/);
  });

  test('should not apply wrap modifier by default', async ({ mount }) => {
    const component = await mount(
      <Flex>
        <div>Item</div>
      </Flex>
    );

    await expect(component).not.toHaveClass(/mp-flex--wrap/);
  });

  test('should apply flex style via prop', async ({ mount }) => {
    const component = await mount(
      <Flex flex={1}>
        <div>Item</div>
      </Flex>
    );

    const flex = await component.evaluate(el =>
      window.getComputedStyle(el).flex
    );
    expect(flex).toContain('1');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <Flex className="custom-flex">
        <div>Item</div>
      </Flex>
    );

    await expect(component).toHaveClass(/custom-flex/);
    await expect(component).toHaveClass(/mp-flex/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <Flex data-testid="flex-container" aria-label="Navigation">
        <div>Item</div>
      </Flex>
    );

    await expect(component).toHaveAttribute('data-testid', 'flex-container');
    await expect(component).toHaveAttribute('aria-label', 'Navigation');
  });

  test.describe('Keyboard Navigation', () => {
    test('should allow tab navigation through focusable children', async ({ mount, page }) => {
      await mount(
        <Flex direction="row" gap="md">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </Flex>
      );

      await page.keyboard.press('Tab');
      await expect(page.locator('button').nth(0)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('button').nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('button').nth(2)).toBeFocused();
    });

    test('should allow tab navigation through focusable children in column direction', async ({ mount, page }) => {
      await mount(
        <Flex direction="column" gap="sm">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </Flex>
      );

      await page.keyboard.press('Tab');
      await expect(page.locator('a').nth(0)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('a').nth(1)).toBeFocused();
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <Flex direction="row" gap="md" aria-label="Item list">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Flex>
      );

      await checkA11y(page);
    });

    test('should pass accessibility checks with buttons', async ({ mount, page }) => {
      await mount(
        <Flex direction="row" gap="sm">
          <button>Action 1</button>
          <button>Action 2</button>
        </Flex>
      );

      await checkA11y(page);
    });
  });

  test.describe('Empty and Edge States', () => {
    test('should render empty Flex without errors', async ({ mount }) => {
      const component = await mount(
        <Flex>{null}</Flex>
      );

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-flex/);
    });

    test('should render Flex with single child', async ({ mount }) => {
      const component = await mount(
        <Flex>
          <div>Only child</div>
        </Flex>
      );

      await expect(component).toBeVisible();
      await expect(component).toContainText('Only child');
    });

    test('should render Flex with many children', async ({ mount }) => {
      const items = Array.from({ length: 10 }, (_, i) => (
        <div key={i}>Item {i + 1}</div>
      ));
      const component = await mount(<Flex wrap>{items}</Flex>);

      await expect(component).toBeVisible();
      await expect(component).toHaveClass(/mp-flex--wrap/);
    });
  });
});
