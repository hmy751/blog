# AI-native 상위 후보 draft loop

이 폴더는 AI-native 글감 상위 후보 다섯 개를 선택 전에 실제 산문으로 비교하기 위한 작업면이다.

v1, v2, v3는 같은 다섯 파일을 가진다. 이전 버전을 덮어쓰지 않으며, 폴더 순서와 파일 순서는 후보 가치나 발행 순서가 아니다.

v3까지 작성과 독립 review 반영을 마쳤다. 현재는 사용자가 다섯 v3와 변화 기록을 함께 검토할 차례이며, 첫 글·병합·발행 순서는 정하지 않았다.

## 버전

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
- 각 Markdown은 날짜·순서·병합을 확정하지 않은 공개 후보 초안이다.
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
