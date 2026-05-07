---
작성일: 2026-05-06
상태: accepted
관련:
  - ../docs/READER_BEHAVIOR_CONTRACT.md
  - ../scripts/posthog-export.mjs
  - ./2026-05-06-clarity-local-export.md
---

# PostHog reader event 로컬 export

## 배경

Clarity는 히트맵과 replay를 보기에는 좋지만, 운영자가 dashboard를 일일이 확인해야 하고 나중에 AI가 구조화된 독서 행동을 읽기에는 API export가 집계 중심이다. 블로그에서는 광고 전환보다 글 읽기 흐름, 링크/코드/목록 사용, 이탈 후보를 장기적으로 남기는 것이 더 중요해졌다.

## 결정

PostHog를 structured reader event provider로 추가한다. Clarity는 heatmap/replay/집계 보조 경로로 유지하고, PostHog는 allowlisted custom event를 직접 capture한 뒤 Query API로 `site/data/posthog/`에 raw JSON과 normalized JSONL을 남긴다.

runtime 기본값은 보수적으로 둔다.

- `posthog-js` SDK를 쓰되 autocapture, automatic pageview/pageleave, session recording을 끈다.
- 로그인 없는 공개 블로그이므로 `identify`를 호출하지 않는다.
- event name과 property는 `READER_BEHAVIOR_CONTRACT.md`의 allowlist만 사용한다.
- export용 personal API key는 `POSTHOG_PERSONAL_API_KEY`로만 읽고 `NEXT_PUBLIC_*`에 두지 않는다.

## 적용 범위

- `site/src/components/analytics`
- `site/src/lib/analytics.ts`
- `site/scripts/posthog-export.mjs`
- `site/docs/READER_BEHAVIOR_CONTRACT.md`
- `site/.claude/skills/site-reader-data-collector`
- `site/data/posthog/` local-only archive

## 비목표

- PostHog autocapture로 DOM click/text를 폭넓게 저장하는 것.
- session replay 원본을 장기 로컬 archive로 삼는 것.
- 독자 식별자, email, user id, 입력값을 수집하거나 결합하는 것.
- 데이터 수치만 보고 원고를 자동 수정하는 것.

## 후속 점검

- 실제 배포 후 PostHog에 allowlisted event가 들어오는지 확인한다.
- `npm run posthog:export -- --dry-run`으로 쿼리 범위를 확인한 뒤 하루 1회 이하로 수집한다.
- 데이터가 쌓이면 Clarity aggregate와 PostHog event JSONL을 함께 읽어 화면/reader-flow 개선 후보만 분리한다.
