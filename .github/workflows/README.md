# GitHub Workflows

This directory contains GitHub Actions workflows for the mpComponents project.

## Available Workflows

### CI Tests (`ci.yml`)
Runs automated tests on every pull request and push to main branch.

**Triggers:**
- Pull requests targeting `main`
- Pushes to `main` branch

**Checks:**
- Type checking (`npm run type-check`)
- Component tests (`npm run test:ct`)

**Duration:** ~2-5 minutes

### Deploy to GitHub Pages (`deploy.yml`)
Builds and deploys the demo site to GitHub Pages.

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

### Publish to npm (`publish.yml`)
Publishes the library to npm when a new version tag is pushed.

**Triggers:**
- Push of tags matching `v*` (e.g., `v0.1.0`)

### Copilot Agent Dispatcher (`copilot-agent.yml`)

Reads `plan/components.md`, finds every line starting with `@copilot:`, and creates a GitHub Issue assigned to the **Copilot coding agent** for each task that does not already have an open or closed issue.

**Triggers:**
- Push to `main` when `plan/components.md` changes
- Manual workflow dispatch

**How to add a task:**
Add a line anywhere in `plan/components.md` using the format:
```
@copilot: <describe the task here>
```
The next push to `main` will automatically open an issue and assign it to Copilot.

**Permissions required:** `issues: write`

---

## Setting Up Branch Protection

To require the CI workflow to pass before merging pull requests:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule**
4. Configure the rule:
   - **Branch name pattern**: `main`
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
     - Search for and select: **test**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Do not allow bypassing the above settings**
5. Click **Create** or **Save changes**

After this setup, pull requests cannot be merged until the `test` job in the CI workflow passes successfully.

## Local Testing

Before pushing your changes, run these commands locally to catch issues early:

```bash
# Type checking
npm run type-check

# Component tests
npm run test:ct
```

All of these must pass for the CI workflow to succeed.
