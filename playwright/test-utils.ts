// playwright/test-utils.ts
import { expect } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

/**
 * Run accessibility checks on a locator using axe-core
 * @param page - The Playwright page object
 * @param options - Optional configuration for axe
 */
export async function checkA11y(
  page: any,
  options?: {
    disableRules?: string[];
    tags?: string[];
  }
) {
  const builder = new AxeBuilder({ page })
    .withTags(options?.tags || ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

  // Disable specific rules if requested
  if (options?.disableRules) {
    for (const rule of options.disableRules) {
      builder.disableRules([rule]);
    }
  }

  const accessibilityScanResults = await builder.analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
}

/**
 * Check if an element is visible
 */
export async function expectVisible(locator: any) {
  await expect(locator).toBeVisible();
}

/**
 * Check if an element has accessible name
 */
export async function expectAccessibleName(locator: any, name: string | RegExp) {
  await expect(locator).toHaveAccessibleName(name);
}

/**
 * Check if an element has accessible role
 */
export async function expectAccessibleRole(locator: any, role: string) {
  await expect(locator).toHaveRole(role as any);
}
