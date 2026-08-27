#!/usr/bin/env node
/**
 * test:agent — the check an agent (or a human) runs after making changes.
 *
 * Always runs:
 *   - tsc --noEmit  (type-check)
 *   - eslint .      (lint)
 *
 * Then runs component tests:
 *   - By default, scoped to files affected by the current git changes
 *     (co-located *.test.tsx next to each changed file/directory).
 *   - Falls back to the full `test:ct` suite when a change touches
 *     shared infrastructure (Router, hooks, stores, styles, test/build
 *     config) or when no scoped test files can be determined.
 *   - Pass --full to always run the full suite.
 *
 * Exit code is non-zero if any step fails.
 */
import { execSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const forceFull = process.argv.includes("--full");

// Paths where a change can affect components anywhere else in the tree —
// scoping tests to "nearby" files would be unsafe, so fall back to full.
const BROAD_IMPACT_PATTERNS = [
  /^Router\//,
  /^hooks\//,
  /^stores\//,
  /^styles\//,
  /^playwright\//,
  /^playwright-ct\.config\.ts$/,
  /^playwright\.config\.ts$/,
  /^package\.json$/,
  /^pnpm-lock\.yaml$/,
  /^tsconfig.*\.json$/,
  /^vite\.config.*\.ts$/,
  /^eslint\.config\.js$/,
];

function run(label, cmd, args) {
  console.log(`\n▶ ${label}`);
  const result = spawnSync(cmd, args, { stdio: "inherit", cwd: repoRoot });
  if (result.status !== 0) {
    console.error(`\n✘ ${label} failed`);
    return false;
  }
  console.log(`✔ ${label} passed`);
  return true;
}

function getChangedFiles() {
  const tracked = execSync("git diff --name-only HEAD", { cwd: repoRoot })
    .toString()
    .split("\n")
    .filter(Boolean);
  const untracked = execSync(
    "git ls-files --others --exclude-standard",
    { cwd: repoRoot },
  )
    .toString()
    .split("\n")
    .filter(Boolean);
  return [...new Set([...tracked, ...untracked])];
}

function findCoLocatedTests(changedFiles) {
  const testFiles = new Set();

  for (const file of changedFiles) {
    if (!/\.(tsx?|css)$/.test(file)) continue;
    if (file.endsWith(".test.tsx")) {
      if (existsSync(path.join(repoRoot, file))) testFiles.add(file);
      continue;
    }

    const dir = path.dirname(file);
    const absDir = path.join(repoRoot, dir);
    if (!existsSync(absDir)) continue;

    for (const entry of readdirSync(absDir)) {
      if (entry.endsWith(".test.tsx")) {
        testFiles.add(path.join(dir, entry));
      }
    }
  }

  return [...testFiles];
}

function isBroadImpact(changedFiles) {
  return changedFiles.some((f) =>
    BROAD_IMPACT_PATTERNS.some((pattern) => pattern.test(f)),
  );
}

let ok = true;

ok = run("type-check (tsc --noEmit)", "pnpm", ["type-check"]) && ok;
ok = run("lint (eslint .)", "pnpm", ["lint"]) && ok;

const changedFiles = getChangedFiles();
const broad = forceFull || isBroadImpact(changedFiles);

if (changedFiles.length === 0 && !forceFull) {
  console.log("\n(no git changes detected — skipping component tests)");
} else if (broad) {
  console.log(
    forceFull
      ? "\n--full requested — running the full component test suite"
      : "\nChange touches shared infrastructure — running the full component test suite",
  );
  ok = run("test:ct (full suite)", "pnpm", [
    "test:ct",
    "--reporter=list",
  ]) && ok;
} else {
  const testFiles = findCoLocatedTests(changedFiles);
  if (testFiles.length === 0) {
    console.log(
      "\nNo co-located test files found for the changed files — running the full component test suite",
    );
    ok = run("test:ct (full suite)", "pnpm", [
      "test:ct",
      "--reporter=list",
    ]) && ok;
  } else {
    console.log(`\nRunning scoped component tests for:\n  ${testFiles.join("\n  ")}`);
    ok = run("test:ct (scoped)", "pnpm", [
      "test:ct",
      "--reporter=list",
      ...testFiles,
    ]) && ok;
  }
}

console.log(ok ? "\n✔ test:agent passed" : "\n✘ test:agent failed");
process.exit(ok ? 0 : 1);
