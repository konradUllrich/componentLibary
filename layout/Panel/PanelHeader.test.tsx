import { test, expect } from "../../playwright/coverage-fixtures";
import { PanelHeader } from './PanelHeader';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('PanelHeader Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <PanelHeader>Panel Title</PanelHeader>
    );

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-panel__header/);
    await expect(component).toHaveText('Panel Title');
  });

  test('should render standalone without a parent Panel', async ({ mount }) => {
    const component = await mount(
      <PanelHeader>
        <h3>Standalone Title</h3>
      </PanelHeader>
    );

    await expect(component).toBeVisible();
    await expect(component.locator('h3')).toHaveText('Standalone Title');
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <PanelHeader className="custom-panel-header">Header</PanelHeader>
    );

    await expect(component).toHaveClass(/custom-panel-header/);
    await expect(component).toHaveClass(/mp-panel__header/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <PanelHeader data-testid="panel-header" aria-label="Header region">Header</PanelHeader>
    );

    await expect(component).toHaveAttribute('data-testid', 'panel-header');
    await expect(component).toHaveAttribute('aria-label', 'Header region');
  });

  test('should forward ref to the underlying div', async ({ mount }) => {
    const component = await mount(<PanelHeader>Header</PanelHeader>);

    const tagName = await component.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('div');
  });

  test.describe('Empty and Edge States', () => {
    test('should render without children', async ({ mount }) => {
      const component = await mount(<PanelHeader />);

      await expect(component).toBeAttached();
      await expect(component).toHaveClass(/mp-panel__header/);
    });

    test('should render with complex children', async ({ mount }) => {
      const component = await mount(
        <PanelHeader>
          <h3>Title</h3>
          <span>Subtitle</span>
        </PanelHeader>
      );

      await expect(component.locator('h3')).toBeVisible();
      await expect(component.locator('span')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <PanelHeader>
          <h3>Panel Title</h3>
        </PanelHeader>
      );

      await checkA11y(page);
    });
  });
});
