import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const defaultApiHost = "https://us.posthog.com";
const defaultOutputDir = "data/posthog";
const defaultEvents = [
  "reader_page_view",
  "post_scroll_depth",
  "post_reading_time",
  "heading_reached",
  "viewport_sample",
  "pointer_heat_sample",
  "area_click",
  "code_copy",
  "external_link_click",
  "article_row_click",
  "next_article_click",
  "nav_click"
];
const allowedEvents = new Set(defaultEvents);
const exportedColumns = [
  "timestamp",
  "event",
  "route",
  "current_url",
  "pathname",
  "referrer_domain",
  "post_slug",
  "post_year",
  "tag",
  "depth",
  "scroll_depth",
  "viewport_top",
  "viewport_bottom",
  "viewport_width_bucket",
  "viewport_height_bucket",
  "time_bucket",
  "heading_id",
  "active_heading_id",
  "heading_level",
  "link_domain",
  "code_block_index",
  "x_bucket",
  "y_bucket",
  "pointer_type",
  "sample_interval",
  "surface"
];

await loadEnvFiles([".env.local", ".env"]);

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printHelp();
  process.exit(0);
}

const numOfDays = options.numOfDays ?? Number(process.env.POSTHOG_EXPORT_NUM_DAYS || 1);
const limit = options.limit ?? Number(process.env.POSTHOG_EXPORT_LIMIT || 5000);
const outputDir = path.resolve(siteRoot, options.outputDir || process.env.POSTHOG_EXPORT_DIR || defaultOutputDir);
const apiHost = normalizeHost(options.apiHost || process.env.POSTHOG_API_HOST || defaultApiHost);
const eventNames = options.events.length
  ? options.events
  : parseCsv(process.env.POSTHOG_EXPORT_EVENTS) ?? defaultEvents;

validateNumOfDays(numOfDays);
validateLimit(limit);
validateEvents(eventNames);

const hogql = buildEventsQuery({ eventNames, limit, numOfDays });

if (options.dryRun) {
  console.log("PostHog export dry run");
  console.log(`numOfDays: ${numOfDays}`);
  console.log(`limit: ${limit}`);
  console.log(`apiHost: ${apiHost}`);
  console.log(`outputDir: ${path.relative(siteRoot, outputDir) || "."}`);
  console.log(`events: ${eventNames.join(", ")}`);
  console.log("query:");
  console.log(hogql);
  process.exit(0);
}

const personalApiKey = process.env.POSTHOG_PERSONAL_API_KEY;
const projectId = normalizeProjectId(process.env.POSTHOG_PROJECT_ID);

if (!personalApiKey) {
  throw new Error("Missing POSTHOG_PERSONAL_API_KEY. Add it to site/.env.local or the shell environment.");
}

if (!projectId) {
  throw new Error("Missing POSTHOG_PROJECT_ID. Add it to site/.env.local or the shell environment.");
}

const capturedAt = new Date();
const capturedAtIso = capturedAt.toISOString();
const runId = capturedAtIso.replace(/[:.]/g, "-");
const endpoint = `${apiHost}/api/projects/${projectId}/query/`;
const rawDir = path.join(outputDir, "raw", runId);
const normalizedDir = path.join(outputDir, "normalized");
const aggregateJsonl = path.join(normalizedDir, "posthog-events.jsonl");
const dailyJsonl = path.join(normalizedDir, `${capturedAtIso.slice(0, 10)}.jsonl`);

await mkdir(rawDir, { recursive: true });
await mkdir(normalizedDir, { recursive: true });

const responseData = await requestPostHogQuery(endpoint, personalApiKey, hogql);
const rawPayload = {
  capturedAt: capturedAtIso,
  numOfDays,
  limit,
  events: eventNames,
  endpoint: redactEndpoint(endpoint),
  query: hogql,
  data: responseData
};

await writeJson(path.join(rawDir, "events.json"), rawPayload);

const records = normalizeResponse({
  capturedAt: capturedAtIso,
  numOfDays,
  data: responseData
});
const jsonl = records.map((record) => JSON.stringify(record)).join("\n");

if (jsonl) {
  await appendFile(aggregateJsonl, `${jsonl}\n`, "utf8");
  await appendFile(dailyJsonl, `${jsonl}\n`, "utf8");
}

console.log(`Saved PostHog events: ${records.length} normalized rows`);
console.log(`Raw: ${path.relative(siteRoot, rawDir)}`);
console.log(`Normalized: ${path.relative(siteRoot, aggregateJsonl)}`);

