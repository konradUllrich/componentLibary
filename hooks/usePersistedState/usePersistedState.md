# usePersistedState Hook

A React hook that manages state while automatically persisting it to both the browser's URL search params and localStorage. Perfect for application settings, filters, preferences, and any state you want to survive page reloads and be shareable via URL.

## Features

- 🔗 **URL Synchronization** – State reflected in URL search parameters for shareable state
- 💾 **localStorage Persistence** – State persists across browser sessions
- ⚙️ **Dual Fallback** – URL param → localStorage → default value priority
- 🎯 **Smart Cleanup** – Automatically removes URL params when value equals default
- 🔄 **Custom Serialization** – Support for custom serialize/deserialize functions
- 🛡️ **SSR Safe** – Works safely in server-side rendering environments
- 📝 **TypeScript Ready** – Full type safety and inference

## Installation

The hook is part of the mpComponents library:

```typescript
import { usePersistedState } from "@mp-ku/mp-components/hooks";
```

## Basic Usage

### Simple String State

The simplest use case – persist a string value:

```typescript
import { usePersistedState } from '@mp-ku/mp-components/hooks';

function SearchPage() {
  const [query, setQuery] = usePersistedState({
    key: 'search-query',
    defaultValue: '',
  });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {/* URL becomes: ?search-query=hello */}
    </div>
  );
}
```

### Number State

```typescript
function Pagination() {
  const [page, setPage] = usePersistedState({
    key: 'page',
    defaultValue: 1,
  });

  return (
    <div>
      <button onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span>Page {page}</span>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
      {/* URL becomes: ?page=3 */}
    </div>
  );
}
```

### Object State

```typescript
import { usePersistedState } from '@mp-ku/mp-components/hooks';

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
}

function Products() {
  const [filters, setFilters] = usePersistedState<FilterState>({
    key: 'product-filters',
    defaultValue: {
      category: 'all',
      minPrice: 0,
      maxPrice: 1000,
      inStock: false,
    },
  });

  return (
    <div>
      <select
        value={filters.category}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        <option>all</option>
        <option>electronics</option>
        <option>clothing</option>
      </select>

      <input
        type="number"
        value={filters.minPrice}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            minPrice: parseInt(e.target.value, 10),
          }))
        }
      />

      {/* URL becomes: ?product-filters=%7B%22category%22:%22electronics%22...%7D */}
    </div>
  );
}
```

## Advanced Examples

### Custom Serialization

Use custom serialization for non-standard types (Date, Set, Map, etc.):

```typescript
function DateRangeFilter() {
  const [dateRange, setDateRange] = usePersistedState<{
    start: Date;
    end: Date;
  }>({
    key: 'date-range',
    defaultValue: {
      start: new Date('2024-01-01'),
      end: new Date(),
    },
    serialize: (value) => {
      // Store dates as ISO strings
      return JSON.stringify({
        start: value.start.toISOString(),
        end: value.end.toISOString(),
      });
    },
    deserialize: (str) => {
      const data = JSON.parse(str);
      return {
        start: new Date(data.start),
        end: new Date(data.end),
      };
    },
  });

  return (
    <div>
      <label>
        Start:
        <input
          type="date"
          value={dateRange.start.toISOString().split('T')[0]}
          onChange={(e) =>
            setDateRange((prev) => ({
              ...prev,
              start: new Date(e.target.value),
            }))
          }
        />
      </label>
      {/* URL: ?date-range=%7B%22start%22:%222024-01-01T00:00:00.000Z%22...%7D */}
    </div>
  );
}
```

### Enum-based State

```typescript
type ViewMode = 'list' | 'grid' | 'compact';

function DataDisplay() {
  const [viewMode, setViewMode] = usePersistedState<ViewMode>({
    key: 'view-mode',
    defaultValue: 'list',
  });

  return (
    <div>
      <div>
        <button onClick={() => setViewMode('list')}>List</button>
        <button onClick={() => setViewMode('grid')}>Grid</button>
        <button onClick={() => setViewMode('compact')}>Compact</button>
      </div>

      {/* Render based on viewMode */}
      {viewMode === 'list' && <ListView />}
      {viewMode === 'grid' && <GridView />}
      {viewMode === 'compact' && <CompactView />}
      {/* URL: ?view-mode=grid */}
    </div>
  );
}
```

### Compressed Custom Format

For URL-length-sensitive applications:

```typescript
interface CoordsState {
  x: number;
  y: number;
  zoom: number;
}

function MapComponent() {
  const [coords, setCoords] = usePersistedState<CoordsState>({
    key: 'map-coords',
    defaultValue: { x: 0, y: 0, zoom: 1 },
    serialize: (value) => {
      // Store as comma-separated values: "x,y,zoom"
      return `${value.x.toFixed(2)},${value.y.toFixed(2)},${value.zoom.toFixed(2)}`;
    },
    deserialize: (str) => {
      const [x, y, zoom] = str.split(',').map(Number);
      return { x, y, zoom };
    },
  });

  return (
    <iframe
      style={{
        transform: `translate(${coords.x}px, ${coords.y}px) scale(${coords.zoom})`,
      }}
    />
    // URL: ?map-coords=10.50,20.75,2.00
  );
}
```

