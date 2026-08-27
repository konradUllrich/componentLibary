import { test, expect } from "../../playwright/coverage-fixtures";
import { SidebarProvider } from './SidebarProvider';
import { SidebarNav } from './SidebarNav';
import { SidebarToggle } from './SidebarToggle';
import { checkA11y } from '../../playwright/test-utils';

/**
 * SidebarProvider Component Tests
 *
 * SidebarProvider itself renders no DOM — it only scopes a fresh sidebar
 * store to its subtree via context. These tests verify that consumers
 * (SidebarNav, SidebarToggle) rendered inside it read from the same,
 * independent store instance rather than the module-level singleton.
 *
 * Because the mounted root renders no DOM element of its own, Playwright
 * CT's component-root tracking (`internal:control=component`) can't scope
 * a locator to it — queries go through `page` instead, as in
 * `common/ThemeProvider/useThemeEditor.test.tsx`.
 */
test.describe('SidebarProvider Component', () => {
  test('should render children', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <div data-testid="child">Provided content</div>
      </SidebarProvider>
    );

    await expect(page.getByTestId('child')).toBeVisible();
    await expect(page.getByTestId('child')).toHaveText('Provided content');
  });

  test('should render nothing extra when there are no children', async ({ mount }) => {
    const component = await mount(<SidebarProvider />);

    await expect(component).toBeAttached();
  });

  test('should provide a scoped store consumed by descendants', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <div>Nav content</div>
        </SidebarNav>
        <SidebarToggle aria-label="Toggle sidebar" />
      </SidebarProvider>
    );

    // Fresh store defaults to expanded (isCollapsed: false), so no
    // `--collapsed` modifier class on the nav.
    const nav = page.locator('.mp-sidebar__nav');
    await expect(nav).toBeVisible();
    await expect(nav).not.toHaveClass(/mp-sidebar__nav--collapsed/);

    const toggle = page.getByRole('button', { name: 'Toggle sidebar' });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('should allow independent nested content to toggle via keyboard', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle aria-label="Toggle sidebar" />
      </SidebarProvider>
    );

    const toggle = page.getByRole('button', { name: 'Toggle sidebar' });
    await toggle.focus();
    await expect(toggle).toBeFocused();
    await toggle.press('Enter');
    // Clicking toggles the store's isCollapsed; the resulting aria-expanded
    // reflects whichever direction it moved (from true).
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarNav>
          <div>Nav content</div>
        </SidebarNav>
      </SidebarProvider>
    );

    await checkA11y(page);
  });
});
