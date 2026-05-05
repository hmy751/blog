import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(siteRoot, "out");
const host = valueAfter("--host") || process.env.HOST || "127.0.0.1";
const port = Number(valueAfter("--port") || process.env.PORT || 4173);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    const target = await resolveOutputPath(url.pathname);

    if (!target) {
      await serveNotFound(response);
      return;
    }

    await serveFile(target, response, 200);
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error.stack || String(error));
  }
});

server.listen(port, host, () => {
  console.log("custom-blog-site static preview");
  console.log(`http://${host}:${port}/`);
});

async function resolveOutputPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = safePath.replace(/^[/\\]/, "");
  const directPath = path.join(outDir, relativePath);
  const candidates = [];

  if (pathname === "/") {
    candidates.push(path.join(outDir, "index.html"));
  } else {
    candidates.push(directPath);
    candidates.push(path.join(directPath, "index.html"));
  }

  for (const candidate of candidates) {
    if (!candidate.startsWith(outDir)) continue;
    if (await isFile(candidate)) return candidate;
  }

  return undefined;
}

async function serveNotFound(response) {
  const notFoundPath = path.join(outDir, "404", "index.html");

  if (await isFile(notFoundPath)) {
    await serveFile(notFoundPath, response, 404);
    return;
  }

  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("Not found");
}

async function serveFile(filePath, response, statusCode) {
  const fileStat = await stat(filePath);

  response.writeHead(statusCode, {
    "content-type": contentType(filePath),
    "content-length": fileStat.size,
    "cache-control": "no-store"
  });
  createReadStream(filePath).pipe(response);
}

async function isFile(filePath) {
  try {
    await access(filePath);
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
}

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
}
