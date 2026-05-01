---
작성일: 2026-04-09
맥락: dev-hub `track/pilab/blog/메모/소재-후보.md`의 31개 후보 풀에서 대화를 통해 좁힌 발행 계획
성격: 어떤 글을, 어떤 결로, 어떤 순서로 쓸지의 작업 문서. 글마다 출처/hook/골격/주의가 들어있어 본문 작업으로 바로 들어갈 수 있게 정리.
관련: [CLAUDE.md](../../CLAUDE.md), [source-policy.md](../../editorial/source-policy.md), dev-hub 원본 메모
---

# PI Lab 블로그 발행 계획

## 0. 한 장 요약

부트캠프 시간 흐름을 따라가는 5편 + (Phase D는 사이드 프로젝트 후 추가).

| Phase | 시점 | 글 수 | 결 |
| --- | --- | --- | --- |
| **A** | 지금~ | 3편 | 스프린트 1·2·3 학습/깨달음 회고 |
| **B** | sprint-04 작업 중심 (옵션 A) | 2편 | "불편 → 발견 → 트레이드오프 → 적용" |
| **D** | 사이드 프로젝트 진행 후 | 미정 (1~2편) | 서비스/실험/데이터/의사결정 쪽으로 확장 |

매 편이 시간 순서로 발행되면 다음과 같은 라인이 자동으로 생김:

> 1편: 가설 검증을 처음 해봤다 (학습)
> 2편: 잘못된 가설로 시작했고, 검색을 의심해야 했다 (발견)
> 3편: 그 검색조차 사실은 측정자가 틀렸던 것이었다 (발견)
> 4편(B-1): 코드를 다시 보니 측정 기록조차 자신의 실행을 강제하지 못하고 있었다 (발견)
> 5편(B-2): 그래서 어떤 패턴으로 풀지 9개 라이브러리를 봤다 (학습+의사결정)

[blog-1year-retrospective.md](../posts/2026-02-03-blog-1year-retrospective.md)에서 약속한 "AI 배울 계획"의 정직한 다음 화.

---

## 1. Phase A — 스프린트 1·2·3 회고 (3편)

### 1편 — 처음 트랜스포머 10번 돌려본 이야기: 가설 두 개 세웠는데 답은 셋 다 아니었다

- **결**: 시행착오 + 가설 검증 (실험 설계 축)
- **출처**:
  - [experiment_analysis.md](/Users/hammyeong-yeon/Desktop/10_work/pilab/missions/pilab-2026-feb-sprint-1-aiml-basics/experiment_analysis.md)
  - [성능개선-실험로그.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-01/1주차/성능개선-실험로그.md)
- **Hook**: "한 번에 한 변수만 바꿔라"는 머리로 다 아는 말인데, 6개 행 표를 직접 채우면서 그 말의 무게를 처음 실감했다.
- **골격 (하이레벨)**:
  1. 처음 마주한 실험 표 — gap −0.127에서 출발
  2. 데이터/에폭/lr/배치를 하나씩 바꾸면서 본 것 (gap이 0으로 수렴했다가 +0.011로 넘어가는 과정)
  3. lr=1e-4에서 이상한 결과 → 두 가설을 세웠다
     - A. 사전학습 가중치가 망가졌나
     - B. 보폭이 커서 진동하나
  4. 검증해보니 답은 C(과적합)였다
  5. "변수 통제 원칙은 답을 알려주는 게 아니라, 답을 찾을 권리를 준다"
- **주의**: 페어(명연·희수) 작업이라 첫 문단에 크레딧 명시 필요. 본인이 배운 부분이 본문이 되도록 톤 조정.

---

### 2편 — 프롬프트로는 안 됐다: 검색이 진짜 손잡이였다

- **결**: 발견 + 파이프라인 설계 (책임 분리 축)
- **출처**: [RAG-정리.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-02/복습노트/RAG-정리.md) (한 장 요약 1·2·3번)
- **Hook**: "노이즈를 무시해" 룰을 시스템 프롬프트에 넣었더니 점수가 *떨어졌다*. 검색에서 노이즈를 *애초에 안 넣는* 게 답이었다.
- **골격 (하이레벨)**:
  1. 첫 RAG 만들고 환각이 나기 시작했다
  2. 첫 가설 — 프롬프트로 잡자 → 망함
  3. 검색 단계로 의심을 옮겼다 → top_k를 줄여서 노이즈를 안 넣는 게 답
  4. 같은 시기, 한 단어를 바꿨다 — "문서"를 "Context"로. 정확도 +16%p
  5. 두 변경의 공통점: **LLM에게 일을 덜 시키는 쪽**
  6. "확인할 수 없습니다"는 환각이 아니다 — 환각의 정의를 좁게 잡아야 했다
  7. (마무리) "관측 인프라가 없으면 실험은 추측으로 끝난다"는 한 줄 → 다음 편(3편)으로 자연스러운 다리

