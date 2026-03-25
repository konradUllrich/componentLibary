import React from "react";
import { useStore } from "zustand";
import { createFilterStore, useRouterSync } from "../../stores";
import { useSearch } from "../../Router/hooks";
import { Button } from "../../common";

type SyncFilters = { q: string; category: string };

const syncFilterStore = createFilterStore<SyncFilters>({ q: "", category: "" });

const CATEGORIES = ["all", "books", "movies", "music"] as const;

const RouterSyncInner: React.FC = () => {
  useRouterSync(syncFilterStore, {
    serialize: (s) => ({
      q: s.filters.q ?? "",
      cat: s.filters.category ?? "",
    }),
    deserialize: (p) => ({
      filters: {
        q: p.get("q") ?? "",
        category: p.get("cat") ?? "",
      },
    }),
  });

  const { filters, setFilter, clearFilters } = useStore(syncFilterStore);
  const search = useSearch();
  const params = new URLSearchParams(search);
  const relevantParams = ["q", "cat"]
    .map((k) => (params.get(k) ? `${k}=${params.get(k)}` : ""))
    .filter(Boolean)
    .join(", ");

  return (
    <div className="component-page__demo-column">
      <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search (q=…)"
          value={filters.q ?? ""}
          onChange={(e) => setFilter("q", e.target.value)}
          aria-label="Search query"
          style={{
            padding: "var(--spacing-1) var(--spacing-3)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-size-sm)",
            background: "var(--color-background)",
            color: "var(--color-foreground)",
          }}
        />
        {CATEGORIES.map((cat) => {
          const isActive = cat === "all" ? !filters.category : filters.category === cat;
          return (
            <Button
              key={cat}
              variant={isActive ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter("category", cat === "all" ? "" : cat)}
            >
              {cat}
            </Button>
          );
        })}
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear
        </Button>
      </div>
      <p style={{ fontSize: "var(--font-size-sm)" }}>
        <strong>URL params: </strong>
        <code>{relevantParams || "(none)"}</code>
      </p>
    </div>
  );
};

RouterSyncInner.displayName = "RouterSyncInner";

export const StoresPageRouterSyncDemo: React.FC = () => <RouterSyncInner />;

StoresPageRouterSyncDemo.displayName = "StoresPageRouterSyncDemo";
