---
작성일: 2026-05-08
갱신일: 2026-05-08
성격: PI Lab Sprint 04 / delta-03 분석 메모를 바탕으로 확정한 3개 글감 작업 카드
원천: ../../temp/pilab-sprint-04-analysis.tmp.md
공개상태: 내부 작업 문서
---

# PI Lab Sprint 04 확정 글감 3개

이 문서는 `temp/pilab-sprint-04-analysis.tmp.md`와 이후 검토 대화를 바탕으로 Sprint 04 글감 후보를 3개로 확정한 작업 문서다. 이전 후보 목록은 줄이고, 실제 초안으로 들어갈 수 있는 글감만 남긴다.

공개 글로 옮길 때는 내부 경로, 미션 코드 원문, 녹취 문장, 페어 문서 원문을 직접 노출하지 않는다. 수치와 사건은 최종 리포트, 실험 로그, 실제 코드 변경과 한 번 더 교차 확인한다.

## 1. 확정 조합

### 1편. AI 실험에서 기록은 실행 계약이어야 했다

역할: Sprint 04 전체를 여는 기반 글  
글 유형: learning-experiment + technical-case-study  
핵심 축: config / snapshot / prompt version / LangSmith / 실행 조건

이 글은 Sprint 04의 가장 큰 문제의식이다. 모델을 더 좋게 바꾸는 것보다 먼저, 어떤 조건에서 나온 결과인지 복원할 수 있어야 했다. 기록은 보고서가 아니라 실행 결과를 믿게 만드는 계약이어야 했다는 쪽으로 잡는다.

### 2편. Hybrid → HyDE → LLM rerank로 검색 실패를 분해한 개선기

역할: RAG retrieval 개선기  
글 유형: technical-case-study  
핵심 축: vector recall / BM25 / RRF / HyDE / rerank / failure layer

이 글은 실험 나열이 아니라 개선기다. 검색 실패를 threshold나 top_k 문제로 뭉개지 않고, 정답 후보가 어느 레이어에서 사라지는지 보고 구현으로 보강한 과정을 다룬다.

### 3편. semantic chunking을 켰더니 embedding 한도가 먼저 터졌다

역할: 멀티모달 RAG 이슈 정리 + 개발 대응 글  
글 유형: learning-experiment + technical-case-study  
핵심 축: 비용/한도 분리 / 모델 다운그레이드 실패 모드 / semantic chunking fallback + trace 설계

이 글은 제목은 살짝 강하게 가되, 본문은 개발 이슈를 차분히 정리한다. 핵심은 "개선처럼 보인 변경이 다음 레이어에서 어떤 비용, 한도, 실패 모드, 관측 문제로 돌아왔는가"다.

## 2. 발행 순서

추천 순서:

1. `AI 실험에서 기록은 실행 계약이어야 했다`
2. `Hybrid → HyDE → LLM rerank로 검색 실패를 분해한 개선기`
3. `semantic chunking을 켰더니 embedding 한도가 먼저 터졌다`

이 순서가 좋은 이유:

- 1편은 Sprint 04 전체의 기반 문제의식이다.
- 2편은 retrieval 개선을 독립적인 기술 개선기로 세운다.
- 3편은 멀티모달 RAG에서 실제로 터진 이슈와 개발 대응을 정리한다.
- 세 글이 모두 "실험 결과를 믿을 수 있게 만들기"라는 큰 축 아래 있지만, 각각 config/observability, retrieval, multimodal pipeline 이슈로 역할이 갈린다.

## 3. 글감 카드

### 후보 1. AI 실험에서 기록은 실행 계약이어야 했다

중심 질문:

- AI 실험에서 왜 config, prompt, env, trace가 결과와 함께 남아야 했나?

핵심 thesis:

> Sprint 4에서 배운 것은 기록을 잘 남기는 법이 아니라, 기록된 값과 실행된 값이 어긋나지 않게 만드는 법이었다.

대표 장면:

- 과거 snapshot은 있었지만, 일부 실행 경로에서는 기록된 값과 실제 실행 조건이 분리될 수 있었다.
- Stage Config와 provider 분리로 transcription, vision, embedding, QA/judge/retrieval의 설정 책임을 나눴다.
- prompt versioning과 snapshot 단일화로 "어떤 프롬프트와 설정으로 나온 결과인가"를 복원 가능하게 만들었다.
- evals는 공식 비교/보관용으로 남기고, LangSmith는 실제 app 요청 하나의 흐름을 보는 도구로 분리했다.
- `qa.request` 같은 root run은 함수명이 아니라 "질문 1건 처리"라는 관측 계약에 가까웠다.

넣을 재료:

