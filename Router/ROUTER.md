# Router

The `Router` is a param-based application router built on top of [wouter](https://github.com/molefrog/wouter).

Instead of controlling the browser's URL path, it stores the active route inside the **`appRoute` URL search parameter** (e.g. `https://host.example.com/app?appRoute=/items`). This makes it safe to embed in contexts where the host page already owns the path — iframes, GitHub Pages, CMS portals, etc.

---

## Table of contents

- [Quick start](#quick-start)
- [How `appRouteLocation` works](#how-approutelocation-works)
- [URL param recovery](#url-param-recovery)
  - [Within a session](#within-a-session)
  - [Across browser sessions (localStorage)](#across-browser-sessions-localstorage)
- [API reference](#api-reference)
  - [`<Router>`](#router)
  - [`<Route>` / `<Switch>`](#route--switch)
  - [`<Link>`](#link)
  - [`createRoute()`](#createroute)
  - [`useLocation()`](#uselocation)
  - [`useSearchParams()`](#usesearchparams)
  - [`useParamState()`](#useparamstate)
  - [`useNavigation()`](#usenavigation)
- [Multiple routers on one page](#multiple-routers-on-one-page)

---

## Quick start

```tsx
import { Router, Route, Link } from "@mp-ku/mp-components";

function App() {
  return (
    <Router>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/items">Items</Link>
      </nav>

      <Route path="/">Home page</Route>
      <Route path="/items">Items page</Route>
    </Router>
  );
}
```

The host-page URL stays clean — only the `appRoute` param changes:

```
# before navigation
https://host.example.com/app

# after clicking /items
https://host.example.com/app?appRoute=/items

# with search params on the route
https://host.example.com/app?appRoute=/items%3Fpage%3D2%26pageSize%3D25
```

---

## How `appRouteLocation` works

`appRouteLocation.ts` provides two custom wouter hooks that replace wouter's default history-based location:

| Hook                  | Purpose                                                                |
| --------------------- | ---------------------------------------------------------------------- |
| `useAppRouteLocation` | Reads/writes the active route path from the `appRoute` query parameter |
| `useAppRouteSearch`   | Reads the search params embedded inside the `appRoute` value           |

Both hooks subscribe to the browser's `popstate` event, so the browser back/forward buttons work exactly as expected.

### The `appRoute` encoding

The router encodes the full in-app URL (path + search) as a single `appRoute` value:

```
appRoute=/items?page=2&pageSize=25
```

- The **path** is everything before the first `?` → `/items`
- The **search params** are everything after → `page=2&pageSize=25`

When `setAppRoute` is called it updates the host-page URL via `history.pushState` (or `replaceState`) and fires a synthetic `popstate` event to notify all subscribers.

---

## URL param recovery

Route search params (filters, pagination, sort order, etc.) are automatically saved and restored during navigation. This happens at two layers.

### Within a session

`useStoreUrlSync` (the internal hook used by `useFilter` and `usePagination`) writes the current route's serialised state to **`sessionStorage`** every time the store changes:

```
key:   mp-route:/items
value: page=2&pageSize=25&sort=name
```

When `useLocation().navigate` or `<Link>` is used to go to a route, `buildDestinationWithState` checks storage before handing the destination to wouter. If stored params exist and the destination has no explicit search params, they are appended automatically:

```
navigate("/items")  →  wouter sees  "/items?page=2&pageSize=25&sort=name"
navigate("/items?page=1")  →  explicit params win, wouter sees  "/items?page=1"
```

This means the user lands back exactly where they were after clicking away and returning.

### Across browser sessions (localStorage)

`sessionStorage` is cleared when the tab closes. To persist params across browser sessions, write the same key to **`localStorage`**:

```ts
localStorage.setItem("mp-route:/items", "page=2&pageSize=25");
```

`buildDestinationWithState` checks `sessionStorage` first, then falls back to `localStorage` — so a fresh-session navigation to `/items` will still restore the last-known params.

The key format is always:

```
${routeStatePrefix}:${routePath}
```

`routeStatePrefix` defaults to `"mp-route"` and can be overridden per `<Router>` instance (see [Multiple routers](#multiple-routers-on-one-page)).

---

## API reference

### `<Router>`

Top-level provider. Wraps wouter's `Router` with the `appRoute` location hook and exposes the router config context.

```tsx
<Router routeStatePrefix="my-app">{children}</Router>
```

| Prop               | Type     | Default      | Description                                                                               |
| ------------------ | -------- | ------------ | ----------------------------------------------------------------------------------------- |
| `routeStatePrefix` | `string` | `"mp-route"` | Namespace prefix for storage keys. Use a unique value when multiple routers share a page. |

---

### `<Route>` / `<Switch>`

Re-exported directly from wouter — no changes.

```tsx
<Switch>
  <Route path="/">Home</Route>
  <Route path="/items">Items</Route>
  <Route>404 – not found</Route>
</Switch>
```

---

### `<Link>`

Styled anchor that intercepts clicks and calls `useLocation().navigate`, which triggers param recovery before handing off to wouter.

```tsx
<Link href="/items">Items</Link>
<Link href="/items" variant="subtle">Items</Link>
<Link href="/signup" variant="button" size="lg">Sign up</Link>
<Link href="https://example.com" isExternal>External</Link>
```

| Prop          | Type                                | Default     | Description                                       |
| ------------- | ----------------------------------- | ----------- | ------------------------------------------------- |
| `href` / `to` | `string`                            | —           | Navigation destination                            |
| `variant`     | `"default" \| "subtle" \| "button"` | `"default"` | Visual style                                      |
| `size`        | `"sm" \| "md" \| "lg"`              | `"md"`      | Size — meaningful only when `variant="button"`    |
| `isExternal`  | `boolean`                           | `false`     | Opens in new tab with `rel="noopener noreferrer"` |

---

### `createRoute()`

Type-safe route factory. Gives you typed helpers for building URLs, reading params, and reading/setting search params.

```ts
export const itemsRoute = createRoute<
  Record<string, never>, // path params (none here)
  { page?: number; sort?: string } // search params
>({ path: "/items" });

// build a URL
itemsRoute.build({}, { page: 2, sort: "name" }); // → "/items?page=2&sort=name"

// inside a component on this route:
const { page, sort } = itemsRoute.useSearch();
const setSearch = itemsRoute.useSetSearch();
setSearch({ page: 3 });

// with path params:
export const userRoute = createRoute<{ id: string }>({ path: "/users/:id" });
const { id } = userRoute.useParams();
```

---

### `useLocation()`

Returns `[currentPath, navigate]`. The `navigate` function automatically restores stored search params before navigating (see [URL param recovery](#url-param-recovery)).

```ts
const [path, navigate] = useLocation();

navigate("/items"); // restores stored params
navigate("/items?page=1"); // explicit params — storage is ignored
navigate("/items", { replace: true });
```

---

### `useSearchParams()`

Re-exported from wouter. Read and write the search params of the **current route**.

```ts
const [searchParams, setSearchParams] = useSearchParams();

const page = new URLSearchParams(searchParams).get("page");

setSearchParams((prev) => {
  prev.set("page", "3");
  return prev;
});
```

---

### `useParamState()`

Convenience hook for a single typed search param with a default value.

```ts
const [page, setPage] = useParamState<number>("page", 1);
```

---

### `useNavigation()`

Returns `{ navigate, back }` for imperative navigation without needing the full `useLocation` tuple.

```ts
const { navigate, back } = useNavigation();

navigate("/items");
back(); // window.history.back()
```

---

## Multiple routers on one page

Each `<Router>` uses its own storage namespace so their saved states never collide:

```tsx
<Router routeStatePrefix="sidebar-nav">
  <Route path="/">…</Route>
</Router>

<Router routeStatePrefix="modal-nav">
  <Route path="/">…</Route>
</Router>
```

Storage keys will be `sidebar-nav:/path` and `modal-nav:/path` respectively.
