---
작성일: 2026-07-28
성격: 재접근 가능한 직접 원천과 지원 범위
---

# Source Map

## 원본 workspace

읽기 전용 참조:

- `../ai-native-topic-research-2026-07-20/AGENTS.md`
  - 기존 workspace의 역할 경계와 수정 권한
- `../ai-native-topic-research-2026-07-20/core/criteria.md`
  - 현재 반복 판단축, AI-native 범위, 서로 대신하지 않는 판정축
- `../ai-native-topic-research-2026-07-20/core/workflow.md`
  - 현재 반복 순서와 변경 권한
- `../ai-native-topic-research-2026-07-20/core/review-workflow.md`
  - review 입력·반환·main 회수 계약
- `../ai-native-topic-research-2026-07-20/active-state/`
  - 현재 전체 지도, Current의 현재 해석, 다섯 후보
- `../ai-native-topic-research-2026-07-20/process/candidates/`
  - 기준이 잘못된 시점과 권한에서 적용된 사례, 다섯 후보 형성 과정
- `../ai-native-topic-research-2026-07-20/process/shaping/`
  - 완결 v1~v3, 독립 review, public reshape, Current 재작성, A/B review 과정
- `../ai-native-topic-research-2026-07-20/process/context-structure/`
  - active-state와 review 계약이 생긴 이유, 이전 과잉 구조화 정정
- `../ai-native-topic-research-2026-07-20/sources/`
  - 기존 글감과 Current가 의존한 직접 원천 접근점

## 대화 원문

- `/Users/hammyeong-yeon/Desktop/2026-07-28-ai-native-context-layering-transcript.md`
  - Current의 원래 역할, context 구조 논의, 사용자의 과잉 구조화 정정
- `/Users/hammyeong-yeon/Desktop/2026-07-28-ai-native-topic-research-current-conversation.md`
  - Current 재작성 품질 거부, Material 누락 오진과 정정
- 이 workspace를 만든 현재 대화
  - A/B가 같은 frame에 갇혔다는 사용자 판정
  - Alex 원본 재조사 요청
  - goal·criteria·evaluator·loop에 대한 열린 질문
  - AI-native 역량 학습을 core에 남기려는 목적
  - 먼저 최대한 펼치고 나중에 수거하라는 작업 방식

현재 대화는 아직 별도 원문 파일로 보존되지 않았다. 정확한 문구가 필요한 후보는 파일 반영 전에 원문 보존 방법을 다시 결정한다.

## Alex 직접 원천

- `/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/00-원본자료/영상전사/2026-07-04_AX인재전쟁_transcript.md`
  - scaffolding, context 분리, 중간 artifact report, 약한 solution 판정, 시간·범위 제약 재평가, 평가 기준 보강, 재위임, human gate

지원 상한:

- 인간이 개입한 한 차례의 solution concept 개선 loop는 확인된다.
- 약한 후보 뒤 시간·범위 제약, 기대 수준, 평가 기준, output 조건을 보강해 재위임하고 더 강한 방향을 고른 과정은 확인된다.
- 최종 autonomous implementation/evaluation loop 완료, Evaluation Foundation 실제 구축, fresh reviewer 실행 결과, 최종 제출 검증은 확인되지 않는다.

## Alex에서 분리해서 볼 두 역할

- Scaffolding 참고:
  - 작업 전에 repo, README, 역할, context 경계, 공통 절차를 만든다.
- Quality loop 참고:
  - 중간 결과를 보고 약함을 판정하고, 자신이 준 제약과 평가 기준을 고쳐 재위임한다.

둘은 연결될 수 있지만 같은 역할은 아니다.

## 일반 하네스 조사

- [Codex·Claude 공식 하네스 surface 조사](./official-harness-surfaces-2026-07-29.md)
  - Codex와 Claude가 실제로 제공하는 instruction, skill, agent, tool, hook, config, permission, sandbox, automation, worktree, review surface
  - 제품 기능의 존재와 동작 방식은 공식 문서로 확인하고, 이번 workspace에 적용하는 해석은 별도로 표시한다.
- [기존 ai-native-harness 재사용 경계](./local-ai-native-harness-reuse-boundary.md)
  - `/Users/hammyeong-yeon/Desktop/ai-native-harness/`의 기존 개념 조사와 inventory에서 가져오는 정의와 운영 field
  - 기존 조사 결과를 그대로 정답으로 복사하지 않고, 공식 문서와 현재 문제를 다시 대조한다.
