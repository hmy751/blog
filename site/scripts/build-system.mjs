import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSystemUrl } from "../src/render.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(siteRoot, "system-dist");
const routes = ["/system/", "/system/example-article/"];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(
  path.join(siteRoot, "design-system", "styles"),
  path.join(outDir, "design-system", "styles"),
  { recursive: true }
);
await copyFixtureAssets();
await writeRedirectIndex();

for (const route of routes) {
  const html = await renderSystemUrl(route);
  const outputPath = path.join(outDir, route, "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Built ${routes.length} system preview routes to ${outDir}`);

async function writeRedirectIndex() {
  await writeFile(
    path.join(outDir, "index.html"),
    '<!doctype html><meta http-equiv="refresh" content="0; url=/system/"><a href="/system/">System preview</a>'
  );
}

async function copyFixtureAssets() {
  const sourceDir = path.join(siteRoot, "design-system", "fixtures");
  const targetDir = path.join(outDir, "design-system", "fixtures");
  const staticExtensions = new Set([".avif", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"]);

  await mkdir(targetDir, { recursive: true });

  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    if (!entry.isFile() || !staticExtensions.has(path.extname(entry.name))) {
      continue;
    }

    await cp(path.join(sourceDir, entry.name), path.join(targetDir, entry.name));
  }
}
