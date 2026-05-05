import { getPostBySlug, getPosts, siteConfig } from "./content.mjs";
import { escapeHtml, markdownToHtml } from "./markdown.mjs";

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

  return null;
}

export function routesForPosts(posts) {
  return [
    "/",
    "/articles/",
    "/note/",
    "/about/",
    ...posts.map((post) => `/articles/${post.slug}/`)
  ];
}

function htmlShell({ title, description = siteConfig.description, current, body }) {
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
    <div class="shell">
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

function postPage(post, posts, options = {}) {
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const next = Object.hasOwn(options, "next")
    ? options.next
    : posts[currentIndex + 1] || posts[0];
  const backHref = options.backHref || "/articles/";
  const backLabel = options.backLabel || "← Articles";
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
        <a class="link" href="${escapeAttribute(backHref)}">${escapeHtml(backLabel)}</a>
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
