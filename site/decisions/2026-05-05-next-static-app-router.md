# Next Static App Router Migration

작성일: 2026-05-05
상태: accepted

## 배경

현재 `site/`는 zero-dependency Node ESM renderer로 정적 HTML을 만든다. 배포 전까지는 빠르게 움직이기 좋았지만, route map, shell, page composition, Markdown renderer, CSS ownership이 `src/render.mjs`와 전역 CSS에 섞여 있어 유지보수 경계가 흐려졌다.

사용자는 글 경로와 적용 대상을 명시적으로 관리하기 위해 app-router 형태의 route tree를 원했고, `content/posts/*.md`는 그대로 source로 두는 build-time static model을 선호했다.

## 문제

- 어떤 URL이 어떤 page/component에서 생성되는지 한눈에 보이지 않는다.
- Markdown 기능이 늘수록 hand-written parser의 책임이 커진다.
- `blog-components.css`에 production 스타일과 prototype variant가 같이 들어 있다.
- `system-page.css`가 production global bundle에 섞여 들어간다.
- 정적 배포 대상이 `dist/`인지 새 framework output인지 명확히 다시 정해야 한다.

## 결정

`site/`를 Next.js App Router + TypeScript 기반 정적 사이트로 옮긴다.

- `next.config.mjs`는 `output: "export"`와 `trailingSlash: true`를 사용한다.
- 전환 중에는 `npm run build:next`가 Next static export를 생성한다.
- route parity와 visual QA가 끝난 뒤 `npm run build`를 Next build로 전환한다.
- 기존 Node renderer는 route parity와 visual QA가 끝날 때까지 `dev:legacy`, `build:legacy`로 보존한다.
- `content/posts/*.md`는 build time에만 읽고, site code가 원고를 수정하지 않는다.
- Markdown은 `gray-matter` + `unified`/`remark`/`rehype` pipeline으로 옮긴다.
- global CSS는 token/base/prose로 줄이고, production component 스타일은 CSS Module로 분리한다.
- Tailwind는 phase 1에서 도입하지 않는다.

## 범위

적용 범위:

- `site/package.json`
- `site/next.config.mjs`
- `site/tsconfig.json`
- `site/src/app/**`
- `site/src/components/**`
- `site/src/lib/**`
- `site/src/styles/**`
- `site/docs/*`

## 비목표

- `content/posts`의 frontmatter나 본문을 자동 수정하지 않는다.
- 디자인을 새로 만드는 migration으로 만들지 않는다.
- `tweaks-panel.jsx`를 runtime으로 옮기지 않는다.
- server-only Next 기능, ISR, runtime image optimization, API auth/database를 쓰지 않는다.

## 근거

- Next 공식 static export 문서는 `output: "export"` 설정으로 `next build`가 route별 HTML을 `out/`에 생성한다고 설명한다.
- App Router의 `generateStaticParams()`는 `content/posts`처럼 build time에 전체 slug를 열거할 수 있는 source와 잘 맞는다.
- Next의 CSS Modules + global CSS 모델은 현재 문제인 style ownership split에 충분하다.

## 후속 점검

- `generateStaticParams()`가 모든 public post slug를 포함하는지 확인한다.
- `npm run build`가 `site/out`을 생성하는지 확인한다.
- `/system` CSS가 production route에 새지 않도록 분리한다.
- `Blog v2.html`과 `System.html` 기준으로 reference reconciliation을 수행한다.
- Cloudflare Pages output directory를 `out`으로 문서화한다.
