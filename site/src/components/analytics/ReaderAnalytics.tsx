import Script from "next/script";
import { getReaderAnalyticsConfig } from "@/lib/analytics";
import { ReaderBehaviorTracker } from "./ReaderBehaviorTracker";

export function ReaderAnalytics() {
  const config = getReaderAnalyticsConfig();

  if (!config.enabled) {
    return null;
  }

  return (
    <>
      {config.clarity ? (
        <Script
          id="reader-analytics-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: claritySnippet(config.clarity.projectId) }}
        />
      ) : null}
      {config.posthog ? <ReaderBehaviorTracker posthog={config.posthog} /> : null}
    </>
  );
}

function claritySnippet(projectId: string): string {
  return `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");`;
}
