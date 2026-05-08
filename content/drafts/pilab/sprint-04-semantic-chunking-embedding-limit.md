---
title: "semantic chunking을 켰더니 embedding 한도가 먼저 터졌다"
author: "myeongyeon ham"
date: TBD
readTime: "12 min read"
platform: Blog
project: PI Lab
sprint: 4
tags:
  - AI/ML
  - 부트캠프
  - Multimodal RAG
  - Semantic Chunking
  - Embedding
  - learning-experiment
---

# semantic chunking을 켰더니 embedding 한도가 먼저 터졌다

멀티모달 RAG를 만들다 보면 개선처럼 보이는 변경이 많습니다. 비전 프롬프트를 자세히 쓰면 화면 정보를 더 잘 설명할 것 같습니다. semantic chunking을 넣으면 문맥 경계가 더 자연스러워질 것 같습니다. 더 싼 모델로 내려도 품질이 유지되면 비용을 줄일 수 있을 것 같습니다.

각각만 보면 다 맞는 방향입니다.

그런데 파이프라인 안에서는 한 레이어의 출력이 다음 레이어의 입력이 됩니다. 비전 프롬프트가 길어지면 frame description이 길어지고, 그것이 chunk와 합쳐지고, 다시 embedding 입력이 됩니다. 모델을 바꾸면 가격만 바뀌는 것이 아니라 실패 모드와 rate limit도 바뀝니다. chunking 전략을 추가하면 알고리즘뿐 아니라 default, trace, rollback 경로까지 같이 설계해야 합니다.

이번 스프린트에서 터진 이슈들은 모두 이 형태였습니다.

당시 느낌은 단순했습니다. 좋아진 줄 알았는데, 다음 레이어가 먼저 터졌습니다.

이 글에서 볼 사례는 세 가지입니다.

| 좋아 보였던 변경 | 실제로 먼저 봐야 했던 것 |
| --- | --- |
| 비전 설명을 자세히 쓴다 | 다음 embedding 입력이 얼마나 커지는가 |
| 더 싼 모델로 내린다 | 실패 모드와 rate limit이 어떻게 바뀌는가 |
| semantic chunking을 켠다 | default, rollback, trace가 준비되어 있는가 |

비용은 이 글의 주제가 아니라 현상을 분리하기 위한 단서입니다. 중심 질문은 하나입니다. 한 레이어의 개선이 다음 레이어에서 어떤 입력, 한도, 실패 모드, 관측 문제로 바뀌는가?

![멀티모달 RAG에서 한 레이어의 변경이 다음 레이어의 비용, 한도, 실패 모드로 바뀌는 구조](/images/posts/sprint-04-semantic-chunking-embedding-limit/01-next-layer-effects.svg)

Caption: 멀티모달 RAG의 다음 레이어 효과

## embedding 에러 뒤에 있던 vision 출력

가장 먼저 크게 보인 문제는 embedding input limit이었습니다.

겉으로 보인 증상은 간단했습니다.

```text
text-embedding-3-small
single input token limit 초과
최대 context length 8,192 tokens 근처에서 실패
```

처음에는 이 문제가 semantic chunking 때문처럼 보였습니다. chunking 전략을 바꾸는 중에 embedding 단계에서 터졌으니 자연스럽게 그렇게 읽혔습니다.

그런데 실패 위치와 원인 위치는 같지 않았습니다.

멀티모달 ingestion에서는 텍스트 chunk만 embedding하지 않았습니다. 영상의 frame description을 chunk와 결합해서 multimodal context를 만들고, 그 텍스트를 embedding 입력으로 보냈습니다.

```text
vision prompt
  -> frame description
  -> chunk와 시간 기준으로 결합
  -> multimodal context
  -> embedding input
```

여기서 v6 비전 프롬프트가 만든 frame description이 길었습니다. 작업 기록에는 프레임당 1~2천 tokens 수준의 긴 설명이 나오는 경우가 남아 있었습니다. chunk 하나에 여러 frame description이 붙으면 길이는 금방 커집니다.

즉 embedding 단계에서 에러가 났지만, 그 입력을 키운 것은 앞단의 vision 출력이었습니다.

```text
긴 vision output
  ├─ vision API 호출 비용 증가
  └─ chunk와 결합된 embedding input 길이 증가
        └─ single input token limit 초과
```

