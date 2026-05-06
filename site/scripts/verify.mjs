import { spawn } from "node:child_process";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const outDir = path.join(siteRoot, "out");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const requiredFiles = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  path.join("articles", "index.html"),
  path.join("note", "index.html"),
  path.join("about", "index.html"),
  path.join("privacy", "index.html")
];

const forbiddenOutputs = [
  "system",
  "system.html",
  path.join("system", "index.html"),
  "archive",
  "design-system"
];

const forbiddenHtmlLinks = [
  /href=["']\/system(?:\/|["'#?])/,
  /(?:href|src)=["']\/archive\//,
  /(?:href|src)=["']\/design-system\//
];

await run("check", ["run", "check"]);
await run("build", ["run", "build"]);

await assertRequiredFiles();
await assertForbiddenOutputs();
await assertNoForbiddenLinks();

console.log("verify passed: production export is ready and local-only routes stayed out of out/");

function run(label, args) {
  console.log(`\n> npm ${args.join(" ")}`);

  return new Promise((resolve, reject) => {
    const child = spawn(npmCommand, args, {
      cwd: siteRoot,
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${label} failed with ${signal || `exit code ${code}`}`));
    });
  });
}

async function assertRequiredFiles() {
  for (const file of requiredFiles) {
    await assertExists(path.join(outDir, file), `Missing expected export: out/${file}`);
  }
}

async function assertForbiddenOutputs() {
  for (const output of forbiddenOutputs) {
    const target = path.join(outDir, output);
    if (await exists(target)) {
      throw new Error(`Local-only output leaked into production export: out/${output}`);
    }
  }
}

async function assertNoForbiddenLinks() {
  const htmlFiles = await collectHtmlFiles(outDir);

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const matched = forbiddenHtmlLinks.find((pattern) => pattern.test(html));

    if (matched) {
      throw new Error(`Local-only link or asset leaked into ${path.relative(siteRoot, file)}: ${matched}`);
    }
  }
}

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}

async function assertExists(target, message) {
  if (!await exists(target)) {
    throw new Error(message);
  }
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}
