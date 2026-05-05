# Custom Blog Site

이 폴더는 커스텀 블로그 사이트 앱의 격리된 루트다. 루트 repo 안에 함께 두지만, 책임은 `content/`와 `editorial/`에서 분리한다.

## Scope

`site/`가 소유한다:

- 사이트 앱 코드, 라우팅, 컴포넌트, 스타일, Markdown renderer
- RSS, sitemap, metadata, image/asset 처리
- 디자인 fixture를 실제 구현 계약으로 번역한 문서
- 사이트 개발에 필요한 로컬 agent/skill 자리

`site/`가 소유하지 않는다:

- 공개 원고의 문장, frontmatter 발행 기준, 글쓰기 판단
- private source 해석, PI Lab/dev-hub 원천 문장 처리
- root `.claude/`, `.codex/`, `.agents/`의 글쓰기 하네스 기준

## Directory Map

| Path | Role |
| --- | --- |
| `docs/platform-boundary.md` | content/editorial/design/site/harness 책임 경계 |
| `docs/CONTENT_CONTRACT.md` | `../content/posts/*.md`를 사이트가 읽는 방식 |
| `docs/DESIGN_CONTRACT.md` | `design-system/reference/blog-design` archive에서 확정한 구현 기준 |
| `docs/MARKDOWN_CONTRACT.md` | 상세 글 Markdown 렌더링 변환 계약 |
| `docs/BLOG_IMPLEMENTATION_PLAN.md` | 실제 블로그 앱 구현 계획 |
| `design-system/` | 디자인 fixture에서 가져온 구현용 CSS와 Markdown QA fixture |
| `design-system/reference/blog-design/` | Claude Design 원본 HTML/JSX archive와 source map |
| `src/` | Next App Router app, components, content adapter, Markdown renderer |
| `src/stories/` | Storybook 디자인 시스템 stories와 browser-safe fixture data |
| `.storybook/` | Storybook 설정. production CSS contract와 fixture assets를 연결한다. |
| `system-preview/` | 배포 앱과 분리된 local-only Next system preview app |
| `scripts/` | legacy local dev/build scripts and preview/build wrappers |
| `decisions/` | 사이트 구현과 사이트 하네스 변경의 결정 기록 |
| `.claude/skills/` | Claude Code용 사이트 개발 skill 자리 |
| `.claude/agents/` | Claude Code용 사이트 개발 agent 자리 |
| `.codex/agents/` | Codex용 사이트 개발 agent 자리 |
| `.agents/skills/` | Codex skill bridge 자리 |

## Dev Stack

현재 스택은 Next.js App Router + TypeScript 기반 static export다. `../content/posts`를 build time에 읽고, `npm run build`가 `out/` 정적 산출물을 만든다.

```bash
npm run dev
npm run build
npm run verify
```

기존 Node renderer는 전환 검증과 비교를 위해 legacy script로 남겨둔다.

```bash
npm run dev:legacy
npm run build:legacy
```

production App Router 라우트는 `/`, `/articles/`, `/articles/{slug}/`, `/note/`만 등록한다. About 화면은 `src/components/about/AboutPage.tsx`에 보존하지만 아직 route로 공개하지 않는다.

`/system/`과 `/system/example-article/`은 배포 라우트가 아니라 디자인/Markdown QA용 local-only preview다. `site/system-preview`의 별도 Next app으로 실행하되, production `src/components`, `src/lib/markdown.ts`, `src/styles`를 import해서 연결성을 유지한다.

```bash
npm run dev:system
npm run build:system
```

`dev:system`은 기본적으로 `http://127.0.0.1:4322/system/`을 연다. `build:system` 산출물은 `system-dist/`에 만들며 배포 대상이 아니다.

Storybook은 디자인 시스템 카탈로그로 쓴다. 토큰, typography, prose, component state, screen composition을 fixture data로 확인하고, `system-preview`는 실제 Next route와 Markdown renderer 결합 QA로 유지한다. Storybook preview는 production 전역 CSS를 import하고, 전역 selector만 가진 CSS Modules는 `.storybook/main.ts`의 virtual CSS contract로 읽어 같은 선택자에 적용한다.

```bash
npm run storybook
npm run build:storybook
```

## Deployment

Cloudflare Pages 기준:

- project root: `site`
- build command: `npm run build`
- output directory: `out`

배포 전 로컬 preflight는 `npm run verify`로 확인한다. 이 명령은 type check와 production build를 순서대로 실행하고, `out/`에 `/system`, `/about`, design-system fixture asset/link가 새지 않았는지 검사한다.

server-only Next 기능은 쓰지 않는다. Markdown body 이미지는 우선 plain `<img>`로 렌더링한다. 디자인 시스템 fixture asset은 production `public/`에 두지 않고 `dev:system`/`build:system` 실행 시 local-only preview public folder로 동기화한다.

## Working Rule

사이트는 `../content/posts`를 읽을 수 있지만 원고를 조용히 고치지 않는다. 원고 수정이 필요하면 root repo의 `content/`와 글쓰기 guard로 돌아간다.

디자인 reference archive는 `design-system/reference/blog-design`를 read-only로 참고한다. 색, spacing, 컴포넌트 상세값은 `docs/DESIGN_CONTRACT.md`에 확정된 뒤 구현한다.

사이트 전용 agent/skill이 필요해지면 이 폴더 안에 둔다. root `.claude/`, `.codex/`, `.agents/`는 글쓰기/발행 하네스 전용으로 유지한다.
