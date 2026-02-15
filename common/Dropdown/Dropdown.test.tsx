import { test, expect } from "@playwright/experimental-ct-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from "./Dropdown";
import { checkA11y } from "../../playwright/test-utils";

test.describe("Dropdown Component", () => {
  test("should render trigger button", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = page.locator("button");
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveText("Open Menu");
  });

  test("should open dropdown when trigger is clicked", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = page.locator("button");
    const content = page.locator(".dropdown__content");

    // Initially closed
    await expect(content).not.toBeVisible();

    // Click to open
    await trigger.click();
    await expect(content).toBeVisible();
  });

  test("should render dropdown items", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    // Open dropdown
    await page.locator("button").click();

    const items = page.locator(".dropdown__item");
    await expect(items).toHaveCount(3);
    await expect(items.nth(0)).toHaveText("Item 1");
    await expect(items.nth(1)).toHaveText("Item 2");
    await expect(items.nth(2)).toHaveText("Item 3");
  });

  test("should handle item selection", async ({ mount, page }) => {
    let selectedItem = "";

    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem
            onSelect={() => {
              selectedItem = "Item 1";
            }}
          >
            Item 1
          </DropdownItem>
          <DropdownItem
            onSelect={() => {
              selectedItem = "Item 2";
            }}
          >
            Item 2
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    // Open dropdown
    await page.locator("button").click();

    // Click item
    await page.locator(".dropdown__item").first().click();

    expect(selectedItem).toBe("Item 1");
  });

  test("should close dropdown after item selection", async ({
    mount,
    page,
  }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = page.locator("button");
    const content = page.locator(".dropdown__content");

    // Open dropdown
    await trigger.click();
    await expect(content).toBeVisible();

    // Select item
    await page.locator(".dropdown__item").click();

    // Should close
    await expect(content).not.toBeVisible();
  });

  test("should render labels and separators", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Group 1</DropdownLabel>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownSeparator />
          <DropdownLabel>Group 2</DropdownLabel>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    // Open dropdown
    await page.locator("button").click();

    const labels = page.locator(".dropdown__label");
    const separators = page.locator(".dropdown__separator");

    await expect(labels).toHaveCount(2);
    await expect(labels.nth(0)).toHaveText("Group 1");
    await expect(labels.nth(1)).toHaveText("Group 2");
    await expect(separators).toHaveCount(1);
  });

  test("should handle disabled items", async ({ mount, page }) => {
    let selectedItem = "";

    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem
            disabled
            onSelect={() => {
              selectedItem = "Disabled";
            }}
          >
            Disabled Item
          </DropdownItem>
          <DropdownItem
            onSelect={() => {
              selectedItem = "Enabled";
            }}
          >
            Enabled Item
          </DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    // Open dropdown
    await page.locator("button").click();

    const disabledItem = page.locator(".dropdown__item").first();
    await expect(disabledItem).toHaveAttribute("data-disabled");

    // Try to click disabled item
    await disabledItem.click({ force: true });
    expect(selectedItem).toBe(""); // Should not trigger
  });

  test("should handle keyboard navigation", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = page.locator("button");

    // Open with Enter
    await trigger.focus();
    await page.keyboard.press("Enter");

    const content = page.locator(".dropdown__content");
    await expect(content).toBeVisible();

    // Navigate with arrow keys
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(100); // Wait for focus to settle
    const firstItem = page.locator(".dropdown__item").first();
    await expect(firstItem).toBeFocused();

    await page.keyboard.press("ArrowDown");
    const secondItem = page.locator(".dropdown__item").nth(1);
    await expect(secondItem).toBeFocused();
  });

  test("should close on Escape key", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const content = page.locator(".dropdown__content");

    // Open dropdown
    await page.locator("button").click();
    await expect(content).toBeVisible();

    // Press Escape
    await page.keyboard.press("Escape");
    await expect(content).not.toBeVisible();
  });

  test("should have proper ARIA attributes", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    const trigger = page.locator("button");
    await trigger.click();

    const content = page.locator(".dropdown__content");
    await expect(content).toHaveAttribute("role", "menu");

    const items = page.locator(".dropdown__item");
    await expect(items.first()).toHaveAttribute("role", "menuitem");
  });

  test("should pass accessibility audit", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Actions</DropdownLabel>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownSeparator />
          <DropdownItem disabled>Delete</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    // Check accessibility when closed
    await checkA11y(page);

    // Verify dropdown can be opened
    await page.locator("button").click();
    await page.waitForTimeout(100);

    const dropdownContent = page.locator(".dropdown__content");
    await expect(dropdownContent).toBeVisible();
  });

  test("should apply custom className", async ({ mount, page }) => {
    await mount(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Open Menu</button>
        </DropdownTrigger>
        <DropdownContent className="custom-class">
          <DropdownItem>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>,
    );

    await page.locator("button").click();

    const content = page.locator(".dropdown__content");
    await expect(content).toHaveClass(/custom-class/);
  });
});
