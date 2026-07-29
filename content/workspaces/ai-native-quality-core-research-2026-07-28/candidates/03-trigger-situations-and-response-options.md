---
작성일: 2026-07-28
성격: 상황별 진단 질문과 대응 선택지
상태: 확장 중 / 고정 workflow 아님
---

# 발동 상황과 대응 선택지

이 문서는 모든 작업에서 위에서 아래로 수행하는 절차가 아니다. 비슷해 보이는 실패에도 원인이 다를 수 있으므로, 관찰된 상황에서 무엇을 더 확인하고 어떤 대응을 선택할 수 있는지 넓게 남긴다.

같은 상황에서도 다음 대응이 모두 가능하다.

- 결과의 국소 오류만 고친다.
- 기존 goal과 source를 유지하고 구조·구현을 다시 만든다.
- 작업 가설이나 대표 장면만 다시 연다.
- source packet과 context 역할을 다시 고른다.
- constraints 또는 success condition을 바꾼다.
- 독립 판단 위치를 추가하거나 reviewer contract를 바꾼다.
- main의 회수와 사용자 합의 provenance를 다시 본다.
- 충분한 관찰이 없으면 더 통합된 output probe를 만든다.
- 현재 대응이 과도하면 아무 메타 절차도 추가하지 않고 그대로 진행한다.

어떤 선택이 맞는지는 “근본적”이라는 말의 크기가 아니라 실제 간극이 처음 생긴 위치와 변경 권한으로 판단한다.

## 1. 결과는 세련됐는데 사용자가 “하려던 일이 아니다”라고 한다

### 관찰할 것

- 사용자가 거부한 것은 표현, 구조, 중심, 발생 이유, 사용자 경험 가운데 무엇인가.
- 결과가 실제로 통과한 기준은 무엇이고 그 기준은 사용자 목적을 포함했는가.
- 현재 중심은 사용자 합의인가, main·reviewer의 working hypothesis인가.
- 결과에서 반복적으로 사라진 material이 source에 이미 있었는가.
- 사용자가 좋아한 요소와 거부한 요소를 분리할 수 있는가.

### 대응 선택지

- 거부가 국소 표현이면 현재 frame 안에서 편집한다.
- 중심이나 발생 이유 문제면 기존 문장을 고치기 전에 goal·작업 가설·source 역할을 다시 본다.
- 사용자 반응이 아직 러프하면 완결 결과의 어느 관계가 어긋났는지 대조 질문을 만든다.
- 현재 결과를 폐기하지 않고 잘못된 판단 체계의 관찰물로 보존한다.
- 사용자가 좋아한 제목·장면·기술 요소는 별도 material로 남기되 기존 중심을 자동 유지하지 않는다.

### 피할 것

- “취향 문제”로 축소한다.
- formal PASS를 들어 사용자의 품질 신호를 반박한다.
- 사용자의 첫 표현을 곧바로 보편 core rule로 번역한다.
- 모든 source와 workflow를 처음부터 재실행한다.

### Current 적용

A는 제목과 생생함이 더 좋았지만 Q1~Q5 frame은 거부됐다. 따라서 A 전체를 채택하거나 폐기하는 두 선택만 있는 것이 아니다.

## 2. 여러 번 수정했는데 같은 종류의 불만이 반복된다

### 관찰할 것

- 버전마다 바뀐 것과 끝까지 유지된 전제는 무엇인가.
- 반복 불만이 동일한 source 누락, 동일 중심, 동일 criteria, 동일 권한에서 생겼는가.
- 각 cycle에서 새롭게 학습한 판단이 있었는가, 표현만 바뀌었는가.
- reviewer와 writer가 같은 context·질문을 공유했는가.

### 대응 선택지

- 공통 전제를 시간순으로 추적해 처음 고정된 지점을 찾는다.
- 결과 수정 loop를 잠시 멈추고 result-system dual review를 한다.
- source-first second pass로 기존 artifact의 anchor를 줄인다.
- 반복 불만이 한 책임에서 생겼다면 그 책임만 다시 연다.
- 서로 다른 원인 후보를 한 개로 확정하지 말고 구별 관찰을 만든다.

### 피할 것

- 단순히 reviewer 수나 version 수를 늘린다.
- 최신 feedback 문구만 더 강하게 prompt에 넣는다.
- “반복됐으니 current/core 전체가 실패했다”고 확대한다.

### 비적용

