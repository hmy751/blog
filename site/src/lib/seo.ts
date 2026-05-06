import type { Metadata } from "next";
import type { Post } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

const locale = "ko_KR";
const language = "ko-KR";

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
};

export function getSiteUrl(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return undefined;

  try {
    return new URL(raw.endsWith("/") ? raw : `${raw}/`);
  } catch {
    return undefined;
  }
}

export function absoluteUrl(pathname: string): string | undefined {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return undefined;

  return new URL(normalizePath(pathname), siteUrl).toString();
}

export function createBaseMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description,
    applicationName: siteConfig.title,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    category: "technology",
    keywords: [...siteConfig.keywords],
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      type: "website",
      locale,
      siteName: siteConfig.title,
      title: siteConfig.title,
      description: siteConfig.description,
      ...(siteUrl ? { url: "/" } : {})
    },
    twitter: {
      card: "summary",
      title: siteConfig.title,
      description: siteConfig.description
    }
  };
}

export function createPageMetadata({ title, description = siteConfig.description, path }: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();

  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale,
      siteName: siteConfig.title,
      title,
      description,
      ...(siteUrl ? { url: path } : {})
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export function createPostMetadata(post: Post): Metadata {
  const siteUrl = getSiteUrl();
  const path = postPath(post);
  const image = metadataImage(post.cover);

  return {
    title: post.title,
    description: post.description,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "article",
      locale,
      siteName: siteConfig.title,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(siteUrl ? { url: path } : {}),
      ...(image ? { images: [{ url: image, alt: post.title }] } : {})
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      ...(image ? { images: [image] } : {})
    }
  };
}

export function createArticleJsonLd(post: Post): Record<string, unknown> | undefined {
  const url = absoluteUrl(postPath(post));
  if (!url) return undefined;

  const image = absoluteImageUrl(post.cover);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author
    },
    keywords: post.tags.join(", "),
    inLanguage: language,
    ...(image ? { image: [image] } : {})
  };
}

export function postPath(post: Pick<Post, "slug">): string {
  return `/articles/${post.slug}/`;
}

function metadataImage(cover: string | undefined): string | undefined {
  if (!cover) return undefined;
  if (isAbsoluteUrl(cover)) return cover;
  return getSiteUrl() ? cover : undefined;
}

function absoluteImageUrl(cover: string | undefined): string | undefined {
  if (!cover) return undefined;
  if (isAbsoluteUrl(cover)) return cover;
  return absoluteUrl(cover);
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
