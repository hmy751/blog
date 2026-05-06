import { copyFile, mkdir, readdir, rename, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const defaultSourceDir = path.join(os.homedir(), "Downloads");
const allowedExtensions = new Set([".csv", ".png"]);

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

const sourceDir = path.resolve(siteRoot, options.sourceDir || process.env.CLARITY_DOWNLOADS_DIR || defaultSourceDir);
const outputDir = path.resolve(siteRoot, options.outputDir || process.env.CLARITY_EXPORT_DIR || "data/clarity");
const importId = new Date().toISOString().replace(/[:.]/g, "-");
const targetRoot = path.join(outputDir, "manual", importId);
const sourceFiles = options.files.length
  ? options.files.map((file) => path.resolve(siteRoot, file))
  : await findClarityDownloads(sourceDir, options.type);

if (!sourceFiles.length) {
  console.log(`No Clarity ${options.type} downloads found in ${sourceDir}`);
  process.exit(0);
}

const manifest = [];

for (const sourceFile of sourceFiles) {
  const kind = classifyDownload(sourceFile);
  if (!kind) {
    console.warn(`Skipping unrecognized Clarity download: ${sourceFile}`);
    continue;
  }

  if (options.type !== "all" && kind !== options.type) {
    continue;
  }

  const stats = await stat(sourceFile);
  const targetDir = path.join(targetRoot, kind === "heatmap" ? "heatmaps" : "recordings");
  const targetFile = path.join(targetDir, path.basename(sourceFile));

  manifest.push({
    kind,
    source: sourceFile,
    target: targetFile,
    sizeBytes: stats.size,
    importedAt: new Date().toISOString(),
    moved: options.move
  });

  if (options.dryRun) {
    continue;
  }

  await mkdir(targetDir, { recursive: true });

  if (options.move) {
    await rename(sourceFile, targetFile);
  } else {
    await copyFile(sourceFile, targetFile);
  }
}

if (!manifest.length) {
  console.log(`No Clarity ${options.type} downloads matched the selected type.`);
  process.exit(0);
}

if (!options.dryRun) {
  await mkdir(targetRoot, { recursive: true });
  await writeFile(path.join(targetRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

console.log(`${options.dryRun ? "Would import" : "Imported"} ${manifest.length} Clarity download file(s)`);
console.log(`Source: ${sourceDir}`);
console.log(`Target: ${path.relative(siteRoot, targetRoot)}`);

for (const item of manifest) {
  console.log(`- ${item.kind}: ${path.basename(item.source)}`);
}

async function findClarityDownloads(dir, type) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const filePath = path.join(dir, entry.name);
    const extension = path.extname(entry.name).toLowerCase();

    if (!allowedExtensions.has(extension)) {
      continue;
    }

    const kind = classifyDownload(filePath);
    if (!kind) {
      continue;
    }

    if (type !== "all" && kind !== type) {
      continue;
    }

    files.push(filePath);
  }

  return files.sort();
}

function classifyDownload(filePath) {
  const filename = path.basename(filePath).toLowerCase();

  if (!filename.includes("clarity")) {
    return null;
  }

  if (filename.includes("heatmap")) {
    return "heatmap";
  }

  if (filename.includes("recording")) {
    return "recording";
  }

  return null;
}

function parseArgs(args) {
  const parsed = {
    dryRun: false,
    files: [],
    help: false,
    move: false,
    outputDir: "",
    sourceDir: "",
    type: "all"
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (arg === "--move") {
      parsed.move = true;
      continue;
    }

    if (arg === "--from") {
      parsed.sourceDir = readValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--out-dir") {
      parsed.outputDir = readValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--type") {
      parsed.type = readValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--file") {
      parsed.files.push(readValue(args, index, arg));
      index += 1;
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    parsed.files.push(arg);
  }

  if (!["all", "heatmap", "recording"].includes(parsed.type)) {
    throw new Error("--type must be one of: all, heatmap, recording");
  }

  return parsed;
}

function readValue(args, index, flag) {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }

  return value;
}

function printHelp() {
  console.log(`Usage: npm run clarity:import -- [options] [files...]

Imports manually downloaded Microsoft Clarity heatmap CSV/PNG files and recordings CSV files
into the ignored local archive under data/clarity/manual/.

Options:
  --dry-run                 Print matching files without copying
  --from <dir>              Directory to scan (default: ~/Downloads)
  --file <path>             Import one file. Can be repeated.
  --type all|heatmap|recording
  --out-dir <path>          Output directory (default: data/clarity)
  --move                    Move files instead of copying them

Environment:
  CLARITY_DOWNLOADS_DIR     Optional default source directory
  CLARITY_EXPORT_DIR        Optional output directory
`);
}
