# TanStack Router Configuration

This demo application uses TanStack Router with configurable routing modes.

## Routing Modes

The router supports two modes:

### 1. URL Mode (Default)

Traditional URL routing where routes are represented in the URL path:

```
/                        → Home page
/components              → Components list
/components/button       → Button component page
/docs                    → Documentation page
```

**Example URLs:**
- `http://localhost:5173/componentLibary/`
- `http://localhost:5173/componentLibary/components/button`
- `http://localhost:5173/componentLibary/docs`

### 2. Param Mode

Routes are stored in a URL parameter instead of the path. This is useful when:
- You need to embed the app in an iframe with restricted routing
- You want all navigation to happen on a single URL path
- You have hosting constraints that prevent deep URL routing

**Example URLs (with default param name `route`):**
- `http://localhost:5173/componentLibary/?route=/`
- `http://localhost:5173/componentLibary/?route=/components/button`
- `http://localhost:5173/componentLibary/?route=/docs`

## Configuration

### Method 1: Environment Variable

Set the `VITE_ROUTER_MODE` environment variable:

```bash
# For URL mode (default)
VITE_ROUTER_MODE=url npm run demo

# For param mode
VITE_ROUTER_MODE=param npm run demo
```

You can also create a `.env` file:

```env
VITE_ROUTER_MODE=param
```

### Method 2: Modify routerConfig.ts

Edit `demo/routerConfig.ts` to change the default mode:

```typescript
export const defaultRouterConfig: RouterConfig = {
  mode: 'param', // Change this to 'param' or 'url'
  paramName: 'route', // Customize the URL parameter name
};
```

## Custom Parameter Name

When using param mode, you can customize the URL parameter name:

```typescript
export const defaultRouterConfig: RouterConfig = {
  mode: 'param',
  paramName: 'p', // Use ?p=/components instead of ?route=/components
};
```

## Usage in Components

The router is abstracted behind the `useAppNavigation` hook, which works seamlessly in both modes:

```typescript
import { useAppNavigation } from './useAppNavigation';

function MyComponent() {
  const { currentPage, currentComponent, navigateTo } = useAppNavigation();
  
  // Navigate to a page
  const goToComponents = () => {
    navigateTo('/components');
  };
  
  // Check current page
  if (currentPage === 'components') {
    // ...
  }
  
  return <button onClick={goToComponents}>View Components</button>;
}
```

## Benefits

### URL Mode Benefits:
- ✅ Clean, readable URLs
- ✅ Better SEO
- ✅ Standard browser behavior (back/forward buttons work naturally)
- ✅ Easy to share specific pages

### Param Mode Benefits:
- ✅ Works in environments with URL routing restrictions
- ✅ Simpler server configuration (single route handling)
- ✅ Useful for iframe embedding
- ✅ All navigation happens on one base URL

## Building for Production

When building, the mode is determined at build time:

```bash
# Build with URL mode
npm run demo:build

# Build with param mode
VITE_ROUTER_MODE=param npm run demo:build
```

## Testing

Both modes have been tested and work correctly with:
- Direct navigation via buttons and links
- Sidebar navigation
- Deep linking (entering URLs directly)
- Browser back/forward buttons
- Page refreshes