버전마다 요구사항이 실제로 달라졌거나 서로 독립적인 오류라면 하나의 근본 원인으로 묶지 않는다.

## 3. 여러 review와 검증을 모두 통과했는데 품질이 전진하지 않는다

### 관찰할 것

- 각 review가 평가한 target과 입력 경계는 무엇인가.
- 지원하지 않는 결론이 무엇인지 명시돼 있는가.
- review들이 서로 다른 판단 위치였는가, 같은 brief의 부분 검사였는가.
- 사용자 목적 적합성을 직접 본 역할이 있었는가.

### 대응 선택지

- PASS를 사실, 구조, reader flow, 공개 경계 등 판정 범위별로 다시 분해한다.
- 빠진 평가 target을 추가한다. 예: 발생 이유, user value, goal 적합성.
- evaluation을 더 추가하기보다 goal과 source frame이 맞는지 먼저 본다.
- local PASS는 그대로 유지하고 global acceptance만 다시 연다.

### 피할 것

- 기존 review를 모두 무효로 선언한다.
- 부분 PASS를 합산해 전체 PASS라고 주장한다.
- 모든 review 역할을 하나의 “최종 judge”로 합친다.

### Current 적용

shaping·evidence·texture·light edit의 PASS는 사실·구조·문체 범위의 증거로 보존하되 글을 만든 이유가 살아 있다는 증거로 쓰지 않는다.

## 4. 여러 reviewer가 비슷한 결론을 낸다

### 관찰할 것

- 같은 result, source packet, goal, question, rubric 가운데 무엇을 공유했는가.
- 결론뿐 아니라 근거와 문제 정의도 비슷한가.
- reviewer가 packet 밖 source나 질문을 다시 열 수 있었는가.
- 유사 결론이 독립 재현인지 common frame 상관인지 판별할 자료가 있는가.

### 대응 선택지

- reviewer 수를 늘리기 전에 shared assumptions를 적는다.
- 한 reviewer는 current frame 안의 개선을, 다른 pass는 source-first regeneration을 맡긴다.
- 같은 source에서 질문만 다르게 하는 pass와 source 자체를 다르게 하는 pass를 구분한다.
- 사실에 대한 반복 일치는 강한 근거로 보존하되, 중심에 대한 일치는 별도 판정한다.

### 피할 것

- 다수결을 객관성으로 자동 승격한다.
- reviewer가 동의했다는 이유만으로 모두 상관됐다고 불신한다.
- 다양성을 위해 무작위 prompt만 늘린다.

### Current 적용

A와 B는 서로 다른 lens를 썼지만 같은 사건 universe를 공유했다. 둘의 차이는 source universe 밖의 새로운 중심이 아니라 Q1~Q5의 역할 차이였다.

## 5. 중요한 material이 source에는 있는데 결과에서 반복적으로 사라진다

### 관찰할 것

- material은 어느 source에 어떤 역할로 있었는가.
- writer·reviewer가 실제로 읽었는가.
- 읽었다면 중심·구조·평가 질문 가운데 무엇에도 영향을 주지 못했는가.
- material과 경쟁해 더 높은 권위를 얻은 최근 artifact나 명료한 frame은 무엇인가.

### 대응 선택지

- 새 material 수집보다 기존 material의 역할과 권위를 복구한다.
- source-to-decision trace를 짧게 만든다.
- 작업 가설과 source 역할을 함께 다시 세운다.
- 압축 전후 reverse trace로 의미 재료가 어디서 줄었는지 본다.
- source map에 접근점뿐 아니라 지원 역할과 계보를 보강한다.

### 피할 것

- Material 단계가 없었다고 즉시 진단한다.
- 빠진 source의 모든 내용을 결과에 넣는다.
- 단순 coverage checklist로 바꾼다.

### Current 적용

첫 shaping에 동기와 사용자 판단이 이미 있었으므로 “Material로 돌아가기”는 새 수집보다 기존 material이 판단에 작동하도록 복구하는 의미일 수 있다.

## 6. source packet을 최소화했는데 중요한 원인이 사라졌다

### 관찰할 것

- packet 최소화의 목적은 anchor 제거, 비용 절감, 사실 검증 중 무엇이었는가.
- 제외한 source에 motive, user agreement, causal history가 있었는가.
- reviewer가 부족한 source의 역할을 보고하거나 source universe를 탐색할 수 있었는가.
- source index 자체가 현재 frame에 묶여 있지는 않았는가.

### 대응 선택지

