---
작성일: 2026-07-28
성격: Alex 원본 확인 범위와 일반화 경계
직접원천: /Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/00-원본자료/영상전사/2026-07-04_AX인재전쟁_transcript.md
---

# Alex Evidence Boundary

## 이 자료를 다시 보는 이유

Alex 사례는 이 조사에서 두 역할을 한다.

1. Current라는 context 장치를 만들 때 scaffolding에 영감을 준 내용 계보
2. 약한 결과가 나온 뒤 자신이 준 제약과 평가 기준을 다시 본 품질 개선 감각의 비교 사례

이 두 역할은 연결되지만 같지 않다. Scaffolding을 만들었다는 사실만으로 quality loop가 작동한 것은 아니며, quality loop를 설명한다고 해서 Current의 구체 구조가 정답이 되는 것도 아니다.

## 원본에서 확인된 scaffolding

### 먼저 작업의 틀을 만든다

- repo와 회사별 sub-repo를 먼저 만들고 그 안에 context를 넣으려 했다. 원본 941~949행.
- README와 `agents.md`에 해커톤 문제 풀이용 plugin이라는 목적과 요구사항을 반복해서 넣었다. 원본 1211~1236행.
- 여러 회사에 같은 큰 절차를 적용하되 회사별 context와 실행 공간은 분리했다.

### 역할

원본에서 scaffolding은 다음을 하려는 장치였다.

- agent가 과제 범위를 벗어나 엉뚱한 전체 사업이나 앱을 만드는 것을 막는다. 원본 1237~1266행.
- 공통 절차와 회사별 context를 담을 공간을 먼저 만든다.
- 병렬 실행이 같은 목적과 제출 경계를 공유하게 한다.
- 나중에 결과를 검토할 접근점을 만든다.

### 여기서 바로 일반화하면 안 되는 것

- repo, README, `agents.md`를 만들면 품질이 보장된다는 주장
- 회사별 sub-repo가 모든 장기 작업의 정답이라는 주장
- context를 많이 적는 것 자체가 좋은 scaffolding이라는 주장
- Alex의 해커톤 단계 이름을 그대로 다른 프로젝트에 적용하는 것

## 원본에서 확인된 human-led concept improvement loop

### 1. 초기 제약을 준다

Alex는 해커톤, 제한 시간과 리소스, 실제 사업 전체가 아니라 핵심 plugin 또는 feature라는 범위를 명시했다. 원본 1246~1263행.

### 2. 검토 가능한 중간 결과를 만든다

회사별 리서치, 문제, solution 후보를 빠르게 읽고 다음 진행 여부를 판단할 artifact report를 만들게 했다. 원본 2282~2302행.

이 결과는 최종 구현물이 아니다. 일부 artifact에는 solution이 충분히 들어 있지 않았다. 그러므로 `완결된 최종 결과를 probe로 사용했다`고 쓰면 과장이다.

### 3. 사람이 약함을 판정한다

문제 선택은 좋지만 solution이 작고 약하다고 판단했다. 원본 2318~2332행, 2359~2364행.

이는 정량 평가로 입증된 절대 품질 판정이 아니라, Alex가 출제자와 reviewer 위치에서 내린 판단이다.

### 4. 결과만 고치지 않고 자신이 준 제약을 의심한다

Alex는 자신이 3~6시간 또는 제한 리소스 안에 만들 수 있는 범위를 강조한 것이 작은 solution으로 이어졌다고 진단했다. 원본 2365~2373행.

안전한 표현:

> Alex는 약한 solution 후보를 보고 자신이 준 시간·리소스 제약이 solution scope를 과도하게 줄였다고 진단했다.

과도한 표현:

> 약한 top-level goal이 약한 결과를 만들었다는 사실을 증명했다.

원본은 goal 전체보다 시간·리소스 제약과 기대하는 solution 크기에 더 직접적으로 닿아 있다. 또한 인과는 Alex의 자기 진단이지 통제된 검증이 아니다.

### 5. 스코프와 평가 압력을 바꾼다

- 1~2주 동안 만들 수 있는 수준으로 기대 범위를 높였다.
- complexity, virality, visual appeal, impact, creativity, uniqueness 같은 기준을 추가했다.
- 실제 사업의 일부가 될 수 있고 데모 가능한 prototype을 기대했다.
- 시각적으로 확인하고 바로 이해할 output을 먼저 정의하라고 보강했다.

근거: 원본 2407~2439행, 2487~2494행.

### 6. 비싼 다음 단계 전에 human gate를 둔다

구현 비용이 커지기 전에 진행을 멈추고 solution 방향을 다시 봤다. 원본 2398~2405행.

### 7. 재위임 뒤 더 강하다고 판단한 방향을 고른다

재생성된 solution 방향을 이전보다 낫다고 판단하고 회사별 후보를 선택했다. 원본 2598~2667행.

따라서 원본이 지원하는 가장 높은 claim은 다음과 같다.

