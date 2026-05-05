# Design Contract

이 문서는 `../design-system/reference/blog-design` archive를 실제 사이트 구현 기준으로 번역한다. 디자인 archive는 read-only source이고, 구현 기준은 이 문서가 소유한다.

production CSS source는 `../src/styles/`와 component CSS Modules에 둔다. `../design-system/styles/`는 reference-derived legacy/system preview source로 유지하되, production App Router 전역 stylesheet로 import하지 않는다.

## Source Reading

원본 archive:

1. `../design-system/reference/blog-design/manifest.json` — 보존된 원본 목록, 우선순위, checksum.
2. `../design-system/reference/blog-design/notes/source-map.md` — line-level source map.
3. `../design-system/reference/blog-design/source/*.html` — Claude Design 원본.

우선순위:

1. `../design-system/reference/blog-design/source/Blog v2.html` — live site의 화면/컴포넌트 기준.
2. `../design-system/reference/blog-design/source/System.html` — token, typography, prose primitive 기준.
3. `../design-system/reference/blog-design/source/tweaks-panel.jsx` — prototype parameter space 복원용. production runtime에는 넣지 않는다.
4. `../design-system/reference/blog-design/uploads/draw-*.png` — 피드백/주석 이미지. production asset으로 쓰지 않는다.
5. `../design-system/reference/blog-design/source/Blog.html` — v1 prototype. 새 구현 기준으로 쓰지 않는다.

충돌하면 `Blog v2.html`을 우선한다. `System.html`은 live 화면이 아니라 디자인 시스템 문서라서 component demo 값이 더 크거나 넓을 수 있다.

`screenshots/` snapshot은 archive에 가져오지 않는다. 이전 `home.png`, `home2.png`는 상단부만 남은 stale image라 기준으로 쓰지 않는다.

## Product Shape

사이트는 marketing page가 아니라 문서형 개발 블로그다.

- 첫 화면은 brand, nav, intro, featured/recent article list가 중심이다.
- 큰 hero, floating card, 장식 gradient, 두꺼운 shadow를 쓰지 않는다.
- 얇은 rule, 넓은 여백, 좁은 measure, prose 품질이 시각 정체성이다.
- nav는 `Articles`, `Note`, `About` 세 개로 시작한다.

## Reference Invariants

원본에서 그대로 보존해야 하는 구조:

- `Blog v2.html`의 shell/top/nav/footer class contract: `.shell`, `.top`, `.brand`, `.dot`, `nav.nav`, `footer.foot`.
- `Blog v2.html`의 home sequence: intro -> `Featured` -> `Recent` -> all articles link.
- `Blog v2.html`의 post sequence: `.post-meta` -> optional `.post-hero` -> `.post-title` -> optional `.post-sub` -> `.prose` -> `.post-footer`.
- `System.html`의 code filename DOM order: `<span class="lang">tsx</span><span>components/Button.tsx</span>`.
- `System.html`의 prose primitive coverage: inline, heading, quote, list, task list, code block, callout, table, figure, footnote.

구현에서 바꿔도 되는 것:

- prototype sample `SITE`, `ARTICLES`, `NOTES` data. 실제 앱은 `content/posts`와 site config를 쓴다.
- React in-browser route state. 실제 앱은 static route generation을 쓴다.
- `tweaks-panel.jsx` runtime. default 값만 contract로 보존한다.

## Foundation Tokens

초기 구현 기본값은 `Blog v2.html`의 tweak default를 고정값으로 옮긴다.

```text
theme: light
bodyFont: sans
measure: 680px
fontSize: 17px
accentHue: 140
density: regular
motion: true
thumbStyle: aside
```

색:

```css
--bg: #f7f5ef;
--surface: #f3f0e8;
--ink: #1a1a17;
--ink-2: #3a3833;
--ink-3: #6b6960;
--ink-4: #9a978c;
--rule: rgba(26,26,23,.10);
--rule-soft: rgba(26,26,23,.06);
--accent: oklch(0.58 0.13 140);
--accent-soft: oklch(0.58 0.13 140 / .16);
--accent-ink: oklch(0.44 0.12 140);
```

dark tokens는 CSS foundation에는 포함하되, live UI theme toggle은 첫 구현 범위에서 제외해도 된다.

폰트:

- Sans: `Pretendard Variable`, Pretendard, system sans.
- Serif: `Newsreader`, ui-serif, Georgia. 초기 body default는 sans다.
- Mono: `JetBrains Mono`, ui-monospace, Menlo.

레이아웃:

- `.shell`: `max-width: calc(var(--measure) + 96px)`, `padding: 56px 48px 160px`.
- mobile `<=720px`: `padding: 40px 22px 120px`.
- prose max-width는 `680px`. `System.html`의 `760px`는 system page 전용 값으로 본다.

## Core Screens

### Home

구성:

1. top bar
2. intro paragraph
3. `Featured`
4. `Recent`
5. footer

데이터:

- `Featured`: frontmatter `featured: true`가 있으면 최신순 3개. 없으면 최신 3개를 임시 featured로 쓴다.
- `Recent`: 최신순 6개. 임시 featured와 중복되면 제외한다.
- `description`이 없으면 첫 본문 paragraph에서 list excerpt를 만든다.

### Articles

- 모든 글을 최신순으로 정렬한다.
- 연도별로 group한다.
- 연도 header는 mono 12px, hairline bottom rule.
- row date는 `MM.DD` 형식으로 표시한다.

### Post

