# E2E Testing Guide

This project uses **Playwright** for end-to-end (e2e) testing of the documentation website.

## Overview

- **Playwright E2E Testing**: Tests the full documentation website in a real browser
- **Test Location**: All e2e tests are located in the `e2e/` directory
- **Automatic Server**: Tests automatically start and stop the demo server

## Running E2E Tests

```bash
# Run all e2e tests (headless mode)
npm run test:e2e

# Run with browser UI (see tests execute)
npm run test:e2e:headed

# Run with Playwright UI (interactive test runner)
npm run test:e2e:ui

# Run in debug mode (step through tests)
npm run test:e2e:debug
```

## Test Structure

E2E tests are organized by feature area:

### `e2e/home.spec.ts`
Tests the home page functionality:
- Hero section display
- Features section
- Navigation to components and documentation

### `e2e/sidebar.spec.ts`
Tests sidebar navigation:
- Sidebar visibility and items
- Navigation between pages
- Component submenu expansion
- Sidebar toggle functionality

### `e2e/components.spec.ts`
Tests the components showcase page:
- Components overview page
- Navigation to individual component pages
- Component display verification

### `e2e/documentation.spec.ts`
Tests the documentation page:
- Documentation page display
- Installation instructions
- Usage examples
- Component categories

### `e2e/theme.spec.ts`
Tests theme functionality:
- Theme panel visibility
- Theme controls interaction
- Theme persistence across navigation

## Writing E2E Tests

### Basic E2E Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Area', () => {
  test('should test specific behavior', async ({ page }) => {
    // Navigate to the page
    await page.goto('/componentLibary/');
    
    // Interact with elements
    await page.getByRole('button', { name: 'Click me' }).click();
    
    // Assert expected outcomes
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Navigation Testing

```typescript
test('should navigate between pages', async ({ page }) => {
  await page.goto('/componentLibary/');
  
  // Click navigation element
  await page.getByRole('button', { name: /View Components/i }).click();
  
  // Verify navigation occurred
  await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
});
```

### Testing User Interactions

```typescript
test('should expand and interact with menu', async ({ page }) => {
  await page.goto('/componentLibary/');
  
  // Click to expand menu
  await page.getByText('Components').click();
  
  // Verify submenu items appear
  await expect(page.getByText('Button')).toBeVisible();
  
  // Click submenu item
  await page.getByText('Button').click();
  
  // Verify result
  await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
});
```

### Testing Content Display

```typescript
test('should display expected content', async ({ page }) => {
  await page.goto('/componentLibary/');
  
  // Check multiple content elements
  await expect(page.getByText('Type-Safe Components')).toBeVisible();
  await expect(page.getByText('Radix UI Primitives')).toBeVisible();
});
```

## Configuration

E2E tests are configured in `playwright.config.ts`. Key settings:

- **testDir**: `./e2e` - Root directory for e2e test files
- **timeout**: 30 seconds per test
- **baseURL**: `http://localhost:5173` - Base URL for relative navigation
- **webServer**: Automatically starts `npm run demo` before tests
- **projects**: Currently configured for Chromium (can add Firefox/WebKit)

### Web Server Configuration

The test configuration automatically starts the demo server:

```typescript
webServer: {
  command: 'npm run demo',
  url: 'http://localhost:5173',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

This ensures the documentation site is running before tests execute.

## Best Practices

### 1. Use Semantic Locators

✅ **Prefer accessible locators**
```typescript
// Good: Using semantic queries
await page.getByRole('button', { name: 'Submit' });
await page.getByRole('heading', { name: 'Welcome' });
await page.getByText('Click here');
```

❌ **Avoid brittle selectors**
```typescript
// Bad: Using CSS selectors
await page.locator('.btn-submit');
await page.locator('#heading-1');
```

### 2. Wait for Navigation and State Changes

```typescript
// Wait for navigation
await page.getByRole('button', { name: 'Go' }).click();
await expect(page.getByRole('heading', { name: 'New Page' })).toBeVisible();

// Wait for element state
await expect(page.getByText('Loading...')).toBeHidden();
await expect(page.getByText('Content loaded')).toBeVisible();
```

### 3. Test Real User Flows

```typescript
test('complete user journey', async ({ page }) => {
  // Start at home
  await page.goto('/componentLibary/');
  
  // Navigate to components
  await page.getByRole('button', { name: /View Components/i }).click();
  
  // Browse components
  await page.getByText('Components').click();
  await page.getByText('Button').click();
  
  // Verify final state
  await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
});
```

### 4. Keep Tests Independent

Each test should be able to run independently:

```typescript
test('should test feature A', async ({ page }) => {
  await page.goto('/componentLibary/');
  // Test feature A
});

test('should test feature B', async ({ page }) => {
  await page.goto('/componentLibary/');
  // Test feature B
});
```

### 5. Use Descriptive Test Names

```typescript
// Good: Clear and descriptive
test('should display home page with hero section', async ({ page }) => {});
test('should navigate from home to components page', async ({ page }) => {});

// Bad: Vague
test('test home', async ({ page }) => {});
test('navigation works', async ({ page }) => {});
```

## Debugging Tests

### Run Single Test File

```bash
npx playwright test e2e/home.spec.ts
```

### Run Single Test

```bash
npx playwright test e2e/home.spec.ts -g "should display home page"
```

### Debug Mode

```bash
npm run test:e2e:debug
```

This opens the Playwright Inspector where you can:
- Step through each action
- See selector highlights
- View console logs
- Take screenshots

### Screenshots on Failure

Screenshots are automatically captured on test failure and saved to `test-results/`.

### Traces

Traces are captured on retry and can be viewed with:

```bash
npx playwright show-trace test-results/.../trace.zip
```

## CI Integration

E2E tests are designed to work in CI environments:

- **Retries**: Tests retry 2 times on CI (0 times locally)
- **Workers**: Single worker on CI for stability
- **Server**: Automatically starts fresh server (no reuse)
- **Screenshots**: Captured on failure for debugging

## Troubleshooting

### Port Already in Use

If you see "port 5173 is already in use":
- Stop any running demo server
- Or enable `reuseExistingServer: true` in `playwright.config.ts`

### Tests Timing Out

If tests timeout waiting for server:
- Increase `webServer.timeout` in config
- Check that `npm run demo` starts successfully
- Verify the server responds at `http://localhost:5173`

### Element Not Found

If tests fail to find elements:
- Use Playwright UI mode to inspect selectors
- Check that content loads before assertions
- Use `await page.waitForSelector()` if needed

### Flaky Tests

If tests fail intermittently:
- Add explicit waits for dynamic content
- Use `await expect().toBeVisible()` instead of checking immediately
- Increase timeout for slow operations

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
