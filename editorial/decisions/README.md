# Harness Decision Records

이 폴더는 블로그 하네스를 바꾼 이유와 배경을 남긴다.

커밋 메시지는 변경 요약과 짧은 의도를 담고, decision record는 나중에 다시 읽어도 판단 맥락이 복원되도록 남긴다. 모든 하네스 변경에 기록을 강제하지는 않는다. 아래 조건 중 하나에 해당하면 기록을 남긴다.

- 새 렌즈, 새 축, 새 단계, 새 agent 역할을 추가한다.
- `writing-partners`, `developer-lens`, `portfolio-signal-lens`, `voice`처럼 여러 글에 영향을 주는 기준을 바꾼다.
- Claude/Codex agent 정의나 skill 흐름을 함께 바꾼다.
- 사용자 피드백이나 발행 글 분석에서 반복되는 문제를 일반 기준으로 승격한다.

기록하지 않아도 되는 경우:

- 오타 수정
- 링크, frontmatter, 문서 정렬 같은 운영 정리
- 이미 합의된 기준의 표현만 다듬는 작은 polish

## Record Format

```md
# {결정 제목}

작성일: YYYY-MM-DD
관련 커밋: {hash} {subject}
상태: accepted | superseded | draft

## 배경

무슨 작업을 하다가 문제가 드러났는지 쓴다.

## 문제

기존 하네스가 무엇을 놓쳤는지 쓴다.

## 결정

무엇을 어디에 추가하거나 바꿨는지 쓴다.

## 범위

적용되는 문서, agent, skill, 글 유형을 쓴다.

## 비목표

이번 결정이 의도하지 않는 것을 쓴다. 과잉 적용을 막는 구역이다.

## 근거

발행 글, draft 작업, 사용자 피드백, audit, source 자료 중 이 결정을 뒷받침한 것을 요약한다.

## 후속 점검

나중에 실제 글 작업에서 확인할 질문을 남긴다.
```
