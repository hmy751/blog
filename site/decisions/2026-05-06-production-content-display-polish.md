# Production Content Display Polish

작성일: 2026-05-06
상태: accepted

## 배경

배포 전 실제 홈, 하단, Note 화면을 다시 보니 prototype에서 가져온 표시 규칙이 production content 상태와 맞지 않는 부분이 남아 있었다. 특히 `featured: true`가 없는 글도 홈에서 `Featured`로 보이고, 하단에는 별도 맥락 없이 `Archive` 링크가 반복되었다.

## 문제

- `Featured` fallback이 최신 글을 임의로 강조하면서, 사용자가 frontmatter로 고른 글처럼 보인다.
- `Recent`는 fallback featured를 제외하기 때문에 실제 최신 글이 아니라 그 다음 글부터 보인다.
- 오늘보다 미래 날짜인 `content/posts` 글이 build 시점에 노출될 수 있다.
- `Note` 화면의 empty copy가 내부 구현 상태를 그대로 드러낸다.

## 결정

- 홈 `Featured`는 명시적으로 `featured: true`인 글이 있을 때만 보여준다.
- `Recent`는 오늘 기준 공개된 최신 글을 보여주고, 명시 featured와만 중복을 피한다.
- `date: TBD`와 오늘보다 미래 날짜인 글은 production route/list에서 제외한다. 검증 기준일은 `SITE_PUBLISH_CUTOFF_DATE`로 override할 수 있다.
- footer의 기본 `Archive` 링크는 제거한다. 전체 글 이동은 홈의 `모든 글 보기`와 nav `Articles`가 맡는다.
- `Note`는 optional `content/notes/*.md` source에 연결하되, source가 없으면 public-facing empty state만 보여준다.

## 적용 범위

- `src/lib/posts.ts`
- `src/lib/notes.ts`
- `src/app/page.tsx`
- `src/app/note/page.tsx`
- `src/components/shell/Shell.tsx`
- `content/posts` 최신 3개 글의 `featured` frontmatter
- Storybook screen/component fixtures
- `README.md`, `docs/CONTENT_CONTRACT.md`, `docs/DESIGN_CONTRACT.md`

## 비목표

- 사이트 앱이 기존 `content/posts` 원고를 자동 수정하지 않는다. 이번 최신 3개 `featured` 지정은 사용자 요청에 따른 frontmatter 변경이다.
- `content/notes` 원고를 이번 변경에서 새로 만들지 않는다.
- About route를 공개하지 않는다.
- RSS/sitemap 구현을 이번 결정에 포함하지 않는다.

## 근거

배포 화면은 content metadata의 의도를 과장하지 않아야 한다. 강조 글은 사용자가 고른 글로만 보이고, 최신 목록은 최신 목록답게 동작해야 한다. 아직 실제 source가 없는 Note는 구현 상태가 아니라 독자가 볼 수 있는 상태만 보여준다.

## 후속 점검

- `npm run verify`로 static export와 forbidden route/link 검사를 통과시킨다.
- production export에서 `/archive`, `/system`, `/about` 링크가 새지 않는지 확인한다.
- 실제 note source를 만들 때 root content 역할 경계와 prepublish 기준을 다시 확인한다.