- meta: primary tag, date, readTime.
- `cover`가 있으면 post hero를 title 위에 `16:8` 비율로 표시한다.
- `description`이 있으면 `post-sub`로 표시한다.
- `description`이 없고 첫 paragraph에서 excerpt를 생성한 경우, post page에서는 subtitle을 생략해 본문과 중복시키지 않는다.
- Markdown renderer는 frontmatter title과 같은 첫 H1을 화면에서 제거한다.

### Note

초기 구현에서 실제 데이터 source가 없으면 `Note` route는 placeholder가 아니라 `notes` content source를 나중에 붙일 수 있는 정적 list component로 만든다. 데이터가 없을 때는 빈 상태를 조용히 보여준다.

### About

`dl.about-grid` 패턴을 사용한다. 실제 profile/contact 값은 site config에서 관리한다.

## Article Row Contract

`Blog v2.html`의 기본 variant인 `aside`를 live 기본값으로 채택한다.

- row grid: `1fr auto auto`
- title/description left, date right, thumbnail far-right
- cover size: `56px × 42px`
- no-cover row는 `56px × 42px` spacer를 둬 컬럼 정렬을 유지한다.
- hover: row padding-left `8px`, title color `--accent-ink`.

채택하지 않는 초기 variants:

- `leading`, `inline`, `magazine`, `peek`는 fixture에 보존된 실험 옵션이다.
- tweak panel UI는 production에 넣지 않는다.
- `System.html`의 article row `88px × 66px`는 system demo 값이다. live list에는 쓰지 않는다.

모바일에서는 `aside`가 좁으면 우선 text-only fallback을 둔다.

```css
@media (max-width: 560px) {
  .article-list[data-thumb="aside"] a.row {
    grid-template-columns: 1fr 64px;
  }
  .article-list[data-thumb="aside"] .cv,
  .article-list[data-thumb="aside"] .cv-spacer {
    display: none;
  }
}
```

## Prose Contract

Markdown 본문은 `Blog v2.html`의 prose CSS를 기준으로 하고, `System.html`의 prose examples로 QA한다.

구체적인 Markdown transform 규칙은 `MARKDOWN_CONTRACT.md`를 따른다.

필수 지원:

- paragraph, lead paragraph
- h1/h2/h3, plus compact h4 for existing post compatibility
- unordered/ordered list
- task list
- blockquote
- inline code, code fence
- code block filename convention
- table with horizontal overflow wrapper
- kbd
- mark
- footnote/sup ref
- figure/image/caption
- callout info/warn

callout과 code filename은 Markdown convention으로 정의한다. 원고에 임의 HTML을 늘리는 방식으로 맞추지 않는다.

권장 매핑:

- `> [!NOTE]` 또는 `:::note` -> `.callout`
- `> [!WARNING]` 또는 `:::warn` -> `.callout.warn`
- code fence meta ` ```tsx title="components/Button.tsx"` -> `.code-block .filename`
- Markdown image 다음 italic paragraph 또는 explicit caption syntax -> `figure > figcaption`

넓은 table/code는 mobile에서 horizontal scroll을 제공한다.

## Motion

- view fade: `0.42s cubic-bezier(.2,.7,.2,1)`, `translateY(8px)`.
- article row cascade: `0.5s`, 40ms 단위 stagger.
- note row cascade도 동일하게 적용한다.
- `prefers-reduced-motion: reduce`와 `data-motion="off"`를 지원한다.
- production에 tweak panel은 넣지 않는다.

## Data Adapter

현재 `content/posts`는 `description`, `cover`, `featured`가 거의 없다. 사이트 adapter가 fallback을 제공하고, 원고를 자동 수정하지 않는다.

필드 매핑:

| Site field | Source |
| --- | --- |
| `title` | frontmatter `title` |
| `date` | frontmatter `date` |
| `readTime` | frontmatter `readTime` |
| `tags` | frontmatter `tags` |
| `primaryTag` | `tags[0]`, 없으면 `project`, `category`, 마지막 fallback `Blog` |
| `description` | frontmatter `description`, 없으면 첫 본문 paragraph excerpt |
| `cover` | frontmatter `cover`, 없으면 undefined |
| `featured` | frontmatter `featured`, 없으면 false |
| `slug` | filename `YYYY-MM-DD-slug.md`의 slug |
| `year` | frontmatter date year |

cover가 없는 글에 임의 이미지를 frontmatter로 쓰지 않는다. 목록 row는 no-cover 상태를 지원하고, OG 이미지는 site-level default를 쓴다.

## Implementation Notes

현재 scaffold 기준:

1. token/base/prose CSS는 `site/src/styles/`가 production 전역 source다.
2. `src/lib/posts.ts`가 `content/posts` adapter를 소유한다.
3. `src/app/**`와 `src/components/**`가 Shell, top nav, home/articles/post/note/about DOM contract를 렌더링한다.
4. `src/lib/markdown.ts`가 Markdown extension transform을 소유한다.
5. `src/render.mjs`의 system helper는 `dev:system`/`build:system` local-only preview에만 남긴다.
6. Note/About은 site config나 별도 content source가 생기면 실제 데이터에 붙인다.
7. desktop/mobile screenshot regression을 붙인다.

## Non Goals

- `tweaks-panel.jsx`를 production runtime에 포함하지 않는다.
- prototype의 sample `SITE`, `ARTICLES`, `NOTES` 문장을 실제 콘텐츠로 쓰지 않는다.
- design fixture를 수정하지 않는다.
- editorial voice나 글쓰기 workflow를 디자인 규칙으로 바꾸지 않는다.
- 사이트 미감을 맞추기 위해 원고 구조를 임의 HTML 중심으로 바꾸지 않는다.