- packet에 더 많은 문서를 무작정 넣지 말고 빠진 역할을 추가한다.
- reviewer에게 “이 입력으로는 판정 불가”를 반환할 권한을 준다.
- 직접 원천 universe와 이번 packet을 분리해 기록한다.
- blind read와 context-aware problem review를 별도 pass로 둔다.

### 피할 것

- 독립성을 위해 사용자 목적까지 숨긴다.
- 반대로 모든 backlog와 process를 기본 입력으로 준다.
- source index 안에서 추가 선택 가능하다는 이유로 frame이 열려 있다고 가정한다.

## 7. context를 많이 줬더니 과거 설명에 anchoring된다

### 관찰할 것

- 과거 artifact가 사실 source인가, 이전 해석·review인가.
- 이미 고친 오류와 폐기한 기준이 live context처럼 들어갔는가.
- 이번 역할은 history를 알아야 하는가, 결과 자체를 봐야 하는가.

### 대응 선택지

- source와 prior interpretation을 분리한다.
- 역할별로 active contract만 주고 process는 필요할 때 내려가게 한다.
- 기존 결과를 가린 fresh/source-first pass를 추가한다.
- prior artifact를 주더라도 “현재 권위 아님”과 역할을 명시한다.

### 피할 것

- history를 전부 삭제한다.
- fresh pass에서 사용자 합의와 canonical source까지 제거한다.
- context 양만 줄이고 어떤 frame이 남았는지 보지 않는다.

### 비적용

현재 작업이 과거 결정의 일관성 검토라면 history anchoring이 아니라 필요한 입력일 수 있다.

## 8. reviewer나 main의 제안이 사용자 합의처럼 굳었다

### 관찰할 것

- 현재 중심·기준의 최초 출처는 누구인가.
- `채택`이 한 version 적용인지 장기 합의인지.
- active-state에 반영될 때 사용자 판단 근거가 있었는가.
- 이후 agent가 provenance를 볼 수 있었는가.

### 대응 선택지

- 제안, 시험 적용, 현재 working assumption, 사용자 합의, core 후보를 다시 구분한다.
- provenance가 불명확한 중심은 자동 폐기하지 말고 사용자와 다시 확인한다.
- 현재 작업을 막지 않는 임시 가설로 낮춰 시험한다.
- process에는 변천을, active-state에는 현재 합의와 열린 판단만 둔다.

### 피할 것

- provenance가 불명확하다는 이유로 모든 현재 판단을 무효화한다.
- 모든 micro decision을 사용자에게 다시 승인받는다.

### Current 적용

`한 사건`, `한 artifact`, 특정 article type과 Q1~Q5 주 장면은 reviewer·main 선택이 사용자 합의로 승격됐는지 다시 봐야 했다.

## 9. “goal을 다시 세워야 하나?”가 떠오르지만 무엇을 바꿀지 불명확하다

### 관찰할 것

- 흔들리는 것은 사용자 목적, current cycle goal, solution hypothesis, success condition 중 무엇인가.
- 결과가 무엇을 보여 줬기 때문에 변경을 고려하는가.
- 유지해야 하는 hard constraint와 상위 목적은 무엇인가.
- 변경이 더 좋은 목표를 만드는지 실패를 정당화하는지.

### 대응 선택지

- 네 층을 임시로 나눠 각각 유지·변경 여부를 적는다.
- 사용자 목적은 유지하고 작업 가설만 여러 개로 다시 펼친다.
- success condition에 빠진 가치 축을 추가한다.
- 결과가 부족하면 goal 변경 전 더 적절한 output probe를 만든다.
- 사용자 경험이나 상위 목적이 바뀌는 경우에만 사용자 판단을 요청한다.

### 피할 것

- `goal` 한 단어로 모든 변경을 묶는다.
- 결과에 맞춰 목표를 낮춘다.
- goal 문서부터 길게 만드는 것을 품질 개선으로 착각한다.

## 10. 결과를 보니 기존 평가 기준이 너무 낮거나 좁았다

### 관찰할 것

- 결과는 기존 기준을 실제로 충족했는가.
- 기준을 충족했는데도 어떤 가치가 빠졌는가.
- 빠진 가치는 처음 목적에 있었는가, 결과를 보고 새로 발견했는가.
- hard guard와 개선 가능한 quality criterion을 구분했는가.

### 대응 선택지

