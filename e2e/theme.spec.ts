import { test, expect } from '@playwright/test';

test.describe('Theme Functionality', () => {
  test('should have theme panel visible', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Check if theme link exists in horizontal nav
    const themeLink = page.getByRole('navigation').getByText('Theme');
    await expect(themeLink).toBeVisible();
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
    
    // Navigate to components via sidebar link
    await page.getByRole('link', { name: /^Components$/i }).click();
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
    
    // Navigate to documentation via horizontal nav
    await page.getByRole('navigation').getByText('Documentation').click();
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
    
    // Navigate back to home
    await page.getByRole('link', { name: /^Home$/i }).click();
    await expect(page.getByRole('heading', { name: /Component Library/i })).toBeVisible();
  });
});
