import { test, expect } from '@playwright/experimental-ct-react';
import { Label } from './Label';
import { checkA11y } from '../../playwright/test-utils';

/**
 * Label Component Tests
 * 
 * Tests the shared label component for form inputs.
 * Validates label text rendering, required indicator, and htmlFor association.
 */
test.describe('Label Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Label>Email</Label>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Email');
  });

  test('should render with htmlFor attribute', async ({ mount }) => {
    const component = await mount(<Label htmlFor="email-input">Email</Label>);
    await expect(component).toHaveAttribute('for', 'email-input');
  });

  test('should render required indicator', async ({ mount }) => {
    const component = await mount(<Label required>Username</Label>);
    await expect(component).toContainText('Username');
    
    const requiredIndicator = component.locator('.label__required');
    await expect(requiredIndicator).toBeVisible();
    await expect(requiredIndicator).toHaveText('*');
  });

  test('should not render required indicator when not required', async ({ mount }) => {
    const component = await mount(<Label>Username</Label>);
    const requiredIndicator = component.locator('.label__required');
    await expect(requiredIndicator).not.toBeAttached();
  });

  test('should support custom className', async ({ mount }) => {
    const component = await mount(<Label className="custom-label">Custom</Label>);
    await expect(component).toHaveClass(/label/);
    await expect(component).toHaveClass(/custom-label/);
  });

  test('should render children correctly', async ({ mount }) => {
    const component = await mount(
      <Label>
        <span>Complex Label Content</span>
      </Label>
    );
    await expect(component.locator('span')).toBeVisible();
    await expect(component.locator('span')).toHaveText('Complex Label Content');
  });

  test('should support additional HTML attributes', async ({ mount }) => {
    const component = await mount(
      <Label htmlFor="test-input" title="Input label">
        Test Label
      </Label>
    );
    await expect(component).toHaveAttribute('title', 'Input label');
  });

  test('should have correct HTML element', async ({ mount }) => {
    const component = await mount(<Label>Test</Label>);
    const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('label');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <div>
        <Label htmlFor="input-1">Email Address</Label>
        <input id="input-1" type="email" />
        <Label htmlFor="input-2" required>Username</Label>
        <input id="input-2" type="text" />
      </div>
    );
    
    await checkA11y(page);
  });

  test('should properly associate with input element', async ({ mount }) => {
    const component = await mount(
      <div>
        <Label htmlFor="test-input">Test Input</Label>
        <input id="test-input" type="text" />
      </div>
    );
    
    const label = component.locator('label');
    const input = component.locator('input');
    
    const labelFor = await label.getAttribute('for');
    const inputId = await input.getAttribute('id');
    expect(labelFor).toBe(inputId);
  });
});
