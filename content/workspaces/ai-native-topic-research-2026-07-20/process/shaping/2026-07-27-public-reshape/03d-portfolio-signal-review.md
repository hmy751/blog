---
작성일: 2026-07-27
성격: public-reshape-v1 portfolio signal review 원문
공개상태: 내부 작업 문서
검토입력: public-reshape-v1, portfolio-signal lens, developer lens
---

# Portfolio signal review

- **Current** — “상태를 수명·쓰기 권한·원천 권위로 나눠 장기 작업의 오독을 막는 개발자.” **PASS**: 낡은 완료 조건과 최근성 편향을 문제로 정의하고, 실제 질문 축소와 답변 재작성 사례를 근거로 상태 분리와 갱신 책임까지 연결한다.

- **AI self-check** — “AI의 결론만 고치지 않고 관찰이 전제가 된 결정 위치와 닫힌 입력 범위를 추적해 다음 행동을 바꾸는 개발자.” **PARTIAL**: 자료 역할 분리, 누락 역추적, 반복 행동 뒤 지침 변경은 구체적이지만 사례가 넓게 퍼져 개발 역량보다 정교한 AI 운영 능력으로 먼저 읽힐 위험이 있다.

- **Scope control** — “디버그 출력을 제품으로 착각하지 않고 실제 소비자까지 이어지는 변환과 근거를 test로 닫는 제품 개발자.” **PASS**: raw 검색 결과의 책임 전가를 문제로 잡고, metamorphic·grounding·route test와 미사용 경로 제거까지 선택과 행동이 명확하다.

- **Independent review** — “초록 test가 덮지 못한 검증 세계를 외부 source·입력 계약·범위·설치 E2E로 다시 여는 검증 중심 개발자.” **PASS**: `"false"` 결함, fixture 모순, 참여자 범위와 순서 의존성이라는 증거에서 교정 범위를 정하고 제품 경로를 재실행한다.

- **Judgment order** — “좋은 기준으로 후보를 너무 일찍 닫지 않고 동등한 output과 상태 변화를 만든 뒤 제품 경계를 선택하는 탐색형 개발자.” **PASS**: 후보–solution–output–snapshot 비교, 선택 이유와 맡지 않을 범위, 이후 판단 질문까지 구체적이며 정적 목업의 증명 한계도 좁혀 말한다.

가장 강한 신호는 Independent review다. 결함 재현, 검증 범위 확장, 역할 분리, 재실행이 한 흐름으로 맞물려 추가 질문에도 버틸 근거가 가장 많다.

가장 약한 신호는 AI self-check다. 판단 오류를 디버깅하는 역량은 보이지만, 여러 meta 사례 때문에 `복잡한 AI process를 잘 운영한다`는 인상으로 납작해질 가능성이 가장 크다.

다섯 신호는 부분적으로만 충분히 구별된다. 제품 slice, 검증, 탐색은 선명하게 갈리지만 상태 운영·self-check·판단 순서는 모두 권한·범위·다음 행동을 다뤄 portfolio 전체에서는 하나의 AI process control 역량으로 겹쳐 보인다.