- result correction과 criteria update를 별도 기록한다.
- 누락된 value·ambition·reader effect를 기준 후보로 추가한다.
- criteria를 적용할 시점과 권한도 함께 조정한다.
- 새 기준으로 기존 결과와 새 결과를 함께 재판정한다.

### 피할 것

- 결과를 탈락시키기 위해 임의 기준을 사후 추가한다.
- 기존 기준을 모두 폐기한다.
- 한 사례에서 생긴 기준을 모든 작업의 core rule로 즉시 올린다.

### Alex 적용

약한 solution report 뒤 범위와 quality criteria를 보강한 것은 확인된다. 이것을 최종 autonomous loop 성공으로 확대하지 않는다.

## 11. 여러 agent가 모두 작고 무난한 solution만 낸다

### 관찰할 것

- main이 준 시간, 범위, 비용, 위험 회피, 형식 제한은 무엇인가.
- 평가 기준이 실행 가능성과 빠른 demo를 과도하게 보상하는가.
- agent가 어려운 핵심 작용 대신 측정하기 쉬운 artifact를 만든 것은 아닌가.
- 사용자 목적이 실제로 작은 solution을 원하는가.

### 대응 선택지

- constraints 가운데 탐색 공간을 부당하게 줄인 항목을 조정한다.
- 가치와 야심을 success condition에 명시한다.
- concept 단계와 implementation 단계의 제약을 다르게 둔다.
- 여러 output을 만든 뒤 비교할 human gate를 둔다.

### 피할 것

- 무조건 시간과 예산을 늘린다.
- 무난한 결과를 agent 능력 부족으로만 설명한다.
- 해커톤용 virality·visual appeal 기준을 일반 작업에 복사한다.

## 12. 기준을 먼저 줬더니 후보가 모두 비슷해졌다

### 관찰할 것

- 주어진 기준은 seed, filter, guard 중 어떤 역할이어야 했는가.
- 기준 문구가 후보 표면에 그대로 복제됐는가.
- 생성 전에 ranking·ROI·근거 준비도 판정이 함께 수행됐는가.
- 후보마다 다른 가능한 가치와 성과가 충분히 펼쳐졌는가.

### 대응 선택지

- hard guard만 유지하고 생성 질문을 더 개방한다.
- 기존 후보를 가린 source-first generation을 한다.
- 후보를 만든 뒤 같은 기준을 filter로 다시 적용한다.
- 사실·위험은 후보별로 표시하되 전체 종료는 뒤로 미룬다.

### 피할 것

- 발산을 이유로 factual rigor를 없앤다.
- rubric을 완전히 버리고 무작위 아이디어를 만든다.
- 후보가 비슷하다는 이유로 source가 빈약하다고 단정한다.

## 13. 모든 후보가 “근거 부족”, “한 편으로 안 됨”으로 일찍 탈락한다

### 관찰할 것

- 후보 가치, shaping 상태, 근거 준비도, 주장 상한이 섞였는가.
- “한 중심 질문” 같은 편집 기준이 material 탐색 전에 적용됐는가.
- 근거 부족이 후보 의미 부족으로 확대됐는가.
- 현재 목적이 후보 탐색인지 발행 후보 선택인지.

### 대응 선택지

- 판정축을 다시 분리한다.
- 주장 상한을 낮추면서 후보는 탐색 상태로 남긴다.
- 여러 spine과 article type을 시험한다.
- 충분히 펼친 뒤 수렴 시점을 별도로 정한다.

### 피할 것

- 모든 후보를 동등하게 영구 보존해 선택을 미룬다.
- 근거 없는 강한 인과를 “가능성”이라는 이름으로 유지한다.
- 한 사실 오류를 후보 전체 폐기로 사용한다.

## 14. current나 active-state를 읽었는데도 최근 작업에 과적합한다

### 관찰할 것

- current가 전체 지도와 cursor를 함께 보여 주는가, 최근 summary인가.
- 이번 질문이 프로젝트 전체, 현재 구현, 선택 이유 중 어느 시간축을 요구하는가.
- current가 필요한 source와 active contract로 실제 연결되는가.
- 마지막 외부·병렬 사건의 write-back owner가 있는가.

### 대응 선택지

- 질문별 시간축과 source 역할을 다시 배정한다.
- 전체 지도와 단일 cursor를 한 화면에서 맞춘다.
- current 자체에 답을 더 넣기보다 router와 write-back 책임을 확인한다.
- terminal event가 빠졌다면 결과만 고치지 말고 갱신 조건을 본다.

