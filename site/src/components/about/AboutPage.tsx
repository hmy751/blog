import { Shell } from "@/components/shell/Shell";
import { getPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import "@/app/page-common.module.css";
import "@/app/note-about.module.css";

export default async function AboutPage() {
  const posts = await getPosts();
  const years = [...new Set(posts.map((post) => post.year))].sort();
  const tags = [...new Set(posts.flatMap((post) => post.tags.slice(0, 2)))].slice(0, 8);

  return (
    <Shell current="about">
      <main className="view">
        <h1 className="page-title">About</h1>
        <p className="page-sub">구현과 글쓰기 사이에서 생긴 판단을 차분히 기록합니다.</p>
        <dl className="about-grid">
          <dt>Writer</dt>
          <dd>{siteConfig.author}</dd>
          <dt>Focus</dt>
          <dd>{tags.join(", ")}</dd>
          <dt>Archive</dt>
          <dd>
            <span className="yr">
              {years[0] || ""}-{years.at(-1) || ""}
            </span>
            {posts.length} posts
          </dd>
        </dl>
      </main>
    </Shell>
  );
}