### Updater Function

Use the functional form to compute new state based on previous value:

```typescript
function ShoppingCart() {
  const [items, setItems] = usePersistedState<CartItem[]>({
    key: 'cart',
    defaultValue: [],
  });

  const addItem = (item: CartItem) => {
    // Add or increment quantity
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems(() => []);
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
```

### Keep URLs Clean with removeIfDefault

By default, URL params are removed when the value equals the default, keeping URLs clean:

```typescript
function SortableTable() {
  const [sortBy, setSortBy] = usePersistedState({
    key: 'sort',
    defaultValue: 'name', // default is 'name'
    removeIfDefault: true, // remove 'sort' param if value === 'name'
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => setSortBy('name')}>Name</th>
          <th onClick={() => setSortBy('date')}>Date</th>
          <th onClick={() => setSortBy('score')}>Score</th>
        </tr>
      </thead>
      {/* URL: "/" when sort='name' */}
      {/* URL: "/?sort=date" when sort='date' */}
      {/* URL: "/?sort=score" when sort='score' */}
    </table>
  );
}
```

Disable if you want to always keep the param visible:

```typescript
function AlwaysShowState() {
  const [status, setStatus] = usePersistedState({
    key: "status",
    defaultValue: "pending",
    removeIfDefault: false, // always show in URL
  });

  // URL always includes: ?status=pending (even when default)
}
```

### Multiple Independent Keys

Each hook instance manages its own key independently:

```typescript
function ApplicationSettings() {
  const [theme, setTheme] = usePersistedState({
    key: 'theme',
    defaultValue: 'light',
  });

  const [fontSize, setFontSize] = usePersistedState({
    key: 'font-size',
    defaultValue: 16,
  });

  const [language, setLanguage] = usePersistedState({
    key: 'lang',
    defaultValue: 'en',
  });

  return (
    <div style={{ fontSize }}>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option>light</option>
        <option>dark</option>
      </select>

      <input
        type="range"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
      />

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>

      {/* URL: ?theme=dark&font-size=18&lang=es */}
    </div>
  );
}
```

### Handling Errors Gracefully

The hook automatically falls back to the default value if deserialization fails:

```typescript
function ErrorResilient() {
  // If localStorage has corrupted data or URL param is invalid,
  // the hook will log a warning and use the default value
  const [setting, setSetting] = usePersistedState({
    key: "setting",
    defaultValue: "safe-default",
  });

  // Console might show:
  // Warning: Failed to deserialize localStorage item "setting": SyntaxError...
  // But the component will still render with 'safe-default'
}
```

## API Reference

### Hook Signature

```typescript
function usePersistedState<T>(
  options: Options<T>,
): [T, (value: T | ((prev: T) => T)) => void];
```

### Options

| Option            | Type                   | Required | Default          | Description                                                    |
| ----------------- | ---------------------- | -------- | ---------------- | -------------------------------------------------------------- |
| `key`             | `string`               | ✅ Yes   | —                | Unique identifier for both URL param and localStorage key      |
| `defaultValue`    | `T`                    | ✅ Yes   | —                | Value used when neither URL param nor localStorage has a value |
| `serialize`       | `(value: T) => string` | No       | `JSON.stringify` | Custom serialization function                                  |
| `deserialize`     | `(value: string) => T` | No       | `JSON.parse`     | Custom deserialization function                                |
| `removeIfDefault` | `boolean`              | No       | `true`           | Remove URL param when value equals default                     |

### Return Value

A tuple `[state, setState]` similar to `useState`:

- **state** (`T`) – Current persisted state value
- **setState** – Update function that accepts either a new value or an updater function

```typescript
// Direct update
setState("new-value");

// Updater function
setState((prev) => ({
  ...prev,
  property: "updated",
}));
```

## Priority and Fallback Order

When the hook initializes, it checks values in this order:

1. **URL Search Param** – `?key=value` if present and valid
2. **localStorage** – Stored value if URL param not found
3. **Default Value** – `defaultValue` option as last resort

```typescript
// Example with all three sources
const [value, setValue] = usePersistedState({
  key: "my-setting",
  defaultValue: "default", // 3. Used if neither URL nor localStorage has value
});

// When component loads:
// If URL has ?my-setting=from-url → uses "from-url" (priority 1)
// Else if localStorage has value → uses that (priority 2)
// Else → uses "default" (priority 3)
```

## Common Patterns

### Form with Reset

```typescript
function SettingsForm() {
  const [email, setEmail] = usePersistedState({
    key: 'user-email',
    defaultValue: '',
  });

  const [notifications, setNotifications] = usePersistedState({
    key: 'notifications-enabled',
    defaultValue: true,
  });

  const resetToDefaults = () => {
    setEmail('');
    setNotifications(true);
  };

  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <label>
        <input
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          type="checkbox"
        />
        Enable notifications
      </label>
      <button type="button" onClick={resetToDefaults}>
        Reset to Defaults
      </button>
    </form>
  );
}
```