### 피할 것

- current 문서를 더 길게 만든다.
- 최근성 편향 하나로 current 전체를 실패 판정한다.
- 모든 문서와 로그를 상시 context에 올린다.

## 15. 좋은 rule이 이미 있는데 같은 오판이 반복된다

### 관찰할 것

- rule이 필요한 결정 순간에 실제로 읽혔는가.
- trigger와 router가 있는가.
- rule을 읽었지만 다른 더 강한 context가 덮었는가.
- rule의 내용 문제인지 activation 문제인지.

### 대응 선택지

- rule 문장을 늘리기 전에 activation channel을 고친다.
- root guide에서 관련 상황을 owner 문서로 연결한다.
- 반복 오판이 rule 자체의 한계를 드러내면 내용도 수정한다.
- mandatory read를 늘리기보다 발동 조건을 좁힌다.

### 피할 것

- 모든 rule을 모든 task에 import한다.
- 반복됐다는 이유로 rule 내용이 틀렸다고 자동 결론낸다.
- 새 이름의 rule을 하나 더 만든다.

## 16. AI가 오류를 정확히 설명했는데 바로 같은 행동을 반복한다

### 관찰할 것

- self-check가 외부 요인만 봤는가, 자기 frame·tool·다음 행동도 봤는가.
- 설명 뒤 plan이나 tool call에 실제 diff가 있는가.
- 같은 판단 위치에서 자기설명만 반복하는가.
- 첫 오독인지 같은 축의 반복 실패인지.

### 대응 선택지

- 진단, 다음 행동, 재발 방지를 별도 결과로 본다.
- 바로 다음 action을 작게 실행해 행동 변화를 확인한다.
- 반복되면 raw source를 보는 fresh audit로 올린다.
- auditor 결과를 main 언어로 즉시 합치지 않고 사용자에게 차이를 노출한다.

### 피할 것

- 더 긴 반성문을 요청한다.
- 첫 오독부터 복잡한 self-check protocol을 발동한다.
- 한 번의 행동 변화로 장기 효과를 주장한다.

## 17. scope를 줄였더니 핵심 가치가 사라졌다

### 관찰할 것

- 줄인 것은 데이터 폭·polish인가, 핵심 변환인가.
- 사용자가 input을 넣어 usable output과 다음 행동까지 갈 수 있는가.
- fixture·raw response·spec이 실제 제품 결과를 대신했는가.
- 이번 task가 product slice인지 technical spike인지.

### 대응 선택지

- 가치 경로는 end-to-end로 연결하고 폭만 줄인다.
- 핵심 변환을 실제로 실행하는 한 사례를 만든다.
- spike라면 product acceptance와 구분해 상태를 낮춘다.
- agent prompt에서 “작게”와 “끝까지 관통할 책임”을 함께 적는다.

### 피할 것

- vertical slice라는 용어만 추가한다.
- 모든 기능을 끝까지 만들어 scope를 다시 폭발시킨다.
- fixture와 test 자체를 무가치하다고 본다.

## 18. 문서, test, review, 하네스는 늘지만 본 작업이 보이지 않는다

### 관찰할 것

- 각 artifact가 어떤 불확실성이나 위험을 줄였는가.
- 실제 사용자 가치 경로와 연결되는가.
- 한 번 유용했던 check가 매회 의무가 됐는가.
- 보존·현재 권위·매회 실행·교체 범위가 섞였는가.

### 대응 선택지

- artifact별 역할과 lifecycle을 다시 분리한다.
- mandatory 실행 범위를 줄이고 보존만 할 것을 나눈다.
- 본 작업 결과를 드러내는 output probe를 먼저 만든다.
- 새 층 추가를 멈추고 기존 owner와 activation을 고친다.

### 피할 것

- 모든 문서와 test를 삭제한다.
- 파일 수 하나로 하네스가 과도하다고 결론낸다.
- 하네스 자체를 다음 본 작업으로 바꾼다.

## 19. 완결 결과를 만들었지만 무엇을 다시 해야 할지 모르겠다

### 관찰할 것

- 간극은 result surface, goal, source, constraints, evaluation 중 어디에서 보이는가.
- 결과가 어떤 전제를 구체적으로 드러냈는가.
- 충분한 비교 결과가 있는가, 한 결과만 보고 있는가.
- user signal과 formal evaluation이 어디서 갈리는가.

### 대응 선택지