---

### 3편 — 검색이 잘못된 줄 알았는데, 측정이 잘못되어 있었다: Judge를 다시 짜고 +45%

- **결**: 발견 + 평가/측정 시스템 축
- **출처**:
  - [멀티모달-RAG-정리.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-03/복습노트/멀티모달-RAG-정리.md) (한 장 요약 2·3번)
  - [평가지표-개선방향-정리.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-03/2주차/평가지표-개선방향-정리.md)
- **Hook**: 측정자가 틀리면 측정 대상은 결백해도 죄인이 된다.
- **골격 (하이레벨)**:
  1. 멀티모달 RAG 6세트 실험을 돌렸다
  2. 임베딩을 nomic→bge-m3으로 갈았더니 검색 정밀도 +189% (3배). "검색이 가장 큰 레버"라고 생각함
  3. 그런데 답변 점수가 안 따라온다
  4. "검색이 더 안 좋은가?" → Judge 프롬프트만 새로 짰다 (검색 결과는 그대로)
  5. AR +45%, RP +44%. 충격: 그동안 검색을 고치려던 노력의 상당 부분이 사실은 **잘못된 측정자가 무고한 검색을 깎고 있었던 것**
  6. 한 번 더 확인 — Judge 모델을 llama3.1과 gpt-4o-mini로 바꿔보니 RP 50% 차이
  7. 결론: 평가 시스템은 1급 시민이다. 평가가 틀리면 개선인지 후퇴인지조차 알 수 없다
- **곁다리(선택)**: 한 단락 정도 "프롬프트로는 못 고치는 한계선" — LLaVA 한국어 사례 ("hello hello hello"). 2편의 "프롬프트로는 안 됐다"와 호응시킬 수 있음.

---

## 2. Phase B — Sprint-04 작업 중심 (2편, 옵션 A)

> 본인이 sprint-3에서 직접 짠 `evals/` 시스템에서 부채를 발견하고, sprint-04에서 다시 짜는 이야기. 사이드 프로젝트는 본문에서 직접 언급하지 않음.

### B에 들어갈 evals/ "불편의 실체" 5가지 (재료)

본인이 직접 짠 `evals/_common.py`와 `evals/_stages.py`에 다 보이는 부채:

1. **`get_config_snapshot()`이 21개 키를 손으로 dict에 박는다** — 거대한 manual 함수. 키 추가될 때마다 여러 곳을 동시에 고쳐야 함. provider 분기 로직(`CONFIG.ollama_chat_model if provider=="local" else ...`)도 여기 안에 박혀 있음.
2. **함수 default에 CONFIG가 박힌 패턴** — `frames_per_minute=CONFIG.frames_per_minute`, `window_seconds=CONFIG.chunk_window_seconds` 등. 호출자가 매번 풀어서 넘김. **양다리의 직접 증거.**
3. **`config_snapshot`을 인자로 받으면서도 안에서 live CONFIG를 또 읽는다** — `run_vision`이 snapshot을 받아 fixture 저장에만 쓰고, 실제 호출은 live CONFIG. snapshot은 자기 보고일 뿐 실행을 따라가지 못함.
4. **fingerprint 검증을 손으로 짰다** — `validate_fixture_fingerprint`, `load_fixture_or_exit`, `find_media_id_or_exit`. 결과 JSON을 뒤져서 매칭하는 우회 로직이 100줄 가까이.
5. **하위 호환 스킵이 손으로 박혀 있다** — `"기존 fixture에 openai_whisper_model 키가 없는 경우 스킵"` 같은 코드. 키 drift 흔적이 본인 코드에 화석처럼 남음.

→ 다섯 개가 다 **"snapshot 시스템이 제어 능력 없이 기록만 한다"** 한 가지를 가리킴. 다 본인이 직접 만든 거라 1인칭이 살아남.

---

