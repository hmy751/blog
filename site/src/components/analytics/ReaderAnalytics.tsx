"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { getReaderAnalyticsConfig } from "@/lib/analytics";
import { ReaderBehaviorTracker } from "./ReaderBehaviorTracker";

type RuntimeAnalyticsState = {
  enabled: boolean;
  testTrafficType?: "internal_test" | "local_test";
  testActor?: string;
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
          dangerouslySetInnerHTML={{ __html: claritySnippet(config.clarity.projectId, runtimeState) }}
        />
      ) : null}
      {config.posthog ? (
        <ReaderBehaviorTracker
          posthog={config.posthog}
          testTrafficType={runtimeState.testTrafficType}
          testActor={runtimeState.testActor}
        />
      ) : null}
    </>
  );
}

function getRuntimeAnalyticsState(mode: "production" | "all" | "off"): RuntimeAnalyticsState {
  if (mode === "off") return { enabled: false };

  const isLocalHost = isLocalAnalyticsHost(window.location.hostname);
  if (mode !== "all" && isLocalHost) return { enabled: false };

  const internalTestLabel = getInternalTestLabel();
  if (internalTestLabel) {
    return {
      enabled: true,
      testTrafficType: "internal_test",
      testActor: internalTestLabel
    };
  }

  if (isLocalHost) {
    return {
      enabled: true,
      testTrafficType: "local_test",
      testActor: "local"
    };
  }

  return {
    enabled: true
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

function claritySnippet(projectId: string, runtimeState: RuntimeAnalyticsState): string {
  const testTagSnippet = runtimeState.testTrafficType && runtimeState.testActor
    ? `clarity("set","traffic_type","${runtimeState.testTrafficType}");clarity("set","test_actor","${runtimeState.testActor}");`
    : "";

  return `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");${testTagSnippet}`;
}
