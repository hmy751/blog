import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    ...(siteUrl ? { host: siteUrl.origin, sitemap: new URL("/sitemap.xml", siteUrl).toString() } : {})
  };
}
