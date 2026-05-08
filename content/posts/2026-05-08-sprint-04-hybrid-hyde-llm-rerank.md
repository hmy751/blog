---
title: "Hybrid → HyDE → LLM rerank로 검색 실패를 분해한 개선기"
author: "myeongyeon ham"
date: 2026-05-08
readTime: "11 min read"
platform: Blog
topic: "Retrieval"
project: PI Lab
sprint: 4
tags:
  - AI/ML
  - 부트캠프
  - RAG
  - Retrieval
  - HyDE
  - learning-experiment
---

# Hybrid → HyDE → LLM rerank로 검색 실패를 분해한 개선기

RAG에서 답변이 틀리면 검색이 문제처럼 보입니다. 필요한 문서를 못 찾았으니 답변도 틀렸을 것 같고, 그러면 top-k를 늘리거나 threshold를 낮추면 해결될 것 같습니다.

하지만 검색 실패를 하나로 묶으면 손잡이가 사라집니다.

정답 chunk가 처음부터 후보 pool 밖에 있었는지, vector 검색에는 들어왔지만 BM25와 합쳐지는 과정에서 밀렸는지, rerank가 잘못 버렸는지, 아니면 Context는 맞았는데 답변 생성이 실패했는지 구분해야 합니다.

이번 스프린트에서 retrieval을 개선하며 가장 크게 배운 것은 이 지점이었습니다.

검색 개선은 threshold를 낮추는 일이 아니었습니다. 정답 후보가 어느 레이어에서 사라지는지 보고, 그 레이어를 하나씩 보강하는 일이었습니다.

그래서 이 글의 단위는 전체 평균 점수가 아니라 대표 질문 하나의 정답 chunk 이동 경로입니다. 그 chunk가 pool 밖에 있었는지, pool 안에 들어왔는지, rerank에서 탈락했는지, 최종 답변까지 도착했는지를 따라갑니다. 후속에는 형태소 분석 같은 비교도 이어졌지만, 여기서는 병목 이동이 가장 선명하게 남은 Hybrid, HyDE, LLM rerank 흐름만 다룹니다.

![RAG 검색 실패를 vector, hybrid, HyDE, LLM rerank 단계로 나눠 보는 도식](/images/posts/sprint-04-hybrid-hyde-llm-rerank/01-retrieval-failure-map.svg)

Caption: 검색 단계별 정답 chunk 위치 변화

## 첫 작업: 정답 chunk가 사라진 위치 표시하기

대표로 본 질문 하나가 계속 실패했습니다. 답변은 틀렸고, 처음에는 검색 결과가 약한 것으로 보였습니다. 하지만 답변만 보고는 원인을 알 수 없었습니다.

RAG 검색은 한 번에 끝나는 일이 아니었습니다.

```text
질문
  -> vector search
  -> BM25 search
  -> RRF fusion
  -> rerank
  -> Context 조립
  -> 답변 생성
```

이 흐름에서 정답 후보가 어디까지 살아남았는지를 봐야 했습니다. 정답 chunk가 vector search의 후보 pool 안에 들어오지 못하면 rerank는 아무것도 할 수 없습니다. 반대로 후보 pool 안에는 들어왔는데 rerank가 버린다면, top-k보다 rerank의 판단 기준을 봐야 합니다.

그래서 개선의 첫 단계는 검색기를 바꾸는 것이 아니라 실패 위치를 표시하는 것이었습니다.

이후의 실험은 모두 같은 질문으로 읽었습니다. 이 조치가 정답 chunk를 다음 레이어까지 보내는가?

## Vector only, 후보 pool 밖의 정답

처음 기준선은 vector 검색이었습니다. 질문을 embedding으로 바꾸고, chunk embedding과 가까운 것을 가져오는 방식입니다.

문제는 대표 질문에서 정답 chunk가 충분히 위로 올라오지 못했다는 점이었습니다. 기록상 정답 chunk의 vector similarity는 0.207 수준이었고, 전체 순위는 19위였습니다. 최종 답변에 들어가는 후보 pool 밖에 있었습니다.

이 상태에서는 뒤에서 아무리 좋은 rerank를 붙여도 정답을 고를 수 없습니다. rerank는 후보를 재정렬하는 장치이지, pool 밖의 문서를 새로 불러오는 장치가 아니기 때문입니다.

