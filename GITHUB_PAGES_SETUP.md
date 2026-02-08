# GitHub Pages Setup Instructions

This document provides instructions for enabling GitHub Pages for this repository.

## Automatic Deployment

The repository is configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the demo site to GitHub Pages whenever changes are pushed to the `main` branch.

## Enabling GitHub Pages

To enable GitHub Pages for this repository:

1. Go to the repository settings on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions** as the build and deployment method
4. The workflow will automatically deploy the site on the next push to `main`

## What Gets Deployed

The demo site includes:
- **Home Page**: Landing page with features and call-to-action buttons
- **Components Page**: Interactive showcase of all components with live examples
- **Documentation Page**: Installation instructions, usage examples, and component categories

## Building Locally

To build the demo site locally:

```bash
npm run demo:build
```

This creates a production build in the `docs/` directory.

## Running Locally

To run the demo site locally during development:

```bash
npm run demo
```

This starts a development server at `http://localhost:5173/componentLibary/`

## Preview Production Build

To preview the production build locally:

```bash
npm run demo:preview
```

## URL Structure

Once deployed, the site will be available at:
```
https://konradullrich.github.io/componentLibary/
```

The base path `/componentLibary/` is configured in `vite.config.demo.ts` to match the GitHub Pages URL structure.

## Updating the Demo

To update the demo site:

1. Make changes to files in the `demo/` directory
2. Commit and push to the `main` branch (or merge a PR)
3. The GitHub Actions workflow will automatically build and deploy the updated site

## Troubleshooting

If the site doesn't deploy:
- Check the Actions tab in GitHub to see if the workflow ran successfully
- Verify that GitHub Pages is enabled in repository settings
- Ensure the workflow has the necessary permissions (should be automatic)
- Check that the `docs/` directory is being created during the build
