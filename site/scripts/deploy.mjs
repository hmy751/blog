import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hmy751-blog.pages.dev";
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || "hmy751-blog";
const branch = process.env.CLOUDFLARE_PAGES_BRANCH || "main";
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const wranglerCommand = process.platform === "win32" ? "wrangler.cmd" : "wrangler";

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Usage: npm run deploy

Environment overrides:
  NEXT_PUBLIC_SITE_URL           default: https://hmy751-blog.pages.dev
  CLOUDFLARE_PAGES_PROJECT       default: hmy751-blog
  CLOUDFLARE_PAGES_BRANCH        default: main

The script runs npm run verify, then uploads site/out to Cloudflare Pages.`);
  process.exit(0);
}

console.log(`Deploy target: ${siteUrl}`);
console.log(`Cloudflare Pages project: ${projectName} (${branch})`);

await run("verify", npmCommand, ["run", "verify"], {
  NEXT_PUBLIC_SITE_URL: siteUrl
});

await run("deploy", wranglerCommand, [
  "pages",
  "deploy",
  path.join(siteRoot, "out"),
  "--project-name",
  projectName,
  "--branch",
  branch
]);

function run(label, command, args, env = {}) {
  console.log(`\n> ${command} ${args.join(" ")}`);

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: siteRoot,
      env: {
        ...process.env,
        ...env
      },
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
