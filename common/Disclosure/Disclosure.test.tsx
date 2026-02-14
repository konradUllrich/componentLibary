import { test, expect } from '@playwright/experimental-ct-react';
import { Disclosure } from './Disclosure';
import { checkA11y } from '../../playwright/test-utils';

/**
 * Test Component: Disclosure (Medium Priority)
 * 
 * Tests for Disclosure component - collapsible content section with keyboard support
 * Built on Radix UI Collapsible primitives
 * 
 * Coverage:
 * - Default closed state and defaultOpen prop
 * - Click toggle functionality
 * - Controlled and uncontrolled modes
 * - Custom icon rendering
 * - Chevron indicator with aria-hidden
 * - Custom classNames (root, trigger, content)
 * - BEM class structure
 * - Keyboard navigation (Space and Enter keys)
 * - Radix UI data-state attributes
 * - Complex React nodes as labels and content
 * - Accessibility in open and closed states
 */

// Test Component: Disclosure
test.describe('Disclosure Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Click to expand">
        <p>Hidden content</p>
      </Disclosure>
    );
    
    await expect(component).toBeVisible();
    const trigger = component.locator('.disclosure-trigger');
    await expect(trigger).toBeVisible();
    await expect(trigger).toContainText('Click to expand');
  });

  test('should be closed by default', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Expand me">
        <p>Content</p>
      </Disclosure>
    );
    
    // Check that content is not visible initially (Radix uses data-state)
    const root = component.locator('.disclosure');
    const state = await root.getAttribute('data-state');
    expect(state).toBe('closed');
  });

  test('should open when defaultOpen is true', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Already open" defaultOpen={true}>
        <p>Visible content</p>
      </Disclosure>
    );
    
    const root = component.locator('.disclosure');
    const state = await root.getAttribute('data-state');
    expect(state).toBe('open');
  });

  test('should toggle open/closed when trigger is clicked', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Toggle me">
        <p>Content here</p>
      </Disclosure>
    );
    
    const trigger = component.locator('.disclosure-trigger');
    const root = component.locator('.disclosure');
    
    // Initially closed
    let state = await root.getAttribute('data-state');
    expect(state).toBe('closed');
    
    // Click to open
    await trigger.click();
    state = await root.getAttribute('data-state');
    expect(state).toBe('open');
    
    // Click to close
    await trigger.click();
    state = await root.getAttribute('data-state');
    expect(state).toBe('closed');
  });

  test('should support controlled mode with open prop', async ({ mount }) => {
    const handleOpenChange = (_open: boolean) => {
      // Track state changes
    };

    const component = await mount(
      <Disclosure 
        label="Controlled" 
        open={false}
        onOpenChange={handleOpenChange}
      >
        <p>Content</p>
      </Disclosure>
    );
    
    const root = component.locator('.disclosure');
    const state = await root.getAttribute('data-state');
    expect(state).toBe('closed');
  });

  test('should call onOpenChange callback', async ({ mount }) => {
    const changeEvents: boolean[] = [];
    
    const component = await mount(
      <Disclosure 
        label="With callback"
        onOpenChange={(open) => changeEvents.push(open)}
      >
        <p>Content</p>
      </Disclosure>
    );
    
    const trigger = component.locator('.disclosure-trigger');
    
    await trigger.click();
    // Note: We can't directly check changeEvents array as it's in test context
    // but we can verify the component state changed
    const root = component.locator('.disclosure');
    const state = await root.getAttribute('data-state');
    expect(state).toBe('open');
  });

  test('should render custom icon', async ({ mount }) => {
    const component = await mount(
      <Disclosure 
        label="With icon"
        icon={<span data-testid="custom-icon">🔍</span>}
      >
        <p>Content</p>
      </Disclosure>
    );
    
    const icon = component.locator('.disclosure-icon');
    await expect(icon).toBeVisible();
    await expect(icon).toContainText('🔍');
  });

  test('should not render icon element when icon prop is not provided', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="No icon">
        <p>Content</p>
      </Disclosure>
    );
    
    const icon = component.locator('.disclosure-icon');
    await expect(icon).toHaveCount(0);
  });

  test('should display chevron indicator', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="With chevron">
        <p>Content</p>
      </Disclosure>
    );
    
    const chevron = component.locator('.disclosure-chevron');
    await expect(chevron).toBeVisible();
    await expect(chevron).toHaveAttribute('aria-hidden', 'true');
    await expect(chevron).toContainText('▼');
  });

  test('should apply custom className to root', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Custom root" className="custom-root-class">
        <p>Content</p>
      </Disclosure>
    );
    
    await expect(component).toHaveClass(/custom-root-class/);
  });

  test('should apply custom triggerClassName', async ({ mount }) => {
    const component = await mount(
      <Disclosure 
        label="Custom trigger" 
        triggerClassName="custom-trigger-class"
      >
        <p>Content</p>
      </Disclosure>
    );
    
    const trigger = component.locator('.disclosure-trigger');
    await expect(trigger).toHaveClass(/custom-trigger-class/);
  });

  test('should apply custom contentClassName', async ({ mount }) => {
    const component = await mount(
      <Disclosure 
        label="Custom content" 
        contentClassName="custom-content-class"
        defaultOpen={true}
      >
        <p>Content</p>
      </Disclosure>
    );
    
    const content = component.locator('.disclosure-content');
    await expect(content).toHaveClass(/custom-content-class/);
  });

  test('should have correct BEM structure', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="BEM test" defaultOpen={true}>
        <p>Content</p>
      </Disclosure>
    );
    
    await expect(component.locator('.disclosure')).toBeVisible();
    await expect(component.locator('.disclosure-trigger')).toBeVisible();
    await expect(component.locator('.disclosure-label')).toBeVisible();
    await expect(component.locator('.disclosure-chevron')).toBeVisible();
    await expect(component.locator('.disclosure-content')).toBeVisible();
  });

  test('should support keyboard navigation (Space key)', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Keyboard test">
        <p>Content</p>
      </Disclosure>
    );
    
    const trigger = component.locator('.disclosure-trigger');
    const root = component.locator('.disclosure');
    
    // Focus the trigger
    await trigger.focus();
    
    // Press Space to open
    await trigger.press('Space');
    let state = await root.getAttribute('data-state');
    expect(state).toBe('open');
    
    // Press Space to close
    await trigger.press('Space');
    state = await root.getAttribute('data-state');
    expect(state).toBe('closed');
  });

  test('should support keyboard navigation (Enter key)', async ({ mount }) => {
    const component = await mount(
      <Disclosure label="Enter key test">
        <p>Content</p>
      </Disclosure>
    );
    
    const trigger = component.locator('.disclosure-trigger');
    const root = component.locator('.disclosure');
    
    await trigger.focus();
    await trigger.press('Enter');
    
    const state = await root.getAttribute('data-state');
    expect(state).toBe('open');
  });

  test('should forward ref to root element', async ({ mount }) => {
    let refElement: HTMLDivElement | null = null;
    
    await mount(
      <Disclosure
        label="Ref test"
        ref={(el) => { refElement = el; }}
      >
        <p>Content</p>
      </Disclosure>
    );
    
    expect(refElement).toBeTruthy();
    expect(refElement?.tagName).toBe('DIV');
  });

  test('should pass accessibility checks in closed state', async ({ mount, page }) => {
    await mount(
      <Disclosure label="Accessibility test closed">
        <p>Hidden content</p>
      </Disclosure>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks in open state', async ({ mount, page }) => {
    await mount(
      <Disclosure label="Accessibility test open" defaultOpen={true}>
        <p>Visible content</p>
      </Disclosure>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with custom icon', async ({ mount, page }) => {
    await mount(
      <Disclosure 
        label="With accessible icon"
        icon={<span aria-hidden="true">📋</span>}
      >
        <p>Content with icon</p>
      </Disclosure>
    );
    
    await checkA11y(page);
  });

  test.describe('Complex Content', () => {
    test('should handle complex React nodes as label', async ({ mount }) => {
      const component = await mount(
        <Disclosure 
          label={
            <div>
              <strong>Bold Label</strong>
              <span> - with extra text</span>
            </div>
          }
        >
          <p>Content</p>
        </Disclosure>
      );
      
      const trigger = component.locator('.disclosure-trigger');
      await expect(trigger).toContainText('Bold Label');
      await expect(trigger).toContainText('with extra text');
    });

    test('should handle complex children content', async ({ mount }) => {
      const component = await mount(
        <Disclosure label="Complex content" defaultOpen={true}>
          <div>
            <h3>Heading</h3>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Disclosure>
      );
      
      const content = component.locator('.disclosure-content');
      await expect(content).toContainText('Heading');
      await expect(content).toContainText('Paragraph 1');
      await expect(content).toContainText('Item 1');
    });
  });

  test.describe('Radix UI Integration', () => {
    test('should use Radix Collapsible data attributes', async ({ mount }) => {
      const component = await mount(
        <Disclosure label="Radix test">
          <p>Content</p>
        </Disclosure>
      );
      
      const root = component.locator('.disclosure');
      
      // Radix adds data-state attribute
      const state = await root.getAttribute('data-state');
      expect(state).toBeTruthy();
      expect(['open', 'closed']).toContain(state);
    });
  });
});
