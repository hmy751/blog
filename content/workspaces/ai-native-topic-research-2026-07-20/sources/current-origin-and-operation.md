---
작성일: 2026-07-28
성격: Current 글의 생성 계보와 실제 운영을 확인하는 직접 원천 묶음
공개상태: 내부 작업 문서
---

# Current 글의 생성 계보와 실제 운영 원천

이 문서는 `content/drafts/current-active-state-operation.md`가 사용하는 생성 이유, Alex 사례, `context/current`의 최초 구조, 실제 운용 장면과 한계의 재접근 경로를 모은다. 원고의 구조나 현재 해석을 소유하지 않으며, 원천 하나만으로 `current`의 단독 효과를 주장하지 않는다.

## 사용자의 현재 기억과 교정

2026-07-28 대화에서 사용자는 이 글의 출발점과 실제 사용 경험을 다음처럼 설명했다. 아래는 말의 순서와 의미를 유지하며 오탈자만 정리한 최소 발췌다.

> 원래도 context 유지나 유실, 제어가 힘들다는 고민과 불편감이 있었다. 마침 해커톤이 있어서 참가하게 됐고, Alex의 해커톤에서 영감을 받았다. 흔들리지 않게 scaffolding을 만들어서 하는 것을 보고, 나도 scaffolding을 만들다가 이걸 harness에 이식할 수 없나 생각해 `context/current`에 적용했다. 작업하다 보면 뭔가 계속 유지되기도 했고, 고민하며 펼쳐 봤던 것과 합의한 것이 남아 수렴되기도 했다. 다섯 문항은 크리티컬한 중심이라고 생각하지 않는다.

같은 날 사용자는 원고의 `그곳에서 Alex의 작업 방식을 보게 됐다`는 연결을 다음처럼 바로잡았다.

> 해커톤을 하다가 Alex가 등장한 것은 아니다.

따라서 기존의 context 불편, AX 해커톤 참여, Alex 사례에서 받은 영감은 서로 연결되지만 하나의 시간·장소 장면으로 합치지 않는다. 정확한 발견 시점이 직접 원문으로 확인되지 않으면 `그곳에서`, `참가 중 우연히`, `현장에서 보았다`처럼 사건을 새로 만들지 않는다.

이어 실제 이름과 역할은 흐리지 않는 편이 낫다고 다음처럼 보정했다.

> 실제 이름인 ‘AX 인재전쟁’ 해커톤을 언급하고, `유튜버 Alex`라고 쓰는 편이 낫다.

## 해커톤 전부터 있던 context 문제

- [오늘의집 지원 전략·의사결정 기록](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/resume/company/오늘의집/전략-의사결정-gpt.md) — 2026-03-10 문서는 최종 문장만 남기면 다음 세션에서 결론의 이유와 사용자 판단 기준이 사라질 수 있다는 문제를 적었다. 같은 문서의 Noline 회고는 프로젝트 맥락을 놓친 AI에게 반복 설명해야 했던 경험을 보존한다.
- [Noline AI harness restructure](/Users/hammyeong-yeon/Desktop/10_work/noline/.claude/decisions/2026-05-06-ai-harness-restructure.md), [workspace guide contract](/Users/hammyeong-yeon/Desktop/10_work/noline/.claude/decisions/2026-05-06-workspace-guide-harness-contract.md) — 오래된 이력·참고 자료·현재 정책이 한 진입면에 섞여 새 세션이 과거를 현재 규칙처럼 읽는 문제와, 짧은 입구에서 역할별 원천으로 내려가게 한 이전 시도를 확인한다.

이 자료는 `current`가 갑자기 생긴 아이디어가 아니라는 배경을 지원한다. 다만 이 문서들만으로 `context/current`를 처음 구상한 정확한 순간이나 직접 인과를 확정하지 않는다.

현재 원고의 `처음에는 context의 양 문제로 봤다`는 문장은 위 사건들을 지금 시점에서 연결한 사용자·작성자의 회고적 해석이다. 당시 문서에 같은 문장으로 남은 역사적 발화는 아니다. 다음 작업에서는 이 문장을 과거의 정확한 독백처럼 더 구체화하지 않고, 필요하면 사용자에게 당시 생각을 다시 확인한다.

