import { defineConfig, devices } from "@playwright/experimental-ct-react";

/**
 * Coverage variant of playwright-ct.config.ts, used by `pnpm test:ct:coverage`.
 * Runs the exact same component tests, but with `collectCoverage: true` (see
 * playwright/coverage-fixtures.ts) and global setup/teardown that clean the
 * previous coverage cache and generate the merged report + enforce the
 * threshold in playwright/coverage.config.ts.
 *
 * Keep everything except globalSetup/globalTeardown/use.collectCoverage/
 * ctPort in sync with playwright-ct.config.ts.
 */
export default defineConfig<{ collectCoverage: boolean }>({
  testDir: "./",
  testMatch: "**/*.test.tsx",
  testIgnore: "e2e/**/*.spec.ts",
  snapshotDir: "./__snapshots__",
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  globalSetup: "./playwright/coverage-global-setup.ts",
  globalTeardown: "./playwright/coverage-global-teardown.ts",
  use: {
    trace: "on-first-retry",
    // Different port than playwright-ct.config.ts so a coverage run never
    // collides with a concurrently running plain test:ct.
    ctPort: 3101,
    collectCoverage: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
