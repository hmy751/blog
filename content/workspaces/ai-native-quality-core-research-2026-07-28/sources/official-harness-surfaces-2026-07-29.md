---
작성일: 2026-07-29
성격: 공식 제품 문서 기반 하네스 surface 조사
접근일: 2026-07-29
현재상태: 확인 사실과 설계 해석 분리
---

# Codex·Claude 공식 하네스 Surface 조사

## 이 조사의 역할

이번 대화에서 나온 `goal`, `criteria`, `Material`, `review`, `loop`만으로 후보 공간을 닫지 않기 위해 Codex와 Claude Code가 공식적으로 제공하는 구성 단위를 다시 확인했다.

공식 문서는 다음을 지원한다.

- 어떤 구성 단위가 실제 제품에 존재하는가
- 각 단위는 언제 읽히거나 발동하는가
- 어느 범위와 권한에서 작동하는가
- 비슷해 보이는 단위가 무엇을 다르게 책임지는가

공식 문서는 다음을 지원하지 않는다.

- 이 workspace에 해당 구성 단위가 반드시 필요하다는 결론
- 구성 요소가 많을수록 품질이 높다는 결론
- 제품 기능을 설치하면 이번 품질 문제가 자동 해결된다는 결론

따라서 아래의 `공식 확인`과 `현재 작업에서의 해석`을 분리한다.

더 중요한 적용 제한은 다음과 같다.

- 공식 문서의 권장 workflow를 이번 문제의 정답으로 채택하지 않는다.
- `ai-native-harness`의 분류표를 이번 core의 내용으로 복사하지 않는다.
- 이 자료에서 우선 가져오는 것은 내용이 아니라 `무엇을 어떤 작동 형태에 둘 수 있는가`를 보여주는 형식이다.
- 형식을 가져온 뒤 그 안에 들어갈 판단 내용은 이번 실패 근거와 사용자 판단으로 다시 정한다.

## Codex에서 확인된 구성 단위

### 1. 한 작업의 outcome contract

**공식 확인**

Codex best practices는 복잡한 작업의 기본 입력으로 `Goal`, `Context`, `Constraints`, `Done when`을 제시한다. 모호하거나 복잡한 작업에서는 Plan mode, 사용자 인터뷰, `PLANS.md` 같은 execution plan을 별도 장치로 제시한다.

**현재 작업에서의 해석**

`goal`은 하네스 전체를 대신하는 만능 필드가 아니다. 한 run의 입력 계약이며, 목적 복구·가설 수정·평가 기준 수정과 구분해 쓸 필요가 있다.

출처:

- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Prompting](https://learn.chatgpt.com/docs/prompting)

### 2. 지속 지침과 경로별 지침

**공식 확인**

Codex는 `AGENTS.md`를 작업 전 읽는다. 전역, 저장소, 하위 디렉토리 수준에 둘 수 있고 더 가까운 지침이 우선한다. 반복되는 실수를 보고 지침을 개선하되, 짧고 실제적인 문서를 권장한다.

**현재 작업에서의 해석**

반복 판단 원칙은 지속 지침 후보가 될 수 있지만, 한 번의 작업 상태나 긴 절차를 모두 `AGENTS.md`에 넣는 것은 다른 surface의 책임을 침범할 수 있다.

출처:

- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)

### 3. 설정과 실행 환경

**공식 확인**

Codex의 `config.toml`은 모델, reasoning effort, sandbox, approval policy, profiles, MCP, feature flag 같은 지속 설정을 소유한다. 사용자 설정과 project-scoped 설정을 구분한다.

**현재 작업에서의 해석**

판단 기준 문서와 runtime 설정은 다른 종류다. 어떤 문장이 있어야 하는 문제와 어떤 모델·도구·권한·격리 환경이 실제로 주어졌는가를 분리해야 한다.

출처:

- [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
- [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)

### 4. Skill과 plugin

**공식 확인**

Skill은 반복 작업을 위한 instructions, resources, optional scripts를 묶는다. Plugin은 skill, connector 또는 MCP server, hook과 다른 자원을 배포 가능한 단위로 묶을 수 있다. 공식 best practices는 손으로 계속 조정해야 하는 workflow를 먼저 안정화한 뒤 skill로 만들고, 공유·배포 필요가 생기면 plugin으로 확장하라고 설명한다.

**현재 작업에서의 해석**

한 번의 좋은 판단을 즉시 skill이나 plugin으로 승격하지 않는다. 반복 가능성이 있고 입력·출력·발동 조건을 설명할 수 있을 때 후보가 된다.

출처:

- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)
- [Build plugins](https://developers.openai.com/plugins/build/plugins)

### 5. MCP와 tool

**공식 확인**

MCP는 모델을 외부 tool과 live context에 연결한다. Skill은 그 tool을 언제 어떤 순서로 써서 어떤 결과를 만들지 설명할 수 있다. 공식 문서는 두 역할을 분리한다.

**현재 작업에서의 해석**

source가 자주 바뀌거나 외부 시스템 행동이 필요하면 instruction에 내용을 복사하는 것보다 connector가 적절할 수 있다. 반대로 판단 절차만 필요하다면 MCP가 아니라 skill 또는 문서가 적절하다.

출처:

- [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- [Plugin skills](https://developers.openai.com/plugins/concepts/skills)

### 6. Subagent와 main orchestration

**공식 확인**

Codex subagent는 독립된 agent thread에서 bounded task를 수행하고 main이 결과를 회수한다. 공식 문서는 read-heavy exploration, test, triage, summarization처럼 독립적으로 나눌 수 있는 일에 유용하며 write-heavy 병렬 작업은 충돌 위험이 있다고 설명한다.

**현재 작업에서의 해석**

Subagent는 `더 많은 판단`이 아니라 별도 context와 역할 위치를 만드는 장치다. 독립 review는 prompt만 다르게 쓰는 문제가 아니라 입력 packet, 권한, 반환 계약, main의 adjudication까지 포함한다.

출처:

- [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

### 7. Hook

**공식 확인**

Codex hook은 session, prompt, tool use, permission, compaction, subagent, stop 같은 lifecycle event에 script를 연결한다. 여러 source의 hook은 함께 실행될 수 있고, 비관리 command hook에는 trust review가 필요하다.

**현재 작업에서의 해석**

Hook은 좋은 판단을 저장하는 문서가 아니라 사건이 발생했을 때 관찰·검증·차단·context 주입을 자동 발동하는 장치다. 매번 반드시 지켜야 하는 기계 판정과 모델이 상황별로 판단할 기준을 구분해야 한다.

출처:

- [Hooks](https://learn.chatgpt.com/docs/hooks)

### 8. Sandbox, approval, rules

**공식 확인**

Sandbox는 filesystem과 network의 기술적 경계이고, approval policy는 그 경계를 넘어야 할 때 언제 멈출지 정한다. Rules는 sandbox 밖에서 실행할 command prefix를 allow, prompt, forbidden으로 판정한다.

**현재 작업에서의 해석**

`하지 마라`라는 문장을 instruction에 쓰는 것과 기술적으로 막는 것은 다른 보장 수준이다. 결과 품질 기준, 작업 권한, destructive action 차단을 한 문서 안에서 같은 종류의 rule로 다루지 않는다.

출처:

- [Sandbox](https://learn.chatgpt.com/docs/sandboxing)
- [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)
- [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules)

### 9. Test, review, verification

**공식 확인**

Codex best practices는 결과 생성 뒤 test, lint, formatting, type check, request 일치 확인, diff review를 구분해서 수행하도록 권한다. `/review`와 custom review instruction은 구현과 review를 별도 행동으로 둔다.

**현재 작업에서의 해석**

`완성`, `acceptance`, `verification`을 분리한다는 이번 후보는 공식 표준 용어의 복사가 아니라, 실제 제품이 generation·test·review를 서로 다른 surface로 둔다는 사실과 정합적이다.

출처:

- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Code review](https://learn.chatgpt.com/docs/code-review)

### 10. Scheduled task와 worktree

**공식 확인**

Scheduled task는 안정화된 반복 workflow를 시간·cadence에 따라 실행한다. Skill이 방법을, scheduled task가 일정을 소유한다. local project 또는 격리된 worktree에서 실행할 수 있으며 먼저 수동 실행을 검증하라고 안내한다.

**현재 작업에서의 해석**

자동화는 품질 loop의 첫 단계가 아니다. 반복 방법이 안정적이고 unattended execution의 stop·permission·result review 조건이 있을 때 뒤에서 붙는 장치다.

출처:

- [Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees)

## Claude Code에서 확인된 구성 단위

### 1. CLAUDE.md, rules, memory

**공식 확인**

Claude Code는 `CLAUDE.md`를 session 시작 context로 읽고, project hierarchy와 하위 디렉토리의 lazy loading을 지원한다. `.claude/rules/`는 path-scoped instruction을 둘 수 있다. 공식 문서는 `CLAUDE.md`가 강제 설정이 아니라 context이므로 짧고 구체적이며 충돌하지 않게 관리하라고 설명한다. Auto memory는 별도의 machine-local state surface다.

**현재 작업에서의 해석**

지속 지침, 경로별 지침, 작업 상태, 자동 기억은 같은 `context`가 아니다. 이 workspace의 전역 규칙에 따라 auto memory를 사용하지 않지만, 일반 하네스 후보 지도에서는 제품 surface로 기록한다.

출처:

- [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [Explore the .claude directory](https://code.claude.com/docs/en/claude-directory)

### 2. Feature selection

**공식 확인**

Claude Code 공식 feature overview는 다음을 구분한다.

- `CLAUDE.md`: 매 session 지속 context
- Skill: 재사용 지식과 호출 가능한 workflow
- MCP: 외부 service와 tool 연결
- Subagent: 별도 context에서 실행하고 summary 반환
- Agent team: 독립 session의 협력
- Hook: lifecycle event에 반응하는 script, HTTP, prompt, agent
- Plugin: 위 기능의 packaging과 distribution

**현재 작업에서의 해석**

이번에 만드는 후보는 `core에 넣을 것`만 찾으면 안 된다. 무엇을 항상 읽을지, 필요할 때 불러올지, 별도 판단자로 분리할지, 자동 사건으로 만들지, 배포 단위로 묶을지를 각각 판단해야 한다.

출처:

- [Extend Claude Code](https://code.claude.com/docs/en/features-overview)

### 3. Skill과 subagent의 context 차이

**공식 확인**

Claude Code는 Skill을 현재 context에 불러오는 reusable content로, subagent를 fresh isolated context에서 일하고 summary를 돌려주는 worker로 구분한다. Subagent는 전체 대화 history를 자동으로 받지 않으며 delegation message, 적용되는 instruction, 선택된 skill과 tool 권한이 입력을 결정한다.

**현재 작업에서의 해석**

독립 reviewer에게 “같은 자료를 줬다”는 말만으로는 입력 동일성을 보장하지 않는다. 실제 packet, preloaded instruction, source 접근, inherited state를 확인해야 한다.

출처:

- [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- [Create custom subagents](https://code.claude.com/docs/en/sub-agents)

### 4. Hook의 advisory와 enforcement

**공식 확인**

Claude Code는 prompt instruction과 hook enforcement를 구분한다. `PreToolUse` hook은 action을 차단할 수 있고, `PostToolUse` hook은 linter 결과처럼 실행 feedback을 다시 context에 넣을 수 있다. Hook은 skill·agent lifecycle에 한정해서 정의할 수도 있다.

**현재 작업에서의 해석**

판단 기준을 더 강하게 쓰는 것과 자동 검사·차단을 붙이는 것은 다른 개선이다. hard invariant만 hook 후보가 되고, 취향·중심·의미 같은 모호한 판단은 reviewer나 main이 맡는다.

출처:

- [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- [Hooks reference](https://code.claude.com/docs/en/hooks)

### 5. Settings scope와 precedence

**공식 확인**

Claude Code settings는 managed, command line, local, project, user scope를 구분한다. 일반 설정은 우선순위에 따라 override되지만 permission array처럼 merge되는 예외도 있다. 같은 종류의 asset도 user와 project 위치가 다르다.

**현재 작업에서의 해석**

`어디에 쓸 것인가`는 파일 정리 문제가 아니라 owner, consumer, 공유 범위, precedence 결정이다. 동일 문장을 여러 scope에 복제하면 어느 것이 실제 effective state인지 불분명해질 수 있다.

출처:

- [Claude Code settings](https://code.claude.com/docs/en/settings)
- [Debug your configuration](https://code.claude.com/docs/en/debug-your-config)

### 6. Permission과 sandbox

**공식 확인**

Claude Code permissions는 tool 사용을 판정하고, sandbox는 Bash subprocess의 filesystem·network 접근을 OS 수준에서 제한한다. 둘은 상호 보완적이지만 적용 대상과 보장 방식이 다르다.

**현재 작업에서의 해석**

권한, 안전, 품질 판단을 하나의 `guard`로 부르지 않는다. 승인 주체와 기술적 enforcement, 모델에게 주는 advisory instruction을 분리한다.

출처:

- [Configure permissions](https://code.claude.com/docs/en/permissions)
- [Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing)

### 7. Plugin과 component test

**공식 확인**

Claude Code plugin은 skill, agent, hook, MCP server, LSP server, monitor, executable, default setting을 묶을 수 있다. 공식 문서는 standalone 구성으로 먼저 시험하고 공유·versioning이 필요할 때 plugin으로 만들며, 각 component를 개별 검증하라고 안내한다.

**현재 작업에서의 해석**

Plugin은 하네스의 최고 층위가 아니라 배포·조합 단위다. 내부 component의 품질과 activation을 plugin 존재만으로 증명할 수 없다.

출처:

- [Create plugins](https://code.claude.com/docs/en/plugins)
- [Plugins reference](https://code.claude.com/docs/en/plugins-reference)

## 두 제품을 대조해 얻은 설계 해석

아래는 공식 문장의 직접 인용이 아니라, 두 제품의 구조와 기존 `ai-native-harness` 조사를 대조한 현재 분석이다.

### 1. 하네스는 한 hierarchy보다 여러 제어면의 조합에 가깝다

최소한 다음 질문은 독립적이다.

- 무엇을 항상 알려줄 것인가
- 이번 작업에 무엇을 입력할 것인가
- 반복 절차를 언제 불러올 것인가
- 외부 data와 action을 어떻게 연결할 것인가
- 별도 context와 역할이 필요한가
- 무엇을 자동 감지하거나 강제할 것인가
- 무엇으로 결과를 검증할 것인가
- 어떤 상태를 다음 run에 넘길 것인가
- 언제 자동 실행하고 언제 사람이 개입할 것인가
- 이 자산을 언제 승격·폐기할 것인가

### 2. 배치 판단에는 내용보다 작동 방식이 중요하다

같은 문장도 다음에 따라 owner가 달라질 수 있다.

- 항상 읽혀야 하는가, 특정 상황에만 필요한가
- 모델이 판단할 advisory인가, 매번 강제할 invariant인가
- 현재 context에서 실행할 것인가, 격리된 context가 필요한가
- live data나 external action이 필요한가
- project와 개인 중 누가 공유하는가
- 한 번의 작업 상태인가, 반복 가능한 지식인가
- 사람이 발동하는가, 사건·시간이 발동하는가

### 3. 존재·전달·발동·효과를 분리해야 한다

파일과 기능은 다음 상태를 서로 대신하지 않는다.

- 존재함
- 현재 consumer가 발견함
- context 또는 runtime에 load됨
- 조건이 match되어 발동함
- handler·agent·tool이 실행됨
- 기대한 결과를 냄
- 결과 품질 또는 행동을 실제로 바꿈
- 다음 run에서도 유지됨

### 4. Advisory와 enforcement는 양자택일이 아니다

- 모호한 품질 판단은 model·reviewer·human의 해석이 필요하다.
- 절대 넘지 않을 filesystem·permission·secret·schema 경계는 기술적 enforcement가 적합하다.
- test와 linter는 형식화된 범위만 검증한다.
- hook은 사건에 반응하지만 handler 자체가 실패하거나 잘못된 feedback을 줄 수 있다.

따라서 `강하게 만들기`는 모든 기준을 hook이나 policy로 옮기는 일이 아니다.

### 5. 자동화는 안정화 뒤에 온다

두 제품 모두 반복 가능한 method와 실행 schedule을 구분한다. 수동으로도 계속 steering이 필요한 workflow는 자동화 전에 입력·출력·stop·failure state를 더 명확히 해야 한다.

## 이 조사에서 새 형식 후보 디렉토리로 보낼 것

다음 요소군을 `src-reference-forms/`에서 형식 후보로 만든다.

- task brief, instruction hierarchy, context와 state
- workflow, plan, playbook, runbook, orchestration
- skill, tool, MCP, plugin, package
- agent, subagent, reviewer, team, isolation
- config, policy, permission, approval, sandbox, hook
- artifact, test, review, verification, eval, trace, observability
- registry, lifecycle, automation, snapshot, recovery, retirement

이 목록은 설치 권고안도, 공식 best practice의 내용 채택안도 아니다. 먼저 담는 위치·발동 방식·권한·검증 방식의 형태를 충분히 만든 뒤, 이번 문제에서 나온 내용 후보가 어느 형식에 들어갈 때 실제로 작동하는지 비교한다.
