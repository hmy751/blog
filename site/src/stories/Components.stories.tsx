import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleList } from "@/components/article-row/ArticleList";
import { PostFooter, PostHero, PostMeta } from "@/components/post/PostParts";
import { Shell } from "@/components/shell/Shell";
import { fixtureCover, fixturePosts, makePost, noteItems } from "./story-fixtures";
import "@/app/page-common.module.css";
import "@/app/note-about.module.css";

const meta = {
  title: "Design System/Components",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const noCoverPosts = fixturePosts.map((post) => ({ ...post, cover: undefined }));

export const ShellFrame: Story = {
  render: () => (
    <Shell current="articles">
      <main className="view">
        <h1 className="page-title">Shell</h1>
        <p className="page-sub">Brand, primary nav, footer, and motion wrapper.</p>
      </main>
    </Shell>
  )
};

export const ArticleRows: Story = {
  render: () => (
    <main className="story-canvas">
      <h1 className="story-heading">Article Row</h1>
      <p className="story-sub">Aside thumbnail variant with cover, no-cover spacer, compact rows, and long-title wrapping.</p>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">Default</h2>
          <span className="story-section-kicker">with covers</span>
        </div>
        <ArticleList posts={fixturePosts} />
      </section>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">No Cover</h2>
          <span className="story-section-kicker">spacer alignment</span>
        </div>
        <ArticleList posts={noCoverPosts} />
      </section>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">Compact</h2>
          <span className="story-section-kicker">recent list</span>
        </div>
        <ArticleList posts={fixturePosts} compact dateFormat="mmdd" />
      </section>
    </main>
  )
};

export const PostParts: Story = {
  render: () => {
    const current = makePost({
      title: "Storybook에서 post primitive를 확인하는 예시 글",
      date: "2026-05-05",
      slug: "storybook-post-parts",
      tags: ["System"],
      cover: fixtureCover
    });
    const next = fixturePosts[1];

    return (
      <main className="story-canvas">
        <h1 className="story-heading">Post Parts</h1>
        <p className="story-sub">Post meta, hero, title, subtitle, and footer states.</p>
        <section className="story-section">
          <div className="story-spec-row">
            <div className="story-spec-label">with hero</div>
            <div className="story-spec-body">
              <PostMeta post={current} />
              <PostHero cover={current.cover} />
              <h2 className="post-title">{current.title}</h2>
              <p className="post-sub">{current.description}</p>
              <PostFooter backHref="/articles/" backLabel="← Articles" next={next} />
            </div>
          </div>
          <div className="story-spec-row">
            <div className="story-spec-label">minimal</div>
            <div className="story-spec-body">
              <PostMeta post={{ ...current, readTime: "" }} />
              <PostHero />
              <h2 className="post-title">Cover와 readTime이 없는 글</h2>
              <PostFooter backHref="/articles/" backLabel="← Articles" />
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export const NoteAndAboutPrimitives: Story = {
  render: () => (
    <main className="story-canvas">
      <h1 className="story-heading">Note / About</h1>
      <p className="story-sub">Dormant About route and Note empty-state primitives share `note-about.module.css`.</p>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">Note Rows</h2>
          <span className="story-section-kicker">notes</span>
        </div>
        <div className="notes">
          {noteItems.map((item) => (
            <div className="note" key={item.when}>
              <div className="when">{item.when}</div>
              <div className="body">{item.body}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">About Grid</h2>
          <span className="story-section-kicker">dormant</span>
        </div>
        <dl className="about-grid">
          <dt>Writer</dt>
          <dd>myeongyeon ham</dd>
          <dt>Focus</dt>
          <dd>AI, Frontend, Architecture, Product</dd>
          <dt>Archive</dt>
          <dd>
            <span className="yr">2024-2026</span>
            14 posts
          </dd>
        </dl>
      </section>
    </main>
  )
};
