# Testing Guide

This project uses **Playwright component testing** with **axe-core** for accessibility testing.

## Overview

- **Playwright Component Testing**: Tests components in isolation with real browser rendering
- **axe-core**: Automated accessibility testing to ensure WCAG 2.1 AA compliance
- **Test Location**: Tests are co-located with components (e.g., `Button.test.tsx` next to `Button.tsx`)

## Running Tests

```bash
# Run all component tests
npm run test:ct

# Run with browser UI (see tests execute)
npm run test:ct:headed

# Run with Playwright UI (interactive test runner)
npm run test:ct:ui

# Run in debug mode (step through tests)
npm run test:ct:debug
```

## Writing Tests

### Basic Component Test

```tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test('should render button', async ({ mount }) => {
  const component = await mount(<Button>Click me</Button>);
  await expect(component).toBeVisible();
  await expect(component).toHaveText('Click me');
});
```

### Testing Props and Variants

```tsx
test('should render different variants', async ({ mount }) => {
  const component = await mount(
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
  
  const buttons = component.locator('button');
  await expect(buttons.nth(0)).toHaveClass(/button--primary/);
  await expect(buttons.nth(1)).toHaveClass(/button--secondary/);
});
```

### Testing User Interactions

```tsx
test('should handle click events', async ({ mount }) => {
  let clicked = false;
  const component = await mount(
    <Button onClick={() => { clicked = true; }}>Click me</Button>
  );
  
  await component.click();
  expect(clicked).toBe(true);
});
```

### Accessibility Testing

```tsx
import { checkA11y } from '../../playwright/test-utils';

test('should pass accessibility checks', async ({ mount, page }) => {
  await mount(
    <div>
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
  
  await checkA11y(page);
});
```

### Disabling Specific Accessibility Rules

If you need to disable specific axe-core rules (e.g., for known design decisions):

```tsx
test('should pass accessibility checks', async ({ mount, page }) => {
  await mount(<MyComponent />);
  
  // Disable specific rules
  await checkA11y(page, { 
    disableRules: ['color-contrast'] 
  });
});
```

## Test Utilities

The `playwright/test-utils.ts` file provides helper functions:

- **`checkA11y(page, options?)`**: Run accessibility checks with axe-core
- **`expectVisible(locator)`**: Check if element is visible
- **`expectAccessibleName(locator, name)`**: Check accessible name
- **`expectAccessibleRole(locator, role)`**: Check accessible role

## Best Practices

### 1. Test Component Behavior, Not Implementation

❌ **Don't test internal state or implementation details**
```tsx
// Bad: Testing internal class names
await expect(component).toHaveClass('button__internal-wrapper');
```

✅ **Do test user-facing behavior**
```tsx
// Good: Testing visible behavior
await expect(component).toBeVisible();
await expect(component).toBeDisabled();
```

### 2. Mount Multiple Variants Together

❌ **Don't mount in a loop (causes React root conflicts)**
```tsx
for (const variant of variants) {
  await mount(<Button variant={variant} />); // Error!
}
```

✅ **Do mount all variants at once**
```tsx
const component = await mount(
  <div>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
  </div>
);
```

### 3. Use Semantic Queries

✅ **Prefer semantic queries over CSS selectors**
```tsx
// Good: Using semantic queries
const button = component.getByRole('button', { name: 'Submit' });
const input = component.getByLabel('Email');

// Also good: Using test IDs when needed
const element = component.getByTestId('user-profile');
```

### 4. Test Accessibility

✅ **Always include accessibility tests**
```tsx
test('should be accessible', async ({ mount, page }) => {
  await mount(<MyComponent />);
  await checkA11y(page);
});
```

### 5. Test Keyboard Navigation

✅ **Test keyboard interactions**
```tsx
test('should support keyboard navigation', async ({ mount, page }) => {
  const component = await mount(<Button>Press me</Button>);
  await component.focus();
  await page.keyboard.press('Enter');
  // Assert expected behavior
});
```

## Configuration

Tests are configured in `playwright-ct.config.ts`. Key settings:

- **testDir**: Root directory for test discovery
- **testMatch**: Pattern for test files (`**/*.test.tsx`)
- **timeout**: Maximum time per test (10 seconds)
- **projects**: Browser configurations (currently Chromium only)

## Accessibility Standards

We test against WCAG 2.1 Level AA standards using axe-core:

- **wcag2a**: WCAG 2.0 Level A
- **wcag2aa**: WCAG 2.0 Level AA
- **wcag21a**: WCAG 2.1 Level A
- **wcag21aa**: WCAG 2.1 Level AA

## Troubleshooting

### Tests timing out

Increase the timeout in `playwright-ct.config.ts`:
```ts
timeout: 30 * 1000, // 30 seconds
```

### CSS not loading

Ensure styles are imported in `playwright/index.tsx`:
```tsx
import '../styles/variables.css';
import '../common/Button/Button.css';
```

### React root conflicts

Mount all variants in a single mount call instead of looping.

## Resources

- [Playwright Component Testing Docs](https://playwright.dev/docs/test-components)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
