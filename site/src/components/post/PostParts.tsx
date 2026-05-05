import Link from "next/link";
import type { Post } from "@/lib/posts";
import "./Post.module.css";

export function PostMeta({ post }: Readonly<{ post: Post }>) {
  return (
    <div className="post-meta">
      <span className="tag">{post.primaryTag}</span>
      <span className="sep">·</span>
      <time dateTime={post.date}>{post.dateText}</time>
      {post.readTime ? (
        <>
          <span className="sep">·</span>
          <span>{post.readTime}</span>
        </>
      ) : null}
    </div>
  );
}

export function PostHero({ cover }: Readonly<{ cover?: string }>) {
  if (!cover) return null;

  return <div className="post-hero" style={{ backgroundImage: `url(${cover})` }} aria-hidden="true" />;
}

type PostFooterProps = Readonly<{
  backHref: string;
  backLabel: string;
  next?: Post;
}>;

export function PostFooter({ backHref, backLabel, next }: PostFooterProps) {
  return (
    <footer className="post-footer">
      <Link className="link" href={backHref}>
        {backLabel}
      </Link>
      {next ? (
        <Link className="next" href={`/articles/${next.slug}/`}>
          <span>{next.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </footer>
  );
}
