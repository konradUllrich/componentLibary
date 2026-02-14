import { test, expect } from '@playwright/experimental-ct-react';
import { Sidebar } from './Sidebar';
import { useSidebarStore } from './sidebarStore';
import { checkA11y } from '../../playwright/test-utils';

/**
 * Sidebar Component Tests
 * 
 * Tests the responsive sidebar component with mobile drawer and desktop collapse modes.
 * Validates state management via Zustand store and responsive behavior.
 * 
 * Note: Some tests involving window resize and Zustand state management may require
 * specific setup or mocking. Tests focus on rendering and basic interactions.
 */
test.describe('Sidebar Component', () => {
  // Reset store state before each test
  test.beforeEach(() => {
    // Clear any existing state
    useSidebarStore.setState({
      isMobile: false,
      isCollapsed: false,
      mobileOpen: false,
    });
  });

  test('should render with default props', async ({ mount }) => {
    const component = await mount(
      <Sidebar>
        <div>Sidebar Content</div>
      </Sidebar>
    );
    
    // The Sidebar component itself is the .sidebar element
    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/sidebar/);
  });

  test('should render children', async ({ mount }) => {
    const component = await mount(
      <Sidebar>
        <div>Test Content</div>
      </Sidebar>
    );
    
    await expect(component.locator('text=Test Content')).toBeVisible();
  });

  test('should apply collapsed class when collapsed', async ({ mount }) => {
    // Set collapsed state before render
    useSidebarStore.setState({ isCollapsed: true, isMobile: false });
    
    const component = await mount(
      <Sidebar>
        <div>Content</div>
      </Sidebar>
    );
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar--collapsed/);
  });

  test('should apply expanded class when not collapsed', async ({ mount }) => {
    useSidebarStore.setState({ isCollapsed: false, isMobile: false });
    
    const component = await mount(
      <Sidebar defaultOpen={true}>
        <div>Content</div>
      </Sidebar>
    );
    
    // Wait for state initialization
    await component.waitFor();
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar--expanded/);
  });

  test('should apply mobile class when in mobile mode', async ({ mount, page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 400, height: 800 });
    
    useSidebarStore.setState({ isMobile: true, mobileOpen: false });
    
    const component = await mount(
      <Sidebar mobileBreakpoint={768}>
        <div>Content</div>
      </Sidebar>
    );
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar--mobile/);
  });

  test('should apply desktop class when in desktop mode', async ({ mount, page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    useSidebarStore.setState({ isMobile: false, isCollapsed: false });
    
    const component = await mount(
      <Sidebar mobileBreakpoint={768}>
        <div>Content</div>
      </Sidebar>
    );
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar--desktop/);
  });

  test('should support custom className', async ({ mount }) => {
    const component = await mount(
      <Sidebar className="custom-sidebar">
        <div>Content</div>
      </Sidebar>
    );
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar/);
    await expect(component).toHaveClass(/custom-sidebar/);
  });

  test('should support custom width via CSS variable', async ({ mount }) => {
    const component = await mount(
      <Sidebar width="300px">
        <div>Content</div>
      </Sidebar>
    );
    
    // The component itself is the .sidebar element
    const style = await component.getAttribute('style');
    expect(style).toContain('--sidebar-width');
    expect(style).toContain('300px');
  });

  test('should render sidebar wrapper', async ({ mount }) => {
    const component = await mount(
      <Sidebar>
        <div>Content</div>
      </Sidebar>
    );
    
    const wrapper = component.locator('.sidebar__wrapper');
    await expect(wrapper).toBeVisible();
  });

  test('should handle defaultOpen prop', async ({ mount }) => {
    const component = await mount(
      <Sidebar defaultOpen={true}>
        <div>Content</div>
      </Sidebar>
    );
    
    // Wait for effect to run
    await component.waitFor();
    
    // The component itself is the .sidebar element
    // After initialization, should be expanded in desktop mode
    await expect(component).toHaveClass(/sidebar--expanded/);
  });

  test('should render with complex content', async ({ mount }) => {
    const component = await mount(
      <Sidebar>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </Sidebar>
    );
    
    await expect(component.locator('nav')).toBeVisible();
    await expect(component.locator('ul')).toBeVisible();
    await expect(component.locator('li').nth(0)).toContainText('Home');
    await expect(component.locator('li').nth(1)).toContainText('About');
    await expect(component.locator('li').nth(2)).toContainText('Contact');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <Sidebar>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </Sidebar>
    );
    
    await checkA11y(page);
  });

  test.skip('should have proper display name', async () => {
    // Note: This test doesn't work in Playwright CT as it can't access static properties
    // The displayName is set in the component code: Sidebar.displayName = "Sidebar"
    expect(Sidebar.displayName).toBe('Sidebar');
  });

  test.skip('should render in mobile open state', async ({ mount, page }) => {
    // Note: This test is skipped because testing Zustand store state changes after mount
    // doesn't work reliably in Playwright CT environment. The store updates don't trigger
    // re-renders in the test environment like they would in a real application.
    // This functionality is better tested in E2E tests.
    
    // Set viewport to mobile size
    await page.setViewportSize({ width: 400, height: 800 });
    
    const component = await mount(
      <Sidebar>
        <div>Mobile Content</div>
      </Sidebar>
    );
    
    // Wait for component to mount and effects to run
    await component.waitFor();
    
    // Set mobile open state after mount (the component reacts to store changes via Zustand)
    useSidebarStore.getState().setMobileOpen(true);
    
    // Wait for the component to react to the store change
    await page.waitForTimeout(500);
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar--expanded/);
    await expect(component).toHaveClass(/sidebar--mobile/);
  });

  test('should render in mobile closed state', async ({ mount, page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 400, height: 800 });
    
    useSidebarStore.setState({ isMobile: true, mobileOpen: false });
    
    const component = await mount(
      <Sidebar>
        <div>Mobile Content</div>
      </Sidebar>
    );
    
    // The component itself is the .sidebar element
    await expect(component).toHaveClass(/sidebar--collapsed/);
    await expect(component).toHaveClass(/sidebar--mobile/);
  });

  // Note: Testing window resize behavior and Zustand store interactions requires
  // more complex setup with proper event simulation. The Sidebar component listens
  // to window resize events and updates the store accordingly. These tests focus on
  // the rendering based on store state. Full resize behavior is better tested in E2E tests.
  
  // Note: The sidebar state management through Zustand store is shared globally.
  // In a real application, toggling the sidebar would be done through store actions
  // (toggleCollapsed, toggleMobileOpen) which are typically triggered by buttons
  // outside the Sidebar component itself (e.g., in a Header component).
});
