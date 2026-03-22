# Production Readiness Plan

This document outlines the next steps needed to bring `@mp-ku/mp-components` to full production maturity. Items are grouped by priority and category.

---

## Current State Summary

| Area | Status |
|---|---|
| TypeScript strict mode | ✅ Done |
| Automated testing (CT + E2E) | ✅ Done |
| CI/CD pipelines | ✅ Done |
| npm publishing automation | ✅ Done |
| GitHub Pages documentation | ✅ Done |
| Accessibility (WCAG 2.1 AA) | ✅ Done |
| Git hooks (pre-commit lint) | ✅ Done |
| MIT License | ✅ Done |
| CONTRIBUTING guide | ✅ Done |
| CHANGELOG | ❌ Missing |
| SECURITY policy | ❌ Missing |
| Test coverage reporting | ❌ Missing |
| Automated dependency updates | ❌ Missing |
| Bundle size tracking | ❌ Missing |
| GitHub issue/PR templates | ❌ Missing |
| API documentation | ❌ Missing |
| Pre-release / beta channel | ❌ Missing |

---

## 🔴 Priority 1 – Critical (Do These First)

### 1. Add a CHANGELOG

**Why:** Consumers of the package need to know what changed between versions to safely upgrade. A missing changelog is a red flag for production library use.

