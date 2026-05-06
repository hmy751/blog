---
작성일: 2026-05-06
상태: accepted
관련:
  - ../docs/READER_BEHAVIOR_CONTRACT.md
  - ../docs/SEO_CONTRACT.md
  - ../docs/platform-boundary.md
---

# Reader Behavior And SEO Harness

## 배경

커스텀 블로그 사이트에 독서 행동 분석과 SEO를 붙이고 싶다는 요구가 생겼다. 관심사는 상업 전환이 아니라 독자가 글을 어떻게 읽는지, 화면에서 무엇이 묻히는지, 검색/공유 surface가 글을 제대로 이해하는지 확인하는 것이다.

히트맵과 session replay는 유용하지만 독자 행동을 화면 단위로 다룬다. 따라서 단순 analytics snippet을 붙이는 대신 site layer 안에 목적, 금지 데이터, provider 조건, SEO metadata 소유권을 먼저 정해야 한다.

## 기존 하네스가 놓친 문제

- `site/docs`에는 content/design/Markdown 계약은 있었지만 reader behavior나 SEO 계약이 없었다.
- SEO metadata가 route별로 최소 title/description만 갖고 있어 canonical, sitemap, robots, article structured data의 소유권이 불분명했다.
- 히트맵 provider를 붙일 경우 root editorial/writing harness와 site implementation harness가 섞일 위험이 있었다.
- 데이터 분석 agent가 필요하지만, agent가 기준 저장소가 되면 provider/SEO 규칙이 분산될 수 있었다.

## 결정

- reader behavior 기준은 `site/docs/READER_BEHAVIOR_CONTRACT.md`가 소유한다.
- SEO 기준은 `site/docs/SEO_CONTRACT.md`가 소유한다.
- 데이터/SEO agent는 `site-data-seo-analyst`로 추가하되 report-only로 둔다.
- Claude와 Codex agent 정의는 의미를 맞추고, root writing agents와 섞지 않는다.
- analytics runtime hook은 env가 없으면 off다.
- Microsoft Clarity는 heatmap 후보 provider로 열어두되 `NEXT_PUBLIC_READER_ANALYTICS_PROVIDER=clarity`와 project id가 있을 때만 script를 주입한다.
- 초기에는 Clarity를 쓸 경우 layout에 `data-clarity-mask="true"`를 둬 repo 쪽 기본값을 보수적으로 두기로 했다. 이후 공개 블로그 본문 replay 문맥 확인을 위해 `2026-05-06-clarity-body-mask-remove.md`에서 body-level masking을 제거했다. Dashboard의 masking/consent/retention 설정은 별도 확인 대상이다.
- SEO는 Next Metadata helpers, sitemap, robots, article JSON-LD로 구현한다.
- 실제 canonical domain은 `NEXT_PUBLIC_SITE_URL`로만 받는다. 임시 도메인을 코드에 하드코딩하지 않는다.

## 적용 범위

- `site/docs`
- `site/decisions`
- `site/.claude/agents`
- `site/.codex/agents`
- `site/src/app`
- `site/src/lib`
- `site/src/components/analytics`
- `site/scripts/verify.mjs`

## 비목표

- 광고/리타게팅 도구 연결.
- root `content/posts` 원고 수정.
- root `editorial` writing workflow 변경.
- 모든 독자 행동을 개인 세션 단위로 재현하는 분석 체계.
- SEO를 위해 원고에 없는 claim/schema를 추가하는 것.

## 근거

- 사이트 구현과 하네스는 root writing harness와 분리한다는 `platform-boundary.md` 원칙을 따른다.
- 독자의 화면 행동을 다루는 데이터는 목적이 비상업적이어도 수집 방식의 경계가 필요하다.
- SEO는 공개 글의 발견성과 공유 가능성을 높이는 구현 계약이지만, 글쓰기 판단을 대신하지 않는다.

## 후속 점검

- 실제 배포 도메인을 정한 뒤 `NEXT_PUBLIC_SITE_URL`을 설정하고 `npm run verify`를 실행한다.
- Clarity를 켜기 전 project masking, cookie/consent, retention 설정을 확인한다.
- heatmap에서 발견한 수정 후보가 글쓰기 판단으로 번질 경우 root editorial workflow로 되돌린다.
- 데이터/SEO agent가 문서 계약을 복사해 자기 안에 축적하지 않는지 확인한다.
