# Design Contract

이 문서는 현재 production CSS/component와 Storybook 카탈로그를 기준으로 사이트 디자인 계약을 설명한다. `../archive/design-system/reference/blog-design` archive는 원형 판단을 복원하기 위한 read-only evidence이고, 현재 구현 기준 자체가 아니다.

production CSS source는 `../src/styles/`와 component CSS Modules에 둔다. `../archive/design-system/styles/`는 reference-derived legacy/archive source로 유지하되, production App Router 전역 stylesheet로 import하지 않는다. local-only system preview는 `../system-preview`에서 production CSS와 components를 다시 import한다.

## Source Reading

현재 확인 순서:

1. `../src/styles/`와 component CSS Modules — production CSS source.
2. `../src/stories/`와 `../.storybook/` — current design system catalog.
3. `../system-preview/` — local-only route-level integration QA.
4. `../archive/design-system/reference/blog-design` — original design evidence.

원본 archive:

1. `../archive/design-system/reference/blog-design/manifest.json` — 보존된 원본 목록, 우선순위, checksum.
2. `../archive/design-system/reference/blog-design/notes/source-map.md` — line-level source map.
3. `../archive/design-system/reference/blog-design/source/*.html` — Claude Design 원본.

우선순위:

1. `../archive/design-system/reference/blog-design/source/Blog v2.html` — live prototype evidence.
2. `../archive/design-system/reference/blog-design/source/System.html` — token, typography, prose primitive evidence.
3. `../archive/design-system/reference/blog-design/source/tweaks-panel.jsx` — prototype parameter space 복원용. production runtime에는 넣지 않는다.
4. `../archive/design-system/reference/blog-design/uploads/draw-*.png` — 피드백/주석 이미지. production asset으로 쓰지 않는다.
5. `../archive/design-system/reference/blog-design/source/Blog.html` — v1 prototype. 새 구현 기준으로 쓰지 않는다.

원본 archive 안에서 충돌하면 `Blog v2.html`을 우선한다. `System.html`은 live 화면이 아니라 디자인 시스템 문서라서 component demo 값이 더 크거나 넓을 수 있다. current production과 archive가 충돌하면 production code와 Storybook을 먼저 확인한다.

`screenshots/` snapshot은 archive에 가져오지 않는다. 이전 `home.png`, `home2.png`는 상단부만 남은 stale image라 기준으로 쓰지 않는다. `../archive/design-system/styles/`도 현재 CSS source가 아니라 legacy renderer snapshot으로 본다.

## Product Shape

사이트는 marketing page가 아니라 문서형 개발 블로그다.

- 첫 화면은 brand, nav, intro, recent article list가 중심이다. 명시적으로 고른 글이 있으면 recent 앞에 featured article list를 둔다.
- 큰 hero, floating card, 장식 gradient, 두꺼운 shadow를 쓰지 않는다.
- 얇은 rule, 넓은 여백, 좁은 measure, prose 품질이 시각 정체성이다.
- nav는 현재 `Articles`, `Note`, `About`을 노출한다. `About`은 profile page이고, 글 목록/Archive 통계가 아니라 공개 가능한 소개 문장과 contact link만 보여준다.
- production footer 오른쪽에는 `siteConfig.about.links`의 public contact link를 짧은 label로 보여준다. 현재는 `GitHub`, `Email`만 둔다.

## Reference Invariants

원본에서 그대로 보존해야 하는 구조:

- `Blog v2.html`의 shell/top/nav/footer class contract: `.shell`, `.top`, `.brand`, `.dot`, `nav.nav`, `footer.foot`.
- home sequence: intro -> optional `Featured` -> `Recent` -> all articles link.
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
- mobile `<=720px`: `padding: 34px 24px 112px`, header-to-content gap `64px`.
- compact nav는 가능한 한 brand와 같은 행에 둔다. `<=520px`에서도 nav를 아래로 떨어뜨리지 않고 gap/font만 줄이며, active indicator dot은 숨기고 text weight로만 현재 위치를 표시한다.
- prose max-width는 `680px`. `System.html`의 `760px`는 system page 전용 값으로 본다.
- mobile body size는 `16.5px`로 두고 desktop display scale을 그대로 축소하지 않는다.

## Core Screens

### Home

구성:

1. top bar
2. intro paragraph
3. `Featured` if any post has `featured: true`
4. `Recent`
5. footer

데이터:

- `Featured`: frontmatter `featured: true`가 있는 글 중 최신순 4개. 없으면 section 자체를 숨긴다.
- `Recent`: 오늘 기준 공개된 최신 글 6개. `featured` 여부와 관계없이 날짜 최신순으로 보여준다.
- `date: TBD`와 오늘보다 미래 날짜인 글은 목록과 route에서 제외한다. 검증 기준일이 필요하면 `SITE_PUBLISH_CUTOFF_DATE=YYYY-MM-DD`를 쓴다.
- `description`이 없으면 첫 본문 paragraph에서 list excerpt를 만든다.

### Articles

- 모든 글을 최신순으로 정렬한다.
- 연도별로 group한다.
- 연도 header는 mono 12px, hairline bottom rule.
- row date는 `MM.DD` 형식으로 표시한다.

### Post

