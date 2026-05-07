export type ReaderAnalyticsProvider = "clarity" | "posthog";

export type ReaderAnalyticsConfig =
  | { enabled: false; providers: [] }
  | {
      enabled: true;
      providers: ReaderAnalyticsProvider[];
      clarity?: ClarityReaderAnalyticsConfig;
      posthog?: PostHogReaderAnalyticsConfig;
    };

export type ClarityReaderAnalyticsConfig = {
  projectId: string;
};

export type PostHogReaderAnalyticsConfig = {
  projectApiKey: string;
  host: string;
};

export const readerAnalyticsEvents = [
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
] as const;

export const readerAnalyticsProperties = [
  "route",
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
] as const;

const defaultPostHogHost = "https://us.i.posthog.com";

export function getReaderAnalyticsConfig(): ReaderAnalyticsConfig {
  const providers = normalizeProviders(
    process.env.NEXT_PUBLIC_READER_ANALYTICS_PROVIDERS ?? process.env.NEXT_PUBLIC_READER_ANALYTICS_PROVIDER
  );
  const clarity = providers.includes("clarity")
    ? getClarityConfig()
    : undefined;
  const posthog = providers.includes("posthog")
    ? getPostHogConfig()
    : undefined;
  const enabledProviders = [
    clarity ? "clarity" : undefined,
    posthog ? "posthog" : undefined
  ].filter(Boolean) as ReaderAnalyticsProvider[];

  if (!enabledProviders.length) {
    return { enabled: false, providers: [] };
  }

  return {
    enabled: true,
    providers: enabledProviders,
    clarity,
    posthog
  };
}

function getClarityConfig(): ClarityReaderAnalyticsConfig | undefined {
  const projectId = normalizeClarityProjectId(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
  if (!projectId) {
    return undefined;
  }

  return {
    projectId
  };
}

function getPostHogConfig(): PostHogReaderAnalyticsConfig | undefined {
  const projectApiKey = normalizePostHogProjectApiKey(
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_TOKEN
  );

  if (!projectApiKey) {
    return undefined;
  }

  return {
    projectApiKey,
    host: normalizePostHogHost(process.env.NEXT_PUBLIC_POSTHOG_HOST) || defaultPostHogHost
  };
}

function normalizeProviders(value: string | undefined): ReaderAnalyticsProvider[] {
  const providers = (value ?? "")
    .split(/[\s,]+/)
    .map((provider) => provider.trim().toLowerCase())
    .filter((provider): provider is ReaderAnalyticsProvider => provider === "clarity" || provider === "posthog");

  return [...new Set(providers)];
}

function normalizeClarityProjectId(value: string | undefined): string {
  const projectId = value?.trim() ?? "";
  return /^[a-z0-9]+$/i.test(projectId) ? projectId : "";
}

function normalizePostHogProjectApiKey(value: string | undefined): string {
  const key = value?.trim() ?? "";
  return key && /^[A-Za-z0-9_:-]+$/.test(key) && key.length <= 200 ? key : "";
}

function normalizePostHogHost(value: string | undefined): string {
  const host = value?.trim() ?? "";
  if (!host) return "";

  try {
    const url = new URL(host);
    if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      return "";
    }

    return url.origin;
  } catch {
    return "";
  }
}
