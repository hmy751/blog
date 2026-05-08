import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleList } from "@/components/article-row/ArticleList";
import { PostMeta } from "@/components/post/PostParts";
import { Prose } from "@/components/prose/Prose";
import { Shell } from "@/components/shell/Shell";
import { markdownToHtml } from "@/lib/markdown";
import { fixturePosts, makePost, markdownFixture, fixtureCover } from "./story-fixtures";
import systemStyles from "../../system-preview/app/system/system.module.css";

const meta = {
  title: "Design System/System Page",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceTokens = [
  ["--bg", "page"],
  ["--surface", "code, kbd, callout"],
  ["--ink", "primary text"],
  ["--ink-2", "body"],
  ["--ink-3", "muted"],
  ["--ink-4", "caption / meta"],
  ["--rule", "hairline"],
  ["--rule-soft", "hairline / soft"]
] as const;

const accentTokens = [
  ["--accent", "olive / oklch(.58 .13 140)"],
  ["--accent-soft", "accent / 16%"],
  ["--accent-ink", "link / tag"]
] as const;

const typeSamples = [
  ["Display / post-title", "36px / 600 / 1.2", "좋은 컴포넌트는 무엇을 숨겨야 하는가"],
  ["H1 / page-title", "32px / 600 / 1.25", "디자인 시스템"],
  ["H2 / section", "21px / 600 / 1.35", "섹션 제목은 본문보다 한 단계 위"],
  ["Body / prose", "17px / 400 / 1.75", "본문은 한 화면 분량보다 한 호흡에 읽히는 분량이 더 중요하다."]
] as const;

const principles = [
  ["덜어낸다.", "카드, 그림자, 배지를 먼저 의심한다."],
  ["액센트는 하나.", "올리브-그린 외에는 색을 쓰지 않는다."],
  ["밀도는 일관되게.", "본문은 17px, line-height 1.75."],
  ["경계는 얇게.", "shadow 대신 rule을 쓴다."],
  ["모션은 미세하게.", "호버와 진입 모션은 글을 방해하지 않는다."]
] as const;

const examplePost = makePost({
  title: "Markdown 요소 확인용 예시 글",
  date: "2026-05-05",
  slug: "example-article",
  tags: ["Fixture"],
  cover: fixtureCover,
  readTime: "8 min read",
  description: "상세 글 화면에서 prose, hero, meta, footer가 같은 흐름으로 이어지는지 확인합니다."
});

export const Overview: Story = {
  loaders: [
    async () => ({
      fixtureHtml: await markdownToHtml(markdownFixture, { leadFirstParagraph: true })
    })
  ],
  render: (_args, context) => (
    <Shell shellClassName={systemStyles.systemShell} footerExtra={<Link href="/system/">System</Link>}>
      <main className="view">
        <SystemHero />
        <ColorSection />
        <TypeSection />
        <ProseSection fixtureHtml={String(context.loaded.fixtureHtml ?? "")} />
        <ComponentsSection />
        <PrinciplesSection />
      </main>
    </Shell>
  )
};

function SystemHero() {
  return (
    <section className={systemStyles.sysHero}>
      <div className={systemStyles.sysEyebrow}>Design System · Storybook parity</div>
      <h1 className={systemStyles.sysH1}>디자인 시스템</h1>
      <p className={systemStyles.sysLead}>
        기존 local-only system page의 CSS Module과 구조를 그대로 가져와 Storybook에서 확인하는 parity story입니다.
      </p>
      <nav className={systemStyles.sysToc} aria-label="Sections">
        <a href="#color"><span className={systemStyles.num}>01</span> Color</a>
        <a href="#type"><span className={systemStyles.num}>02</span> Typography</a>
        <a href="#prose"><span className={systemStyles.num}>03</span> Prose</a>
        <a href="#components"><span className={systemStyles.num}>04</span> Components</a>
        <a href="#principles"><span className={systemStyles.num}>05</span> Principles</a>
      </nav>
    </section>
  );
}

function ColorSection() {
  return (
    <SystemSection id="color" num="01" title="Foundations · Color">
      <p className={systemStyles.sysDesc}>잉크 톤은 따뜻한 오프-화이트와 잉크 블랙. 액센트는 올리브-그린 하나만 쓴다.</p>
      <h3 className={systemStyles.sysH3}>Surface &amp; Ink</h3>
      <div className={`${systemStyles.sysGrid} ${systemStyles.cols4}`}>
        {surfaceTokens.map(([name, value]) => <Swatch key={name} name={name} value={value} />)}
      </div>
      <h3 className={systemStyles.sysH3}>Accent</h3>
      <div className={`${systemStyles.sysGrid} ${systemStyles.cols3}`}>
        {accentTokens.map(([name, value]) => <Swatch key={name} name={name} value={value} />)}
      </div>
    </SystemSection>
  );
}

function TypeSection() {
  return (
    <SystemSection id="type" num="02" title="Foundations · Typography">
      <p className={systemStyles.sysDesc}>한국어 본문은 Pretendard, 영문 보조 시리프는 Newsreader, 코드는 JetBrains Mono.</p>
      {typeSamples.map(([label, spec, text]) => (
        <div className={systemStyles.sysType} key={label}>
          <div className={systemStyles.sysTypeMeta}>
            <span>{label}</span>
            <span className={systemStyles.sysTypeSpec}>{spec}</span>
          </div>
          <div className={systemStyles.sysTypeSample}>{text}</div>
        </div>
      ))}
    </SystemSection>
  );
}

function ProseSection({ fixtureHtml }: Readonly<{ fixtureHtml: string }>) {
  return (
    <SystemSection id="prose" num="03" title="Prose · 본문 요소">
      <p className={systemStyles.sysDesc}>상세 글에서 쓰이는 본문 요소를 production Markdown renderer로 확인한다.</p>
      <Spec label="Inline">
        <div className="prose">
          <p>
            본문에는 <code>inline code</code>, <strong>strong</strong>, <em>emphasis</em>, <a className="link" href="#">link</a>, <mark>mark</mark>, <kbd>Command</kbd>+<kbd>K</kbd>가 섞인다.
          </p>
        </div>
      </Spec>
      <Spec label="Quote">
        <div className="prose">
          <blockquote>
            <p>"조림으로 사랑받았지만, 사실은 조림을 잘하는 척 해왔다."</p>
          </blockquote>
          <blockquote>
            <p><a className="link" href="#">Noline 앱 - App Store</a></p>
          </blockquote>
        </div>
      </Spec>
      <Spec label="Callout">
        <div className="prose">
          <div className="callout">
            <span className="ico">i</span>
            <div><p><strong>한 줄 요약.</strong> API의 표면적은 줄이고, 사용자의 결정 공간은 늘린다.</p></div>
          </div>
        </div>
      </Spec>
      <Spec label="Markdown QA">
        <Prose html={fixtureHtml} />
      </Spec>
    </SystemSection>
  );
}

function ComponentsSection() {
  return (
    <SystemSection id="components" num="04" title="Components">
      <Spec label="Article row">
        <p className={systemStyles.sysDesc}>production row는 Blog v2.html의 live 기본값인 aside variant만 싣는다.</p>
        <ArticleList posts={fixturePosts.slice(0, 4)} />
      </Spec>
      <Spec label="Post hero">
        <PostMeta post={examplePost} />
        <div className="post-hero" style={{ backgroundImage: `url(${examplePost.cover})`, marginBottom: 24 }} />
        <div className={systemStyles.sysPostTitleDemo}>{examplePost.title}</div>
      </Spec>
    </SystemSection>
  );
}

function PrinciplesSection() {
  return (
    <SystemSection id="principles" num="05" title="Principles">
      <ul className={systemStyles.sysPrinciples}>
        {principles.map(([title, body]) => (
          <li key={title}>
            <strong>{title}</strong>
            {body}
          </li>
        ))}
      </ul>
    </SystemSection>
  );
}

function SystemSection({ id, num, title, children }: Readonly<{ id: string; num: string; title: string; children: ReactNode }>) {
  return (
    <section className={systemStyles.sysSection} id={id}>
      <div className={systemStyles.sysSectionHead}>
        <span className={systemStyles.sysNum}>{num}</span>
        <h2 className={systemStyles.sysH2}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Spec({ label, children }: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <div className={systemStyles.sysSpec}>
      <div className={systemStyles.sysSpecLabel}>{label}</div>
      <div className={systemStyles.sysSpecBody}>{children}</div>
    </div>
  );
}

function Swatch({ name, value }: Readonly<{ name: string; value: string }>) {
  const isRule = name === "--rule" || name === "--rule-soft";
  const style = isRule
    ? ({ "--sys-rule-swatch": `var(${name})` } as CSSProperties)
    : ({ background: `var(${name})` } as CSSProperties);

  return (
    <div className={systemStyles.sysSwatch}>
      <div className={`${systemStyles.sysSwatchChip} ${isRule ? systemStyles.sysSwatchRule : ""}`} style={style} />
      <div>
        <div className={systemStyles.sysSwatchName}>{name}</div>
        <div className={systemStyles.sysSwatchValue}>{value}</div>
      </div>
    </div>
  );
}
