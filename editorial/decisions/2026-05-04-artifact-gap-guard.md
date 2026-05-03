# Artifact gap guard

작성일: 2026-05-04
상태: accepted

## 배경

Reader Flow와 Supporting Materials를 분리한 뒤, 자료 장치가 글감을 대체하지 않게 하는 가드는 강해졌다. 표, 도식, 이미지, 스크린샷을 기본값처럼 넣지 말라는 기준은 필요했다.

하지만 실제 초안 검토에서 반대 문제가 드러났다. 기술 글의 핵심 판단이 실행 결과, LangSmith trace, UI 상태, config, prompt, 코드 구조, 비교 같은 artifact에 기대고 있는데도, 본문이 산문만으로 이어지면 글이 좋은 기술 글처럼 보이지 않는다. 문장은 맞지만 독자가 "무엇을 보고 그렇게 판단했는가"를 화면에서 확인할 수 없기 때문이다.

## 기존 하네스가 놓친 문제

- Reader Flow는 페이지 감각과 정보 배치를 보지만, "보이는 근거가 부족한 글"을 별도 결핍으로 부르지 않았다.
- Supporting Materials는 자료 장치가 실제 쟁점일 때만 여는 보조 기준으로 정리되어, artifact가 필요한 기술 글에서도 너무 늦게 발동할 수 있었다.
- "자료 장치는 기본값이 아니다"라는 방어 가드가 강하게 작동하면, 표·도식·스크린샷 후보를 적극적으로 만들지 않는 쪽으로 기울 수 있었다.
- Shaping Editor의 출력에는 중심 질문, 흐름, 보강 후보가 있었지만, artifact gap을 독립적으로 드러내는 칸이 없었다.

## 결정

새 단계를 만들지 않고, 기존 Shaping/Reader Flow 안에 `artifact gap` 가드를 추가한다.

`artifact gap`은 아래처럼 본다.

- 글의 핵심 판단이 trace, 로그, UI 상태, 실행 결과, config, prompt, 코드 구조, 수치 비교에 기대고 있다.
- 그런데 독자가 볼 수 있는 표, 도식, 의사코드, 스크린샷, 그래프, 비교표, trace tree가 없다.
- 독자는 결론을 읽을 수 있지만, 글쓴이가 실제로 무엇을 보고 그 결론에 도착했는지 복구하기 어렵다.

Artifact gap은 `supporting-materials.md`의 소유물이 아니다. Shaping/Reader Flow는 독자가 볼 수 있는 근거가 부족한지 판단하고, Texture/Polish는 자료 후보가 과하게 억제되어 글이 evidence-light해졌는지 또는 자료 장치가 글감을 평평하게 만들었는지 본다. `supporting-materials.md`는 gap이 확인된 뒤 어떤 자료로 풀지 고르는 처방 문서다.

공개 가능한 안전한 자료라면 초안에 직접 넣을 수 있고, 공개 경계나 원본 자료 판단이 남아 있으면 후보 슬롯으로 남긴다.

## 적용 범위

- 기술 구현/복기 글
- PI Lab 학습/실험 글
- LangSmith, RAG, evaluation, config, prompt, UI, 그래프, 코드 구조처럼 실행 흔적이나 비교 근거가 핵심인 글
- "가독성", "좋은 글처럼", "호흡", "레퍼런스처럼", "스크린샷/도표/이미지" 요청

## 비목표

- Artifact를 새 글쓰기 단계로 만들지 않는다.
- 모든 기술 글에 표, 도식, 스크린샷을 강제하지 않는다.
- 레퍼런스 글의 디자인이나 구성 요소를 복제하지 않는다.
- 분위기용 이미지나 장식적 도식을 권장하지 않는다.
- 자료 장치를 넣었다는 이유로 Material/Shaping/Texture 점검을 생략하지 않는다.
- 공개 경계가 불확실한 원본 화면, 내부 경로, private source를 노출하지 않는다.

## 근거

최근 PI Lab 발행글은 산문 사이에 실험표, 파이프라인 도식, 비교표, blockquote 같은 판단 손잡이가 있었다. 이 장치들은 글감을 대체한 것이 아니라 독자가 수치와 판단 변화를 직접 따라가게 만들었다.

반대로 LangSmith 실행 단위 초안은 중심 질문과 문장 자체는 선명했지만, 실제 trace 구조, app/eval 경로, config/prompt snapshot 관계가 대부분 산문으로만 설명되어 글이 evidence-light하게 보였다. 이 문제는 문장 polish보다 artifact 후보 설계가 먼저 필요한 유형이었다.

## 후속 점검

- Shaping Editor가 `Reader / Artifact gap`을 별도 칸으로 보고하는지 확인한다.
- Reader Flow가 산문 polish로만 끝나지 않고, 필요한 경우 Supporting Materials로 넘어가 처방을 고르는지 확인한다.
- Texture Keeper가 polish 과정에서 artifact 후보가 과하게 빠지거나, 반대로 artifact가 글감을 대체하는 양쪽 위험을 보는지 확인한다.
- Supporting Materials가 다시 기본 삽입 체크리스트로 비대해지지 않는지 확인한다.
- Texture Keeper가 artifact 추가로 글감이 평평해지는 경우와, artifact 억제로 글이 빈약해지는 경우를 모두 볼 수 있는지 확인한다.
