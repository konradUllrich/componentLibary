# Theme System Implementation

## Overview

This implementation adds a complete theming system to the mpComponents library, allowing users to customize the appearance of all components in real-time through an interactive panel in the demo application.

## Architecture

### 1. Theme Context (`ThemeContext.tsx`)

The theme system is built on React Context API with the following features:

- **Theme State Management**: Manages theme configuration including colors, typography, and border radius
- **CSS Variable Integration**: Automatically updates CSS custom properties when theme changes
- **Persistence**: Saves theme preferences to localStorage for persistence across sessions
- **Error Handling**: Gracefully handles localStorage failures (e.g., in private browsing mode)

### 2. Theme Configuration (`types.ts`)

Defines the structure of the theme:

```typescript
interface ThemeConfig {
  colors: ThemeColors;     // OkLab color space values
  spacing: { base: number };
  typography: {
    baseFontSize: number;
    baseLineHeight: number;
  };
  borderRadius: { base: number };
}
```

The theme uses OkLab color space for better perceptual uniformity and easier color manipulation.

### 3. Theme Panel (`ThemePanel.tsx`)

An interactive UI component that allows real-time theme customization:

- **Collapsible Design**: Floats on the right side of the screen, can be toggled open/closed
- **Color Controls**: Adjustable OkLab A/B values for all semantic colors (primary, secondary, success, warning, destructive, info)
- **Typography Controls**: Font size and line height sliders
- **Border Radius Control**: Scale multiplier for all border radius values
- **Reset Functionality**: One-click reset to default theme
- **NaN Validation**: Prevents invalid input from corrupting theme state

## Usage

### In the Demo Application

The theme system is already integrated into the demo application:

```tsx
// demo/main.tsx
import { ThemeProvider } from '../common/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

```tsx
// demo/App.tsx
import { ThemePanel } from '../common';

export const App = () => {
  return (
    <div className="app">
      <ThemePanel />
      {/* Rest of your app */}
    </div>
  );
};
```

### In Your Own Application

To use the theme system in your own application:

1. **Wrap your app with ThemeProvider**:

```tsx
import { ThemeProvider } from '@konradullrich/mp-components';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

2. **Optionally add the ThemePanel**:

```tsx
import { ThemePanel } from '@konradullrich/mp-components';

function App() {
  return (
    <ThemeProvider>
      <ThemePanel />
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

3. **Access theme in your components**:

```tsx
import { useTheme } from '@konradullrich/mp-components';

function MyComponent() {
  const { theme, updateTheme, resetTheme } = useTheme();
  
  // Use theme values
  console.log(theme.colors.primaryA);
  
  // Update theme programmatically
  const changeColor = () => {
    updateTheme({
      colors: {
        ...theme.colors,
        primaryA: 0.3,
        primaryB: 0.1,
      },
    });
  };
  
  return <div>...</div>;
}
```

## How It Works

### CSS Custom Properties

The theme system updates CSS custom properties (CSS variables) defined in `styles/variables.css`:

- Color variables: `--color-primary-a`, `--color-primary-b`, etc.
- Typography: `--font-size-base`, `--line-height-normal`
- Border radius: `--radius-sm`, `--radius-md`, `--radius-lg`, etc.

All components use these CSS variables, so changes are instantly reflected across the entire application.

### Theme Persistence

The theme is automatically saved to localStorage whenever it changes:

```typescript
// Saved as JSON
localStorage.setItem('mp-components-theme', JSON.stringify(theme));
```

On page load, the saved theme is restored:

```typescript
const saved = localStorage.getItem('mp-components-theme');
if (saved) {
  theme = JSON.parse(saved);
}
```

### Color System

The theme uses OkLab color space, which provides:

- **Perceptual uniformity**: Equal numeric changes result in equal perceptual changes
- **Better color manipulation**: Easier to create harmonious color schemes
- **Future-proof**: Modern CSS standard

Example color definition:

```css
:root {
  --color-primary-a: 0.15;
  --color-primary-b: -0.15;
  --color-primary: oklab(59.976% var(--color-primary-a) var(--color-primary-b));
}
```

## Features

### Real-time Updates

All theme changes are applied instantly without requiring a page reload. The ThemeContext automatically:

1. Updates the theme state
2. Applies changes to CSS custom properties
3. Saves to localStorage

### Error Handling

The implementation includes comprehensive error handling:

- **NaN Validation**: Prevents invalid numeric input
- **localStorage Errors**: Gracefully handles storage failures
- **Type Safety**: Full TypeScript support

### Accessibility

- Semantic color names (primary, secondary, success, etc.)
- Maintains WCAG contrast ratios (documented in variables.css)
- Keyboard accessible controls

## Customization Examples

### Example 1: Red/Orange Theme

```typescript
updateTheme({
  colors: {
    primaryA: 0.25,
    primaryB: 0.2,    // More red/orange
    secondaryA: 0.1,
    secondaryB: 0.15,
  },
});
```

### Example 2: Larger, More Rounded UI

```typescript
updateTheme({
  typography: {
    baseFontSize: 18,  // Larger text
    baseLineHeight: 1.6,
  },
  borderRadius: {
    base: 1.5,  // 50% more rounded
  },
});
```

### Example 3: Compact UI

```typescript
updateTheme({
  typography: {
    baseFontSize: 14,  // Smaller text
    baseLineHeight: 1.4,
  },
  borderRadius: {
    base: 0.5,  // Less rounded
  },
});
```

## Best Practices

1. **Use the ThemeProvider**: Always wrap your app with ThemeProvider to ensure theme context is available
2. **Avoid Hardcoded Colors**: Use CSS variables instead of hardcoded colors
3. **Test Theme Changes**: Test your components with different theme configurations
4. **Respect User Preferences**: Consider using `prefers-color-scheme` for dark mode
5. **Document Custom Values**: If you set custom theme values programmatically, document why

## Limitations

- OkLab color space requires modern browsers (2022+)
- localStorage may not be available in private browsing mode
- Some older browsers may need polyfills for CSS custom properties

## Future Enhancements

Potential improvements for future versions:

- Dark mode toggle
- Preset theme templates
- Import/export theme configurations
- More granular controls (individual spacing values)
- Animation duration controls
- Shadow customization
