---
작성일: 2026-08-02
성격: 목표·실행 계약 요구사항별 완료 감사
공개상태: 내부 작업 문서
현재상태: 기술 요구 검증 완료 / 사용자 checkpoint 미충족
---

# AI self-check 통합 개선 completion audit

## 감사 기준

이 감사는 현재 src와 실행 계획, 회차별 draft·review·recovery, 최종 evidence report를 요구사항별로 대조한다. 파일이 있다는 사실이나 검사가 실패하지 않았다는 사실만으로 넓은 완료를 주장하지 않는다.

## Goal의 독자 결과

### 인정이나 반대 결론에서 멈추지 않게 한다 — Achieved

현재 원고는 답이 바뀌었다는 말과 답을 만든 위치의 변화를 구분한다. 제품 데모에서는 정확한 진단, 바로 다음 제안, 재발 감소를 서로 다른 질문으로 분리하고, 마지막에는 다음 행동이 같은 방향이면 아직 작업에 옮겨지지 않았다고 회수한다.

Round 05 fresh reviewer도 이 요구를 Achieved로 판정했다.

### 다섯 판단 위치 중 실제로 달라진 곳을 판별하게 한다 — Achieved

- 아카이브: 입력 범위와 다음 행동이 달라졌다.
- 제품 데모: 문제 정의는 달라졌지만 작업 순서와 다음 행동은 익숙한 방향으로 돌아갔다.
- AX: 회사 자료 비중이라는 전제는 유지했고, 축소됐던 입력 범위와 작업 순서, 다음 질문을 복구했다.

Round 05 fresh reviewer는 다섯 위치가 정의에 머물지 않고 각 사건의 변화와 비변화를 구분하게 한다고 판정했다.

### 최근 대화를 다시 열어 판단 위치를 확인하게 한다 — Achieved

결말은 인정이나 반대 결론이 나온 지점과 바로 다음 답까지 보게 하고, 문제 정의·전제·입력 범위·작업 순서·다음 행동 중 실제로 달라진 위치를 확인하게 한다.

Round 05 fresh reviewer도 대상 대화와 확인할 지점이 모두 지정됐다고 판정했다.

### 다음 동작 하나를 바꿀 수 있게 한다 — 원고 계약·simulated transfer Achieved / 실제 사람 독자 수행 Unproven

결말은 달라진 위치가 없다면 자료 하나를 다시 열거나, 비교 하나를 복구하거나, 불확실성을 다시 묻는 일을 바로 다음 요청으로 지정하게 한다. 원고가 제공해야 할 행동 경로는 충족한다.

[blind reader transfer test](./final-reader-transfer-test.md)에서 새 독자는 최종 원고만 읽은 뒤 낯선 edge runtime 대화의 다섯 위치를 구분하고, 작업 순서 하나를 골라 `배포 설정과 빌드 제약을 먼저 확인한 뒤 후보를 다시 비교해 달라`는 다음 요청을 만들었다. 특히 사용자가 edge runtime을 알려 준 것과 AI가 실제 배포 설정을 확인한 것을 구분해 입력 범위는 그대로라고 판정했다. 원고의 구분이 새로운 사례로 전이된다는 simulated evidence는 확보했다.

실제 사람 독자가 발행 뒤 행동했는지는 측정하지 않았으므로 경험적 효과로 주장하지 않는다. 이 미측정은 원고의 행동 경로나 전이 증거가 없다는 뜻과 다르다.

## 실행 계획

### Author/draft map — Achieved

[저자·원고 지도](./01-author-draft-map.md)가 현재 원고의 작동 장면, 사용자 확인 경험, 현재 회고, source 사실, 열린 기억, 빠진 판단, 보호할 흐름과 writer 우선 과제를 구분한다.

### 작성자와 reviewer 역할 분리 — Achieved with bounded executor deviation

