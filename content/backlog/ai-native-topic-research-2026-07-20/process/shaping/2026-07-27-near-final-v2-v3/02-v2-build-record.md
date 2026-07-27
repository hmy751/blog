---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: near-final 전면 재작성 v2 build record
공개상태: 내부 작업 문서
현재상태: 다섯 v2 완료·독립 review 입력으로 동결
---

# 전면 재작성 v2 build record

## v1에서 공통으로 바꾼 것

post-sync v1의 중심과 사실 상한은 유지했다. 다만 문장을 polish하는 대신 각 글의 material과 shaping을 다시 열었다.

- 실제 사건보다 앞서던 개념 정의와 운영 질문을 뒤로 보냈다.
- 글마다 대표 사건 하나를 시간순으로 복원했다.
- public-safe artifact가 차이를 먼저 보여 주고 산문은 그 차이를 해석하게 했다.
- 사용자 개입, AI의 첫 판단, 바뀐 선택, 확인된 결과를 같은 장면 안에서 연결했다.
- 방어적 claim ceiling을 글 끝에서 반복하지 않고 해당 주장 가까이에 붙였다.
- article type마다 다른 진행과 결말을 사용했다.

## 글별 build 판단

### Current

- process 안에서 현재 contract와 history가 같은 갱신 규칙을 가졌던 장면을 첫 사건으로 올렸다.
- `source / history / active contract / current`를 파일 taxonomy가 아니라 read/write 권한 이동으로 보여 줬다.
- 전체 지도와 cursor의 예시 뒤에 실제 Git 운용 수치를 넣되, 활동 흔적 이상의 품질 해석은 막았다.
- 설문 사건은 `current` 실패가 아니라 잘못된 시간축으로 원천을 읽은 stress test로 썼다.
- terminal gap과 현재 blog의 재귀적 재현은 갱신 ownership의 후반 한계로 배치했다.
- 결말은 기록량이 아니라 권위와 갱신 경로로 닫았다.

### 독립 판별

- 9개 초록 뒤의 여러 결함을 먼저 나열하지 않고 문자열 `"false"` 실패를 확대했다.
- 실제 bug mechanism이 `bool("false")` 변환이 아니라 type guard가 없는 값의 분기 우회였음을 공개용 최소 재현으로 정확히 썼다.
- 9·15 test와 숫자 밖의 source 대조·설치형 E2E를 표로 분리했다.
- source와 fixture가 충돌한 티켓 절차, strict schema, 참여자 범위, order conflict를 같은 checkpoint의 교정으로 연결했다.
- 판별 출력의 별도 보존과 main의 회수를 실제 한 항목 trace로 구현했다.
- 닫힌 입력을 받은 별도 judge의 반례는 reviewer 한계로 짧게 남겼다.
- 결말은 세 번째 AI가 아니라 다른 검증 세계와 완료 선언 권한으로 닫았다.

### Scope control

- raw 중간 결과와 deterministic baseline이 실제 배포 실패가 아니라 구현 전 제안임을 첫 장면에서 명시했다.
- 구현량 비교보다 두 경로가 끝나는 위치와 사용자가 해야 할 해석의 차이를 먼저 보여 줬다.
- `15:00 / 16:00 / 시각 문장 없음` 표로 값·근거 상태·다음 행동을 함께 움직였다.
- 마지막 행이 metamorphic test의 세 번째 arm이 아니라 별도 계약을 합친 공개 설명임을 바로 밝혔다.
- 질문 수·문서 형식·provider 같은 폭과, source→answer→consumer의 작용을 나눴다.
- 세 제품행동 test와 unused path 삭제를 correction의 직접 artifact로 썼다.
- 결말은 UI나 파일 수가 아니라 실제 소비자가 받는 변환으로 닫았다.

### 판단 순서

- 현재 blog 조사에서 main AI가 cursor·claim ceiling·중심 질문을 후보 가치 판단으로 오용한 재귀적 장면을 첫 사건으로 사용했다.
- 기준 자체가 아니라 기준이 잘못 겨눈 대상과 종료 권한을 표로 보였다.
- sequential gate 정정, first board 보존, second pass의 비교 권한 변화를 시간순으로 연결했다.
- `3 problems → 9 solutions → 3 outputs → 9 snapshots / 기록상 8 transitions → 선택`을 품질 지표가 아니라 비교 재료의 변화로 썼다.
- 실제 제품이 아닌 Markdown과 정적 목업임을 artifact 가까이에서 제한했다.
- claim strictness는 후보 전체 closure와 분리해 한 절에서 설명했다.
- 결말은 방법론 성공보다 비교 전에 보이는 차이가 달라졌다는 learning-experiment의 발견으로 닫았다.

### AI self-check

- 전체 글을 했다체 1인칭 retrospective로 전환했다.
- 원천과 달랐던 `회사 중심 → 사용자 중심` 서술을 폐기했다.
- `함께 보던 첫 종합 → 회사 방향 우선 과교정 → 증명 역할 관계 복구`를 주 장면과 artifact로 다시 만들었다.
- 별도 점검의 유효한 판정을 main이 적용하며 기존 관계를 지웠다는 actor와 판단 이동을 명시했다.
- assignment는 원자료 부재 전제와 “더 근본적 / 더 추상적” 발견을 맡겼다. 보존되지 않은 중간 AI 답변은 재구성하지 않았다.
- forward bias는 사용자 제동 세 번, 지침 변경, 장기 효과 미확인까지만 써 진단·다음 행동·재발 감소를 분리했다.
- 독립 판별 계약은 반복하지 않고 바깥 판단 위치가 필요한 조건만 연결했다.
- 결말은 self-check의 성과보다 AI 설명과 행동을 같은 결과로 보지 않게 된 개인 판단 변화로 닫았다.

## v2 동결 hash

독립 review는 아래 SHA-256의 원고를 입력으로 사용한다.

| 파일 | SHA-256 |
| --- | --- |
| `ai-self-check.md` | `8156d23f7456cb9d1985e2c68cb6dbb7f739cd9711216c1ad28f1a446d9c5cca` |
| `current-active-state-operation.md` | `7dddf798f4681510996d0faae13146071fac31db94c081139b9d50f78407c3e3` |
| `independent-review-and-recovery.md` | `bf424702952a87dbf24301c51d37aa5b9e6de371e32fa60da39d8b06b47c50bd` |
| `judgment-order.md` | `601cf54acc76e14d4ed835e3a385a971057b609ccf5b9adb953df5b561daa715` |
| `product-flow-scope-control.md` | `47e5013d8d89d5cc774d474d76ba6eeb3620a62a5c51565712bbffad15523ab8` |

review가 시작된 뒤 v2는 수정하지 않는다. 모든 반영은 별도 v3에서 수행한다.
