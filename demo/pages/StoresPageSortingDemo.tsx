import React from "react";
import { useStore } from "zustand";
import { createSortingStore } from "../../stores";
import type { SortEntry } from "../../stores";
import { Button } from "../../common";

const sortStore = createSortingStore({ initialSort: [{ key: "name", direction: "asc" }] });

const ROWS = [
  { name: "Charlie", role: "Admin", age: 34 },
  { name: "Alice", role: "User", age: 28 },
  { name: "Bob", role: "Editor", age: 42 },
];

const COLS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "age", label: "Age" },
] as const;

function sortArrow(key: string, cols: SortEntry[]): string {
  const col = cols.find((c) => c.key === key);
  if (!col) return "";
  return col.direction === "asc" ? " ↑" : " ↓";
}

function ariaSortValue(key: string, cols: SortEntry[]): "ascending" | "descending" | "none" {
  const col = cols.find((c) => c.key === key);
  if (col?.direction === "asc") return "ascending";
  if (col?.direction === "desc") return "descending";
  return "none";
}

export const StoresPageSortingDemo: React.FC = () => {
  const { sortColumns, toggleSort, clearSort } = useStore(sortStore);

  const sorted = [...ROWS].sort((a, b) => {
    for (const col of sortColumns) {
      const av = a[col.key as keyof typeof a];
      const bv = b[col.key as keyof typeof b];
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      if (cmp !== 0) return col.direction === "asc" ? cmp : -cmp;
    }
    return 0;
  });

  return (
    <div className="component-page__demo-column">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {COLS.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                aria-sort={ariaSortValue(col.key, sortColumns)}
                style={{ textAlign: "left", padding: "var(--spacing-2)", cursor: "pointer", borderBottom: "2px solid var(--color-border)", userSelect: "none" }}
              >
                {col.label}{sortArrow(col.key, sortColumns)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.name}>
              <td style={{ padding: "var(--spacing-2)", borderBottom: "1px solid var(--color-border-light)" }}>{row.name}</td>
              <td style={{ padding: "var(--spacing-2)", borderBottom: "1px solid var(--color-border-light)" }}>{row.role}</td>
              <td style={{ padding: "var(--spacing-2)", borderBottom: "1px solid var(--color-border-light)" }}>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button variant="ghost" size="sm" onClick={clearSort}>
          Clear sort
        </Button>
      </div>
    </div>
  );
};

StoresPageSortingDemo.displayName = "StoresPageSortingDemo";
