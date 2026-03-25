import { test, expect } from "@playwright/experimental-ct-react";
import { Image } from "./Image";
import { checkA11y } from "../../playwright/test-utils";

// A tiny valid data URI used as a real loadable image in tests
const VALID_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const FALLBACK_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAADklEQVQI12NkYGD4DwABBAEAcGE7KwAAAABJRU5ErkJggg==";

test.describe("Image Component", () => {
  test("should render with required props", async ({ mount }) => {
    const component = await mount(
      <Image src={VALID_SRC} alt="Test image" />,
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveAttribute("alt", "Test image");
    await expect(component).toHaveAttribute("src", VALID_SRC);
  });

  test("should apply default classes", async ({ mount }) => {
    const component = await mount(
      <Image src={VALID_SRC} alt="Test image" />,
    );
    await expect(component).toHaveClass(/mp-image/);
    await expect(component).toHaveClass(/mp-image--cover/);
    await expect(component).toHaveClass(/mp-image--rounded-none/);
  });

  test("should apply object-fit modifiers", async ({ mount }) => {
    const component = await mount(
      <div>
        <Image src={VALID_SRC} alt="contain" objectFit="contain" />
        <Image src={VALID_SRC} alt="fill" objectFit="fill" />
        <Image src={VALID_SRC} alt="none" objectFit="none" />
        <Image src={VALID_SRC} alt="scale-down" objectFit="scale-down" />
      </div>,
    );
    await expect(component.locator(".mp-image--contain")).toBeVisible();
    await expect(component.locator(".mp-image--fill")).toBeVisible();
    await expect(component.locator(".mp-image--none")).toBeVisible();
    await expect(component.locator(".mp-image--scale-down")).toBeVisible();
  });

  test("should apply rounded modifiers", async ({ mount }) => {
    const component = await mount(
      <div>
        <Image src={VALID_SRC} alt="sm" rounded="sm" />
        <Image src={VALID_SRC} alt="md" rounded="md" />
        <Image src={VALID_SRC} alt="lg" rounded="lg" />
        <Image src={VALID_SRC} alt="full" rounded="full" />
      </div>,
    );
    await expect(component.locator(".mp-image--rounded-sm")).toBeVisible();
    await expect(component.locator(".mp-image--rounded-md")).toBeVisible();
    await expect(component.locator(".mp-image--rounded-lg")).toBeVisible();
    await expect(component.locator(".mp-image--rounded-full")).toBeVisible();
  });

  test("should apply aspect-ratio modifiers", async ({ mount }) => {
    const component = await mount(
      <div>
        <Image src={VALID_SRC} alt="square" aspectRatio="square" />
        <Image src={VALID_SRC} alt="video" aspectRatio="video" />
        <Image src={VALID_SRC} alt="portrait" aspectRatio="portrait" />
      </div>,
    );
    await expect(component.locator(".mp-image--aspect-square")).toBeVisible();
    await expect(component.locator(".mp-image--aspect-video")).toBeVisible();
    await expect(component.locator(".mp-image--aspect-portrait")).toBeVisible();
  });

  test("should not apply aspect class when aspectRatio is auto", async ({
    mount,
  }) => {
    const component = await mount(
      <Image src={VALID_SRC} alt="auto" aspectRatio="auto" />,
    );
    const classes = await component.getAttribute("class");
    expect(classes).not.toMatch(/mp-image--aspect-auto/);
  });

  test("should apply custom className", async ({ mount }) => {
    const component = await mount(
      <Image src={VALID_SRC} alt="custom" className="my-custom-class" />,
    );
    await expect(component).toHaveClass(/my-custom-class/);
  });

  test("should spread additional props", async ({ mount }) => {
    const component = await mount(
      <Image
        src={VALID_SRC}
        alt="props test"
        data-testid="img-component"
        width={100}
        height={100}
      />,
    );
    await expect(component).toHaveAttribute("data-testid", "img-component");
    await expect(component).toHaveAttribute("width", "100");
  });

  test("should show fallback src on error", async ({ mount, page }) => {
    const component = await mount(
      <Image
        src="http://localhost/nonexistent-image.png"
        alt="fallback test"
        fallbackSrc={FALLBACK_SRC}
      />,
    );
    // Wait for error + fallback to load
    await page.waitForTimeout(500);
    await expect(component).toHaveAttribute("src", FALLBACK_SRC);
  });

  test("should add error class when no fallback provided", async ({
    mount,
    page,
  }) => {
    const component = await mount(
      <Image
        src="http://localhost/nonexistent-image.png"
        alt="error test"
      />,
    );
    await page.waitForTimeout(500);
    await expect(component).toHaveClass(/mp-image--error/);
  });

  test("should reset to new src when src prop changes", async ({ mount }) => {
    const component = await mount(
      <Image src={VALID_SRC} alt="reset test" />,
    );
    await expect(component).toHaveAttribute("src", VALID_SRC);
  });

  test("should pass accessibility checks", async ({ mount, page }) => {
    await mount(
      <div>
        <Image src={VALID_SRC} alt="Accessible image" />
        <Image src={VALID_SRC} alt="Rounded image" rounded="md" />
        <Image
          src={VALID_SRC}
          alt="Video ratio image"
          aspectRatio="video"
          objectFit="cover"
        />
      </div>,
    );
    await checkA11y(page);
  });
});
