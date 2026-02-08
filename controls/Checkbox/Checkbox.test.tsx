import { test, expect } from '@playwright/experimental-ct-react';
import { Checkbox } from './Checkbox';
import { checkA11y } from '../../playwright/test-utils';

test.describe('Checkbox Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Checkbox inlineLabel="Accept terms" />);
    const checkbox = component.locator('input[type="checkbox"]');
    // Checkbox input may be visually hidden but still in DOM
    await expect(checkbox).toBeAttached();
    const label = component.locator('.checkbox-label');
    await expect(label).toBeVisible();
  });

  test('should render with top label', async ({ mount }) => {
    const component = await mount(
      <Checkbox label="Notifications" inlineLabel="Email me updates" />
    );
    const labels = component.locator('label');
    await expect(labels.first()).toContainText('Notifications');
    await expect(component.locator('.checkbox-text')).toContainText('Email me updates');
  });

  test('should handle checked state', async ({ mount }) => {
    const component = await mount(
      <Checkbox inlineLabel="Accept terms" defaultChecked />
    );
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toBeChecked();
  });

  test('should toggle on click', async ({ mount }) => {
    const component = await mount(<Checkbox inlineLabel="Toggle me" />);
    const checkbox = component.locator('input[type="checkbox"]');
    const label = component.locator('.checkbox-label');
    
    await expect(checkbox).not.toBeChecked();
    // Click the label which is the visible part
    await label.click();
    await expect(checkbox).toBeChecked();
    await label.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('should handle disabled state', async ({ mount }) => {
    const component = await mount(
      <Checkbox inlineLabel="Disabled" disabled />
    );
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveClass(/checkbox-input--disabled/);
  });

  test('should handle error state', async ({ mount }) => {
    const component = await mount(
      <Checkbox
        label="Terms"
        inlineLabel="Accept terms"
        error
        errorMessage="You must accept the terms"
      />
    );
    const checkbox = component.locator('input[type="checkbox"]');
    await expect(checkbox).toHaveClass(/checkbox-input--error/);
    
    const errorMsg = component.locator('.form-control__message--error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('You must accept the terms');
  });

  test('should link label to checkbox', async ({ mount }) => {
    const component = await mount(
      <Checkbox inlineLabel="Click me" id="custom-checkbox" />
    );
    const checkbox = component.locator('input[type="checkbox"]');
    const label = component.locator('.checkbox-label');
    
    const checkboxId = await checkbox.getAttribute('id');
    const labelFor = await label.getAttribute('for');
    expect(checkboxId).toBe(labelFor);
  });

  test('should support keyboard interaction', async ({ mount, page }) => {
    const component = await mount(<Checkbox inlineLabel="Press Space" />);
    const checkbox = component.locator('input[type="checkbox"]');
    
    await checkbox.focus();
    await expect(checkbox).toBeFocused();
    
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
    
    await page.keyboard.press('Space');
    await expect(checkbox).not.toBeChecked();
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <div>
        <Checkbox label="Email Notifications" inlineLabel="Receive emails" />
        <Checkbox inlineLabel="Newsletter subscription" />
        <Checkbox inlineLabel="Accept terms" defaultChecked />
      </div>
    );
    
    // Note: Disabling color-contrast check (see similar note in other tests)
    await checkA11y(page, { disableRules: ['color-contrast'] });
  });

  test('should pass accessibility checks with error state', async ({ mount, page }) => {
    await mount(
      <div>
        <Checkbox
          label="Terms"
          inlineLabel="I accept the terms"
          error
          errorMessage="You must accept the terms"
        />
      </div>
    );
    
    // Note: Disabling color-contrast check (see similar note in other tests)
    await checkA11y(page, { disableRules: ['color-contrast'] });
  });
});