사용자는 실제 저자로 남고, writing worker는 후보 원고만 썼으며, reviewer는 report-only였다. Round 01~04의 실질 재작성은 같은 writing worker가 이어 갔다. Worker가 turn 상한에 도달한 뒤 Round 05의 합의된 두 국소 move와 fresh review 회수는 Main이 적용했다. 이는 동일한 실제 저자와 목소리를 바꾸지 않았고 fresh reviewer가 texture 회귀나 고우선 blocker를 찾지 않았다.

계획의 ‘writing worker 기본 유지’에서 기술 실행 주체가 마지막 국소 회수 때 달라진 사실은 숨기지 않는다. 새 writer가 중심과 목소리를 다시 만든 회차는 아니며 Main의 최종 반영 권한 안에서 처리했다.

### 최대 5회 통합 loop — Achieved

Round 01~05 각각에 완결본, review 기록, Main recovery가 있다. Round 02의 첫 reviewer가 source 전면 확장으로 improvement 경계를 벗어난 시도는 중단하고 판정에서 제외했으며, 입력을 좁힌 새 fresh reviewer의 report만 사용했다.

### 매 회 fresh reviewer — Achieved after recovery

Round 01~04는 서로 이전 회차를 보지 않은 reviewer의 통합 report를 보존한다. Round 05는 현재 thread의 agent 상한 때문에 첫 생성이 실패했지만, 완료 감사에서 standalone ephemeral·read-only Codex를 이전 작업 맥락 없이 실행했다. 이 reviewer는 Round 05 원고, source packet, 지정 editorial 기준만 보고 전체 판정을 반환했다. 앞선 non-fresh diff regression은 fresh 판정으로 올리지 않았다.

### Improvement-first review — Achieved

실행 계획과 cycle 계약은 reviewer가 가장 큰 개선축과 실제 move부터 반환하게 하고, source는 material과 사실·인과 상한의 guardrail로 제한한다. Round 02부터 이 경계를 적용했고, Round 05 fresh report도 개선축 → Material → Shaping → Texture → Reader Flow → blocker → 독자 결과 순서로 반환됐다.

### Main 회수와 독립 입력 경계 — Achieved

각 reviewer에게 사용자 인터뷰, author map, 이전 원고·review, Main 가설을 주지 않았다. Main은 report를 Material → Shaping → Texture·Reader Flow 순으로 채택·조정·기각했고, 사용자 인터뷰를 보지 못한 reviewer의 제안이 저자 판단과 충돌하면 자동 반영하지 않았다.

### 최종 evidence와 공개 경계 — Achieved

[최종 evidence report](./final-evidence-report.md)는 날짜·행위 주체·인과·수치·도식·최초 inline과 후대 fresh 구분·현재 회고의 시간 경계를 대조했다. 초기 P1을 수정한 뒤와 Round 05 fresh 회수 뒤 모두 국소 regression을 했고, 현재 src에는 P0·P1이 남지 않았다.

### 최신 src와 과정 기록 — Achieved

최종 회수본은 [현재 src](../../../src/ai-self-check.md)에 있다. Baseline, author map, 다섯 회차의 draft·review·recovery, user checkpoint, evidence report, blind reader transfer test, 이 completion audit은 cycle 안에 분리돼 있다. Process index, shaping index, src README, active-state의 cursor도 현재 상태를 가리킨다.

## 검증

- 상대 Markdown 링크: 통과
- `git diff --check`: 통과
- 공개 원고 금지 표현과 로컬 절대경로 검색: 현재 src에서 없음
- repo prepublish 검사: 통과. 다른 기존 draft 세 편의 TBD 경고만 있으며 이 원고는 아직 src 단계라 발행 metadata 검사는 대상이 아니다.

## 남은 종료 조건

사용자가 [현재 src](../../../src/ai-self-check.md)를 자신의 경험과 판단을 담은 글로 받아들이는지 아직 응답하지 않았다. Reviewer와 evidence checker는 이 권한을 대신하지 않는다.

현재 완료 판정: **기술적 요구 충족 / 사용자 checkpoint 대기**