### B-1편 — 내가 만든 평가 시스템에서 부채를 발견했다: snapshot은 기록이지 제어가 아니었다

- **결**: 발견 + 디버깅 + 시스템 부채 인식
- **출처**:
  - [config-아키텍처-분석.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-04/1주차/페어이전/config-아키텍처-분석.md) (§1.2~1.4)
  - 위의 evals/ 5가지 부채
- **Hook**: 결과 JSON엔 기록되는데, 실제 실행은 그 기록을 따라가지 않았다.
- **골격 (하이레벨)**:
  1. Sprint 3에서 evals/ 시스템을 짜면서 쌓인 불편 (manual snapshot dict, 키 추가할 때마다 여러 곳 동시 수정, fingerprint 손코딩, 하위 호환 스킵 박혀 있음, 함수 default에 CONFIG)
  2. "이거 뭔가 잘못된 것 같다"는 감각만 있고 명확한 진단은 없는 상태
  3. Sprint 4 들어가면서 코드를 다시 봤다
  4. **Python의 함수 default value는 import 시점에 한 번 평가된다는 함정** 발견
  5. snapshot을 받으면서 안에서 또 live CONFIG를 읽는 양다리 발견
  6. 한 줄로 정리됨: **"기록과 제어가 분리되어 있다"**
  7. (마무리) 이 자각이 다음 결정을 어떻게 바꿀지 — 후속 글(B-2)로 연결
- **주의**:
  - PI Lab 미션 코드 노출 금지 ([dev-hub/track/pilab/CLAUDE.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/CLAUDE.md) "블로그 관리"). 본인 코드 인용은 일반화된 예시(`def f(x=CONFIG.foo)`)로.
  - 본인 구체 파일/라인 번호는 글에서 빼고 "내가 만든 평가 시스템에서" 정도로.
- **발행 시점 (TBD)**:
  - **(A) 페어 전 발행** — "결정 직전의 정직한 발견" 톤. 이 글의 본질이 *발견 자체*라 페어 전이 더 본인스러움.
  - **(B) 페어 후 발행** — "발견과 결정·결과까지" 톤. B-2와 묶어서 한 흐름으로 발행.
  - 잠정 추천: (A). 단, 본인 페이스에 맞춰 결정.

---

### B-2편 — ML config은 어떻게 다뤄야 하나: 9개 라이브러리를 보고 내린 결정

- **결**: 학습 정리 + 트레이드오프 + 의사결정
- **출처**:
  - [config-아키텍처-분석.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-04/1주차/페어이전/config-아키텍처-분석.md) (§2, §3.x)
  - [02-모듈과코드.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-04/1주차/페어이전/sprint4-준비분석/02-모듈과코드.md)
- **Hook**: "Pydantic이 대세"라는 한 줄로 끝낼 수 없었다. 9개 라이브러리는 각자 다른 문제를 풀고 있었다.
- **골격 (하이레벨)**:
  1. (B-1에서 이어짐) "기록과 제어 분리" 자각 → 어떻게 풀까
  2. 첫 직관: 컴포넌트별로 묶기 (각 stage가 자기 config를 가진다)
  3. 9개 라이브러리는 각자 어떻게 푸나
     - fairseq (컴포넌트별 dataclass + 등록)
     - HF TrainingArguments (단일 거대 dataclass의 한계 사례 — 100+ 필드)
     - Hydra Structured Configs / hydra-zen
     - LlamaIndex Settings (글로벌 + 로컬 override)
     - DSPy (3층 global / scoped / per-call)
     - LangChain configurable_fields
     - Ragas per-metric LLM/embedding override
     - (선택) Anthropic Bloom
  4. 사용자 코드 컨텍스트에 도입 비용 vs 가치
  5. **라이브러리 없이도 적용 가능한 한 줄 규약**: `default value 자리에 mutable global을 평가해서 넣지 마라. None을 넣고 함수 안에서 lazy하게 가져와라.`
  6. 페어와 합의한 적용 범위 (혜진님과의 의사결정)
  7. (마무리) 결정 후 결과 — 어디까지 갔고 어디는 안 갔는지
- **주의**:
  - 페어(혜진님) 합의 부분 크레딧 명시
  - 9개 라이브러리 분석은 본인이 이미 [config-아키텍처-분석.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-04/1주차/페어이전/config-아키텍처-분석.md) §3에 정리해둠 → 본문 작업이 자료 옮기기에 가까움
  - 미션 코드 인용 금지 (B-1과 동일)