## 유튜버 Alex에게서 본 scaffolding

- [AX 인재전쟁 공식 안내](https://hackathon.jocodingax.ai/), [당시 과제 요구사항 보존본](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/sources/과제요구사항/index.md) — 행사 이름, 기업의 실제 문제를 AI로 풀어 결과물을 제출하는 구조, 예선 기간과 참여 기업을 다시 확인하는 공개·로컬 경로. 원고의 `‘AX 인재전쟁’ 해커톤에 참가했다`는 1인칭 사실 자체는 사용자 기억이 원천이다.
- [커리어해커 알렉스 YouTube 채널](https://www.youtube.com/@careerhackeralex) — 영상 제작자의 공개 정체를 다시 찾는 경로.
- [5000:60 경쟁이라는 AX 인재전쟁, 2시간만에 끝내기](https://www.youtube.com/watch?v=-pIg6RtF--0) — 분석에 사용한 해당 라이브 영상. 2026-07-29 1차 검색에서는 복구하지 못했으나 같은 날 재검색에서 찾았고, oembed metadata로 채널이 커리어해커 알렉스임을, 영상을 직접 본 사용자 확인으로 동일 영상임을 확정했다. 인용과 발화 사실 판정은 계속 아래 raw 전사본을 권위로 사용한다.
- [유튜버 Alex 원본 영상 전사](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/00-원본자료/영상전사/2026-07-04_AX인재전쟁_transcript.md)
  - 1325~1359행: 회사별 작업을 위한 폴더·instruction·placeholder와 research 공간을 포함한 scaffolding 구상.
  - 1627~1651행: 서로 다른 회사 context를 분리하면서 같은 문제 해결 순서를 병렬로 운용하는 구조.
  - 1847~1850행: organizer intent부터 verification까지 이어지는 전체 문제 해결 흐름.
  - 2522~2569행: scaffolding을 procedural knowledge와 반복 가능한 meta-skill로 보는 해석, 사람의 review와 taste가 여전히 필요하다는 한계.
- [timestamp 전사](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/00-원본자료/영상전사/2026-07-04_AX인재전쟁_transcript_타임스탬프.md), [전사 정리본](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/01-전사정리본/2026-07-04_AX인재전쟁_transcript-clean.md) — 긴 원문에서 영상 위치와 전체 흐름을 빠르게 찾는 탐색본. 인용과 사실 판정은 위 raw 전사로 돌아간다.
- [Alex scaffolding tree](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/02-분석산출물/클로드-분석/04-질문대응/알렉스-스캐폴딩-트리.md) — 영상 화면에 보인 Google Docs 구조와 전사에서 복원한 항목을 분리해 둔 2차 탐색 자료. 원고의 구조를 이 문서에 맞추지 않으며, `[복원]` 항목은 Alex의 화면 원문처럼 인용하지 않는다.

원본이 직접 지원하는 것은 문제 정의, research, solution, scoping, engineering, planning을 단계와 기록으로 외부화한 scaffolding이다. 계속 덮어쓰는 전체 지도, 정확히 하나의 cursor, `context/current`라는 파일은 Alex 원본에 없다.

## 사용자가 변형한 `context/current`

- AX 작업본 최초 baseline commit `ec616e03f6f512c0060381cbba2657b86bc32125`의 `context/current.md`
  - 요구사항 → research·문제 정의 → solution → engineering → 제출의 전체 지도.
  - 활성 위치를 정확히 하나의 `*-> 지금*` cursor로 표시.
  - `current`는 최신 그림으로 덮어쓰고, 시간순 이력은 `context/process/`에 보존.
  - 새 session이나 대화가 꼬였을 때 먼저 읽고 프로젝트, 현재 위치, 다음 행동을 recap한 뒤 사용자와 맞추는 계약.
  - 최초 snapshot 재현: `git -C "/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본" show ec616e03f6f512c0060381cbba2657b86bc32125:context/current.md`
- [현재 current.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/current.md) — 작업 중 확장된 전체 지도와 마지막 committed cursor.

정식 작업 log가 시작될 때 이미 최초 `current.md`가 존재했다. 따라서 전체 지도와 cursor를 처음 제안한 정확한 대화나 문장별 작성자는 현재 원천으로 복원하지 않는다. 확인 가능한 범위는 사용자의 현재 기억과 최초 committed artifact가 같은 방향을 가리킨다는 데까지다.

## 실제로 쓰인 장면

- [주 작업 raw log](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4afd-80f9-7bc1-ba6f-99f4281c0607.jsonl)
  - JSONL 1, 3~5, 10번째 event: 첫 진입에서 AI가 `current`와 core를 읽고 프로젝트, 요구사항 재확인이라는 현재 위치, 다음 행동을 복원한 뒤 멈췄다.
  - JSONL 17~18번째 event: 사용자는 `current를 보면 과제 요구사항 확인까지 됐다`고 확인하고 research·문제 정의로 이동시켰다.
- [재진입 교차검증](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/03-교차검증/reentry.md) — hook이 `current` 내용을 주입한 것이 아니라 읽기 계약을 주입했고, AI가 파일을 다시 읽어 recap했다는 실행 사슬을 확인한다. 핵심 구간의 primary compaction 9회와 SessionStart 주입 10회를 비교하며, compaction summary와 goal state도 연속성에 함께 기여했음을 분리한다. 같은 규칙이 독립 E2E와 blind second pass에는 오히려 역할 충돌과 정보 누출을 만들었던 장면도 포함한다.
- [넓은 조사 순서](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/05-broad-research-order.md), [signal map](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/research/02-signal-map.md), [self-check 기록](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/09-discussion-and-ai-self-check.md) — 20개 source를 16개 signal로 다시 펼치고, 회사 방향과 사용자 문제를 양자택일로 만든 과교정을 앞선 합의와 자료로 되돌린 과정.
- [첫 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/13-problem-candidates-first-spread.md), [두 번째 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/14-integrated-criteria-and-independent-second-pass.md), [후보 계보 지도](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/15-refined-candidate-landscape.md) — 첫 판을 덮어쓰지 않고 별도 판을 만든 뒤, 다섯 후보를 세 우선 탐색과 두 조건부 보류로 연결한 수렴 과정. 두 번째 판은 완전 blind가 아니다.
- [solution pass](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/17-performance-led-solution-passes.md), [output-first 비교](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/19-output-first-comparison.md), [최종 선택](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/21-prioritization-and-final-choice.md) — 세 문제에서 solution 세 개씩 아홉 개를 펼치고, 세 output을 실제 형태로 비교한 뒤 하나를 선택한 순서.

이 장면들은 이전 탐색·합의·후보가 다음 판단에 다시 쓰였다는 사실을 지원한다. 사용자가 `뭔가 계속 유지되고 있었다`, `펼친 것이 남아 수렴했다`고 느낀 평가는 사용자의 경험으로 서술하며, `current` 하나의 인과 효과나 생산성 향상으로 바꾸지 않는다.

## 이후 프로젝트에서 계속 쓴 근거

- [Cofathon current](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/current.md), [지도 우선 교정](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/02-current-map-first-correction.md) — AX에서 가져온 전체 지도와 단일 cursor 감각을 다른 장기 작업에 적용했고, 147줄짜리 상태 보고서가 된 `current`를 46줄 지도 중심 문서로 다시 줄인 후속 사례.
- [Cofathon 재진입·문서 소유권 정리](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/34-refine-session-reentry-and-instruction-ownership.md) — 다시 82줄·17,381 bytes까지 커진 `current`를 47줄·6,943 bytes로 줄이고, main 재진입과 compact refresh, verifier 역할을 구분한 후속 개선.

이 자료는 원고 마지막의 `이후의 긴 AI 작업에서도 전체 지도와 현재 cursor를 함께 둔다`는 문장을 지원한다. AX의 효과를 증명하는 대조군으로 쓰지 않고, 구조를 계속 사용하면서 비대화와 역할 충돌을 다시 고쳤다는 후속 계보로만 쓴다.

## 한계

- [설문 재작성](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/29-questionnaire-rebuild-from-current.md) — `current`를 먼저 읽었어도 최근 구현이 프로젝트 전체를 밀어낸 사건. 사용자 정정 뒤 전체 지도로 돌아가 복구했으며, 다섯 문항은 생성 이유가 아니라 운용 한계 사례다.
- [current·gate 감사](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/02-독립조사/git/08-current-and-gate-audit.md) — `current`가 존재하는 committed version 18개, cursor 문장 전환 13회, 마지막 세 commit의 미갱신을 확인한다. 최초 96줄·9,693 bytes에서 마지막 136줄·24,040 bytes로 커진 변화도 있어, `current`가 최신 상태와 함께 상세 맥락을 계속 품을 때 재진입 비용이 늘어나는 문제를 더 다룰 수 있다.
- [최종 패키징](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/30-final-submission-package.md), [설문 교정과 업로드 실패](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/31-submission-form-correction-and-upload-failure.md) — 마지막 세 commit 동안 지도 밖에 남은 패키지 검증, 설문·로그 정합화, 웹 업로드 실패와 호환 ZIP 준비를 확인한다.

## 원고 구간별 재진입 지도

- 도입의 오래된 불편과 생성 이유: `사용자의 현재 기억과 교정` → `해커톤 전부터 있던 context 문제`.
- AX 인재전쟁과 Alex의 scaffolding: 공식 행사 안내 → timestamp·clean 전사로 위치 탐색 → raw 전사로 판정.
- `전체 지도 + cursor 하나`로의 변형: 최초 baseline commit의 `context/current.md` → 현재 `current.md` → current·gate 감사.
- 새 세션 재진입: 주 작업 raw log의 초기 event → 재진입 교차검증의 전체 비교.
- research와 후보 수렴: 넓은 조사 순서·signal map·self-check → 두 후보판 → 후보 계보 → solution·output·최종 선택.
- 최근 맥락 편향과 terminal gap: 설문 재작성 → 마지막 패키징·설문 교정·업로드 실패 → current·gate 감사.
- 이후에도 계속 쓴 경험: Cofathon current → 지도 우선 교정 → 재진입·문서 소유권 정리.

## 현재 원고에 아직 쓰지 않은 보강 재료

아래 재료는 다음 세션이 원고를 더 깊게 만들 때 열 수 있지만, 존재한다는 이유만으로 모두 본문에 넣지 않는다.

- `current`가 96줄·9,693 bytes에서 136줄·24,040 bytes로 커진 과정. 지금 원고의 freshness 한계에 더해 `현재 문서 자체의 비대화`를 별도 한계로 발전시킬 수 있다.
- 핵심 작업의 primary compaction 9회와 SessionStart 주입 10회 비교. `current`만이 아니라 compaction summary, goal state, Git과 사용자 정정이 함께 연속성을 만들었다는 인과 경계를 더 생생하게 보여 줄 수 있다.
- main 재진입에 유효했던 같은 규칙이 verifier·E2E에는 멈춤을 만들고, 독립 second pass에는 기존 후보를 노출한 장면. 하나의 재진입 계약을 모든 역할에 적용할 수 없다는 후속 주제로 확장할 수 있다.
- Cofathon에서 147줄 상태 보고서를 46줄 지도 우선 구조로, 이후 82줄·17,381 bytes를 47줄·6,943 bytes로 다시 줄인 두 교정. `전체 지도`와 `모든 세부를 한 파일에 넣기`가 다르다는 후속 학습을 보여 줄 수 있다.
- Alex scaffolding tree의 살아 있는 Google Docs, 단계 재구조화, 사람의 review·taste 장면. Alex의 절차를 복제한 것으로 오해되지 않도록 raw 전사와 화면 확인 범위를 함께 써야 한다.

## 주장 상한

- 유튜버 Alex 사례와 `context/current`의 관계는 `영감을 받아 자기 문제에 맞게 변형했다`까지 말한다.
- 유튜버 Alex를 ‘AX 인재전쟁’ 참여 중 같은 장소에서 만났거나 그때 처음 발견한 것으로 쓰지 않는다.
- `current`는 새 세션의 재진입, 앞선 합의 복구, 후보 수렴에 함께 쓰인 artifact다. 사용자 정정, Git, 과정 기록, runtime context와 분리된 단독 효과는 증명하지 않는다.
- 생산성 향상, 품질 향상, 자동 최신화, recency bias 자동 제거를 주장하지 않는다.
- 사용자의 `잘 사용됐다`는 평가는 계측 결과로 낮추거나 삭제하지 않고 경험의 범위를 밝혀 그대로 사용한다.
