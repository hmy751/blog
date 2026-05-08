---
date: 2026-05-08
scope: site mobile post design system
status: accepted
---

# Mobile Post Design System Polish

## 배경

모바일 article detail 화면을 실제 캡처로 확인하니 desktop rhythm이 작은 화면에 그대로 내려와 있었다. 상단 header와 본문 사이가 크게 벌어지고, 모든 tag가 accent color로 보여 정보 위계가 흐려졌으며, post hero는 `16:8` 크롭 때문에 dashboard형 SVG의 내부 정보가 눌려 보였다.

## 문제

- Shell padding과 header gap이 모바일에서 과하게 커서 화면 첫 구간이 떠 보인다.
- Compact viewport에서 nav가 brand 아래로 떨어져 header가 두 덩어리처럼 보인다.
- Post title은 desktop display scale에 가까워 작은 화면에서 한 덩어리로 무겁게 보인다.
- Tag 전체가 상단에 길게 나열되어 primary tag와 secondary taxonomy의 역할이 구분되지 않는다.
- Cover aspect ratio가 실제 article cover asset 계열과 맞지 않아 이미지가 장식 카드처럼 보인다.
- Post footer와 site footer가 큰 여백 사이에 흩어져 있어 글의 끝부분이 느슨해 보인다.
- Next dev indicator가 local mobile screenshot에 들어와 visual QA를 흐린다.

## 결정

- Shell/post rhythm을 CSS token으로 승격하고 mobile override를 `<=720px`에서 관리한다.
- Mobile shell은 `34px 24px 112px`, header-to-content gap은 `64px`로 둔다.
- Compact nav는 가능한 한 brand와 같은 행에 두고, `<=520px`에서는 gap/font를 줄인다. Active indicator dot은 mobile에서 숨기고 text weight로만 현재 위치를 표시한다.
- Mobile body size는 `16.5px`, post title은 `30px / 1.23`으로 둔다.
- Post hero 기본 aspect ratio를 `16:9`로 바꾼다.
- Post header meta는 primary tag를 kicker로 쓰고, secondary tag는 최대 3개와 `+n` 요약만 노출한다.
- Post footer는 card 없이 rule 기반 navigation rail로 정리한다. Mobile에서는 back/next link를 각각 44px 이상 row로 만들고 site footer는 같은 행 안에서 compact하게 유지한다.
- Local visual QA를 위해 `next.config.mjs`에서 `devIndicators: false`를 설정한다.

## 비목표

- 원고 frontmatter, cover asset, Markdown 구조를 수정하지 않는다.
- Production route 구조나 analytics contract는 바꾸지 않는다.
- 별도 theme/tweak panel을 production에 도입하지 않는다.

## 후속 점검

- Mobile article screenshot을 다시 캡처해 hero crop, title wrapping, first paragraph 진입 위치를 확인한다.
- `npm run check`와 `npm run build`로 타입과 static export를 확인한다.
