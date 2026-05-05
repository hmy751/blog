import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getPostBySlug, getPosts, siteConfig } from "./content.mjs";
import { escapeHtml, markdownToHtml } from "./markdown.mjs";

const siteRoot = fileURLToPath(new URL("..", import.meta.url));
const fixturePath = path.join(siteRoot, "design-system", "fixtures", "post-markdown-fixture.md");
const demoCovers = {
  olive: svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#eae5d4"/><rect x="0" y="0" width="160" height="200" fill="#7a8a4a" opacity=".5"/><rect x="200" y="40" width="80" height="120" fill="#4a5a2a" opacity=".8"/></svg>`),
  wave: svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200"><rect width="320" height="200" fill="#dde2ec"/><path d="M0,160 Q160,40 320,160" fill="none" stroke="#4a6da0" stroke-width="14" opacity=".7"/><path d="M0,180 Q160,80 320,180" fill="none" stroke="#2a3a60" stroke-width="6" opacity=".6"/></svg>`)
};

export async function renderUrl(pathname) {
  const posts = await getPosts();
  const pathOnly = normalizePath(pathname);

  if (pathOnly === "/") {
    return htmlShell({
      title: siteConfig.title,
      current: "home",
      body: homePage(posts)
    });
  }

  if (pathOnly === "/articles/") {
    return htmlShell({
      title: `Articles | ${siteConfig.title}`,
      current: "articles",
      body: articlesPage(posts)
    });
  }

  if (pathOnly.startsWith("/articles/")) {
    const slug = pathOnly.replace(/^\/articles\//, "").replace(/\/$/, "");
    const post = await getPostBySlug(slug);
    if (!post) return null;

    return htmlShell({
      title: `${post.title} | ${siteConfig.title}`,
      description: post.description,
      current: "articles",
      body: postPage(post, posts)
    });
  }

  if (pathOnly === "/note/") {
    return htmlShell({
      title: `Note | ${siteConfig.title}`,
      current: "note",
      body: notePage()
    });
  }

  if (pathOnly === "/about/") {
    return htmlShell({
      title: `About | ${siteConfig.title}`,
      current: "about",
      body: aboutPage(posts)
    });
  }

  if (pathOnly === "/system/") {
    return htmlShell({
      title: `System | ${siteConfig.title}`,
      current: "system",
      shellClass: "shell-system",
      body: await systemPage()
    });
  }

  return null;
}

export function routesForPosts(posts) {
  return [
    "/",
    "/articles/",
    "/note/",
    "/about/",
    "/system/",
    ...posts.map((post) => `/articles/${post.slug}/`)
  ];
}

function htmlShell({ title, description = siteConfig.description, current, body, shellClass = "" }) {
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="/design-system/styles/index.css">
  </head>
  <body data-motion="on" data-body-font="sans">
    <div class="shell${shellClass ? ` ${shellClass}` : ""}">
      <header class="top">
        <a class="brand" href="/" aria-label="${escapeHtml(siteConfig.title)} home">
          <span class="dot" aria-hidden="true"></span>
          <span>${escapeHtml(siteConfig.title)}</span>
        </a>
        <nav class="nav" aria-label="Primary navigation">
          ${navLink("/articles/", "Articles", current === "articles")}
          ${navLink("/note/", "Note", current === "note")}
          ${navLink("/about/", "About", current === "about")}
        </nav>
      </header>
      ${body}
      <footer class="foot">
        <span>Blog / ${new Date().getFullYear()}</span>
        <span class="links">
          <a href="/system/">System</a>
          <a href="/articles/">Archive</a>
        </span>
      </footer>
    </div>
  </body>
</html>`;
}

function homePage(posts) {
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const visibleFeatured = featured.length ? featured : posts.slice(0, 3);
  const featuredSlugs = new Set(visibleFeatured.map((post) => post.slug));
  const recent = posts.filter((post) => !featuredSlugs.has(post.slug)).slice(0, 6);

  return `<main class="view">
    <p class="home-intro">
      ${escapeHtml(siteConfig.intro[0])}<br>
      <span class="muted">${escapeHtml(siteConfig.intro[1])}</span><br>
      <span class="muted">${escapeHtml(siteConfig.intro[2])}</span>
    </p>

    <section class="featured" aria-labelledby="featured-title">
      <div class="section-label" id="featured-title">Featured</div>
      <div class="article-list" data-thumb="aside">
        ${visibleFeatured.map((post) => articleRow(post)).join("\n")}
      </div>
    </section>

    <section aria-labelledby="recent-title">
      <div class="section-label" id="recent-title">Recent</div>
      <div class="article-list" data-thumb="aside">
        ${recent.map((post) => articleRow(post, { compact: true })).join("\n")}
      </div>
      <p class="more-link"><a class="link" href="/articles/">모든 글 보기 →</a></p>
    </section>
  </main>`;
}

function articlesPage(posts) {
  const byYear = Map.groupBy(posts, (post) => post.year);
  const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a));

  return `<main class="view">
    <h1 class="page-title">Articles</h1>
    <p class="page-sub">총 ${posts.length}편의 글. 최신 순.</p>
    ${years.map((year) => `<section class="year-block" aria-labelledby="year-${year}">
      <div class="year" id="year-${year}">${year}</div>
      <div class="article-list" data-thumb="aside">
        ${byYear.get(year).map((post) => articleRow(post, { dateFormat: "mmdd" })).join("\n")}
      </div>
    </section>`).join("\n")}
  </main>`;
}

function postPage(post, posts) {
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const next = posts[currentIndex + 1] || posts[0];
  const subtitle = post.descriptionSource === "frontmatter" && post.description
    ? `<p class="post-sub">${escapeHtml(post.description)}</p>`
    : "";

  return `<main class="view">
    <article>
      <div class="post-meta">
        <span class="tag">${escapeHtml(post.primaryTag)}</span>
        <span class="sep">·</span>
        <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.dateText)}</time>
        ${post.readTime ? `<span class="sep">·</span><span>${escapeHtml(post.readTime)}</span>` : ""}
      </div>
      ${post.cover ? `<div class="post-hero" style="background-image:url('${escapeAttribute(post.cover)}')" aria-hidden="true"></div>` : ""}
      <h1 class="post-title">${escapeHtml(post.title)}</h1>
      ${subtitle}
      <div class="prose">
        ${markdownToHtml(post.body, { leadFirstParagraph: true })}
      </div>
      <footer class="post-footer">
        <a class="link" href="/articles/">← Articles</a>
        ${next ? `<a class="next" href="/articles/${escapeAttribute(next.slug)}/"><span>${escapeHtml(next.title)}</span><span aria-hidden="true">→</span></a>` : ""}
      </footer>
    </article>
  </main>`;
}

function notePage() {
  return `<main class="view">
    <h1 class="page-title">Note</h1>
    <p class="page-sub">짧은 메모 source가 붙으면 이 화면에 시간순으로 들어옵니다.</p>
    <div class="notes">
      <div class="note">
        <div class="when">empty</div>
        <div class="body">아직 site 전용 note source는 연결하지 않았습니다.</div>
      </div>
    </div>
  </main>`;
}

function aboutPage(posts) {
  const years = [...new Set(posts.map((post) => post.year))].sort();
  const tags = [...new Set(posts.flatMap((post) => post.tags.slice(0, 2)))].slice(0, 8);

  return `<main class="view">
    <h1 class="page-title">About</h1>
    <p class="page-sub">구현과 글쓰기 사이에서 생긴 판단을 차분히 기록합니다.</p>
    <dl class="about-grid">
      <dt>Writer</dt>
      <dd>${escapeHtml(siteConfig.author)}</dd>
      <dt>Focus</dt>
      <dd>${tags.map(escapeHtml).join(", ")}</dd>
      <dt>Archive</dt>
      <dd><span class="yr">${escapeHtml(years[0] || "")}-${escapeHtml(years.at(-1) || "")}</span>${posts.length} posts</dd>
    </dl>
  </main>`;
}

async function systemPage() {
  const fixture = await readFile(fixturePath, "utf8");
  const body = fixture.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const fixtureHtml = markdownToHtml(body, { leadFirstParagraph: true });

  return `<main class="view sys-page">
    ${systemHero()}
    ${systemColorSection()}
    ${systemTypeSection()}
    ${systemSpaceSection()}
    ${systemProseSection(fixtureHtml)}
    ${systemComponentsSection()}
    ${systemPrinciplesSection()}
  </main>`;
}

function systemHero() {
  return `<section class="sys-hero">
    <div class="sys-eyebrow">Design System · v0.1</div>
    <h1 class="sys-h1">디자인 시스템</h1>
    <p class="sys-lead">
      Blog v2.html의 live shell 위에 System.html의 토큰, 타이포, prose primitive, component specimen을 올린 확인용 페이지입니다.
      원본 archive를 매번 다시 훑지 않아도 구현 기준면을 바로 볼 수 있게 둡니다.
    </p>
    <nav class="sys-toc" aria-label="Sections">
      <a href="#color"><span class="n">01</span> Color</a>
      <a href="#type"><span class="n">02</span> Typography</a>
      <a href="#space"><span class="n">03</span> Space &amp; Radius</a>
      <a href="#prose"><span class="n">04</span> Prose</a>
      <a href="#components"><span class="n">05</span> Components</a>
      <a href="#principles"><span class="n">06</span> Principles</a>
    </nav>
  </section>`;
}

function systemColorSection() {
  const surface = [
    ["--bg", "page"],
    ["--surface", "code, kbd, callout"],
    ["--ink", "primary text"],
    ["--ink-2", "body"],
    ["--ink-3", "muted"],
    ["--ink-4", "caption / meta"],
    ["--rule", "hairline"],
    ["--rule-soft", "hairline / soft"]
  ];
  const accent = [
    ["--accent", "olive / oklch(.58 .13 140)"],
    ["--accent-soft", "accent / 16%"],
    ["--accent-ink", "link / tag"]
  ];

  return `<section class="sys-sec" id="color">
    <div class="sys-sec-head">
      <span class="sys-num">01</span>
      <h2 class="sys-h2">Foundations · Color</h2>
    </div>
    <p class="sys-desc">잉크 톤은 따뜻한 오프-화이트와 잉크 블랙. 액센트는 한 가지, 올리브-그린.</p>
    <h3 class="sys-h3">Surface &amp; Ink</h3>
    <div class="sys-grid sys-grid-4">
      ${surface.map(([name, value]) => systemSwatch(name, value)).join("\n")}
    </div>
    <h3 class="sys-h3">Accent</h3>
    <div class="sys-grid sys-grid-3">
      ${accent.map(([name, value]) => systemSwatch(name, value)).join("\n")}
    </div>
  </section>`;
}

function systemTypeSection() {
  const samples = [
    ["Display / post-title", "36px / 600 / -0.028em / 1.2", "font-size:36px;font-weight:600;letter-spacing:-0.028em;line-height:1.2;", "좋은 컴포넌트는 무엇을 숨겨야 하는가"],
    ["H1 / page-title", "32px / 600 / -0.025em / 1.25", "font-size:32px;font-weight:600;letter-spacing:-0.025em;line-height:1.25;", "디자인 시스템"],
    ["H2 / section", "21px / 600 / -0.025em / 1.35", "font-size:21px;font-weight:600;letter-spacing:-0.025em;line-height:1.35;", "섹션 제목은 본문보다 한 단계 위"],
    ["H3 / subsection", "17px / 600 / -0.005em / 1.4", "font-size:17px;font-weight:600;letter-spacing:-0.005em;line-height:1.4;", "내부 구조를 나누는 작은 제목"],
    ["Body / prose", "17px / 400 / -0.005em / 1.75", "font-size:17px;font-weight:400;letter-spacing:-0.005em;line-height:1.75;", "본문은 17px, line-height 1.75. 한 화면에 들어오는 분량보다 한 호흡에 읽히는 분량이 더 중요하다."],
    ["Body / serif", "17px / 400 / 0 / 1.8", "font-family:var(--serif);font-size:17px;font-weight:400;letter-spacing:0;line-height:1.8;", "Sometimes a serif body reads better. The choice is intentional, not decorative."],
    ["Caption / meta", "12px / 500 / 0.04em / 1.4", "font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:0.04em;line-height:1.4;", "2026.04.20 · 9 MIN READ"],
    ["Section label", "11px / 500 / 0.14em / 1.4", "font-size:11px;font-weight:500;letter-spacing:0.14em;line-height:1.4;text-transform:uppercase;", "FEATURED"]
  ];

  return `<section class="sys-sec" id="type">
    <div class="sys-sec-head">
      <span class="sys-num">02</span>
      <h2 class="sys-h2">Foundations · Typography</h2>
    </div>
    <p class="sys-desc">한국어 본문은 Pretendard, 영문 보조 시리프는 Newsreader, 코드는 JetBrains Mono.</p>
    ${samples.map(([label, spec, style, text]) => systemTypeSample(label, spec, style, text)).join("\n")}
  </section>`;
}

function systemSpaceSection() {
  const spacing = [4, 8, 12, 16, 24, 32, 48, 56, 72, 96];
  const radius = [0, 3, 4, 6, 8];

  return `<section class="sys-sec" id="space">
    <div class="sys-sec-head">
      <span class="sys-num">03</span>
      <h2 class="sys-h2">Foundations · Space &amp; Radius</h2>
    </div>
    <p class="sys-desc">스케일은 4의 배수에서 출발해 시각적으로 필요한 값만 더한다.</p>
    <h3 class="sys-h3">Spacing</h3>
    <div class="sys-spacing">
      ${spacing.map((value) => `<div class="sys-sp"><div class="sys-sp-bar" style="width:${value}px"></div><span class="sys-sp-lbl">${value}px</span></div>`).join("\n")}
    </div>
    <h3 class="sys-h3">Radius</h3>
    <div class="sys-radius">
      ${radius.map((value) => `<div class="sys-rd"><div class="sys-rd-box" style="border-radius:${value}px"></div><span>${value}px</span></div>`).join("\n")}
    </div>
  </section>`;
}

function systemProseSection(fixtureHtml) {
  return `<section class="sys-sec" id="prose">
    <div class="sys-sec-head">
      <span class="sys-num">04</span>
      <h2 class="sys-h2">Prose · 본문 요소</h2>
    </div>
    <p class="sys-desc">글 상세 페이지에서 쓰이는 모든 본문 요소의 표준 형태. 아래 specimen은 System.html의 요소와 Markdown renderer fixture를 같이 확인한다.</p>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Inline</div>
      <div class="prose sys-spec-body">
        <p>
          본문에는 <code>inline code</code>, <strong>strong</strong>, <em>emphasis</em>,
          <a class="link" href="#">link</a>, <mark>mark</mark>,
          <kbd>Command</kbd>+<kbd>K</kbd> 같은 인라인 요소가 자연스럽게 섞일 수 있다.
          참조 표시 <sup class="fn-ref">1</sup>도 같은 방식으로 작동한다.
        </p>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Headings</div>
      <div class="prose sys-spec-body">
        <h2>2. 변경의 자유도</h2>
        <p>오늘 바꾸기 쉬운 코드보다 다음 분기에도 바꾸기 쉬운 코드가 좋은 코드다.</p>
        <h3>체크리스트</h3>
        <p>작은 제목은 섹션 내부의 판단 단위를 나눌 때만 쓴다.</p>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Blockquote</div>
      <div class="prose sys-spec-body">
        <blockquote>추상화는 비용이다. 그 비용을 지불할 이유가 분명할 때만 추상화한다.</blockquote>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Lists</div>
      <div class="prose sys-spec-body">
        <ul>
          <li>의도가 분명한 prop 이름</li>
          <li>합리적인 기본값
            <ul>
              <li>기본값이 곧 가장 자주 쓰는 형태</li>
              <li>기본값을 바꾸지 않아도 대부분의 케이스가 해결</li>
            </ul>
          </li>
          <li>관련된 prop은 객체로 묶지 않는다</li>
        </ul>
        <ol>
          <li>한 문장으로 책임을 적는다</li>
          <li>그 문장에 들어가지 않는 후보를 표시한다</li>
          <li>합치거나, 떼어내거나, 사용자에게 돌려준다</li>
        </ol>
        <ul class="task">
          <li class="done">기본값으로 합리적인 결과가 나오는가</li>
          <li>두 prop이 서로의 존재에 의존하지 않는가</li>
        </ul>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Code block</div>
      <div class="prose sys-spec-body">
        <div class="code-block">
          <div class="filename"><span class="lang">tsx</span><span>components/Button.tsx</span></div>
