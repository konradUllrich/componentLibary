#!/usr/bin/env node
/**
 * Generates dist/component-manifest.json — a machine-readable catalog of every
 * exported component (name, props, types, defaults, JSDoc descriptions),
 * derived straight from source via react-docgen-typescript. Ships inside the
 * published npm package (dist/ is in package.json's "files") so an agent
 * working from node_modules has structured prop info without a live URL.
 *
 * Runs after `vite build` (see the "build" script in package.json) so it
 * can't drift from source — regenerated on every build/publish, never
 * hand-edited.
 */
import { globSync } from "node:fs";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { withCustomConfig } from "react-docgen-typescript";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

const componentFiles = globSync(
  ["common", "controls", "data-display", "layout", "intrexx"].map(
    (dir) => `${dir}/**/*.tsx`,
  ),
  { cwd: rootDir, exclude: (path) => /\.test\.tsx$|Stories\.tsx$|Fixture\.tsx$/.test(path) },
).map((path) => resolve(rootDir, path));

const parser = withCustomConfig(resolve(rootDir, "tsconfig.json"), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => prop.parent == null || !/node_modules/.test(prop.parent.fileName),
});

const docs = parser.parse(componentFiles);

const manifest = docs
  .filter((doc) => Object.keys(doc.props).length > 0)
  .map((doc) => ({
    name: doc.displayName,
    description: doc.description || undefined,
    props: Object.fromEntries(
      Object.entries(doc.props).map(([propName, prop]) => [
        propName,
        {
          type: prop.type?.name,
          required: prop.required,
          default: prop.defaultValue?.value,
          description: prop.description || undefined,
        },
      ]),
    ),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const outDir = resolve(rootDir, "dist");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, "component-manifest.json");
writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");

console.log(`Generated ${outFile} (${manifest.length} components)`);
