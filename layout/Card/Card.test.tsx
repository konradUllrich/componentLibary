import { test, expect } from '@playwright/experimental-ct-react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

test.describe('Card Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>
    );
    
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Card content');
  });

  test('should render different variants', async ({ mount }) => {
    const component = await mount(
      <div>
        <Card variant="elevated">Elevated</Card>
        <Card variant="outlined">Outlined</Card>
        <Card variant="flat">Flat</Card>
      </div>
    );
    
    const cards = component.locator('.card');
    await expect(cards.nth(0)).toHaveClass(/card--elevated/);
    await expect(cards.nth(1)).toHaveClass(/card--outlined/);
    await expect(cards.nth(2)).toHaveClass(/card--flat/);
  });

  test('should render different padding sizes', async ({ mount }) => {
    const component = await mount(
      <div>
        <Card padding="none"><CardContent>None</CardContent></Card>
        <Card padding="sm"><CardContent>Small</CardContent></Card>
        <Card padding="md"><CardContent>Medium</CardContent></Card>
        <Card padding="lg"><CardContent>Large</CardContent></Card>
      </div>
    );
    
    const cards = component.locator('.card');
    await expect(cards.nth(0)).toHaveClass(/card--padding-none/);
    await expect(cards.nth(1)).toHaveClass(/card--padding-sm/);
    await expect(cards.nth(2)).toHaveClass(/card--padding-md/);
    await expect(cards.nth(3)).toHaveClass(/card--padding-lg/);
  });

  test('should support interactive mode', async ({ mount }) => {
    const component = await mount(
      <Card interactive>
        <CardContent>Interactive card</CardContent>
      </Card>
    );
    
    await expect(component).toHaveClass(/card--interactive/);
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <Card className="custom-card">
        <CardContent>Custom</CardContent>
      </Card>
    );
    
    await expect(component).toHaveClass(/custom-card/);
  });

  test('should spread additional props', async ({ mount }) => {
    const component = await mount(
      <Card data-testid="custom-card" aria-label="Information card">
        <CardContent>Content</CardContent>
      </Card>
    );
    
    await expect(component).toHaveAttribute('data-testid', 'custom-card');
    await expect(component).toHaveAttribute('aria-label', 'Information card');
  });

  test('should render with CardHeader', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader>Card Title</CardHeader>
        <CardContent>Card content</CardContent>
      </Card>
    );
    
    const header = component.locator('.card__header');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Card Title');
  });

  test('should render with CardContent', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>This is the card content</CardContent>
      </Card>
    );
    
    const content = component.locator('.card__content');
    await expect(content).toBeVisible();
    await expect(content).toHaveText('This is the card content');
  });

  test('should render with CardFooter', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>Content</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    );
    
    const footer = component.locator('.card__footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveText('Footer actions');
  });

  test('should render complete card with all sections', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader>
          <h3>Card Title</h3>
        </CardHeader>
        <CardContent>
          <p>This is the card content with detailed information.</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );
    
    await expect(component.locator('.card__header')).toBeVisible();
    await expect(component.locator('.card__content')).toBeVisible();
    await expect(component.locator('.card__footer')).toBeVisible();
  });

  test('should support custom className on CardHeader', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader className="custom-header">Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    );
    
    const header = component.locator('.card__header');
    await expect(header).toHaveClass(/custom-header/);
  });

  test('should support custom className on CardContent', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent className="custom-content">Content</CardContent>
      </Card>
    );
    
    const content = component.locator('.card__content');
    await expect(content).toHaveClass(/custom-content/);
  });

  test('should support custom className on CardFooter', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );
    
    const footer = component.locator('.card__footer');
    await expect(footer).toHaveClass(/custom-footer/);
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <Card>
        <CardHeader>
          <h3>Card Title</h3>
        </CardHeader>
        <CardContent>
          <p>Card content with meaningful information.</p>
        </CardContent>
        <CardFooter>
          <button>Learn More</button>
        </CardFooter>
      </Card>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with different variants', async ({ mount, page }) => {
    await mount(
      <div>
        <Card variant="elevated">
          <CardContent>Elevated card</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>Outlined card</CardContent>
        </Card>
        <Card variant="flat">
          <CardContent>Flat card</CardContent>
        </Card>
      </div>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with interactive card', async ({ mount, page }) => {
    await mount(
      <Card interactive>
        <CardContent>Interactive card content</CardContent>
      </Card>
    );
    
    await checkA11y(page);
  });

  test.describe('Visual States', () => {
    test('should have proper structure', async ({ mount }) => {
      const component = await mount(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      
      // Check for flex column layout
      const display = await component.evaluate(el => 
        window.getComputedStyle(el).display
      );
      expect(display).toBe('flex');
      
      const flexDirection = await component.evaluate(el => 
        window.getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('column');
    });

    test('should apply border radius', async ({ mount }) => {
      const component = await mount(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      
      const borderRadius = await component.evaluate(el => 
        window.getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toBeTruthy();
    });

    test('should handle click events when interactive', async ({ mount }) => {
      let clicked = false;
      const component = await mount(
        <Card interactive onClick={() => { clicked = true; }}>
          <CardContent>Clickable card</CardContent>
        </Card>
      );
      
      await component.click();
      expect(clicked).toBe(true);
    });
  });
});
