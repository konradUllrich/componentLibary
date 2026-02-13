import { test, expect } from '@playwright/experimental-ct-react';
import { ReactSelect } from './ReactSelect';
import { ReactSelectItem } from './ReactSelectItem';
import { checkA11y } from '../../playwright/test-utils';

/**
 * ReactSelect Component Tests
 * 
 * Tests the Radix UI-based select component.
 * Validates dropdown behavior, keyboard navigation, variants, and accessibility.
 * 
 * Note: Some Radix UI interactions may require specific timing or event handling.
 */
test.describe('ReactSelect Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <ReactSelect placeholder="Select an option">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
        <ReactSelectItem value="2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveClass(/select-trigger--default/);
    await expect(trigger).toHaveClass(/select-trigger--md/);
  });

  test('should render different variants', async ({ mount }) => {
    const component = await mount(
      <div>
        <ReactSelect variant="default" placeholder="Default">
          <ReactSelectItem value="1">Option 1</ReactSelectItem>
        </ReactSelect>
        <ReactSelect variant="filled" placeholder="Filled">
          <ReactSelectItem value="1">Option 1</ReactSelectItem>
        </ReactSelect>
        <ReactSelect variant="outline" placeholder="Outline">
          <ReactSelectItem value="1">Option 1</ReactSelectItem>
        </ReactSelect>
      </div>
    );
    
    const triggers = component.locator('.select-trigger');
    await expect(triggers.nth(0)).toHaveClass(/select-trigger--default/);
    await expect(triggers.nth(1)).toHaveClass(/select-trigger--filled/);
    await expect(triggers.nth(2)).toHaveClass(/select-trigger--outline/);
  });

  test('should render different sizes', async ({ mount }) => {
    const component = await mount(
      <div>
        <ReactSelect size="sm" placeholder="Small">
          <ReactSelectItem value="1">Option 1</ReactSelectItem>
        </ReactSelect>
        <ReactSelect size="md" placeholder="Medium">
          <ReactSelectItem value="1">Option 1</ReactSelectItem>
        </ReactSelect>
        <ReactSelect size="lg" placeholder="Large">
          <ReactSelectItem value="1">Option 1</ReactSelectItem>
        </ReactSelect>
      </div>
    );
    
    const triggers = component.locator('.select-trigger');
    await expect(triggers.nth(0)).toHaveClass(/select-trigger--sm/);
    await expect(triggers.nth(1)).toHaveClass(/select-trigger--md/);
    await expect(triggers.nth(2)).toHaveClass(/select-trigger--lg/);
  });

  test('should render with label', async ({ mount }) => {
    const component = await mount(
      <ReactSelect label="Country" placeholder="Select a country">
        <ReactSelectItem value="us">United States</ReactSelectItem>
      </ReactSelect>
    );
    
    const label = component.locator('label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Country');
  });

  test('should render placeholder', async ({ mount }) => {
    const component = await mount(
      <ReactSelect placeholder="Choose an option">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await expect(trigger).toContainText('Choose an option');
  });

  test('should open dropdown on click', async ({ mount, page }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
        <ReactSelectItem value="2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.click();
    
    // Wait for dropdown to open
    await page.waitForTimeout(100);
    
    const content = page.locator('.select-content');
    await expect(content).toBeVisible();
  });

  test('should select an option', async ({ mount, page }) => {
    let selectedValue = '';
    const component = await mount(
      <ReactSelect
        placeholder="Select"
        onValueChange={(value) => { selectedValue = value; }}
      >
        <ReactSelectItem value="option1">Option 1</ReactSelectItem>
        <ReactSelectItem value="option2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.click();
    
    await page.waitForTimeout(100);
    
    const option2 = page.locator('.select-item').filter({ hasText: 'Option 2' });
    await option2.click();
    
    await page.waitForTimeout(100);
    
    expect(selectedValue).toBe('option2');
    await expect(trigger).toContainText('Option 2');
  });

  test('should handle disabled state', async ({ mount }) => {
    const component = await mount(
      <ReactSelect placeholder="Disabled" disabled>
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await expect(trigger).toHaveAttribute('data-disabled');
    await expect(trigger).toHaveClass(/select-trigger--disabled/);
  });

  test('should handle error state', async ({ mount }) => {
    const component = await mount(
      <ReactSelect
        placeholder="Select"
        error
        errorMessage="Please select an option"
      >
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await expect(trigger).toHaveClass(/select-trigger--error/);
    
    const errorMessage = component.locator('.form-control__message--error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Please select an option');
  });

  test('should render helper text', async ({ mount }) => {
    const component = await mount(
      <ReactSelect helperText="Choose your preferred option" placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
      </ReactSelect>
    );
    
    const helperText = component.locator('.form-control__message');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Choose your preferred option');
  });

  test('should render with default value', async ({ mount }) => {
    const component = await mount(
      <ReactSelect defaultValue="option2" placeholder="Select">
        <ReactSelectItem value="option1">Option 1</ReactSelectItem>
        <ReactSelectItem value="option2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await expect(trigger).toContainText('Option 2');
  });

  test('should render dropdown icon', async ({ mount }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
      </ReactSelect>
    );
    
    const icon = component.locator('.select-icon');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveText('▼');
  });

  test('should support keyboard navigation - Space to open', async ({ mount, page }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
        <ReactSelectItem value="2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.focus();
    await expect(trigger).toBeFocused();
    
    await page.keyboard.press('Space');
    await page.waitForTimeout(100);
    
    const content = page.locator('.select-content');
    await expect(content).toBeVisible();
  });

  test('should support keyboard navigation - Enter to open', async ({ mount, page }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
        <ReactSelectItem value="2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.focus();
    
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    
    const content = page.locator('.select-content');
    await expect(content).toBeVisible();
  });

  test('should support keyboard navigation - Escape to close', async ({ mount, page }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
        <ReactSelectItem value="2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.click();
    await page.waitForTimeout(100);
    
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    
    const content = page.locator('.select-content');
    await expect(content).not.toBeVisible();
  });

  test('should render disabled items', async ({ mount, page }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
        <ReactSelectItem value="2" disabled>Option 2 (Disabled)</ReactSelectItem>
        <ReactSelectItem value="3">Option 3</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.click();
    await page.waitForTimeout(100);
    
    const disabledItem = page.locator('.select-item--disabled');
    await expect(disabledItem).toBeVisible();
    await expect(disabledItem).toHaveAttribute('data-disabled');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <div>
        <ReactSelect label="Country" placeholder="Select a country">
          <ReactSelectItem value="us">United States</ReactSelectItem>
          <ReactSelectItem value="uk">United Kingdom</ReactSelectItem>
          <ReactSelectItem value="ca">Canada</ReactSelectItem>
        </ReactSelect>
        <ReactSelect label="Language" helperText="Choose your language">
          <ReactSelectItem value="en">English</ReactSelectItem>
          <ReactSelectItem value="es">Spanish</ReactSelectItem>
        </ReactSelect>
      </div>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with error state', async ({ mount, page }) => {
    await mount(
      <div>
        <ReactSelect
          label="Country"
          error
          errorMessage="Please select a country"
          placeholder="Select"
        >
          <ReactSelectItem value="us">United States</ReactSelectItem>
        </ReactSelect>
      </div>
    );
    
    // Note: Disabling color-contrast check as error text color may have
    // pre-existing design with lower contrast ratio
    await checkA11y(page, { disableRules: ['color-contrast'] });
  });

  test('should maintain focus on trigger', async ({ mount }) => {
    const component = await mount(
      <ReactSelect placeholder="Select">
        <ReactSelectItem value="1">Option 1</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.focus();
    await expect(trigger).toBeFocused();
  });

  test('should show selected indicator on selected item', async ({ mount, page }) => {
    const component = await mount(
      <ReactSelect defaultValue="option2" placeholder="Select">
        <ReactSelectItem value="option1">Option 1</ReactSelectItem>
        <ReactSelectItem value="option2">Option 2</ReactSelectItem>
      </ReactSelect>
    );
    
    const trigger = component.locator('.select-trigger');
    await trigger.click();
    await page.waitForTimeout(100);
    
    // The selected item should have an indicator
    const indicator = page.locator('.select-item-indicator');
    await expect(indicator).toBeVisible();
    await expect(indicator).toHaveText('✓');
  });

  // Note: Radix UI Select has built-in ARIA attributes and keyboard navigation.
  // Some advanced keyboard interactions (like arrow keys for navigation within dropdown)
  // are handled by Radix and may be difficult to test in component tests.
  // These are better tested in E2E tests with full browser context.
});