> Alex는 인간이 개입한 한 차례의 solution concept 개선 loop를 보여줬다. 약한 후보 뒤 자신이 준 시간·범위 제약과 기대 수준을 다시 보고, 평가 기준과 output 조건을 보강해 재위임한 뒤 더 강하다고 판단한 방향을 선택했다.

## 원본에서 계획으로만 남은 것

### Builder와 reviewer의 의식적 분리

원본 2178~2206행에서 역할 분리를 설명한다. 다만 당시 실제 building은 아직 시작되지 않았고, 본인이 builder이자 reviewer라고 말했다. 독립된 두 실행 역할이 완결된 사례로 쓰면 안 된다.

### Fresh reviewer

원본 2211~2217행에서 기존 agent의 bias를 피하기 위해 새 subagent가 처음부터 검증하게 하는 방법을 설명했다. 실제 실행 결과는 방송에서 확인되지 않는다.

### Evaluation Foundation

원본 2227~2234행에서 앞으로 만들겠다는 계획으로 말했다. 실제 파일, 기준 갱신 기록, 반복 결과는 확인되지 않는다.

### Final autonomous loop

원본 후반에 최종 구현과 evaluation loop를 지시했지만, 방송은 loop가 진행 중인 상태에서 끝난다. 완료 후 ZIP 검증과 제출도 미래 계획으로 남았다.

확인되지 않은 것:

- autonomous loop 반복 횟수
- 반복별 구현과 기준 변경
- AI judge 실행 결과
- 정상·예외·정보 부족 test 결과
- 최종 plugin 품질
- 최종 ZIP 검증과 제출

## 원본에서 가져올 수 있는 감각 후보

아래는 아직 이 workspace core에 채택된 원칙이 아니다. 원본이 비교 사례로 지원하는 감각 후보들이다.

### 결과를 보고 입력 판단을 역추적한다

약한 결과의 원인을 결과 자체뿐 아니라 자신이 준 constraint와 기대 수준에서 찾았다.

열린 질문:

- 어떤 근거가 있을 때 결과 문제가 아니라 constraint 문제라고 판정할 수 있는가
- constraint를 키운 것이 단순 취향 변화인지 실제 품질 개선인지 어떻게 다시 볼 것인가

### 평가 가능한 중간 결과를 만든다

긴 리서치와 solution 후보를 빠르게 판단할 artifact report로 만들었다.

열린 질문:

- 무엇이 보여야 하는지에 따라 전체 완결본과 중간 probe 중 무엇이 적절한가
- probe 형태가 평가하려는 관계를 미리 왜곡할 수 있는가

### 비싼 실행 전에 human gate를 둔다

구현 전에 solution 크기와 방향을 사람이 다시 봤다.

열린 질문:

- 어떤 전환이 충분히 비싸거나 비가역적이어서 human gate가 필요한가
- 모든 단계의 사람 승인이 병목이 되지 않게 하려면 무엇을 AI가 닫을 수 있는가

### 평가 기준을 생성 압력으로 다시 사용한다

기준은 결과 채점에만 쓰이지 않고 다음 solution을 다르게 생성시키는 입력이 됐다.

열린 질문:

- 기준을 언제 생성 압력으로 쓰고 언제 필터로만 써야 하는가
- 구체적인 기준이 후보를 풍부하게 하는 대신 모두 같은 모양으로 만들 위험은 없는가

### Output을 먼저 보이게 만든다

평가자가 빠르게 보고 이해할 수 있는 output 형태를 요구했다.

열린 질문:

- output-first가 실제 사용자 가치와 causal path를 드러내는가
- 시각적 데모 가능성이 보이지 않는 핵심 품질을 밀어내는가

## Alex 상황에 묶인 세부 기준

다음은 그대로 일반화하지 않는다.

- 1~2주 scope
- virality와 visual appeal
- 해커톤 1등 수준
- dashboard, knowledge graph 같은 표현 형태
- Codex plugin
- 회사별 solution 이름
- AI judge subagent 가정

이 기준들은 그 해커톤의 목적과 Alex의 taste를 설명할 수 있지만, 모든 AI-native 품질 개선의 보편 기준은 아니다.

## Current와 연결할 때의 경계

확인 가능한 연결:

- Alex의 scaffolding을 보고 전체 구조와 context가 있으면 더 낫겠다는 사용자의 생각이 Current의 내용 계보에 있다.
- Alex의 약한 solution 재평가는 결과 뒤 constraint와 evaluation을 다시 보는 비교 사례다.

아직 우리의 해석인 연결:

- Current의 A/B 실패를 Alex의 loop 부재와 동일 원인으로 보는 것
- Current에도 반드시 Alex와 같은 scope escalation이 필요했다는 것
- Current의 quality loop가 final autonomous loop여야 했다는 것

Current에서 직접 확인된 문제는 이미 있던 목적과 material이 작업 중 전달되지 않고 임시 frame이 강화된 것이다. Alex에서는 자신이 준 constraint가 solution ambition을 줄였다는 자기 진단이 중심이다. 둘은 `결과 뒤 상위 판단을 다시 본다`는 수준에서는 비교할 수 있지만, 같은 실패로 합치면 안 된다.
