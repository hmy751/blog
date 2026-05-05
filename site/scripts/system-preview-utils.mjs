import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const siteRoot = fileURLToPath(new URL("..", import.meta.url));
export const previewRoot = path.join(siteRoot, "system-preview");
export const systemExportDir = path.join(siteRoot, ".next-system");
export const systemOutDir = path.join(siteRoot, "system-dist");

export async function syncSystemPreviewAssets() {
  const sourceDir = path.join(siteRoot, "design-system", "fixtures");
  const targetDir = path.join(previewRoot, "public", "design-system", "fixtures");
  const staticExtensions = new Set([".avif", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"]);

  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });

  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    if (!entry.isFile() || !staticExtensions.has(path.extname(entry.name))) {
      continue;
    }

    await cp(path.join(sourceDir, entry.name), path.join(targetDir, entry.name));
  }
}

export function nextArgs(command, args = []) {
  return [
    path.join(siteRoot, "node_modules", "next", "dist", "bin", "next"),
    command,
    ...args
  ];
}

export function runNode(args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: options.cwd || siteRoot,
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed with ${signal || `exit code ${code}`}`));
    });
  });
}

export function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
}
