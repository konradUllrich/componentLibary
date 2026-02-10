import { test, expect } from '@playwright/test';

test.describe('Documentation Page', () => {
  test('should display documentation page', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to documentation
    await page.getByRole('link', { name: /Documentation/i }).click();
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
  });

  test('should display installation instructions', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to documentation
    await page.getByText('Documentation', { exact: true }).click();
    
    // Check for installation section
    await expect(page.getByText(/Installation/i)).toBeVisible();
  });

  test('should display usage examples', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to documentation
    await page.getByText('Documentation', { exact: true }).click();
    
    // Check for usage section
    await expect(page.getByText(/Usage/i)).toBeVisible();
  });

  test('should display component categories', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to documentation
    await page.getByText('Documentation', { exact: true }).click();
    
    // Check for component categories section
    await expect(page.getByText(/Component Categories/i)).toBeVisible();
  });

  test('should navigate from documentation to components', async ({ page }) => {
    await page.goto('/componentLibary/');
    
    // Navigate to documentation
    await page.getByText('Documentation', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
    
    // Navigate to components from sidebar
    await page.getByText('🧩').click();
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible();
  });
});
