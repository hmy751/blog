---
작성일: 2026-07-23
갱신일: 2026-07-28
성격: AI-native 역량 글 작업 단위 / 내부 index
공개상태: 내부 작업 문서
---

# AI-native topic research — 2026-07-20

이 디렉토리는 흩어져 있던 backlog와 draft를 하나의 작업 단위로 모은다. 모든 자료를 한꺼번에 context로 사용하지 않고, 현재 그림·반복 기준·직접 원천·과정·최신 산출물의 역할을 나눈다.

## 시작점

- AI 작업 규칙과 역할별 read path: [AGENTS.md](./AGENTS.md)
- 현재 전체 그림과 현재 위치: [active-state/index.md](./active-state/index.md)
- 전체 작업 흐름: [core/workflow.md](./core/workflow.md)

새 session에서 작업을 이어갈 때는 `active-state/index.md`부터 읽는다. 과거 과정이나 모든 source를 기본 context로 올리지 않는다.

## 디렉토리

- [core](./core/) — 반복 workflow와 판단축
- [active-state](./active-state/) — 현재 전체 그림, 열린 판단, 단일 cursor
- [sources](./sources/index.md) — 직접 원천 링크, 설명, 지원 범위
- [process](./process/README.md) — 조사, 시도, shaping, review, 조율, 이전 결과물처럼 작업하며 생긴 과정
- [src](./src/README.md) — 현재 작업할 최신 원고 다섯 편

## 현재 상태

현재 작업 위치와 열린 문제는 [active-state/index.md](./active-state/index.md)만 소유한다. 이 README에는 cursor나 최신 review 판정을 복제하지 않는다.

이번 층위가 생긴 배경과 논의 과정은 [2026-07-28 layering decision](./process/context-structure/2026-07-28-layering-decision.md)에 보존한다.

## 공개 전 경계

이 작업 단위 전체는 내부 작업면이다.

- `src`는 최신 작업 원본이며 repo의 공식 prepublish 대상과 동일하지 않다.
- 실제 발행 후보를 정하면 선택한 원고를 `content/drafts/`로 승격한다.
- 공개 원고에는 로컬 절대 경로, private conversation 원문, 개인 메모 문장을 그대로 노출하지 않는다.
- 수치, 사건, 실제 구현 여부는 [sources](./sources/index.md)의 직접 원천에서 다시 확인한다.
