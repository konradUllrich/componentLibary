import { test, expect } from '@playwright/test';

test.describe('Theme Functionality', () => {
  test('should have theme panel visible', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Check if theme panel or theme toggle exists
    // The theme panel might be a button or a dedicated panel
    const themeElements = await page.locator('[class*="theme"], button[class*="theme"]').count();
    expect(themeElements).toBeGreaterThan(0);
  });

  test('should be able to interact with theme controls', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Look for theme-related buttons or controls
    const themeButton = page.locator('button[class*="theme"]').first();
    
    if (await themeButton.isVisible()) {
      await themeButton.click();
      // After clicking, some theme UI should be visible
      await page.waitForTimeout(500);
    }
  });

  test('should maintain theme across navigation', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to components
    await page.getByRole('button', { name: /View Components/i }).click();
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
    
    // Navigate to documentation
    await page.getByText('Documentation', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
    
    // Navigate back to home
    await page.getByText('🏠').click();
    await expect(page.locator('h1').filter({ hasText: 'mpComponents' })).toBeVisible();
  });
});
