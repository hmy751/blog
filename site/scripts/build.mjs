import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPosts } from "../src/content.mjs";
import { renderUrl, routesForPosts } from "../src/render.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(siteRoot, "dist");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

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