- 결과를 component가 아니라 causal chain으로 reverse trace한다.
- 경쟁 원인 후보를 만들고 각각을 구별할 관찰을 찾는다.
- 필요한 관계가 안 보이면 더 큰 완결본이 아니라 다른 해상도의 probe를 만든다.
- 원인이 특정되면 관련 책임만 다시 연다.

### 피할 것

- 완결본이 나왔으니 다음은 무조건 reviewer라고 정한다.
- 막막함을 해결하려고 전체 workflow를 재실행한다.
- 한 개 “근본 원인”을 서둘러 고른다.

## 20. 결과에 명백한 사실 오류가 하나 있다

### 관찰할 것

- 직접 원천으로 좁게 교정 가능한가.
- 사실 교정이 장면 역할이나 중심 인과를 바꾸는가.
- 오류가 한 번인지 source routing 실패의 반복인지.

### 대응 선택지

- 좁은 사실 오류는 바로잡고 판정 범위를 보고한다.
- 중심에 영향을 주면 수정 전에 사용자와 상의한다.
- 반복되면 source activation과 verifier contract를 본다.

### 피할 것

- 사실 하나로 후보 가치와 사용자 경험 전체를 폐기한다.
- 중심을 보호하려고 사실 교정을 미룬다.
- 매 오류를 goal 재설정 신호로 올린다.

### 비적용

이 상황에서는 무거운 frame audit가 기본 대응이 아니다.

## 21. 사용자는 “뭔가 이상하다”고 느끼지만 원인을 아직 설명하지 못한다

### 관찰할 것

- 사용자가 바로 좋아하거나 싫어한 구체 부분은 무엇인가.
- 이전 결과와 비교할 때 어떤 변화가 생겼는가.
- 이 반응은 사실, 의미, 흐름, 생생함, 소유감 중 무엇에 가까운가.
- 명료한 문서와 사용자의 기억이 충돌하는가.

### 대응 선택지

- 사용자의 표현을 그대로 기준으로 만들지 않고 사례 비교로 구체화한다.
- 여러 경쟁 설명을 제시하고 어느 쪽이 가까운지 묻는다.
- 필요한 경우 source와 결과를 함께 보며 발생 이유를 복구한다.
- 충분히 통합된 두 대안을 만들어 직관 차이를 본다.

### 피할 것

- “더 구체적으로 말해 달라”며 분석 책임을 전부 사용자에게 넘긴다.
- 사용자의 기억을 확인 없이 사실 source로 승격한다.
- formal rubric으로만 반응을 반박한다.

## 22. 외부 사례에서 좋은 감각을 가져오고 싶다

### 관찰할 것

- 원본에서 실제로 확인된 행동과 결과는 무엇인가.
- 외부 사례의 구체 constraints와 현재 작업의 차이는 무엇인가.
- 사용자가 그 사례에서 좋다고 본 판단 변화는 무엇인가.
- 표면 workflow와 재사용 가능한 mechanism을 구분했는가.

### 대응 선택지

- 확인 사실, 우리의 해석, 현재 적용 변형을 분리한다.
- 좋은 구체성은 남기되 적용 범위를 함께 적는다.
- 현재 output으로 가져온 감각이 실제로 작동하는지 시험한다.
- 사례의 최종 성공이 확인되지 않았으면 성공 효과가 아니라 관찰된 iteration만 쓴다.

### 피할 것

- 유명하거나 좋아 보이므로 workflow를 복사한다.
- “본질” 한 문장으로 모든 조건과 사례를 지운다.
- 확인되지 않은 autonomous loop 완료를 주장한다.

### Alex 적용

scaffolding과 human-led solution concept 개선 iteration은 확인된다. 최종 autonomous implementation/evaluation loop 완료는 확인되지 않는다.

## 23. 자동 loop가 계속 돌지만 같은 frame 안에서만 polish한다

### 관찰할 것

- 각 cycle에서 바뀌는 것은 result인가 criteria인가.
- evaluator가 같은 goal·source·rubric을 공유하는가.
- stopping condition이 measurable local quality에만 묶였는가.
- user gate나 frame reopen condition이 있는가.

### 대응 선택지

- loop를 멈추고 최근 cycle의 학습 diff를 본다.
- result evaluator와 goal·criteria evaluator를 분리한다.
- 반복되는 상위 간극을 reframe trigger로 둔다.
- human gate에서 계속, pause, reframe 중 하나를 선택한다.

### 피할 것