function parseArgs(args) {
  const parsed = {
    apiHost: "",
    dryRun: false,
    events: [],
    help: false,
    limit: null,
    numOfDays: null,
    outputDir: ""
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

    if (arg === "--limit") {
      parsed.limit = Number(readValue(args, index, arg));
      index += 1;
      continue;
    }

    if (arg === "--event") {
      parsed.events.push(...parseEventList(readValue(args, index, arg)));
      index += 1;
      continue;
    }

    if (arg === "--events") {
      parsed.events.push(...parseEventList(readValue(args, index, arg)));
      index += 1;
      continue;
    }

    if (arg === "--host") {
      parsed.apiHost = readValue(args, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--out-dir") {
      parsed.outputDir = readValue(args, index, arg);
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

  const entries = parseEventList(value);
  return entries.length ? entries : null;
}

function parseEventList(value) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function validateNumOfDays(value) {
  if (!Number.isInteger(value) || value < 1 || value > 31) {
    throw new Error("--num-days must be an integer between 1 and 31.");
  }
}

function validateLimit(value) {
  if (!Number.isInteger(value) || value < 1 || value > 50000) {
    throw new Error("--limit must be an integer between 1 and 50000.");
  }
}

function validateEvents(eventNames) {
  const unknown = eventNames.filter((eventName) => !allowedEvents.has(eventName));
  if (unknown.length) {
    throw new Error(`Unknown PostHog export event: ${unknown.join(", ")}. Use one of: ${defaultEvents.join(", ")}`);
  }
}

function buildEventsQuery({ eventNames, limit, numOfDays }) {
  const eventFilter = eventNames.map(quoteHogqlString).join(", ");

  return `
SELECT
  timestamp,
  event,
  properties.route AS route,
  properties.$current_url AS current_url,
  properties.$pathname AS pathname,
  properties.referrer_domain AS referrer_domain,
  properties.post_slug AS post_slug,
  properties.post_year AS post_year,
  properties.tag AS tag,
  properties.depth AS depth,
  properties.scroll_depth AS scroll_depth,
  properties.viewport_top AS viewport_top,
  properties.viewport_bottom AS viewport_bottom,
  properties.viewport_width_bucket AS viewport_width_bucket,
  properties.viewport_height_bucket AS viewport_height_bucket,
  properties.time_bucket AS time_bucket,
  properties.heading_id AS heading_id,
  properties.active_heading_id AS active_heading_id,
  properties.heading_level AS heading_level,
  properties.link_domain AS link_domain,
  properties.code_block_index AS code_block_index,
  properties.x_bucket AS x_bucket,
  properties.y_bucket AS y_bucket,
  properties.pointer_type AS pointer_type,
  properties.sample_interval AS sample_interval,
  properties.surface AS surface
FROM events
WHERE timestamp >= now() - INTERVAL ${numOfDays} DAY
  AND event IN (${eventFilter})
ORDER BY timestamp ASC
LIMIT ${limit}
`.trim();
}

async function requestPostHogQuery(endpoint, personalApiKey, query) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${personalApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query
      },
      name: "blog reader behavior export"
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`PostHog export failed: ${response.status} ${response.statusText}\n${body.slice(0, 1000)}`);
  }

  return response.json();
}

function normalizeResponse({ capturedAt, numOfDays, data }) {
  const rows = Array.isArray(data?.results) ? data.results : [];
  const columns = normalizeColumns(data?.columns);

  return rows.map((row) => {
    const source = Array.isArray(row)
      ? Object.fromEntries(row.map((value, index) => [columns[index] || `column_${index}`, value]))
      : row;

    const properties = {};
    for (const column of exportedColumns.slice(2)) {
      const value = source[column];
      if (value === undefined || value === null || value === "") continue;
      properties[column] = value;
    }

    return {
      capturedAt,
      windowDays: numOfDays,
      source: "posthog",
      timestamp: source.timestamp,
      event: source.event,
      route: source.route || source.pathname || "",
      url: source.current_url || "",
      properties
    };
  });
}

function normalizeColumns(columns) {
  if (!Array.isArray(columns)) {
    return exportedColumns;
  }

  return columns.map((column) => {
    if (typeof column === "string") return column;
    if (typeof column?.name === "string") return column.name;
    if (typeof column?.key === "string") return column.key;
    return "";
  });
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

function normalizeHost(value) {
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    throw new Error(`Invalid PostHog API host: ${value}`);
  }
}

function normalizeProjectId(value) {
  const projectId = value?.trim() ?? "";
  return /^[0-9]+$/.test(projectId) ? projectId : "";
}

function quoteHogqlString(value) {
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

function redactEndpoint(endpoint) {
  const url = new URL(endpoint);
  return `${url.origin}${url.pathname}`;
}

function printHelp() {
  console.log(`Usage: npm run posthog:export -- [options]

Options:
  --dry-run                 Print the planned query without calling PostHog
  --num-days <n>            Export the previous n days, 1-31 (default: 1)
  --limit <n>               Maximum event rows, 1-50000 (default: 5000)
  --event <event>           Export one allowlisted event. Can be repeated.
  --events <a,b>            Export comma-separated allowlisted events.
  --host <url>              PostHog app API host (default: ${defaultApiHost})
  --out-dir <path>          Output directory (default: ${defaultOutputDir})

Default events:
  ${defaultEvents.join(", ")}

Environment:
  POSTHOG_PERSONAL_API_KEY  Required unless --dry-run is used
  POSTHOG_PROJECT_ID        Required unless --dry-run is used
  POSTHOG_API_HOST          Optional PostHog app API host
  POSTHOG_EXPORT_NUM_DAYS   Optional default for --num-days
  POSTHOG_EXPORT_LIMIT      Optional default for --limit
  POSTHOG_EXPORT_EVENTS     Optional comma-separated event list
  POSTHOG_EXPORT_DIR        Optional output directory
`);
}
