import { test, expect } from '@playwright/experimental-ct-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from './Dialog';
import { checkA11y } from '../../playwright/test-utils';
import { useState } from 'react';

test.describe('Dialog Component', () => {
  test('should render when open', async ({ mount }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent title="Test Dialog" description="Test description">
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = component.locator('.dialog__content');
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

  test('should render title and description', async ({ mount }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent title="Test Title" description="Test Description">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    
    await expect(component.locator('.dialog__title')).toHaveText('Test Title');
    await expect(component.locator('.dialog__description')).toHaveText('Test Description');
  });

  test('should render custom content', async ({ mount }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Custom Title</DialogTitle>
          <DialogDescription>Custom Description</DialogDescription>
          <div>Custom content</div>
        </DialogContent>
      </Dialog>
    );
    
    await expect(component.locator('.dialog__title')).toHaveText('Custom Title');
    await expect(component.locator('.dialog__description')).toHaveText('Custom Description');
    await expect(component.getByText('Custom content')).toBeVisible();
  });

  test('should render close button', async ({ mount }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent title="Test">
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    const closeButton = component.locator('.dialog__close');
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveText('Close');
  });

  test('should close when close button is clicked', async ({ mount }) => {
    const DialogWithState = () => {
      const [open, setOpen] = useState(true);
      
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent title="Test">
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </Dialog>
      );
    };

    const component = await mount(<DialogWithState />);
    
    const content = component.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    const closeButton = component.locator('.dialog__close');
    await closeButton.click();
    
    await expect(content).not.toBeVisible();
  });

  test('should handle overlay click to close', async ({ mount, page }) => {
    const DialogWithState = () => {
      const [open, setOpen] = useState(true);
      
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent title="Test">
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );
    };

    await mount(<DialogWithState />);
    
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    // Click overlay (outside content)
    const overlay = page.locator('.dialog__overlay');
    await overlay.click({ position: { x: 10, y: 10 } });
    
    await expect(content).not.toBeVisible();
  });

  test('should handle escape key to close', async ({ mount, page }) => {
    const DialogWithState = () => {
      const [open, setOpen] = useState(true);
      
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent title="Test">
            <p>Content</p>
          </DialogContent>
        </Dialog>
      );
    };

    await mount(<DialogWithState />);
    
    const content = page.locator('.dialog__content');
    await expect(content).toBeVisible();
    
    // Press Escape key
    await page.keyboard.press('Escape');
    
    await expect(content).not.toBeVisible();
  });

  test('should trap focus within dialog', async ({ mount, page }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent title="Test">
          <button>Button 1</button>
          <button>Button 2</button>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    // Focus should be trapped within dialog
    const buttons = component.locator('button');
    const closeButton = component.locator('.dialog__close');
    
    // Tab through buttons
    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(buttons.nth(1)).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();
  });

  test('should have proper ARIA attributes', async ({ mount }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent title="Test Title" description="Test Description">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = component.locator('.dialog__content');
    await expect(content).toHaveAttribute('role', 'dialog');
    
    // Title and description should be linked via ARIA
    const titleId = await component.locator('.dialog__title').getAttribute('id');
    const descriptionId = await component.locator('.dialog__description').getAttribute('id');
    
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

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <Dialog open={true}>
        <DialogContent className="custom-class" title="Test">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    );
    
    const content = component.locator('.dialog__content');
    await expect(content).toHaveClass(/custom-class/);
  });
});