```text
vector search
  -> 정답 chunk: rank 19
  -> rerank 후보 pool: top 15 밖
  -> 결과: 정답 chunk가 답변 입력에 도착하지 못함
```

여기서 처음 유혹은 top-k를 무작정 늘리는 것이었습니다. 하지만 top-k를 늘리면 노이즈도 함께 늘어납니다. 질문 하나에서는 정답이 들어올 수 있지만, 다른 질문에서는 관련 없는 chunk가 더 많이 섞일 수 있습니다.

필요한 것은 단순히 후보를 많이 가져오는 것이 아니라, vector 검색이 놓치는 경로를 보강하는 것이었습니다.

## BM25와 RRF: lexical 경로를 하나 더 열기

vector 검색은 의미적으로 가까운 문서를 찾는 데 강하지만, 고유명사나 특정 표현의 일치가 중요한 질문에서는 약해질 수 있습니다. 반대로 BM25는 단어가 직접 맞는 경우 강합니다. 특히 드문 단어가 질문과 문서에 함께 나오면 점수가 크게 올라갑니다.

그래서 vector 검색 옆에 BM25를 붙이고, 두 결과를 RRF로 합쳤습니다.

RRF를 쓴 이유는 두 점수의 단위가 다르기 때문입니다. vector similarity는 보통 제한된 범위의 유사도 점수이고, BM25 점수는 문서와 corpus에 따라 스케일이 달라집니다. 이 둘을 그대로 더하면 점수 크기가 큰 쪽이 이깁니다.

RRF는 점수 대신 순위를 봅니다. 각 검색기에서 높은 순위에 오른 문서에 가중치를 주고, 여러 검색기에서 함께 잘 나온 문서를 위로 올립니다.

```text
vector rank
BM25 rank
  -> RRF: 점수 크기 대신 순위를 합친다
  -> hybrid candidates
```

이 변화로 검색 실패를 보는 기준이 하나 늘었습니다. 이제 정답 chunk가 vector에서는 낮더라도 BM25에서 올라오는지, 두 결과를 합쳤을 때 어느 정도 순위로 들어오는지 볼 수 있었습니다.

다만 hybrid만으로 끝나지는 않았습니다. 대표 질문에서는 BM25와 RRF를 붙이자 정답 chunk가 pool 안에는 들어왔지만, RRF 17위에 머물렀고 Cohere rerank top-3에는 뽑히지 않았습니다.

검색 실패는 사라진 것이 아니라 다음 레이어로 이동했습니다.

## HyDE 이후, 병목은 recall에서 rerank로 이동

다음으로 붙인 것은 HyDE였습니다.

HyDE는 질문을 그대로 embedding하지 않고, LLM에게 "이 질문에 답하는 문서라면 어떤 내용일까"에 가까운 가상 답변을 만들게 한 뒤 그 텍스트를 embedding합니다. 질문이 짧거나 추상적일 때, 검색기가 찾기 좋은 형태로 query를 확장하는 효과가 있습니다.

대표 질문에서는 HyDE가 vector 검색 쪽을 크게 움직였습니다. 정답 chunk의 vector similarity가 0.207에서 0.373으로 올라갔고, vector 순위도 19위에서 2위까지 올라왔습니다. RRF에서도 1위로 올라왔습니다.

이 수치만 보면 해결된 것처럼 보입니다. 하지만 실제로는 아직 실패했습니다.

정답 후보가 검색 pool 안으로 들어왔는데도, 최종 답변까지 가지 못했습니다. 이때부터 문제는 vector recall이 아니라 rerank 쪽으로 옮겨갔습니다.

| 단계 | 정답 chunk 상태 | 읽은 의미 |
| --- | --- | --- |
| vector only | similarity 0.207, rank 19 | 후보 pool 밖 |
| Hybrid | RRF rank 17 | pool에는 들어왔지만 rerank에서 탈락 |
| HyDE 추가 | similarity 0.373, vector rank 2, RRF rank 1 | recall은 복구됨 |
| 기존 rerank | 최종 후보에서 탈락 | 병목이 rerank로 이동 |

중요한 것은 HyDE를 모든 곳에 쓰지 않았다는 점입니다. HyDE가 만든 가상 답변은 vector 검색에는 유리하지만, BM25에는 오히려 질문의 날카로운 단어를 희석할 수 있습니다. BM25는 원 쿼리의 고유명사와 키워드가 중요합니다.