- cycle 수나 score 개선을 품질 학습으로 간주한다.
- 자동화 자체를 실패 원인으로 단정한다.
- evaluator를 더 많이 추가하고 frame은 그대로 둔다.

## 24. context가 너무 커서 무엇이 현재 권위인지 알 수 없다

### 관찰할 것

- history, current, source, active contract, result가 같은 층에 있는가.
- 최신 artifact가 권위를 대신하는가.
- 현재 cursor가 하나인가.
- 모든 역할이 같은 context를 읽는가.

### 대응 선택지

- 전체 지도와 current cursor를 낮은 해상도로 만든다.
- 역할별 owner와 read path를 정한다.
- process는 필요할 때 내려가고 active contract는 현재 권위로 둔다.
- source와 파생 해석을 분리한다.

### 피할 것

- 모든 상태에 라벨과 snapshot version을 붙인다.
- active-state를 직전 단계 요약으로 줄인다.
- 새 context 층을 계속 추가한다.

## 25. context를 줄였더니 전체 의미와 이미 합의한 material이 사라졌다

### 관찰할 것

- “최신만”을 직전 task만으로 해석했는가.
- 완료된 큰 가지의 현재 결론이 지도에 남아 있는가.
- user agreement와 working hypothesis가 구분돼 있는가.
- process로 내린 판단 중 현재도 유효한 것이 있는가.

### 대응 선택지

- 전체 생각 구조의 현재 결론을 낮은 해상도로 복구한다.
- 큰 material은 branch active-state로 두고 과정은 process에 남긴다.
- 재진입 packet에 모든 세부가 아니라 목적·계보·현재 역할을 넣는다.

### 피할 것

- 모든 backlog를 live context로 되돌린다.
- 정보가 빠졌다는 이유로 current를 긴 상태 보고서로 만든다.

## 26. reviewer 둘이 서로 다른 방향을 권한다

### 관찰할 것

- 갈등은 사실, criteria, 중심, 사용자 해석 중 어디에 있는가.
- 각 reviewer의 입력과 역할이 달랐는가.
- 두 제안이 같은 관찰에서 다른 처방을 냈는가.
- 한쪽 제안이 현재 사용자 합의를 바꾸는가.

### 대응 선택지

- 공통 관찰과 갈린 처방을 분리한다.
- 사실 충돌은 직접 원천으로 확인한다.
- 현재 중심 안의 국소 변경은 main이 처리하고 중심 변경은 사용자에게 올린다.
- 둘 다 같은 frame이면 제3의 source-first pass를 고려한다.

### 피할 것

- reviewer 다수결로 결정한다.
- main 취향으로 하나를 고르고 provenance를 지운다.
- 갈등이 있다는 이유로 두 결과를 모두 무효화한다.

### Current 적용

A와 B는 저자 판단이 약하다는 관찰에는 동의했지만 A는 중심 이동, B는 중심 보호를 권했다. 이후 사용자는 두 선택 모두의 공통 frame을 다시 문제 삼았다.

## 27. source-first pass가 기존 합의까지 지워 버린다

### 관찰할 것

- 가리려던 것은 prior artifact의 anchor인가, 사용자 목적과 canonical contract인가.
- fresh pass 결과를 무엇과 대조할 계획인가.
- 새 생성이 기존 합의를 재심사할 권한을 갖는가.

### 대응 선택지

- source-first generation에는 직접 원천과 상위 목적을 유지한다.
- prior 후보·taxonomy만 가리고 결과 뒤 기존 판과 대조한다.
- 새 결과는 관찰로 보존하고 자동 현재 권위로 올리지 않는다.

### 피할 것

- fresh를 매번 처음부터 재학습하는 것으로 운영한다.
- 기존 합의를 새 prior라며 모두 제거한다.
- fresh 결과를 독립 정답으로 취급한다.

## 28. 문제를 고치려다 반대 방향으로 과교정한다

### 관찰할 것

- 첫 오류의 반대값을 새 원칙으로 만든 것은 아닌가.
- 사용자가 정정한 것은 강도, 역할, 시점, 전체 방향 중 무엇인가.
- 원래 보존해야 할 장점도 함께 제거됐는가.
- self-check 설명 뒤 바로 반대 극으로 이동했는가.

### 대응 선택지

- 원래 기준의 유효한 역할과 오용된 역할을 분리한다.
- 좋은 예와 과교정 반례를 함께 본다.
- 다음 행동을 작게 실행해 균형이 바뀌었는지 확인한다.
- 반복되면 별도 판단 위치에 main의 frame을 올린다.