더 헷갈렸던 것은 비용 문제와 한도 문제가 동시에 보였다는 점입니다. 같은 기간 API 사용량도 크게 늘었습니다. 작업 기록 기준으로 2026년 4월 19일 하루 비용은 약 12.6달러였고, 그중 gpt-5.4 vision 호출이 약 11.06달러로 대부분을 차지했습니다. 반면 embedding 비용은 약 0.003달러 수준으로 매우 작았습니다.

이렇게 보니 두 문제는 붙어 있었지만 같은 문제는 아니었습니다.

| 보이는 현상 | 실제로 봐야 했던 축 |
| --- | --- |
| embedding input limit 에러 | chunk와 frame description이 결합된 입력 길이 |
| API 비용 증가 | 긴 vision output을 만드는 비전 모델 호출 |
| semantic chunking 전환 중 에러 | chunking 전략만이 아니라 context assembly 전체 |

비용은 vision에서 새고 있었고, 에러는 embedding에서 났습니다. 원인은 서로 얽혀 있었지만 대응은 분리해야 했습니다.

이 수치는 "비용이 많이 들었다"를 말하기 위한 것이라기보다, 같은 긴 vision output이 한쪽에서는 비용으로, 다른 한쪽에서는 embedding 입력 길이로 드러났다는 것을 보여주는 단서였습니다.

## 비전 프롬프트 축소, 품질 포기가 아닌 입력 안정화

이 문제를 보고 비전 프롬프트를 줄였습니다.

처음에는 긴 설명이 더 좋은 입력처럼 보였습니다. 화면을 자세히 설명하면 나중에 검색과 답변에 쓸 근거가 많아질 것 같았습니다. 하지만 RAG 파이프라인에서는 정보가 많다고 항상 좋은 것이 아니었습니다.

긴 frame description은 세 가지 문제를 만들었습니다.

- vision 호출 비용이 커졌습니다.
- chunk와 결합된 embedding input이 한도에 가까워졌습니다.
- 검색과 답변에 들어가는 Context가 장황해졌습니다.

그래서 v8에서는 비전 설명의 구조를 줄이고, 출력 길이를 제한하는 방향으로 바꿨습니다. 품질을 포기하려는 결정이라기보다, 파이프라인 전체가 감당할 수 있는 입력 크기로 맞추는 쪽에 가까웠습니다.

프롬프트는 모델 앞에 놓이는 텍스트이기도 하지만, 동시에 다음 단계의 데이터 생성기입니다. 비전 프롬프트가 만드는 문장은 사람이 읽는 설명에서 끝나지 않습니다. DB에 저장되고, chunk와 합쳐지고, embedding되고, retrieval과 rerank의 입력이 됩니다.

이 관점으로 보면 "설명을 더 자세히 하자"는 결정도 비용, 한도, 검색 노이즈를 함께 봐야 합니다.

## 모델 다운그레이드가 바꾼 실패 모드

비용을 줄이는 가장 쉬운 생각은 모델을 낮추는 것입니다.

비전 프롬프트가 충분히 구조화되어 있다면, 더 싼 모델로 내려도 필요한 정보를 뽑아낼 수 있지 않을까? 실제로 이런 가설을 세울 수 있었습니다. 비싼 모델을 항상 default로 쓰는 것보다, 비용 민감 경로에서는 더 가벼운 모델을 쓰는 편이 좋아 보였습니다.

이때 가격표만 보면 결정이 쉬워집니다. 하지만 실제로 비교해야 할 것은 가격표가 아니라 운영 표였습니다.

대표 조건에서 gpt-5.4와 v6 프롬프트 조합은 3개 중 2개를 통과했습니다. 같은 v6 프롬프트를 gpt-4o로 낮췄을 때는 3개 중 1개로 후퇴했습니다.

통과율보다 더 중요했던 것은 실패 모드였습니다.

기존 실패는 확인 불가에 가까웠습니다. 충분히 근거를 찾지 못하거나, 답변을 피하는 쪽이었습니다. 그런데 모델을 낮춘 뒤에는 엉뚱한 답을 확신 있게 말하는 hallucination이 나왔습니다. 실패가 더 조용하고 위험한 형태로 바뀐 셈입니다.

비용 최적화에서는 이 차이가 중요합니다.

| 비교 축 | 봐야 할 것 |
| --- | --- |
| 가격 | 호출당 비용이 얼마나 줄어드는가 |
| 품질 | 같은 질문 세트에서 통과율이 유지되는가 |
| 실패 모드 | 모른다고 하는가, 틀린 답을 확신하는가 |
| rate limit | TPM 제한과 concurrency를 감당할 수 있는가 |
| 운영 정책 | default로 둘 것인가, fallback으로만 둘 것인가 |

