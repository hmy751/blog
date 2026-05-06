export type ReaderAnalyticsProvider = "off" | "clarity";

export type ReaderAnalyticsConfig =
  | { enabled: false; provider: "off" }
  | { enabled: true; provider: "clarity"; projectId: string };

export const readerAnalyticsEvents = [
  "post_scroll_depth",
  "post_reading_time",
  "heading_reached",
  "code_copy",
  "external_link_click",
  "article_row_click",
  "next_article_click",
  "nav_click"
] as const;

export const readerAnalyticsProperties = [
  "post_slug",
  "post_year",
  "tag",
  "depth",
  "time_bucket",
  "heading_id",
  "heading_level",
  "link_domain",
  "code_block_index",
  "surface"
] as const;

export function getReaderAnalyticsConfig(): ReaderAnalyticsConfig {
  const provider = normalizeProvider(process.env.NEXT_PUBLIC_READER_ANALYTICS_PROVIDER);

  if (provider !== "clarity") {
    return { enabled: false, provider: "off" };
  }

  const projectId = normalizeClarityProjectId(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
  if (!projectId) {
    return { enabled: false, provider: "off" };
  }

  return {
    enabled: true,
    provider,
    projectId
  };
}

function normalizeProvider(value: string | undefined): ReaderAnalyticsProvider {
  if (value?.trim().toLowerCase() === "clarity") {
    return "clarity";
  }

  return "off";
}

function normalizeClarityProjectId(value: string | undefined): string {
  const projectId = value?.trim() ?? "";
  return /^[a-z0-9]+$/i.test(projectId) ? projectId : "";
}
