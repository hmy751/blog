import Link from "next/link";
import type { Post } from "@/lib/posts";
import "./Post.module.css";

export function PostMeta({ post }: Readonly<{ post: Post }>) {
  const displayTags = post.displayTags.length > 0 ? post.displayTags : [post.primaryTag];

  return (
    <div className="post-meta">
      <div className="post-meta-line">
        <span>{post.platform}</span>
        <span className="sep">·</span>
        <time dateTime={post.date}>{post.dateText}</time>
        {post.readTime ? (
          <>
            <span className="sep">·</span>
            <span>{post.readTime}</span>
          </>
        ) : null}
      </div>
      <div className="post-tags" aria-label="Tags">
        {displayTags.map((tag, index) => (
          <span className="tag" key={`${tag}-${index}`}>
            {tag}
          </span>
        ))}
      </div>
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
      <Link className="link" data-reader-event="nav_click" data-reader-surface="post-footer-back" href={backHref}>
        {backLabel}
      </Link>
      {next ? (
        <Link
          className="next"
          data-post-slug={next.slug}
          data-post-year={next.year}
          data-post-tag={next.primaryTag}
          data-reader-event="next_article_click"
          data-reader-surface="post-footer-next"
          href={`/articles/${next.slug}/`}
        >
          <span>{next.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </footer>
  );
}
