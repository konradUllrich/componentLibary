# GitHub Pages Routing Solution

## Problem

When using client-side routing (like TanStack Router) on GitHub Pages, direct URL access or page reloads result in a 404 error. This happens because:

1. Client-side navigation works fine (e.g., clicking links to `/components`)
2. But direct URL access or page refresh fails because GitHub Pages tries to find a physical file at that path
3. Since there's no actual file at `/components/index.html`, GitHub Pages returns 404

## Solution

We've implemented the standard SPA (Single Page Application) solution for GitHub Pages using a custom 404.html redirect approach:

### 1. Created `demo/404.html`

This file is served by GitHub Pages when a route is not found. It contains JavaScript that:
- Captures the requested URL path
- Encodes it into a query parameter
- Redirects to `index.html` with the encoded path

**Key configuration:**
```javascript
var pathSegmentsToKeep = 1;
```

This is set to `1` because our GitHub Pages site uses a project path (`/componentLibary/`). This ensures the redirect preserves the base path.

### 2. Updated `demo/index.html`

Added a script in the `<head>` that:
- Checks for the encoded path in the query string
- Decodes it back to the original URL
- Uses `window.history.replaceState()` to restore the correct URL
- Allows the React router to handle the route normally

### 3. Updated `vite.config.demo.ts`

Modified the Vite build configuration to:
- Copy `404.html` from `demo/` to `docs/` directory during build
- Ensure the file is included in the deployed site

## How It Works

### Example Flow

1. User visits: `https://konradullrich.github.io/componentLibary/components`
2. GitHub Pages doesn't find a file at that path → serves `404.html`
3. `404.html` JavaScript redirects to: `https://konradullrich.github.io/componentLibary/?/components`
4. `index.html` loads and its script:
   - Detects `?/components` in the query string
   - Converts it back to `/componentLibary/components`
   - Updates browser history with `replaceState()`
5. React app initializes with the correct route
6. TanStack Router renders the components page

### What Users See

- **No flash or visible redirect** - The URL is corrected before the app renders
- **Clean URLs** - After the redirect, the URL shows the correct path without query parameters
- **Browser history works** - Back/forward buttons work as expected
- **Shareable URLs** - Direct links to any route work correctly

## Testing Locally

### Build and Preview

```bash
npm run demo:build
npm run demo:preview
```

**Note:** Vite's preview server has built-in SPA fallback, so it won't replicate the exact GitHub Pages behavior. However, you can verify:

1. The `404.html` file exists in the `docs/` directory
2. The `index.html` contains the redirect handling script

### Testing the Actual Redirect

To test the actual redirect behavior, you would need to:

1. Deploy to GitHub Pages
2. Visit a route directly (e.g., `/components`)
3. Verify it loads correctly without a 404 error

## Alternative Solutions Considered

### Hash-based Routing

We could have used hash-based routing (`#/components` instead of `/components`), but this:
- Results in less clean URLs
- Is not as SEO-friendly
- Doesn't match modern web standards

### Server-side Routing

Not available on GitHub Pages static hosting.

## Credits

This solution is based on the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) approach, which is a widely-used pattern for deploying SPAs to GitHub Pages.

## Future Improvements

If the project ever moves to a different hosting platform (Vercel, Netlify, etc.), we can simplify by:
1. Removing the 404.html redirect mechanism
2. Removing the redirect script from index.html
3. Configuring the host's built-in SPA fallback

The router configuration already supports both approaches, so the transition would be straightforward.
