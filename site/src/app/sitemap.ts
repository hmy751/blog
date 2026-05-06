import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { absoluteUrl, getSiteUrl, postPath } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!getSiteUrl()) {
    return [];
  }

  const posts = await getPosts();
  const staticRoutes = ["/", "/articles/", "/note/", "/about/", "/privacy/"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route) ?? "",
      lastModified: new Date()
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(postPath(post)) ?? "",
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.6
    }))
  ];
}