그래서 HyDE는 vector 검색에만 쓰고, BM25와 rerank에는 원 쿼리를 유지하는 쪽으로 역할을 분리했습니다.

```python filename="retrieval_pipeline.py"
# retrieval_pipeline.py - HyDE는 vector 검색에만 쓰고, BM25와 rerank는 원 질문을 유지
hyde_query = make_hypothetical_answer(question)

vector_candidates = vector_search(hyde_query)
bm25_candidates = bm25_search(question)

candidates = rrf_fuse(vector_candidates, bm25_candidates)
final_candidates = rerank(question, candidates)
```

이 분리는 작지만 중요했습니다. 하나의 "개선된 query"를 모든 단계에 밀어 넣는 것이 아니라, 각 검색 레이어가 무엇을 잘하는지에 맞춰 입력을 달리해야 했습니다.

## 후보 수가 아니라 rerank 판단의 문제

HyDE로 정답 후보가 위로 올라왔는데도 실패하자, 다음에는 rerank 후보 수를 늘려 봤습니다. top-3에서 떨어진다면 top-5, top-7로 늘리면 들어올 수 있을 것 같았습니다.

하지만 대표 질문에서는 이것도 충분하지 않았습니다. 후보를 더 넓혀도 기존 rerank가 정답 후보를 안정적으로 살리지 못했습니다.

이때 Cohere rerank의 한계가 보였습니다. cross-encoder 기반 rerank는 query와 candidate를 함께 보고 관련성을 매깁니다. 일반적인 의미 매칭에는 강하지만, 특정 고유명사와 별칭, 문맥 안에서만 연결되는 관계를 항상 잘 잡지는 못했습니다.

기록상 이 구간에서 rerank 점수 분포도 낮은 값으로 수렴했습니다. 모델이 후보들 사이의 차이를 자신 있게 벌리지 못하는 신호로 읽을 수 있었습니다.

여기서 다시 선택지가 생겼습니다.

- 한국어 특화 reranker를 더 찾아본다.
- Cohere를 유지하되 tokenizer나 문서 포맷을 조정한다.
- LLM에게 후보 목록을 주고 직접 고르게 한다.

이번에는 LLM rerank를 붙였습니다. 다만 답을 새로 쓰게 한 것이 아니라, 후보 목록을 보고 관련 있는 후보의 인덱스만 고르게 했습니다. 생성 모델을 답변자가 아니라 listwise reranker로 쓴 셈입니다.

이 선택은 "더 큰 모델을 쓰자"가 아니라 "기존 reranker가 구분하지 못하는 관계를 다른 판단 방식으로 보자"에 가까웠습니다.

```text
질문 + 후보 목록
  -> LLM rerank
  -> [2, 0, 5] 처럼 선택된 후보 index만 반환
  -> 선택된 후보로 Context 구성
```

## LLM rerank에 rollback 경로가 필요했던 이유

LLM rerank를 붙이자 대표 질문은 통과했습니다. RRF에서 위로 올라온 정답 후보를 LLM이 최종 후보 안에 유지했고, 답변 생성까지 이어졌습니다.

이 결과만 보면 모든 요청을 LLM rerank로 보내면 됩니다. 하지만 운영 관점에서는 그렇게 단순하지 않았습니다.

LLM rerank는 강하지만 비용과 지연이 있습니다. 기록상 쿼리당 몇 초의 추가 지연과 소액의 추가 비용이 붙었습니다. 작은 실험에서는 부담이 작아도, 질문 수가 늘거나 사용자 요청 경로에 들어가면 다른 문제가 됩니다.

그래서 rerank provider를 스위치로 나눴습니다.

| provider | 장점 | 한계 |
| --- | --- | --- |
| Cohere rerank | 빠르고 안정적이며 비용 부담이 낮음 | 별칭, 문맥 전이, 영상 안에서만 성립하는 관계에 약할 수 있음 |
| LLM rerank | 후보 사이의 의미 관계를 더 유연하게 판단 | 비용과 지연이 늘고, 출력 형식 제어가 필요함 |

