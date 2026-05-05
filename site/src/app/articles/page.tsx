import { ArticleList } from "@/components/article-row/ArticleList";
import { Shell } from "@/components/shell/Shell";
import { getPosts, groupPostsByYear } from "@/lib/posts";
import "../page-common.module.css";

export const metadata = {
  title: "Articles"
};

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
