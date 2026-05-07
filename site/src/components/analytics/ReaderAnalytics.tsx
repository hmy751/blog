"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { getReaderAnalyticsConfig } from "@/lib/analytics";
import { ReaderBehaviorTracker } from "./ReaderBehaviorTracker";

type RuntimeAnalyticsState = {
  enabled: boolean;
  internalTestLabel?: string;
};

const internalTestParam = "reader_analytics_test";
const internalTestStorageKey = "reader_analytics_test";

export function ReaderAnalytics() {
  const config = useMemo(() => getReaderAnalyticsConfig(), []);
  const [runtimeState, setRuntimeState] = useState<RuntimeAnalyticsState>({ enabled: false });

  useEffect(() => {
    if (!config.enabled) return;

    setRuntimeState(getRuntimeAnalyticsState(config.mode));
  }, [config]);

  if (!config.enabled || !runtimeState.enabled) {
    return null;
  }

  return (
    <>
      {config.clarity ? (
        <Script
          id="reader-analytics-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: claritySnippet(config.clarity.projectId, runtimeState.internalTestLabel) }}
        />
      ) : null}
      {config.posthog ? (
        <ReaderBehaviorTracker
          posthog={config.posthog}
          internalTestLabel={runtimeState.internalTestLabel}
        />
      ) : null}
    </>
  );
}

function getRuntimeAnalyticsState(mode: "production" | "all" | "off"): RuntimeAnalyticsState {
  if (mode === "off") return { enabled: false };
  if (mode !== "all" && isLocalAnalyticsHost(window.location.hostname)) return { enabled: false };

  return {
    enabled: true,
    internalTestLabel: getInternalTestLabel()
  };
}

function isLocalAnalyticsHost(hostname: string): boolean {
  return (
    hostname === "localhost"
    || hostname === "127.0.0.1"
    || hostname === "::1"
    || hostname.endsWith(".local")
  );
}

function getInternalTestLabel(): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const queryLabel = normalizeInternalTestLabel(
    params.get(internalTestParam) ?? params.get("analytics_test")
  );

  if (queryLabel) {
    window.localStorage.setItem(internalTestStorageKey, queryLabel);
    return queryLabel;
  }

  return normalizeInternalTestLabel(window.localStorage.getItem(internalTestStorageKey));
}

function normalizeInternalTestLabel(value: string | null): string | undefined {
  const label = value?.trim().toLowerCase() ?? "";
  return /^[a-z0-9_-]{1,32}$/.test(label) ? label : undefined;
}

function claritySnippet(projectId: string, internalTestLabel: string | undefined): string {
  const internalTestSnippet = internalTestLabel
    ? `clarity("set","traffic_type","internal_test");clarity("set","test_actor","${internalTestLabel}");`
    : "";

  return `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");${internalTestSnippet}`;
}