gpt-4o 조건에서는 TPM rate limit도 더 빠듯하게 걸렸고, concurrency를 조정해야 했습니다. 이 정도까지 보면 모델 다운그레이드는 가격표만 보고 결정하기 어려웠습니다.

이번 판단은 중간 지점에 가까웠습니다. 기본값은 품질이 더 안정적인 모델에 두고, 비용 민감 경로나 제한된 fallback에서만 더 싼 모델을 검토하는 쪽이었습니다.

싼 모델을 쓴다는 것은 비용만 줄이는 결정이 아니었습니다. 실패 모드와 운영 조건까지 함께 바꾸는 결정이었습니다.

## semantic chunking 전에 필요한 rollback과 trace

semantic chunking도 처음에는 개선처럼 보였습니다.

고정 길이나 고정 시간으로 자르면 문맥이 중간에서 끊길 수 있습니다. 의미 경계를 보고 chunk를 나누면 검색 품질이 좋아질 수 있습니다. 특히 영상이나 대화처럼 주제가 자연스럽게 넘어가는 데이터에서는 더 그럴듯해 보였습니다.

하지만 실제 구현에서 먼저 필요했던 것은 알고리즘이 아니라 스위치였습니다.

```text
semantic을 켠다
  -> 문제가 생긴다
  -> fixed로 되돌린다
  -> 두 실행을 같은 기준으로 비교한다
```

이 경로가 없으면 semantic chunking은 실험 레버가 아니라 한 번 켜면 해석하기 어려운 변경이 됩니다.

새 chunking 전략을 default로 바로 올리면 문제가 생겼을 때 되돌리기 어렵습니다. 그래서 설정 분기와 알고리즘 구현을 나눴습니다. 먼저 chunking strategy를 선택할 수 있는 구조를 만들고, default는 fixed로 유지했습니다. 그 다음 semantic 알고리즘을 붙였습니다.

이 순서가 중요했습니다.

```text
chunking strategy
  |-- fixed: 기존 기본값
  |-- semantic: 새 전략

semantic path
  -> boundary embedding
  -> boundary detection
  -> chunks
  -> chunk embedding
```

semantic chunking에서는 embedding도 두 종류가 됩니다. 경계를 찾기 위한 embedding과, 실제 chunk를 검색하기 위한 embedding은 목적이 다릅니다. 둘을 같은 단계처럼 보면 비용과 지연을 분리해서 볼 수 없습니다.

그래서 trace도 나눠야 했습니다.

```python filename="chunking_strategy.py"
# chunking_strategy.py - fixed 기본값을 유지한 채 semantic 경로를 분기
if chunking_strategy == "semantic":
    boundaries = embed_and_find_boundaries(transcript)
    chunks = split_by_boundaries(transcript, boundaries)
else:
    chunks = split_by_fixed_window(transcript)

chunk_embeddings = embed_chunks(chunks)
```

| 관측 단위 | 의미 |
| --- | --- |
| boundary embedding | semantic 경계를 찾기 위한 비용과 시간 |
| chunk embedding | 검색에 쓰일 최종 chunk embedding 비용과 시간 |
| chunk strategy | fixed와 semantic 중 어떤 경로를 탔는지 |
| rollback | semantic을 끄고 fixed로 다시 실행할 수 있는지 |

이렇게 보니 새 알고리즘을 넣는 일은 코드 추가만으로 끝나지 않았습니다. default, rollback, trace, snapshot이 같이 있어야 운영 가능한 실험으로 다룰 수 있었습니다.

## 세 이슈를 묶는 구조: 출력은 다음 단계의 입력

이 세 사례는 서로 다른 문제처럼 보입니다.

하나는 embedding input limit이고, 하나는 모델 다운그레이드이고, 하나는 semantic chunking 구현입니다. 따로 보면 다른 이슈지만, 모두 한 레이어의 개선이 다음 레이어의 조건을 바꾼 사례였습니다.

지금 단계의 출력은 다음 단계의 입력이 됩니다.

| 개선 의도 | 터진 위치 | 실제로 봐야 했던 것 | 대응 |
| --- | --- | --- | --- |
| 비전 설명을 풍부하게 만든다 | embedding input limit, vision cost | frame description 길이와 context assembly | 프롬프트 축소, 입력 크기 관리 |
| 더 싼 비전 모델을 쓴다 | 답변 품질, hallucination, rate limit | 실패 모드와 concurrency | default/fallback 정책 분리 |
| semantic chunking을 넣는다 | embedding 비용/trace/rollback | boundary embedding과 chunk embedding의 목적 차이 | strategy 분기, fixed 기본값, trace 분리 |

