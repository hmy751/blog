---
작성일: 2026-07-29
성격: capability·tool·package 형식 후보
현재상태: 형식 비교용
---

# Capability, Tool, and Package Forms

## CP01. Built-in tool

- **작동:** runtime이 이미 제공하는 read, search, edit, shell, browser 같은 action surface.
- **적합:** 모델이 실제 환경을 관찰·변경·검증해야 하는 행동.
- **부적합:** domain workflow와 품질 기준을 tool 자체에 암묵적으로 기대.
- **확인할 것:** permission, input/output schema, 실제 effect.

## CP02. Local script or CLI

- **작동:** 결정적인 변환·검사·반복 명령을 executable로 제공한다.
- **적합:** link check, schema validation, rendering, snapshot, deterministic extraction.
- **부적합:** 모호한 편집 판단이나 사용자 취향.
- **확인할 것:** exit code, idempotency, environment dependency, rollback.

## CP03. MCP tool

- **작동:** external system의 live data 또는 controlled action을 모델 호출로 노출한다.
- **적합:** Gmail 검색, Figma 조작, issue 조회, live inventory.
- **부적합:** 고정 reference를 매번 원격 호출하거나 workflow를 tool description에 전부 넣기.
- **확인할 것:** authentication, authorization, side effect, output limit.

## CP04. MCP resource/context provider

- **작동:** external source의 읽을 수 있는 자료와 schema를 context로 제공한다.
- **적합:** 자주 바뀌는 문서, remote database, connected workspace source.
- **부적합:** 실행 절차와 판단 owner를 resource가 대신하는 일.
- **확인할 것:** freshness, provenance, retrieval failure.

## CP05. Connector/app

- **작동:** 인증된 외부 서비스와의 연결·action set을 사용자에게 설치 가능한 형태로 제공한다.
- **적합:** 팀 data와 반복적으로 상호작용하는 workflow.
- **부적합:** 단발성 local file 작업.
- **확인할 것:** account scope, data sharing, uninstall과 connection persistence.

## CP06. Skill

- **작동:** 이름·description으로 발견되고 필요할 때 workflow instruction과 resource를 load한다.
- **적합:** 반복되는 focused task, 명확한 trigger, 입력·출력·예외가 있는 절차.
- **부적합:** 모든 session이 알아야 할 짧은 convention, 아직 계속 hand steering이 필요한 실험.
- **확인할 것:** discovery, activation, scope, actual usage.

## CP07. Skill resource bundle

- **작동:** `SKILL.md`와 reference, template, example, script, asset을 함께 둔다.
- **적합:** 절차만으로 부족하고 재사용 자료가 품질에 직접 필요한 task.
- **부적합:** 관련 있다는 이유로 모든 자료를 bundle에 넣는 일.
- **확인할 것:** progressive loading, source freshness, canonical owner.

## CP08. Plugin

- **작동:** skill, tool/MCP, hook, agent, UI, setting을 installable·versioned unit으로 묶는다.
- **적합:** 여러 repo·사용자에 배포할 안정된 capability.
- **부적합:** 한 프로젝트의 초기 실험, 내부 component 검증 전 packaging.
- **확인할 것:** component별 test, permissions, version, compatibility.

## CP09. Plugin marketplace/catalog

- **작동:** package의 발견, 설치, update source를 관리한다.
- **적합:** 팀 또는 커뮤니티에 여러 extension을 배포.
- **부적합:** 품질 판단이나 활성화 성공의 증거.
- **확인할 것:** trust source, version pinning, ownership, retirement.

## CP10. UI-assisted tool surface

- **작동:** tool 결과를 form, widget, diff, preview, dashboard처럼 사람이 직접 보고 조작하게 한다.
- **적합:** 선택 비교, 승인, visual verification, structured input.
- **부적합:** 텍스트로 충분한 단순 결과에 UI를 추가.
- **확인할 것:** UI가 판단 관계를 더 잘 보이게 하는지, source of truth가 무엇인지.