- **발행 시점**: 페어 작업 마무리 후. "적용 결과"를 알아야 글이 닫힘.

---

## 3. Phase D — 사이드 프로젝트 진행 후 (미정, 1~2편)

> 사이드 프로젝트 방향이 아직 안 정해진 상태 (커머스 / TalkMap / 다른 AI 앱 가능성 모두 열려있음).
> 진행 방향이 정해지고 실제 작업이 시작되면 후보 추가.

가능한 결 (참고용):
- 서비스 대비 / 실험 / 데이터 / 의사결정
- 부트캠프 학습이 실제 적용되는 시점의 발견
- 나중에 면접/이력서에도 연결될 수 있는 의사결정 글
- 부트캠프 종료 회고 (1년 회고의 직접적인 후속)

이 시점이 오면 dev-hub 원본 `소재-후보.md` 29~31번 + 새 후보를 다시 매핑.

---

## 4. 이 시리즈에서 자연스럽게 드러나는 질문들

지금 계획한 5편을 놓고 보면, 글마다 서로 다른 질문이 자연스럽게 나뉘어 있다.
이 표는 포지셔닝 체크리스트가 아니라, 비슷한 글만 반복되지 않게 보기 위한 참고 메모다.

| 질문 축 | 어디서 더 많이 보이나 |
| --- | --- |
| 1. 실험 설계 | Phase A 1편 |
| 2. 데이터 사고 | Phase A 단락 / Phase D |
| 3. 모델/도메인 이해 | Phase D (사이드 프로젝트) |
| 4. 파이프라인 설계 | Phase A 2편 |
| 5. 평가/측정 시스템 | Phase A 3편, Phase B-1 |
| 6. 트레이드오프/의사결정 | Phase B-2 |
| (+) 시스템 부채 인식 | Phase B-1 |

이 표를 강제로 채울 필요는 없다. 그냥 각 글이 어떤 질문을 상대적으로 더 많이 품고 있는지 보는 정도면 충분하다.

---

## 5. 결정 대기 중인 항목

- [ ] **B-1 발행 시점**: (A) 페어 전 / (B) 페어 후. 잠정 추천 (A).
- [ ] **첫 글로 어디부터 들어갈지**: 시간순(1편부터) vs 가장 쓰기 쉬운 것부터(자료 정리도 기준)
- [ ] **3편의 곁다리 단락**(LLaVA 한국어): 넣을지 뺄지
- [ ] **2편 마무리 다리**(observability): 한 단락으로 두고 3편으로 넘길지, 별도 글로 분리할지

## 6. 다음 단계

1. 위 결정 대기 항목 중 우선순위 높은 것부터 정리
2. 발행 첫 글을 골라서 본문 골격(섹션 단위) 잡기 → 현재 작업본은 `content/drafts/pilab/`에 작성
3. 발행 후 dev-hub 원본 `소재-후보.md`와 이 문서 양쪽에 발행 링크/날짜 기록

## 7. 초안 위치

Phase A 3편의 현재 발행 후보는 새 repo에 import되어 있다.

- [01-lr-두배-올렸더니.md](../drafts/pilab/01-lr-두배-올렸더니.md) — Phase A 1편 현재 작업본
- [02-프롬프트로-환각-잡으려다.md](../drafts/pilab/02-프롬프트로-환각-잡으려다.md) — Phase A 2편 현재 작업본
- [03-judge-프롬프트-바꿨더니.md](../drafts/pilab/03-judge-프롬프트-바꿨더니.md) — Phase A 3편 현재 작업본

초기안과 v2 이전 기록은 dev-hub `track/pilab/blog/drafts/`를 source archive로 본다.

## 관련 문서

- dev-hub `track/pilab/blog/메모/소재-후보.md` — 후보 풀 (31개)
- [dev-hub/track/pilab/CLAUDE.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/CLAUDE.md) — 블로그 운영 규칙, 평가 기준
- [blog-1year-retrospective.md](../posts/2026-02-03-blog-1year-retrospective.md) — 직전 회고 (이 시리즈의 prequel)
- [config-아키텍처-분석.md](/Users/hammyeong-yeon/Desktop/10_work/dev-hub/track/pilab/sprint-04/1주차/페어이전/config-아키텍처-분석.md) — Phase B 본문의 핵심 원자료
