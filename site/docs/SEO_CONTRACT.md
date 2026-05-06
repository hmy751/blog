---
작성일: 2026-05-06
목적: 커스텀 블로그 사이트의 검색/공유 메타데이터, sitemap, robots, 구조화 데이터 구현 계약을 정의한다.
사용 방식: metadata, Open Graph, sitemap/robots, article JSON-LD, canonical URL 작업 전후에 읽는다.
관련:
  - [platform-boundary.md](platform-boundary.md)
  - [CONTENT_CONTRACT.md](CONTENT_CONTRACT.md)
  - [MARKDOWN_CONTRACT.md](MARKDOWN_CONTRACT.md)
  - [READER_BEHAVIOR_CONTRACT.md](READER_BEHAVIOR_CONTRACT.md)
---

# SEO Contract

이 사이트의 SEO는 상업적 acquisition funnel이 아니라 공개 글을 검색엔진과 공유 surface가 정확히 이해하도록 돕는 구현 계약이다.

## Goals

- public route마다 title, description, canonical을 안정적으로 제공한다.
- article route는 frontmatter와 excerpt fallback을 이용해 Open Graph/Twitter metadata를 만든다.
- published posts만 sitemap에 포함한다.
- `date: TBD`와 미래 날짜 글은 route/list/sitemap에서 제외한다.
- article JSON-LD는 공개된 글 데이터만 사용한다.
- SEO를 이유로 root `content/posts` 원고를 조용히 rewrite하지 않는다.

## Site URL

canonical URL, sitemap, robots host, JSON-LD URL은 실제 배포 도메인이 있어야 의미가 있다.

환경 변수:

```text
NEXT_PUBLIC_SITE_URL=https://example.com
```

`NEXT_PUBLIC_SITE_URL`이 없으면:

- local build는 통과한다.
- relative metadata와 title/description은 유지한다.
- sitemap은 빈 목록으로 export될 수 있다.
- 최종 배포 SEO 점검에서는 반드시 실제 도메인을 넣는다.

도메인을 확정하기 전까지 임시 도메인을 코드에 하드코딩하지 않는다.

## Metadata Ownership

| Surface | Owner |
| --- | --- |
| site title, description, author, intro, public links | `site/src/lib/site-config.ts` |
| metadata helper, canonical/absolute URL, article JSON-LD | `site/src/lib/seo.ts` |
| root metadata | `site/src/app/layout.tsx` |
| route metadata | each `site/src/app/**/page.tsx` |
| sitemap | `site/src/app/sitemap.ts` |
| robots | `site/src/app/robots.ts` |

`site/src/content.mjs`는 legacy renderer 경로다. current Next metadata의 기준으로 확장하지 않는다.

## Route Contract

| Route | Metadata |
| --- | --- |
| `/` | site title, site description, canonical `/` |
| `/articles/` | article index title/description, canonical `/articles/` |
| `/articles/{slug}/` | post title/description, article Open Graph, optional cover image, JSON-LD |
| `/note/` | note index title/description, canonical `/note/` |
| `/about/` | public profile title/description, canonical `/about/` |
| `/privacy/` | site data title/description, canonical `/privacy/` |

Article description 우선순위는 `CONTENT_CONTRACT.md`를 따른다.

```text
frontmatter description -> first body paragraph excerpt
```

## Structured Data

article route에만 `BlogPosting` JSON-LD를 둔다.

허용 field:

- `headline`
- `description`
- `url`
- `datePublished`
- `dateModified`
- `author`
- `publisher`
- `keywords`
- `image`
- `inLanguage`

원고에 없는 수상, 조직, rating, FAQ, HowTo schema를 추가하지 않는다.

## Sitemap And Robots

sitemap에는 아래만 넣는다.

- `/`
- `/articles/`
- `/note/`
- `/about/`
- `/privacy/`
- published article routes

제외:

- `/system/`
- `archive/`
- Storybook/system-preview routes
- draft/backlog content
- future-dated posts

robots는 기본적으로 전체 public route를 허용하되 sitemap URL은 `NEXT_PUBLIC_SITE_URL`이 있을 때만 노출한다.

## Verification

변경 후 최소 검증:

```bash
npm run check
npm run build
```

배포 전 검증:

```bash
NEXT_PUBLIC_SITE_URL=https://{actual-domain} npm run verify
```

확인할 것:

- `out/robots.txt`
- `out/sitemap.xml`
- article page의 `<title>`, `description`, Open Graph, canonical.
- article page의 `application/ld+json`.
- `/system`, archive, fixture asset link가 production export에 새지 않는지.
