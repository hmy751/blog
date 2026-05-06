import { ArticleList } from "@/components/article-row/ArticleList";
import { Shell } from "@/components/shell/Shell";
import { getFeaturedPosts, getPosts, getRecentPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import "./home.module.css";

export default async function HomePage() {
  const posts = await getPosts();
  const featured = getFeaturedPosts(posts);
  const recent = getRecentPosts(posts);

  return (
    <Shell current="home">
      <main className="view">
        <p className="home-intro">
          {siteConfig.intro[0]}
          <br />
          <span className="muted">{siteConfig.intro[1]}</span>
          <br />
          <span className="muted">{siteConfig.intro[2]}</span>
        </p>

        {featured.length ? (
          <section className="featured" aria-labelledby="featured-title">
            <div className="section-label" id="featured-title">
              Featured
            </div>
            <ArticleList posts={featured} />
          </section>
        ) : null}

        <section aria-labelledby="recent-title">
          <div className="section-label" id="recent-title">
            Recent
          </div>
          <ArticleList posts={recent} compact />
          <p className="more-link">
            <a className="link" href="/articles/">
              모든 글 보기 →
            </a>
          </p>
        </section>
      </main>
    </Shell>
  );
}
