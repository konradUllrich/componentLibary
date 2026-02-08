import { test, expect } from '@playwright/test';

test.describe('Components Page', () => {
  test('should display components overview', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to components page
    await page.getByRole('button', { name: /View Components/i }).click();
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
    await expect(page.getByText(/Browse all available components/i)).toBeVisible();
  });

  test('should display component showcase', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to components page
    await page.getByRole('button', { name: /View Components/i }).click();
    
    // Check that component showcase is visible
    await expect(page.locator('.component-showcase, .component-list, .components-page')).toBeVisible();
  });

  test('should navigate to Button component', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Open components submenu
    await page.getByText('Components', { exact: true }).click();
    
    // Click on Button
    await page.getByText('Button', { exact: true }).click();
    
    // Verify Button component page
    await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
  });

  test('should navigate to Badge component', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Open components submenu
    await page.getByText('Components', { exact: true }).click();
    
    // Click on Badge
    await page.getByText('Badge', { exact: true }).click();
    
    // Verify Badge component page
    await expect(page.getByRole('heading', { name: 'Badge' })).toBeVisible();
  });

  test('should navigate to Text component', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Open components submenu
    await page.getByText('Components', { exact: true }).click();
    
    // Click on Text
    await page.getByText('Text', { exact: true }).click();
    
    // Verify Text component page
    await expect(page.getByRole('heading', { name: 'Text' })).toBeVisible();
  });

  test('should navigate to Table component', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Open components submenu
    await page.getByText('Components', { exact: true }).click();
    
    // Click on Table
    await page.getByText('Table', { exact: true }).click();
    
    // Verify Table component page
    await expect(page.getByRole('heading', { name: 'Table' })).toBeVisible();
  });
});
