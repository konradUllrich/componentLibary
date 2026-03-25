import React from "react";
import { useStore } from "zustand";
import { createFilterStore } from "../../stores";
import { Button } from "../../common";

type DemoFilters = { search: string; status: "all" | "active" | "inactive" };

const filterStore = createFilterStore<DemoFilters>({ search: "", status: "all" });

const ITEMS = [
  { name: "Alice", status: "active" as const },
  { name: "Bob", status: "inactive" as const },
  { name: "Charlie", status: "active" as const },
  { name: "Diana", status: "inactive" as const },
  { name: "Eve", status: "active" as const },
];

const STATUSES = ["all", "active", "inactive"] as const;

export const StoresPageFilterDemo: React.FC = () => {
  const { filters, setFilter, clearFilters } = useStore(filterStore);
  const search = filters.search ?? "";
  const status = filters.status ?? "all";

  const visible = ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (status === "all" || item.status === status),
  );

  return (
    <div className="component-page__demo-column">
      <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setFilter("search", e.target.value)}
          aria-label="Search items"
          style={{
            padding: "var(--spacing-1) var(--spacing-3)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-size-sm)",
            background: "var(--color-background)",
            color: "var(--color-foreground)",
          }}
        />
        {STATUSES.map((s) => (
          <Button key={s} variant={status === s ? "primary" : "secondary"} size="sm" onClick={() => setFilter("status", s)}>
            {s}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear
        </Button>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--spacing-1)" }}>
        {visible.length === 0 ? (
          <li style={{ color: "var(--color-foreground-secondary)" }}>No results</li>
        ) : (
          visible.map((item) => (
            <li key={item.name}>
              {item.name}{" "}
              <span style={{ color: "var(--color-foreground-secondary)", fontSize: "var(--font-size-sm)" }}>
                ({item.status})
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

StoresPageFilterDemo.displayName = "StoresPageFilterDemo";
