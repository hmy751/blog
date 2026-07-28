---
date: 2026-07-28
status: accepted
scope: long-running content work units
---

# 장기 작업 단위에 context 층위를 둔다

## 배경

`ai-native-topic-research-2026-07-20`의 후보 조사와 여러 세대 원고가 `content/backlog`와 `content/drafts`에 나뉘어 커졌다. 다음 작업자가 현재 그림을 복구하려면 기준, 후보 카드, process, review와 여러 원고 version을 함께 읽어야 했고, 과거 context가 독립 review의 판단을 고정하거나 결과물만 본 review가 기존 합의를 모르는 문제가 번갈아 나타났다.

## 기존 하네스가 놓친 문제

`content/backlog`와 `content/drafts`의 일반 역할은 짧은 글감과 공개 전 원고에는 충분하지만, 하나의 장기 작업 안에서 현재 그림, 반복 판단축, 직접 원천, 파생 과정, 최신 산출물을 서로 다른 read path로 제공하지는 못했다.

## 결정

- 장기 작업 단위를 `content/workspaces/<work-unit>/`에 둘 수 있다.
- 각 workspace는 필요에 따라 `AGENTS.md`, `core/`, `active-state/`, `sources/`, `process/`, `src/`를 둔다.
- workspace의 `src/`는 최신 내부 작업 원본이며 repo의 자동 prepublish 면이 아니다.
- 실제 발행 후보를 선택하면 해당 원고를 `content/drafts/`로 승격하고 기존 prepublish 흐름을 따른다.
- source collector는 workspace의 `sources/`를 직접 원천 입구로, `process/`를 파생 작업 이력으로 구분한다.

첫 적용의 상세한 문제와 상태·review·main 권한 논의는 [작업 단위 판단 기록](../../content/workspaces/ai-native-topic-research-2026-07-20/process/context-structure/2026-07-28-layering-decision.md)에 둔다.

## 적용 범위

하나의 글감이나 원고보다 큰 장기 작업에서 역할이 다른 context를 분리할 필요가 있을 때 적용한다. 모든 backlog나 draft를 workspace로 옮기라는 규칙은 아니다.

## 비목표

- `content/backlog`와 `content/drafts`를 대체하지 않는다.
- workspace 구조를 모든 글의 의무 템플릿으로 만들지 않는다.
- workspace의 내부 원천·process 문서를 공개 후보로 취급하지 않는다.
- 독립 review의 입력을 항상 하나의 방식으로 고정하지 않는다.

## 근거

- 기존 두 트리에는 97개 Markdown과 여러 원고 cycle이 있었고, active-state만 1,000줄을 넘었다.
- repo prepublish script는 `content/drafts`의 Markdown을 재귀 검사하므로 내부 process와 원천 pointer까지 그 아래 합치면 공개 경계 검사와 충돌한다.
- 사이트 runtime은 `content/posts`만 읽으므로 workspace 추가는 공개 사이트 source contract를 바꾸지 않는다.

## 후속 점검

- 첫 workspace의 active-state가 단일 cursor와 현재 전체 그림을 실제로 복구하는지 사용자와 검토한다.
- source collector의 Claude/Codex 역할이 같은 검색 경계를 유지하는지 확인한다.
- 선택한 `src` 원고가 발행 단계에서 `content/drafts`로 승격되고 prepublish 검사를 거치는지 확인한다.
