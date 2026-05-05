import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPosts } from "../src/content.mjs";
import { renderUrl, routesForPosts } from "../src/render.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(siteRoot, "dist");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(
  path.join(siteRoot, "design-system", "styles"),
  path.join(outDir, "design-system", "styles"),
  { recursive: true }
);
await copyFixtureAssets();

const posts = await getPosts();
const routes = routesForPosts(posts);

for (const route of routes) {
  const html = await renderUrl(route);
  const outputPath = route === "/"
    ? path.join(outDir, "index.html")
    : path.join(outDir, route, "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log(`Built ${routes.length} routes to ${outDir}`);

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