중요한 것은 LLM rerank를 붙였다는 사실보다, 언제든 Cohere로 되돌릴 수 있게 만든 점이었습니다. 강한 모델을 넣는 것은 쉽습니다. 어려운 것은 강한 모델을 쓰는 경로와 비용을 줄이는 경로를 모두 열어두는 일입니다.

## 성공보다 더 중요했던 실패 경로

대표 질문의 흐름을 다시 정리하면 이렇습니다.

| 조치 | 정답 후보 상태 | 최종 결과 | 읽은 병목 |
| --- | --- | --- | --- |
| vector only | rank 19 | 실패 | 후보 pool 밖 |
| Hybrid | RRF로 일부 보강 | 실패 | lexical 보강만으로 부족 |
| HyDE | vector rank 2, RRF rank 1 | 실패 | recall은 복구, rerank 병목 |
| rerank 후보 수 증가 | 더 넓은 후보 확인 | 실패 | 후보 수 문제가 아님 |
| LLM rerank | 최종 후보에 유지 | 성공 | rerank 판단 기준 보강 |

이 표에서 중요한 것은 마지막 성공만이 아닙니다. 중간의 실패들이 각각 다른 정보를 줬다는 점입니다.

Hybrid가 실패했기 때문에 lexical 경로만으로는 부족하다는 것을 알았습니다. HyDE가 실패했기 때문에 vector recall이 복구되어도 rerank가 병목일 수 있다는 것을 알았습니다. top-k 증가가 실패했기 때문에 후보 수만 늘리는 접근이 답이 아니라는 것을 알았습니다.

실패를 레이어별로 나누면 다음 조치가 보입니다. 실패를 "검색이 안 된다"로 묶으면 결국 threshold와 top-k만 만지게 됩니다.

## trace와 snapshot: 같은 실패를 다시 보는 조건

이 개선은 검색 알고리즘만의 문제가 아니었습니다. 관측과 기록이 같이 필요했습니다.

Hybrid, HyDE, rerank provider를 바꿀 때마다 실행 조건이 늘어났습니다. `use_hybrid`, `use_hyde`, rerank provider, HyDE prompt version, LLM rerank prompt version 같은 값이 결과와 함께 남아야 했습니다.

또 trace에서는 검색 단계를 나눠 봐야 했습니다.

```text
search
  -> vector search
  -> bm25 search
  -> rrf fuse
  -> rerank
```

이 경계가 있어야 정답 후보가 어디에서 사라졌는지 볼 수 있습니다. vector 단계에서 이미 없었는지, RRF 뒤에는 있었는지, rerank가 버렸는지 알 수 있습니다.

결국 retrieval 개선도 1편의 기록 문제와 이어졌습니다. 검색을 개선하려면 실행 조건과 실패 위치가 같이 남아야 합니다.

## 검색 개선의 결론: 실패 위치를 옮겨가며 보기

이번 작업을 "Hybrid Search와 HyDE와 LLM rerank를 붙였다"로 요약할 수도 있습니다. 하지만 그렇게 말하면 핵심이 조금 흐려집니다.

가장 중요한 변화는 검색 실패를 한 덩어리로 보지 않게 된 것입니다.

vector 검색은 의미적 recall을 담당했습니다. BM25는 어휘 일치를 보강했습니다. RRF는 서로 다른 검색기의 결과를 순위로 합쳤습니다. HyDE는 vector query를 검색기가 이해하기 좋은 형태로 바꿨습니다. LLM rerank는 기존 reranker가 놓친 문맥 관계를 후보 목록 안에서 다시 판단했습니다.

각 레이어는 완벽하지 않았습니다. 오히려 한 레이어를 고칠 때마다 병목이 다음 레이어로 옮겨갔습니다.

그래서 이 개선기의 결론은 "LLM rerank가 답이다"가 아닙니다. 다음에 비슷한 실패를 만나면 먼저 볼 기준이 생겼다는 것입니다.

정답 후보는 pool 안에 있는가.  
BM25가 살릴 수 있는 lexical 단서가 있는가.  
HyDE가 query를 도와주는가, 아니면 단어를 희석하는가.  
rerank는 후보 사이의 의미 관계를 구분하고 있는가.  
강한 모델을 붙였다면 비용과 rollback 경로는 있는가.

검색 실패를 고치는 일은 답을 바로 찾는 일이 아니라, 실패 위치를 정확히 옮겨가며 다음 병목을 드러내는 일이었습니다.
