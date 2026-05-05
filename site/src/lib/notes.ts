import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const siteRoot = path.basename(process.cwd()) === "system-preview"
  ? path.resolve(process.cwd(), "..")
  : process.cwd();
const repoRoot = path.resolve(siteRoot, "..");
const notesDir = path.join(repoRoot, "content", "notes");

export type Note = {
  title: string;
  date: string;
  dateText: string;
  body: string;
  slug: string;
  file: string;
};

type Frontmatter = Record<string, unknown>;

export async function getNotes(): Promise<Note[]> {
  let files: string[];

  try {
    files = await readdir(notesDir);
  } catch (error) {
    if (isNotFoundError(error)) return [];
    throw error;
  }

  const markdownFiles = files
    .filter((file) => file.endsWith(".md"))
    .filter((file) => file !== "README.md");

  const notes = await Promise.all(markdownFiles.map(readNoteFile));
  const cutoffDate = getPublicationCutoffDate();

  return notes
    .filter((note) => note.date !== "TBD" && note.date <= cutoffDate)
    .sort((a, b) => b.date.localeCompare(a.date));
}

async function readNoteFile(file: string): Promise<Note> {
  const raw = await readFile(path.join(notesDir, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Frontmatter;
  const filenameDate = file.slice(0, 10);
  const date = normalizeDate(data.date ?? filenameDate);

  if (date !== "TBD" && filenameDate !== date) {
    throw new Error(`Note date mismatch in ${file}: filename ${filenameDate}, frontmatter ${date}`);
  }

  return {
    title: stringValue(data.title),
    date,
    dateText: date === "TBD" ? "TBD" : date.replaceAll("-", "."),
    body: stringValue(data.description) || excerptFromMarkdown(parsed.content),
    slug: slugFromFilename(file),
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

function getPublicationCutoffDate(): string {
  const override = process.env.SITE_PUBLISH_CUTOFF_DATE?.trim();
  if (override) return normalizeDate(override);
  return new Date().toISOString().slice(0, 10);
}

function stringValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function excerptFromMarkdown(body: string): string {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "");
  const paragraphs = withoutCode.split(/\n{2,}/);

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;
    if (/^(#{1,6}|[-*+]\s|\d+\.\s|>|---|\|)/.test(trimmed)) continue;

    return truncate(stripMarkdown(trimmed), 140);
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

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}
