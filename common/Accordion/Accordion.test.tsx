import { test, expect } from '@playwright/experimental-ct-react';
import { Accordion } from './Accordion';
import { checkA11y } from '../../playwright/test-utils';
import React from 'react';

const mockItems = [
  { id: 'item1', title: 'Section 1', content: <div>Content 1</div> },
  { id: 'item2', title: 'Section 2', content: <div>Content 2</div> },
  { id: 'item3', title: 'Section 3', content: <div>Content 3</div> },
];

test.describe('Accordion Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<Accordion items={mockItems} />);
    await expect(component).toBeVisible();
  });

  test('should render all accordion items', async ({ mount }) => {
    const component = await mount(<Accordion items={mockItems} />);
    
    for (const item of mockItems) {
      const trigger = component.locator('.accordion-trigger', { hasText: item.title as string });
      await expect(trigger).toBeVisible();
    }
  });

  test('should expand item when clicked', async ({ mount }) => {
    const component = await mount(<Accordion items={mockItems} />);
    
    // Click first item
    const firstTrigger = component.locator('.accordion-trigger', { hasText: 'Section 1' });
    await firstTrigger.click();
    
    // Wait for content to be visible
    const content = component.locator('.accordion-content', { hasText: 'Content 1' });
    await expect(content).toBeVisible();
  });

  test('should collapse item when clicked again (single mode)', async ({ mount }) => {
    const component = await mount(<Accordion items={mockItems} collapsible={true} />);
    
    const firstTrigger = component.locator('.accordion-trigger', { hasText: 'Section 1' });
    
    // Expand
    await firstTrigger.click();
    const content = component.locator('.accordion-content', { hasText: 'Content 1' });
    await expect(content).toBeVisible();
    
    // Collapse
    await firstTrigger.click();
    await expect(content).not.toBeVisible();
  });

  test('should support multiple items open at once', async ({ mount }) => {
    const component = await mount(<Accordion items={mockItems} multiple />);
    
    // Open first item
    await component.locator('.accordion-trigger', { hasText: 'Section 1' }).click();
    const content1 = component.locator('.accordion-content', { hasText: 'Content 1' });
    await expect(content1).toBeVisible();
    
    // Open second item
    await component.locator('.accordion-trigger', { hasText: 'Section 2' }).click();
    const content2 = component.locator('.accordion-content', { hasText: 'Content 2' });
    await expect(content2).toBeVisible();
    
    // Both should still be visible
    await expect(content1).toBeVisible();
    await expect(content2).toBeVisible();
  });

  test('should render different variants', async ({ mount }) => {
    const component = await mount(
      <div>
        <Accordion variant="vertical" items={mockItems} />
        <Accordion variant="horizontal" items={mockItems} />
        <Accordion variant="tabs" items={mockItems} />
      </div>
    );
    
    const accordions = component.locator('.accordion');
    await expect(accordions.nth(0)).toHaveClass(/accordion--vertical/);
    await expect(accordions.nth(1)).toHaveClass(/accordion--horizontal/);
    await expect(accordions.nth(2)).toHaveClass(/accordion--tabs/);
  });

  test('should handle disabled items', async ({ mount }) => {
    const itemsWithDisabled = [
      { id: 'item1', title: 'Section 1', content: <div>Content 1</div> },
      { id: 'item2', title: 'Section 2', content: <div>Content 2</div>, disabled: true },
      { id: 'item3', title: 'Section 3', content: <div>Content 3</div> },
    ];
    
    const component = await mount(<Accordion items={itemsWithDisabled} />);
    
    const disabledTrigger = component.locator('.accordion-trigger', { hasText: 'Section 2' });
    await expect(disabledTrigger).toBeDisabled();
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <Accordion items={mockItems} className="custom-accordion" />
    );
    
    // The mount returns the root, which may be the Radix Root
    // Let's just check that custom class is applied somewhere
    await expect(component).toHaveClass(/custom-accordion/);
  });

  test('should support keyboard navigation', async ({ mount, page }) => {
    const component = await mount(<Accordion items={mockItems} />);
    
    // Focus first trigger
    const firstTrigger = component.locator('.accordion-trigger').first();
    await firstTrigger.focus();
    await expect(firstTrigger).toBeFocused();
    
    // Press Space to toggle
    await page.keyboard.press('Space');
    const content = component.locator('.accordion-content', { hasText: 'Content 1' });
    await expect(content).toBeVisible();
    
    // Press Space again to collapse
    await page.keyboard.press('Space');
    await expect(content).not.toBeVisible();
  });

  test('should support Enter key to toggle', async ({ mount, page }) => {
    const component = await mount(<Accordion items={mockItems} />);
    
    const firstTrigger = component.locator('.accordion-trigger').first();
    await firstTrigger.focus();
    
    // Press Enter to toggle
    await page.keyboard.press('Enter');
    const content = component.locator('.accordion-content', { hasText: 'Content 1' });
    await expect(content).toBeVisible();
  });

  test('should navigate between items with arrow keys', async ({ mount, page }) => {
    const component = await mount(<Accordion items={mockItems} />);
    
    // Focus first trigger
    const firstTrigger = component.locator('.accordion-trigger').first();
    await firstTrigger.focus();
    await expect(firstTrigger).toBeFocused();
    
    // Arrow down to next trigger
    await page.keyboard.press('ArrowDown');
    const secondTrigger = component.locator('.accordion-trigger').nth(1);
    await expect(secondTrigger).toBeFocused();
    
    // Arrow up back to first
    await page.keyboard.press('ArrowUp');
    await expect(firstTrigger).toBeFocused();
  });

  test('should have chevron indicator', async ({ mount }) => {
    const component = await mount(<Accordion items={mockItems} />);
    
    const chevron = component.locator('.accordion-chevron').first();
    await expect(chevron).toBeVisible();
    await expect(chevron).toHaveAttribute('aria-hidden', 'true');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(<Accordion items={mockItems} />);
    await checkA11y(page);
  });

  test('should pass accessibility checks with multiple mode', async ({ mount, page }) => {
    await mount(<Accordion items={mockItems} multiple />);
    await checkA11y(page);
  });

  test('should pass accessibility checks with disabled items', async ({ mount, page }) => {
    const itemsWithDisabled = [
      { id: 'item1', title: 'Section 1', content: <div>Content 1</div> },
      { id: 'item2', title: 'Section 2', content: <div>Content 2</div>, disabled: true },
    ];
    
    await mount(<Accordion items={itemsWithDisabled} />);
    await checkA11y(page);
  });

  test('should pass accessibility checks with tabs variant', async ({ mount, page }) => {
    await mount(<Accordion items={mockItems} variant="tabs" />);
    await checkA11y(page);
  });

  test.describe('Controlled Mode', () => {
    test('should work in controlled mode', async ({ mount }) => {
      let value = 'item1';
      const component = await mount(
        <Accordion 
          items={mockItems} 
          value={value}
          onValueChange={(newValue) => { value = newValue as string; }}
        />
      );
      
      const content = component.locator('.accordion-content', { hasText: 'Content 1' });
      await expect(content).toBeVisible();
    });

    test('should work in controlled multiple mode', async ({ mount }) => {
      let values: string[] = ['item1', 'item2'];
      const component = await mount(
        <Accordion 
          items={mockItems} 
          multiple
          value={values}
          onValueChange={(newValues) => { values = newValues as string[]; }}
        />
      );
      
      const content1 = component.locator('.accordion-content', { hasText: 'Content 1' });
      const content2 = component.locator('.accordion-content', { hasText: 'Content 2' });
      
      await expect(content1).toBeVisible();
      await expect(content2).toBeVisible();
    });
  });

  test.describe('Tabs Variant', () => {
    test('should render triggers in a row for tabs variant', async ({ mount }) => {
      const component = await mount(<Accordion items={mockItems} variant="tabs" />);
      
      const triggersContainer = component.locator('.accordion-tabs-triggers');
      await expect(triggersContainer).toBeVisible();
      
      const triggers = component.locator('.accordion-trigger');
      await expect(triggers).toHaveCount(3);
    });

    test('should show active state for tabs variant', async ({ mount }) => {
      const component = await mount(<Accordion items={mockItems} variant="tabs" value="item1" />);
      
      const activeTab = component.locator('.accordion-trigger--active');
      await expect(activeTab).toBeVisible();
      await expect(activeTab).toHaveAttribute('data-state', 'open');
    });

    test('should display content below triggers for tabs variant', async ({ mount }) => {
      const component = await mount(<Accordion items={mockItems} variant="tabs" value="item1" />);
      
      const contentContainer = component.locator('.accordion-tabs-content');
      await expect(contentContainer).toBeVisible();
      
      const content = component.locator('.accordion-content-inner', { hasText: 'Content 1' });
      await expect(content).toBeVisible();
    });
  });
});