### Shareable Filter Link

```typescript
function DatasetExplorer() {
  const [filters, setFilters] = usePersistedState({
    key: 'filters',
    defaultValue: { category: 'all', minScore: 0 },
  });

  const shareableUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

  return (
    <div>
      {/* User can modify filters */}
      <FilterUI value={filters} onChange={setFilters} />

      {/* Share this URL with coworkers – they get the same filtered view */}
      <input readOnly value={shareableUrl} />
      <button onClick={() => navigator.clipboard.writeText(shareableUrl)}>
        Copy Link
      </button>
    </div>
  );
}
```

### Combined Local & Global State

```typescript
function Dashboard() {
  // Global settings (persisted + shareable)
  const [dateRange, setDateRange] = usePersistedState({
    key: 'date-range',
    defaultValue: { start: '2024-01-01', end: '2024-12-31' },
  });

  // Local UI state (not persisted)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data when persisted dateRange changes
    setIsLoading(true);
    fetchData(dateRange)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [dateRange]);

  return (
    <div>
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <DataDisplay data={data} />}
    </div>
  );
}
```

## TypeScript

The hook is fully typed and works with TypeScript's type inference:

```typescript
import { usePersistedState } from "@mp-ku/mp-components/hooks";

interface User {
  id: string;
  name: string;
  email: string;
}

function UserProfile() {
  // Type is inferred as `User`
  const [user, setUser] = usePersistedState({
    key: "selected-user",
    defaultValue: { id: "1", name: "John", email: "john@example.com" },
  });

  // Type narrowing works correctly
  user.name; // ✅ string
  user.nonExistent; // ❌ TypeScript error

  // Update with type safety
  setUser({
    id: "2",
    name: "Jane",
    email: "jane@example.com",
  }); // ✅ OK

  setUser({
    id: "3",
    name: "Bob",
    // email: 'missing', // ❌ TypeScript error
  });

  return null;
}
```

Explicit type annotation for complex types:

```typescript
type SortOrder = "asc" | "desc";

interface TableState {
  sortBy: string;
  sortOrder: SortOrder;
  page: number;
  perPage: number;
}

const [tableState, setTableState] = usePersistedState<TableState>({
  key: "table-config",
  defaultValue: {
    sortBy: "name",
    sortOrder: "asc",
    page: 1,
    perPage: 50,
  },
});
```

## Performance Considerations

### Selective Writing

State only persists when it changes:

```typescript
function OptimizedComponent() {
  const [config, setConfig] = usePersistedState({
    key: "config",
    defaultValue: { theme: "light", size: "md" },
  });

  // Only writes to storage/URL when value actually changes
  const updateTheme = (newTheme: string) => {
    if (newTheme === config.theme) {
      return; // Don't call setConfig if unchanged
    }
    setConfig((prev) => ({ ...prev, theme: newTheme }));
  };
}
```

### Avoid Large Objects

While the hook supports any JSON-serializable data, consider URL length limitations:

```typescript
// ❌ Avoiding large nested objects
const [largeData, setLargeData] = usePersistedState({
  key: "data",
  defaultValue: hugeArrayOfObjects, // URL might become too long
});

// ✅ Better: store only essential filter state
const [filters, setFilters] = usePersistedState({
  key: "filters",
  defaultValue: { search: "", categoryId: null }, // Small, URL-friendly
});
```

## Browser Compatibility

- Modern browsers with `URLSearchParams` support
- localStorage available (falls back gracefully if disabled)
- SSR-safe (checks for `window` before accessing APIs)

## Testing

The hook can be tested with mock localStorage and URL params:

```typescript
import { renderHook, act } from "@testing-library/react";
import { usePersistedState } from "@mp-ku/mp-components/hooks";

test("should persist state to localStorage", () => {
  const { result } = renderHook(() =>
    usePersistedState({ key: "test", defaultValue: "initial" }),
  );

  act(() => {
    result.current[1]("updated");
  });

  expect(localStorage.getItem("test")).toBe('"updated"');
  expect(result.current[0]).toBe("updated");
});
```

## Troubleshooting

### State Not Persisting

1. Check browser's localStorage is not disabled
2. Verify no `removeIfDefault: false` or your value equals default
3. Check browser console for deserialization errors

### URL Params Not Updating

1. Ensure you're inside a Router context (wouter)
2. Check that `removeIfDefault: true` (default) isn't removing your param
3. Verify serialization function doesn't throw errors

### Updating from URL

The hook automatically syncs from URL changes:

```typescript
// User changes URL directly or via browser history
// Component will re-render with new value from URL param
```

---

## See Also

- [Hook Tests](./usePersistedState.test.tsx) – Comprehensive test examples
- [Wouter Documentation](https://github.com/molefrog/wouter) – URL routing details
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) – localStorage reference
