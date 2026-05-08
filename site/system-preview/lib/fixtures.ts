import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Post } from "@/lib/posts";

const siteRoot = path.basename(process.cwd()) === "system-preview"
  ? path.resolve(process.cwd(), "..")
  : process.cwd();
const fixturesDir = path.join(siteRoot, "archive", "design-system", "fixtures");

type Frontmatter = Record<string, unknown>;

export async function getExampleArticle(): Promise<Post> {
  const file = "example-article.md";
  const raw = await readFile(path.join(fixturesDir, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Frontmatter;
  const title = stringValue(data.title) || "Markdown 요소 확인용 예시 글";
  const date = normalizeDate(data.date ?? "2026-05-05");
  const tags = arrayOfStrings(data.tags);
  const displayTags = tags.length > 0 ? tags : ["Fixture"];
  const description = stringValue(data.description);

  return {
    title,
    author: stringValue(data.author) || "Design Fixture",
    date,
    dateText: date.replaceAll("-", "."),
    dateShort: date.slice(5).replace("-", "."),
    readTime: stringValue(data.readTime),
    tags,
    primaryTag: displayTags[0] || "Fixture",
    displayTags,
    description,
    descriptionSource: description ? "frontmatter" : "excerpt",
    cover: stringValue(data.cover) || undefined,
    featured: false,
    platform: stringValue(data.platform) || "Blog",
    slug: "example-article",
    year: date.slice(0, 4),
    body: stripDuplicateTitle(parsed.content, title),
    file
  };
}

export async function getMarkdownFixtureBody(): Promise<string> {
  const raw = await readFile(path.join(fixturesDir, "post-markdown-fixture.md"), "utf8");
  return matter(raw).content;
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

function stringValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function arrayOfStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => stringValue(item)).filter(Boolean);
}

function stripDuplicateTitle(body: string, title: string): string {
  const lines = body.trimStart().split("\n");
  if (lines[0]?.replace(/^#\s+/, "").trim() === title.trim()) {
    return lines.slice(1).join("\n").trimStart();
  }
  return body.trimStart();
}
