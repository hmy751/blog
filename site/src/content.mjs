import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = path.resolve(siteRoot, "..");
const postsDir = path.join(repoRoot, "content", "posts");

export const siteConfig = {
  title: "hmy751.dev",
  description: "기술을 만들며 바뀐 생각을 기록합니다.",
  author: "myeongyeon ham",
  intro: [
    "기술을 만들며 바뀐 생각을 기록합니다.",
    "실험, 구조, 판단, 실패가 어떻게 다음 선택으로 이어지는지 씁니다.",
    "프론트엔드에서 AI 제품까지, 구현의 표면보다 경계를 자주 봅니다."
  ]
};

export async function getPosts() {
  const files = await readdir(postsDir);
  const markdownFiles = files
    .filter((file) => file.endsWith(".md"))
    .filter((file) => file !== "README.md");

  const posts = await Promise.all(markdownFiles.map(readPostFile));
  const cutoffDate = getPublicationCutoffDate();

  return posts
    .filter((post) => post.date !== "TBD" && post.date <= cutoffDate)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

async function readPostFile(file) {
  const raw = await readFile(path.join(postsDir, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const title = String(data.title || titleFromSlug(file));
  const cleanBody = stripDuplicateTitle(body, title);
  const date = normalizeDate(data.date || file.slice(0, 10));
  const descriptionSource = data.description ? "frontmatter" : "excerpt";
  const description = data.description || excerptFromMarkdown(cleanBody);
  const tags = Array.isArray(data.tags) ? data.tags.map(String).filter(Boolean) : [];
  const displayTags = selectDisplayTags(data, tags);

  return {
    title,
    author: data.author || siteConfig.author,
    date,
    dateText: date.replaceAll("-", "."),
    dateShort: date.slice(5).replace("-", "."),
    readTime: data.readTime || "",
    tags,
    primaryTag: displayTags[0] || data.project || data.category || "Blog",
    displayTags,
    description,
    descriptionSource,
    cover: data.cover,
    featured: data.featured === true,
    platform: data.platform || "Blog",
    slug: slugFromFilename(file),
    year: date.slice(0, 4),
    body: cleanBody,
    file
  };
}

function selectDisplayTags(data, tags) {
  const topic = data.topic ? String(data.topic).trim() : "";
  const displayTags = topic ? [topic] : [];

  for (const tag of tags) {
    const normalized = String(tag).trim();
    if (!normalized) continue;
    displayTags.push(normalized);
  }

  const uniqueTags = unique(displayTags);
  if (uniqueTags.length > 0) return uniqueTags;

  const fallback = tags[0] || data.project || data.category || "Blog";
  return fallback ? [String(fallback)] : [];
}

function unique(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const normalized = String(value).trim();
    const key = normalized.toLocaleLowerCase();
    if (!normalized || seen.has(key)) continue;
    seen.add(key);
    result.push(normalized);
  }

  return result;
}

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { data: {}, body: raw };
  }

  const data = {};
  let currentArrayKey = null;

  for (const line of match[1].split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const arrayItem = line.match(/^\s+-\s+(.*)$/);
    if (arrayItem && currentArrayKey) {
      data[currentArrayKey].push(parseScalar(arrayItem[1]));
      continue;
    }

    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValue) {
      currentArrayKey = null;
      continue;
    }

    const [, key, value] = keyValue;
    if (value === "") {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = parseScalar(value);
    currentArrayKey = null;
  }

  return {
    data,
    body: raw.slice(match[0].length)
  };
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null") return undefined;
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function stripDuplicateTitle(body, title) {
  const lines = body.trimStart().split("\n");
  if (lines[0]?.replace(/^#\s+/, "").trim() === title.trim()) {
    return lines.slice(1).join("\n").trimStart();
  }
  return body.trimStart();
}

function excerptFromMarkdown(body) {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "");
  const paragraphs = withoutCode.split(/\n{2,}/);

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;
    if (/^(#{1,6}|[-*+]\s|\d+\.\s|>|---|\|)/.test(trimmed)) continue;

    return truncate(stripMarkdown(trimmed), 130);
  }

  return "";
}

function stripMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, max) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

function normalizeDate(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

function getPublicationCutoffDate() {
  const override = process.env.SITE_PUBLISH_CUTOFF_DATE?.trim();
  if (override) return normalizeDate(override);
  return new Date().toISOString().slice(0, 10);
}

function slugFromFilename(file) {
  return path.basename(file, ".md").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function titleFromSlug(file) {
  return slugFromFilename(file)
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}
