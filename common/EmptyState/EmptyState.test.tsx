import { test, expect } from "@playwright/experimental-ct-react";
import { EmptyState } from "./EmptyState";
import { checkA11y } from "../../playwright/test-utils";

test.describe("EmptyState Component", () => {
  test("should render with required title", async ({ mount }) => {
    const component = await mount(
      <EmptyState title="Nothing here yet" />,
    );
    await expect(component).toBeVisible();
    await expect(component.locator(".mp-empty-state__title")).toHaveText(
      "Nothing here yet",
    );
  });

  test("should render description when provided", async ({ mount }) => {
    const component = await mount(
      <EmptyState
        title="No results"
        description="Try adjusting your search terms."
      />,
    );
    const description = component.locator(".mp-empty-state__description");
    await expect(description).toBeVisible();
    await expect(description).toHaveText("Try adjusting your search terms.");
  });

  test("should not render description when omitted", async ({ mount }) => {
    const component = await mount(<EmptyState title="No results" />);
    await expect(
      component.locator(".mp-empty-state__description"),
    ).not.toBeVisible();
  });

  test("should render icon when provided", async ({ mount }) => {
    const component = await mount(
      <EmptyState
        title="Empty"
        icon={<span data-testid="test-icon">🔍</span>}
      />,
    );
    const icon = component.locator(".mp-empty-state__icon");
    await expect(icon).toBeVisible();
    await expect(icon).toContainText("🔍");
  });

  test("should render action when provided", async ({ mount }) => {
    const component = await mount(
      <EmptyState
        title="Empty"
        action={<button type="button">Add item</button>}
      />,
    );
    const action = component.locator(".mp-empty-state__action");
    await expect(action).toBeVisible();
    await expect(action.locator("button")).toHaveText("Add item");
  });

  test("should apply variant classes", async ({ mount }) => {
    const component = await mount(
      <div>
        <EmptyState title="Default" variant="default" />
        <EmptyState title="Search" variant="search" />
        <EmptyState title="Error" variant="error" />
        <EmptyState title="No Data" variant="no-data" />
        <EmptyState title="No Access" variant="no-access" />
      </div>,
    );
    const items = component.locator(".mp-empty-state");
    await expect(items.nth(0)).toHaveClass(/mp-empty-state--default/);
    await expect(items.nth(1)).toHaveClass(/mp-empty-state--search/);
    await expect(items.nth(2)).toHaveClass(/mp-empty-state--error/);
    await expect(items.nth(3)).toHaveClass(/mp-empty-state--no-data/);
    await expect(items.nth(4)).toHaveClass(/mp-empty-state--no-access/);
  });

  test("should apply size classes", async ({ mount }) => {
    const component = await mount(
      <div>
        <EmptyState title="Small" size="sm" />
        <EmptyState title="Medium" size="md" />
        <EmptyState title="Large" size="lg" />
      </div>,
    );
    const items = component.locator(".mp-empty-state");
    await expect(items.nth(0)).toHaveClass(/mp-empty-state--sm/);
    await expect(items.nth(1)).toHaveClass(/mp-empty-state--md/);
    await expect(items.nth(2)).toHaveClass(/mp-empty-state--lg/);
  });

  test("should have default variant md when no props given", async ({
    mount,
  }) => {
    const component = await mount(<EmptyState title="Default" />);
    await expect(component).toHaveClass(/mp-empty-state--default/);
    await expect(component).toHaveClass(/mp-empty-state--md/);
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(
      <EmptyState title="Test" className="custom-class" />,
    );
    await expect(component).toHaveClass(/custom-class/);
  });

  test("should spread additional props", async ({ mount }) => {
    const component = await mount(
      <EmptyState
        title="Test"
        data-testid="empty-state-test"
        aria-label="Custom label"
      />,
    );
    await expect(component).toHaveAttribute(
      "data-testid",
      "empty-state-test",
    );
  });

  test("should have role=status for screen readers", async ({ mount }) => {
    const component = await mount(<EmptyState title="Nothing here" />);
    await expect(component).toHaveAttribute("role", "status");
  });

  test("should pass accessibility checks – default", async ({
    mount,
    page,
  }) => {
    await mount(<EmptyState title="No items" description="Add one to start." />);
    await checkA11y(page);
  });

  test("should pass accessibility checks – all variants", async ({
    mount,
    page,
  }) => {
    await mount(
      <div>
        <EmptyState title="Default" variant="default" />
        <EmptyState title="Search" variant="search" />
        <EmptyState title="Error" variant="error" />
        <EmptyState title="No Data" variant="no-data" />
        <EmptyState title="No Access" variant="no-access" />
      </div>,
    );
    await checkA11y(page, { disableRules: ["color-contrast"] });
  });

  test("should pass accessibility checks with icon and action", async ({
    mount,
    page,
  }) => {
    await mount(
      <EmptyState
        title="Nothing found"
        description="Try a different query."
        icon={<span aria-hidden="true">🔍</span>}
        action={<button type="button">Reset</button>}
      />,
    );
    await checkA11y(page);
  });
});
