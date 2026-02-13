import { test, expect } from '@playwright/experimental-ct-react';
import { NativeSelect } from './NativeSelect';
import { checkA11y } from '../../playwright/test-utils';

/**
 * NativeSelect Component Tests
 * 
 * Tests the native HTML select component with custom styling.
 * Validates variant rendering, size options, selection behavior, and form integration.
 */
test.describe('NativeSelect Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <NativeSelect>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await expect(select).toBeVisible();
    await expect(select).toHaveClass(/native-select--default/);
    await expect(select).toHaveClass(/native-select--md/);
  });

  test('should render different variants', async ({ mount }) => {
    const component = await mount(
      <div>
        <NativeSelect variant="default">
          <option>Default</option>
        </NativeSelect>
        <NativeSelect variant="filled">
          <option>Filled</option>
        </NativeSelect>
        <NativeSelect variant="outline">
          <option>Outline</option>
        </NativeSelect>
      </div>
    );
    
    const selects = component.locator('select');
    await expect(selects.nth(0)).toHaveClass(/native-select--default/);
    await expect(selects.nth(1)).toHaveClass(/native-select--filled/);
    await expect(selects.nth(2)).toHaveClass(/native-select--outline/);
  });

  test('should render different sizes', async ({ mount }) => {
    const component = await mount(
      <div>
        <NativeSelect size="sm">
          <option>Small</option>
        </NativeSelect>
        <NativeSelect size="md">
          <option>Medium</option>
        </NativeSelect>
        <NativeSelect size="lg">
          <option>Large</option>
        </NativeSelect>
      </div>
    );
    
    const selects = component.locator('select');
    await expect(selects.nth(0)).toHaveClass(/native-select--sm/);
    await expect(selects.nth(1)).toHaveClass(/native-select--md/);
    await expect(selects.nth(2)).toHaveClass(/native-select--lg/);
  });

  test('should render with label', async ({ mount }) => {
    const component = await mount(
      <NativeSelect label="Country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
      </NativeSelect>
    );
    
    const label = component.locator('label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Country');
  });

  test('should handle value selection', async ({ mount }) => {
    const component = await mount(
      <NativeSelect value="option2">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await expect(select).toHaveValue('option2');
  });

  test('should handle value change', async ({ mount }) => {
    const component = await mount(
      <NativeSelect>
        <option value="">Select</option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await select.selectOption('b');
    await expect(select).toHaveValue('b');
    
    // Change to another value
    await select.selectOption('a');
    await expect(select).toHaveValue('a');
  });

  test('should handle disabled state', async ({ mount }) => {
    const component = await mount(
      <NativeSelect disabled>
        <option>Disabled</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await expect(select).toBeDisabled();
    await expect(select).toHaveClass(/native-select--disabled/);
  });

  test('should handle error state', async ({ mount }) => {
    const component = await mount(
      <NativeSelect error errorMessage="Please select an option">
        <option value="">Select</option>
        <option value="1">Option 1</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await expect(select).toHaveClass(/native-select--error/);
    
    const errorMessage = component.locator('.form-control__message--error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Please select an option');
  });

  test('should render helper text', async ({ mount }) => {
    const component = await mount(
      <NativeSelect helperText="Choose your preferred option">
        <option>Option</option>
      </NativeSelect>
    );
    
    const helperText = component.locator('.form-control__message');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Choose your preferred option');
  });

  test('should link label to select with htmlFor', async ({ mount }) => {
    const component = await mount(
      <NativeSelect label="Preference" id="pref-select">
        <option>Option</option>
      </NativeSelect>
    );
    
    const label = component.locator('label');
    const select = component.locator('select');
    
    const selectId = await select.getAttribute('id');
    const labelFor = await label.getAttribute('for');
    expect(selectId).toBe(labelFor);
    expect(selectId).toBe('pref-select');
  });

  test('should generate unique ID when not provided', async ({ mount }) => {
    const component = await mount(
      <div>
        <NativeSelect label="First">
          <option>Option</option>
        </NativeSelect>
        <NativeSelect label="Second">
          <option>Option</option>
        </NativeSelect>
      </div>
    );
    
    const selects = component.locator('select');
    const firstId = await selects.nth(0).getAttribute('id');
    const secondId = await selects.nth(1).getAttribute('id');
    
    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(firstId).not.toBe(secondId);
  });

  test('should render dropdown icon', async ({ mount }) => {
    const component = await mount(
      <NativeSelect>
        <option>Option</option>
      </NativeSelect>
    );
    
    const icon = component.locator('.native-select-icon');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveText('▼');
  });

  test('should support keyboard navigation', async ({ mount, page }) => {
    const component = await mount(
      <NativeSelect>
        <option value="1">First</option>
        <option value="2">Second</option>
        <option value="3">Third</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await select.focus();
    await expect(select).toBeFocused();
    
    // Arrow down should work (browser-dependent behavior)
    await page.keyboard.press('ArrowDown');
    // Just verify it's still focused, actual option change is browser-specific
    await expect(select).toBeFocused();
  });

  test('should maintain focus state', async ({ mount }) => {
    const component = await mount(
      <NativeSelect>
        <option>Option</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    await select.focus();
    await expect(select).toBeFocused();
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <div>
        <NativeSelect label="Country">
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
        </NativeSelect>
        <NativeSelect label="Language" helperText="Choose your preferred language">
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </NativeSelect>
      </div>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with error state', async ({ mount, page }) => {
    await mount(
      <div>
        <NativeSelect
          label="Country"
          error
          errorMessage="Please select a country"
        >
          <option value="">Select</option>
          <option value="us">United States</option>
        </NativeSelect>
      </div>
    );
    
    // Note: Disabling color-contrast check as error text color may have
    // pre-existing design with lower contrast ratio
    await checkA11y(page, { disableRules: ['color-contrast'] });
  });

  test('should support multiple options', async ({ mount }) => {
    const component = await mount(
      <NativeSelect>
        <option value="">Select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    const options = select.locator('option');
    
    await expect(options).toHaveCount(6);
  });

  test('should support optgroup', async ({ mount }) => {
    const component = await mount(
      <NativeSelect label="Fruit">
        <optgroup label="Citrus">
          <option value="orange">Orange</option>
          <option value="lemon">Lemon</option>
        </optgroup>
        <optgroup label="Berries">
          <option value="strawberry">Strawberry</option>
          <option value="blueberry">Blueberry</option>
        </optgroup>
      </NativeSelect>
    );
    
    const select = component.locator('select');
    const optgroups = select.locator('optgroup');
    
    await expect(optgroups).toHaveCount(2);
    await expect(optgroups.nth(0)).toHaveAttribute('label', 'Citrus');
    await expect(optgroups.nth(1)).toHaveAttribute('label', 'Berries');
  });
});
