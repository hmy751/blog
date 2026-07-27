---
작성일: 2026-07-27
성격: near-final v2 독립 texture review 보존본
공개상태: 내부 작업 문서
---

# 독립 texture review

## 전체 판정

v2는 post-sync v1보다 풍부함을 실제로 회복했다. 다섯 편 모두 추상 원칙이 사례, 실패, 수치, 비교 artifact에 다시 붙었다.

새 material을 줄이기보다 artifact 뒤의 재설명, 중복 판정문, 반복되는 증거 방어를 국소적으로 줄여야 한다. 다섯 글이 다시 같은 표면으로 수렴하지 않게 다음 고유 질감을 보호한다.

- Self-check의 했다체와 자기 관찰
- Current의 시간축 질문과 실제 운용 흔적
- 독립 판별의 `"false"` bug와 forensic 리듬
- 판단 순서의 현재 글 조사 bookend
- Scope의 실제 소비자 기준

## AI self-check

### Protect

- 첫 종합의 두 증명 역할과 과교정
- 세 상태 도식
- “말은 더 커졌지만 결과를 만든 위치에서는 멀어졌다.”
- “`더 근본적으로`를 `더 추상적으로` 읽은 셈이었다.”
- 사용자가 실행을 멈춘 세 기록
- 마지막 두 문장

### Flattening risk

- 도입이 같은 발견을 여러 판정문으로 반복한다.
- 질문 목록 뒤의 설명이 하네스 문서처럼 읽힌다.
- `더 추상적으로 / 결정 위치` 발견이 네 번 착지한다.
- 진단·행동·재발의 세 층과 self-check 발동 범위가 운영 매뉴얼처럼 길다.

### Safe polish

- `더 근본적 / 더 추상적` 대표 문장을 남기고 주변 표어를 흡수한다.
- 진단·직후 행동·장기 재발은 한 문장씩만 남긴다.
- 발동하지 않는 경우 한 문장, 발동하는 경우 한 문장으로 압축한다.
- 했다체와 마지막 개인 판단은 유지한다.

## Current

### Protect

- process 안에서 active contract가 낡아 간 도입
- 분리 전후 표
- 역할 도식과 current 예시의 서로 다른 기능
- 실제로 덮어쓴 상태였음을 보여 주는 Git 수치
- 설문 최근성 편향, terminal gap, 현재 blog 권위 누수라는 서로 다른 세 실패
- “이번 판단의 시간축은 어디까지인가?”

### Flattening risk

- 표 뒤 역할 분리를 다시 긴 산문으로 설명한다.
- `current = router`가 두 번 결론 난다.
- 각 실패 뒤 인과 상한이 같은 리듬으로 반복된다.
- 결말 두 문장이 같은 발견을 연속해서 닫는다.

### Safe polish

- 표 뒤 설명을 한 문장으로 합친다.
- router 결론은 current 예시 뒤에만 둔다.
- marker 수치는 삭제하지 말고 실제 active cursor라는 의미를 명확히 한다.
- blog 자기참조는 용어 설명을 한 번만 붙이고 짧게 보존한다.
- 마지막은 active control 문장 하나로 닫는다.

## 독립 판별

### Protect

- `"false"`가 type guard를 비껴간 실제 bug
- 공개용 최소 코드
- 9·15 검증 역할 표
- source와 fixture가 충돌한 티켓 절차
- 충분한 답변 뒤 다른 충돌과 부담을 보존한 결과
- 닫힌 입력 밖을 못 보는 별도 판별자의 한계

### Flattening risk

- “내부 구현을 복사하지 않았다”는 제작 meta가 본문에 나온다.
- 회수 trace가 20행짜리 운영 기록처럼 보인다.
- 결말 직전 질문 목록이 checklist처럼 읽힌다.

### Safe polish

- 공개용 code 소개를 “실패 범주를 최소 코드로 줄이면”으로 바꾼다.
- 회수 trace를 판별 / 계약 대조 / 교정·재실행 / 남은 범위 네 덩어리로 줄인다.
- 결말 질문을 세 축으로 줄인다.
- clean-room이 아니라는 사실 상한은 유지한다.

## 판단 순서

### Protect

- 현재 blog cursor 오독과 첫 표
- 첫 판을 보존한 별도 pass
- 3×3 solution 흐름과 세 output 비교표
- 확실성 상태 네 가지
- 현재 글 조사로 돌아오는 bookend

### Flattening risk

- 통제 실험이 아니라는 방어가 길다.
- 흐름 블록 앞뒤 산문이 단계를 다시 설명한다.
- snapshot과 transition 수치 뒤 한계가 연속된다.
- 수렴 절이 한 번 결론을 낸 뒤 현재 frame에서 다시 결론을 낸다.
- v1의 “평가 언어를 먼저 주자 같은 rubric을 되비춘다”는 짧은 반례가 사라졌다.

### Safe polish

- blind 상한을 한 문장으로 줄인다.
- 흐름 블록 앞은 `3×3 / 생성 pass / 검증 pass`만 남긴다.
- 수치와 한계를 한 문장으로 합치거나, 판단에 불필요한 transition accounting을 뺀다.
- 방어 문장을 줄여 자리가 생기면 rubric-first의 반복 관찰을 두 문장 정도 복원한다.
- 수렴 절은 `수렴을 없앤 것이 아니라 입력을 바꿨다`와 `비교 가능한 차이`만 남긴다.

## Scope control

### Protect

- 체크인 질문과 “검색 결과는 아직 사용자의 답이 아니다”
- 구현 전 두 경로
- `15:00 / 16:00 / missing` 표
- actual route와 unused path 제거
- deterministic baseline과 product proof 구분
- 마지막 “무엇을 버릴지보다 무엇을 끝까지 남길지”

### Flattening risk

- 표를 공개용으로 단순화했다는 제작 meta
- 표 뒤 bullet과 산문이 인과를 다시 설명한다.
- test 절 마지막이 소제목을 표어로 반복한다.
- 결말이 세 원칙문으로 연속해서 닫힌다.

### Safe polish

- 표를 “제품 계약의 최소 형태”라고 설명한다.
- 표 뒤 중복 판정문을 덜어낸다.
- test 절의 반복 착지문을 삭제한다.
- 실제 소비자와 마지막 범위 축소 기준 두 문장만 남긴다.
- deterministic baseline은 짧게 해도 product proof와 기준선의 경계는 보존한다.
