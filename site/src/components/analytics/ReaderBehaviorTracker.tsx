"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { PostHog } from "posthog-js";
import type { PostHogReaderAnalyticsConfig } from "@/lib/analytics";
import { readerAnalyticsEvents, readerAnalyticsProperties } from "@/lib/analytics";

type ReaderBehaviorTrackerProps = Readonly<{
  posthog: PostHogReaderAnalyticsConfig;
}>;

type ReaderAnalyticsEvent = (typeof readerAnalyticsEvents)[number];
type ReaderAnalyticsProperty = (typeof readerAnalyticsProperties)[number];
type ReaderAnalyticsValue = string | number | boolean;
type ReaderAnalyticsPayload = Partial<Record<ReaderAnalyticsProperty, ReaderAnalyticsValue>>;
type QueuedEvent = {
  event: ReaderAnalyticsEvent;
  properties: ReaderAnalyticsPayload;
};
type Capture = (event: ReaderAnalyticsEvent, properties: ReaderAnalyticsPayload) => void;
type PointerSnapshot = {
  xBucket: number;
  yBucket: number;
  pointerType: string;
  surface: string;
  movedAt: number;
  emittedAt?: number;
};
type PointerBuckets = {
  x_bucket: number;
  y_bucket: number;
};

declare global {
  interface Window {
    __readerPostHogInitialized?: boolean;
  }
}

const eventAllowlist = new Set<string>(readerAnalyticsEvents);
const propertyAllowlist = new Set<string>(readerAnalyticsProperties);
const scrollDepths = [25, 50, 75, 100] as const;
const readingTimeMilestones = [15, 30, 60, 120, 300] as const;
const coordinateBucketStep = 5;
const pointerSampleIntervalMs = 3000;
const viewportSampleIntervalMs = 5000;

