import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: [
        "index.ts",
        "common",
        "controls",
        "data-display",
        "layout",
        "intrexx",
        "Router",
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
      formats: ["es", "umd"],
      fileName: (format) => `index.${format === "es" ? "js" : "umd.js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