- Stage Config
- provider 역할 분리
- prompt versioning
- config snapshot 단일화
- `override_config`
- LangSmith trace root
- source/config metadata
- tests와 E2E 확인

본문 범위:

1. 이전 글들의 질문이 답변 → Context → Judge → 실행 조건으로 이동했다.
2. Sprint 4에서는 결과 자체보다 그 결과가 나온 실행 조건을 의심하게 됐다.
3. snapshot은 있었지만 실행을 보증하려면 config, prompt, env, trace가 함께 묶여야 했다.
4. Stage Config, prompt versioning, snapshot 단일화, override로 실험 조건을 코드 구조 안으로 끌어왔다.
5. LangSmith는 "툴 도입"이 아니라 관측 가능한 실행 단위를 코드에 만드는 작업이었다.
6. 이후 기준은 "점수가 올랐는가"보다 "그 점수가 어떤 조건에서 나왔는지 복원 가능한가"가 됐다.

자료 장치 후보:

- `기록만 있는 상태`와 `실행 계약이 된 상태` 비교표.
- `evals`와 `LangSmith`의 역할 분리 표.
- `config / prompt / env / trace / result` 흐름 도식.
- 공개 가능한 범위의 trace tree 텍스트 도식.

제목 후보:

- `AI 실험에서 기록은 실행 계약이어야 했다`
- `config snapshot 하나로는 부족했다`
- `실험 기록을 결과 저장에서 실행 계약으로 바꾸기`

주의:

- `.env` 실수 같은 설정 사고를 전면에 세우지 않는다. 공개 글에서는 실행 조건을 복원하는 구조 문제로 일반화한다.
- LangSmith 기능 소개 글로 흐르지 않게 한다.
- 내부 코드 파일명과 라인 번호를 공개 글의 근거처럼 쓰지 않는다.
- retrieval, vision, metadata를 모두 동등한 주인공으로 올리지 않는다.

검증 원천:

- `config-아키텍처-분석.md`
- `2주차/2차페어/작업정리.md`
- `upgrade-report.md`
- 미션 repo의 최종 커밋 흐름

다음 작업:

- source card를 `config / snapshot / LangSmith`로만 좁힌다.
- trace tree를 공개 가능한 텍스트 도식으로 바꿀 수 있는지 확인한다.

### 후보 2. Hybrid → HyDE → LLM rerank로 검색 실패를 분해한 개선기

중심 질문:

- RAG 검색 실패를 어떻게 vector recall, lexical match, query expansion, rerank 문제로 나누고, 각 레이어를 어떤 구현으로 보강했나?

핵심 thesis:

> 검색 개선은 threshold를 낮추는 일이 아니라, 정답 후보가 어느 레이어에서 사라지는지 보고 그 레이어를 하나씩 보강하는 일이었다.

대표 장면:

- 한 질문이 계속 실패했고, 처음에는 threshold나 top_k 문제처럼 보였다.
- baseline vector 검색은 정답 chunk를 후보 pool 안으로 올리지 못했다.
- BM25와 RRF를 붙이며 lexical 경로를 추가했다.
- HyDE는 vector recall을 올렸지만, BM25와 rerank에는 원 쿼리를 유지해야 한다는 역할 분리가 생겼다.
- Cohere rerank가 alias와 맥락 전이를 잘 못 잡는 지점에서 LLM rerank를 provider 옵션으로 추가했다.
- LLM rerank는 강했지만 비용과 지연이 있어 rollback 가능한 provider switch가 필요했다.

넣을 재료:

- vector search
- BM25
- RRF
- HyDE
- Cohere rerank 한계
- LLM rerank
- rerank provider switch
- rollback path
- LangSmith trace의 `vector_search`, `bm25_search`, `rrf_fuse`, `rerank` 경계
- Kiwi 형태소 분석 기록 충돌

본문 범위:

1. "검색이 안 된다"를 하나의 문제로 묶으면 손잡이가 없다.
2. 먼저 정답 chunk가 후보 pool 안에 들어왔는지 봤다.
3. BM25 + RRF로 vector 검색의 빈틈을 보강했다.
4. HyDE는 검색기가 이해하기 좋은 vector query를 만드는 쪽으로 역할을 좁혔다.
5. Cohere rerank가 못 잡은 alias/의미 전이를 LLM rerank로 보강했다.
6. 개선의 결론은 "정답률 상승"보다 실패 레이어를 분해하고 다음 병목을 볼 수 있게 된 것이었다.

자료 장치 후보:

- `vector -> BM25/RRF -> HyDE -> rerank -> answer` 단계별 실패 위치 표.
- `pool 밖 / pool 안 / rerank 실패 / 답변 실패` 진단 매트릭스.
- 원 쿼리와 HyDE query의 역할 분리 의사코드.
- 개선 전후 pipeline 도식.

