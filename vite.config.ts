import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: [
        "vite-env.d.ts",
        "index.ts",
        "common",
        "controls",
        "data-display",
        "layout",
        "utils",
        "intrexx",
        "Router",
        "hooks",
      ],
      exclude: [
        "**/*.test.tsx",
        "**/*.test.ts",
        "**/*.stories.tsx",
        "demo",
        "e2e",
        "playwright",
      ],
      tsconfigPath: "./tsconfig.json",
      rollupTypes: true,
    }),
  ],
  build: {
    // Avoid removing dist between rebuilds so consumers don't 404 mid-watch.
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "mpComponents",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      // Peer deps (see package.json `peerDependencies`) must stay external so
      // consumers get a single shared instance instead of a bundled duplicate.
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@dnd-kit/abstract",
        "@dnd-kit/dom",
        "@dnd-kit/helpers",
        "@dnd-kit/react",
        "@radix-ui/react-accordion",
        "@radix-ui/react-collapsible",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-navigation-menu",
        "@radix-ui/react-popover",
        "@radix-ui/react-select",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toggle",
        "@radix-ui/react-toggle-group",
        "@radix-ui/react-tooltip",
        "@tanstack/react-form",
        "@tanstack/react-query",
        "@tanstack/react-table",
        "wouter",
        "zustand",
      ],
    },
  },
});
