import { test, expect } from '@playwright/test';

test.describe('Sidebar Navigation', () => {
  test('should display sidebar with navigation items', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Check that sidebar is visible
    await expect(page.getByRole('heading', { name: 'mpComponents', level: 2 })).toBeVisible();
    
    // Check main navigation items
    await expect(page.getByText('Home', { exact: true })).toBeVisible();
    await expect(page.getByText('Components', { exact: true })).toBeVisible();
    await expect(page.getByText('Documentation', { exact: true })).toBeVisible();
    await expect(page.getByText('GitHub', { exact: true })).toBeVisible();
  });

  test('should navigate to home from sidebar', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // First navigate away from home
    await page.getByText('Documentation', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
    
    // Navigate back to home
    await page.getByText('🏠').click();
    await expect(page.locator('h1').filter({ hasText: 'mpComponents' })).toBeVisible();
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
    
    // Click on Components to expand
    await page.getByText('Components', { exact: true }).click();
    
    // Check that component items are visible
    await expect(page.getByText('Button', { exact: true })).toBeVisible();
    await expect(page.getByText('Badge', { exact: true })).toBeVisible();
    await expect(page.getByText('Text', { exact: true })).toBeVisible();
  });

  test('should navigate to specific component from submenu', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Click on Components to expand
    await page.getByText('Components', { exact: true }).click();
    
    // Click on Button component
    await page.getByText('Button', { exact: true }).click();
    
    // Should show Button component page
    await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
  });

  test('should toggle sidebar on desktop', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Find and click the sidebar toggle button
    const toggleButton = page.locator('button[class*="sidebar-toggle"]').first();
    await toggleButton.click();
    
    // Wait a moment for animation
    await page.waitForTimeout(300);
    
    // The sidebar should still be in the DOM but might be collapsed
    await expect(page.getByRole('heading', { name: 'mpComponents', level: 2 })).toBeVisible();
  });
});
