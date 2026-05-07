---
date: 2026-05-06
area: reader analytics
status: accepted
---

# Reader Viewport and Pointer Sampling

## Background

Clarity heatmap은 화면 흐름을 보는 데 좋지만, 운영자가 dashboard를 직접 열어 확인해야 하고 장기 로컬 JSONL 분석 원천으로 쓰기 어렵다. PostHog custom event export를 추가한 뒤, 글을 실제로 어떻게 보고 있는지 더 촘촘하게 남길 필요가 생겼다.

## Problem

기존 event는 page view, scroll milestone, reading time, heading reached, click 계열이라 독자가 화면 어느 영역을 오래 훑었는지나 마우스를 어디에 두고 읽었는지에 대한 근사치가 부족했다. 반대로 raw session replay, DOM snapshot, cursor path를 자동 저장하면 개인별 재현 데이터에 가까워져 이 사이트의 reader insight 경계를 넘어선다.

## Decision

PostHog에 다음 event를 추가한다.

- `viewport_sample`: article page에서 5초마다 `scroll_depth`, `viewport_top`, `viewport_bottom`, `active_heading_id`, viewport size bucket을 남긴다.
- `pointer_heat_sample`: 마지막 pointer 위치를 3초마다 `x_bucket`, `y_bucket`, `pointer_type`, `surface`로 남긴다.
- `area_click`: click 위치를 5% 단위 bucket과 broad `surface`로 남긴다.

좌표는 raw pixel이 아니라 viewport 기준 5% 단위 bucket으로 낮춘다. input, textarea, select, contenteditable, analytics/clarity mask 영역에서는 pointer/click sampling을 보내지 않는다. PostHog SDK의 autocapture, pageview/pageleave, session recording은 계속 끈다.

## Scope

적용 범위는 `site/src/components/analytics/ReaderBehaviorTracker.tsx`, analytics allowlist, PostHog export script, reader behavior 문서다. 이 결정은 공개 블로그의 reader flow 분석용이며 광고, 리타게팅, 독자 개인 프로필링으로 확장하지 않는다.

## Non-goals

- 실제 eye tracking.
- raw mouse coordinate stream 저장.
- DOM/text snapshot 또는 session replay 원본 export.
- 독자별 장기 행동 프로필 구성.

## Follow-up

초기 수집량을 보고 `viewport_sample`과 `pointer_heat_sample`의 interval, export limit, 분석 preset을 조정한다. 글 단위 AI 분석에서는 event 수를 먼저 aggregate한 뒤 개별 row를 필요한 범위에서만 읽는다.