- meta: primary tag, date, readTime.
- post header meta는 primary tag를 kicker로 쓰고, secondary tag는 최대 3개와 `+n` 요약만 노출한다. 전체 tag taxonomy를 상단에서 모두 나열하지 않는다.
- `cover`가 있으면 post hero를 title 위에 `16:9` 비율로 표시한다. Dashboard형 SVG처럼 내부 정보가 많은 cover를 2:1로 크롭하지 않는다.
- `description`이 있으면 `post-sub`로 표시한다.
- `description`이 없고 첫 paragraph에서 excerpt를 생성한 경우, post page에서는 subtitle을 생략해 본문과 중복시키지 않는다.
- Markdown renderer는 frontmatter title과 같은 첫 H1을 화면에서 제거한다.
- mobile post title은 `30px / 1.23`로 둔다. 데스크톱 title scale을 유지한 채 줄바꿈만 늘리지 않는다.
- post footer는 card가 아니라 얇은 rule 기반 navigation rail로 둔다. mobile에서는 back/next link를 각각 44px 이상 row로 만들고, next title은 row 안에서 말줄임 대신 자연 줄바꿈을 허용한다.

### Note

`Note` route는 `content/notes/*.md`가 있으면 날짜순 list로 보여준다. 데이터 source가 없거나 공개 note가 없으면 내부 구현 문구 없이 조용한 empty state를 보여준다.

### About

`/about/` route는 old prototype의 `About` prose와 `dl.about-grid` 패턴을 가져오되, Work 이력은 표시하지 않는다. 실제 profile/contact 값은 `siteConfig.about`에서 관리한다. contact 값이 없으면 추측해서 채우지 않고 해당 row를 만들지 않는다.

## Article Row Contract

`Blog v2.html`의 기본 variant인 `aside`를 live 기본값으로 채택한다.

- row grid: `1fr auto auto`
- title/description left, date right, thumbnail far-right
- thumbnail size: `56px × 42px`
- no-thumbnail row는 `56px × 42px` spacer를 둬 컬럼 정렬을 유지한다.
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

Markdown 본문은 현재 `../src/styles/prose.css`를 기준으로 하고, Storybook Prose stories와 system-preview로 QA한다. `Blog v2.html`과 `System.html`은 original design intent를 확인해야 할 때 evidence로 읽는다.

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
- code fence ` ```mermaid` -> `.mermaid-block`
- Markdown image 다음 italic paragraph 또는 explicit caption syntax -> `figure > figcaption`

넓은 table/code는 mobile에서 horizontal scroll을 제공한다.

## Motion

- view fade: `0.42s cubic-bezier(.2,.7,.2,1)`, `translateY(8px)`.
- article row cascade: `0.5s`, 40ms 단위 stagger.
- note row cascade도 동일하게 적용한다.
- `prefers-reduced-motion: reduce`와 `data-motion="off"`를 지원한다.
- production에 tweak panel은 넣지 않는다.

## Data Adapter

현재 `content/posts`는 `description`, `cover`, `thumbnail`이 없는 글도 있고, `featured`는 사용자가 명시한 글에만 있다. 사이트 adapter가 fallback을 제공하고, 원고를 자동 수정하지 않는다.

필드 매핑:

| Site field | Source |
| --- | --- |
| `title` | frontmatter `title` |
| `date` | frontmatter `date` |
| `readTime` | frontmatter `readTime` |
| `tags` | frontmatter `tags` |
| `primaryTag` | frontmatter `topic`, 없으면 첫 `tags[]`, 마지막 fallback `project`, `category`, `Blog` |
| `displayTags` | `topic`을 첫 항목으로 두고, frontmatter `tags[]` 전체를 뒤에 나열 |
| `description` | frontmatter `description`, 없으면 첫 본문 paragraph excerpt |
| `cover` | frontmatter `cover`, 상세 상단 hero와 OG 이미지 후보 |
| `thumbnail` | frontmatter `thumbnail`, 홈/목록 row 이미지. `cover`나 본문 이미지를 자동으로 대체하지 않음 |
| `featured` | frontmatter `featured`, 없으면 false |
| `slug` | filename `YYYY-MM-DD-slug.md`의 slug |
| `year` | frontmatter date year |

cover가 없는 글에 임의 이미지를 frontmatter로 쓰지 않는다. 목록 row는 `thumbnail`이 없으면 no-thumbnail 상태를 지원하고, OG 이미지는 `cover`가 없으면 생략될 수 있다.

## Implementation Notes

현재 scaffold 기준:

1. token/base/prose CSS는 `site/src/styles/`가 production 전역 source다.
2. `src/lib/posts.ts`가 `content/posts` adapter를 소유한다.
3. `src/app/**`와 `src/components/**`가 Shell, top nav, home/articles/post/note/about DOM contract를 렌더링한다.
4. `src/lib/markdown.ts`가 Markdown extension transform을 소유한다.
5. `system-preview/app/**`가 local-only system preview를 소유하고, production components/lib/styles를 import한다.
6. Note는 optional content source에 붙이고, About은 site config의 공개 프로필 데이터에 붙인다.
7. desktop/mobile screenshot regression을 붙인다.

## Non Goals

- `tweaks-panel.jsx`를 production runtime에 포함하지 않는다.
- prototype의 sample `SITE`, `ARTICLES`, `NOTES` 문장을 실제 콘텐츠로 쓰지 않는다.
- legacy design fixture를 current source처럼 수정하거나 복사하지 않는다.
- editorial voice나 글쓰기 workflow를 디자인 규칙으로 바꾸지 않는다.
- 사이트 미감을 맞추기 위해 원고 구조를 임의 HTML 중심으로 바꾸지 않는다.
