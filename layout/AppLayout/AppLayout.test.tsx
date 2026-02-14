import { test, expect } from '@playwright/experimental-ct-react';
import { AppLayout } from './AppLayout';
import { checkA11y } from '../../playwright/test-utils';

/**
 * AppLayout Component Tests
 * 
 * Tests the main app layout container that manages header, sidebar, and content areas.
 * Validates layout structure, responsive behavior, and proper semantic HTML.
 */
test.describe('AppLayout Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <AppLayout>
        <div>Main Content</div>
      </AppLayout>
    );
    
    // The component itself is the .app-layout element
    await expect(component).toBeVisible();
  });

  test('should render children in main content area', async ({ mount }) => {
    const component = await mount(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );
    
    const main = component.locator('.app-layout__main');
    await expect(main).toBeVisible();
    await expect(main).toContainText('Test Content');
  });

  test('should render header when provided', async ({ mount }) => {
    const component = await mount(
      <AppLayout header={<div>Header Content</div>}>
        <div>Main Content</div>
      </AppLayout>
    );
    
    const header = component.locator('.app-layout__header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Header Content');
  });

  test('should not render header when not provided', async ({ mount }) => {
    const component = await mount(
      <AppLayout>
        <div>Main Content</div>
      </AppLayout>
    );
    
    const header = component.locator('.app-layout__header');
    await expect(header).not.toBeAttached();
  });

  test('should render sidebar when provided', async ({ mount }) => {
    const component = await mount(
      <AppLayout sidebar={<div>Sidebar Content</div>}>
        <div>Main Content</div>
      </AppLayout>
    );
    
    const sidebar = component.locator('.app-layout__sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toContainText('Sidebar Content');
  });

  test('should not render sidebar when not provided', async ({ mount }) => {
    const component = await mount(
      <AppLayout>
        <div>Main Content</div>
      </AppLayout>
    );
    
    const sidebar = component.locator('.app-layout__sidebar');
    await expect(sidebar).not.toBeAttached();
  });

  test('should render all sections together', async ({ mount }) => {
    const component = await mount(
      <AppLayout
        header={<div>Header</div>}
        sidebar={<div>Sidebar</div>}
      >
        <div>Main</div>
      </AppLayout>
    );
    
    const header = component.locator('.app-layout__header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Header');
    
    const sidebar = component.locator('.app-layout__sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toContainText('Sidebar');
    
    const main = component.locator('.app-layout__main');
    await expect(main).toBeVisible();
    await expect(main).toContainText('Main');
  });

  test('should support custom className', async ({ mount }) => {
    const component = await mount(
      <AppLayout className="custom-layout">
        <div>Content</div>
      </AppLayout>
    );
    
    // The component itself is the .app-layout element
    await expect(component).toHaveClass(/app-layout/);
    await expect(component).toHaveClass(/custom-layout/);
  });

  test('should have proper semantic HTML structure', async ({ mount }) => {
    const component = await mount(
      <AppLayout
        header={<div>Header</div>}
        sidebar={<div>Sidebar</div>}
      >
        <div>Content</div>
      </AppLayout>
    );
    
    // Main content should use <main> element
    const main = component.locator('main');
    await expect(main).toBeAttached();
    await expect(main).toHaveClass(/app-layout__main/);
  });

  test('should render container div for sidebar and main', async ({ mount }) => {
    const component = await mount(
      <AppLayout
        sidebar={<div>Sidebar</div>}
      >
        <div>Main</div>
      </AppLayout>
    );
    
    const container = component.locator('.app-layout__container');
    await expect(container).toBeVisible();
    
    const sidebar = container.locator('.app-layout__sidebar');
    const main = container.locator('.app-layout__main');
    
    await expect(sidebar).toBeVisible();
    await expect(main).toBeVisible();
  });

  test('should render with complex header content', async ({ mount }) => {
    const component = await mount(
      <AppLayout
        header={
          <header>
            <nav>
              <ul>
                <li>Logo</li>
                <li>Menu</li>
                <li>User</li>
              </ul>
            </nav>
          </header>
        }
      >
        <div>Content</div>
      </AppLayout>
    );
    
    const header = component.locator('.app-layout__header');
    await expect(header.locator('header')).toBeVisible();
    await expect(header.locator('nav')).toBeVisible();
    await expect(header.locator('li').nth(0)).toContainText('Logo');
  });

  test('should render with complex sidebar content', async ({ mount }) => {
    const component = await mount(
      <AppLayout
        sidebar={
          <nav aria-label="Main navigation">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        }
      >
        <div>Content</div>
      </AppLayout>
    );
    
    const sidebar = component.locator('.app-layout__sidebar');
    await expect(sidebar.locator('nav')).toBeVisible();
    await expect(sidebar.locator('a').nth(0)).toHaveAttribute('href', '/');
    await expect(sidebar.locator('a').nth(1)).toHaveAttribute('href', '/about');
    await expect(sidebar.locator('a').nth(2)).toHaveAttribute('href', '/contact');
  });

  test('should render with complex main content', async ({ mount }) => {
    const component = await mount(
      <AppLayout>
        <article>
          <h1>Page Title</h1>
          <p>Page content goes here</p>
        </article>
      </AppLayout>
    );
    
    const main = component.locator('.app-layout__main');
    await expect(main.locator('article')).toBeVisible();
    await expect(main.locator('h1')).toContainText('Page Title');
    await expect(main.locator('p')).toContainText('Page content goes here');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <AppLayout
        header={
          <header>
            <h1>Site Title</h1>
          </header>
        }
        sidebar={
          <nav aria-label="Main navigation">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>
        }
      >
        <article>
          <h2>Page Heading</h2>
          <p>Content</p>
        </article>
      </AppLayout>
    );
    
    await checkA11y(page);
  });

  test('should pass accessibility checks with minimal content', async ({ mount, page }) => {
    await mount(
      <AppLayout>
        <div>Simple content</div>
      </AppLayout>
    );
    
    await checkA11y(page);
  });

  test.skip('should have proper display name', async () => {
    // Note: This test doesn't work in Playwright CT as it can't access static properties
    // The displayName is set in the component code: AppLayout.displayName = "AppLayout"
    expect(AppLayout.displayName).toBe('AppLayout');
  });

  test('should handle multiple children in main content', async ({ mount }) => {
    const component = await mount(
      <AppLayout>
        <div>First Section</div>
        <div>Second Section</div>
        <div>Third Section</div>
      </AppLayout>
    );
    
    const main = component.locator('.app-layout__main');
    await expect(main).toContainText('First Section');
    await expect(main).toContainText('Second Section');
    await expect(main).toContainText('Third Section');
  });

  test('should render with only header and main', async ({ mount }) => {
    const component = await mount(
      <AppLayout header={<div>Header Only</div>}>
        <div>Main Content</div>
      </AppLayout>
    );
    
    const header = component.locator('.app-layout__header');
    await expect(header).toBeVisible();
    
    const sidebar = component.locator('.app-layout__sidebar');
    await expect(sidebar).not.toBeAttached();
    
    const main = component.locator('.app-layout__main');
    await expect(main).toBeVisible();
  });

  test('should render with only sidebar and main', async ({ mount }) => {
    const component = await mount(
      <AppLayout sidebar={<div>Sidebar Only</div>}>
        <div>Main Content</div>
      </AppLayout>
    );
    
    const header = component.locator('.app-layout__header');
    await expect(header).not.toBeAttached();
    
    const sidebar = component.locator('.app-layout__sidebar');
    await expect(sidebar).toBeVisible();
    
    const main = component.locator('.app-layout__main');
    await expect(main).toBeVisible();
  });

  test('should maintain layout structure with empty content', async ({ mount }) => {
    const component = await mount(
      <AppLayout header={<div></div>} sidebar={<div></div>}>
        <div></div>
      </AppLayout>
    );
    
    // The component itself is the .app-layout element
    await expect(component).toBeVisible();
    
    const container = component.locator('.app-layout__container');
    await expect(container).toBeVisible();
  });

  // Note: The AppLayout component is a structural component that provides
  // the overall page layout. It doesn't handle responsive behavior directly
  // (like collapsing sidebars) - that's managed by the child components
  // (e.g., the Sidebar component with its Zustand store).
  // CSS grid or flexbox in the stylesheet handles the responsive layout.
});
