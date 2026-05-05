import type { Post } from "@/lib/posts";
import { ArticleRow } from "./ArticleRow";
import "./ArticleRow.module.css";

type ArticleListProps = Readonly<{
  posts: Post[];
  compact?: boolean;
  dateFormat?: "full" | "mmdd";
}>;

export function ArticleList({ posts, compact = false, dateFormat = "full" }: ArticleListProps) {
  return (
    <div className="article-list" data-thumb="aside">
      {posts.map((post) => (
        <ArticleRow key={post.slug} post={post} compact={compact} dateFormat={dateFormat} />
      ))}
    </div>
  );
}
