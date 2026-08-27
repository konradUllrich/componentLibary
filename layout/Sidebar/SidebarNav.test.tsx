import { test, expect } from "../../playwright/coverage-fixtures";
import { SidebarNav } from './SidebarNav';
import { SidebarProvider } from './SidebarProvider';
import { checkA11y } from '../../playwright/test-utils';

/**
 * SidebarNav Component Tests
 *
 * SidebarNav reads `isCollapsed`/`isMobile` from the sidebar store reached
 * via context (falling back to the module-level singleton store when no
 * `<SidebarProvider>`/`<Sidebar>` ancestor exists). Each test wraps in its
 * own `<SidebarProvider>` for isolation, matching Sidebar.test.tsx's
 * per-test store isolation approach.
 *
 * `<SidebarProvider>` renders no DOM element of its own (just a context
 * Provider around its children), so when it is the mounted root Playwright
 * CT's component-root tracking (`internal:control=component`) can't scope
 * a locator to it — queries go through `page` instead, as in
 * `common/ThemeProvider/useThemeEditor.test.tsx`.
 */
test.describe('SidebarNav Component', () => {
  test('should render with default props', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <div>Nav Content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    const nav = page.locator('.mp-sidebar__nav');
    await expect(nav).toBeVisible();
  });

  test('should render as a nav landmark', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <div>Content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should render children', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <div>Test Nav Content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    await expect(page.locator('text=Test Nav Content')).toBeVisible();
  });

  test('should not apply collapsed modifier on a fresh (expanded) store', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <div>Content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    const nav = page.locator('.mp-sidebar__nav');
    await expect(nav).not.toHaveClass(/mp-sidebar__nav--collapsed/);
  });

  test('should support custom className', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav className="custom-nav">
          <div>Content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    const nav = page.locator('.mp-sidebar__nav');
    await expect(nav).toHaveClass(/mp-sidebar__nav/);
    await expect(nav).toHaveClass(/custom-nav/);
  });

  test('should spread extra props onto the root element', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav data-testid="my-nav">
          <div>Content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    await expect(page.getByTestId('my-nav')).toBeVisible();
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <a href="/home">Home</a>
          <a href="/about">About</a>
        </SidebarNav>
      </SidebarProvider>
    );

    await checkA11y(page);
  });
});