export function ReaderBehaviorTracker({ posthog }: ReaderBehaviorTrackerProps) {
  const pathname = usePathname();
  const captureRef = useRef<Capture | null>(null);
  const queueRef = useRef<QueuedEvent[]>([]);
  const routeRef = useRef(pathname || "/");
  const latestPointerRef = useRef<PointerSnapshot | null>(null);

  const flushQueue = useCallback(() => {
    const capture = captureRef.current;
    if (!capture || !queueRef.current.length) return;

    const queued = queueRef.current.splice(0);
    queued.forEach(({ event, properties }) => capture(event, properties));
  }, []);

  const emit = useCallback((event: ReaderAnalyticsEvent, properties: ReaderAnalyticsPayload = {}) => {
    if (!eventAllowlist.has(event)) return;

    const payload = sanitizeProperties({
      ...getBaseProperties(routeRef.current),
      ...properties
    });

    const capture = captureRef.current;
    if (capture) {
      capture(event, payload);
      return;
    }

    queueRef.current = [...queueRef.current.slice(-24), { event, properties: payload }];
  }, []);

  useEffect(() => {
    let active = true;

    import("posthog-js").then(({ default: posthogClient }) => {
      if (!active) return;

      if (!window.__readerPostHogInitialized) {
        posthogClient.init(posthog.projectApiKey, {
          api_host: posthog.host,
          defaults: "2026-01-30",
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          disable_session_recording: true,
          person_profiles: "identified_only"
        });
        window.__readerPostHogInitialized = true;
      }

      captureRef.current = createPostHogCapture(posthogClient);
      flushQueue();
    }).catch(() => {
      captureRef.current = null;
    });

    return () => {
      active = false;
    };
  }, [flushQueue, posthog.host, posthog.projectApiKey]);

  useEffect(() => {
    routeRef.current = pathname || window.location.pathname;
    emit("reader_page_view", {
      route: routeRef.current,
      referrer_domain: getReferrerDomain(),
      surface: "page"
    });
  }, [emit, pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!isSensitiveElement(target)) {
        emit("area_click", {
          ...getPointerBuckets(event.clientX, event.clientY),
          pointer_type: "mouse",
          surface: classifySurface(target)
        });
      }

      const anchor = closestElement<HTMLAnchorElement>(event.target, "a[href]");
      if (!anchor) return;

      const declaredEvent = anchor.dataset.readerEvent;
      if (declaredEvent && eventAllowlist.has(declaredEvent)) {
        emit(declaredEvent as ReaderAnalyticsEvent, {
          post_slug: anchor.dataset.postSlug,
          post_year: anchor.dataset.postYear,
          tag: anchor.dataset.postTag,
          surface: anchor.dataset.readerSurface || "link"
        });
      }

      const href = anchor.getAttribute("href") || "";
      const targetUrl = toUrl(href);
      if (!targetUrl || targetUrl.host === window.location.host) return;

      emit("external_link_click", {
        link_domain: targetUrl.hostname.replace(/^www\./, ""),
        surface: anchor.dataset.readerSurface || "external-link"
      });
    };

    const handleCopy = (event: ClipboardEvent) => {
      const codeTarget = closestElement<HTMLElement>(event.target, "pre, code");
      if (!codeTarget) return;

      const blocks = [...document.querySelectorAll<HTMLElement>("pre")];
      const block = codeTarget.closest("pre") ?? codeTarget;
      const blockIndex = blocks.indexOf(block);
      emit("code_copy", {
        code_block_index: blockIndex >= 0 ? blockIndex + 1 : undefined,
        surface: "code"
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("copy", handleCopy);
    };
  }, [emit]);

  useEffect(() => {
    latestPointerRef.current = null;

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (isSensitiveElement(target)) return;

      const buckets = getPointerBuckets(event.clientX, event.clientY);
      latestPointerRef.current = {
        xBucket: buckets.x_bucket,
        yBucket: buckets.y_bucket,
        pointerType: event.pointerType || "unknown",
        surface: classifySurface(target),
        movedAt: Date.now()
      };
    };

    const pointerTimer = window.setInterval(() => {
      if (document.hidden) return;

      const latestPointer = latestPointerRef.current;
      if (!latestPointer || latestPointer.emittedAt === latestPointer.movedAt) return;

      emit("pointer_heat_sample", {
        x_bucket: latestPointer.xBucket,
        y_bucket: latestPointer.yBucket,
        pointer_type: latestPointer.pointerType,
        sample_interval: pointerSampleIntervalMs / 1000,
        surface: latestPointer.surface
      });

      latestPointerRef.current = {
        ...latestPointer,
        emittedAt: latestPointer.movedAt
      };
    }, pointerSampleIntervalMs);

    document.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.clearInterval(pointerTimer);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, [emit, pathname]);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-reader-post]");
    if (!article) return undefined;

    const seenDepths = new Set<number>();
    const seenTimeMilestones = new Set<number>();
    const startedAt = Date.now();

    const handleScroll = () => {
      const depth = getScrollDepth();
      for (const targetDepth of scrollDepths) {
        if (depth < targetDepth || seenDepths.has(targetDepth)) continue;
        seenDepths.add(targetDepth);
        emit("post_scroll_depth", {
          depth: targetDepth,
          surface: "article"
        });
      }
    };

    const timeTimer = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      for (const milestone of readingTimeMilestones) {
        if (elapsedSeconds < milestone || seenTimeMilestones.has(milestone)) continue;
        seenTimeMilestones.add(milestone);
        emit("post_reading_time", {
          time_bucket: `${milestone}s`,
          surface: "article"
        });
      }
    }, 5000);
    const viewportTimer = window.setInterval(() => {
      if (document.hidden) return;

      emit("viewport_sample", {
        ...getViewportProperties(),
        active_heading_id: getActiveHeadingId(),
        sample_interval: viewportSampleIntervalMs / 1000,
        surface: "article"
      });
    }, viewportSampleIntervalMs);

    const headingObserver = createHeadingObserver(emit);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    emit("viewport_sample", {
      ...getViewportProperties(),
      active_heading_id: getActiveHeadingId(),
      sample_interval: viewportSampleIntervalMs / 1000,
      surface: "article"
    });

    return () => {
      window.clearInterval(timeTimer);
      window.clearInterval(viewportTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      headingObserver?.disconnect();
    };
  }, [emit, pathname]);

  return null;
}

function createPostHogCapture(posthogClient: PostHog): Capture {
  return (event, properties) => {
    posthogClient.capture(event, properties);
  };
}

