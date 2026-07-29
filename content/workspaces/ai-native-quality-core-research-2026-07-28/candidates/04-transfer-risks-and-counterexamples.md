---
작성일: 2026-07-28
성격: 후보 원리의 잘못된 전이, 반례, 비적용 조건
---

# Transfer Risks and Counterexamples

아래 항목은 후보를 버리기 위한 탈락표가 아니다. 좋은 감각이 다른 상황에서 반대 실패를 만들 수 있는 경우를 미리 펼친다.

## 1. Goal을 더 선명하게 쓰면 품질이 오른다

가능한 효용:

- 여러 agent가 같은 목적을 공유한다.
- drift와 쉬운 대체 행동을 줄인다.
- 통과 조건을 구체화한다.

위험:

- 잘못된 working frame을 더 강하게 고정한다.
- 사용자 목적과 이번 작업 가설을 한 문장으로 뭉친다.
- 결과가 약할 때 goal을 바꿔 실패를 정당화한다.

Current 반례:

- Q1~Q5 중심을 더 명료하게 적는 것은 원래 motive 복구가 아니라 잘못된 중심 강화가 될 수 있었다.

글쓰기 밖 반례:

- 명확한 API contract를 구현하다 생긴 단순 type bug는 goal을 다시 쓸 문제가 아니다.
- benchmark 목표가 고정됐는데 성능이 낮다고 목표를 낮추면 goalpost 이동이다.

확인 질문:

- 원래 목적이 없었는가, 있었지만 사라졌는가
- 작업 가설이 틀린가, top-level purpose가 실제로 바뀌었는가
- goal 변경 권한은 누구에게 있는가

## 2. 약한 결과 뒤 criteria를 갱신한다

가능한 효용:

- 평가에서 발견한 품질 차이를 다음 생성에 반영한다.
- 같은 실패를 반복하지 않는다.

위험:

- reviewer 한 명의 taste를 영구 기준으로 만든다.
- criteria가 계속 늘어나 새로운 후보를 anchoring한다.
- 이전 결과의 결함에 overfit한다.
- 기존 frame이 틀렸는데 기준만 추가해 frame을 더 정교하게 보호한다.

글쓰기 밖 반례:

- 일시적인 network failure에 맞춰 제품 success criteria를 바꾸면 안 된다.
- 한 benchmark sample의 이상치로 전체 rubric을 바꾸면 overfit이다.

확인 질문:

- artifact 한 번의 수정 조건인가, 반복 가능한 기준인가
- 다른 결과와 다른 사례에서도 같은 축이 나타났는가
- 기준을 추가할 것인가, 기존 기준의 시점·권한만 바꿀 것인가

## 3. Complete artifact를 먼저 만든다

가능한 효용:

- 전체 흐름과 통합 품질을 직관적으로 본다.
- 각 조각이 합쳐질 때 생기는 문제를 드러낸다.

위험:

- feasibility 없는 아이디어에 polish 비용을 쓴다.
- 완결본만 평가 가능하다고 오해한다.
- 같은 frame의 완결본을 계속 생산한다.

글쓰기 밖 반례:

- 알고리즘 가능성은 작은 executable spike나 property test로 볼 수 있다.
- database migration 안전성은 완성 UI보다 rollback rehearsal이 더 적절하다.
- product state transition은 설치형 vertical slice가 문서 완결본보다 강한 probe다.

확인 질문:

- 지금 판단하려는 관계는 무엇인가
- 그 관계가 보이는 가장 적절한 resolution은 무엇인가
- completion과 acceptance가 구분돼 있는가

## 4. Reviewer를 늘리면 독립성이 생긴다

가능한 효용:

- 서로 다른 전문성, 독자, evidence 관점이 들어온다.

위험:

- 같은 packet, current, rubric, 질문을 공유하면 오류가 상관된다.
- 결론 표현만 달라지고 사건 universe는 같다.
- blind reviewer가 필요한 domain context 없이 틀린 판단을 할 수 있다.

Current 반례:

- A와 B는 다른 기준을 받았지만 Q1~Q5와 Current 사건 frame을 공유했다.

반대 반례:

- compliance 결과처럼 같은 rubric으로 비교해야 할 때 reviewer마다 질문을 바꾸면 비교 가능성이 떨어질 수 있다.

확인 질문:

- 이번에 끊어야 할 오류 상관은 무엇인가
- 원자료 접근, 질문 변경, write 권한, 완료 선언, main 회수 중 무엇이 달라야 하는가

## 5. Current를 두면 장기 작업이 제어된다

가능한 효용:

- 전체 계보와 현재 cursor를 재추론하는 비용을 줄인다.
- 여러 session과 agent가 같은 현재를 본다.

위험:

- stale current가 직접 원천보다 높은 잘못된 권위가 된다.
- tentative assumption이 사용자 합의로 굳는다.
- 잘못된 frame을 더 빠르고 일관되게 복제한다.
- 여러 writer가 동시에 갱신하면 current가 여러 개가 된다.