제목 후보:

- `Hybrid → HyDE → LLM rerank로 검색 실패를 분해한 개선기`
- `threshold를 낮추기 전에 pool을 보라`
- `검색 실패를 고친 게 아니라 실패 위치를 옮겼다`
- `RAG 검색 실패를 vector, BM25, rerank로 쪼개기`

주의:

- 특정 질문/영상 소재를 어디까지 공개할지 정해야 한다.
- Kiwi 결과는 문서마다 조건이 충돌하므로 결론으로 쓰지 않는다.
- "hybrid로 해결했다"보다 "어느 레이어를 보강했고 병목이 어디로 이동했는가"로 쓴다.
- 실험 로그 문체로 흐르지 않게 구현 변경, 관측 지점, rollback 가능성을 함께 보여준다.

검증 원천:

- `2주차/1차페어/작업정리.md`
- `2주차/1차페어/대화정리.md`
- 미션 repo retrieval 관련 notes
- `upgrade-report.md`

다음 작업:

- 각 단계의 rank, pool 포함 여부, accepted 여부를 다시 확인한다.
- Kiwi 충돌은 "검증 보류"로 둘지 본문에서 제외할지 결정한다.

### 후보 3. semantic chunking을 켰더니 embedding 한도가 먼저 터졌다

중심 질문:

- 멀티모달 RAG에서 각 레이어의 개선이 왜 다음 레이어의 비용, 한도, 실패 모드, 관측 문제로 바뀌었나?

핵심 thesis:

> 레이어를 따로 보면 각각 개선처럼 보였지만, 파이프라인 안에서는 한 레이어의 출력이 다음 레이어의 입력이 되면서 전혀 다른 이슈로 돌아왔다.

이 글의 확정 사례:

1. 비용/잔액 문제와 embedding 한도 초과가 분리된 사건
2. vision 모델 다운그레이드가 실패 모드를 바꾼 사건
3. semantic chunking 구현을 fallback/trace 가능한 구조로 쪼갠 사건

#### 사례 1. 에러는 embedding에서 났는데 비용은 vision에서 새고 있었다

핵심:

- 당시에는 비용 문제와 embedding 한도 문제가 한 덩어리처럼 느껴졌다.
- 실제로는 두 축이었다.
- 에러는 `text-embedding-3-small` 단일 input 한도 초과에서 났다.
- 비용 주범은 embedding이 아니라 긴 vision output이었다.
- v6 vision prompt의 긴 frame description이 두 축에 동시에 기여했다.
- v8 축소는 "품질 포기"가 아니라 에러 축과 비용 축을 함께 낮추기 위한 시스템 안정화였다.

넣을 수 있는 수치:

- 단일 embedding input 한도: 8,191 tokens.
- v6 prompt 출력: 프레임당 1~2천 tokens 수준으로 기록됨.
- 2026-04-19 하루 비용에서 gpt-5.4 vision이 대부분을 차지하고, embedding 비용은 사실상 미미했다는 정리.

주의:

- 정확한 비용 수치와 날짜별 사용량은 발행 전 재확인한다.
- "semantic chunking 때문에만 터졌다"라고 쓰지 않는다. 사후 확인상 fixed 조건에서도 긴 frame description concat 구조가 한도 초과를 만들 수 있었다.

#### 사례 2. 모델을 낮췄더니 실패가 더 위험해졌다

핵심:

- 가설은 단순했다. v6 prompt가 도메인 정보를 잘 요구하니, 더 싼 vision 모델로 내려도 통과율을 유지할 수 있지 않을까?
- 결과는 gpt-5.4 + v6의 2/3에서 gpt-4o + v6의 1/3로 후퇴했다.
- 더 중요한 점은 실패 모드였다. 기존에는 "확인 불가"에 가까웠지만, 다운그레이드 후에는 엉뚱한 답을 확신 있게 내는 hallucination이 나왔다.
- gpt-4o에서는 TPM rate limit도 더 빠듯해 concurrency를 조정해야 했다.

개발자 관점:

- 비용 최적화는 모델 가격표만 보는 문제가 아니다.
- 실패 모드, rate limit, concurrency, fallback 정책까지 같이 본다.
- "싼 모델 fallback"은 default가 아니라 비용 민감 경로에서만 쓰는 중도안이 될 수 있다.

#### 사례 3. semantic chunking을 fallback/trace 가능한 구조로 쪼갰다

핵심:

