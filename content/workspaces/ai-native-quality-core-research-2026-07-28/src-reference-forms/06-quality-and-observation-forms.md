---
작성일: 2026-07-29
성격: artifact·verification·observation 형식 후보
현재상태: 형식 비교용
---

# Quality and Observation Forms

## QO01. Integrated artifact

- **작동:** 부분 간 관계를 실제 결과로 묶어 전체 판단을 가능하게 한다.
- **적합:** draft, app slice, report, rendered page, complete plan.
- **부적합:** 통합 artifact 하나가 모든 사실·risk·acceptance를 증명.
- **확인할 것:** 어떤 관계를 관찰하려고 통합했는지.

## QO02. Example or golden sample

- **작동:** 원하는 결과의 구체적 모양과 품질을 보여준다.
- **적합:** voice, output format, behavior, visual target.
- **부적합:** 예시의 표면 구조를 template로 복사.
- **확인할 것:** 재사용할 원리와 상황 의존 요소.

## QO03. Counterexample

- **작동:** 규칙이나 grader가 통과시키면 안 되는 경계 사례를 제공한다.
- **적합:** overgeneralization, false positive, superficially polished failure.
- **부적합:** 드문 예외 하나로 모든 기준을 폐기.
- **확인할 것:** 어떤 판단 경계를 보정하는지.

## QO04. Unit or component check

- **작동:** 작은 함수·파일·component의 닫힌 contract를 빠르게 확인한다.
- **적합:** parser, formatter, schema field, individual hook handler.
- **부적합:** 전체 사용자 흐름과 통합 quality.
- **확인할 것:** test scope와 mocked dependency.

## QO05. Contract test

- **작동:** component나 tool 경계의 input-output, schema, permission, error behavior를 검증한다.
- **적합:** MCP tool, plugin manifest, artifact schema, API.
- **부적합:** contract 밖의 의미와 usefulness.
- **확인할 것:** version, provider behavior, failure case.

## QO06. End-to-end verification

- **작동:** 실제 환경에서 시작 입력부터 외부 결과까지 경로를 실행한다.
- **적합:** publish flow, user journey, source-to-output pipeline.
- **부적합:** 모든 edge case와 long-term value.
- **확인할 것:** environment, observed evidence, reproducibility.

## QO07. Human review

- **작동:** 사람이 결과와 evidence를 보고 의미·risk·taste·trade-off를 판단한다.
- **적합:** public writing, design, irreversible action, ambiguous quality.
- **부적합:** machine-checkable invariant의 반복 수동 확인.
- **확인할 것:** review question, authority, decision record.

## QO08. Independent evaluation

- **작동:** 생성 process와 분리된 evaluator가 criteria와 source로 결과를 판정한다.
- **적합:** correlated self-review 위험, frame challenge, evidence audit.
- **부적합:** 독립 packet 없이 이름만 다른 reviewer.
- **확인할 것:** input independence, criteria authority, disagreement handling.

## QO09. Eval set and grader

- **작동:** representative case와 expected behavior를 반복 실행해 model·prompt·harness 변화를 비교한다.
- **적합:** routing, skill activation, extraction, structured review behavior.
- **부적합:** 사례가 거의 없거나 gold judgment가 안정되지 않은 열린 창작 전체.
- **확인할 것:** dataset coverage, grader validity, regression, cost.

## QO10. Trace/log

- **작동:** 실제 event, tool call, state transition, output, error를 시간순으로 기록한다.
- **적합:** 무엇이 load·invoke·execute되었는지 확인.
- **부적합:** trace 존재를 outcome success로 간주.
- **확인할 것:** privacy, retention, correlation id, sampling.

## QO11. Observability view

- **작동:** 여러 trace·state·run을 사람이 빠르게 비교할 수 있는 화면이나 report로 집계한다.
- **적합:** activation failure, repeated stall, hook failure, scheduled run.
- **부적합:** viewer의 요약을 source of truth로 승격.
- **확인할 것:** underlying evidence 접근과 viewer 자체의 오류.

## QO12. Evidence receipt

- **작동:** 어떤 방법으로 무엇을 언제 확인했고 결과가 무엇이었는지 작은 증거 단위를 남긴다.
- **적합:** runtime load, link access, test execution, source retrieval.
- **부적합:** receipt가 지원하지 않는 semantic claim.
- **확인할 것:** target, method, timestamp, environment, version, result.
