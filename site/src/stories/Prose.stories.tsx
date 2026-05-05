import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Prose } from "@/components/prose/Prose";
import { markdownToHtml } from "@/lib/markdown";
import { markdownFixture } from "./story-fixtures";

const meta = {
  title: "Design System/Prose",
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InlineAndCallout: Story = {
  render: () => (
    <main className="story-canvas">
      <h1 className="story-heading">Prose Primitives</h1>
      <p className="story-sub">Inline elements and callout DOM as rendered by the production prose CSS.</p>
      <section className="story-section">
        <div className="story-spec-row">
          <div className="story-spec-label">inline</div>
          <div className="story-spec-body">
            <div className="prose">
              <p>
                본문에는 <code>inline code</code>, <strong>strong</strong>, <em>emphasis</em>,{" "}
                <a className="link" href="https://example.com">link</a>, <mark>mark</mark>,{" "}
                <kbd>Command</kbd>+<kbd>K</kbd>가 섞인다.
              </p>
            </div>
          </div>
        </div>
        <div className="story-spec-row">
          <div className="story-spec-label">callout</div>
          <div className="story-spec-body">
            <div className="prose">
              <div className="callout">
                <span className="ico">i</span>
                <div><p><strong>한 줄 요약.</strong> API의 표면적은 줄이고, 사용자의 결정 공간은 늘린다.</p></div>
              </div>
              <div className="callout warn">
                <span className="ico">!</span>
                <div><p>표와 코드 블록은 viewport 밖으로 텍스트를 밀어내면 안 된다.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
};

export const MarkdownFixture: Story = {
  loaders: [
    async () => ({
      html: await markdownToHtml(markdownFixture, { leadFirstParagraph: true })
    })
  ],
  render: (_args, context) => (
    <main className="story-canvas">
      <h1 className="story-heading">Markdown Fixture</h1>
      <p className="story-sub">Production `markdownToHtml` output through the same `.prose` stylesheet.</p>
      <Prose html={String(context.loaded.html ?? "")} />
    </main>
  )
};
