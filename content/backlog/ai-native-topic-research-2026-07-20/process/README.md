---
작성일: 2026-07-23
갱신일: 2026-07-23
성격: AI-native 역량 글감 조사 과정 / 내부 index
공개상태: 내부 작업 문서
현재상태: 01~04 과정 문서 보존 / active-state와 분리
---

# Process — 기준이 바뀐 과정과 원천 조사 기록

이 디렉토리는 무엇이 현재 유효한지를 직접 지시하지 않는다. 기준이 어떻게 바뀌었는지, 당시 후보를 어떻게 평가했는지, 원천을 다시 조사했을 때 무엇이 달라졌는지를 보존한다.

현재 유효한 기준과 후보 상태는 [active-state](../active-state/README.md)가 소유한다. 이 디렉토리의 문장과 active-state가 충돌하면 다음처럼 판단한다.

- 현재 편집 판단과 다음 행동은 active-state를 따른다.
- 과거에 무엇을 판단했고 왜 바뀌었는지는 process를 따른다.
- 수치·시각·실제 변경 사실은 연결된 직접 원천을 다시 확인한다.

## 문서

### [01-criteria-and-decision-history.md](./01-criteria-and-decision-history.md)

글감을 고르는 기준이 대화에서 어떻게 바뀌고 합의됐는지 소유한다.

- 처음부터 유지됐어야 할 목적
- 잘못 승격된 선택 기준
- 사용자 정정 전후의 변화
- 폐기·보존·새로 생긴 판단
- 재조사 전 시점의 합의와 후보 평가 순서

### [02-topic-candidates.md](./02-topic-candidates.md)

원천 우선 재조사 전 남아 있던 다섯 후보의 상세 snapshot이다.

- 중심 질문과 통제력
- 대표 장면과 글의 전개
- 주장 상한과 제목 후보
- 당시의 비교 결과와 주요 원천

현재 후보 목록으로 읽지 않는다. 이후 재조사는 [03](./03-source-first-reanalysis.md), 그 결과의 해석 교정은 [04](./04-post-03-candidate-state-correction.md), 현재 상태는 [active-state 후보 문서](../active-state/topic-candidates.md)에서 확인한다.

### [03-source-first-reanalysis.md](./03-source-first-reanalysis.md)

AX 전체-작업본, Tripproof, ai-note를 기존 후보와 분리해 다시 조사한 기록이다.

- 원자료 역할과 조사 순서
- 실제 확인 범위와 감사 색인
- 원천별 판단 사건
- fresh 후보와 기존 다섯 후보의 대조
- 근거 강도·주장 상한·첫 글 선택에 미친 영향

### [04-post-03-candidate-state-correction.md](./04-post-03-candidate-state-correction.md)

03 완료 뒤 active-state를 만들고 후보 상태를 설명하는 과정에서 생긴 해석 오류와 사용자 교정을 보존한다.

- shaping cursor를 가치 서열로 읽은 과정
- 주장 상한을 후보 매력도의 감점으로 사용한 오류
- 독립 판별과 AI self-check의 공통 원리
- 판단 순서 후보의 현재 위상
- 상위 후보 5개·유지 후보 3개로 갱신한 이유

## 보존 기준점

- 분리 전 단일 조사 문서: Git commit `435df83`
- 기준·후보 분리 snapshot: Git commit `fb7b461`
- 원천 우선 재조사 완료 snapshot: Git commit `843f942`

디렉토리 이동 직전 SHA-256:

- `01-criteria-and-decision-history.md`
  - `3aef9f07ea3fd94497256140479fc6621382c8017b91b19709b1f508f5cf1d5b`
- `02-topic-candidates.md`
  - `9a7972879c036a4a6ed2dece4462c963c99c9441c04e05b5431f11cf4d9fb197`
- `03-source-first-reanalysis.md`
  - `04e2ce7a87b0bfd0c25f698a9ec962863685f94f0adb36dbeb13cebcb2ff046c`

### 이동 뒤 상대 링크 해석

`01`의 마지막 기준점에 있는 `[README.md](./README.md)`는 작성 당시 부모 디렉토리의 README를 가리켰다. 파일 내용을 보존한 채 `process/`로 이동했기 때문에 지금은 이 process index로 연결된다.

- 현재 폴더 전체 안내: [부모 README](../README.md)
- 현재 유효한 판단: [active-state README](../active-state/README.md)
- 과거 과정 문서 안내: 현재 process README

원래 문서의 hash를 보존하기 위해 `01` 안의 과거 상대 링크는 소급 수정하지 않았다.

## 이후 기록 원칙

- 현재 결론만 달라졌다면 process 문서를 소급 수정하지 않고 active-state를 갱신한다.
- 새로운 조사나 기준 변화 과정이 생기면 다음 번호의 process 문서로 남긴다.
- process의 사실 오류를 고칠 때는 현재 판단을 덧씌우지 않고 무엇을 정정했는지 명시한다.
- active-state에는 process 전체를 복사하지 않고 현재 판단을 지지하는 원천과 변화 지점만 연결한다.
