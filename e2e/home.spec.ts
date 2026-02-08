import { test, expect } from '@playwright/test';

test.describe('Documentation Home Page', () => {
  test('should display home page with hero section', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/mpComponents/);
    
    // Check hero section content - use more specific selector for the hero heading
    await expect(page.locator('main h1').filter({ hasText: 'mpComponents' })).toBeVisible();
    await expect(page.getByText(/A reusable React component library/i)).toBeVisible();
    
    // Check hero action buttons
    await expect(page.getByRole('button', { name: /View Components/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Read Documentation/i })).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Check feature cards - use heading role for more specific matching
    await expect(page.getByRole('heading', { name: 'Type-Safe Components' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Radix UI Primitives' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TanStack Integration' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CSS-Based Styling' })).toBeVisible();
  });

  test('should navigate to components page from home', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Click on "View Components" button
    await page.getByRole('button', { name: /View Components/i }).click();
    
    // Should show components page - use main area to avoid sidebar heading
    await expect(page.locator('main').getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
  });

  test('should navigate to documentation page from home', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Click on "Read Documentation" button
    await page.getByRole('button', { name: /Read Documentation/i }).click();
    
    // Should show documentation page
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
  });
});
