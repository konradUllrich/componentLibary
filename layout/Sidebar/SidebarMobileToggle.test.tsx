import { test, expect } from "../../playwright/coverage-fixtures";
import { SidebarMobileToggle } from './SidebarMobileToggle';
import { SidebarProvider } from './SidebarProvider';
import { checkA11y } from '../../playwright/test-utils';

/**
 * SidebarMobileToggle Component Tests
 *
 * SidebarMobileToggle reads/writes mobile open state via `useSidebar`,
 * which resolves the sidebar store through context (falling back to the
 * module-level singleton). Each test wraps in its own `<SidebarProvider>`
 * for isolation, matching Sidebar.test.tsx's per-test store isolation
 * approach.
 *
 * `<SidebarProvider>` renders no DOM element of its own (just a context
 * Provider around its children), so when it is the mounted root Playwright
 * CT's component-root tracking (`internal:control=component`) can't scope
 * a locator to it — queries go through `page` instead, as in
 * `common/ThemeProvider/useThemeEditor.test.tsx`.
 *
 * The component's CSS hides it (`display: none`) above the 768px mobile
 * breakpoint (see `SidebarMobileToggle.css`), so every test sets a mobile
 * viewport before mounting, matching Sidebar.test.tsx's approach.
 */
test.describe('SidebarMobileToggle Component', () => {
  test('should render with default props', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle />
      </SidebarProvider>
    );

    const button = page.getByRole('button');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/mp-sidebar__mobile-toggle/);
  });

  test('should use default aria-label when none is given', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle />
      </SidebarProvider>
    );

    await expect(page.getByRole('button', { name: 'Toggle mobile menu' })).toBeVisible();
  });

  test('should support a custom aria-label', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle aria-label="Open menu" />
      </SidebarProvider>
    );

    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });

  test('should reflect closed state via aria-expanded and toggle it on click', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle />
      </SidebarProvider>
    );

    const button = page.getByRole('button');
    // Fresh store defaults to mobileOpen: false
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('should be operable via keyboard', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle />
      </SidebarProvider>
    );

    const button = page.getByRole('button');
    await button.focus();
    await expect(button).toBeFocused();
    await button.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('should call custom onClick handler', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    const events: string[] = [];
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle onClick={() => events.push('clicked')} />
      </SidebarProvider>
    );

    await page.getByRole('button').click();
    expect(events).toEqual(['clicked']);
  });

  test('should support custom children as icon content', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle>
          <span data-testid="custom-icon">icon</span>
        </SidebarMobileToggle>
      </SidebarProvider>
    );

    await expect(page.getByTestId('custom-icon')).toBeVisible();
  });

  test('should support custom className', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle className="custom-mobile-toggle" />
      </SidebarProvider>
    );

    await expect(page.getByRole('button')).toHaveClass(/custom-mobile-toggle/);
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await mount(
      <SidebarProvider>
        <SidebarMobileToggle />
      </SidebarProvider>
    );

    await checkA11y(page);
  });
});