- semantic chunking은 단순 알고리즘 추가가 아니었다.
- 설정 분기 스캐폴딩과 알고리즘 구현을 커밋 단위로 나눴다.
- default는 fixed로 두어 rollback 경로를 보존했다.
- 경계 탐지용 embedding과 실제 chunk embedding은 목적이 다르므로 trace도 분리했다.
- `ingest.6_embed_chunks`와 `ingest.6.1_embed_boundary`처럼 관측 단위를 나눠, 어느 쪽이 느린지/비싼지 볼 수 있게 했다.

개발자 관점:

- 새 전략을 넣을 때는 알고리즘만 넣지 않는다.
- fallback, 리뷰 단위, trace 경계, 비용/지연 관측 단위를 같이 설계한다.
- 이 사례가 3편을 단순 비용 글이 아니라 개발 이슈 정리 글로 버티게 한다.

본문 범위:

1. Sprint 04의 멀티모달 RAG 이슈는 대부분 "개선했는데 다른 레이어가 터진" 형태였다.
2. 메인 사건은 긴 vision output과 context assembly가 embedding input 한도를 넘긴 일이었다.
3. 비용과 에러는 같은 원인이 얽혔지만 같은 문제가 아니었다.
4. 모델 다운그레이드는 비용을 낮추는 대신 실패 모드와 rate limit 조건을 바꿨다.
5. semantic chunking은 fallback과 trace 경계까지 포함해 설계해야 했다.
6. 결론은 한 레이어의 성공만 보지 말고, 그 출력이 다음 레이어에서 어떤 입력, 비용, 한도, 관측 문제로 바뀌는지 봐야 한다는 기준이다.

자료 장치 후보:

- `vision prompt -> frame description -> semantic/fixed chunk -> multimodal context -> embedding input` 흐름 도식.
- 이슈 정리 표: `개선 의도 / 터진 위치 / 실제 원인 / 대응 / 남은 기준`.
- v6와 v8의 역할/출력 길이/위험 비교표.
- 모델 다운그레이드 전후 비교표: `통과율 / 실패 모드 / rate limit / 운영 판단`.
- semantic chunking 구현 구조 표: `분기 / 알고리즘 / fallback / trace`.

제목 후보:

- `semantic chunking을 켰더니 embedding 한도가 먼저 터졌다`
- `에러는 embedding에서 났는데 비용은 vision에서 새고 있었다`
- `좋아진 줄 알았는데 다음 레이어가 터졌다`
- `비전 프롬프트 하나가 비용과 embedding 한도를 동시에 터뜨렸다`
- `프롬프트는 모델 앞 텍스트가 아니라 파이프라인 입력이다`

주의:

- 비용 글로만 읽히지 않게 한다. 비용은 훅이고, 본문은 개발 이슈와 대응 구조가 중심이다.
- `.env` 설정 누락을 공개 글의 주요 사례로 세우지 않는다.
- speaker metadata/pitch 이야기는 이번 3편의 범위를 벗어나므로 넣지 않는다.
- correction guard, frame_description 의미 혼선, LangSmith 고아 run은 이번 3편에서는 제외하거나 한 줄 이하로만 둔다.

검증 원천:

- `2주차/2차페어/작업정리.md`
- `2주차/2차페어/대화정리.md`
- `upgrade-report.md`
- `track-b/04-weekend2/concurrency-concepts-with-async-refactor.md` 중 concurrency/rate limit 참고

다음 작업:

- 비용/한도 수치를 최종 원천에서 다시 확인한다.
- gpt-5.4 → gpt-4o 다운그레이드 전후 질문별 결과를 표로 만든다.
- semantic chunking 관련 커밋을 `분기 / 알고리즘 / trace / fallback`으로 다시 정리한다.

## 4. 공통 공개 경계

세 글 모두 아래를 지킨다.

- 내부 경로와 미션 repo 파일명/라인 번호는 공개 글에 직접 쓰지 않는다.
- 원본 녹취 문장, 페어 문서 문장, 개인 메모 문장을 그대로 옮기지 않는다.
- 비용 수치와 모델명은 발행 전 원천과 다시 대조한다.
- "A를 해서 B가 좋아졌다"보다 "A를 했더니 병목이 C에서 D로 이동했다"는 식으로 쓴다.
- 실험 수치가 작거나 조건이 좁으면 "확정" 대신 "이 조건에서는", "이 실패 모드에서는"으로 범위를 좁힌다.

## 5. 다음 단계

1. 1편 source card를 `config / snapshot / LangSmith`로 좁힌다.
2. 2편 source card를 `retrieval pipeline 단계별 실패 위치`로 좁힌다.
3. 3편 source card를 `비용/한도`, `모델 다운그레이드`, `semantic chunking 구현 구조` 세 묶음으로 좁힌다.
4. 세 글 모두 초안 전 `검증 원천`의 수치, 모델명, 실험 조건을 다시 확인한다.
