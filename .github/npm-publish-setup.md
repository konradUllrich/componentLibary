# npm Publishing Setup Guide

## Overview

The `npm-publish.yml` workflow automatically publishes your package to npm when you update the version in `package.json` and push to the main branch.

**Workflow behavior:**

- ✅ Detects version changes in `package.json`
- ✅ Runs all tests (type-check, lint, component tests, E2E tests)
- ✅ Builds the library
- ✅ Publishes to npm if all checks pass
- ✅ Creates a GitHub Release with the new version

## Setup Steps

### Step 1: Create an npm Token

1. Go to https://www.npmjs.com/settings/~tokens
2. Click **"Generate New Token"**
3. Choose **"Automation"** (or "Publish" classically)
4. Give it a name, e.g., `github-actions-publish`
5. Copy the token (you won't be able to see it again)

### Step 2: Add NPM_TOKEN to GitHub Secrets

1. Go to your repository: https://github.com/konradullrich/componentLibary
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"**
4. Name: `NPM_TOKEN`
5. Value: Paste the token you just created
6. Click **"Add secret"**

### Step 3: Update Version and Push

To publish a new version:

```bash
# Update package.json version manually
# Example: change from "0.1.0" to "0.2.0"
vim package.json

# Commit and push
git add package.json
git commit -m "chore: release v0.2.0"
git push origin main
```

The workflow will:

1. ✅ Detect the version change
2. ✅ Run all tests
3. ✅ Build the package
4. ✅ Publish to npm
5. ✅ Create a GitHub Release

You can monitor the progress in the **Actions** tab of your repository.

## Troubleshooting

### "npm ERR! 401 Unauthorized"

- **Cause:** NPM_TOKEN is invalid, expired, or missing
- **Fix:** Regenerate a new token and update the GitHub secret

### "This version is already published"

- **Cause:** The version in package.json matches an npm registry version
- **Fix:** Increment the version in package.json to a new number

### "Tests failed, publish skipped"

- **Cause:** One or more test suite failed
- **Fix:** Check the workflow logs to see which test failed, fix the code, and try again

### Workflow didn't trigger

- **Cause:** The commit didn't modify `package.json`, or you pushed to a different branch
- **Fix:** Ensure you're pushing to `main` branch and that `package.json` actually changed

## Manual Trigger

You can also manually trigger the workflow without changing the version:

1. Go to **Actions** tab in your repository
2. Click **"Publish to npm"** in the left sidebar
3. Click **"Run workflow"**

Note: This will publish whatever version is currently in `package.json`, even if it was already published.

## Verification

To verify your package was published:

```bash
npm view @konradullrich/mp-components
```

This should show details of your published package including all versions.

## Best Practices

1. **Always update version before publishing**
   - Follow semantic versioning: MAJOR.MINOR.PATCH
   - Example: v0.1.0 → v0.2.0 (minor) or v0.1.1 (patch)

2. **Update CHANGELOG** (when ready)
   - Create a CHANGELOG.md to document releases
   - List breaking changes, features, and fixes

3. **Tag releases**
   - The workflow auto-creates GitHub releases
   - Users can find all releases in the **Releases** section

4. **Keep npm_modules clean**
   - Never commit node_modules
   - Ensure .gitignore includes node_modules/

5. **Test locally first**
   - Run `pnpm build` to verify the build works
   - Run `pnpm test:ct` and `pnpm test:e2e` locally
   - Then update version and push

## Package Configuration

Your `package.json` is already set up correctly:

```json
{
  "name": "@konradullrich/mp-components",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles/index.css"
  },
  "files": ["dist", "src"]
}
```

## Files Included in npm Package

When you publish, npm includes:

- ✅ `dist/` - Compiled JavaScript and type definitions
- ✅ `src/` - Original TypeScript source
- ❌ `demo/`, `e2e/`, `playwright/` - Excluded
- ❌ Tests and build tools - Excluded

This keeps the package lightweight for consumers.
