import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { siteConfig } from "./site-config";

const siteRoot = path.basename(process.cwd()) === "system-preview"
  ? path.resolve(process.cwd(), "..")
  : process.cwd();
const repoRoot = path.resolve(siteRoot, "..");
const postsDir = path.join(repoRoot, "content", "posts");

export type DescriptionSource = "frontmatter" | "excerpt";

export type Post = {
  title: string;
  author: string;
  date: string;
  dateText: string;
  dateShort: string;
  readTime: string;
  tags: string[];
  primaryTag: string;
  description: string;
  descriptionSource: DescriptionSource;
  cover?: string;
  featured: boolean;
  platform: string;
  slug: string;
  year: string;
  body: string;
  file: string;
};

type Frontmatter = Record<string, unknown>;

export async function getPosts(): Promise<Post[]> {
  const files = await readdir(postsDir);
  const markdownFiles = files
    .filter((file) => file.endsWith(".md"))
    .filter((file) => file !== "README.md");

  const posts = await Promise.all(markdownFiles.map(readPostFile));

  return posts
    .filter((post) => post.date !== "TBD")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(posts: Post[]): Post[] {
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  return featured.length ? featured : posts.slice(0, 3);
}

export function getRecentPosts(posts: Post[], featuredPosts: Post[]): Post[] {
  const featuredSlugs = new Set(featuredPosts.map((post) => post.slug));
  return posts.filter((post) => !featuredSlugs.has(post.slug)).slice(0, 6);
}

export function groupPostsByYear(posts: Post[]): Array<[string, Post[]]> {
  const byYear = new Map<string, Post[]>();

  for (const post of posts) {
    const yearPosts = byYear.get(post.year) ?? [];
    yearPosts.push(post);
    byYear.set(post.year, yearPosts);
  }

  return [...byYear.entries()].sort(([a], [b]) => Number(b) - Number(a));
}

export function getNextPost(post: Post, posts: Post[]): Post | undefined {
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  if (currentIndex < 0) return undefined;
  return posts[currentIndex + 1] ?? posts[0];
}

async function readPostFile(file: string): Promise<Post> {
  const raw = await readFile(path.join(postsDir, file), "utf8");
  return postFromRaw(raw, file);
}

function postFromRaw(raw: string, file: string): Post {
  const parsed = matter(raw);
  const data = parsed.data as Frontmatter;
  const title = stringValue(data.title) || titleFromSlug(file);
  const body = stripDuplicateTitle(parsed.content, title);
  const filenameDate = file.slice(0, 10);
  const date = normalizeDate(data.date ?? filenameDate);

  if (date !== "TBD" && filenameDate !== date) {
    throw new Error(`Post date mismatch in ${file}: filename ${filenameDate}, frontmatter ${date}`);
  }

  const tags = arrayOfStrings(data.tags);
  const descriptionFromFrontmatter = stringValue(data.description);
  const descriptionSource: DescriptionSource = descriptionFromFrontmatter
    ? "frontmatter"
    : "excerpt";
  const description = descriptionFromFrontmatter || excerptFromMarkdown(body);

  return {
    title,
    author: stringValue(data.author) || siteConfig.author,
    date,
    dateText: date === "TBD" ? "TBD" : date.replaceAll("-", "."),
    dateShort: date === "TBD" ? "TBD" : date.slice(5).replace("-", "."),
    readTime: stringValue(data.readTime),
    tags,
    primaryTag: tags[0] || stringValue(data.project) || stringValue(data.category) || "Blog",
    description,
    descriptionSource,
    cover: stringValue(data.cover) || undefined,
    featured: data.featured === true,
    platform: stringValue(data.platform) || "Blog",
    slug: slugFromFilename(file),
    year: date === "TBD" ? "" : date.slice(0, 4),
    body,
    file
  };
}

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  const date = String(value).trim();
  if (date === "TBD") return date;
  return date.slice(0, 10);
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

function excerptFromMarkdown(body: string): string {
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

function stripMarkdown(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trim()}…`;
}

function slugFromFilename(file: string): string {
  return path.basename(file, ".md").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function titleFromSlug(file: string): string {
  return slugFromFilename(file)
    .split("-")
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}
