import { test, expect } from '@playwright/experimental-ct-react';
import { Card, CardHeader, CardContent, CardFooter } from './index';
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
    
    const cards = component.locator('.mp-card');
    await expect(cards.nth(0)).toHaveClass(/mp-card--elevated/);
    await expect(cards.nth(1)).toHaveClass(/mp-card--outlined/);
    await expect(cards.nth(2)).toHaveClass(/mp-card--flat/);
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
    
    const cards = component.locator('.mp-card');
    await expect(cards.nth(0)).toHaveClass(/mp-card--padding-none/);
    await expect(cards.nth(1)).toHaveClass(/mp-card--padding-sm/);
    await expect(cards.nth(2)).toHaveClass(/mp-card--padding-md/);
    await expect(cards.nth(3)).toHaveClass(/mp-card--padding-lg/);
  });

  test('should support interactive mode', async ({ mount }) => {
    const component = await mount(
      <Card interactive>
        <CardContent>Interactive card</CardContent>
      </Card>
    );
    
    await expect(component).toHaveClass(/mp-card--interactive/);
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
    
    const header = component.locator('.mp-card__header');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Card Title');
  });

  test('should render with CardContent', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>This is the card content</CardContent>
      </Card>
    );
    
    const content = component.locator('.mp-card__content');
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
    
    const footer = component.locator('.mp-card__footer');
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
    
    await expect(component.locator('.mp-card__header')).toBeVisible();
    await expect(component.locator('.mp-card__content')).toBeVisible();
    await expect(component.locator('.mp-card__footer')).toBeVisible();
  });

  test('should support custom className on CardHeader', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardHeader className="custom-header">Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    );
    
    const header = component.locator('.mp-card__header');
    await expect(header).toHaveClass(/custom-header/);
  });

  test('should support custom className on CardContent', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent className="custom-content">Content</CardContent>
      </Card>
    );
    
    const content = component.locator('.mp-card__content');
    await expect(content).toHaveClass(/custom-content/);
  });

  test('should support custom className on CardFooter', async ({ mount }) => {
    const component = await mount(
      <Card>
        <CardContent>Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>
    );
    
    const footer = component.locator('.mp-card__footer');
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

  test.describe('Keyboard Navigation', () => {
    test('should be focusable when tabIndex is set', async ({ mount, page }) => {
      await mount(
        <Card tabIndex={0} aria-label="Focusable card">
          <CardContent>Focusable card content</CardContent>
        </Card>
      );

      await page.keyboard.press('Tab');
      const card = page.locator('.mp-card');
      await expect(card).toBeFocused();
    });

    test('should support keyboard activation when interactive and focusable', async ({ mount }) => {
      let activated = false;
      const component = await mount(
        <Card
          interactive
          tabIndex={0}
          role="button"
          aria-label="Activate card"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') activated = true;
          }}
        >
          <CardContent>Keyboard card</CardContent>
        </Card>
      );

      await component.focus();
      await component.press('Enter');
      expect(activated).toBe(true);
    });

    test('should allow tab navigation through focusable children', async ({ mount, page }) => {
      await mount(
        <Card>
          <CardContent>
            <a href="#">Link one</a>
            <a href="#">Link two</a>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      await page.keyboard.press('Tab');
      await expect(page.locator('a').first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('a').last()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.locator('button')).toBeFocused();
    });
  });

  test.describe('Empty and Edge States', () => {
    test('should render card with no header', async ({ mount }) => {
      const component = await mount(
        <Card>
          <CardContent>No header here</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      await expect(component.locator('.mp-card__header')).not.toBeAttached();
      await expect(component.locator('.mp-card__content')).toBeVisible();
      await expect(component.locator('.mp-card__footer')).toBeVisible();
    });

    test('should render card with no footer', async ({ mount }) => {
      const component = await mount(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardContent>No footer here</CardContent>
        </Card>
      );

      await expect(component.locator('.mp-card__header')).toBeVisible();
      await expect(component.locator('.mp-card__content')).toBeVisible();
      await expect(component.locator('.mp-card__footer')).not.toBeAttached();
    });

    test('should render card with only content (no header or footer)', async ({ mount }) => {
      const component = await mount(
        <Card>
          <CardContent>Only content</CardContent>
        </Card>
      );

      await expect(component.locator('.mp-card__header')).not.toBeAttached();
      await expect(component.locator('.mp-card__content')).toBeVisible();
      await expect(component.locator('.mp-card__footer')).not.toBeAttached();
    });

    test('should render card with empty content', async ({ mount }) => {
      const component = await mount(
        <Card>
          <CardContent>{''}</CardContent>
        </Card>
      );

      await expect(component).toBeVisible();
      await expect(component.locator('.mp-card__content')).toBeAttached();
    });

    test('should render card as link wrapper', async ({ mount }) => {
      const component = await mount(
        <a href="/details" style={{ textDecoration: 'none', display: 'block' }}>
          <Card interactive>
            <CardContent>Card as link</CardContent>
          </Card>
        </a>
      );

      await expect(component).toHaveAttribute('href', '/details');
      await expect(component.locator('.mp-card--interactive')).toBeVisible();
    });
  });

  test.describe('Card as Link', () => {
    test('should render as <a> when href is provided', async ({ mount }) => {
      const component = await mount(
        <Card href="/details">
          <CardContent>Link card</CardContent>
        </Card>
      );

      const tagName = await component.evaluate(el => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
    });

    test('should have href attribute set correctly', async ({ mount }) => {
      const component = await mount(
        <Card href="/profile">
          <CardContent>Profile</CardContent>
        </Card>
      );

      await expect(component).toHaveAttribute('href', '/profile');
    });

    test('should apply mp-card--link and mp-card--interactive classes', async ({ mount }) => {
      const component = await mount(
        <Card href="/details">
          <CardContent>Link card</CardContent>
        </Card>
      );

      await expect(component).toHaveClass(/mp-card--link/);
      await expect(component).toHaveClass(/mp-card--interactive/);
    });

    test('should set rel="noopener noreferrer" automatically when target="_blank"', async ({ mount }) => {
      const component = await mount(
        <Card href="https://example.com" target="_blank">
          <CardContent>External link</CardContent>
        </Card>
      );

      await expect(component).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should respect explicitly provided rel prop', async ({ mount }) => {
      const component = await mount(
        <Card href="https://example.com" target="_blank" rel="noopener">
          <CardContent>Custom rel</CardContent>
        </Card>
      );

      await expect(component).toHaveAttribute('rel', 'noopener');
    });

    test('should be keyboard focusable via Tab navigation', async ({ mount, page }) => {
      await mount(
        <Card href="/details">
          <CardContent>Focusable link card</CardContent>
        </Card>
      );

      await page.keyboard.press('Tab');
      const card = page.locator('.mp-card--link');
      await expect(card).toBeFocused();
    });

    test('should pass accessibility checks', async ({ mount, page }) => {
      await mount(
        <Card href="/details" aria-label="View details">
          <CardContent>Accessible link card</CardContent>
        </Card>
      );

      await checkA11y(page);
    });
  });
});
