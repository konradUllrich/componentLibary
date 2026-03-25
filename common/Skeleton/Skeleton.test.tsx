import { test, expect } from "@playwright/experimental-ct-react";
import { Skeleton } from "./Skeleton";
import { checkA11y } from "../../playwright/test-utils";

test.describe("Skeleton Component", () => {
  test("should render with default props", async ({ mount }) => {
    const component = await mount(<Skeleton />);
    await expect(component).toBeVisible();
    await expect(component).toHaveClass(/mp-skeleton--rectangle/);
    await expect(component).toHaveClass(/mp-skeleton--pulse/);
  });

  test("should render text variant", async ({ mount }) => {
    const component = await mount(<Skeleton variant="text" />);
    await expect(component).toHaveClass(/mp-skeleton--text/);
  });

  test("should render circle variant", async ({ mount }) => {
    const component = await mount(<Skeleton variant="circle" />);
    await expect(component).toHaveClass(/mp-skeleton--circle/);
  });

  test("should render rectangle variant", async ({ mount }) => {
    const component = await mount(<Skeleton variant="rectangle" />);
    await expect(component).toHaveClass(/mp-skeleton--rectangle/);
  });

  test("should apply wave animation", async ({ mount }) => {
    const component = await mount(<Skeleton animation="wave" />);
    await expect(component).toHaveClass(/mp-skeleton--wave/);
  });

  test("should apply pulse animation", async ({ mount }) => {
    const component = await mount(<Skeleton animation="pulse" />);
    await expect(component).toHaveClass(/mp-skeleton--pulse/);
  });

  test("should have no animation class when animation is none", async ({
    mount,
  }) => {
    const component = await mount(<Skeleton animation="none" />);
    await expect(component).not.toHaveClass(/mp-skeleton--pulse/);
    await expect(component).not.toHaveClass(/mp-skeleton--wave/);
  });

  test("should apply custom width and height as inline styles", async ({
    mount,
  }) => {
    const component = await mount(<Skeleton width={200} height={100} />);
    await expect(component).toHaveCSS("width", "200px");
    await expect(component).toHaveCSS("height", "100px");
  });

  test("should apply string width and height", async ({ mount }) => {
    const component = await mount(
      <Skeleton variant="rectangle" width="80%" height="2rem" />,
    );
    await expect(component).toHaveAttribute(
      "style",
      expect.stringContaining("width: 80%"),
    );
    await expect(component).toHaveAttribute(
      "style",
      expect.stringContaining("height: 2rem"),
    );
  });

  test("should render multiple text lines as a group", async ({ mount }) => {
    const component = await mount(<Skeleton variant="text" lines={3} />);
    await expect(component).toHaveClass(/mp-skeleton__group/);
    const lines = component.locator(".mp-skeleton--text");
    await expect(lines).toHaveCount(3);
  });

  test("should render last text line with 60% width", async ({ mount }) => {
    const component = await mount(<Skeleton variant="text" lines={3} />);
    const lines = component.locator(".mp-skeleton--text");
    const lastLine = lines.last();
    await expect(lastLine).toHaveAttribute(
      "style",
      expect.stringContaining("width: 60%"),
    );
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(<Skeleton className="custom-skeleton" />);
    await expect(component).toHaveClass(/custom-skeleton/);
  });

  test("should spread additional props", async ({ mount }) => {
    const component = await mount(
      <Skeleton data-testid="my-skeleton" />,
    );
    await expect(component).toHaveAttribute("data-testid", "my-skeleton");
  });

  test("should have role=status and aria-busy=true", async ({ mount }) => {
    const component = await mount(<Skeleton />);
    await expect(component).toHaveAttribute("role", "status");
    await expect(component).toHaveAttribute("aria-busy", "true");
  });

  test("should have role=status on group wrapper for multi-line text", async ({
    mount,
  }) => {
    const component = await mount(<Skeleton variant="text" lines={2} />);
    await expect(component).toHaveAttribute("role", "status");
    await expect(component).toHaveAttribute("aria-busy", "true");
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rectangle" height={120} />
      </div>,
    );
    await checkA11y(page);
  });

  test("should pass accessibility checks for multi-line text", async ({
    mount,
    page,
  }) => {
    await mount(<Skeleton variant="text" lines={4} />);
    await checkA11y(page);
  });

  test("should pass accessibility checks for wave animation", async ({
    mount,
    page,
  }) => {
    await mount(<Skeleton animation="wave" height={80} />);
    await checkA11y(page);
  });
});