글쓰기 밖 반례:

- 짧은 one-shot 변환에는 current가 필요 없다.
- 실시간 incident의 권위는 수동 Markdown보다 monitoring system일 수 있다.

확인 질문:

- 재진입과 재추론 비용이 실제로 있는 장기 작업인가
- current의 owner와 stale 확인 방식이 있는가
- 합의 상태와 원천 경로가 보이는가

## 6. 충분히 펼친 뒤 수렴한다

가능한 효용:

- 조기 기준이 후보 전체를 비슷하게 만드는 것을 막는다.
- 예상 밖의 가치와 상위 패턴을 발견한다.

위험:

- 무한 발산과 결정 회피가 된다.
- hard constraint와 공개 경계를 나중으로 미룬다.
- 실제로 같은 후보의 표현만 늘린다.

글쓰기 밖 반례:

- security, privacy, 법적 금지, schema compatibility는 탐색 초기에도 적용한다.
- production incident는 먼저 안정화하고 후보 확장은 뒤에 할 수 있다.

확인 질문:

- 무엇을 펼치고 무엇은 동시에 엄격히 판정하는가
- 후보가 새 메커니즘을 추가하는가, 같은 표현만 반복하는가
- 정보 포화와 시간·비용 경계는 무엇인가

## 7. Scope를 줄여도 전체 causal path를 보존한다

가능한 효용:

- 쉬운 내부 artifact가 사용자 상태 변화를 대신하는 것을 막는다.
- product slice가 실제 다음 행동까지 이어지는지 본다.

위험:

- 모든 기술 spike에 full product E2E를 요구한다.
- component 단위의 유용한 실험이 무거워진다.

글쓰기 밖 반례:

- storage engine 성능 spike는 UI까지 연결하지 않아도 된다.
- parser correctness proof는 전체 product journey와 다른 단위다.

확인 질문:

- 이 artifact는 product slice, component contract, feasibility probe, 발견용 실험 중 무엇인가
- product effect를 주장하는가, 기술 가능성만 시험하는가

## 8. Self-check로 근본 원인을 찾는다

가능한 효용:

- AI 자신의 framing, scope, context와 tool 선택을 원인 모델에 넣는다.
- 같은 행동 반복을 발견한다.

위험:

- 같은 frame을 더 정교하게 합리화한다.
- 설명만 길어지고 다음 행동은 같다.
- 단순 정정에도 meta 절차가 붙는다.
- 외부 원인을 AI의 framing 문제로 잘못 돌린다.

글쓰기 밖 반례:

- typo와 syntax error는 바로 고치면 된다.
- 외부 서비스 장애를 prompt 문제로만 보면 실제 causal actor를 놓친다.

확인 질문:

- 한 번 고친 뒤 같은 축의 행동이 반복됐는가
- 감사 뒤 실제 입력, 도구, 작업 위치, 다음 행동이 바뀌었는가

## 9. Output-first가 더 좋은 후보를 고르게 한다

가능한 효용:

- 이름과 기능 목록 대신 실제 사용 결과를 비교한다.
- 심사자와 사용자가 보게 될 결과를 조기에 확인한다.

위험:

- 화려한 artifact가 약한 problem evidence를 덮는다.
- visual appeal이 user value처럼 취급된다.
- 보이지 않는 reliability, data quality, operation cost가 밀린다.

글쓰기 밖 반례:

- dashboard mockup은 underlying data quality를 증명하지 않는다.
- 인상적인 demo가 operational feasibility와 demand를 보장하지 않는다.

확인 질문:

- output이 어떤 사용자 행동이나 판단을 실제로 바꾸는가
- problem evidence와 output appeal을 별도 축으로 유지했는가
- 비교용 artifact와 final contract를 구분했는가

## 10. Human taste가 품질을 끌어올린다

가능한 효용:

- 언어화하기 어려운 ambition, coherence, reader impact를 빠르게 감지한다.
- 비싼 다음 단계 전에 방향을 멈춘다.

위험:

- 개인 취향을 사용자 가치나 사실로 승격한다.
- vivid title, 이름, visual polish가 causal effect보다 앞선다.
- 사용자의 첫 인상에 맞추느라 다른 독자와 evidence를 잃는다.

Alex 내부 반례:

- `Constellation`이라는 이름과 떠오르는 그림에 강하게 반응했지만 실제 value와 feasibility는 확인되지 않았다.

확인 질문:

- taste가 맡는 판단은 정확히 무엇인가
- fact, feasibility, user evidence를 별도 위치에서 봤는가
- human gate는 방향 결정인가, 모든 세부 승인인가

## 11. Loop를 계속 돌리면 품질이 오른다

가능한 효용:

- 결과와 기준을 반복해서 대조한다.
- 실제 실패를 다음 행동에 반영한다.

