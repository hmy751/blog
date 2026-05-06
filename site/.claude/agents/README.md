# Site Agents

사이트 개발 전용 Claude Code agent 자리다.

- `site-design-system-engineer`: 디자인 정합성 작업 전후에 production UI, Storybook, system-preview, Markdown/prose, CSS ownership의 파생 영향을 읽고 실행 가능한 패치 계획을 반환하는 report-only 디자인 시스템/프론트엔드 전문가.
- `site-data-seo-analyst`: reader behavior, analytics/heatmap, privacy boundary, SEO metadata, sitemap/robots, article structured data의 정합성을 읽고 실행 가능한 점검 리포트를 반환하는 report-only 데이터/SEO 전문가.

새 agent를 둘 때는 report-only를 기본으로 하고, 디자인/콘텐츠 계약/빌드 검증 같은 사이트 구현 질문에만 쓰도록 한다.

root `.claude/agents/`의 writing agents와 역할을 섞지 않는다.
