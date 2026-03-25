import React from "react";
import { useStore } from "zustand";
import { createValueStore } from "../../stores";
import { Button } from "../../common";

type Theme = "light" | "dark" | "system";

const themeStore = createValueStore<Theme>("system");

const THEMES: Theme[] = ["light", "dark", "system"];

export const StoresPageValueDemo: React.FC = () => {
  const { value: theme, setValue, reset } = useStore(themeStore);

  return (
    <div className="component-page__demo-column">
      <p>
        Current value: <strong>{theme}</strong>
      </p>
      <div style={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
        {THEMES.map((t) => (
          <Button
            key={t}
            variant={theme === t ? "primary" : "secondary"}
            size="sm"
            onClick={() => setValue(t)}
          >
            {t}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={reset}>
          Reset
        </Button>
      </div>
      <p style={{ color: "var(--color-foreground-secondary)", fontSize: "var(--font-size-sm)" }}>
        Click any theme to update the store. &ldquo;Reset&rdquo; restores the initial value{" "}
        <code>system</code>.
      </p>
    </div>
  );
};

StoresPageValueDemo.displayName = "StoresPageValueDemo";
