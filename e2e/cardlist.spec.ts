import { test, expect } from "@playwright/test";

test.describe("CardList Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/componentLibary/components/card-list");
    // Wait for page to fully load including React hydration
    await page.waitForLoadState("networkidle");
    // Wait for the main h1 heading to render (confirms React has mounted)
    await page.waitForSelector("h1", { timeout: 15000 });
    // Extra buffer for React to finish rendering all components
    await page.waitForTimeout(500);
  });

  test("should display CardList component page", async ({ page }) => {
    // Check heading
    await expect(
      page.getByRole("heading", { name: "CardList Component", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/Display a responsive grid of cards/i),
    ).toBeVisible();
  });

  test("should display product cards in a 3-column grid", async ({ page }) => {
    // Verify section heading
    await expect(
      page.getByRole("heading", { name: "Product Cards (3 columns)" }),
    ).toBeVisible();

    // Check that product cards are visible (use first() since they appear in multiple sections)
    await expect(page.getByText("Wireless Headphones").first()).toBeVisible();
    await expect(page.getByText("Smart Watch").first()).toBeVisible();
    await expect(page.getByText("Laptop Stand").first()).toBeVisible();
    await expect(page.getByText("Mechanical Keyboard").first()).toBeVisible();
    await expect(page.getByText("USB-C Hub").first()).toBeVisible();
    await expect(page.getByText("Webcam").first()).toBeVisible();
  });

  test("should display product details correctly", async ({ page }) => {
    // Check first product card details
    const firstCard = page
      .locator(".card-list__item")
      .filter({ hasText: "Wireless Headphones" })
      .first();

    await expect(firstCard.getByText("Wireless Headphones")).toBeVisible();
    await expect(
      firstCard.getByText(
        /Premium noise-cancelling headphones with 30-hour battery life/i,
      ),
    ).toBeVisible();
    await expect(firstCard.getByText("$299.99")).toBeVisible();
    await expect(firstCard.getByText("In Stock")).toBeVisible();
  });

  test("should display stock status badges correctly", async ({ page }) => {
    // Check "In Stock" badge
    const inStockCards = page.getByText("In Stock");
    await expect(inStockCards.first()).toBeVisible();

    // Check "Out of Stock" badge (use first() since it appears in multiple sections)
    const outOfStockCard = page.getByText("Out of Stock");
    await expect(outOfStockCard.first()).toBeVisible();
  });

  test("should have interactive buttons on product cards", async ({ page }) => {
    const firstCard = page
      .locator(".card-list__item")
      .filter({ hasText: "Wireless Headphones" })
      .first();

    // Check Add to Cart button
    const addToCartBtn = firstCard.getByRole("button", {
      name: "Add to Cart",
    });
    await expect(addToCartBtn).toBeVisible();
    await expect(addToCartBtn).toBeEnabled();

    // Check View Details button
    const viewDetailsBtn = firstCard.getByRole("button", {
      name: "View Details",
    });
    await expect(viewDetailsBtn).toBeVisible();
    await expect(viewDetailsBtn).toBeEnabled();
  });

  test("should disable Add to Cart button for out of stock items", async ({
    page,
  }) => {
    const outOfStockCard = page
      .locator(".card-list__item")
      .filter({ hasText: "Laptop Stand" })
      .first();

    const addToCartBtn = outOfStockCard.getByRole("button", {
      name: "Add to Cart",
    });
    await expect(addToCartBtn).toBeVisible();
    await expect(addToCartBtn).toBeDisabled();
  });

  test("should display blog posts in a 2-column grid", async ({ page }) => {
    // Verify section heading
    await expect(
      page.getByRole("heading", { name: "Blog Posts (2 columns)" }),
    ).toBeVisible();

    // Check that blog post cards are visible
    await expect(page.getByText("Getting Started with React")).toBeVisible();
    await expect(page.getByText("TypeScript Best Practices")).toBeVisible();
    await expect(page.getByText("Component Design Patterns")).toBeVisible();
  });

  test("should display blog post details correctly", async ({ page }) => {
    const firstPost = page
      .locator(".card-list__item")
      .filter({ hasText: "Getting Started with React" });

    await expect(
      firstPost.getByText("Getting Started with React"),
    ).toBeVisible();
    await expect(
      firstPost.getByText(/Learn the basics of React/i),
    ).toBeVisible();
    await expect(firstPost.getByText(/By Jane Smith/i)).toBeVisible();
    await expect(firstPost.getByText(/2024-02-15/i)).toBeVisible();
  });

  test("should display blog post tags", async ({ page }) => {
    const firstPost = page
      .locator(".card-list__item")
      .filter({ hasText: "Getting Started with React" });

    // Check tags
    await expect(firstPost.getByText("React", { exact: true })).toBeVisible();
    await expect(firstPost.getByText("JavaScript")).toBeVisible();
    await expect(firstPost.getByText("Tutorial")).toBeVisible();
  });

  test("should have Read More button on blog cards", async ({ page }) => {
    const firstPost = page
      .locator(".card-list__item")
      .filter({ hasText: "Getting Started with React" });

    const readMoreBtn = firstPost.getByRole("button", { name: /Read More/i });
    await expect(readMoreBtn).toBeVisible();
  });

  test("should toggle loading state", async ({ page }) => {
    // Verify loading section exists
    await expect(
      page.getByRole("heading", { name: "Loading State" }),
    ).toBeVisible();

    // Find and click the toggle button
    const toggleBtn = page.getByRole("button", {
      name: "Show Loading State",
    });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();

    // Check that loading state is displayed
    await expect(page.getByText("Loading...")).toBeVisible();

    // Check button text changed
    await expect(
      page.getByRole("button", { name: "Hide Loading State" }),
    ).toBeVisible();

    // Click again to hide loading state
    await page.getByRole("button", { name: "Hide Loading State" }).click();

    // Loading should be gone
    await expect(page.getByText("Loading...")).toHaveCount(0);
  });

  test("should display empty state message", async ({ page }) => {
    // Scroll to empty state section
    await page
      .getByRole("heading", { name: "Empty State" })
      .scrollIntoViewIfNeeded();

    // Verify empty state section
    await expect(
      page.getByRole("heading", { name: "Empty State" }),
    ).toBeVisible();

    // Check empty state message
    await expect(page.getByText("No products found")).toBeVisible();
  });

  test("should display usage code example", async ({ page }) => {
    // Scroll to usage section
    await page.getByRole("heading", { name: "Usage" }).scrollIntoViewIfNeeded();

    // Verify usage section
    await expect(
      page.getByRole("heading", { name: "Usage", exact: true }),
    ).toBeVisible();

    // Check that code example is present
    const codeBlock = page.locator(".code-block");
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText("import { CardList }");
    await expect(codeBlock).toContainText("renderCard");
    await expect(codeBlock).toContainText("getKey");
  });

  test("should have interactive cards with hover state", async ({ page }) => {
    const productCard = page
      .locator(".card--interactive")
      .filter({ hasText: "Wireless Headphones" })
      .first();

    await expect(productCard).toBeVisible();

    // Hover over the card
    await productCard.hover();

    // Card should still be visible after hover
    await expect(productCard).toBeVisible();
  });

  test("should render cards with different variants", async ({ page }) => {
    // Product cards should have elevated variant
    const elevatedCard = page
      .locator(".card--elevated")
      .filter({ hasText: "Wireless Headphones" })
      .first();
    await expect(elevatedCard).toBeVisible();

    // Blog cards should have outlined variant
    const outlinedCard = page
      .locator(".card--outlined")
      .filter({ hasText: "Getting Started with React" })
      .first();
    await expect(outlinedCard).toBeVisible();
  });

  test("should display all 6 product cards", async ({ page }) => {
    // Count product cards in the first section
    const productCards = page
      .locator(".component-page__section")
      .filter({ hasText: "Product Cards (3 columns)" })
      .locator(".card-list__item");

    await expect(productCards).toHaveCount(6);
  });

  test("should display all 3 blog post cards", async ({ page }) => {
    // Count blog post cards
    const blogCards = page
      .locator(".component-page__section")
      .filter({ hasText: "Blog Posts (2 columns)" })
      .locator(".card-list__item");

    await expect(blogCards).toHaveCount(3);
  });

  test("should have accessible card structure", async ({ page }) => {
    // Check that cards are properly structured with semantic elements
    const productSection = page
      .locator(".component-page__section")
      .filter({ hasText: "Product Cards (3 columns)" });

    // Verify headings are present
    await expect(
      productSection.getByRole("heading", {
        name: "Product Cards (3 columns)",
      }),
    ).toBeVisible();

    // Verify buttons have accessible labels
    const buttons = productSection.getByRole("button");
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Verify all buttons have text content
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      expect(text?.trim()).not.toBe("");
    }
  });
});
