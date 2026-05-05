import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderSystemUrl } from "../src/render.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const host = valueAfter("--host") || process.env.HOST || "127.0.0.1";
const port = Number(valueAfter("--port") || process.env.PORT || 4322);
const systemRoutes = new Set(["/system/", "/system/example-article/"]);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (url.pathname === "/") {
      response.writeHead(302, { location: "/system/" });
      response.end();
      return;
    }

    if (
      url.pathname.startsWith("/design-system/styles/") ||
      url.pathname.startsWith("/design-system/fixtures/")
    ) {
      await serveFile(path.join(siteRoot, url.pathname), response);
      return;
    }

    if (!systemRoutes.has(normalizePath(url.pathname))) {
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      response.end("<h1>System preview only</h1>");
      return;
    }

    const html = await renderSystemUrl(url.pathname);
    if (!html) {
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      response.end("<h1>404</h1>");
      return;
    }

    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    });
    response.end(html);
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error.stack || String(error));
  }
});

server.listen(port, host, () => {
  console.log("custom-blog-site system preview");
  console.log(`http://${host}:${port}/system/`);
  console.log(`http://${host}:${port}/system/example-article/`);
});

async function serveFile(filePath, response) {
  const fileStat = await stat(filePath);
  if (!fileStat.isFile()) {
    response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200, {
    "content-type": contentType(filePath),
    "cache-control": "no-store"
  });
  createReadStream(filePath).pipe(response);
}

function contentType(filePath) {
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
}
