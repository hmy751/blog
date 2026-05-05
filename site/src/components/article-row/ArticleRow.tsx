import Link from "next/link";
import type { Post } from "@/lib/posts";
import "./ArticleRow.module.css";

type ArticleRowProps = Readonly<{
  post: Post;
  compact?: boolean;
  dateFormat?: "full" | "mmdd";
}>;

export function ArticleRow({ post, compact = false, dateFormat = "full" }: ArticleRowProps) {
  const dateText = dateFormat === "mmdd" ? post.dateShort : post.dateText.slice(2);

  return (
    <Link className={`row${post.cover ? "" : " no-thumb"}`} href={`/articles/${post.slug}/`}>
      <div>
        <div className="article-title">{post.title}</div>
        {!compact ? <span className="article-desc">{post.description}</span> : null}
      </div>
      <time className="meta" dateTime={post.date}>
        {dateText}
      </time>
      {post.cover ? (
        <div
          className="cv has-img"
          style={{ backgroundImage: `url(${post.cover})` }}
          aria-hidden="true"
        />
      ) : (
        <div className="cv-spacer" aria-hidden="true" />
      )}
    </Link>
  );
}
