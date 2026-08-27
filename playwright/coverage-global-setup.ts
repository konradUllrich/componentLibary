// Runs once in the main process before any coverage test worker starts.
// Clears the previous run's coverage cache so results don't accumulate
// across runs (see "Multiprocessing Support" in monocart-coverage-reports).
import MCR from "monocart-coverage-reports";
import { coverageOptions } from "./coverage.config";

export default async function globalSetup() {
  const mcr = MCR(coverageOptions);
  mcr.cleanCache();
}
