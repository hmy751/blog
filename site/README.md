# Custom Blog Site

이 폴더는 커스텀 블로그 사이트 앱의 격리된 루트다. 루트 repo 안에 함께 두지만, 책임은 `content/`와 `editorial/`에서 분리한다.

## Scope

`site/`가 소유한다:

- 사이트 앱 코드, 라우팅, 컴포넌트, 스타일, Markdown renderer
- RSS, sitemap, metadata, image/asset 처리
- production CSS/component/source와 Storybook 디자인 시스템 카탈로그
- 보존된 디자인 reference/legacy 자료를 현재 구현 기준과 구분하는 문서
- 사이트 개발에 필요한 로컬 agent/skill 자리

`site/`가 소유하지 않는다:

- 공개 원고의 문장, frontmatter 발행 기준, 글쓰기 판단
- private source 해석, PI Lab/dev-hub 원천 문장 처리
- root `.claude/`, `.codex/`, `.agents/`의 글쓰기 하네스 기준

## Directory Map

| Path | Role |
| --- | --- |
| `docs/platform-boundary.md` | content/editorial/design/site/harness 책임 경계 |
| `docs/CONTENT_CONTRACT.md` | `../content/posts/*.md`, optional `../content/notes/*.md`를 사이트가 읽는 방식 |
| `docs/DESIGN_CONTRACT.md` | 현재 production CSS/component/Storybook 기준의 디자인 계약 |
| `docs/MARKDOWN_CONTRACT.md` | 상세 글 Markdown 렌더링 변환 계약 |
| `docs/READER_BEHAVIOR_CONTRACT.md` | 독서 행동 분석, 히트맵, privacy boundary 구현 계약 |
| `docs/SEO_CONTRACT.md` | metadata, canonical, sitemap/robots, article JSON-LD 구현 계약 |
| `docs/BLOG_IMPLEMENTATION_PLAN.md` | 실제 블로그 앱 구현 계획 |
| `decisions/2026-05-05-design-system-legacy-boundary.md` | archived design-system 자료의 보존/legacy 경계 결정 |
| `src/` | Next App Router app, components, content adapter, Markdown renderer |
| `src/styles/` | production token/base/prose CSS source |
| `src/stories/` | Storybook 디자인 시스템 stories와 browser-safe fixture data |
| `.storybook/` | Storybook 설정. production CSS contract와 local-only fixture assets를 연결한다. |
| `system-preview/` | 배포 앱과 분리된 local-only Next system preview app |
| `archive/` | 현재 구현 기준과 분리해 보존하는 site archive root |
| `archive/design-system/` | 삭제하지 않는 legacy/reference bucket. 현재 구현 기준으로 직접 쓰지 않는다. |
| `archive/design-system/reference/blog-design/` | Claude Design 원본 HTML/JSX archive와 source map |
| `archive/design-system/styles/` | legacy Node renderer CSS snapshot |
| `archive/design-system/fixtures/` | Storybook/system-preview가 공유하는 local-only QA asset bucket |
| `scripts/` | Next, Storybook, system-preview, legacy local dev/build wrappers |
| `decisions/` | 사이트 구현과 사이트 하네스 변경의 결정 기록 |
| `.claude/skills/` | Claude Code용 사이트 개발 skill 자리 |
| `.claude/agents/` | Claude Code용 사이트 개발 agent 자리 |
| `.codex/agents/` | Codex용 사이트 개발 agent 자리 |
| `.agents/skills/` | Codex skill bridge 자리 |

## Dev Stack

현재 스택은 Next.js App Router + TypeScript 기반 static export다. `../content/posts`를 build time에 읽고, `../content/notes`가 있으면 Note 목록도 읽는다. `npm run build`가 `out/` 정적 산출물을 만든다.

```bash
npm run dev
npm run build
npm run preview
npm run verify
```

기존 Node renderer 파일은 보존하지만 package scripts에는 노출하지 않는다. 새 구현 판단의 기준은 아니며, 과거 이력 확인이 필요할 때만 파일을 직접 읽는다.