<pre><code><span class="tk-k">type</span> <span class="tk-t">ButtonProps</span> = {
  <span class="tk-f">tone</span>?: <span class="tk-s">'neutral'</span> | <span class="tk-s">'accent'</span>;
  <span class="tk-f">children</span>: <span class="tk-t">ReactNode</span>;
};</code></pre>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Callout · info</div>
      <div class="prose sys-spec-body">
        <div class="callout">
          <span class="ico">i</span>
          <div><p><strong>한 줄 요약.</strong> API의 표면적은 줄이고, 사용자의 결정 공간은 늘린다.</p></div>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Callout · warn</div>
      <div class="prose sys-spec-body">
        <div class="callout warn">
          <span class="ico">!</span>
          <div><p><strong>주의.</strong> children으로 모든 걸 받는 컴포넌트는 자유로운 만큼 일관성이 깨지기 쉽다.</p></div>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Table</div>
      <div class="prose sys-spec-body">
        <table>
          <thead><tr><th>관점</th><th>Props 중심</th><th>Slot 중심</th></tr></thead>
          <tbody>
            <tr><td>러닝 커브</td><td>낮다</td><td>중간</td></tr>
            <tr><td>장기 변경 비용</td><td>높다</td><td>낮다</td></tr>
            <tr><td>커스텀 가능성</td><td>제한적</td><td>거의 무제한</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Figure</div>
      <div class="prose sys-spec-body">
        <figure>
          <div class="img-ph">component anatomy diagram</div>
          <figcaption>그림 1. 컴포넌트의 외부 인터페이스와 내부 책임의 경계.</figcaption>
        </figure>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Footnote</div>
      <div class="prose sys-spec-body">
        <div class="footnotes">
          <ol>
            <li>일반적으로 prop 수가 7-8개를 넘어가면 책임이 둘 이상 섞여 있을 가능성이 높다.</li>
          </ol>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Divider</div>
      <div class="prose sys-spec-body"><hr></div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Markdown QA</div>
      <div class="prose sys-spec-body">
        ${fixtureHtml}
      </div>
    </div>
  </section>`;
}

function systemComponentsSection() {
  return `<section class="sys-sec" id="components">
    <div class="sys-sec-head">
      <span class="sys-num">05</span>
      <h2 class="sys-h2">Components</h2>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Article row</div>
      <div class="sys-spec-body">
        <p class="sys-desc">System.html의 component specimen. 썸네일이 있는 글과 없는 글이 같은 리스트 안에서 공존한다.</p>
        <div class="article-list" data-thumb="system-demo">
          <a class="row" href="#" onclick="event.preventDefault()">
            <div>
              <div class="article-title">좋은 컴포넌트는 무엇을 숨겨야 하는가</div>
              <span class="article-desc">API의 표면적은 줄이고, 변경의 자유도는 늘린다.</span>
            </div>
            <div class="meta-col">
              <div class="cv" ${backgroundStyle(demoCovers.olive)}></div>
              <div class="meta">04.20</div>
            </div>
          </a>
          <a class="row no-thumb" href="#" onclick="event.preventDefault()">
            <div>
              <div class="article-title">인터페이스는 결국 문서다</div>
              <span class="article-desc">이력서의 가독성과 제품의 가독성은 같은 문제를 본다.</span>
            </div>
            <div class="meta">01.18</div>
          </a>
          <a class="row" href="#" onclick="event.preventDefault()">
            <div>
              <div class="article-title">React Server Components를 이해하며 바뀐 생각</div>
              <span class="article-desc">서버에서 끝나는 컴포넌트와, 클라이언트에서 시작하는 컴포넌트의 경계.</span>
            </div>
            <div class="meta-col">
              <div class="cv" ${backgroundStyle(demoCovers.wave)}></div>
              <div class="meta">03.11</div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Live aside</div>
      <div class="sys-spec-body">
        <p class="sys-desc">Blog v2.html에서 실제 live 기본값으로 채택한 aside variant. production row는 56x42 썸네일을 쓴다.</p>
        <div class="article-list" data-thumb="aside">
          <a class="row" href="#" onclick="event.preventDefault()">
            <div>
              <div class="article-title">좋은 컴포넌트는 무엇을 숨겨야 하는가</div>
              <span class="article-desc">API의 표면적은 줄이고, 변경의 자유도는 늘린다.</span>
            </div>
            <time class="meta" datetime="2026-04-20">04.20</time>
            <div class="cv has-img" ${backgroundStyle(demoCovers.olive)}></div>
          </a>
          <a class="row no-thumb" href="#" onclick="event.preventDefault()">
            <div>
              <div class="article-title">Headless UI를 다시 생각하기</div>
              <span class="article-desc">패턴을 드러내되 구현은 숨기는 방법.</span>
            </div>
            <time class="meta" datetime="2026-10-21">10.21</time>
            <div class="cv-spacer" aria-hidden="true"></div>
          </a>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Post hero</div>
      <div class="sys-spec-body">
        <p class="sys-desc">상세 글의 cover는 post-meta 아래, post-title 위에 16:8 비율로 들어간다. cover가 없는 글은 hero를 생략한다.</p>
        <div>
          <div class="post-meta" style="margin-bottom:24px;">
            <span class="tag">React</span>
            <span class="sep">·</span>
            <span>2026.03.11</span>
            <span class="sep">·</span>
            <span>14 min read</span>
          </div>
          <div class="post-hero" style="background-image:url('${escapeAttribute(demoCovers.wave)}');margin-bottom:24px;"></div>
          <div class="sys-post-title-demo">React Server Components를 이해하며 바뀐 생각</div>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Year header</div>
      <div class="sys-spec-body">
        <div class="year">2026</div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Post meta</div>
      <div class="sys-spec-body">
        <div class="post-meta">
          <span class="tag">Frontend</span>
          <span class="sep">·</span>
          <span>2026.04.20</span>
          <span class="sep">·</span>
          <span>9 min read</span>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">Note item</div>
      <div class="sys-spec-body">
        <div class="note" style="border-bottom:0;padding:0;">
          <div class="when">2026.04.28</div>
          <div class="body">짧은 메모는 글이 되기 전 단계의 사고. 트윗과 글 사이.</div>
        </div>
      </div>
    </div>

    <div class="sys-spec">
      <div class="sys-spec-lbl">DL grid</div>
      <div class="sys-spec-body">
        <dl class="about-grid" style="margin-top:0;">
          <dt>Now</dt><dd><span class="yr">2024-</span> Frontend, 어떤 회사</dd>
          <dt>GitHub</dt><dd><a class="link" href="#">@myeongyeon</a></dd>
        </dl>
      </div>
    </div>
  </section>`;
}

function systemPrinciplesSection() {
  const principles = [
    ["덜어낸다.", "카드, 그림자, 배지를 먼저 의심한다."],
    ["액센트는 하나.", "올리브-그린 외에는 색을 쓰지 않는다."],
    ["밀도는 일관되게.", "본문은 17px, line-height 1.75. 한 번 정한 값을 흔들지 않는다."],
    ["경계는 얇게.", "0.5px hairline. shadow 대신 rule을 쓴다."],
    ["모션은 미세하게.", "호버 시 4px 이내, 150ms 이내."]
  ];

  return `<section class="sys-sec" id="principles">
    <div class="sys-sec-head">
      <span class="sys-num">06</span>
      <h2 class="sys-h2">Principles</h2>
    </div>
    <ul class="sys-principles">
      ${principles.map(([title, body]) => `<li><strong>${escapeHtml(title)}</strong>${escapeHtml(body)}</li>`).join("\n")}
    </ul>
  </section>`;
}

function systemSwatch(name, value) {
  return `<div class="sys-sw">
    <div class="sys-sw-chip" style="background:var(${escapeAttribute(name)});"></div>
    <div class="sys-sw-meta">
      <div class="sys-sw-name">${escapeHtml(name)}</div>
      <div class="sys-sw-val">${escapeHtml(value)}</div>
    </div>
  </div>`;
}

function systemTypeSample(label, spec, style, text) {
  return `<div class="sys-type">
    <div class="sys-type-meta"><span>${escapeHtml(label)}</span><span class="sys-type-spec">${escapeHtml(spec)}</span></div>
    <div class="sys-type-sample" style="${escapeAttribute(style)}">${escapeHtml(text)}</div>
  </div>`;
}

function backgroundStyle(image) {
  return `style="background-image:url('${escapeAttribute(image)}')"`;
}

function svgData(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function articleRow(post, options = {}) {
  const dateText = options.dateFormat === "mmdd" ? post.dateShort : post.dateText.slice(2);
  const description = options.compact ? "" : `<span class="article-desc">${escapeHtml(post.description)}</span>`;
  const cover = post.cover
    ? `<div class="cv has-img" style="background-image:url('${escapeAttribute(post.cover)}')" aria-hidden="true"></div>`
    : `<div class="cv-spacer" aria-hidden="true"></div>`;

  return `<a class="row${post.cover ? "" : " no-thumb"}" href="/articles/${escapeAttribute(post.slug)}/">
    <div>
      <div class="article-title">${escapeHtml(post.title)}</div>
      ${description}
    </div>
    <time class="meta" datetime="${escapeHtml(post.date)}">${escapeHtml(dateText)}</time>
    ${cover}
  </a>`;
}

function navLink(href, label, active) {
  return `<a href="${href}"${active ? " aria-current=\"page\"" : ""}>${label}</a>`;
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}
