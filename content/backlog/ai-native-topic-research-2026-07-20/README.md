---
작성일: 2026-07-23
갱신일: 2026-07-23
성격: AI-native 역량 글감 조사 권위 지도 / 내부 index
공개상태: 내부 작업 문서
현재상태: active-state·process 분리 / 첫 글 shaping 전
---

# AI-native 역량 글감 조사

이 폴더는 AI-native 역량 기술 블로그의 선택 기준, 현재 후보, 조사 과정을 보존한다.

현재 유효한 판단과 그 판단이 만들어진 과정을 같은 문서에 누적하지 않는다.

- [active-state](./active-state/README.md)는 지금 무엇이 유효하고 다음에 무엇을 할지 소유한다.
- [process](./process/README.md)는 기준이 변한 과정, 과거 후보 snapshot, 원천 재조사를 보존한다.

현재 판단이 필요하면 active-state부터 읽는다. 왜 그렇게 판단했는지, 이전에는 무엇이 달랐는지, 어떤 원천을 확인했는지는 process로 내려간다.

## 권위 경계

- 현재 후보의 이름·위상·다음 shaping은 [active-state/topic-candidates.md](./active-state/topic-candidates.md)가 소유한다.
- 새 후보를 고르는 현재 기준과 적용 순서는 [active-state/criteria.md](./active-state/criteria.md)가 소유한다.
- 과거에 무엇을 판단했고 왜 바뀌었는지는 `process/01~04`가 소유한다.
- 수치·시각·실제 code·test 변화는 process의 설명보다 연결된 직접 원천을 우선한다.
- active-state가 바뀌어도 process 문서를 현재 결론에 맞게 소급 수정하지 않는다.

## Active state

### [active-state/README.md](./active-state/README.md)

현재 권위, 갱신 계약, 다음 cursor를 안내한다.

### [active-state/criteria.md](./active-state/criteria.md)

지금 적용할 범위·주제 가치·글 성립·근거·주장 상한·개발자 어필 기준을 소유한다.

- 사건 발견, 주장 판정, 후보 수렴의 시점 분리
- 새 후보를 평가하는 순서
- 현재 쓰지 않는 선택 규칙
- 닫힌 결정과 열린 편집 판단

### [active-state/topic-candidates.md](./active-state/topic-candidates.md)

현재 독립 후보 8개의 위상과 상세 근거를 소유한다.

- 상위 후보 5개
- 유지 후보 3개
- 병합한 소재와 현재 보류한 소재
- 각 후보의 중심 질문, 대표 사건, 판단 변화, artifact, 전이 기준, 주장 상한, 다음 shaping, 주요 원천

## Process

### [process/README.md](./process/README.md)

과정 문서의 역할, 보존 commit과 SHA-256, 이후 기록 원칙을 안내한다.

### [process/01-criteria-and-decision-history.md](./process/01-criteria-and-decision-history.md)

글감 선택 기준이 대화에서 어떻게 바뀌고 합의됐는지 보존한다.

### [process/02-topic-candidates.md](./process/02-topic-candidates.md)

원천 우선 재조사 전 남아 있던 다섯 후보의 상세 snapshot이다.

### [process/03-source-first-reanalysis.md](./process/03-source-first-reanalysis.md)

AX 전체-작업본, Tripproof, ai-note를 원천부터 다시 조사하고 기존 다섯 후보와 대조한 기록이다.

### [process/04-post-03-candidate-state-correction.md](./process/04-post-03-candidate-state-correction.md)

03 이후 shaping cursor를 가치 서열로 읽은 오류와 사용자 교정, 독립 판별·self-check의 관계, 현재 후보 위상 결정을 보존한다.

## 현재 cursor

첫 글은 아직 확정하지 않았다. 상위 후보는 다음과 같다.

- current / active-state operation
- 독립 판별 / 제3판별자
- 제품 흐름을 자르지 않는 scope control
- 생성·주장 판정·후보 수렴의 판단 순서
- AI self-check

목록 안에는 순위가 없다. 후보의 현재 특징은 설명할 수 있지만 이를 위상의 근거·고정된 대표 강점·정렬 기준으로 사용하지 않는다. 같은 형식의 shaping과 필요할 때 초기 초안을 본 뒤 첫 글과 article type을 결정한다. 독립 판별과 AI self-check의 병합·분리도 그때 판단한다. 그 전에는 고정된 시리즈 순서나 전체 구성을 만들지 않는다.

## 공개 전 경계

이 폴더는 내부 source card다.

- 공개 원고에 로컬 절대 경로, session·task ID, 비공개 대화 원문, 개인 ai-note 문장을 그대로 노출하지 않는다.
- 수치와 사건은 연결된 원자료에서 다시 확인한다.
- private raw는 공개 가능한 최소 장면으로 재서술한다.
- 내부 artifact는 sanitized fixture·재현 절차·일반화한 before/after로 바꾼다.
- 줄 수, test 수, fixture 수를 품질·생산성·사용자 가치 지표로 올리지 않는다.

## 보존 기준점

- 분리 전 732줄 조사 문서: Git commit `435df83`
- 기준·후보 문서 분리: Git commit `fb7b461`
- 원천 우선 재조사 완료: Git commit `843f942`
