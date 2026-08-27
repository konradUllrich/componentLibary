// Drop-in replacement for `@playwright/experimental-ct-react`'s `test`/
// `expect`. Every *.test.tsx file imports `test`/`expect` from here instead
// of importing them directly, so that coverage collection is available
// everywhere without touching test files again in the future.
//
// Collection itself is opt-in via the `collectCoverage` fixture option,
// which is `false` by default (plain `pnpm test:ct` runs get zero CDP
// overhead) and set to `true` only by playwright-ct.coverage.config.ts
// (`pnpm test:ct:coverage`).
import {
  test as base,
  expect,
  type ComponentFixtures,
} from "@playwright/experimental-ct-react";
import type {
  TestType,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from "@playwright/test";
import MCR from "monocart-coverage-reports";
import { coverageOptions } from "./coverage.config";

const mcr = MCR(coverageOptions);

type CoverageFixtures = {
  collectCoverage: boolean;
  autoCoverage: void;
};

// Reconstructed from @playwright/experimental-ct-react's own `TestType`
// using only publicly re-exported types (avoids depending on the
// unexported `@playwright/experimental-ct-core` package directly, and the
// TS2742 "cannot be named" error that comes with it). Omits the internal
// `router` fixture, which no test in this repo uses.
export const test: TestType<
  PlaywrightTestArgs & PlaywrightTestOptions & ComponentFixtures & CoverageFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = base.extend<CoverageFixtures>({
  collectCoverage: [false, { option: true }],

  autoCoverage: [
    async ({ page, collectCoverage }, use) => {
      if (!collectCoverage) {
        await use();
        return;
      }

      // JS coverage only — CSS coverage measures which selectors were
      // exercised by a given test's DOM, which for a component library is
      // mostly noise (most rules are state-dependent) rather than a
      // meaningful signal, and it dominates the "lines" metric if included.
      await page.coverage.startJSCoverage({ resetOnNavigation: false });
      await use();
      const jsCoverage = await page.coverage.stopJSCoverage();
      await mcr.add(jsCoverage);
    },
    { scope: "test", auto: true },
  ],
});

export { expect };
