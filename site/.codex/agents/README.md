# Site Codex Agents

사이트 개발 전용 Codex agent 자리다.

- `site_design_system_engineer`: 디자인 정합성 작업 전후에 production UI, Storybook, system-preview, Markdown/prose, CSS ownership의 파생 영향을 읽고 실행 가능한 패치 계획을 반환하는 report-only 디자인 시스템/프론트엔드 전문가.
- `site_data_seo_analyst`: reader behavior, analytics/heatmap, privacy boundary, SEO metadata, sitemap/robots, article structured data의 정합성을 읽고 실행 가능한 점검 리포트를 반환하는 report-only 데이터/SEO 전문가.

Claude agent와 의미를 맞추되 포맷은 따로 둔다. 사이트 구현 agent가 생기면 root `.codex/agents/`가 아니라 이 폴더에 둔다.
