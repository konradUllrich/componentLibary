import { test, expect } from "../../playwright/coverage-fixtures";
import { SidebarDivider } from './SidebarDivider';
import { checkA11y } from '../../playwright/test-utils';

test.describe('SidebarDivider Component', () => {
  test('should render with default props', async ({ mount }) => {
    const component = await mount(<SidebarDivider />);

    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-sidebar-divider/);
    await expect(component).toHaveAttribute('role', 'separator');
  });

  test('should render a single line when no label is given', async ({ mount }) => {
    const component = await mount(<SidebarDivider />);

    const lines = component.locator('.mp-sidebar-divider__line');
    await expect(lines).toHaveCount(1);
    await expect(component.locator('.mp-sidebar-divider__label')).toHaveCount(0);
  });

  test('should render a label with two flanking lines when label is given', async ({ mount }) => {
    const component = await mount(<SidebarDivider label="Navigation" />);

    await expect(component.locator('.mp-sidebar-divider__label')).toHaveText('Navigation');
    await expect(component.locator('.mp-sidebar-divider__line--left')).toBeVisible();
    await expect(component.locator('.mp-sidebar-divider__line--right')).toBeVisible();
  });

  test('should support custom className', async ({ mount }) => {
    const component = await mount(<SidebarDivider className="custom-divider" />);

    await expect(component).toHaveClass(/mp-sidebar-divider/);
    await expect(component).toHaveClass(/custom-divider/);
  });

  test('should spread extra props onto the root element', async ({ mount }) => {
    const component = await mount(<SidebarDivider data-testid="my-divider" />);

    await expect(component).toHaveAttribute('data-testid', 'my-divider');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(<SidebarDivider label="Section" />);

    await checkA11y(page);
  });
});
