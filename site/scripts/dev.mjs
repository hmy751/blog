import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderUrl } from "../src/render.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const host = valueAfter("--host") || process.env.HOST || "127.0.0.1";
const port = Number(valueAfter("--port") || process.env.PORT || 4321);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (url.pathname.startsWith("/archive/design-system/styles/")) {
      await serveFile(path.join(siteRoot, url.pathname), response);
      return;
    }

    const html = await renderUrl(url.pathname);
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
  console.log(`custom-blog-site dev server`);
  console.log(`http://${host}:${port}/`);
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

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
}
