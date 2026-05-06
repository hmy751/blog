import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostFooter, PostHero, PostMeta } from "@/components/post/PostParts";
import { Prose } from "@/components/prose/Prose";
import { Shell } from "@/components/shell/Shell";
import { getNextPost, getPostBySlug, getPosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { createArticleJsonLd, createPostMetadata } from "@/lib/seo";

export const dynamicParams = false;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return createPostMetadata(post);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((item) => item.slug === slug) ?? await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const html = await markdownToHtml(post.body, { leadFirstParagraph: true });
  const subtitle = post.descriptionSource === "frontmatter" && post.description ? post.description : "";
  const next = getNextPost(post, posts);
  const jsonLd = createArticleJsonLd(post);

  return (
    <Shell current="articles">
      <main className="view">
        <article>
          {jsonLd ? (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          ) : null}
          <PostMeta post={post} />
          <PostHero cover={post.cover} />
          <h1 className="post-title">{post.title}</h1>
          {subtitle ? <p className="post-sub">{subtitle}</p> : null}
          <Prose html={html} />
          <PostFooter backHref="/articles/" backLabel="← Articles" next={next} />
        </article>
      </main>
    </Shell>
  );
}
