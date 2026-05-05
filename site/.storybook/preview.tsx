import type { Preview } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import "../src/styles/globals.css";
import "virtual:production-contract.css";
import "../src/stories/storybook.css";

function StoryFrame({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div data-motion="off" data-body-font="sans" className="story-root">
      {children}
    </div>
  );
}

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    }
  },
  decorators: [
    (Story) => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    )
  ]
};

export default preview;
