# AI-native 상위 후보 draft loop

이 폴더는 AI-native 글감 상위 후보 다섯 개를 선택 전에 실제 산문으로 비교하기 위한 작업면이다.

v1, v2, v3는 같은 다섯 파일을 가진다. 이전 버전을 덮어쓰지 않으며, 폴더 순서와 파일 순서는 후보 가치나 발행 순서가 아니다.

v3까지 작성과 독립 review 반영을 마친 뒤, 다섯 v3와 변화 기록을 종합 대조하고 사용자와 후보 중심을 다시 맞췄다. 그 결과는 [post-v3 사용자 sync](../../backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)에 보존한다.

초기 v1~v3는 완료된 비교 snapshot이다. 이후 버전은 이 폴더들을 고치거나 덮어쓰지 않고, 보정된 [active-state](../../backlog/ai-native-topic-research-2026-07-20/active-state/README.md)를 따르는 별도 cycle로 만든다.

[material 종합과 사용자 sync](../../backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-post-sync-v1/01-material-synthesis-and-user-sync.md) 뒤 [post-sync 새 v1 다섯 편](./2026-07-27-post-sync-v1/README.md)을 만들고 독립 review와 main 판정까지 마쳤다. 사용자가 이 원고를 검토한 뒤에는 거의 최종본 수준까지 먼저 가 보기로 해, 별도 [전면 재작성 v2](./2026-07-27-near-final-v2/README.md)와 [near-final v3](./2026-07-27-near-final-v3/README.md)를 만들었다. 전체 과정은 [near-final cycle](../../backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-near-final-v2-v3/README.md)에 보존한다.

사용자가 near-final v3를 실제 공개 블로그 글로 읽은 뒤에는 완료 판정을 되돌렸다. v2·v3는 당시 판단과 유효한 사실 교정을 복구하는 snapshot으로 그대로 보존했다. 기존 파일을 고치거나 v4로 잇지 않고 [public reshape cycle](../../backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-public-reshape/README.md)의 판단에 따라 [public-reshape-v1 다섯 편](./2026-07-27-public-reshape-v1/README.md)을 새로 완결했다.

## 버전

- `2026-07-27-public-reshape-v1/` — 공개 독자 진입, 구체 장면, 저자 agency, 글별 portfolio signal을 기준으로 새로 구성하고 독립 review와 source 교정까지 마친 현재 사용자 검토본
- `2026-07-27-near-final-v3/` — 전면 재작성 v2에 독립 review와 main 판정, regression review를 반영하고 검증했으나 이후 공개 독자 재평가에서 완료 판정을 철회한 snapshot
- `2026-07-27-near-final-v2/` — backlog와 직접 원천, 기존 draft·review를 종합해 전면 재작성한 동결 review 입력
- `2026-07-27-post-sync-v1/` — 전체 자료를 다시 종합하고 사용자와 중심을 맞춘 뒤 Material → Shaping → Texture와 독립 review를 거친 비교 snapshot
- `v1/` — 전체 backlog와 연결 원자료를 종합해 만든 첫 완결 초안
- `v2/` — v1 독립 review와 main의 반영 판단을 거친 초안
- `v3/` — 새 독립 review와 main의 두 번째 반영 판단을 거친 사용자 검토본

각 버전은 다음 파일을 가진다.

- `current-active-state-operation.md`
- `independent-review-and-recovery.md`
- `product-flow-scope-control.md`
- `judgment-order.md`
- `ai-self-check.md`

## 작업 경계

- 현재 기준과 후보 상태는 [backlog active-state](../../backlog/ai-native-topic-research-2026-07-20/active-state/README.md)가 소유한다.
- 버전별 review와 반영 판단은 [draft loop process](../../backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-v1-v3-draft-loop/README.md)가 소유한다.
- 각 Markdown은 작성 시점에 날짜·순서·병합을 확정하지 않고 만든 공개 후보 초안 snapshot이다.
- 로컬 절대 경로, private conversation 원문, 개인 메모 문장, 내부 코드와 파일명을 본문에 넣지 않는다.
- 수치와 사건은 연결된 직접 원천에서 확인한 범위만 사용한다.
- `content/drafts/ai-self-check-fundamental.md`는 현재 workspace와 Git history에 없으므로 source로 복원하거나 가정하지 않는다.

## 초안 형식

- frontmatter의 `date`는 사용자 발행 결정 전까지 `TBD`로 둔다.
- `platform`은 `Blog`로 둔다.
- 다섯 글은 한 가지 템플릿으로 평평하게 만들지 않고, 각 글의 중심 질문에 맞는 article type과 호흡을 사용한다.
- test 수·문서 수·줄 수는 해당 checkpoint의 범위를 붙이며 품질·생산성·사용자 가치로 확대하지 않는다.

## 검증

repo root에서 다음을 실행한다.

```sh
node scripts/blog-prepublish-check.mjs
```

draft의 `date: TBD` 경고는 예상된 상태다. 공개 경계, 링크, 사실 정합성은 스크립트와 별도로 확인한다.
