// Shared monocart-coverage-reports options for Playwright component-test
// coverage. Imported by coverage-fixtures.ts (adds data from each worker)
// and by coverage-global-setup.ts / coverage-global-teardown.ts (clean +
// generate in the main process). Keep this the single source of truth —
// all three must use the exact same options object.
import type MCR from "monocart-coverage-reports";

type CoverageOptions = Parameters<typeof MCR>[0];

/**
 * Minimum coverage required for `pnpm test:ct:coverage` to pass.
 * Raise this over time as coverage improves — don't lower it to make a
 * red run green.
 */
const THRESHOLDS = {
  statements: 70,
  lines: 70,
} as const;

export const coverageOptions: CoverageOptions = {
  name: "mpComponents Component Coverage",
  outputDir: "./coverage/ct",
  reports: ["v8", "console-summary"],

  // Allowlist of first-party source directories, rather than trying to
  // blacklist every possible build/asset/vendor path — order matters,
  // first match wins, and the final `**/*: false` excludes anything not
  // explicitly listed (bundled CSS chunk URLs, demo/e2e/docs, etc.).
  filter: {
    "**/node_modules/**": false,
    "**/*.test.tsx": false,
    "**/*.test-components.tsx": false,
    "**/*.stories.tsx": false,
    "**/*": true,
  },

  onEnd: (coverageResults) => {
    if (!coverageResults) return;
    const { summary } = coverageResults;
    const errors: string[] = [];
    for (const key of Object.keys(THRESHOLDS) as Array<
      keyof typeof THRESHOLDS
    >) {
      const pct = summary[key]?.pct;
      if (typeof pct === "number" && pct < THRESHOLDS[key]) {
        errors.push(
          `Coverage threshold for ${key} (${pct}%) not met: required ${THRESHOLDS[key]}%`,
        );
      }
    }
    if (errors.length) {
      throw new Error(errors.join("\n"));
    }
  },
};
