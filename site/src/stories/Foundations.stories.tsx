import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Design System/Foundations",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const surfaceTokens = [
  ["--bg", "page background"],
  ["--surface", "code, kbd, callout"],
  ["--ink", "primary text"],
  ["--ink-2", "body text"],
  ["--ink-3", "muted text"],
  ["--ink-4", "caption / meta"],
  ["--rule", "hairline"],
  ["--rule-soft", "soft hairline"]
] as const;

const accentTokens = [
  ["--accent", "accent"],
  ["--accent-soft", "soft accent"],
  ["--accent-ink", "link / tag"]
] as const;

const spaces = [
  ["--space-1", "4px"],
  ["--space-2", "8px"],
  ["--space-3", "12px"],
  ["--space-4", "16px"],
  ["--space-6", "24px"],
  ["--space-8", "32px"],
  ["--space-12", "48px"],
  ["--space-18", "72px"],
  ["--space-24", "96px"]
] as const;

export const ColorTokens: Story = {
  render: () => (
    <main className="story-canvas story-canvas-wide">
      <h1 className="story-heading">Color Tokens</h1>
      <p className="story-sub">Production CSS variables from `src/styles/tokens.css`.</p>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">Surface &amp; Ink</h2>
          <span className="story-section-kicker">light</span>
        </div>
        <div className="story-grid story-grid-4">
          {surfaceTokens.map(([name, value]) => (
            <TokenSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>
      <section className="story-section">
        <div className="story-section-head">
          <h2 className="story-section-title">Accent</h2>
          <span className="story-section-kicker">olive</span>
        </div>
        <div className="story-grid story-grid-3">
          {accentTokens.map(([name, value]) => (
            <TokenSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>
    </main>
  )
};

export const DarkTokens: Story = {
  render: () => (
    <div data-theme="dark" className="story-theme-root">
      <main className="story-canvas story-canvas-wide">
        <h1 className="story-heading">Dark Tokens</h1>
        <p className="story-sub">Dark variables exist in the foundation, even though the live UI has no theme toggle yet.</p>
        <div className="story-grid story-grid-4">
          {[...surfaceTokens, ...accentTokens].map(([name, value]) => (
            <TokenSwatch key={name} name={name} value={value} />
          ))}
        </div>
      </main>
    </div>
  )
};

export const Typography: Story = {
  render: () => (
    <main className="story-canvas">
      <h1 className="story-heading">Typography</h1>
      <p className="story-sub">Pretendard for Korean body, Newsreader as optional serif body, JetBrains Mono for metadata and code.</p>
      <section className="story-section">
        <div className="story-type-row">
          <div className="story-type-meta">
            <span>Display / post-title</span>
            <span>36px / 600 / 1.2</span>
          </div>
          <div className="story-type-display">좋은 컴포넌트는 무엇을 숨겨야 하는가</div>
        </div>
        <div className="story-type-row">
          <div className="story-type-meta">
            <span>Body / sans</span>
            <span>17px / 1.75</span>
          </div>
          <p className="story-type-body">본문은 한 화면 분량보다 한 호흡에 읽히는 분량이 더 중요하다.</p>
        </div>
        <div className="story-type-row" data-body-font="serif">
          <div className="story-type-meta">
            <span>Body / serif mode</span>
            <span>Newsreader fallback</span>
          </div>
          <p className="prose">
            선택 가능한 serif mode는 본문 리듬을 확인하기 위한 foundation 상태로 남겨 둔다.
          </p>
        </div>
        <div className="story-type-row">
          <div className="story-type-meta">
            <span>Mono</span>
            <span>metadata</span>
          </div>
          <div className="story-type-mono">2026.05.05 / DESIGN SYSTEM / 6 MIN READ</div>
        </div>
      </section>
    </main>
  )
};

export const Spacing: Story = {
  render: () => (
    <main className="story-canvas">
      <h1 className="story-heading">Spacing</h1>
      <p className="story-sub">Spacing tokens used by shell, page rhythm, prose, and component gaps.</p>
      <section className="story-section">
        {spaces.map(([name, value]) => (
          <div className="story-space-row" key={name}>
            <div>
              <div className="story-space-label">{name}</div>
              <div className="story-token-value">{value}</div>
            </div>
            <div className="story-space-bar" style={{ width: `var(${name})` }} />
          </div>
        ))}
      </section>
    </main>
  )
};

function TokenSwatch({ name, value }: Readonly<{ name: string; value: string }>) {
  const isRule = name === "--rule" || name === "--rule-soft";
  const style = isRule
    ? ({ "--token-rule": `var(${name})` } as CSSProperties)
    : ({ background: `var(${name})` } as CSSProperties);

  return (
    <div>
      <div className={`story-token-chip${isRule ? " story-token-rule" : ""}`} style={style} />
      <div className="story-token-name">{name}</div>
      <div className="story-token-value">{value}</div>
    </div>
  );
}
