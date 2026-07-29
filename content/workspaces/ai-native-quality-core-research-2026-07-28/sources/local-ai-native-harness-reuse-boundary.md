---
작성일: 2026-07-29
성격: 기존 조사 재사용 범위와 claim ceiling
원천: /Users/hammyeong-yeon/Desktop/ai-native-harness
현재상태: 읽기 전용 참고
---

# 기존 ai-native-harness 재사용 경계

## 왜 다시 읽었는가

이번 workspace의 후보가 사용자와 Current 사례에서 나온 언어에만 갇히지 않았는지 확인하기 위해, 별도 프로젝트인 `/Users/hammyeong-yeon/Desktop/ai-native-harness/`의 개념 조사와 현재 inventory를 읽었다.

그 프로젝트는 이번 문제의 해결안이 아니다. AI harness의 개념, 관계, 운영 상태, source 판정 방법을 별도 목적으로 조사한 자료다.

## 직접 사용한 파일

- `/Users/hammyeong-yeon/Desktop/ai-native-harness/README.md`
- `/Users/hammyeong-yeon/Desktop/ai-native-harness/research/2026-07-20-ai-native-harness-concepts-and-relations.md`
- `/Users/hammyeong-yeon/Desktop/ai-native-harness/research/2026-07-20-ai-native-harness-concept-coverage-map.md`
- `/Users/hammyeong-yeon/Desktop/ai-native-harness/research/2026-07-19-ai-native-harness-landscape.md`
- `/Users/hammyeong-yeon/Desktop/ai-native-harness/inventory/current-harness-inventory.md`
- `/Users/hammyeong-yeon/Desktop/ai-native-harness/workflows/external-source-research-workflow.md`
- `/Users/hammyeong-yeon/Desktop/ai-native-harness/learning/logs/2026-07-22-harness-configuration-and-runtime-state.md`

## 가져오는 개념

### 구성 종류

- instruction
- rule
- policy
- permission
- sandbox
- prompt
- skill
- tool
- MCP
- agent와 subagent
- workflow와 orchestration
- playbook과 runbook
- hook과 automation
- context, state, memory, artifact
- acceptance, verification, trace, eval, observability
- plugin
- configuration

### 운영 field

- canonical source
- owner
- consumer
- applicability scope
- presence
- load와 delivery
- activation과 invocation
- effect와 enforcement
- persistence
- lifecycle status
- evidence record
- retirement condition

### 유지할 구분

- shared source와 runtime-specific consumer
- advisory와 enforced
- reusable knowledge와 work-unit state와 recovery history
- 파일 존재와 실제 load
- hook 발동과 handler 성공과 기대 효과
- capture와 restore
- retrieval과 semantic acceptance와 operational verification

## 그대로 가져오지 않는 것

- 해당 프로젝트의 권장 우선순위
- 현재 개인 하네스 inventory의 구체 경로
- 그 프로젝트가 정한 이름을 이번 workspace의 최종 vocabulary로 자동 채택하는 일
- 조사 보고서의 결론을 공식 제품 사실처럼 취급하는 일
- 모든 개념을 하나의 hierarchy로 만드는 일

## 이번 workspace에서의 사용 방식

기존 조사에서 형식 누락을 찾고, Codex·Claude 공식 문서에서 현재 제품 surface를 다시 확인한 뒤, `references/harness-form-catalog/`에서 담는 위치·발동·권한·검증 방식의 후보로 재구성한다.

기존 조사와 이번 사용자 대화가 같은 방향을 가리켜도 자동 합의로 올리지 않는다. 서로 다른 근거가 같은 후보를 지지한다는 정도로 기록한다.

이 자료가 제공하는 것은 `내용의 정답`보다 `가능한 그릇`에 가깝다. 예를 들어 Skill의 존재는 특정 판단 절차를 Skill로 만들라는 결론이 아니라, 필요할 때만 불러오는 재사용 절차라는 형식이 가능하다는 근거다.
