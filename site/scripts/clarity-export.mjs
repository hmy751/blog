import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const endpoint = "https://www.clarity.ms/export-data/api/v1/project-live-insights";
const defaultQueries = ["url", "device-url"];
const queryPresets = {
  url: ["URL"],
  "device-url": ["Device", "URL"],
  "source-url": ["Source", "URL"],
  "channel-url": ["Channel", "URL"],
  "country-url": ["Country/Region", "URL"],
  "browser-url": ["Browser", "URL"]
};

await loadEnvFiles([".env.local", ".env"]);

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

const numOfDays = options.numOfDays ?? Number(process.env.CLARITY_EXPORT_NUM_DAYS || 1);
const outputDir = path.resolve(siteRoot, options.outputDir || process.env.CLARITY_EXPORT_DIR || "data/clarity");
const queryNames = options.queries.length
  ? options.queries
  : parseCsv(process.env.CLARITY_EXPORT_QUERIES) ?? defaultQueries;

validateNumOfDays(numOfDays);
validateQueries(queryNames);

if (options.dryRun) {
  console.log("Clarity export dry run");
  console.log(`numOfDays: ${numOfDays}`);
  console.log(`outputDir: ${path.relative(siteRoot, outputDir) || "."}`);
  console.log(`queries: ${queryNames.join(", ")}`);
  console.log(`API requests: ${queryNames.length}`);
  process.exit(0);
}

const token = process.env.CLARITY_API_TOKEN;
if (!token) {
  throw new Error("Missing CLARITY_API_TOKEN. Add it to site/.env.local or the shell environment.");
}

const capturedAt = new Date();
const capturedAtIso = capturedAt.toISOString();
const runId = capturedAtIso.replace(/[:.]/g, "-");
const rawDir = path.join(outputDir, "raw", runId);
const normalizedDir = path.join(outputDir, "normalized");
const aggregateJsonl = path.join(normalizedDir, "clarity-daily.jsonl");
const dailyJsonl = path.join(normalizedDir, `${capturedAtIso.slice(0, 10)}.jsonl`);

await mkdir(rawDir, { recursive: true });
await mkdir(normalizedDir, { recursive: true });

let normalizedCount = 0;

for (const queryName of queryNames) {
  const dimensions = queryPresets[queryName];
  const requestUrl = buildRequestUrl(numOfDays, dimensions);
  const responseData = await requestClarity(requestUrl, token);
  const rawPayload = {
    capturedAt: capturedAtIso,
    numOfDays,
    queryName,
    dimensions,
    endpoint,
    requestUrl: redactUrl(requestUrl),
    data: responseData
  };

  await writeJson(path.join(rawDir, `${queryName}.json`), rawPayload);

  const records = normalizeResponse({
    capturedAt: capturedAtIso,
    numOfDays,
    queryName,
    dimensions,
    data: responseData
  });
  const jsonl = records.map((record) => JSON.stringify(record)).join("\n");

  if (jsonl) {
    await appendFile(aggregateJsonl, `${jsonl}\n`, "utf8");
    await appendFile(dailyJsonl, `${jsonl}\n`, "utf8");
  }

  normalizedCount += records.length;
  console.log(`Saved ${queryName}: ${records.length} normalized rows`);
}

console.log(`Raw: ${path.relative(siteRoot, rawDir)}`);
console.log(`Normalized: ${path.relative(siteRoot, aggregateJsonl)}`);
console.log(`Rows appended: ${normalizedCount}`);

function parseArgs(args) {
  const parsed = {
    dryRun: false,
    help: false,
    numOfDays: null,
    outputDir: "",
    queries: []
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

    if (arg === "--num-days") {
      parsed.numOfDays = Number(readValue(args, index, arg));
      index += 1;
      continue;
    }

    if (arg === "--out-dir") {
      parsed.outputDir = readValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--query") {
      parsed.queries.push(...parseQueryList(readValue(args, index, arg)));
      index += 1;
      continue;
    }

    if (arg === "--queries") {
      parsed.queries.push(...parseQueryList(readValue(args, index, arg)));
      index += 1;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
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

function parseCsv(value) {
  if (!value) {
    return null;
  }

  const entries = parseQueryList(value);
  return entries.length ? entries : null;
}

function parseQueryList(value) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function validateNumOfDays(value) {
  if (![1, 2, 3].includes(value)) {
    throw new Error("--num-days must be 1, 2, or 3 because Clarity only exports the previous 1 to 3 days.");
  }
}

function validateQueries(queryNames) {
  const unknown = queryNames.filter((queryName) => !queryPresets[queryName]);
  if (unknown.length) {
    throw new Error(`Unknown Clarity export query: ${unknown.join(", ")}. Use one of: ${Object.keys(queryPresets).join(", ")}`);
  }

  if (queryNames.length > 10) {
    throw new Error("Clarity allows 10 API requests per project per day. Keep one run at 10 queries or fewer.");
  }
}

function buildRequestUrl(numOfDays, dimensions) {
  const url = new URL(endpoint);
  url.searchParams.set("numOfDays", String(numOfDays));
  dimensions.forEach((dimension, index) => {
    url.searchParams.set(`dimension${index + 1}`, dimension);
  });

  return url;
}

async function requestClarity(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Clarity export failed: ${response.status} ${response.statusText}\n${body.slice(0, 1000)}`);
  }

  return response.json();
}

function normalizeResponse({ capturedAt, numOfDays, queryName, dimensions, data }) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.flatMap((metric) => {
    const rows = Array.isArray(metric.information) ? metric.information : [];

    return rows.map((row) => {
      const dimensionsByName = {};
      const values = {};

      for (const [key, value] of Object.entries(row)) {
        if (dimensions.includes(key)) {
          dimensionsByName[key] = value;
          continue;
        }

        values[key] = coerceMetricValue(value);
      }

      return {
        capturedAt,
        windowDays: numOfDays,
        queryName,
        metricName: metric.metricName || "Unknown",
        dimensions: dimensionsByName,
        values
      };
    });
  });
}

function coerceMetricValue(value) {
  if (typeof value !== "string") {
    return value;
  }

  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
}

async function writeJson(target, value) {
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function loadEnvFiles(files) {
  for (const file of files) {
    const envPath = path.join(siteRoot, file);
    let contents = "";

    try {
      contents = await readFile(envPath, "utf8");
    } catch {
      continue;
    }

    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separator = trimmed.indexOf("=");
      if (separator === -1) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      const value = unquoteEnvValue(trimmed.slice(separator + 1).trim());

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

function unquoteEnvValue(value) {
  const first = value[0];
  const last = value[value.length - 1];

  if ((first === "\"" && last === "\"") || (first === "'" && last === "'")) {
    return value.slice(1, -1);
  }

  return value;
}

function redactUrl(url) {
  return url.toString();
}

function printHelp() {
  console.log(`Usage: npm run clarity:export -- [options]

Options:
  --dry-run                 Print the planned export without calling Clarity
  --num-days 1|2|3          Export the previous 1, 2, or 3 days (default: 1)
  --query <preset>          Run one preset. Can be repeated.
  --queries <a,b>           Run comma-separated presets.
  --out-dir <path>          Output directory (default: data/clarity)

Default queries:
  ${defaultQueries.join(", ")}

Available query presets:
  ${Object.keys(queryPresets).join(", ")}

Environment:
  CLARITY_API_TOKEN         Required unless --dry-run is used
  CLARITY_EXPORT_NUM_DAYS   Optional default for --num-days
  CLARITY_EXPORT_QUERIES    Optional comma-separated query list
  CLARITY_EXPORT_DIR        Optional output directory
`);
}
