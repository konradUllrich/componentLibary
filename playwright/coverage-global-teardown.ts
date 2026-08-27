// Runs once in the main process after every coverage test worker has
// finished. Merges the coverage data added by each worker (see
// coverage-fixtures.ts) and generates the report. `coverageOptions.onEnd`
// enforces the minimum-coverage thresholds and throws if they're not met,
// which fails this teardown and makes `pnpm test:ct:coverage` exit non-zero.
import MCR from "monocart-coverage-reports";
import { coverageOptions } from "./coverage.config";

export default async function globalTeardown() {
  const mcr = MCR(coverageOptions);
  await mcr.generate();
}
