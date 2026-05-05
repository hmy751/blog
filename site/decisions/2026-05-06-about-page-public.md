# About Page Public Route

Date: 2026-05-06
Scope: site production route and profile surface

## Context

old `blog.html` prototype had an About page with prose, Work history, and Elsewhere rows. The production site had kept an About component dormant while nav exposed only Articles and Note.

Before deployment, the site needs a real About page, but the prototype Work history is placeholder content and should not be published.

## Decision

- Register `/about/` as a production App Router route.
- Add `About` to the primary nav.
- Use the prototype's prose rhythm and `about-grid` contact pattern.
- Keep Work history out of the page.
- Store public About copy and contact links in `src/lib/site-config.ts`.
- Reuse the same public contact links in the production footer.
- Verify `/about/index.html` is present in static export.

## Non-Goals

- Do not add RSS, X, or Medium rows until real public values exist.
- Do not publish phone/address-level personal data on the public About page.
- Do not expose `/system` or legacy archive routes.
- Do not copy prototype HTML or legacy CSS into production source.

## Supersedes

This narrows the non-goal in `2026-05-06-production-content-display-polish.md` that kept About unpublished for that earlier content-display pass. `/system` and archive routes remain local-only.
