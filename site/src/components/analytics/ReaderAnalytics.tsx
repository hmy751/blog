import Script from "next/script";
import { getReaderAnalyticsConfig } from "@/lib/analytics";

export function ReaderAnalytics() {
  const config = getReaderAnalyticsConfig();

  if (!config.enabled) {
    return null;
  }

  if (config.provider === "clarity") {
    return (
      <Script
        id="reader-analytics-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: claritySnippet(config.projectId) }}
      />
    );
  }

  return null;
}

function claritySnippet(projectId: string): string {
  return `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${projectId}");`;
}