### 피할 것

- “압축하지 말라”를 아무것도 정리하지 말라는 규칙으로 만든다.
- “Material이 있었다”를 Material로 돌아갈 일이 없다는 규칙으로 만든다.
- “goal도 바뀔 수 있다”를 goal을 고정하지 말라는 규칙으로 만든다.

## 29. 한 사례에서 core 후보를 만들려 한다

### 관찰할 것

- 관찰 사실, 원인 가설, 일반화 후보, 적용 한계가 분리됐는가.
- 다른 작업에서 같은 mechanism을 보이는 사례가 있는가.
- 같은 사례를 설명하는 경쟁 원인이 남아 있는가.
- 사용자가 일반화 범위에 동의했는가.

### 대응 선택지

- 사례의 구체 장면과 일반 판단을 연결하되 상태를 `후보`로 둔다.
- 글쓰기 밖 구현·조사·multi-agent 전이 예를 시험한다.
- 반례와 비적용 조건을 찾는다.
- 반복 확인 전에는 process나 research workspace에 두고 원본 core로 옮기지 않는다.

### 피할 것

- 좋은 문장이라는 이유로 core rule로 올린다.
- 한 사례를 과도하게 추상화해 증거를 지운다.
- 사례가 하나라는 이유만으로 아무 학습도 남기지 않는다.

## 30. 무엇을 사용자에게 물어야 할지 판단하기 어렵다

### 관찰할 것

- 질문이 사실·자료 의미·현재 권위·중심·사용자 경험·공개 범위 중 무엇을 바꾸는가.
- local read나 source 확인으로 답을 찾을 수 있는가.
- 합리적 가정이 결과를 크게 바꾸는가.
- 사용자에게 선택지를 주기 전에 main이 충분한 비교와 판단을 만들었는가.

### 대응 선택지

- 사실과 명백한 source 충돌은 먼저 확인한다.
- 중심이나 사용자 해석을 바꾸는 선택만 명확한 대조와 함께 묻는다.
- 질문 전 확인된 차이, 잠정 해석, 왜 애매한지를 제시한다.
- 사용자가 완결 결과를 보고 판단하기 쉬운 문제면 먼저 충분히 통합된 후보를 만든다.

### 피할 것

- 모든 애매함을 사용자에게 되묻는다.
- 사용자의 판단 영역을 속도 때문에 main이 추정한다.
- 선택지를 만들지 않고 열린 질문만 늘어놓는다.

## 대응 강도를 낮춰야 하는 상황

다음 상황에서는 이 문서의 무거운 대응을 발동하지 않는 편이 낫다.

- 명백한 오탈자, 깨진 링크, 기계적 형식 오류
- source 하나로 좁게 교정되는 사실 오류
- 사용자가 위임한 범위 안의 가역적 국소 구현
- 한 번 발생하고 바로 행동이 바뀐 단순 오독
- 표준 schema나 deterministic check가 acceptance 전체를 정의하는 좁은 작업
- 안전·법적 hard guard가 명시돼 있어 탐색보다 즉시 종료가 필요한 경우
- 이미 사용자 목적과 작업 가설이 명료하고 result correction만 남은 경우

## 대응 강도를 높일 수 있는 상황

다음 신호가 겹치면 결과 표면보다 상위 판단을 다시 볼 이유가 커진다.

- 의미 있는 수정 뒤 같은 종류의 불만이 반복된다.
- 여러 reviewer가 같은 packet과 질문에서만 동의한다.
- 결과는 정교하지만 사용자가 목적 불일치를 느낀다.
- 중요한 motive나 material이 여러 cycle에서 반복적으로 사라진다.
- 임시 제안이 사용자 합의처럼 사용되고 있다.
- output을 본 뒤 기존 constraints나 criteria가 약한 결과를 유도했다는 구체적 단서가 있다.
- self-check가 정확한 설명 뒤 같은 행동을 반복한다.
- artifact와 validation 수는 늘지만 핵심 가치 경로가 없다.
- 자동 loop가 local score만 개선하고 frame을 다시 열지 않는다.

이 신호가 있어도 항상 같은 절차를 수행하지 않는다. 먼저 어떤 판단 위치가 간극을 만들었는지 비교한 뒤, 가능한 대응 가운데 가장 관련 있는 것을 고른다.
