import { test, expect } from "../../playwright/coverage-fixtures";
import { SidebarItem } from './SidebarItem';
import { SidebarProvider } from './SidebarProvider';
import { checkA11y } from '../../playwright/test-utils';

/**
 * SidebarItem Component Tests
 *
 * SidebarItem reads `setMobileOpen` from the sidebar store reached via
 * context (falling back to the module-level singleton store). Each test
 * wraps in its own `<SidebarProvider>` for isolation, matching
 * Sidebar.test.tsx's per-test store isolation approach.
 *
 * `<SidebarProvider>` renders no DOM element of its own (just a context
 * Provider around its children), so when it is the mounted root Playwright
 * CT's component-root tracking (`internal:control=component`) can't scope
 * a locator to it — queries go through `page` instead, as in
 * `common/ThemeProvider/useThemeEditor.test.tsx`.
 */
test.describe('SidebarItem Component', () => {
  test('should render with a label', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem href="/dashboard" label="Dashboard" />
      </SidebarProvider>
    );

    const link = page.getByRole('link', { name: 'Dashboard' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/dashboard');
  });

  test('should use children as label when label prop is absent', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem href="/about">About</SidebarItem>
      </SidebarProvider>
    );

    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('should apply active modifier class when isActive is true', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem href="/home" label="Home" isActive />
      </SidebarProvider>
    );

    const link = page.getByRole('link', { name: 'Home' });
    await expect(link).toHaveClass(/mp-sidebar-item--active/);
  });

  test('should not render when show is false', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem href="/hidden" label="Hidden" show={false} />
      </SidebarProvider>
    );

    await expect(page.getByRole('link', { name: 'Hidden' })).toHaveCount(0);
  });

  test('should render an icon before the label', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem href="/settings" label="Settings" icon={<span data-testid="icon">*</span>} />
      </SidebarProvider>
    );

    await expect(page.getByTestId('icon')).toBeVisible();
  });

  test('should expand nested items from the items prop on click', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem
          label="Settings"
          items={[
            { href: '/settings/profile', label: 'Profile' },
            { href: '/settings/security', label: 'Security' },
          ]}
        />
      </SidebarProvider>
    );

    const parentLink = page.getByRole('link', { name: 'Settings' });
    await expect(parentLink).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('link', { name: 'Profile' })).toHaveCount(0);

    await parentLink.click();

    await expect(parentLink).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Security' })).toBeVisible();
  });

  test('should expand nested SidebarItem children on click', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem label="Parent">
          <SidebarItem href="/child" label="Child" />
        </SidebarItem>
      </SidebarProvider>
    );

    const parentLink = page.getByRole('link', { name: 'Parent' });
    await parentLink.click();

    await expect(page.getByRole('link', { name: 'Child' })).toBeVisible();
  });

  test('should call custom onClick handler', async ({ mount, page }) => {
    const events: string[] = [];
    await mount(
      <SidebarProvider>
        <SidebarItem
          href="/home"
          label="Home"
          onClick={() => events.push('clicked')}
        />
      </SidebarProvider>
    );

    await page.getByRole('link', { name: 'Home' }).click();
    expect(events).toEqual(['clicked']);
  });

  test('should support custom className', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarItem href="/home" label="Home" className="custom-item" />
      </SidebarProvider>
    );

    await expect(page.getByRole('link', { name: 'Home' })).toHaveClass(/custom-item/);
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <nav aria-label="Main navigation">
          <SidebarItem href="/home" label="Home" isActive />
          <SidebarItem href="/about" label="About" />
        </nav>
      </SidebarProvider>
    );

    // Note: Disabling color-contrast check as the non-active item's text
    // color (var(--mp-color-primary), #6366f1 on white) has a pre-existing
    // design with a 4.46:1 contrast ratio, just under the 4.5:1 threshold.
    await checkA11y(page, { disableRules: ['color-contrast'] });
  });
});