function createHeadingObserver(emit: Capture): IntersectionObserver | undefined {
  if (!("IntersectionObserver" in window)) return undefined;

  const seenHeadings = new Set<string>();
  const headings = [...document.querySelectorAll<HTMLElement>(".prose h2[id], .prose h3[id]")];
  if (!headings.length) return undefined;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const heading = entry.target as HTMLElement;
      if (!heading.id || seenHeadings.has(heading.id)) return;

      seenHeadings.add(heading.id);
      emit("heading_reached", {
        heading_id: heading.id,
        heading_level: Number(heading.tagName.slice(1)),
        surface: "article"
      });
    });
  }, {
    rootMargin: "0px 0px -45% 0px",
    threshold: 0.1
  });

  headings.forEach((heading) => observer.observe(heading));
  return observer;
}

function getBaseProperties(route: string): ReaderAnalyticsPayload {
  const article = document.querySelector<HTMLElement>("[data-reader-post]");

  return {
    route,
    post_slug: article?.dataset.postSlug,
    post_year: article?.dataset.postYear,
    tag: article?.dataset.postTag
  };
}

function sanitizeProperties(properties: Record<string, unknown>): ReaderAnalyticsPayload {
  const sanitized: ReaderAnalyticsPayload = {};

  for (const [key, value] of Object.entries(properties)) {
    if (!propertyAllowlist.has(key)) continue;
    if (value === undefined || value === null || value === "") continue;
    if (!["string", "number", "boolean"].includes(typeof value)) continue;
    sanitized[key as ReaderAnalyticsProperty] = value as ReaderAnalyticsValue;
  }

  return sanitized;
}

function getScrollDepth(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(100, Math.round((scrollTop / scrollable) * 100));
}

function getViewportProperties(): ReaderAnalyticsPayload {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    viewportHeight
  );

  return {
    scroll_depth: getScrollDepth(),
    viewport_top: bucketPercent(scrollTop, documentHeight),
    viewport_bottom: bucketPercent(scrollTop + viewportHeight, documentHeight),
    viewport_width_bucket: bucketDimension(window.innerWidth || document.documentElement.clientWidth),
    viewport_height_bucket: bucketDimension(viewportHeight)
  };
}

function getActiveHeadingId(): string | undefined {
  const headings = [...document.querySelectorAll<HTMLElement>(".prose h2[id], .prose h3[id]")];
  let activeHeadingId: string | undefined;
  const threshold = window.innerHeight * 0.35;

  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > threshold) break;
    activeHeadingId = heading.id;
  }

  return activeHeadingId;
}

function getPointerBuckets(clientX: number, clientY: number): PointerBuckets {
  return {
    x_bucket: bucketPercent(clientX, Math.max(1, window.innerWidth || document.documentElement.clientWidth)),
    y_bucket: bucketPercent(clientY, Math.max(1, window.innerHeight || document.documentElement.clientHeight))
  };
}

function bucketPercent(value: number, max: number): number {
  const rawPercent = (value / Math.max(1, max)) * 100;
  const bucket = Math.round(rawPercent / coordinateBucketStep) * coordinateBucketStep;
  return Math.min(100, Math.max(0, bucket));
}

function bucketDimension(value: number): number {
  return Math.max(0, Math.round(value / 100) * 100);
}

function classifySurface(target: Element | null): string {
  if (!target) return "page";
  if (target.closest("pre, code")) return "code";
  if (target.closest("[data-reader-post], .prose")) return "article";
  if (target.closest("header, nav")) return "nav";
  if (target.closest("footer")) return "footer";
  if (target.closest("a[href]")) return "link";
  if (target.closest("main")) return "main";
  return "page";
}

function isSensitiveElement(target: Element | null): boolean {
  return Boolean(
    target?.closest(
      "input, textarea, select, [contenteditable='true'], [data-analytics-mask], [data-clarity-mask='true']"
    )
  );
}

function getReferrerDomain(): string | undefined {
  const referrer = toUrl(document.referrer);
  if (!referrer) return undefined;
  return referrer.hostname.replace(/^www\./, "");
}

function toUrl(value: string): URL | undefined {
  if (!value) return undefined;

  try {
    return new URL(value, window.location.href);
  } catch {
    return undefined;
  }
}

function closestElement<T extends Element>(target: EventTarget | null, selector: string): T | null {
  return target instanceof Element ? target.closest<T>(selector) : null;
}
