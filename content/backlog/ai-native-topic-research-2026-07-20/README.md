---
작성일: 2026-07-23
갱신일: 2026-07-27
성격: AI-native 역량 글감 조사 권위 지도 / 내부 index
공개상태: 내부 작업 문서
현재상태: 상위 후보 5개 v1→독립 리뷰→v2→독립 리뷰→v3 진행 / 사용자 검토 전
---

# AI-native 역량 글감 조사

이 폴더는 AI-native 역량 기술 블로그의 선택 기준, 현재 후보, 조사 과정을 보존한다.

현재 유효한 상태와 후보를 만들고 글로 펼치는 과정을 같은 문서에 누적하지 않는다.

- [active-state](./active-state/README.md)는 지금 무엇이 유효하고 다음에 무엇을 할지 소유한다.
- [process](./process/README.md)는 후보를 만드는 `candidates` 과정과 글의 단위로 펼치는 `shaping` 과정을 보여 준다.

현재 판단이 필요하면 active-state부터 읽는다. 후보가 어떻게 만들어지고 재검토됐는지, 현재 shaping에서 무엇을 시험했는지는 process로 내려간다.

## 권위 경계

- 현재 후보의 이름·위상·다음 shaping은 [active-state/topic-candidates.md](./active-state/topic-candidates.md)가 소유한다.
- 새 후보를 고르는 현재 기준과 적용 순서는 [active-state/criteria.md](./active-state/criteria.md)가 소유한다.
- 후보를 발견하고 기준·근거·위상을 재검토한 과정은 [process/candidates](./process/candidates/README.md)가 소유한다.
- 상위 후보를 첫 장면·중심 질문·사건 배열로 펼친 과정은 [process/shaping](./process/shaping/README.md)이 소유한다.
- 수치·시각·실제 code·test 변화는 process의 설명보다 연결된 직접 원천을 우선한다.
- process에는 완료된 작업과 현재 진행 중인 작업이 모두 들어갈 수 있다. 최신이라는 이유만으로 process 결과를 active-state에 넣지 않는다.

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

`candidates`와 `shaping`의 역할, 보존 기준점, 이후 기록 원칙을 안내한다.

### [process/candidates/README.md](./process/candidates/README.md)

후보를 만들고 다시 판단한 01~04 과정을 안내한다.

- [01 — 기준 형성](./process/candidates/01-criteria-and-decision-history.md)
- [02 — 다섯 후보 snapshot](./process/candidates/02-topic-candidates.md)
- [03 — 원천 우선 재조사](./process/candidates/03-source-first-reanalysis.md)
- [04 — 후보 상태 해석 교정](./process/candidates/04-post-03-candidate-state-correction.md)

### [process/shaping/README.md](./process/shaping/README.md)

상위 후보 5개의 1차 shaping과 v1~v3 초안 반복 과정을 안내한다.

- 첫 장면과 중심 질문
- 판단이 바뀐 시간순 사건
- 공개 가능한 자료와 추가 확인 사항
- 다른 개발자가 가져갈 기준
- 이번 자료가 말하지 못하는 한계
- 버전별 독립 리뷰 원문과 main의 채택·조정·기각·보류 판단

## 현재 cursor

첫 글은 아직 확정하지 않았다. 상위 후보의 1차 shaping을 마쳤고, 현재는 다섯 후보 모두를 같은 깊이의 v1~v3 산문으로 펼치는 [draft loop](./process/shaping/2026-07-27-v1-v3-draft-loop/README.md)를 진행한다. 상위 후보는 다음과 같다.

- current / active-state operation
- 독립 판별 / 제3판별자
- 제품 흐름을 자르지 않는 scope control
- 생성·주장 판정·후보 수렴의 판단 순서
- AI self-check

목록 안에는 순위가 없다. 후보의 현재 특징은 설명할 수 있지만 이를 위상의 근거·고정된 대표 강점·정렬 기준으로 사용하지 않는다. v1과 v2 뒤에는 각각 새 독립 reviewer가 backlog·원자료와 해당 버전만 직접 보고 다음 수정 기준을 제시한다. main은 그 결과를 자동 정답으로 쓰지 않고 채택·조정·기각·보류를 기록해 다음 버전에 반영한다. 사용자는 v3와 전체 과정을 함께 본 뒤 첫 글, article type, 독립 판별과 AI self-check의 병합·분리, 발행 순서를 판단한다. 그 전에는 고정된 시리즈 순서나 전체 구성을 만들지 않는다.

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
- active-state와 process 분리·후보 상태 교정: Git commit `00f1bcd`
- candidates·shaping 분리와 1차 shaping: Git commit `6e943fc`
