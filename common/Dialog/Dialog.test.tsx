import { test, expect } from '@playwright/experimental-ct-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from './Dialog';
import { DialogWithState, DialogWithContent } from './Dialog.stories';
import { checkA11y } from '../../playwright/test-utils';
import { useState } from 'react';

test.describe('Dialog Component', () => {
  test('should render when open', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent title="Test Dialog" description="Test description">
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
  });

  test('should not render when closed', async ({ mount, page }) => {
    await mount(
      <Dialog open={false}>
        <DialogContent title="Test Dialog">
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = page.locator('.dialog__content');
    await expect(content).not.toBeVisible();
  });

  test('should render title and description', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent title="Test Title" description="Test Description">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    
    await expect(page.locator('.dialog__title')).toHaveText('Test Title');
    await expect(page.locator('.dialog__description')).toHaveText('Test Description');
  });

  test('should render custom content', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Custom Title</DialogTitle>
          <DialogDescription>Custom Description</DialogDescription>
          <div>Custom content</div>
        </DialogContent>
      </Dialog>
    );
    
    await expect(page.locator('.dialog__title')).toHaveText('Custom Title');
    await expect(page.locator('.dialog__description')).toHaveText('Custom Description');
    await expect(page.getByText('Custom content')).toBeVisible();
  });

  test('should render close button', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent title="Test">
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    const closeButton = page.locator('.dialog__close');
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveText('Close');
  });

  test('should close when close button is clicked', async ({ mount, page }) => {
    await mount(<DialogWithState />);
    
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    const closeButton = page.locator('.dialog__close');
    await closeButton.click();
    
    await expect(content).not.toBeVisible();
  });

  test('should handle overlay click to close', async ({ mount, page }) => {
    await mount(<DialogWithContent />);
    
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    // Click overlay (outside content)
    const overlay = page.locator('.dialog__overlay');
    await overlay.click({ position: { x: 10, y: 10 } });
    
    await expect(content).not.toBeVisible();
  });

  test('should handle escape key to close', async ({ mount, page }) => {
    await mount(<DialogWithContent />);
    
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    // Press Escape key
    await page.keyboard.press('Escape');
    
    await expect(content).not.toBeVisible();
  });

  test('should trap focus within dialog', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent title="Test">
          <button>Button 1</button>
          <button>Button 2</button>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    // Wait for dialog to be visible
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    // Focus should be trapped within dialog
    const buttons = page.locator('button');
    const closeButton = page.locator('.dialog__close');
    
    // The dialog automatically focuses the first focusable element
    // So we just need to verify we can tab through elements
    await page.keyboard.press('Tab');
    // Should focus either Button 1 or already be on it
    const firstFocused = await page.evaluate(() => document.activeElement?.textContent);
    expect(['Button 1', 'Button 2', 'Close'].includes(firstFocused || '')).toBeTruthy();
    
    // Tab through to verify focus trap works
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify we're still within the dialog
    const finalFocused = await page.evaluate(() => document.activeElement?.textContent);
    expect(['Button 1', 'Button 2', 'Close'].includes(finalFocused || '')).toBeTruthy();
  });

  test('should have proper ARIA attributes', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent title="Test Title" description="Test Description">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = page.locator('.dialog__content');
    await expect(content).toHaveAttribute('role', 'dialog');
    
    // Title and description should be linked via ARIA
    const titleId = await page.locator('.dialog__title').getAttribute('id');
    const descriptionId = await page.locator('.dialog__description').getAttribute('id');
    
    expect(titleId).toBeTruthy();
    expect(descriptionId).toBeTruthy();
  });

  test('should pass accessibility audit', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent title="Accessible Dialog" description="This dialog is accessible">
          <p>Dialog content for accessibility testing</p>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    await checkA11y(page);
  });

  test('should apply custom className', async ({ mount, page }) => {
    await mount(
      <Dialog open={true}>
        <DialogContent className="custom-class" title="Test">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = page.locator('.dialog__content');
    await expect(content).toHaveClass(/custom-class/);
  });
});