위험:

- 같은 frame 안에서 polish만 늘어난다.
- evaluation overfitting과 criteria inflation이 생긴다.
- stop condition 없는 autonomous 반복이 비용만 만든다.
- 결과를 정당화하려 goal이 계속 움직인다.

글쓰기 밖 반례:

- 고정 unit test를 반복 통과해도 external contract는 틀릴 수 있다.
- biased simulator에서 reward가 높아져도 실제 환경 성능은 나빠질 수 있다.

상위 판단을 다시 열 신호 후보:

- 의미 있는 수정 뒤 같은 불만이 반복됨
- local metric은 통과했지만 실제 사용 계약이 틀림
- 중요한 source가 결과에서 반복 누락됨
- 여러 reviewer가 같은 input frame 안에서만 수렴함
- 현재 constraint나 criteria가 약한 결과를 유도했다는 구체적 evidence가 생김

한계:

- 신호가 있어도 artifact, source 전달, working goal, criteria/evaluator, top-level purpose를 한꺼번에 모두 바꾸지 않는다.

## 12. Core에 남기면 다음 품질이 좋아진다

가능한 효용:

- 판단 감각과 변경 이유를 다음 session에 복원한다.
- 반복 실패를 언어화한다.
- 사용자가 자신의 사고를 학습할 재료가 된다.

위험:

- 규칙이 계속 쌓여 새로운 작업을 anchoring한다.
- retrospective 설명이 실제 인과처럼 굳는다.
- process chronology와 core 원칙이 섞인다.
- 현재 행동을 찾기 어려운 거대한 문서가 된다.

글쓰기 밖 반례:

- incident마다 규칙을 추가한 runbook은 실제 장애 시 읽히지 않을 수 있다.
- 오래된 architecture principle이 새 constraint에서 잘못된 선택을 강제할 수 있다.

확인 질문:

- 지금 남기는 것은 품질 효과가 검증된 mechanism인가, 학습을 위한 설명인가
- 정의, 대비, 발동 신호, 행동, 한계, 사례 중 무엇이 필요한가
- 상세 chronology는 process에 남아 있는가

## 13. Scaffolding을 잘 만들면 agent가 잘 간다

가능한 효용:

- 목적과 context를 공유한다.
- 병렬 작업의 범위와 역할을 맞춘다.
- 재진입 비용을 낮춘다.

위험:

- 최초 가정이 틀리면 잘못된 방향을 더 빠르게 복제한다.
- scaffolding의 존재가 실제 결과 검증을 대신한다.
- context가 많아질수록 중요한 권한 차이가 묻힌다.

반례:

- Current 자체가 잘못된 중심을 보존하고 다음 결과를 anchoring할 수 있었다.
- 좋은 폴더 구조와 agent 역할이 있어도 output의 user value는 별도 판단이 필요하다.

확인 질문:

- scaffolding이 보존하는 목적과 가정은 현재도 유효한가
- 결과가 scaffolding의 결함을 되돌려 고칠 수 있는가
- 최초 구조를 수정할 owner와 신호가 있는가

## 14. 모든 중요한 판단은 provenance를 남겨야 한다

가능한 효용:

- 사용자 합의, 작업 가설, reviewer 제안이 섞이지 않는다.
- 다음 AI가 권한을 복원한다.

위험:

- 작은 결정까지 상태를 붙여 문서가 무거워진다.
- provenance 형식 준수가 실제 판단보다 중요해진다.
- 현재 상태를 찾기 어려워진다.

반례:

- 되돌리기 쉬운 국소 표현과 명백한 사실 교정에는 상세 decision provenance가 불필요할 수 있다.

확인 질문:

- 이 판단이 중심, 사용자 해석, 작업 범위, 반복 criteria를 바꾸는가
- 나중에 출처를 잃으면 다른 권한으로 오해될 위험이 있는가
- current에는 낮은 해상도 상태만 두고 상세 이유는 process에 둘 수 있는가

## 15. 사용자 거부는 상위 frame을 다시 열 신호다

가능한 효용:

- 정량 기준이나 reviewer가 놓친 실제 목적 유실을 발견한다.

위험:

- 모든 취향 차이를 system redesign으로 키운다.
- 사용자의 첫 반응을 원인 분석 없이 새 절대 기준으로 만든다.

반례:

- 한 문장의 어색함, 오탈자, 사실 오류는 국소 수정으로 끝날 수 있다.
- 사용자의 판단도 새 자료와 결과 뒤 바뀔 수 있다.

확인 질문:

- 한 차례 meaningful correction 뒤에도 같은 종류의 거부가 반복됐는가
- 거부가 문장, 구조, source 전달, 중심, 사용자 의도, criteria와 권한 중 어디를 가리키는가
- 사용자 경험을 바꾸는 판단과 artifact를 고치는 판단을 구분했는가