**Steps:**
- [ ] Create `CHANGELOG.md` following the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
- [ ] Retroactively document the changes from v0.1.0 → v0.1.16 (use `git log --oneline` as a starting point).
- [ ] Add a "Unreleased" section at the top for changes not yet in a release.
- [ ] Update the section heading in `README.md` to link to `CHANGELOG.md`.
- [ ] Consider adopting [Conventional Commits](https://www.conventionalcommits.org/) and automating changelog generation with a tool such as `conventional-changelog-cli` or `changesets`.

**Example structure:**
```md
## [Unreleased]

## [0.1.16] – 2025-XX-XX
### Added
- ...
### Fixed
- ...
### Changed
- ...
```

---

### 2. Add a SECURITY Policy

**Why:** A `SECURITY.md` is required for responsible disclosure, mandatory for many enterprise consumers, and displayed prominently by GitHub on the repository's Security tab.

**Steps:**
- [ ] Create `SECURITY.md` at the repository root.
- [ ] Document supported versions (e.g., only the latest minor release receives security patches).
- [ ] Provide a private reporting channel (GitHub's built-in "Report a vulnerability" feature, or a dedicated email address).
- [ ] Set an expected response / remediation SLA (e.g., 7 days for acknowledgement, 90 days for fix).
- [ ] Enable [GitHub Private Vulnerability Reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability) in the repository settings.

**Minimum template:**
```md
## Supported Versions
| Version | Supported |
|---------|-----------|
| 0.1.x   | ✅        |

## Reporting a Vulnerability
Please report security issues via GitHub's private "Report a vulnerability" button
on the Security tab, or email security@example.com.
We acknowledge reports within 7 days and aim to release a fix within 90 days.
```

---

### 3. Add Test Coverage Reporting

**Why:** Without coverage metrics, there is no way to detect when new code is shipped without tests. Coverage also reveals untested edge cases in existing components.

**Steps:**
- [ ] Integrate `@vitest/coverage-v8` (or `istanbul`) — note that `vitest` is already a dev-dependency.
- [ ] Add a `test:coverage` script to `package.json`:
  ```json
  "test:coverage": "vitest run --coverage"
  ```
- [ ] Set minimum coverage thresholds in `vite.config.ts` (recommend ≥ 80 % lines/branches).
- [ ] Add a coverage step to `.github/workflows/test.yml` that uploads results to [Codecov](https://codecov.io/) or GitHub's built-in summary.
- [ ] Add a coverage badge to `README.md`.

---

## 🟠 Priority 2 – Important

### 4. Automated Dependency Updates (Dependabot / Renovate)

**Why:** Outdated dependencies are the most common source of security vulnerabilities. Manual tracking across 40+ packages is error-prone.

**Steps:**
- [ ] Create `.github/dependabot.yml` (or `renovate.json`) to automate dependency update PRs.
- [ ] Configure it to group minor/patch updates into a single weekly PR to reduce noise.
- [ ] Pin Playwright browser version updates separately to avoid unexpected test failures.
- [ ] Enable GitHub's [secret scanning](https://docs.github.com/en/code-security/secret-scanning) and [code scanning](https://docs.github.com/en/code-security/code-scanning) in repository settings.

**Minimum `dependabot.yml`:**
```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      minor-and-patch:
        update-types: [minor, patch]
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
```

---

### 5. Bundle Size Tracking

**Why:** Unintentional size regressions can hurt consumers. Tree-shaking effectiveness should be verifiable.

**Steps:**
- [ ] Add [bundlesize](https://github.com/siddharthkp/bundlesize) or [size-limit](https://github.com/ai/size-limit) as a dev-dependency.
- [ ] Define per-entrypoint size budgets in `package.json` (e.g., `< 20 kB` gzipped for core components).
- [ ] Run bundle size checks in CI as a PR status check (fails PR if budget is exceeded).
- [ ] Add a bundle size badge to `README.md`.

**Example `size-limit` config in `package.json`:**
```json
"size-limit": [
  { "path": "dist/index.js", "limit": "50 kB" }
]
```

---

### 6. GitHub Issue and Pull Request Templates

**Why:** Structured templates reduce back-and-forth during issue triage and code review.

**Steps:**
- [ ] Create `.github/ISSUE_TEMPLATE/bug_report.md` with fields for: component name, version, steps to reproduce, expected vs. actual behaviour, and browser/OS.
- [ ] Create `.github/ISSUE_TEMPLATE/feature_request.md` with fields for: motivation, proposed API, and accessibility considerations.
- [ ] Create `.github/ISSUE_TEMPLATE/config.yml` to disable blank issues and link to Discussions.
- [ ] Create `.github/PULL_REQUEST_TEMPLATE.md` mirroring the pre-commit checklist in `CONTRIBUTING.md` (tests green, BEM CSS, a11y verified, changelog updated, etc.).

---

### 7. Complete Component Test Coverage

**Why:** Some components may lack tests for edge cases, error states, and keyboard navigation.

**Steps:**
- [ ] Audit every component in `common/`, `controls/`, `data-display/`, `layout/`, `Intrexx/`, and `Router/` to verify it has a corresponding `.test.tsx` file.
- [ ] For components that do have tests, verify each test file covers:
  - [ ] Happy-path rendering
  - [ ] All named props/variants
  - [ ] Keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
  - [ ] WCAG 2.1 AA accessibility check via `axe-core`
  - [ ] Error / empty states
- [ ] Add missing tests until coverage thresholds (from Step 3) are met.

---

## 🟡 Priority 3 – Nice to Have

### 8. API Documentation Generation

**Why:** The live demo is excellent for visual exploration, but developers also need a searchable, generated API reference.

**Steps:**
- [ ] Add [TypeDoc](https://typedoc.org/) as a dev-dependency.
- [ ] Configure `typedoc.json` to generate HTML from the JSDoc comments already present in the codebase.
- [ ] Add a `docs:api` script: `"docs:api": "typedoc --out docs/api index.ts"`.
- [ ] Deploy API docs alongside the demo site or as a separate GitHub Pages path.
- [ ] Link to the API reference from `README.md`.

---

### 9. Pre-release / Beta Channel

**Why:** New features should be battle-tested by early adopters before being tagged `latest` on npm.

**Steps:**
- [ ] Configure the `npm-publish.yml` workflow to publish pre-release versions (e.g., `0.2.0-beta.1`) to the `next` dist-tag instead of `latest`.
- [ ] Document how to install the beta channel in `README.md`:
  ```bash
  pnpm add @mp-ku/mp-components@next
  ```
- [ ] Consider adopting [Changesets](https://github.com/changesets/changesets) for a fully automated pre-release → stable promotion workflow.

---

### 10. Improve Package Metadata

**Why:** Better npm discoverability and clearer entrypoint declarations improve the consumer experience.

**Steps:**
- [ ] Add missing keywords to `package.json`: `"accessible"`, `"a11y"`, `"wcag"`, `"react19"`, `"radix-ui"`, `"component-library"`.
- [ ] Verify `"exports"` field in `package.json` correctly exposes subpath exports for individual components (enables maximum tree-shaking).
- [ ] Add `"sideEffects": ["*.css"]` to `package.json` so bundlers can safely tree-shake JS while keeping CSS.
- [ ] Pin `"engines"` field: `{ "node": ">=18", "pnpm": ">=8" }`.

---

### 11. Branch Protection & Merge Requirements

**Why:** Direct pushes to `main` bypass CI and code review, risking broken releases.

**Steps:**
- [ ] Enable branch protection for `main` in GitHub repository settings:
  - [ ] Require pull request reviews (minimum 1 approval).
  - [ ] Require status checks to pass (component tests, type-check, lint) before merging.
  - [ ] Require branches to be up-to-date before merging.
  - [ ] Restrict direct pushes to `main`.
- [ ] Document branch strategy in `CONTRIBUTING.md` (e.g., `feature/*`, `fix/*`, `chore/*`).

---

### 12. npm Publish Provenance

**Why:** npm provenance links a published package to its source commit and build workflow, making supply-chain attacks detectable.

**Steps:**
- [ ] Add `--provenance` flag to the `npm publish` command in `.github/workflows/npm-publish.yml`.
- [ ] Ensure the workflow has `id-token: write` permission (required for OIDC provenance signing).
- [ ] Verify the published package shows a provenance badge on npmjs.com.

---

## Summary Checklist

```
Priority 1 – Critical
  [ ] 1. CHANGELOG.md
  [ ] 2. SECURITY.md
  [ ] 3. Test coverage reporting

Priority 2 – Important
  [ ] 4. Dependabot / Renovate
  [ ] 5. Bundle size tracking
  [ ] 6. Issue & PR templates
  [ ] 7. Complete component test coverage

Priority 3 – Nice to Have
  [ ] 8.  API documentation (TypeDoc)
  [ ] 9.  Pre-release / beta channel
  [ ] 10. Improve package metadata
  [ ] 11. Branch protection rules
  [ ] 12. npm publish provenance
```

---

## Recommended Implementation Order

1. **CHANGELOG + SECURITY** – Low effort, high trust signal. Do these in a single PR.
2. **Issue & PR templates + branch protection** – Improve contribution quality with minimal code changes.
3. **Dependabot** – One config file, provides ongoing security with zero maintenance.
4. **Test coverage** – Audit and fill gaps; add thresholds to CI.
5. **Bundle size tracking** – Add `size-limit`, establish baselines, wire into CI.
6. **API docs (TypeDoc)** – Add to build pipeline and deploy alongside demo.
7. **Pre-release channel + provenance** – Requires a release process discussion.

---

*Last updated: 2026-03-22*
