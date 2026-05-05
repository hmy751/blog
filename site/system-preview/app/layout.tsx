import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../../src/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "System Preview",
    template: "%s | System Preview"
  },
  description: "Local-only design and Markdown preview for the custom blog site."
};

export default function SystemPreviewLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body data-motion="on" data-body-font="sans">
        {children}
      </body>
    </html>
  );
}
