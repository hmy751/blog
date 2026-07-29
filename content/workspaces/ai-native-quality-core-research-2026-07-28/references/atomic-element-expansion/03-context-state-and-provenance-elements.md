---
작성일: 2026-07-29
성격: context·state·provenance 하네스 요소 후보
현재상태: 미채택
---

# Context, State, and Provenance Elements

이 문서의 후보는 context를 많이 저장하는 장치가 아니다. 다음 실행이 무엇을 사실·가설·현재 선택·보류 상태로 이어받는지 구분하는 후보다.

## C01. 전체 지도와 현재 cursor

**형태**

- 한 페이지 workspace map
- 현재 cycle cursor

**계약**

전체 작업의 목적·workstream·source·artifact 관계와, 지금 수정하는 한 지점을 분리해서 보여준다. cursor가 전체 지도 역할을 대신하지 않는다.

**입력과 반환**

- 입력: 장기 작업 구조, 현재 요청, 최근 결정
- 반환: 전체 지도, 현재 위치, 이번에 건드리지 않는 영역

**실패 신호**

현재 질문 몇 개가 프로젝트의 존재 이유로 승격되거나, 전체 배경 때문에 지금 행동이 불명확해진다.

## C02. 사용자 목적과 현재 작업 frame의 동시 보존

**형태**

- active-state의 `purpose`와 `current frame` 별도 field

**계약**

사용자 목적은 여러 cycle을 관통하는 이유를, current frame은 지금 시험하는 해석과 범위를 담는다. frame 변경 history는 purpose 변경으로 기록하지 않는다.

**입력과 반환**

- 입력: 직접 사용자 발화, 현재 working hypothesis
- 반환: 확인된 목적, current frame, 둘 사이 연결과 긴장

**실패 신호**

최근 frame을 잘 수행했지만 사용자는 처음 원하던 가치가 사라졌다고 느낀다.

## C03. 판단 provenance 상태

**형태**

- 각 중요한 판단에 `origin`, `status`, `authority`, `evidence` field

**계약**

다음을 구분한다.

- 사용자 합의
- main의 현재 판단
- reviewer 제안
- source에서 확인된 사실
- 작업 가설
- 보류

**입력과 반환**

- 입력: decision과 그 발생 장면
- 반환: 누가 무엇을 근거로 어느 범위까지 정했는지

**실패 신호**

reviewer의 문구나 main의 요약이 사용자 결정처럼 current에 들어간다.

## C04. Source role map

**형태**

- source별 기대 역할과 실제 사용 상태

**계약**

Source를 `evidence`, `motive`, `scene`, `counterexample`, `reference form`, `background`, `verification target`으로 구분한다. 하나의 source가 여러 역할을 가질 수 있다.

**입력과 반환**

- 입력: source universe와 current artifact
- 반환: 기대 역할, 실제 작동, 빠진 중요한 역할

**실패 신호**

자료는 많이 읽었는데 결과는 summary만 재생산한다.

## C05. Source universe와 review packet 분리

**형태**

- 전체 source index
- 특정 reviewer에게 주는 packet manifest

**계약**

모든 source가 존재하는 위치와, 이번 역할이 실제로 받은 입력을 별도 기록한다. packet의 선택 이유와 제외 source를 밝힌다.

**입력과 반환**

- 입력: reviewer 역할, 전체 source, token·시간 제약
- 반환: 전달 파일, 요약, 제외 항목, claim ceiling

**실패 신호**

`소스까지 줬다`고 생각했지만 reviewer가 어떤 문서를 실제로 읽었는지 모른다.

## C06. 판단의 시간축

**형태**

- decision chronology
- superseded marker

**계약**

현재 결론만 남기지 않고 어떤 관찰 뒤 판단이 바뀌었는지 최소한의 순서를 보존한다. 이전 판단은 삭제 대신 superseded 이유를 남긴다.

**입력과 반환**

- 입력: quality signal, decision diff
- 반환: 이전 판단, 새 판단, 바뀐 근거

**실패 신호**

나중에 current만 읽으면 왜 이 기준이 생겼는지 복원할 수 없다.

## C07. Current contract와 process history 분리

**형태**

- `current`: 지금 적용할 계약
- `process`: 어떻게 여기 왔는지

**계약**

현재 실행자가 알아야 할 상태를 chronology로 오염시키지 않는다. 반대로 current를 덮어쓰며 판단 근거를 지우지 않는다.

**입력과 반환**

- 입력: 과거 시도, 현재 선택, 열린 문제
- 반환: 현재 authoritative state와 재검토 가능한 history

**실패 신호**

현재 문서가 시행착오 일지가 되거나, process가 없어서 같은 오진을 반복한다.

## C08. Stale current 감지

**형태**

- current freshness check
- source or decision dependency marker

**계약**

current가 참조하는 goal, artifact, source, decision이 바뀌었는지 검사한다. 수정 시각만으로 freshness를 판정하지 않는다.

**입력과 반환**

- 입력: dependency 목록과 현재 값
- 반환: fresh, stale, partially stale와 영향 범위

**실패 신호**

최신 파일이지만 이전 frame과 폐기된 후보를 계속 권위 있게 설명한다.

## C09. Completion·acceptance·verification 상태 필드

**형태**

- artifact frontmatter 또는 ledger

**계약**

각 상태의 owner와 evidence를 함께 둔다. `complete: true` 하나로 사용자 수용과 사실 검증을 표현하지 않는다.

**입력과 반환**

- 입력: artifact, review, test, 사용자 판정
- 반환: 획득한 상태, 근거, 다음 상태 owner

**실패 신호**

완결 v1이나 review PASS가 current 자동 승격의 근거가 된다.

## C10. 열린 경쟁 가설 register

**형태**

- hypothesis, support, counterevidence, discriminating test, status

**계약**

아직 원인이 정해지지 않은 문제는 이름만 나열하지 않고 서로 구분되는 관찰을 붙인다. 한 가설이 채택되면 나머지를 폐기한 근거를 남긴다.

**입력과 반환**

- 입력: 반복 실패와 competing diagnosis
- 반환: 살아 있는 가설, 다음 판별 행동

**실패 신호**

`근본 원인` 한 문장이 빠르게 current가 되어 대안 경로를 닫는다.

## C11. Cross-session sync packet

**형태**

- reentry brief

**계약**

새 session에 전체 history를 덤프하지 않고 다음을 전달한다.

- 목적과 현재 frame
- 확인 사실과 열린 가설
- authoritative artifact
- 하지 말아야 할 중복·오진
- 다음 판단
- 사용자 결정이 필요한 경우

**입력과 반환**

- 입력: current, process, source map, 최근 user signal
- 반환: 독립 실행 가능한 짧은 packet과 원문 접근점

**실패 신호**

handoff가 너무 짧아 같은 오진을 반복하거나 너무 길어 current가 묻힌다.

## C12. Scaffolding feedback channel

**형태**

- 결과에서 scaffold로 돌아가는 change proposal

**계약**

작업 structure, role, prompt, criteria, context 분리가 결과를 어떻게 도왔거나 막았는지 기록한다. 한 결과의 불만을 즉시 영구 규칙으로 쓰지 않고 change candidate로 돌려보낸다.

**입력과 반환**

- 입력: artifact result, quality signal, process trace
- 반환: 유지·수정·삭제할 scaffold 후보와 근거

**실패 신호**

하네스는 계속 늘지만 어떤 요소가 실제로 도움이 되었는지 알 수 없다.
