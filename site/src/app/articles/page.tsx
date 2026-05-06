import { ArticleList } from "@/components/article-row/ArticleList";
import { Shell } from "@/components/shell/Shell";
import { getPosts, groupPostsByYear } from "@/lib/posts";
import { createPageMetadata } from "@/lib/seo";
import "../page-common.module.css";

export const metadata = createPageMetadata({
  title: "Articles",
  description: "기술을 만들며 바뀐 생각과 구현 기록을 모아둔 글 목록입니다.",
  path: "/articles/"
});

export default async function ArticlesPage() {
  const posts = await getPosts();
  const postsByYear = groupPostsByYear(posts);

  return (
    <Shell current="articles">
      <main className="view">
        <h1 className="page-title">Articles</h1>
        <p className="page-sub">총 {posts.length}편의 글. 최신 순.</p>
        {postsByYear.map(([year, yearPosts]) => (
          <section className="year-block" aria-labelledby={`year-${year}`} key={year}>
            <div className="year" id={`year-${year}`}>
              {year}
            </div>
            <ArticleList posts={yearPosts} dateFormat="mmdd" />
          </section>
        ))}
      </main>
    </Shell>
  );
}
