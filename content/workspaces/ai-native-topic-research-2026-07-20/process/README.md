---
작성일: 2026-07-23
갱신일: 2026-07-28
성격: AI-native 역량 글감 조사 과정 / 내부 index
공개상태: 내부 작업 문서
현재상태: candidates·shaping·review·이전 결과물 보존
---

# Process

이 디렉토리는 작업하며 생긴 조사, 시도, 후보 형성, shaping, review, main 조율과 이전 결과물을 러프하게 보존한다.

- [candidates](./candidates/README.md)는 기준 형성, 후보 전개, 원천 재조사, 후보 상태 교정 과정을 담는다.
- [shaping](./shaping/README.md)은 상위 후보를 첫 장면·중심 질문·사건 배열·공개 자료 후보로 펼치고, 실제 v1~v3 산문과 독립 review를 거쳐 고치는 과정을 담는다.
- [context-structure](./context-structure/README.md)는 backlog와 drafts를 한 작업 단위로 합치고 context 층위를 다시 설계한 판단과 이전 active-state를 보존한다.

현재 전체 그림과 다음 cursor는 [active-state](../active-state/index.md), 반복 판단축은 [core/criteria](../core/criteria.md)가 소유한다. process와 active-state가 충돌하면 현재 상태는 active-state를 따르고, 어떤 작업을 거쳐 그 상태에 도달했는지는 process에서 확인한다. 수치·시각·실제 변경 사실은 [sources](../sources/index.md)의 직접 원천을 다시 확인한다.

## Candidates

[candidates/README.md](./candidates/README.md)에서 후보 형성 과정을 안내한다.

- [01 — 기준 형성](./candidates/01-criteria-and-decision-history.md)
- [02 — 다섯 후보 snapshot](./candidates/02-topic-candidates.md)
- [03 — 원천 우선 재조사](./candidates/03-source-first-reanalysis.md)
- [04 — 후보 상태 해석 교정](./candidates/04-post-03-candidate-state-correction.md)

## Shaping

[shaping/README.md](./shaping/README.md)에서 상위 후보 다섯 개의 1차 shaping 과정을 안내한다.

후보를 실제 산문으로 쓰기 전, 같은 항목으로 펼쳐 글의 중심과 필요한 자료를 확인했다. 1차 shaping 뒤에는 [2026-07-27 v1~v3 draft loop](./shaping/2026-07-27-v1-v3-draft-loop/README.md)에서 다섯 초안, 두 독립 review, main의 반영 판단, 기준 변화를 버전별로 보존한다. v3 뒤 전체를 다시 대조하고 사용자와 중심을 맞춘 과정은 [05 — post-v3 재검토와 사용자 sync](./shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)에 남긴다.

[post-sync 새 v1 cycle](./shaping/2026-07-27-post-sync-v1/README.md)에서 backlog, 직접 원천, 기존 v1~v3와 review를 다시 대조한 material 종합과 완결된 v1, 독립 review와 main 판정까지 만들었다. 이후 [near-final v2~v3 cycle](./shaping/2026-07-27-near-final-v2-v3/README.md)에서 전면 재작성 v2, 독립 shaping·texture·evidence review, main 판정, v3 regression review와 검증을 완료했다.

사용자가 v3를 실제 공개 블로그 글로 읽은 뒤 완료 판정을 되돌렸다. 기존 원고는 당시 과정 안에 남기고 [public reshape cycle](./shaping/2026-07-27-public-reshape/README.md)에서 독자 진입성, public-safe specificity, 저자 agency, 글별 portfolio signal을 중심으로 다섯 완결본과 독립 review, main 판정을 만들었다. 이후 원고만 본 blind review도 같은 cycle에 별도 판단으로 보존한다. 최신 원고는 [src](../src/README.md), 두 판단을 어떻게 사용할지에 대한 현재 상태는 [active-state](../active-state/index.md)를 따른다.

## 보존 기준점

- 분리 전 단일 조사 문서: Git commit `435df83`
- 기준·후보 분리 snapshot: Git commit `fb7b461`
- 원천 우선 재조사 완료 snapshot: Git commit `843f942`
- active-state와 process 분리·후보 상태 교정: Git commit `00f1bcd`
- candidates·shaping 분리와 1차 shaping: Git commit `6e943fc`

디렉토리 이동 직전 SHA-256:

- `01-criteria-and-decision-history.md`
  - `3aef9f07ea3fd94497256140479fc6621382c8017b91b19709b1f508f5cf1d5b`
- `02-topic-candidates.md`
  - `9a7972879c036a4a6ed2dece4462c963c99c9441c04e05b5431f11cf4d9fb197`
- `03-source-first-reanalysis.md`
  - `04e2ce7a87b0bfd0c25f698a9ec962863685f94f0adb36dbeb13cebcb2ff046c`

### 이동 뒤 상대 링크 해석

`01`의 마지막 기준점에 있는 `[README.md](./README.md)`는 작성 당시 부모 디렉토리의 README를 가리켰다. 파일 내용을 보존한 채 `process/candidates/`로 이동했기 때문에 지금은 candidates index로 연결된다.

- 현재 폴더 전체 안내: [부모 README](../README.md)
- 현재 유효한 판단: [active-state README](../active-state/index.md)
- 후보 형성 과정 안내: [candidates README](./candidates/README.md)
- shaping 과정 안내: [shaping README](./shaping/README.md)

원래 문서의 hash를 보존하기 위해 `01` 안의 과거 상대 링크는 소급 수정하지 않았다.

## 이후 기록 원칙

- 현재 그림·후보 위상·다음 cursor만 달라졌다면 active-state를 갱신한다.
- 후보를 새로 발굴·재조사·교정한 과정은 `candidates/`에 남긴다.
- 후보를 글의 단위로 펼치고 비교한 과정은 `shaping/`에 남긴다.
- process의 사실 오류를 고칠 때는 현재 판단을 덧씌우지 않고 무엇을 정정했는지 명시한다.
- active-state에는 process 전체를 복사하지 않고 현재 그림과 필요한 연결만 남긴다.
- 새 결과물이 현재본이 되면 이전 결과물은 관련 process 과정 안에 둔다.
