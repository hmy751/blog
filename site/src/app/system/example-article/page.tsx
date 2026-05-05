import { PostFooter, PostHero, PostMeta } from "@/components/post/PostParts";
import { Prose } from "@/components/prose/Prose";
import { Shell } from "@/components/shell/Shell";
import { getExampleArticle } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export const metadata = {
  title: "Example Article | System"
};

export default async function SystemExampleArticlePage() {
  const post = await getExampleArticle();
  const html = await markdownToHtml(post.body, { leadFirstParagraph: true });

  return (
    <Shell current="system">
      <main className="view">
        <article>
          <PostMeta post={post} />
          <PostHero cover={post.cover} />
          <h1 className="post-title">{post.title}</h1>
          {post.description ? <p className="post-sub">{post.description}</p> : null}
          <Prose html={html} />
          <PostFooter backHref="/system/" backLabel="← System" />
        </article>
      </main>
    </Shell>
  );
}
