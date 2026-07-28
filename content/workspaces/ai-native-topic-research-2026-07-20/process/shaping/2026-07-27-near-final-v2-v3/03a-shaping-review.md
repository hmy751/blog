---
작성일: 2026-07-27
성격: near-final v2 독립 shaping review 보존본
공개상태: 내부 작업 문서
---

# 독립 shaping review

## 전체 판정

다섯 편 모두 중심을 다시 열거나 전면 재작성할 단계는 아니다. `reshape` 판정은 없었다.

- Scope control: `keep`
- Current: `partial edit`
- 독립 판별: `partial edit`
- 판단 순서: `partial edit`
- AI self-check: `partial edit`

공통 과제는 후기부에 두 번째 사례나 자기참조 장면이 들어오며 이미 도착한 결론을 한 번 더 증명하는 점, `A가 아니라 B`, `같은 일이 아니었다`, `권한이었다`형 판정문이 결말에 반복되는 점이다.

## Scope control

### 판정

대표 장면과 상태 표, 구현 결과, 실제 소비자라는 결말이 안정적이다. “체크인은 몇 시부터인가”라는 질문과 검색 결과 목록의 차이에서 독자가 바로 붙는다. artifact gap은 없다.

### 보호

- “검색 결과는 아직 사용자의 답이 아니었습니다.”
- `15:00 / 16:00 / missing` 제품 계약 표
- 실제 질문 route와 unused path 삭제
- “slice의 끝은 화면보다 실제 소비자가 정합니다.”

### v3 move

- deterministic baseline은 별도 대단원보다 product proof의 하위 반례로 내리고 20~30% 압축한다.
- test 절에서 앞의 표가 이미 보여 준 source 변경 예시를 한 번 덜 설명한다.
- 마지막 세 원칙문을 한 호흡으로 줄인다.

## AI self-check

### 판정

세 사례가 과교정, 탐색 범위 조기 종료, 설명과 행동의 불일치라는 서로 다른 층을 맡고 있다. 했다체와 마지막 개인 판단 변화는 유지해야 한다.

### 보호

- 교정된 첫 종합 → 과교정 → 관계 복구
- 세 상태 도식
- “결론은 달라졌지만 판단축은 그대로였다.”
- “`더 근본적으로`를 `더 추상적으로` 읽은 셈이었다.”
- 진단·다음 행동·재발 감소의 구분
- 마지막 “AI의 설명과 행동을 같은 결과로 보지 않게 됐다.”

### v3 move

- 첫 사건에서 첫 점검, 두 번째 점검, 작업을 조율한 AI의 역할을 한 문장으로 식별한다.
- “말이 커졌다 / 더 추상적으로 읽었다 / 결정 위치로 돌아간다”는 연속 판정문을 하나의 대표 문장과 설명으로 줄인다.
- forward-bias의 지침 이력과 증거 상한을 한 문단으로 압축한다.
- 모든 정정을 self-check로 올리지 않는 절은 절반가량 줄이되 발동 경계는 남긴다.

## 독립 판별

### 판정

`"false"` 최소 재현, 9·15 검증 표, source 교정, 설치형 자연어 E2E, 판정 회수로 이어지는 technical-case-study가 강하다.

### 보호

- 첫 checkpoint와 `"false"` bug
- “test가 거짓말을 한 것은 아니었습니다.”
- 검증 역할 표
- 기능을 더 만들지 않고 같은 checkpoint를 다시 닫은 교정
- 판정과 main 회수 흐름
- 마지막 “제3판별자는 세 번째 AI가 아니었습니다.”

### v3 move

- 다른 답변 시스템의 반례는 `닫힌 입력 밖을 복구하지 못한다`는 한계 한 문단으로 압축한다.
- 회수 trace를 4단계 정도로 줄여 운영 기록 인상을 낮춘다.
- 결말의 질문 목록은 `다른 source와 실제 입력 / 수정·완료 선언 권한 / 판정의 재실행` 세 축으로 압축한다.

## Current

### 판정

기록 부족과 현재 효력의 혼재를 구분하고, state 역할과 read/write ownership을 설계한 글로 성립한다. 표와 current 예시, 질문별 시간축 trace가 핵심 artifact다.

### 보호

- 현재 contract와 history가 같은 갱신 규칙을 가졌던 첫 장면
- 분리 전후 표
- 전체 지도와 단일 cursor 예시
- “이번 판단의 시간축은 어디까지인가?”
- overwrite와 update ownership의 tradeoff
- `current`를 active control로 회수하는 결말

### v3 move

- 전후 표와 역할 도식 중 반복 설명을 줄인다.
- Git marker 수치는 의미를 짧게 풀어 process accounting 인상을 낮춘다.
- 현재 글 후보 준비의 자기참조 사례는 update ownership 아래 한 문단으로 줄인다.
- 후기의 판정문을 덜어 결말에 더 빨리 진입한다.

## 판단 순서

### 판정

현재 글감 조사에서 같은 오류를 다시 만든 frame과 과거 제품 조사의 실제 output 비교가 learning-experiment를 만든다. artifact gap은 없다.

### 보호

- cursor·중심 질문·claim ceiling의 오용을 보여 주는 첫 표
- 첫 후보판을 덮어쓰지 않은 별도 pass
- `3 problems → 9 solutions → 3 outputs → 선택` 흐름
- 세 output 비교표
- `확인됨 / 불충분 / 모름 / 확인 필요`
- “수렴을 늦춰 얻은 것은 비교 가능한 차이”
- 현재 글 조사로 돌아오는 bookend

### v3 move

- 과거 제품 조사 안의 세 단계를 `###`로 내려 heading hierarchy를 만든다.
- 9 snapshot과 8 transition accounting은 판단에 쓰이지 않으면 줄인다.
- 수렴 절과 현재 장면 회수가 이중 결말이 되지 않게 전자를 압축한다.
- 마지막 세 판정문은 두 호흡으로 줄인다.

## 글간 독립성과 중복

다섯 편은 각각 독립 글로 성립한다.

- Scope: 작은 slice가 보존해야 할 제품 작용
- Self-check: 정정 뒤 판단축과 행동까지 검사하는 일
- 독립 판별: 다른 검증 세계와 권한을 가진 판단 위치
- Current: 긴 시간축에서 현재 권위와 원천을 연결하는 active state
- 판단 순서: 기준의 적용 단계와 종료 권한

실질 중복은 두 곳이다.

1. 독립 판별의 답변 grounding 반례와 Scope의 grounding 본문
2. Current의 현재 글 후보 자기참조와 판단 순서의 현재 글감 조사 frame

첫 번째는 독립 판별에서 입력 한계만 남기고, 두 번째는 Current에서 한 문단으로 줄이는 편이 각 글의 소유권을 선명하게 한다.
