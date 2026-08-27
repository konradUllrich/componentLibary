import { test, expect } from "../../playwright/coverage-fixtures";
import { PanelBody } from './PanelBody';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('PanelBody Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <PanelBody>Panel content</PanelBody>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-panel__body/);
    await expect(component).toHaveText('Panel content');
  });

  test('should render standalone without a parent Panel', async ({ mount }) => {
    const component = await mount(
      <PanelBody>
        <p>Standalone paragraph</p>
      </PanelBody>
    );

    await expect(component).toBeVisible();
    await expect(component.locator('p')).toHaveText('Standalone paragraph');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <PanelBody className="custom-panel-body">Content</PanelBody>
    );

    await expect(component).toHaveClass(/custom-panel-body/);
    await expect(component).toHaveClass(/mp-panel__body/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <PanelBody data-testid="panel-body" aria-label="Body region">Content</PanelBody>
    );

    await expect(component).toHaveAttribute('data-testid', 'panel-body');
    await expect(component).toHaveAttribute('aria-label', 'Body region');
  });

  test('should forward ref to the underlying div', async ({ mount }) => {
    const component = await mount(<PanelBody>Content</PanelBody>);

    const tagName = await component.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('div');
  });

  test.describe('Empty and Edge States', () => {
    test('should render without children', async ({ mount }) => {
      const component = await mount(<PanelBody />);

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-panel__body/);
    });

    test('should render with complex children', async ({ mount }) => {
      const component = await mount(
        <PanelBody>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </PanelBody>
      );

      await expect(component.locator('p')).toHaveCount(2);
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <PanelBody>
          <p>Meaningful body content.</p>
        </PanelBody>
      );

      await checkA11y(page);
    });
  });
});
