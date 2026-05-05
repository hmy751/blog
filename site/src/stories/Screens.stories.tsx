import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleList } from "@/components/article-row/ArticleList";
import { PostFooter, PostHero, PostMeta } from "@/components/post/PostParts";
import { Prose } from "@/components/prose/Prose";
import { Shell } from "@/components/shell/Shell";
import { markdownToHtml } from "@/lib/markdown";
import { siteConfig } from "@/lib/site-config";
import { fixturePosts, markdownFixture, noteItems } from "./story-fixtures";
import "@/app/home.module.css";
import "@/app/page-common.module.css";
import "@/app/note-about.module.css";

const meta = {
  title: "Design System/Screens",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const postsByYear = [...new Set(fixturePosts.map((post) => post.year))]
  .sort((a, b) => Number(b) - Number(a))
  .map((year) => [year, fixturePosts.filter((post) => post.year === year)] as const);

export const Home: Story = {
  render: () => <HomeScreen />
};

export const HomeMobile: Story = {
  render: () => (
    <div className="story-mobile-frame">
      <HomeScreen />
    </div>
  )
};

export const Articles: Story = {
  render: () => (
    <Shell current="articles">
      <main className="view">
        <h1 className="page-title">Articles</h1>
        <p className="page-sub">총 {fixturePosts.length}편의 글. 최신 순.</p>
        {postsByYear.map(([year, yearPosts]) => (
          <section className="year-block" aria-labelledby={`year-${year}`} key={year}>
            <div className="year" id={`year-${year}`}>{year}</div>
            <ArticleList posts={yearPosts} dateFormat="mmdd" />
          </section>
        ))}
      </main>
    </Shell>
  )
};

function HomeScreen() {
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

        <section className="featured" aria-labelledby="featured-title">
          <div className="section-label" id="featured-title">Featured</div>
          <ArticleList posts={fixturePosts.slice(0, 3)} />
        </section>

        <section aria-labelledby="recent-title">
          <div className="section-label" id="recent-title">Recent</div>
          <ArticleList posts={fixturePosts.slice(1)} compact />
          <p className="more-link">
            <a className="link" href="/articles/">모든 글 보기 →</a>
          </p>
        </section>
      </main>
    </Shell>
  );
}

export const PostDetail: Story = {
  loaders: [
    async () => ({
      html: await markdownToHtml(markdownFixture, { leadFirstParagraph: true })
    })
  ],
  render: (_args, context) => {
    const post = fixturePosts[0];
    const next = fixturePosts[1];

    return (
      <Shell current="articles">
        <main className="view">
          <article>
            <PostMeta post={post} />
            <PostHero cover={post.cover} />
            <h1 className="post-title">{post.title}</h1>
            <p className="post-sub">{post.description}</p>
            <Prose html={String(context.loaded.html ?? "")} />
            <PostFooter backHref="/articles/" backLabel="← Articles" next={next} />
          </article>
        </main>
      </Shell>
    );
  }
};

export const NoteEmpty: Story = {
  render: () => (
    <Shell current="note">
      <main className="view">
        <h1 className="page-title">Note</h1>
        <p className="page-sub">짧은 관찰과 작업 메모를 따로 모읍니다.</p>
        <div className="notes">
          <div className="note note-empty">
            <div className="when">{noteItems[1].when}</div>
            <div className="body">{noteItems[1].body}</div>
          </div>
        </div>
      </main>
    </Shell>
  )
};

export const AboutDormant: Story = {
  render: () => (
    <Shell current="about">
      <main className="view">
        <h1 className="page-title">About</h1>
        <p className="page-sub">구현과 글쓰기 사이에서 생긴 판단을 차분히 기록합니다.</p>
        <dl className="about-grid">
          <dt>Writer</dt>
          <dd>{siteConfig.author}</dd>
          <dt>Focus</dt>
          <dd>AI, RAG, Frontend, Architecture</dd>
          <dt>Archive</dt>
          <dd>
            <span className="yr">2024-2026</span>
            14 posts
          </dd>
        </dl>
      </main>
    </Shell>
  )
};
