import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CSSProperties, ReactNode } from "react";
import { ArticleList } from "@/components/article-row/ArticleList";
import { PostMeta } from "@/components/post/PostParts";
import { Prose } from "@/components/prose/Prose";
import { Shell } from "@/components/shell/Shell";
import { getExampleArticle, getPosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import styles from "./system.module.css";

export const metadata = {
  title: "System"
};

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

export default async function SystemPage() {
  const posts = await getPosts();
  const example = await getExampleArticle();
  const fixturePath = path.join(process.cwd(), "design-system", "fixtures", "post-markdown-fixture.md");
  const fixtureRaw = await readFile(fixturePath, "utf8");
  const fixtureBody = fixtureRaw.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const fixtureHtml = await markdownToHtml(fixtureBody, { leadFirstParagraph: true });

  return (
    <Shell current="system" system>
      <main className={`view ${styles.sysPage}`}>
        <SystemHero />
        <ColorSection />
        <TypeSection />
        <ProseSection fixtureHtml={fixtureHtml} />
        <ComponentsSection posts={posts} example={example} />
        <PrinciplesSection />
      </main>
    </Shell>
  );
}

function SystemHero() {
  return (
    <section className={styles.sysHero}>
      <div className={styles.sysEyebrow}>Design System · v0.1</div>
      <h1 className={styles.sysH1}>디자인 시스템</h1>
      <p className={styles.sysLead}>
        Blog v2.html의 live shell 위에 System.html의 토큰, 타이포, prose primitive, component specimen을 올린 확인용 페이지입니다.
      </p>
      <nav className={styles.sysToc} aria-label="Sections">
        <a href="#color"><span className={styles.num}>01</span> Color</a>
        <a href="#type"><span className={styles.num}>02</span> Typography</a>
        <a href="#prose"><span className={styles.num}>03</span> Prose</a>
        <a href="#components"><span className={styles.num}>04</span> Components</a>
        <a href="#principles"><span className={styles.num}>05</span> Principles</a>
        <a href="/system/example-article/"><span className={styles.num}>View</span> Example Article</a>
      </nav>
    </section>
  );
}

function ColorSection() {
  return (
    <SystemSection id="color" num="01" title="Foundations · Color">
      <p className={styles.sysDesc}>잉크 톤은 따뜻한 오프-화이트와 잉크 블랙. 액센트는 올리브-그린 하나만 쓴다.</p>
      <h3 className={styles.sysH3}>Surface &amp; Ink</h3>
      <div className={`${styles.sysGrid} ${styles.cols4}`}>
        {surfaceTokens.map(([name, value]) => <Swatch key={name} name={name} value={value} />)}
      </div>
      <h3 className={styles.sysH3}>Accent</h3>
      <div className={`${styles.sysGrid} ${styles.cols3}`}>
        {accentTokens.map(([name, value]) => <Swatch key={name} name={name} value={value} />)}
      </div>
    </SystemSection>
  );
}

function TypeSection() {
  return (
    <SystemSection id="type" num="02" title="Foundations · Typography">
      <p className={styles.sysDesc}>한국어 본문은 Pretendard, 영문 보조 시리프는 Newsreader, 코드는 JetBrains Mono.</p>
      {typeSamples.map(([label, spec, text]) => (
        <div className={styles.sysType} key={label}>
          <div className={styles.sysTypeMeta}>
            <span>{label}</span>
            <span className={styles.sysTypeSpec}>{spec}</span>
          </div>
          <div className={styles.sysTypeSample}>{text}</div>
        </div>
      ))}
    </SystemSection>
  );
}

function ProseSection({ fixtureHtml }: Readonly<{ fixtureHtml: string }>) {
  return (
    <SystemSection id="prose" num="03" title="Prose · 본문 요소">
      <p className={styles.sysDesc}>상세 글에서 쓰이는 본문 요소를 fixture와 같은 renderer로 확인한다.</p>
      <Spec label="Inline">
        <div className="prose">
          <p>
            본문에는 <code>inline code</code>, <strong>strong</strong>, <em>emphasis</em>, <a className="link" href="#">link</a>, <mark>mark</mark>, <kbd>Command</kbd>+<kbd>K</kbd>가 섞인다.
          </p>
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

function ComponentsSection({ posts, example }: Readonly<{ posts: Awaited<ReturnType<typeof getPosts>>; example: Awaited<ReturnType<typeof getExampleArticle>> }>) {
  return (
    <SystemSection id="components" num="04" title="Components">
      <Spec label="Article row">
        <p className={styles.sysDesc}>production row는 Blog v2.html의 live 기본값인 aside variant만 싣는다.</p>
        <ArticleList posts={posts.slice(0, 3)} />
      </Spec>
      <Spec label="Post hero">
        <PostMeta post={example} />
        <div className="post-hero" style={{ backgroundImage: `url(${example.cover})`, marginBottom: 24 }} />
        <div className={styles.sysPostTitleDemo}>{example.title}</div>
      </Spec>
    </SystemSection>
  );
}

function PrinciplesSection() {
  return (
    <SystemSection id="principles" num="05" title="Principles">
      <ul className={styles.sysPrinciples}>
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
    <section className={styles.sysSection} id={id}>
      <div className={styles.sysSectionHead}>
        <span className={styles.sysNum}>{num}</span>
        <h2 className={styles.sysH2}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Spec({ label, children }: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <div className={styles.sysSpec}>
      <div className={styles.sysSpecLabel}>{label}</div>
      <div className={styles.sysSpecBody}>{children}</div>
    </div>
  );
}

function Swatch({ name, value }: Readonly<{ name: string; value: string }>) {
  const isRule = name === "--rule" || name === "--rule-soft";
  const style = isRule
    ? ({ "--sys-rule-swatch": `var(${name})` } as CSSProperties)
    : ({ background: `var(${name})` } as CSSProperties);

  return (
    <div className={styles.sysSwatch}>
      <div className={`${styles.sysSwatchChip} ${isRule ? styles.sysSwatchRule : ""}`} style={style} />
      <div>
        <div className={styles.sysSwatchName}>{name}</div>
        <div className={styles.sysSwatchValue}>{value}</div>
      </div>
    </div>
  );
}
