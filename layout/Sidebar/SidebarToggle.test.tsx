import { test, expect } from "../../playwright/coverage-fixtures";
import { SidebarToggle } from './SidebarToggle';
import { SidebarProvider } from './SidebarProvider';
import { checkA11y } from '../../playwright/test-utils';

/**
 * SidebarToggle Component Tests
 *
 * SidebarToggle reads/writes desktop collapse state via `useSidebar`, which
 * resolves the sidebar store through context (falling back to the
 * module-level singleton). Each test wraps in its own `<SidebarProvider>`
 * for isolation, matching Sidebar.test.tsx's per-test store isolation
 * approach.
 *
 * `<SidebarProvider>` renders no DOM element of its own (just a context
 * Provider around its children), so when it is the mounted root Playwright
 * CT's component-root tracking (`internal:control=component`) can't scope
 * a locator to it — queries go through `page` instead, as in
 * `common/ThemeProvider/useThemeEditor.test.tsx`.
 */
test.describe('SidebarToggle Component', () => {
  test('should render with default props', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle />
      </SidebarProvider>
    );

    const button = page.getByRole('button');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/mp-sidebar__toggle/);
  });

  test('should use default aria-label when none is given', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle />
      </SidebarProvider>
    );

    await expect(page.getByRole('button', { name: 'Toggle sidebar' })).toBeVisible();
  });

  test('should support a custom aria-label', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle aria-label="Collapse navigation" />
      </SidebarProvider>
    );

    await expect(page.getByRole('button', { name: 'Collapse navigation' })).toBeVisible();
  });

  test('should reflect open state via aria-expanded and toggle it on click', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle />
      </SidebarProvider>
    );

    const button = page.getByRole('button');
    // Fresh store defaults to isCollapsed: false -> isOpen: true
    await expect(button).toHaveAttribute('aria-expanded', 'true');

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should be operable via keyboard', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle />
      </SidebarProvider>
    );

    const button = page.getByRole('button');
    await button.focus();
    await expect(button).toBeFocused();
    await button.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should call custom onClick handler', async ({ mount, page }) => {
    const events: string[] = [];
    await mount(
      <SidebarProvider>
        <SidebarToggle onClick={() => events.push('clicked')} />
      </SidebarProvider>
    );

    await page.getByRole('button').click();
    expect(events).toEqual(['clicked']);
  });

  test('should support custom children as icon content', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle>
          <span data-testid="custom-icon">icon</span>
        </SidebarToggle>
      </SidebarProvider>
    );

    await expect(page.getByTestId('custom-icon')).toBeVisible();
  });

  test('should support custom className', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle className="custom-toggle" />
      </SidebarProvider>
    );

    await expect(page.getByRole('button')).toHaveClass(/custom-toggle/);
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <SidebarProvider>
        <SidebarToggle />
      </SidebarProvider>
    );

    await checkA11y(page);
  });
});
