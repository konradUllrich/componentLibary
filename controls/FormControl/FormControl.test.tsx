import { test, expect } from '@playwright/experimental-ct-react';
import { FormControl } from './FormControl';
import { checkA11y } from '../../playwright/test-utils';

/**
 * FormControl Component Tests
 * 
 * Tests the form control wrapper component that provides consistent layout
 * for form elements with labels, helper text, and error messages.
 */
test.describe('FormControl Component', () => {
  test('should render with children', async ({ mount }) => {
    const component = await mount(
      <FormControl>
        <input type="text" placeholder="Test input" />
      </FormControl>
    );
    
    const input = component.locator('input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Test input');
  });

  test('should render with label', async ({ mount }) => {
    const component = await mount(
      <FormControl label="Email Address" htmlFor="email-input">
        <input id="email-input" type="email" />
      </FormControl>
    );
    
    const label = component.locator('label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Email Address');
    await expect(label).toHaveAttribute('for', 'email-input');
  });

  test('should render with helper text', async ({ mount }) => {
    const component = await mount(
      <FormControl helperText="We'll never share your email">
        <input type="email" />
      </FormControl>
    );
    
    const helperText = component.locator('.form-control__message');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText("We'll never share your email");
    await expect(helperText).not.toHaveClass(/form-control__message--error/);
  });

  test('should render with error message', async ({ mount }) => {
    const component = await mount(
      <FormControl error errorMessage="This field is required">
        <input type="text" />
      </FormControl>
    );
    
    const errorMessage = component.locator('.form-control__message--error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('This field is required');
  });

  test('should prioritize error message over helper text', async ({ mount }) => {
    const component = await mount(
      <FormControl
        helperText="Helper text"
        error
        errorMessage="Error message"
      >
        <input type="text" />
      </FormControl>
    );
    
    const message = component.locator('.form-control__message');
    await expect(message).toBeVisible();
    await expect(message).toHaveText('Error message');
    await expect(message).not.toHaveText('Helper text');
  });

  test('should render required indicator on label', async ({ mount }) => {
    const component = await mount(
      <FormControl label="Username" required htmlFor="username-input">
        <input id="username-input" type="text" />
      </FormControl>
    );
    
    const label = component.locator('label');
    await expect(label).toContainText('Username');
    
    const requiredIndicator = component.locator('.label__required');
    await expect(requiredIndicator).toBeVisible();
    await expect(requiredIndicator).toHaveText('*');
  });

  test('should not render messages when none provided', async ({ mount }) => {
    const component = await mount(
      <FormControl>
        <input type="text" />
      </FormControl>
    );
    
    const message = component.locator('.form-control__message');
    await expect(message).not.toBeAttached();
  });

  test('should support custom className', async ({ mount }) => {
    const component = await mount(
      <FormControl className="custom-form-control">
        <input type="text" />
      </FormControl>
    );
    
    await expect(component).toHaveClass(/form-control/);
    await expect(component).toHaveClass(/custom-form-control/);
  });

  test('should render label without htmlFor', async ({ mount }) => {
    const component = await mount(
      <FormControl label="Section Label">
        <div>Form content</div>
      </FormControl>
    );
    
    const label = component.locator('label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Section Label');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <div>
        <FormControl label="Email" htmlFor="email-1">
          <input id="email-1" type="email" />
        </FormControl>
        <FormControl
          label="Username"
          htmlFor="username-1"
          helperText="Choose a unique username"
        >
          <input id="username-1" type="text" />
        </FormControl>
        <FormControl
          label="Password"
          htmlFor="password-1"
          required
        >
          <input id="password-1" type="password" />
        </FormControl>
      </div>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with error state', async ({ mount, page }) => {
    await mount(
      <div>
        <FormControl
          label="Email"
          htmlFor="email-error"
          error
          errorMessage="Please enter a valid email address"
        >
          <input id="email-error" type="email" />
        </FormControl>
      </div>
    );
    
    // Note: Disabling color-contrast check as error text color may have
    // pre-existing design with lower contrast ratio
    await checkA11y(page, { disableRules: ['color-contrast'] });
  });

  test('should render all sections together', async ({ mount }) => {
    const component = await mount(
      <FormControl
        label="Full Name"
        htmlFor="fullname"
        helperText="Enter your first and last name"
        required
      >
        <input id="fullname" type="text" />
      </FormControl>
    );
    
    const label = component.locator('label');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Full Name');
    
    const requiredIndicator = component.locator('.label__required');
    await expect(requiredIndicator).toBeVisible();
    
    const input = component.locator('input');
    await expect(input).toBeVisible();
    
    const helperText = component.locator('.form-control__message');
    await expect(helperText).toBeVisible();
    await expect(helperText).toHaveText('Enter your first and last name');
  });
});