이 표를 보고 나서야 이번 이슈들을 하나의 기준으로 묶을 수 있었습니다.

멀티모달 RAG에서 각 단계는 독립된 모듈처럼 보이지만, 출력은 계속 다음 단계의 입력이 됩니다. 그래서 한 단계의 품질 개선은 다음 단계의 비용 증가가 될 수 있고, 한 단계의 비용 절감은 다음 단계의 실패 모드 악화가 될 수 있습니다.

프롬프트도 마찬가지입니다. 프롬프트는 모델에게 주는 지시문이지만, 파이프라인 안에서는 데이터 생성 규칙이 됩니다. 그 출력이 저장되고, 검색되고, embedding되고, 답변에 들어갑니다.

## 다음 이슈를 볼 때의 순서

이번 일을 겪고 나서 멀티모달 RAG 이슈를 볼 때의 순서가 조금 생겼습니다.

첫 질문은 이제 "어느 단계가 실패했나?"에서 끝나지 않습니다.

```text
실패가 보인 위치는 어디인가?
그 입력을 만든 위치는 어디인가?
그 변경이 다음 레이어에 어떤 형태로 도착했는가?
```

먼저 에러가 난 위치와 원인이 생긴 위치를 분리해야 합니다. embedding에서 에러가 났다고 embedding 모델만 볼 일이 아닙니다. 입력을 만든 것은 chunking과 vision output일 수 있습니다.

다음으로 비용과 에러를 분리해야 합니다. 같은 원인에서 출발했더라도 비용 주범과 에러 주범은 다를 수 있습니다. 이번에는 비용은 vision 호출에, 에러는 embedding input limit에 더 가깝게 드러났습니다.

그다음 실패 모드를 봐야 합니다. 모델을 낮췄을 때 점수만 볼 것이 아니라, 실패가 더 안전해졌는지 더 위험해졌는지 봐야 합니다. 모른다고 하는 실패와 틀린 답을 확신하는 실패는 운영에서 다르게 다뤄야 합니다.

마지막으로 새 전략에는 rollback 경로가 있어야 합니다. semantic chunking처럼 좋아 보이는 전략도 default로 바로 올리면 비교와 복구가 어려워집니다.

```text
1. 에러 위치와 원인 위치를 분리한다.
2. 비용 축과 한도 축을 분리한다.
3. 모델 변경은 실패 모드와 rate limit까지 본다.
4. 새 전략은 rollback과 trace를 같이 설계한다.
```

## 제목은 semantic chunking, 결론은 파이프라인

이 글의 제목은 semantic chunking을 켰더니 embedding 한도가 먼저 터졌다는 이야기입니다. 당시에는 그 장면이 강했습니다. semantic을 켠 줄 알고 답변 품질을 보려던 흐름에서 먼저 embedding 에러가 보였기 때문입니다.

다만 사후 snapshot을 다시 보면 명시적으로 실패한 실행은 `chunking_strategy=fixed`였습니다. 더 정확한 원인은 semantic 자체가 아니라, 긴 frame description을 chunk와 그대로 결합하는 context assembly가 embedding 입력을 키운 구조였습니다.

그래서 이야기는 semantic chunking 하나로만 닫히지 않았습니다.

비전 프롬프트는 다음 단계의 입력 크기를 바꿨습니다. 모델 다운그레이드는 비용뿐 아니라 실패 모드를 바꿨습니다. semantic chunking은 알고리즘뿐 아니라 rollback과 trace 경계를 요구했습니다.

멀티모달 RAG에서는 한 레이어를 따로 떼어 보면 거의 모든 변경이 좋아 보입니다. 더 자세한 설명, 더 의미 있는 chunk, 더 싼 모델, 더 강한 rerank. 하지만 실제 시스템에서는 그 변경이 다음 레이어의 입력, 비용, 한도, 관측 가능성으로 돌아옵니다.

그래서 이번 스프린트 이후로는 개선을 볼 때 질문이 바뀌었습니다.

이 변경은 지금 레이어에서 무엇을 좋아지게 하는가.  
그리고 다음 레이어에는 어떤 입력으로 도착하는가.

이 두 번째 질문을 놓치면, 좋아진 줄 알았던 변경은 아주 빠르게 다른 이름의 이슈가 됩니다.