production App Router 라우트는 `/`, `/articles/`, `/articles/{slug}/`, `/note/`, `/about/`을 등록한다. About 화면은 `src/components/about/AboutPage.tsx`가 렌더링하고, 공개 프로필 문장과 contact 값은 `src/lib/site-config.ts`에서 관리한다.

Privacy route는 `/privacy/`로 등록한다. 독서 행동 분석과 히트맵은 `docs/READER_BEHAVIOR_CONTRACT.md`를 따르고, analytics provider env가 없으면 runtime script를 넣지 않는다.

`date: TBD`와 오늘보다 미래 날짜인 글은 production route/list에서 제외한다. 로컬에서 특정 기준일로 확인해야 하면 `SITE_PUBLISH_CUTOFF_DATE=YYYY-MM-DD npm run build`처럼 실행한다.

`/system/`과 `/system/example-article/`은 배포 라우트가 아니라 디자인/Markdown QA용 local-only preview다. `site/system-preview`의 별도 Next app으로 실행하되, production `src/components`, `src/lib/markdown.ts`, `src/styles`를 import해서 연결성을 유지한다.

```bash
npm run dev:system
npm run build:system
```

`dev:system`은 기본적으로 `http://127.0.0.1:4322/system/`을 연다. `build:system` 산출물은 `system-dist/`에 만들며 배포 대상이 아니다.

Storybook은 현재 디자인 시스템 카탈로그로 쓴다. 토큰, typography, prose, component state, screen composition을 fixture data로 확인하고, `system-preview`는 실제 Next route와 Markdown renderer 결합 QA로 유지한다. Storybook preview는 production 전역 CSS를 import하고, 전역 selector만 가진 CSS Modules는 `.storybook/main.ts`의 virtual CSS contract로 읽어 같은 선택자에 적용한다.

```bash
npm run storybook
npm run build:storybook
```

## Deployment

Cloudflare Pages 기준:

- project root: `site`
- build command: `npm run build`
- output directory: `out`

배포 전 로컬 preflight는 `npm run verify`로 확인한다. 이 명령은 type check와 production build를 순서대로 실행하고, `out/`에 `/about/`이 생성되었는지와 `/system`, archive fixture asset/link가 새지 않았는지 검사한다.

canonical, sitemap, robots, article JSON-LD는 `docs/SEO_CONTRACT.md`를 따른다. 실제 배포 도메인은 `NEXT_PUBLIC_SITE_URL=https://{actual-domain}`로 주입한다.

Clarity를 실제로 켤 때는 배포 환경변수에만 아래 값을 둔다. 코드에 project id를 하드코딩하지 않는다.

```bash
NEXT_PUBLIC_READER_ANALYTICS_PROVIDER=clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID={project-id}
```

연결 확인은 실제 id나 더미 id로 production build를 만든 뒤 `out/index.html`에 `reader-analytics-clarity`와 `clarity.ms/tag`가 들어갔는지 보면 된다. Clarity dashboard에서는 masking을 강하게 두고, cookie/consent, retention, 광고 연결 여부를 따로 확인한다.

`npm run preview`는 이미 만들어진 `out/`을 로컬에서 서빙한다. 없는 route는 404로 응답하므로 배포 산출물의 route 상태를 확인할 때 쓴다.

server-only Next 기능은 쓰지 않는다. Markdown body 이미지는 우선 plain `<img>`로 렌더링한다. 디자인 시스템 fixture asset은 production `public/`에 두지 않고 `dev:system`/`build:system` 실행 시 local-only preview public folder로 동기화한다.

## Working Rule

사이트는 `../content/posts`를 읽을 수 있지만 원고를 조용히 고치지 않는다. 원고 수정이 필요하면 root repo의 `content/`와 글쓰기 guard로 돌아간다.

현재 UI/스타일 판단은 production code와 Storybook에서 한다. `archive/design-system/reference/blog-design`는 원형 판단을 복원할 때만 read-only evidence로 참고하고, `archive/design-system/styles`를 production CSS로 다시 복사하지 않는다.

사이트 전용 agent/skill이 필요해지면 이 폴더 안에 둔다. root `.claude/`, `.codex/`, `.agents/`는 글쓰기/발행 하네스 전용으로 유지한다.
