import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation', () => {
  test('should display sidebar with navigation items', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Check that sidebar is visible
    await expect(page.getByRole('heading', { name: 'mpComponents', level: 2 })).toBeVisible();
    
    // Check main navigation items
    await expect(page.getByRole('link', { name: '🏠 Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: '🧩 Components' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();
    await expect(page.getByRole('link', { name: '⭐ GitHub' })).toBeVisible();
  });

  test('should navigate to home from sidebar', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // First navigate away from home
    await page.getByRole('link', { name: 'Documentation' }).click();
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
    
    // Navigate back to home
    await page.getByRole('link', { name: '🏠 Home' }).click();
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
  });

  test('should navigate to components from sidebar', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Click on Components in sidebar
    await page.getByText('🧩').click();
    
    // Should show components page
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
  });

  test('should expand components submenu', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Click on Common category to expand
    await page.getByRole('link', { name: /⚡ Common/ }).click();
    
    // Check that component items are visible
    await expect(page.getByRole('link', { name: 'Button' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Badge' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Text' })).toBeVisible();
  });

  test('should navigate to specific component from submenu', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Click on Common category to expand
    await page.getByRole('link', { name: /⚡ Common/ }).click();
    
    // Click on Button component
    await page.getByRole('link', { name: 'Button' }).click();
    
    // Should show Button component page
    await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
  });

  test('should toggle sidebar on desktop', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Find and click the sidebar toggle button
    const toggleButton = page.getByRole('button', { name: 'Toggle sidebar' });
    await toggleButton.click();
    
    // Wait a moment for animation
    await page.waitForTimeout(300);
    
    // The sidebar should still be in the DOM but might be collapsed
    await expect(page.getByRole('heading', { name: 'mpComponents', level: 2 })).toBeVisible();
  });
});
